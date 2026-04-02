"use client"

import { useState } from "react"
import { Search, ChevronLeft, ChevronRight, Eye, ShoppingBag, Info, Calendar } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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

interface OrderItem {
  itemCode: string
  itemName: string
  quantity: number
}

type WorkStatus = "Pending" | "Inbound Inspection" | "Outbound Inspection" | "In Progress"

interface RegistrationOrder {
  id: string
  orderDate: string
  orderType: string
  orderNo: string
  storeCode: string
  storeName: string
  workStatus?: WorkStatus
  launchDate?: string
  estimatedShipDate?: string
  pickupDate?: string
  items: OrderItem[]
  tab: "rx" | "preorder"
}

interface FlatRow {
  rowId: string
  orderId: string
  orderDate: string
  orderType: string
  orderNo: string
  storeCode: string
  storeName: string
  itemCode: string
  itemName: string
  quantity: number
}

const mockOrders: RegistrationOrder[] = [
  { id: "r1", orderDate: "2026-03-30", orderType: "RX", orderNo: "2603080PQ4VHK6ATRZN", storeCode: "US1001", storeName: "US_STORE_1", items: [
    { itemCode: "11003102", itemName: "ACADEMYA-02", quantity: 2 },
    { itemCode: "11003121", itemName: "EGO-01", quantity: 1 },
    { itemCode: "11003123", itemName: "ATOMIC-02", quantity: 1 },
    { itemCode: "11003135", itemName: "ROB-01", quantity: 3 },
    { itemCode: "14000216", itemName: "25% BLUE", quantity: 1 },
  ], workStatus: "Pending", tab: "rx" },
  { id: "r2", orderDate: "2026-03-29", orderType: "RX", orderNo: "2603120PRASMZ3ZNGQT", storeCode: "US1002", storeName: "US_STORE_2", items: [
    { itemCode: "11003126", itemName: "SAL-01(DG)", quantity: 1 },
    { itemCode: "11003135", itemName: "ROB-01", quantity: 2 },
    { itemCode: "14000217", itemName: "167-PF-AR", quantity: 1 },
  ], workStatus: "Inbound Inspection", tab: "rx" },
  { id: "r3", orderDate: "2026-03-28", orderType: "RX", orderNo: "2602140PG2MXGWASTFM", storeCode: "US1003", storeName: "US_STORE_3", items: [
    { itemCode: "11003137", itemName: "ZIN-01", quantity: 3 },
    { itemCode: "11003140", itemName: "ACADEMYA-02(BR)", quantity: 1 },
    { itemCode: "11003144", itemName: "EVAN-01", quantity: 2 },
    { itemCode: "14000218", itemName: "167-POL-AR", quantity: 1 },
  ], workStatus: "In Progress", tab: "rx" },
  { id: "r4", orderDate: "2026-03-28", orderType: "RX", orderNo: "2603100PQP2S03Q0BEK", storeCode: "CA1001", storeName: "CA_STORE_1", items: [
    { itemCode: "11003145", itemName: "EVAN-KC1", quantity: 1 },
    { itemCode: "14000219", itemName: "167-TINT", quantity: 1 },
  ], workStatus: "Pending", tab: "rx" },
  { id: "r5", orderDate: "2026-03-27", orderType: "RX", orderNo: "2603070PPNA43NTAJFS", storeCode: "US1004", storeName: "US_ONLINE", items: [
    { itemCode: "11003147", itemName: "EVAN-BRC13", quantity: 2 },
    { itemCode: "11003102", itemName: "ACADEMYA-02", quantity: 1 },
    { itemCode: "14000220", itemName: "174-AR", quantity: 1 },
  ], workStatus: "Outbound Inspection", tab: "rx" },
  { id: "r6", orderDate: "2026-03-27", orderType: "RX", orderNo: "2603160PSPW60N3NJ4H", storeCode: "CA1002", storeName: "CA_STORE_2", items: [
    { itemCode: "11003123", itemName: "ATOMIC-02", quantity: 1 },
    { itemCode: "11003144", itemName: "EVAN-01", quantity: 2 },
    { itemCode: "11003126", itemName: "SAL-01(DG)", quantity: 1 },
    { itemCode: "14000221", itemName: "174-BG", quantity: 1 },
  ], workStatus: "Pending", tab: "rx" },
  { id: "r7", orderDate: "2026-03-26", orderType: "RX", orderNo: "2603160PSHPPTH7NJFY", storeCode: "US1001", storeName: "US_STORE_1", items: [
    { itemCode: "11003135", itemName: "ROB-01", quantity: 1 },
    { itemCode: "11003140", itemName: "ACADEMYA-02(BR)", quantity: 2 },
    { itemCode: "14000222", itemName: "CR39-TINT", quantity: 1 },
  ], workStatus: "Inbound Inspection", tab: "rx" },
  { id: "r8", orderDate: "2026-03-25", orderType: "RX", orderNo: "2602260PKSXF7P89GFD", storeCode: "US1002", storeName: "US_STORE_2", items: [
    { itemCode: "11003121", itemName: "EGO-01", quantity: 2 },
    { itemCode: "11003126", itemName: "SAL-01(DG)", quantity: 1 },
    { itemCode: "14000223", itemName: "PL-167-AR", quantity: 1 },
  ], workStatus: "In Progress", tab: "rx" },
  { id: "r9", orderDate: "2026-03-25", orderType: "RX", orderNo: "2603250PKVR4T8WMNJQ", storeCode: "CA1001", storeName: "CA_STORE_1", items: [
    { itemCode: "11003102", itemName: "ACADEMYA-02", quantity: 1 },
    { itemCode: "11003147", itemName: "EVAN-BRC13", quantity: 2 },
    { itemCode: "14000216", itemName: "25% BLUE", quantity: 1 },
  ], workStatus: "Pending", tab: "rx" },
  { id: "r10", orderDate: "2026-03-24", orderType: "RX", orderNo: "2603240PLMX6Y3HFRKW", storeCode: "US1003", storeName: "US_STORE_3", items: [
    { itemCode: "11003137", itemName: "ZIN-01", quantity: 1 },
    { itemCode: "14000217", itemName: "167-PF-AR", quantity: 1 },
  ], workStatus: "Outbound Inspection", tab: "rx" },
  { id: "r11", orderDate: "2026-03-24", orderType: "RX", orderNo: "2603240PQNT5V7BGSDL", storeCode: "US1004", storeName: "US_ONLINE", items: [
    { itemCode: "11003123", itemName: "ATOMIC-02", quantity: 2 },
    { itemCode: "11003135", itemName: "ROB-01", quantity: 1 },
    { itemCode: "14000218", itemName: "167-POL-AR", quantity: 1 },
  ], workStatus: "Pending", tab: "rx" },
  { id: "r12", orderDate: "2026-03-23", orderType: "RX", orderNo: "2603230PRWS8U2CJXMP", storeCode: "US1001", storeName: "US_STORE_1", items: [
    { itemCode: "11003146", itemName: "EVAN-GC7", quantity: 1 },
    { itemCode: "11003121", itemName: "EGO-01", quantity: 1 },
    { itemCode: "14000219", itemName: "167-TINT", quantity: 1 },
  ], workStatus: "Inbound Inspection", tab: "rx" },
  { id: "r13", orderDate: "2026-03-23", orderType: "RX", orderNo: "2603230PTXY9Z1DKYNQ", storeCode: "CA1002", storeName: "CA_STORE_2", items: [
    { itemCode: "11003140", itemName: "ACADEMYA-02(BR)", quantity: 4 },
    { itemCode: "11003126", itemName: "SAL-01(DG)", quantity: 2 },
    { itemCode: "14000220", itemName: "174-AR", quantity: 1 },
  ], workStatus: "In Progress", tab: "rx" },
  { id: "r14", orderDate: "2026-03-22", orderType: "RX", orderNo: "2603220PVAB3C4ELZOR", storeCode: "US1002", storeName: "US_STORE_2", items: [
    { itemCode: "11003145", itemName: "EVAN-KC1", quantity: 2 },
    { itemCode: "14000221", itemName: "174-BG", quantity: 1 },
  ], workStatus: "Pending", tab: "rx" },
  { id: "r15", orderDate: "2026-03-22", orderType: "RX", orderNo: "2603220PWCD5E6FMAPS", storeCode: "US1003", storeName: "US_STORE_3", items: [
    { itemCode: "11003147", itemName: "EVAN-BRC13", quantity: 1 },
    { itemCode: "11003123", itemName: "ATOMIC-02", quantity: 3 },
    { itemCode: "14000222", itemName: "CR39-TINT", quantity: 1 },
  ], workStatus: "Outbound Inspection", tab: "rx" },
  { id: "r16", orderDate: "2026-03-21", orderType: "RX", orderNo: "2603210PXEF7G8HNBQT", storeCode: "CA1001", storeName: "CA_STORE_1", items: [
    { itemCode: "11003135", itemName: "ROB-01", quantity: 2 },
    { itemCode: "11003121", itemName: "EGO-01", quantity: 1 },
    { itemCode: "14000223", itemName: "PL-167-AR", quantity: 1 },
  ], workStatus: "Pending", tab: "rx" },
  { id: "r17", orderDate: "2026-03-21", orderType: "RX", orderNo: "2603210PYGH9I0JOCRU", storeCode: "US1004", storeName: "US_ONLINE", items: [
    { itemCode: "11003102", itemName: "ACADEMYA-02", quantity: 3 },
    { itemCode: "11003140", itemName: "ACADEMYA-02(BR)", quantity: 1 },
    { itemCode: "14000216", itemName: "25% BLUE", quantity: 1 },
  ], workStatus: "Inbound Inspection", tab: "rx" },
  { id: "r18", orderDate: "2026-03-20", orderType: "RX", orderNo: "2603200PZIJ1K2LPDSV", storeCode: "US1001", storeName: "US_STORE_1", items: [
    { itemCode: "11003126", itemName: "SAL-01(DG)", quantity: 1 },
    { itemCode: "11003144", itemName: "EVAN-01", quantity: 2 },
    { itemCode: "14000217", itemName: "167-PF-AR", quantity: 1 },
  ], workStatus: "In Progress", tab: "rx" },
  { id: "r19", orderDate: "2026-03-20", orderType: "RX", orderNo: "2603200PAKL3M4NQETW", storeCode: "CA1002", storeName: "CA_STORE_2", items: [
    { itemCode: "11003147", itemName: "EVAN-BRC13", quantity: 2 },
    { itemCode: "14000218", itemName: "167-POL-AR", quantity: 1 },
  ], workStatus: "Pending", tab: "rx" },
  { id: "r20", orderDate: "2026-03-19", orderType: "RX", orderNo: "2603190PBMN5O6PRFUX", storeCode: "US1002", storeName: "US_STORE_2", items: [
    { itemCode: "11003123", itemName: "ATOMIC-02", quantity: 1 },
    { itemCode: "11003102", itemName: "ACADEMYA-02", quantity: 2 },
    { itemCode: "14000219", itemName: "167-TINT", quantity: 1 },
  ], workStatus: "Outbound Inspection", tab: "rx" },
  { id: "r21", orderDate: "2026-03-19", orderType: "RX", orderNo: "2603190PCOP7Q8RSGVY", storeCode: "US1003", storeName: "US_STORE_3", items: [
    { itemCode: "11003135", itemName: "ROB-01", quantity: 3 },
    { itemCode: "11003146", itemName: "EVAN-GC7", quantity: 1 },
    { itemCode: "14000220", itemName: "174-AR", quantity: 1 },
  ], workStatus: "Pending", tab: "rx" },
  { id: "r22", orderDate: "2026-03-18", orderType: "RX", orderNo: "2603180PDQR9S0TUHWZ", storeCode: "US1004", storeName: "US_ONLINE", items: [
    { itemCode: "11003140", itemName: "ACADEMYA-02(BR)", quantity: 2 },
    { itemCode: "11003126", itemName: "SAL-01(DG)", quantity: 1 },
    { itemCode: "11003144", itemName: "EVAN-01", quantity: 1 },
    { itemCode: "14000221", itemName: "174-BG", quantity: 1 },
  ], workStatus: "Inbound Inspection", tab: "rx" },
  { id: "r23", orderDate: "2026-03-18", orderType: "RX", orderNo: "2603180PEST1U2VWIXA", storeCode: "CA1001", storeName: "CA_STORE_1", items: [
    { itemCode: "11003145", itemName: "EVAN-KC1", quantity: 1 },
    { itemCode: "11003121", itemName: "EGO-01", quantity: 2 },
    { itemCode: "14000222", itemName: "CR39-TINT", quantity: 1 },
  ], workStatus: "In Progress", tab: "rx" },
  { id: "r24", orderDate: "2026-03-17", orderType: "RX", orderNo: "2603170PFUV3W4XYJZB", storeCode: "US1001", storeName: "US_STORE_1", items: [
    { itemCode: "11003102", itemName: "ACADEMYA-02", quantity: 1 },
    { itemCode: "14000223", itemName: "PL-167-AR", quantity: 1 },
  ], workStatus: "Pending", tab: "rx" },
  { id: "r25", orderDate: "2026-03-17", orderType: "RX", orderNo: "2603170PGWX5Y6ZAKCC", storeCode: "US1002", storeName: "US_STORE_2", items: [
    { itemCode: "11003123", itemName: "ATOMIC-02", quantity: 2 },
    { itemCode: "11003135", itemName: "ROB-01", quantity: 1 },
    { itemCode: "14000216", itemName: "25% BLUE", quantity: 1 },
  ], workStatus: "Outbound Inspection", tab: "rx" },
  { id: "r26", orderDate: "2026-03-16", orderType: "RX", orderNo: "2603160PHYZ7A8BLDDE", storeCode: "CA1002", storeName: "CA_STORE_2", items: [
    { itemCode: "11003146", itemName: "EVAN-GC7", quantity: 1 },
    { itemCode: "11003137", itemName: "ZIN-01", quantity: 2 },
    { itemCode: "14000217", itemName: "167-PF-AR", quantity: 1 },
  ], workStatus: "Pending", tab: "rx" },
  { id: "r27", orderDate: "2026-03-16", orderType: "RX", orderNo: "2603160PJAB9C0DMEEF", storeCode: "US1003", storeName: "US_STORE_3", items: [
    { itemCode: "11003144", itemName: "EVAN-01", quantity: 1 },
    { itemCode: "11003126", itemName: "SAL-01(DG)", quantity: 2 },
    { itemCode: "14000218", itemName: "167-POL-AR", quantity: 1 },
  ], workStatus: "Inbound Inspection", tab: "rx" },
  { id: "r28", orderDate: "2026-03-15", orderType: "RX", orderNo: "2603150PKCD1E2FNFFG", storeCode: "US1004", storeName: "US_ONLINE", items: [
    { itemCode: "11003121", itemName: "EGO-01", quantity: 3 },
    { itemCode: "11003102", itemName: "ACADEMYA-02", quantity: 1 },
    { itemCode: "14000219", itemName: "167-TINT", quantity: 1 },
  ], workStatus: "In Progress", tab: "rx" },
  { id: "r29", orderDate: "2026-03-15", orderType: "RX", orderNo: "2603150PLEF3G4HOGGH", storeCode: "US1001", storeName: "US_STORE_1", items: [
    { itemCode: "11003145", itemName: "EVAN-KC1", quantity: 2 },
    { itemCode: "11003135", itemName: "ROB-01", quantity: 1 },
    { itemCode: "14000220", itemName: "174-AR", quantity: 1 },
  ], workStatus: "Pending", tab: "rx" },
  { id: "r30", orderDate: "2026-03-14", orderType: "RX", orderNo: "2603140PMGH5I6JPHHI", storeCode: "CA1001", storeName: "CA_STORE_1", items: [
    { itemCode: "11003137", itemName: "ZIN-01", quantity: 1 },
    { itemCode: "11003146", itemName: "EVAN-GC7", quantity: 1 },
    { itemCode: "14000221", itemName: "174-BG", quantity: 1 },
  ], workStatus: "Outbound Inspection", tab: "rx" },
  { id: "r31", orderDate: "2026-03-14", orderType: "RX", orderNo: "2603140PNIJ7K8LQIIJ", storeCode: "US1002", storeName: "US_STORE_2", items: [
    { itemCode: "11003126", itemName: "SAL-01(DG)", quantity: 2 },
    { itemCode: "11003144", itemName: "EVAN-01", quantity: 1 },
    { itemCode: "14000222", itemName: "CR39-TINT", quantity: 1 },
  ], workStatus: "Pending", tab: "rx" },
  { id: "r32", orderDate: "2026-03-13", orderType: "RX", orderNo: "2603130POKL9M0NRJJK", storeCode: "US1003", storeName: "US_STORE_3", items: [
    { itemCode: "11003102", itemName: "ACADEMYA-02", quantity: 4 },
    { itemCode: "11003121", itemName: "EGO-01", quantity: 1 },
    { itemCode: "14000223", itemName: "PL-167-AR", quantity: 1 },
  ], workStatus: "Inbound Inspection", tab: "rx" },
  { id: "p1", orderDate: "2026-03-30", orderType: "Pre-Order", orderNo: "2603300PPRE1A2B3C4D", storeCode: "US1001", storeName: "US_STORE_1", items: [
    { itemCode: "11003140", itemName: "ACADEMYA-02(BR)", quantity: 5 },
    { itemCode: "11003102", itemName: "ACADEMYA-02", quantity: 3 },
    { itemCode: "11003137", itemName: "ZIN-01", quantity: 2 },
    { itemCode: "11003121", itemName: "EGO-01", quantity: 4 },
    { itemCode: "11003123", itemName: "ATOMIC-02", quantity: 1 },
  ], launchDate: "2026-04-15", estimatedShipDate: "2026-04-10", pickupDate: "2026-04-12", tab: "preorder" },
  { id: "p2", orderDate: "2026-03-29", orderType: "Pre-Order", orderNo: "2603290PPRE5E6F7G8H", storeCode: "CA1001", storeName: "CA_STORE_1", items: [
    { itemCode: "11003144", itemName: "EVAN-01", quantity: 3 },
    { itemCode: "11003145", itemName: "EVAN-KC1", quantity: 2 },
  ], launchDate: "2026-04-15", estimatedShipDate: "2026-04-11", pickupDate: "2026-04-13", tab: "preorder" },
  { id: "p3", orderDate: "2026-03-28", orderType: "Pre-Order", orderNo: "2603280PPRE9I0J1K2L", storeCode: "US1003", storeName: "US_STORE_3", items: [
    { itemCode: "11003146", itemName: "EVAN-GC7", quantity: 2 },
    { itemCode: "11003135", itemName: "ROB-01", quantity: 1 },
    { itemCode: "11003147", itemName: "EVAN-BRC13", quantity: 3 },
    { itemCode: "11003126", itemName: "SAL-01(DG)", quantity: 2 },
  ], launchDate: "2026-04-20", estimatedShipDate: "2026-04-16", pickupDate: "2026-04-18", tab: "preorder" },
  { id: "p4", orderDate: "2026-03-27", orderType: "Pre-Order", orderNo: "2603270PPREM3N4O5P6", storeCode: "US1004", storeName: "US_ONLINE", items: [
    { itemCode: "11003102", itemName: "ACADEMYA-02", quantity: 4 },
    { itemCode: "11003123", itemName: "ATOMIC-02", quantity: 1 },
    { itemCode: "11003140", itemName: "ACADEMYA-02(BR)", quantity: 2 },
  ], launchDate: "2026-04-20", estimatedShipDate: "2026-04-17", pickupDate: "2026-04-19", tab: "preorder" },
  { id: "p5", orderDate: "2026-03-26", orderType: "Pre-Order", orderNo: "2603260PPREQ7R8S9T0", storeCode: "CA1002", storeName: "CA_STORE_2", items: [
    { itemCode: "11003126", itemName: "SAL-01(DG)", quantity: 1 },
  ], launchDate: "2026-04-25", estimatedShipDate: "2026-04-21", pickupDate: "2026-04-23", tab: "preorder" },
  { id: "p6", orderDate: "2026-03-25", orderType: "Pre-Order", orderNo: "2603250PPREU1V2W3X4", storeCode: "US1001", storeName: "US_STORE_1", items: [
    { itemCode: "11003135", itemName: "ROB-01", quantity: 3 },
    { itemCode: "11003146", itemName: "EVAN-GC7", quantity: 2 },
  ], launchDate: "2026-04-25", estimatedShipDate: "2026-04-22", pickupDate: "2026-04-24", tab: "preorder" },
  { id: "p7", orderDate: "2026-03-24", orderType: "Pre-Order", orderNo: "2603240PPREY5Z6A7B8", storeCode: "US1002", storeName: "US_STORE_2", items: [
    { itemCode: "11003121", itemName: "EGO-01", quantity: 5 },
    { itemCode: "11003137", itemName: "ZIN-01", quantity: 2 },
    { itemCode: "11003145", itemName: "EVAN-KC1", quantity: 1 },
  ], launchDate: "2026-05-01", estimatedShipDate: "2026-04-27", pickupDate: "2026-04-29", tab: "preorder" },
  { id: "p8", orderDate: "2026-03-24", orderType: "Pre-Order", orderNo: "2603240PPREC9D0E1F2", storeCode: "US1003", storeName: "US_STORE_3", items: [
    { itemCode: "11003144", itemName: "EVAN-01", quantity: 4 },
  ], launchDate: "2026-05-01", estimatedShipDate: "2026-04-28", pickupDate: "2026-04-30", tab: "preorder" },
  { id: "p9", orderDate: "2026-03-23", orderType: "Pre-Order", orderNo: "2603230PPREG3H4I5J6", storeCode: "CA1001", storeName: "CA_STORE_1", items: [
    { itemCode: "11003102", itemName: "ACADEMYA-02", quantity: 2 },
    { itemCode: "11003147", itemName: "EVAN-BRC13", quantity: 3 },
    { itemCode: "11003123", itemName: "ATOMIC-02", quantity: 1 },
    { itemCode: "11003140", itemName: "ACADEMYA-02(BR)", quantity: 2 },
  ], launchDate: "2026-05-10", estimatedShipDate: "2026-05-06", pickupDate: "2026-05-08", tab: "preorder" },
  { id: "p10", orderDate: "2026-03-22", orderType: "Pre-Order", orderNo: "2603220PPREK7L8M9N0", storeCode: "US1004", storeName: "US_ONLINE", items: [
    { itemCode: "11003126", itemName: "SAL-01(DG)", quantity: 3 },
    { itemCode: "11003135", itemName: "ROB-01", quantity: 1 },
  ], launchDate: "2026-05-10", estimatedShipDate: "2026-05-07", pickupDate: "2026-05-09", tab: "preorder" },
  { id: "p11", orderDate: "2026-03-21", orderType: "Pre-Order", orderNo: "2603210PPREO1P2Q3R4", storeCode: "US1001", storeName: "US_STORE_1", items: [
    { itemCode: "11003137", itemName: "ZIN-01", quantity: 2 },
    { itemCode: "11003146", itemName: "EVAN-GC7", quantity: 1 },
    { itemCode: "11003121", itemName: "EGO-01", quantity: 4 },
    { itemCode: "11003102", itemName: "ACADEMYA-02", quantity: 1 },
    { itemCode: "11003145", itemName: "EVAN-KC1", quantity: 2 },
  ], launchDate: "2026-05-15", estimatedShipDate: "2026-05-11", pickupDate: "2026-05-13", tab: "preorder" },
  { id: "p12", orderDate: "2026-03-20", orderType: "Pre-Order", orderNo: "2603200PPRES5T6U7V8", storeCode: "CA1002", storeName: "CA_STORE_2", items: [
    { itemCode: "11003144", itemName: "EVAN-01", quantity: 1 },
    { itemCode: "11003123", itemName: "ATOMIC-02", quantity: 3 },
  ], launchDate: "2026-05-15", estimatedShipDate: "2026-05-12", pickupDate: "2026-05-14", tab: "preorder" },
  { id: "p13", orderDate: "2026-03-19", orderType: "Pre-Order", orderNo: "2603190PPREW9X0Y1Z2", storeCode: "US1002", storeName: "US_STORE_2", items: [
    { itemCode: "11003140", itemName: "ACADEMYA-02(BR)", quantity: 2 },
    { itemCode: "11003147", itemName: "EVAN-BRC13", quantity: 1 },
    { itemCode: "11003126", itemName: "SAL-01(DG)", quantity: 2 },
  ], launchDate: "2026-05-20", estimatedShipDate: "2026-05-16", pickupDate: "2026-05-18", tab: "preorder" },
  { id: "p14", orderDate: "2026-03-18", orderType: "Pre-Order", orderNo: "2603180PPREA3B4C5D6", storeCode: "US1003", storeName: "US_STORE_3", items: [
    { itemCode: "11003135", itemName: "ROB-01", quantity: 1 },
    { itemCode: "11003102", itemName: "ACADEMYA-02", quantity: 2 },
  ], launchDate: "2026-05-20", estimatedShipDate: "2026-05-17", pickupDate: "2026-05-19", tab: "preorder" },
  { id: "p15", orderDate: "2026-03-17", orderType: "Pre-Order", orderNo: "2603170PPREE7F8G9H0", storeCode: "CA1001", storeName: "CA_STORE_1", items: [
    { itemCode: "11003146", itemName: "EVAN-GC7", quantity: 3 },
    { itemCode: "11003137", itemName: "ZIN-01", quantity: 1 },
    { itemCode: "11003121", itemName: "EGO-01", quantity: 2 },
  ], launchDate: "2026-05-25", estimatedShipDate: "2026-05-21", pickupDate: "2026-05-23", tab: "preorder" },
]

