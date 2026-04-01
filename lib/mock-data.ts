export interface OutboundRecord {
  id: string
  registrationDate: string
  outboundStatus: string
  type: string
  orderType: "RX" | "Pre-Order"
  uvNo: string
  bpCode: string
  bpName: string
  fromStoreCode: string
  fromStoreName: string
  fromLocationCode: string
  fromLocationName: string
  toStoreCode: string
  toStoreName: string
  toLocationCode: string
  toLocationName: string
  outboundRequestDate: string
  createdBy: string
}

export interface OrderItem {
  id: string
  itemCode: string
  itemName: string
  color: string
  size: string
  quantity: number
  unitPrice: number
  category?: string
  subcategory?: string
}

export interface Order {
  id: string
  orderNo: string
  orderDate: string
  customerName: string
  items: OrderItem[]
}

export interface OutboundDetail {
  outbound: OutboundRecord
  orders: Order[]
}

export const outboundRecords: OutboundRecord[] = [
  {
    id: "1",
    registrationDate: "2026-03-30 16:12 (EST)",
    outboundStatus: "Outbound Completed",
    type: "S2S",
    orderType: "RX",
    uvNo: "TO0012649",
    bpCode: "C515",
    bpName: "GM_MFG(HQ)",
    fromStoreCode: "US1001",
    fromStoreName: "US_STORE_01",
    fromLocationCode: "1002",
    fromLocationName: "RX HOLDING",
    toStoreCode: "US1002",
    toStoreName: "US_OFFLINE RX LAB",
    toLocationCode: "1001",
    toLocationName: "AVAILABLE",
    outboundRequestDate: "2026-03-30 (EST)",
    createdBy: "NAMCHO",
  },
  {
    id: "2",
    registrationDate: "2026-03-29 15:48 (EST)",
    outboundStatus: "Outbound Registered",
    type: "L2S",
    orderType: "Pre-Order",
    uvNo: "TO0012639",
    bpCode: "C515",
    bpName: "GM_MFG(HQ)",
    fromStoreCode: "US1003",
    fromStoreName: "US_WAREHOUSE",
    fromLocationCode: "1110",
    fromLocationName: "AVAILABLE",
    toStoreCode: "US1001",
    toStoreName: "US_STORE_01",
    toLocationCode: "2000",
    toLocationName: "ONLINE PICKUP",
    outboundRequestDate: "2026-03-29 (EST)",
    createdBy: "monster1437",
  },
  {
    id: "3",
    registrationDate: "2026-03-29 15:40 (EST)",
    outboundStatus: "Pending Registration",
    type: "S2S",
    orderType: "RX",
    uvNo: "TO0012638",
    bpCode: "C515",
    bpName: "GM_MFG(HQ)",
    fromStoreCode: "US1001",
    fromStoreName: "US_STORE_01",
    fromLocationCode: "1002",
    fromLocationName: "RX HOLDING",
    toStoreCode: "US1002",
    toStoreName: "US_OFFLINE RX LAB",
    toLocationCode: "1001",
    toLocationName: "AVAILABLE",
    outboundRequestDate: "2026-03-29 (EST)",
    createdBy: "uk_Isaac",
  },
  {
    id: "4",
    registrationDate: "2026-03-20 14:18 (EST)",
    outboundStatus: "Outbound Planned",
    type: "L2S",
    orderType: "Pre-Order",
    uvNo: "TO0012554",
    bpCode: "C515",
    bpName: "GM_MFG(HQ)",
    fromStoreCode: "US1003",
    fromStoreName: "US_WAREHOUSE",
    fromLocationCode: "1110",
    fromLocationName: "AVAILABLE",
    toStoreCode: "US1004",
    toStoreName: "US_STORE_04",
    toLocationCode: "2000",
    toLocationName: "ONLINE PICKUP",
    outboundRequestDate: "2026-03-20 (EST)",
    createdBy: "monster1437",
  },
  {
    id: "5",
    registrationDate: "2026-03-17 20:15 (EST)",
    outboundStatus: "Registration Failed",
    type: "S2S",
    orderType: "RX",
    uvNo: "TO0012468",
    bpCode: "C515",
    bpName: "GM_MFG(HQ)",
    fromStoreCode: "US1001",
    fromStoreName: "US_STORE_01",
    fromLocationCode: "1002",
    fromLocationName: "RX HOLDING",
    toStoreCode: "US1002",
    toStoreName: "US_OFFLINE RX LAB",
    toLocationCode: "1001",
    toLocationName: "AVAILABLE",
    outboundRequestDate: "2026-03-17 (EST)",
    createdBy: "NAMCHO",
  },
  {
    id: "6",
    registrationDate: "2026-03-10 17:04 (EST)",
    outboundStatus: "Outbound Canceled",
    type: "S2S",
    orderType: "RX",
    uvNo: "TO0012409",
    bpCode: "C515",
    bpName: "GM_MFG(HQ)",
    fromStoreCode: "US1001",
    fromStoreName: "US_STORE_01",
    fromLocationCode: "1002",
    fromLocationName: "RX HOLDING",
    toStoreCode: "US1002",
    toStoreName: "US_OFFLINE RX LAB",
    toLocationCode: "1001",
    toLocationName: "AVAILABLE",
    outboundRequestDate: "2026-03-10 (EST)",
    createdBy: "monster1437",
  },
  {
    id: "7",
    registrationDate: "2026-03-05 12:41 (EST)",
    outboundStatus: "Outbound Completed",
    type: "L2S",
    orderType: "Pre-Order",
    uvNo: "TO0012349",
    bpCode: "C515",
    bpName: "GM_MFG(HQ)",
    fromStoreCode: "US1003",
    fromStoreName: "US_WAREHOUSE",
    fromLocationCode: "1110",
    fromLocationName: "AVAILABLE",
    toStoreCode: "US1002",
    toStoreName: "US_STORE_02",
    toLocationCode: "2000",
    toLocationName: "ONLINE PICKUP",
    outboundRequestDate: "2026-03-05 (EST)",
    createdBy: "NAMCHO",
  },
  {
    id: "8", registrationDate: "2026-03-04 09:30 (EST)", outboundStatus: "Outbound Completed", type: "S2S", orderType: "RX", uvNo: "TO0012310",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1001", fromStoreName: "US_STORE_01", fromLocationCode: "1002", fromLocationName: "RX HOLDING",
    toStoreCode: "US1002", toStoreName: "US_OFFLINE RX LAB", toLocationCode: "1001", toLocationName: "AVAILABLE", outboundRequestDate: "2026-03-04 (EST)", createdBy: "uk_Isaac",
  },
  {
    id: "9", registrationDate: "2026-03-03 14:22 (EST)", outboundStatus: "Outbound Registered", type: "L2S", orderType: "Pre-Order", uvNo: "TO0012298",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1003", fromStoreName: "US_WAREHOUSE", fromLocationCode: "1110", fromLocationName: "AVAILABLE",
    toStoreCode: "US1001", toStoreName: "US_STORE_01", toLocationCode: "2000", toLocationName: "ONLINE PICKUP", outboundRequestDate: "2026-03-03 (EST)", createdBy: "NAMCHO",
  },
  {
    id: "10", registrationDate: "2026-03-02 11:15 (EST)", outboundStatus: "Pending Registration", type: "S2S", orderType: "RX", uvNo: "TO0012275",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1001", fromStoreName: "US_STORE_01", fromLocationCode: "1002", fromLocationName: "RX HOLDING",
    toStoreCode: "US1002", toStoreName: "US_OFFLINE RX LAB", toLocationCode: "1001", toLocationName: "AVAILABLE", outboundRequestDate: "2026-03-02 (EST)", createdBy: "monster1437",
  },
  {
    id: "11", registrationDate: "2026-03-01 16:45 (EST)", outboundStatus: "Outbound Planned", type: "L2S", orderType: "Pre-Order", uvNo: "TO0012260",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1003", fromStoreName: "US_WAREHOUSE", fromLocationCode: "1110", fromLocationName: "AVAILABLE",
    toStoreCode: "US1003", toStoreName: "US_STORE_03", toLocationCode: "2000", toLocationName: "ONLINE PICKUP", outboundRequestDate: "2026-03-01 (EST)", createdBy: "uk_B.danny",
  },
  {
    id: "12", registrationDate: "2026-02-28 10:08 (EST)", outboundStatus: "Outbound Completed", type: "S2S", orderType: "RX", uvNo: "TO0012245",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1001", fromStoreName: "US_STORE_01", fromLocationCode: "1002", fromLocationName: "RX HOLDING",
    toStoreCode: "US1002", toStoreName: "US_OFFLINE RX LAB", toLocationCode: "1001", toLocationName: "AVAILABLE", outboundRequestDate: "2026-02-28 (EST)", createdBy: "NAMCHO",
  },
  {
    id: "13", registrationDate: "2026-02-27 13:52 (EST)", outboundStatus: "Registration Failed", type: "L2S", orderType: "Pre-Order", uvNo: "TO0012230",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1003", fromStoreName: "US_WAREHOUSE", fromLocationCode: "1110", fromLocationName: "AVAILABLE",
    toStoreCode: "US1004", toStoreName: "US_STORE_04", toLocationCode: "2000", toLocationName: "ONLINE PICKUP", outboundRequestDate: "2026-02-27 (EST)", createdBy: "monster1437",
  },
  {
    id: "14", registrationDate: "2026-02-26 15:30 (EST)", outboundStatus: "Outbound Registered", type: "S2S", orderType: "RX", uvNo: "TO0012218",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1001", fromStoreName: "US_STORE_01", fromLocationCode: "1002", fromLocationName: "RX HOLDING",
    toStoreCode: "US1002", toStoreName: "US_OFFLINE RX LAB", toLocationCode: "1001", toLocationName: "AVAILABLE", outboundRequestDate: "2026-02-26 (EST)", createdBy: "uk_Isaac",
  },
  {
    id: "15", registrationDate: "2026-02-25 09:18 (EST)", outboundStatus: "Outbound Completed", type: "L2S", orderType: "Pre-Order", uvNo: "TO0012205",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1003", fromStoreName: "US_WAREHOUSE", fromLocationCode: "1110", fromLocationName: "AVAILABLE",
    toStoreCode: "US1002", toStoreName: "US_STORE_02", toLocationCode: "2000", toLocationName: "ONLINE PICKUP", outboundRequestDate: "2026-02-25 (EST)", createdBy: "NAMCHO",
  },
  {
    id: "16", registrationDate: "2026-02-24 17:40 (EST)", outboundStatus: "Pending Registration", type: "S2S", orderType: "RX", uvNo: "TO0012190",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1001", fromStoreName: "US_STORE_01", fromLocationCode: "1002", fromLocationName: "RX HOLDING",
    toStoreCode: "US1002", toStoreName: "US_OFFLINE RX LAB", toLocationCode: "1001", toLocationName: "AVAILABLE", outboundRequestDate: "2026-02-24 (EST)", createdBy: "monster1437",
  },
  {
    id: "17", registrationDate: "2026-02-23 12:05 (EST)", outboundStatus: "Outbound Canceled", type: "L2S", orderType: "Pre-Order", uvNo: "TO0012178",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1003", fromStoreName: "US_WAREHOUSE", fromLocationCode: "1110", fromLocationName: "AVAILABLE",
    toStoreCode: "US1001", toStoreName: "US_STORE_01", toLocationCode: "2000", toLocationName: "ONLINE PICKUP", outboundRequestDate: "2026-02-23 (EST)", createdBy: "uk_B.danny",
  },
  {
    id: "18", registrationDate: "2026-02-22 08:55 (EST)", outboundStatus: "Outbound Completed", type: "S2S", orderType: "RX", uvNo: "TO0012165",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1001", fromStoreName: "US_STORE_01", fromLocationCode: "1002", fromLocationName: "RX HOLDING",
    toStoreCode: "US1002", toStoreName: "US_OFFLINE RX LAB", toLocationCode: "1001", toLocationName: "AVAILABLE", outboundRequestDate: "2026-02-22 (EST)", createdBy: "NAMCHO",
  },
  {
    id: "19", registrationDate: "2026-02-21 14:32 (EST)", outboundStatus: "Outbound Planned", type: "L2S", orderType: "Pre-Order", uvNo: "TO0012150",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1003", fromStoreName: "US_WAREHOUSE", fromLocationCode: "1110", fromLocationName: "AVAILABLE",
    toStoreCode: "US1003", toStoreName: "US_STORE_03", toLocationCode: "2000", toLocationName: "ONLINE PICKUP", outboundRequestDate: "2026-02-21 (EST)", createdBy: "monster1437",
  },
  {
    id: "20", registrationDate: "2026-02-20 11:20 (EST)", outboundStatus: "Outbound Registered", type: "S2S", orderType: "RX", uvNo: "TO0012138",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1001", fromStoreName: "US_STORE_01", fromLocationCode: "1002", fromLocationName: "RX HOLDING",
    toStoreCode: "US1002", toStoreName: "US_OFFLINE RX LAB", toLocationCode: "1001", toLocationName: "AVAILABLE", outboundRequestDate: "2026-02-20 (EST)", createdBy: "uk_Isaac",
  },
  {
    id: "21", registrationDate: "2026-02-19 16:48 (EST)", outboundStatus: "Outbound Completed", type: "L2S", orderType: "Pre-Order", uvNo: "TO0012125",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1003", fromStoreName: "US_WAREHOUSE", fromLocationCode: "1110", fromLocationName: "AVAILABLE",
    toStoreCode: "US1004", toStoreName: "US_STORE_04", toLocationCode: "2000", toLocationName: "ONLINE PICKUP", outboundRequestDate: "2026-02-19 (EST)", createdBy: "NAMCHO",
  },
  {
    id: "22", registrationDate: "2026-02-18 10:35 (EST)", outboundStatus: "Registration Failed", type: "S2S", orderType: "RX", uvNo: "TO0012110",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1001", fromStoreName: "US_STORE_01", fromLocationCode: "1002", fromLocationName: "RX HOLDING",
    toStoreCode: "US1002", toStoreName: "US_OFFLINE RX LAB", toLocationCode: "1001", toLocationName: "AVAILABLE", outboundRequestDate: "2026-02-18 (EST)", createdBy: "monster1437",
  },
  {
    id: "23", registrationDate: "2026-02-17 13:15 (EST)", outboundStatus: "Pending Registration", type: "L2S", orderType: "Pre-Order", uvNo: "TO0012098",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1003", fromStoreName: "US_WAREHOUSE", fromLocationCode: "1110", fromLocationName: "AVAILABLE",
    toStoreCode: "US1002", toStoreName: "US_STORE_02", toLocationCode: "2000", toLocationName: "ONLINE PICKUP", outboundRequestDate: "2026-02-17 (EST)", createdBy: "uk_B.danny",
  },
  {
    id: "24", registrationDate: "2026-02-16 09:42 (EST)", outboundStatus: "Outbound Completed", type: "S2S", orderType: "RX", uvNo: "TO0012085",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1001", fromStoreName: "US_STORE_01", fromLocationCode: "1002", fromLocationName: "RX HOLDING",
    toStoreCode: "US1002", toStoreName: "US_OFFLINE RX LAB", toLocationCode: "1001", toLocationName: "AVAILABLE", outboundRequestDate: "2026-02-16 (EST)", createdBy: "NAMCHO",
  },
  {
    id: "25", registrationDate: "2026-02-15 15:58 (EST)", outboundStatus: "Outbound Registered", type: "L2S", orderType: "Pre-Order", uvNo: "TO0012070",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1003", fromStoreName: "US_WAREHOUSE", fromLocationCode: "1110", fromLocationName: "AVAILABLE",
    toStoreCode: "US1001", toStoreName: "US_STORE_01", toLocationCode: "2000", toLocationName: "ONLINE PICKUP", outboundRequestDate: "2026-02-15 (EST)", createdBy: "monster1437",
  },
  {
    id: "26", registrationDate: "2026-02-14 11:28 (EST)", outboundStatus: "Outbound Planned", type: "S2S", orderType: "RX", uvNo: "TO0012058",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1001", fromStoreName: "US_STORE_01", fromLocationCode: "1002", fromLocationName: "RX HOLDING",
    toStoreCode: "US1002", toStoreName: "US_OFFLINE RX LAB", toLocationCode: "1001", toLocationName: "AVAILABLE", outboundRequestDate: "2026-02-14 (EST)", createdBy: "uk_Isaac",
  },
  {
    id: "27", registrationDate: "2026-02-13 08:10 (EST)", outboundStatus: "Outbound Completed", type: "L2S", orderType: "Pre-Order", uvNo: "TO0012045",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1003", fromStoreName: "US_WAREHOUSE", fromLocationCode: "1110", fromLocationName: "AVAILABLE",
    toStoreCode: "US1003", toStoreName: "US_STORE_03", toLocationCode: "2000", toLocationName: "ONLINE PICKUP", outboundRequestDate: "2026-02-13 (EST)", createdBy: "NAMCHO",
  },
  {
    id: "28", registrationDate: "2026-02-12 14:50 (EST)", outboundStatus: "Outbound Canceled", type: "S2S", orderType: "RX", uvNo: "TO0012030",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1001", fromStoreName: "US_STORE_01", fromLocationCode: "1002", fromLocationName: "RX HOLDING",
    toStoreCode: "US1002", toStoreName: "US_OFFLINE RX LAB", toLocationCode: "1001", toLocationName: "AVAILABLE", outboundRequestDate: "2026-02-12 (EST)", createdBy: "monster1437",
  },
  {
    id: "29", registrationDate: "2026-02-11 10:22 (EST)", outboundStatus: "Outbound Completed", type: "L2S", orderType: "Pre-Order", uvNo: "TO0012018",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1003", fromStoreName: "US_WAREHOUSE", fromLocationCode: "1110", fromLocationName: "AVAILABLE",
    toStoreCode: "US1004", toStoreName: "US_STORE_04", toLocationCode: "2000", toLocationName: "ONLINE PICKUP", outboundRequestDate: "2026-02-11 (EST)", createdBy: "uk_B.danny",
  },
  {
    id: "30", registrationDate: "2026-02-10 16:05 (EST)", outboundStatus: "Outbound Registered", type: "S2S", orderType: "RX", uvNo: "TO0012005",
    bpCode: "C515", bpName: "GM_MFG(HQ)", fromStoreCode: "US1001", fromStoreName: "US_STORE_01", fromLocationCode: "1002", fromLocationName: "RX HOLDING",
    toStoreCode: "US1002", toStoreName: "US_OFFLINE RX LAB", toLocationCode: "1001", toLocationName: "AVAILABLE", outboundRequestDate: "2026-02-10 (EST)", createdBy: "NAMCHO",
  },
]

