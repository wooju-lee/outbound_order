"use client"

import { useState } from "react"
import {
  Search,
  Calendar,
  Download,
  ChevronRight,
  ChevronLeft,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Package,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { outboundRecords, outboundDetails } from "@/lib/mock-data"

interface OutboundOrderListProps {
  onSelectOutbound: (id: string) => void
}

type QuickDate = "today" | "week" | "month" | "3months"
type SortField = "registrationDate" | "requestDate"
type SortDirection = "asc" | "desc"

const BP_OPTIONS = [
  { value: "C1002", label: "C1002 미국법인" },
  { value: "C1003", label: "C1003 캐나다법인" },
  { value: "C1004", label: "C1004 일본법인" },
]

const STORE_OPTIONS_BY_BP: Record<string, { value: string; label: string }[]> = {
  C1002: [
    { value: "US1001", label: "US1001 / US_STORE_1" },
    { value: "US1002", label: "US1002 / US_STORE_2" },
    { value: "US1003", label: "US1003 / US_STORE_3" },
    { value: "US1004", label: "US1004 / US_ONLINE" },
  ],
  C1003: [
    { value: "CA1001", label: "CA1001 / CA_STORE_1" },
    { value: "CA1002", label: "CA1002 / CA_STORE_2" },
    { value: "CA002", label: "CA002 / GM_WH_CANADA" },
  ],
  C1004: [
    { value: "JP1001", label: "JP1001 / JP_STORE_1" },
    { value: "JP1002", label: "JP1002 / JP_STORE_2" },
  ],
}

const TYPE_OPTIONS = [
  { value: "S2S", label: "S2S" },
  { value: "L2S", label: "L2S" },
  { value: "S2L", label: "S2L" },
]

const STATUS_OPTIONS = [
  { value: "outbound-planned", label: "Outbound Planned" },
  { value: "pending-registration", label: "Pending Registration" },
  { value: "outbound-registered", label: "Outbound Registered" },
  { value: "registration-failed", label: "Registration Failed" },
  { value: "outbound-completed", label: "Outbound Completed" },
  { value: "outbound-canceled", label: "Outbound Canceled" },
]

const statsData = [
  { count: 3, name: "S2S", description: "Store to Store" },
  { count: 2, name: "L2S", description: "Location to Store" },
  { count: 2, name: "S2L", description: "Store to Location" },
]

const formatDate = (date: Date) => date.toISOString().split("T")[0]
const today = new Date()
const thirtyDaysAgo = new Date(today)
thirtyDaysAgo.setDate(today.getDate() - 30)

function MultiSelectPopover({
  label,
  options,
  selected,
  onToggle,
  onToggleAll,
  disabled = false,
}: {
  label: string
  options: { value: string; label: string }[]
  selected: string[]
  onToggle: (value: string) => void
  onToggleAll: () => void
  disabled?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className="w-full justify-between bg-background border-border font-normal disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selected.length === 0
              ? "All"
              : selected.length === options.length
              ? "All Selected"
              : `${selected.length} selected`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[220px] p-2" align="start">
          <div className="space-y-1">
            <div
              className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted cursor-pointer"
              onClick={onToggleAll}
            >
              <Checkbox
                checked={options.length > 0 && selected.length === options.length}
              />
              <span className="text-sm font-medium">Select All</span>
            </div>
            <div className="border-t my-1" />
            {options.map((opt) => (
              <div
                key={opt.value}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted cursor-pointer"
                onClick={() => onToggle(opt.value)}
              >
                <Checkbox checked={selected.includes(opt.value)} />
                <span className="text-sm">{opt.label}</span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export function OutboundOrderList({ onSelectOutbound }: OutboundOrderListProps) {
  const [quickDate, setQuickDate] = useState<QuickDate | null>(null)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [sortField, setSortField] = useState<SortField>("registrationDate")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  // Filter states
  const [selectedBP, setSelectedBP] = useState<string>("")
  const [selectedStores, setSelectedStores] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

  const currentStoreOptions = selectedBP ? (STORE_OPTIONS_BY_BP[selectedBP] ?? []) : []

  const handleBPChange = (value: string) => {
    setSelectedBP(value)
    setSelectedStores([])
  }

  const toggleInList = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

  const toggleAll = (list: string[], options: { value: string }[]) =>
    list.length === options.length ? [] : options.map((o) => o.value)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-3 w-3 ml-1 text-muted-foreground" />
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="h-3 w-3 ml-1 text-primary" />
    ) : (
      <ArrowDown className="h-3 w-3 ml-1 text-primary" />
    )
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(outboundRecords.map((r) => r.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, id])
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== id))
    }
  }

  const sortedRecords = [...outboundRecords].sort((a, b) => {
    let comparison = 0
    if (sortField === "registrationDate") {
      comparison =
        new Date(a.registrationDate.split(" ")[0]).getTime() -
        new Date(b.registrationDate.split(" ")[0]).getTime()
    } else {
      comparison =
        new Date(a.outboundRequestDate.split(" ")[0]).getTime() -
        new Date(b.outboundRequestDate.split(" ")[0]).getTime()
    }
    return sortDirection === "asc" ? comparison : -comparison
  })

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Inventory</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Monitoring</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="text-primary font-medium">Outbound Order List</span>
      </nav>

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-extrabold">Outbound Order List</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create and view outbound shipments by order.
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-card rounded-xl border border-border p-5">
        {/* Row 1 - Dropdowns */}
        <div className="flex flex-wrap gap-4 mb-5">
          {/* BP - Single Select */}
          <div className="w-[200px]">
            <label className="block text-sm font-medium text-foreground mb-2">BP</label>
            <Select value={selectedBP} onValueChange={handleBPChange}>
              <SelectTrigger className="w-full bg-background border-border">
                <SelectValue placeholder="Select BP" />
              </SelectTrigger>
              <SelectContent>
                {BP_OPTIONS.map((bp) => (
                  <SelectItem key={bp.value} value={bp.value}>
                    {bp.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Store - Multi Select (BP 연동) */}
          <div className="w-[200px]">
            <MultiSelectPopover
              label="Store"
              options={currentStoreOptions}
              selected={selectedStores}
              onToggle={(v) => setSelectedStores(toggleInList(selectedStores, v))}
              onToggleAll={() => setSelectedStores(toggleAll(selectedStores, currentStoreOptions))}
              disabled={!selectedBP}
            />
          </div>

          {/* Type - Multi Select */}
          <div className="w-[160px]">
            <MultiSelectPopover
              label="Type"
              options={TYPE_OPTIONS}
              selected={selectedTypes}
              onToggle={(v) => setSelectedTypes(toggleInList(selectedTypes, v))}
              onToggleAll={() => setSelectedTypes(toggleAll(selectedTypes, TYPE_OPTIONS))}
            />
          </div>

          {/* Outbound Status - Multi Select */}
          <div className="w-[200px]">
            <MultiSelectPopover
              label="Outbound Status"
              options={STATUS_OPTIONS}
              selected={selectedStatuses}
              onToggle={(v) => setSelectedStatuses(toggleInList(selectedStatuses, v))}
              onToggleAll={() => setSelectedStatuses(toggleAll(selectedStatuses, STATUS_OPTIONS))}
            />
          </div>
        </div>

        {/* Row 2 - Date Range */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-foreground mb-3">Date Search</label>
          <div className="flex items-center gap-3">
            <Select defaultValue="registration">
              <SelectTrigger className="w-[140px] bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="registration">Order Date</SelectItem>
                <SelectItem value="request">Request Date</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
              <Input
                type="date"
                defaultValue={formatDate(thirtyDaysAgo)}
                className="w-40 pl-10 bg-background border-border"
              />
            </div>
            <span className="text-muted-foreground">~</span>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
              <Input
                type="date"
                defaultValue={formatDate(today)}
                className="w-40 pl-10 bg-background border-border"
              />
            </div>
            <div className="flex gap-2 ml-2">
              {[
                { key: "today", label: "Today" },
                { key: "week", label: "1 Week" },
                { key: "month", label: "1 Month" },
                { key: "3months", label: "3 Months" },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setQuickDate(item.key as QuickDate)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                    quickDate === item.key
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background text-foreground hover:border-foreground/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3 - Search */}
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1">
            <label className="block text-sm text-muted-foreground mb-2">
              Store Code, Store Name, IV No., Request Account
            </label>
            <Input
              placeholder="Enter at least 2 characters"
              className="bg-background border-border"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-6">
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-card rounded-lg border border-border">
        {/* Summary & Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-sm font-bold">{outboundRecords.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Package className="h-4 w-4" />
              Outbound Registration
            </Button>
            <Button variant="outline" className="gap-2 border-border bg-background hover:bg-muted">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 h-20">
              <TableHead className="text-center">
                <button
                  onClick={() => handleSort("registrationDate")}
                  className="flex items-center justify-center w-full hover:text-primary transition-colors"
                >
                  Registration Date
                  {getSortIcon("registrationDate")}
                </button>
              </TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Type</TableHead>
              <TableHead className="text-center">IV No.</TableHead>
              <TableHead className="text-center">Order</TableHead>
              <TableHead className="text-center">
                From Store
                <br />
                <span className="text-xs text-muted-foreground">(Code / Name)</span>
              </TableHead>
              <TableHead className="text-center">
                From Location
                <br />
                <span className="text-xs text-muted-foreground">(Code / Name)</span>
              </TableHead>
              <TableHead className="text-center">
                To Store
                <br />
                <span className="text-xs text-muted-foreground">(Code / Name)</span>
              </TableHead>
              <TableHead className="text-center">
                To Location
                <br />
                <span className="text-xs text-muted-foreground">(Code / Name)</span>
              </TableHead>
              <TableHead className="text-center">Created By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRecords.map((record) => (
              <TableRow
                key={record.id}
                className="cursor-pointer hover:bg-muted/50 h-14"
                onClick={() => onSelectOutbound(record.id)}
              >
                <TableCell className="text-center text-sm">{record.registrationDate}</TableCell>
                <TableCell className="text-center">
                  {(() => {
                    const statusStyles: Record<string, string> = {
                      "Outbound Planned": "bg-[oklch(0.94_0.04_85)] text-[oklch(0.5_0.08_70)] border-[oklch(0.88_0.06_85)]",
                      "Pending Registration": "bg-[oklch(0.93_0.04_55)] text-[oklch(0.55_0.1_55)] border-[oklch(0.87_0.06_55)]",
                      "Outbound Registered": "bg-[oklch(0.93_0.04_145)] text-[oklch(0.5_0.08_145)] border-[oklch(0.87_0.06_145)]",
                      "Registration Failed": "bg-[oklch(0.93_0.04_25)] text-[oklch(0.55_0.12_25)] border-[oklch(0.87_0.06_25)]",
                      "Outbound Completed": "bg-[oklch(0.9_0.05_200)] text-[oklch(0.45_0.08_200)] border-[oklch(0.84_0.06_200)]",
                      "Outbound Canceled": "bg-[oklch(0.94_0.005_0)] text-[oklch(0.5_0.01_0)] border-[oklch(0.85_0.01_0)]",
                    }
                    return (
                      <Badge
                        variant="outline"
                        className={`px-3 py-1 font-medium ${statusStyles[record.outboundStatus] || ""}`}
                      >
                        {record.outboundStatus}
                      </Badge>
                    )
                  })()}
                </TableCell>
                <TableCell className="text-center text-sm">
                  <Badge
                    variant="outline"
                    className={
                      record.type === "S2S"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : record.type === "L2S"
                        ? "bg-purple-50 text-purple-700 border-purple-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }
                  >
                    {record.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-primary font-medium underline cursor-pointer">
                    {record.uvNo}
                  </span>
                </TableCell>
                <TableCell className="text-center text-sm font-medium">
                  {outboundDetails[record.id]?.orders.length ?? 0}
                </TableCell>
                <TableCell className="text-center text-sm">
                  {record.fromStoreCode} / {record.fromStoreName}
                </TableCell>
                <TableCell className="text-center text-sm">
                  {record.fromLocationCode} / {record.fromLocationName}
                </TableCell>
                <TableCell className="text-center text-sm">
                  {record.toStoreCode} / {record.toStoreName}
                </TableCell>
                <TableCell className="text-center text-sm">
                  {record.toLocationCode} / {record.toLocationName}
                </TableCell>
                <TableCell className="text-center text-sm">{record.createdBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page:</span>
            <Select defaultValue="30">
              <SelectTrigger className="w-16 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <span className="text-sm text-muted-foreground">1-7 of 7</span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