function flattenOrders(orders: RegistrationOrder[]): FlatRow[] {
  return orders.flatMap((order) =>
    order.items.map((item, idx) => ({
      rowId: `${order.id}-${idx}`,
      orderId: order.id,
      orderDate: order.orderDate,
      orderType: order.orderType,
      orderNo: order.orderNo,
      storeCode: order.storeCode,
      storeName: order.storeName,
      itemCode: item.itemCode,
      itemName: item.itemName,
      quantity: item.quantity,
    }))
  )
}

interface OutboundRegistrationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OutboundRegistrationModal({ open, onOpenChange }: OutboundRegistrationModalProps) {
  const [activeTab, setActiveTab] = useState<"rx" | "preorder">("preorder")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [rowsPerPage, setRowsPerPage] = useState(30)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchInput, setSearchInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [modalBP, setModalBP] = useState("")

  const handleSearch = () => {
    setSearchQuery(searchInput)
    setCurrentPage(1)
  }

  const filteredOrders = mockOrders
    .filter((o) => o.tab === activeTab)
    .filter((o) => searchQuery.length < 2 || o.orderNo.toLowerCase().includes(searchQuery.toLowerCase()))
  const totalOrders = filteredOrders.length
  const totalPages = Math.ceil(totalOrders / rowsPerPage)
  const startIdx = (currentPage - 1) * rowsPerPage
  const paginatedOrders = filteredOrders.slice(startIdx, startIdx + rowsPerPage)

