"use client"

import { useState, useRef } from "react"
import { toast } from "sonner"
import * as XLSX from "xlsx"
import { ArrowLeft, Package, ClipboardList, ChevronLeft, ChevronRight, Download, Printer, FileText } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { outboundDetails } from "@/lib/mock-data"

interface OutboundOrderDetailProps {
  outboundId: string
  onBack: () => void
}

export function OutboundOrderDetail({ outboundId, onBack }: OutboundOrderDetailProps) {
  const detail = outboundDetails[outboundId]
  const [rowsPerPage, setRowsPerPage] = useState(30)
  const [currentPage, setCurrentPage] = useState(1)
  const [labelModalOpen, setLabelModalOpen] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

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

  const handleLabelPrint = () => {
    setLabelModalOpen(true)
  }

  const totalQty = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0)

  // Mock TMS tracking number
  const mockTrackingNo = `${Math.floor(Math.random() * 9000 + 1000)} ${Math.floor(Math.random() * 9000 + 1000)} ${Math.floor(Math.random() * 9000 + 1000)}`
  const mockShipDate = new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "2-digit" }).toUpperCase().replace(/ /g, "")
  const mockWeight = (totalQty * 0.35 + 0.5).toFixed(2)

  const handlePrint = () => {
    if (!printRef.current) return
    const printWindow = window.open("", "_blank")
    if (!printWindow) return
    const content = printRef.current.innerHTML
    printWindow.document.write(`
      <html><head><title>Label - ${outbound.uvNo}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        * { box-sizing: border-box; }
      </style></head><body>${content}</body></html>
    `)
    printWindow.document.close()
    printWindow.onload = () => {
      printWindow.print()
      toast.success("Label printed successfully", {
        description: `I/V No. ${outbound.uvNo}`,
      })
      setLabelModalOpen(false)
    }
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

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        {outbound.orderType === "RX" && (
          <Button
            variant="outline"
            className="gap-1.5 border-violet-500 text-violet-600 bg-background hover:bg-violet-50 h-6 text-[9px] px-2"
            onClick={handleLabelPrint}
            disabled={outbound.outboundStatus !== "Outbound Completed" && outbound.outboundStatus !== "Outbound Registered"}
          >
            <Printer className="h-3 w-3" />
            Label Print
          </Button>
        )}
        <Button variant="outline" className="gap-1.5 border-border bg-background hover:bg-muted h-6 text-[9px] px-2" onClick={handleExcelDownload}>
          <Download className="h-3 w-3" />
          Download
        </Button>
      </div>

      {/* Order List */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-3 py-2 bg-muted/30">
          <div className="flex items-center gap-1.5">
            <ClipboardList className="h-3 w-3 text-primary" />
            <h2 className="text-[10px] font-semibold">Order List</h2>
            <Badge className="text-[9px] bg-teal-100 text-teal-700 hover:bg-teal-100">{orders.length} orders</Badge>
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

      {/* Label Print Modal */}
      {outbound.orderType === "RX" && (
        <Dialog open={labelModalOpen} onOpenChange={setLabelModalOpen}>
          <DialogContent className="max-w-[600px] p-0 overflow-hidden">
            <DialogTitle className="sr-only">Shipping Label Preview</DialogTitle>
            <div className="flex items-center px-4 py-3 border-b border-border bg-muted/30">
              <FileText className="h-4 w-4 text-violet-600" />
              <span className="text-xs font-semibold ml-2">Shipping Label Preview</span>
            </div>
            <div ref={printRef} className="px-4 py-4 overflow-y-auto max-h-[70vh]">
              <div className="border-[3px] border-black bg-white" style={{ fontFamily: "Arial, sans-serif" }}>
                {/* FROM Section */}
                <div className="flex border-b-[3px] border-black">
                  <div className="flex-1 p-2.5 border-r-[2px] border-black">
                    <p className="text-[8px] font-bold">FROM:</p>
                    <p className="text-[10px] font-bold">GENTLE MONSTER</p>
                    <p className="text-[9px]">16221 HERON AVE</p>
                    <p className="text-[9px]">La Mirada CA 90638</p>
                    <p className="text-[9px]">US</p>
                  </div>
                  <div className="w-[180px] p-2.5">
                    <p className="text-[8px]"><span className="font-bold">SHIP DATE:</span> {mockShipDate}</p>
                    <p className="text-[8px]"><span className="font-bold">ACTWGT:</span> {mockWeight} LB</p>
                    <p className="text-[8px]"><span className="font-bold">DIMMED:</span> 15 X 11 X 7 IN</p>
                    <p className="text-[8px] mt-1"><span className="font-bold">BILL SENDER</span></p>
                    <p className="text-[8px]">EEI: NO EEI 30.37(f)</p>
                  </div>
                </div>

                {/* TO Section */}
                <div className="p-3 border-b-[3px] border-black">
                  <p className="text-[8px] font-bold">TO:</p>
                  <p className="text-sm font-bold">{outbound.toStoreName}</p>
                  <p className="text-[10px]">{outbound.toStoreCode}</p>
                  <p className="text-[10px] mt-1">{outbound.toLocationName}</p>
                  <div className="flex justify-between items-end mt-2">
                    <div>
                      <p className="text-[8px]"><span className="font-bold">INV:</span> {outbound.uvNo}</p>
                      <p className="text-[8px]"><span className="font-bold">REF:</span> {orders[0]?.orderNo}</p>
                      <p className="text-[8px]"><span className="font-bold">PO:</span></p>
                    </div>
                    <p className="text-lg font-bold">({outbound.toStoreCode.replace(/[0-9]/g, "")})</p>
                  </div>
                </div>

                {/* Barcode Area */}
                <div className="flex border-b-[3px] border-black">
                  <div className="flex-1 p-3 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-1">
                      {/* Mock 2D Barcode */}
                      <div className="grid grid-cols-12 gap-[1px] w-[120px] h-[120px]">
                        {Array.from({ length: 144 }, (_, i) => (
                          <div key={i} className={`${(i * 7 + i * i * 3) % 3 === 0 ? "bg-black" : "bg-white"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="w-[140px] p-3 flex flex-col items-center justify-center gap-2 border-l-[2px] border-black">
                    <p className="text-xl font-black tracking-tight">FedEx</p>
                    <p className="text-[8px]">Ground</p>
                    <div className="border-2 border-black px-3 py-1 mt-1">
                      <p className="text-lg font-black">G</p>
                    </div>
                    <p className="text-sm font-black bg-black text-white px-2 py-0.5">ETD</p>
                  </div>
                </div>

                {/* Tracking Number */}
                <div className="p-3">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs"><span className="font-bold">TRK#</span> <span className="text-xl font-bold tracking-wider">{mockTrackingNo}</span></p>
                    <p className="text-lg font-bold">INTL</p>
                  </div>
                  {/* Mock Linear Barcode */}
                  <div className="flex items-end justify-center gap-[1px] h-[50px] mt-2">
                    {Array.from({ length: 80 }, (_, i) => (
                      <div key={i} className="bg-black" style={{ width: (i * 3 + 7) % 3 === 0 ? "2px" : "1px", height: `${30 + ((i * 7) % 20)}px` }} />
                    ))}
                  </div>
                  <p className="text-center text-[8px] font-mono mt-1 tracking-wider">9632 0026 6 (000 000 0000) 0 00 {mockTrackingNo}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end px-4 py-3 border-t border-border">
              <Button size="sm" className="h-7 text-[10px] gap-1.5 bg-violet-600 hover:bg-violet-700 text-white" onClick={handlePrint}>
                <Printer className="h-3 w-3" />
                Print
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
