"use client"

import { useState } from "react"
import * as XLSX from "xlsx"
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
import { OutboundRegistrationModal } from "./outbound-registration-modal"

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
      <label className="block text-[10px] font-medium text-foreground mb-1.5">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            disabled={disabled}
            className="w-full justify-between bg-background border-border font-normal disabled:opacity-50 disabled:cursor-not-allowed !h-8 text-[10px]"
          >
            {selected.length === 0
              ? "All"
              : selected.length === options.length
              ? "All Selected"
              : `${selected.length} selected`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[160px] p-2" align="start">
          <div className="space-y-1">
            <div
              className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted cursor-pointer"
              onClick={onToggleAll}
            >
              <Checkbox
                checked={options.length > 0 && selected.length === options.length}
              />
              <span className="text-[10px] font-medium">Select All</span>
            </div>
            <div className="border-t my-1" />
            {options.map((opt) => (
              <div
                key={opt.value}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted cursor-pointer"
                onClick={() => onToggle(opt.value)}
              >
                <Checkbox checked={selected.includes(opt.value)} />
                <span className="text-[10px]">{opt.label}</span>
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
  const [startDate, setStartDate] = useState(formatDate(thirtyDaysAgo))
  const [endDate, setEndDate] = useState(formatDate(today))

  const handleQuickDate = (key: QuickDate) => {
    setQuickDate(key)
    const now = new Date()
    const end = formatDate(now)
    setEndDate(end)
    switch (key) {
      case "today":
        setStartDate(end)
        break
      case "week": {
        const d = new Date(now)
        d.setDate(d.getDate() - 7)
        setStartDate(formatDate(d))
        break
      }
      case "month": {
        const d = new Date(now)
        d.setDate(d.getDate() - 30)
        setStartDate(formatDate(d))
        break
      }
      case "3months": {
        const d = new Date(now)
        d.setDate(d.getDate() - 90)
        setStartDate(formatDate(d))
        break
      }
    }
  }
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [sortField, setSortField] = useState<SortField>("registrationDate")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  // Filter states
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false)
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

  const handleExcelDownload = () => {
    const rows: Record<string, string | number>[] = []

    sortedRecords.forEach((record) => {
      const detail = outboundDetails[record.id]
      if (detail) {
        detail.orders.forEach((order) => {
          order.items.forEach((item) => {
            rows.push({
              "Registration Date": record.registrationDate,
              "Status": record.outboundStatus,
              "Type": record.type,
              "IV No.": record.uvNo,
              "From Store": `${record.fromStoreCode} / ${record.fromStoreName}`,
              "From Location": `${record.fromLocationCode} / ${record.fromLocationName}`,
              "To Store": `${record.toStoreCode} / ${record.toStoreName}`,
              "To Location": `${record.toLocationCode} / ${record.toLocationName}`,
              "Created By": record.createdBy,
              "Order #": order.orderNo,
              "Order Date": order.orderDate,
              "Product Code": item.itemCode,
              "Product Name": item.itemName,
              "Category": item.category || "",
              "Subcategory": item.subcategory || "",
              "Qty": item.quantity,
            })
          })
        })
      } else {
        rows.push({
          "Registration Date": record.registrationDate,
          "Status": record.outboundStatus,
          "Type": record.type,
          "IV No.": record.uvNo,
          "From Store": `${record.fromStoreCode} / ${record.fromStoreName}`,
          "From Location": `${record.fromLocationCode} / ${record.fromLocationName}`,
          "To Store": `${record.toStoreCode} / ${record.toStoreName}`,
          "To Location": `${record.toLocationCode} / ${record.toLocationName}`,
          "Created By": record.createdBy,
          "Order #": "",
          "Order Date": "",
          "Product Code": "",
          "Product Name": "",
          "Category": "",
          "Subcategory": "",
          "Qty": 0,
        })
      }
    })

    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Outbound Orders")
    XLSX.writeFile(wb, `outbound_orders_${new Date().toISOString().split("T")[0]}.xlsx`)
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
    <div className="space-y-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[10px]">
        <span className="text-muted-foreground">Inventory</span>
        <ChevronRight className="h-3 w-3 text-muted-foreground" />
        <span className="text-muted-foreground">Monitoring</span>
        <ChevronRight className="h-3 w-3 text-muted-foreground" />
        <span className="text-primary font-medium">Outbound Order List</span>
      </nav>

      {/* Page Title */}
      <div>
        <h1 className="text-lg font-extrabold">Outbound Order List</h1>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          Create and view outbound shipments by order.
        </p>
      </div>

      {/* Filter Section */}
      <div className="bg-card rounded-xl border border-border p-4">
        {/* Row 1 - Dropdowns */}
        <div className="flex flex-wrap gap-3 mb-4">
          {/* BP - Single Select */}
          <div className="w-[160px]">
            <label className="block text-[10px] font-medium text-foreground mb-1.5">BP</label>
            <Select value={selectedBP} onValueChange={handleBPChange}>
              <SelectTrigger className="w-full bg-background border-border !h-8 text-[10px]">
                <SelectValue placeholder="Select BP" />
              </SelectTrigger>
              <SelectContent>
                {BP_OPTIONS.map((bp) => (
                  <SelectItem key={bp.value} value={bp.value} className="text-[10px]">
                    {bp.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Store - Multi Select (BP 연동) */}
          <div className="w-[160px]">
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
          <div className="w-[160px]">
            <MultiSelectPopover
              label="Outbound Status"
              options={STATUS_OPTIONS}
              selected={selectedStatuses}
              onToggle={(v) => setSelectedStatuses(toggleInList(selectedStatuses, v))}
              onToggleAll={() => setSelectedStatuses(toggleAll(selectedStatuses, STATUS_OPTIONS))}
            />
          </div>

          {/* Order Tag */}
          <div className="w-[160px]">
            <label className="block text-[10px] font-medium text-foreground mb-1.5">Order Tag</label>
            <Select defaultValue="all">
              <SelectTrigger className="w-full bg-background border-border !h-8 text-[10px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-[10px]">All</SelectItem>
                <SelectItem value="rx" className="text-[10px]">RX</SelectItem>
                <SelectItem value="pre-order" className="text-[10px]">Pre-Order</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 2 - Date Range */}
        <div className="mb-4">
          <label className="block text-[10px] font-medium text-foreground mb-1.5">Registration Date</label>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none z-10" />
              <Input
                type="date"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setQuickDate(null) }}
                className="w-36 pl-8 bg-background border-border h-7 !text-[10px] [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-datetime-edit]:text-[10px]"
              />
            </div>
            <span className="text-[10px] text-muted-foreground">~</span>
            <div className="relative">
              <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none z-10" />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value); setQuickDate(null) }}
                className="w-36 pl-8 bg-background border-border h-7 !text-[10px] [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden [&::-webkit-datetime-edit]:text-[10px]"
              />
            </div>
            <div className="flex gap-1.5 ml-1">
              {[
                { key: "today", label: "Today" },
                { key: "week", label: "1 Week" },
                { key: "month", label: "1 Month" },
                { key: "3months", label: "3 Months" },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleQuickDate(item.key as QuickDate)}
                  className={`px-3 py-1.5 text-[10px] font-medium rounded-md border transition-all ${
                    quickDate === item.key
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-primary/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3 - Search */}
        <div className="flex items-end justify-between gap-3">
          <div className="flex-1">
            <label className="block text-[10px] text-muted-foreground mb-1">
              Store Code, Store Name, IV No., Request Account
            </label>
            <Input
              placeholder="Enter at least 2 characters"
              className="bg-background border-border h-7 !text-[10px] placeholder:text-[10px]"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5 px-4 h-7 text-[10px]">
            <Search className="h-3.5 w-3.5" />
            Search
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-card rounded-lg border border-border">
        {/* Summary & Actions */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground">Total</span>
            <span className="text-[10px] font-bold">{outboundRecords.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground h-7 text-[10px] px-3"
              onClick={() => setRegistrationModalOpen(true)}
            >
              <Package className="h-3.5 w-3.5" />
              Outbound Registration
            </Button>
            <Button variant="outline" className="gap-1.5 border-border bg-background hover:bg-muted h-7 text-[10px] px-3" onClick={handleExcelDownload}>
              <Download className="h-3.5 w-3.5" />
              Download
            </Button>
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 h-12 text-[10px]">
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
              <TableHead className="text-center">Order Tag</TableHead>
              <TableHead className="text-center">Type</TableHead>
              <TableHead className="text-center">IV No.</TableHead>
              <TableHead className="text-center">Order</TableHead>
              <TableHead>
                From Store
                <br />
                <span className="text-[10px] text-muted-foreground">(Code / Name)</span>
              </TableHead>
              <TableHead>
                From Location
                <br />
                <span className="text-[10px] text-muted-foreground">(Code / Name)</span>
              </TableHead>
              <TableHead>
                To Store
                <br />
                <span className="text-[10px] text-muted-foreground">(Code / Name)</span>
              </TableHead>
              <TableHead>
                To Location
                <br />
                <span className="text-[10px] text-muted-foreground">(Code / Name)</span>
              </TableHead>
              <TableHead className="text-center">Created By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRecords.map((record) => (
              <TableRow
                key={record.id}
                className="cursor-pointer hover:bg-muted/50 h-10"
                onClick={() => onSelectOutbound(record.id)}
              >
                <TableCell className="text-center text-[10px]">{record.registrationDate}</TableCell>
                <TableCell className="text-center">
                  {(() => {
                    const statusStyles: Record<string, string> = {
                      "Outbound Planned": "bg-[oklch(0.94_0.04_85)] text-[oklch(0.45_0.08_75)] border-[oklch(0.88_0.05_85)]",
                      "Pending Registration": "bg-[oklch(0.93_0.05_55)] text-[oklch(0.42_0.09_50)] border-[oklch(0.86_0.06_55)]",
                      "Outbound Registered": "bg-[oklch(0.93_0.04_160)] text-[oklch(0.40_0.07_155)] border-[oklch(0.86_0.05_160)]",
                      "Registration Failed": "bg-[oklch(0.94_0.04_25)] text-[oklch(0.45_0.09_20)] border-[oklch(0.87_0.05_25)]",
                      "Outbound Completed": "bg-[oklch(0.92_0.04_210)] text-[oklch(0.38_0.07_205)] border-[oklch(0.85_0.05_210)]",
                      "Outbound Canceled": "bg-[oklch(0.95_0.01_0)] text-[oklch(0.48_0.02_0)] border-[oklch(0.88_0.015_0)]",
                    }
                    return (
                      <Badge
                        variant="outline"
                        className={`px-2 py-0.5 text-[10px] font-medium ${statusStyles[record.outboundStatus] || ""}`}
                      >
                        {record.outboundStatus}
                      </Badge>
                    )
                  })()}
                </TableCell>
                <TableCell className="text-center text-[10px]">{record.orderType}</TableCell>
                <TableCell className="text-center text-[10px]">
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-2 py-0.5 ${
                      record.type === "S2S"
                        ? "bg-[oklch(0.93_0.04_210)] text-[oklch(0.40_0.07_205)] border-[oklch(0.86_0.05_210)]"
                        : record.type === "L2S"
                        ? "bg-[oklch(0.93_0.04_160)] text-[oklch(0.40_0.07_155)] border-[oklch(0.86_0.05_160)]"
                        : "bg-[oklch(0.93_0.05_55)] text-[oklch(0.42_0.09_50)] border-[oklch(0.86_0.06_55)]"
                    }`}
                  >
                    {record.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-primary font-medium underline cursor-pointer text-[10px]">
                    {record.uvNo}
                  </span>
                </TableCell>
                <TableCell className="text-center text-[10px] font-medium">
                  {outboundDetails[record.id]?.orders.length ?? 0}
                </TableCell>
                <TableCell className="text-[10px]">
                  {record.fromStoreCode} / {record.fromStoreName}
                </TableCell>
                <TableCell className="text-[10px]">
                  {record.fromLocationCode} / {record.fromLocationName}
                </TableCell>
                <TableCell className="text-[10px]">
                  {record.toStoreCode} / {record.toStoreName}
                </TableCell>
                <TableCell className="text-[10px]">
                  {record.toLocationCode} / {record.toLocationName}
                </TableCell>
                <TableCell className="text-center text-[10px]">{record.createdBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-3 px-4 py-2.5 border-t border-border">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground">Rows per page:</span>
            <Select defaultValue="30">
              <SelectTrigger className="w-14 h-6 text-[10px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10" className="text-[10px]">10</SelectItem>
                <SelectItem value="30" className="text-[10px]">30</SelectItem>
                <SelectItem value="50" className="text-[10px]">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <span className="text-[10px] text-muted-foreground">1-{outboundRecords.length} of {outboundRecords.length}</span>
          <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon" className="h-6 w-6" disabled>
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      <OutboundRegistrationModal
        open={registrationModalOpen}
        onOpenChange={setRegistrationModalOpen}
      />
    </div>
  )
}