  const handleTabChange = (tab: "rx" | "preorder") => {
    setActiveTab(tab)
    setSelectedItems([])
    setCurrentPage(1)
    setSearchInput("")
    setSearchQuery("")
  }

  // Get the locked country (BP) from the first selected item
  const getCountryCode = (storeCode: string) => storeCode.replace(/[0-9]/g, "")
  const selectedCountry = selectedItems.length > 0
    ? (() => { const order = filteredOrders.find((o) => o.id === selectedItems[0]); return order ? getCountryCode(order.storeCode) : null })()
    : null

  const isOrderDisabled = (order: RegistrationOrder) => {
    if (!selectedCountry) return false
    return getCountryCode(order.storeCode) !== selectedCountry
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const targetCountry = selectedCountry || getCountryCode(paginatedOrders[0]?.storeCode)
      setSelectedItems(paginatedOrders.filter((o) => getCountryCode(o.storeCode) === targetCountry).map((o) => o.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, id])
    } else {
      const newItems = selectedItems.filter((i) => i !== id)
      setSelectedItems(newItems)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[85vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="px-5 pt-4 pb-3 border-b border-border">
          <DialogTitle className="text-xs font-semibold">Outbound Registration</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Tabs */}
          <div className="px-5 pt-8">
            <div className="flex gap-4 border-b border-border">
              <button
                onClick={() => handleTabChange("preorder")}
                className={`pb-3 px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === "preorder"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Pre-Order
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 px-5 pt-5">
            <div>
              <label className="block text-[9px] font-medium text-muted-foreground mb-1">BP</label>
              <Select value={modalBP} onValueChange={(v) => setModalBP(v)}>
                <SelectTrigger className="w-[130px] !h-6 text-[9px] bg-background border-border">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="C1002" className="text-[9px]">C1002 미국법인</SelectItem>
                  <SelectItem value="C1003" className="text-[9px]">C1003 캐나다법인</SelectItem>
                  <SelectItem value="C1004" className="text-[9px]">C1004 일본법인</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-[9px] font-medium text-muted-foreground mb-1">Store</label>
              <Select defaultValue="" disabled={!modalBP}>
                <SelectTrigger className="w-[130px] !h-6 text-[9px] bg-background border-border disabled:opacity-50 disabled:cursor-not-allowed">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  {modalBP === "C1002" && <>
                    <SelectItem value="US1001" className="text-[9px]">US1001</SelectItem>
                    <SelectItem value="US1002" className="text-[9px]">US1002</SelectItem>
                    <SelectItem value="US1003" className="text-[9px]">US1003</SelectItem>
                    <SelectItem value="US1004" className="text-[9px]">US1004</SelectItem>
                  </>}
                  {modalBP === "C1003" && <>
                    <SelectItem value="CA1001" className="text-[9px]">CA1001</SelectItem>
                    <SelectItem value="CA1002" className="text-[9px]">CA1002</SelectItem>
                  </>}
                  {modalBP === "C1004" && <>
                    <SelectItem value="JP1001" className="text-[9px]">JP1001</SelectItem>
                    <SelectItem value="JP1002" className="text-[9px]">JP1002</SelectItem>
                  </>}
                </SelectContent>
              </Select>
            </div>
            {activeTab === "rx" && (
              <div>
                <label className="block text-[9px] font-medium text-muted-foreground mb-1">Work Status</label>
                <Select defaultValue="">
                  <SelectTrigger className="w-[130px] !h-6 text-[9px] bg-background border-border">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending" className="text-[9px]">Pending</SelectItem>
                    <SelectItem value="inbound-inspection" className="text-[9px]">Inbound Inspection</SelectItem>
                    <SelectItem value="outbound-inspection" className="text-[9px]">Outbound Inspection</SelectItem>
                    <SelectItem value="in-progress" className="text-[9px]">In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Date Search - Pre-Order only */}
          {activeTab === "preorder" && (
            <div className="flex items-center gap-2 px-5 pt-3">
              <Select defaultValue="order">
                <SelectTrigger className="w-[110px] !h-6 text-[9px] bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="order" className="text-[9px]">Order Date</SelectItem>
                    <SelectItem value="launch" className="text-[9px]">Launch Date</SelectItem>
                    <SelectItem value="ship" className="text-[9px]">Ship Date</SelectItem>
                    <SelectItem value="pickup" className="text-[9px]">Pickup Date</SelectItem>
                  </SelectContent>
                </Select>
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none z-10" />
                  <Input
                    type="date"
                    defaultValue={new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0]}
                    className="w-[110px] pl-6 !h-6 bg-background border-border !text-[9px] [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-datetime-edit]:text-[9px]"
                  />
                </div>
                <Select defaultValue="00">
                  <SelectTrigger className="w-[60px] !h-6 text-[9px] bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={String(i).padStart(2, "0")} className="text-[9px]">
                        {String(i).padStart(2, "0")}:00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-[9px] text-muted-foreground">~</span>
                <div className="relative">
                  <Calendar className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none z-10" />
                  <Input
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="w-[110px] pl-6 !h-6 bg-background border-border !text-[9px] [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-datetime-edit]:text-[9px]"
                  />
                </div>
                <Select defaultValue="23">
                  <SelectTrigger className="w-[60px] !h-6 text-[9px] bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={String(i).padStart(2, "0")} className="text-[9px]">
                        {String(i).padStart(2, "0")}:00
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Search & Selected */}
          <div className="flex items-center gap-1.5 px-5 pt-3 pb-3">
            <Input
              placeholder="Search Order #"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="h-7 w-[200px] px-3 !text-[10px] placeholder:text-[10px] placeholder:text-muted-foreground/40 bg-background border-border"
            />
            <Button size="icon" className="h-7 w-7 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleSearch}>
              <Search className="h-3 w-3" />
            </Button>
            <div className="flex-1" />
            {selectedItems.length > 0 && (
              <span className="text-[10px] text-primary font-medium">{selectedItems.length} selected</span>
            )}
          </div>

          {/* Notice */}
          <div className="mx-5 mt-3 px-3 py-2 bg-amber-50 border border-amber-200 rounded-md text-[10px] text-amber-800 flex flex-col gap-1">
            <span>⭐️ Outbound registration is available only for orders within the same BP (Business Partner).</span>
            <span>⭐️ Even if multiple stores are selected, outbound orders will be created per store.</span>
          </div>

          {/* Column Header */}
          <div className="flex items-center gap-2.5 mx-5 px-2 py-2 mt-4 bg-muted/50 rounded-md text-[10px] font-medium text-muted-foreground">
            <Checkbox
              checked={paginatedOrders.length > 0 && paginatedOrders.every((o) => selectedItems.includes(o.id))}
              onCheckedChange={handleSelectAll}
              className="h-3.5 w-3.5 shrink-0"
            />
            <span className="w-[120px] text-center">Order Date</span>
            {activeTab === "preorder" && <>
              <span className="w-[75px] text-center">Launch Date</span>
              <span className="w-[75px] text-center">Ship Date</span>
              <span className="w-[75px] text-center">Pickup Date</span>
            </>}
            <span className="w-[80px] text-center">Order Tag</span>
            <span className="w-[180px]">Order #</span>
            <span className="flex-1 inline-flex items-center gap-1">
              Store Info
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-primary cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="text-[9px] max-w-[180px] bg-white text-foreground border border-border shadow-md">
                    <p>Only orders from the same store can be selected together.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
            {activeTab === "rx" && <span className="w-[120px] text-center">Work Status</span>}
          </div>

          {/* Order List */}
          <div className="flex-1 overflow-y-auto px-5 py-2">
            {paginatedOrders.map((order) => (
              <div
                key={order.id}
                className={`border-b border-border/50 last:border-b-0 transition-colors ${
                  selectedItems.includes(order.id) ? "bg-primary/5" : ""
                }`}
              >
                {/* Order Header */}
                <div
                  className={`flex items-center gap-2.5 px-2 py-2 ${isOrderDisabled(order) ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                  onClick={() => !isOrderDisabled(order) && handleSelectItem(order.id, !selectedItems.includes(order.id))}
                >
                  <Checkbox
                    checked={selectedItems.includes(order.id)}
                    onCheckedChange={(checked) => handleSelectItem(order.id, checked as boolean)}
                    onClick={(e) => e.stopPropagation()}
                    disabled={isOrderDisabled(order)}
                    className="h-3.5 w-3.5"
                  />
                  <span className="text-[9px] text-muted-foreground w-[120px] text-center whitespace-nowrap">{order.orderDate} {String((order.id.charCodeAt(1) * 7 + order.id.charCodeAt(0) * 3) % 24).padStart(2, "0")}:{String((order.id.charCodeAt(1) * 13 + order.id.charCodeAt(0) * 11) % 60).padStart(2, "0")} (EST)</span>
                  {activeTab === "preorder" && <>
                    <span className="text-[10px] text-blue-600 font-medium w-[75px] text-center">{order.launchDate}</span>
                    <span className="text-[10px] text-blue-600 font-medium w-[75px] text-center">{order.estimatedShipDate}</span>
                    <span className="text-[10px] text-muted-foreground w-[75px] text-center">{order.pickupDate}</span>
                  </>}
                  <span className="w-[80px] text-center">
                    <span className={`text-[9px] font-medium whitespace-nowrap px-2 py-0.5 rounded text-center inline-block ${
                      order.orderType === "Pre-Order"
                        ? "bg-[oklch(0.93_0.04_280)] text-[oklch(0.45_0.08_275)]"
                        : "bg-[oklch(0.93_0.04_210)] text-[oklch(0.40_0.07_205)]"
                    }`}>{order.orderType === "Pre-Order" ? "Pre-Order" : "RX"}</span>
                  </span>
                  <span className="text-[10px] text-primary font-medium w-[180px] truncate">{order.orderNo}</span>
                  <span className="text-[10px] text-muted-foreground flex-1 whitespace-nowrap">{order.storeCode} / {order.storeName}</span>
                  {activeTab === "rx" && order.workStatus && (
                    <span className={`text-[8px] font-medium w-[120px] whitespace-nowrap px-2 py-0.5 rounded text-center ${
                      order.workStatus === "Pending" ? "bg-[oklch(0.94_0.04_85)] text-[oklch(0.45_0.08_75)]" :
                      order.workStatus === "Inbound Inspection" ? "bg-[oklch(0.93_0.05_55)] text-[oklch(0.42_0.09_50)]" :
                      order.workStatus === "Outbound Inspection" ? "bg-[oklch(0.93_0.04_210)] text-[oklch(0.40_0.07_205)]" :
                      "bg-[oklch(0.93_0.04_160)] text-[oklch(0.40_0.07_155)]"
                    }`}>{order.workStatus}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end gap-3 px-5 py-2.5 border-t border-border">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground">Rows per page:</span>
              <Select value={String(rowsPerPage)} onValueChange={(v) => { setRowsPerPage(Number(v)); setCurrentPage(1) }}>
                <SelectTrigger className="w-16 h-5 text-[9px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30" className="text-[10px]">30</SelectItem>
                  <SelectItem value="50" className="text-[10px]">50</SelectItem>
                  <SelectItem value="100" className="text-[10px]">100</SelectItem>
                  <SelectItem value="300" className="text-[10px]">300</SelectItem>
                  <SelectItem value="500" className="text-[10px]">500</SelectItem>
                  <SelectItem value="1000" className="text-[10px]">1000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="text-[10px] text-muted-foreground">
              {totalOrders > 0 ? `${startIdx + 1}-${Math.min(startIdx + rowsPerPage, totalOrders)} of ${totalOrders}` : "0"}
            </span>
            <div className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon" className="h-6 w-6" disabled={currentPage <= 1} onClick={() => setCurrentPage((p) => p - 1)}>
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" disabled={currentPage >= totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-3">
<Button
            className="h-7 text-[10px] px-4 bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={selectedItems.length === 0}
          >
            Register
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