export const outboundDetails: Record<string, OutboundDetail> = {
  "1": {
    outbound: outboundRecords[0],
    orders: [
      {
        id: "ORD001",
        orderNo: "2603080PQ4VHK6ATRZN",
        orderDate: "2026-03-29",
        customerName: "John Smith",
        items: [
          { id: "1", itemCode: "11003102", itemName: "ACADEMYA-02 / 8809549828920", color: "Black", size: "M", quantity: 2, unitPrice: 29.99, category: "SUNGLASS", subcategory: "SUNGLASS ACETATE" },
          { id: "2", itemCode: "11003121", itemName: "EGO-01 / 8809907773688", color: "Brown", size: "L", quantity: 1, unitPrice: 79.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
          { id: "2a", itemCode: "11003123", itemName: "ATOMIC-02 / 8809549828968", color: "Grey", size: "M", quantity: 1, unitPrice: 45.99, category: "SUNGLASS", subcategory: "SUNGLASS ACETATE" },
        ],
      },
      {
        id: "ORD002",
        orderNo: "2603120PRASMZ3ZNGQT",
        orderDate: "2026-03-29",
        customerName: "Emily Johnson",
        items: [
          { id: "3", itemCode: "11003126", itemName: "SAL-01(DG) / 8809907773442", color: "Dark Green", size: "S", quantity: 1, unitPrice: 89.99, category: "SUNGLASS", subcategory: "SUNGLASS ACETATE" },
          { id: "3a", itemCode: "11003135", itemName: "ROB-01 / 8809549829354", color: "Black", size: "M", quantity: 2, unitPrice: 64.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
        ],
      },
      {
        id: "ORD010",
        orderNo: "2602140PG2MXGWASTFM",
        orderDate: "2026-03-28",
        customerName: "Daniel Kim",
        items: [
          { id: "16", itemCode: "11003137", itemName: "ZIN-01 / 8809549829392", color: "Black", size: "L", quantity: 1, unitPrice: 64.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
          { id: "16a", itemCode: "11003140", itemName: "ACADEMYA-02(BR) / 8809549828937", color: "Brown", size: "M", quantity: 3, unitPrice: 14.99, category: "SUNGLASS", subcategory: "SUNGLASS ACETATE" },
          { id: "16b", itemCode: "11003144", itemName: "EVAN-01 / 8809549829095", color: "Black", size: "S", quantity: 1, unitPrice: 19.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
        ],
      },
      {
        id: "ORD011",
        orderNo: "2603100PQP2S03Q0BEK",
        orderDate: "2026-03-28",
        customerName: "Sophie Park",
        items: [
          { id: "17", itemCode: "11003145", itemName: "EVAN-KC1 / 8809549829101", color: "Gold", size: "M", quantity: 2, unitPrice: 54.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
          { id: "17a", itemCode: "11003146", itemName: "EVAN-GC7 / 8809549829118", color: "Gunmetal", size: "L", quantity: 1, unitPrice: 39.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
        ],
      },
      {
        id: "ORD012",
        orderNo: "2603070PPNA43NTAJFS",
        orderDate: "2026-03-27",
        customerName: "Chris Lee",
        items: [
          { id: "18", itemCode: "11003147", itemName: "EVAN-BRC13 / 8809549829125", color: "Bronze", size: "M", quantity: 1, unitPrice: 74.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
          { id: "18a", itemCode: "11003102", itemName: "ACADEMYA-02 / 8809549828920", color: "Black", size: "L", quantity: 1, unitPrice: 89.99, category: "SUNGLASS", subcategory: "SUNGLASS ACETATE" },
          { id: "18b", itemCode: "11003121", itemName: "EGO-01 / 8809907773688", color: "Brown", size: "M", quantity: 2, unitPrice: 24.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
        ],
      },
      {
        id: "ORD013",
        orderNo: "2603160PSPW60N3NJ4H",
        orderDate: "2026-03-27",
        customerName: "Amy Chen",
        items: [
          { id: "19", itemCode: "11003123", itemName: "ATOMIC-02 / 8809549828968", color: "Grey", size: "S", quantity: 1, unitPrice: 69.99, category: "SUNGLASS", subcategory: "SUNGLASS ACETATE" },
          { id: "19a", itemCode: "11003126", itemName: "SAL-01(DG) / 8809907773442", color: "Dark Green", size: "M", quantity: 1, unitPrice: 59.99, category: "SUNGLASS", subcategory: "SUNGLASS ACETATE" },
        ],
      },
      {
        id: "ORD014",
        orderNo: "2603160PSHPPTH7NJFY",
        orderDate: "2026-03-26",
        customerName: "Ryan Choi",
        items: [
          { id: "20", itemCode: "11003135", itemName: "ROB-01 / 8809549829354", color: "Black", size: "L", quantity: 1, unitPrice: 159.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
          { id: "20a", itemCode: "11003137", itemName: "ZIN-01 / 8809549829392", color: "Black", size: "M", quantity: 2, unitPrice: 79.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
          { id: "20b", itemCode: "11003140", itemName: "ACADEMYA-02(BR) / 8809549828937", color: "Brown", size: "L", quantity: 1, unitPrice: 64.99, category: "SUNGLASS", subcategory: "SUNGLASS ACETATE" },
          { id: "20c", itemCode: "11003144", itemName: "EVAN-01 / 8809549829095", color: "Black", size: "S", quantity: 1, unitPrice: 29.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
        ],
      },
      {
        id: "ORD015",
        orderNo: "2602260PKSXF7P89GFD",
        orderDate: "2026-03-26",
        customerName: "Jessica Yoon",
        items: [
          { id: "21", itemCode: "11003145", itemName: "EVAN-KC1 / 8809549829101", color: "Gold", size: "M", quantity: 1, unitPrice: 49.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
          { id: "21a", itemCode: "11003146", itemName: "EVAN-GC7 / 8809549829118", color: "Gunmetal", size: "L", quantity: 1, unitPrice: 89.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
        ],
      },
    ],
  },
  "2": {
    outbound: outboundRecords[1],
    orders: [
      {
        id: "ORD003",
        orderNo: "2603090PRTK8WN2XHVL",
        orderDate: "2026-03-28",
        customerName: "Michael Brown",
        items: [
          { id: "4", itemCode: "11003102", itemName: "ACADEMYA-02 / 8809549828920", color: "Black", size: "M", quantity: 1, unitPrice: 129.99, category: "SUNGLASS", subcategory: "SUNGLASS ACETATE" },
          { id: "5", itemCode: "11003135", itemName: "ROB-01 / 8809549829354", color: "Black", size: "L", quantity: 2, unitPrice: 19.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
        ],
      },
    ],
  },
  "3": {
    outbound: outboundRecords[2],
    orders: [
      {
        id: "ORD004",
        orderNo: "2603150PMVQ7R4YDKCW",
        orderDate: "2026-03-28",
        customerName: "Sarah Davis",
        items: [
          { id: "6", itemCode: "11003123", itemName: "ATOMIC-02 / 8809549828968", color: "Grey", size: "S", quantity: 1, unitPrice: 249.99, category: "SUNGLASS", subcategory: "SUNGLASS ACETATE" },
        ],
      },
    ],
  },
  "4": {
    outbound: outboundRecords[3],
    orders: [
      {
        id: "ORD005",
        orderNo: "2602280PJXS5T6ZMLNA",
        orderDate: "2026-03-19",
        customerName: "David Wilson",
        items: [
          { id: "7", itemCode: "11003137", itemName: "ZIN-01 / 8809549829392", color: "Black", size: "L", quantity: 3, unitPrice: 44.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
          { id: "8", itemCode: "11003140", itemName: "ACADEMYA-02(BR) / 8809549828937", color: "Brown", size: "M", quantity: 2, unitPrice: 64.99, category: "SUNGLASS", subcategory: "SUNGLASS ACETATE" },
        ],
      },
      {
        id: "ORD006",
        orderNo: "2603040PKWH2N8BFRGP",
        orderDate: "2026-03-19",
        customerName: "Jennifer Lee",
        items: [
          { id: "9", itemCode: "11003144", itemName: "EVAN-01 / 8809549829095", color: "Black", size: "M", quantity: 1, unitPrice: 89.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
        ],
      },
    ],
  },
  "5": {
    outbound: outboundRecords[4],
    orders: [
      {
        id: "ORD007",
        orderNo: "2602190PLFS3Q7CJXMT",
        orderDate: "2026-03-16",
        customerName: "Robert Taylor",
        items: [
          { id: "10", itemCode: "11003126", itemName: "SAL-01(DG) / 8809907773442", color: "Dark Green", size: "M", quantity: 1, unitPrice: 199.99, category: "SUNGLASS", subcategory: "SUNGLASS ACETATE" },
        ],
      },
    ],
  },
  "6": {
    outbound: outboundRecords[5],
    orders: [
      {
        id: "ORD008",
        orderNo: "2603220PNGT4V9DHWSK",
        orderDate: "2026-03-09",
        customerName: "Lisa Anderson",
        items: [
          { id: "11", itemCode: "11003145", itemName: "EVAN-KC1 / 8809549829101", color: "Gold", size: "S", quantity: 1, unitPrice: 74.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
          { id: "12", itemCode: "11003147", itemName: "EVAN-BRC13 / 8809549829125", color: "Bronze", size: "M", quantity: 1, unitPrice: 54.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
        ],
      },
    ],
  },
  "7": {
    outbound: outboundRecords[6],
    orders: [
      {
        id: "ORD009",
        orderNo: "2602050PMRV6X3EKNYB",
        orderDate: "2026-03-04",
        customerName: "James Martinez",
        items: [
          { id: "13", itemCode: "11003121", itemName: "EGO-01 / 8809907773688", color: "Brown", size: "M", quantity: 2, unitPrice: 59.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
          { id: "14", itemCode: "11003146", itemName: "EVAN-GC7 / 8809549829118", color: "Gunmetal", size: "L", quantity: 2, unitPrice: 34.99, category: "SUNGLASS", subcategory: "SUNGLASS METAL" },
          { id: "15", itemCode: "11003102", itemName: "ACADEMYA-02 / 8809549828920", color: "Black", size: "S", quantity: 1, unitPrice: 79.99, category: "SUNGLASS", subcategory: "SUNGLASS ACETATE" },
        ],
      },
    ],
  },
}
