"use client"

import { useState } from "react"
import { ArrowLeft, Package, ClipboardList, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { outboundDetails } from "@/lib/mock-data"

interface OutboundOrderDetailProps {
  outboundId: string
  onBack: () => void
}

export function OutboundOrderDetail({ outboundId, onBack }: OutboundOrderDetailProps) {
  const detail = outboundDetails[outboundId]
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)

  if (!detail) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-muted-foreground">Outbound record not found.</p>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to List
        </Button>
      </div>
    )
  }

  const { outbound, orders } = detail

  // Flatten orders into rows: each item becomes a row with order info
  const allRows = orders.flatMap((order) =>
    order.items.map((item) => ({
      orderNo: order.orderNo,
      itemCode: item.itemCode,
      itemName: item.itemName,
      quantity: item.quantity,
    }))
  )

  const totalRows = allRows.length
  const totalPages = Math.ceil(totalRows / rowsPerPage)
  const startIdx = (currentPage - 1) * rowsPerPage
  const paginatedRows = allRows.slice(startIdx, startIdx + rowsPerPage)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack} className="h-9 w-9">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold">{outbound.uvNo}</h1>
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
            <Badge variant="outline" className={`px-3 py-1 font-medium ${statusStyles[outbound.outboundStatus] || ""}`}>
              {outbound.outboundStatus}
            </Badge>
          )
        })()}
      </div>

      {/* Outbound Info Card */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="mb-4 flex items-center gap-2">
          <Package className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold">Outbound Information</h2>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Registration Date</p>
            <p className="mt-1 text-sm font-medium">{outbound.registrationDate}</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">From Store</p>
            <p className="mt-1 text-sm font-medium">{outbound.fromStoreCode} / {outbound.fromStoreName}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">From Location</p>
            <p className="mt-1 text-sm font-medium">{outbound.fromLocationCode} / {outbound.fromLocationName}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">To Store</p>
            <p className="mt-1 text-sm font-medium">{outbound.toStoreCode} / {outbound.toStoreName}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">To Location</p>
            <p className="mt-1 text-sm font-medium">{outbound.toLocationCode} / {outbound.toLocationName}</p>
          </div>
        </div>
      </div>

      {/* Order List */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-5 py-3 bg-muted/30">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold">Order List</h2>
            <Badge variant="secondary" className="ml-1">{orders.length} orders</Badge>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 h-14">
              <TableHead className="text-center">Order #</TableHead>
              <TableHead className="text-center">
                Product Info
                <br />
                <span className="text-xs text-muted-foreground">(Code / Name)</span>
              </TableHead>
              <TableHead className="text-center">Qty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRows.map((row, idx) => (
              <TableRow key={`${row.orderNo}-${row.itemCode}-${idx}`} className="h-12">
                <TableCell className="text-center text-sm font-medium text-primary">{row.orderNo}</TableCell>
                <TableCell className="text-center text-sm">{row.itemCode} / {row.itemName}</TableCell>
                <TableCell className="text-center text-sm">{row.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page:</span>
            <Select value={String(rowsPerPage)} onValueChange={(v) => { setRowsPerPage(Number(v)); setCurrentPage(1) }}>
              <SelectTrigger className="w-16 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <span className="text-sm text-muted-foreground">
            {startIdx + 1}-{Math.min(startIdx + rowsPerPage, totalRows)} of {totalRows}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
