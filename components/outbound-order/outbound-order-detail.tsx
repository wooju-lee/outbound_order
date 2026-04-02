"use client"

import { useState } from "react"
import * as XLSX from "xlsx"
import { ArrowLeft, Package, ClipboardList, ChevronLeft, ChevronRight, Download } from "lucide-react"
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
  const [rowsPerPage, setRowsPerPage] = useState(30)
  const [currentPage, setCurrentPage] = useState(1)

  if (!detail) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-muted-foreground">Outbound record not found.</p>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-3.5 w-3.5" />
          Back to List
        </Button>
      </div>
    )
  }

  const { outbound, orders } = detail

  const allRows = orders.flatMap((order) =>
    order.items.map((item) => ({
      orderNo: order.orderNo,
      itemCode: item.itemCode,
      itemName: item.itemName,
      category: item.category || "-",
      subcategory: item.subcategory || "-",
      quantity: item.quantity,
    }))
  )

  const handleExcelDownload = () => {
    const rows = allRows.map((row) => ({
      "I/V No.": outbound.uvNo,
      "Outbound Status": outbound.outboundStatus,
      "Create Date": outbound.registrationDate,
      "From Store": `${outbound.fromStoreCode} / ${outbound.fromStoreName}`,
      "From Location": `${outbound.fromLocationCode} / ${outbound.fromLocationName}`,
      "To Store": `${outbound.toStoreCode} / ${outbound.toStoreName}`,
      "To Location": `${outbound.toLocationCode} / ${outbound.toLocationName}`,
      "Order #": row.orderNo,
      "Product Code": row.itemCode,
      "Product Name": row.itemName,
      "Product Category": row.category,
      "Product Subcategory": row.subcategory,
      "Outbound Qty (Registered)": row.quantity,
      "Outbound Qty (Completed)": outbound.outboundStatus === "Outbound Completed" ? row.quantity : "-",
    }))
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Order List")
    XLSX.writeFile(wb, `${outbound.uvNo}_order_list_${new Date().toISOString().split("T")[0]}.xlsx`)
  }

  const totalRows = allRows.length
  const totalPages = Math.ceil(totalRows / rowsPerPage)
  const startIdx = (currentPage - 1) * rowsPerPage
  const paginatedRows = allRows.slice(startIdx, startIdx + rowsPerPage)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onBack} className="h-6 w-6">
          <ArrowLeft className="h-3.5 w-3.5" />
        </Button>
        <h1 className="text-sm font-bold">{outbound.uvNo}</h1>
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
            <Badge variant="outline" className={`px-2 py-0.5 text-xs font-medium ${statusStyles[outbound.outboundStatus] || ""}`}>
              {outbound.outboundStatus}
            </Badge>
          )
        })()}
      </div>

      {/* Outbound Info Card */}
      <div className="bg-card rounded-lg border border-border p-3">
        <div className="mb-2 flex items-center gap-1.5">
          <Package className="h-3 w-3 text-primary" />
          <h2 className="text-[10px] font-semibold">Outbound Information</h2>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-3">
          <div>
            <p className="text-[9px] text-muted-foreground">Create Date</p>
            <p className="mt-0.5 text-[10px] font-medium">{outbound.registrationDate}</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div>
            <p className="text-[9px] text-muted-foreground">From Store</p>
            <p className="mt-0.5 text-[10px] font-medium">{outbound.fromStoreCode} / {outbound.fromStoreName}</p>
          </div>
          <div>
            <p className="text-[9px] text-muted-foreground">From Location</p>
            <p className="mt-0.5 text-[10px] font-medium">{outbound.fromLocationCode} / {outbound.fromLocationName}</p>
          </div>
          <div>
            <p className="text-[9px] text-muted-foreground">To Store</p>
            <p className="mt-0.5 text-[10px] font-medium">{outbound.toStoreCode} / {outbound.toStoreName}</p>
          </div>
          <div>
            <p className="text-[9px] text-muted-foreground">To Location</p>
            <p className="mt-0.5 text-[10px] font-medium">{outbound.toLocationCode} / {outbound.toLocationName}</p>
          </div>
        </div>
      </div>

      {/* Order List */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-3 py-2 bg-muted/30">
          <div className="flex items-center gap-1.5">
            <ClipboardList className="h-3 w-3 text-primary" />
            <h2 className="text-[10px] font-semibold">Order List</h2>
            <Badge className="text-[9px] bg-teal-100 text-teal-700 hover:bg-teal-100">{orders.length} orders</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-1.5 border-border bg-background hover:bg-muted h-6 text-[9px] px-2" onClick={handleExcelDownload}>
              <Download className="h-3 w-3" />
              Download
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 h-8 text-[9px]">
              <TableHead className="pl-6">Order #</TableHead>
              <TableHead className="pl-6">
                Product Info
                <br />
                <span className="text-[8px] text-muted-foreground">(Code / Name)</span>
              </TableHead>
              <TableHead className="pl-6">Product Category</TableHead>
              <TableHead className="pl-6">Product Subcategory</TableHead>
              <TableHead className="pl-6">
                Outbound Qty
                <br />
                <span className="text-[8px] text-muted-foreground">(Registered)</span>
              </TableHead>
              <TableHead className="pl-6">
                Outbound Qty
                <br />
                <span className="text-[8px] text-muted-foreground">(Completed)</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRows.map((row, idx) => (
              <TableRow key={`${row.orderNo}-${row.itemCode}-${idx}`} className="h-8">
                <TableCell className="text-[10px] font-medium text-primary pl-6">{row.orderNo}</TableCell>
                <TableCell className="text-[10px] pl-6">{row.itemCode} / {row.itemName}</TableCell>
                <TableCell className="text-[10px] pl-6">{row.category}</TableCell>
                <TableCell className="text-[10px] pl-6">{row.subcategory}</TableCell>
                <TableCell className="text-[10px] pl-6">{row.quantity}</TableCell>
                <TableCell className="text-[10px] pl-6">{outbound.outboundStatus === "Outbound Completed" ? row.quantity : "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-3 px-3 py-2 border-t border-border">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-muted-foreground">Rows per page:</span>
            <Select value={String(rowsPerPage)} onValueChange={(v) => { setRowsPerPage(Number(v)); setCurrentPage(1) }}>
              <SelectTrigger className="w-14 h-5 text-[9px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10" className="text-[9px]">10</SelectItem>
                <SelectItem value="30" className="text-[9px]">30</SelectItem>
                <SelectItem value="50" className="text-[9px]">50</SelectItem>
                <SelectItem value="100" className="text-[9px]">100</SelectItem>
                <SelectItem value="300" className="text-[9px]">300</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <span className="text-[9px] text-muted-foreground">
            {startIdx + 1}-{Math.min(startIdx + rowsPerPage, totalRows)} of {totalRows}
          </span>
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
