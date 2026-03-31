export interface OutboundRecord {
  id: string
  registrationDate: string
  outboundStatus: string
  type: string
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
    uvNo: "TO0012649",
    bpCode: "C515",
    bpName: "GM_MFG(HQ)",
    fromStoreCode: "CA002",
    fromStoreName: "GM_WH_CANADA",
    fromLocationCode: "1110",
    fromLocationName: "AVAILABLE",
    toStoreCode: "CA1001",
    toStoreName: "GM_Toronto_MALL_Yorkdale",
    toLocationCode: "1000",
    toLocationName: "SALES",
    outboundRequestDate: "2026-03-30 (EST)",
    createdBy: "NAMCHO",
  },
  {
    id: "2",
    registrationDate: "2026-03-29 15:48 (EST)",
    outboundStatus: "Outbound Registered",
    type: "L2S",
    uvNo: "TO0012639",
    bpCode: "C515",
    bpName: "GM_MFG(HQ)",
    fromStoreCode: "CA002",
    fromStoreName: "GM_WH_CANADA",
    fromLocationCode: "1120",
    fromLocationName: "DAMAGED",
    toStoreCode: "CA1001",
    toStoreName: "GM_Toronto_MALL_Yorkdale",
    toLocationCode: "1030",
    toLocationName: "HOLDING",
    outboundRequestDate: "2026-03-29 (EST)",
    createdBy: "monster1437",
  },
  {
    id: "3",
    registrationDate: "2026-03-29 15:40 (EST)",
    outboundStatus: "Pending Registration",
    type: "S2L",
    uvNo: "TO0012638",
    bpCode: "C515",
    bpName: "GM_MFG(HQ)",
    fromStoreCode: "CA002",
    fromStoreName: "GM_WH_CANADA",
    fromLocationCode: "1030",
    fromLocationName: "HOLDING",
    toStoreCode: "CA002",
    toStoreName: "GM_WH_CANADA",
    toLocationCode: "1120",
    toLocationName: "DAMAGED",
    outboundRequestDate: "2026-03-29 (EST)",
    createdBy: "uk_Isaac",
  },
  {
    id: "4",
    registrationDate: "2026-03-20 14:18 (EST)",
    outboundStatus: "Outbound Planned",
    type: "S2S",
    uvNo: "TO0012554",
    bpCode: "C515",
    bpName: "GM_MFG(HQ)",
    fromStoreCode: "CA002",
    fromStoreName: "GM_WH_CANADA",
    fromLocationCode: "1110",
    fromLocationName: "AVAILABLE",
    toStoreCode: "CA1001",
    toStoreName: "GM_Toronto_MALL_Yorkdale",
    toLocationCode: "1000",
    toLocationName: "SALES",
    outboundRequestDate: "2026-03-20 (EST)",
    createdBy: "monster1437",
  },
  {
    id: "5",
    registrationDate: "2026-03-17 20:15 (EST)",
    outboundStatus: "Registration Failed",
    type: "L2S",
    uvNo: "TO0012468",
    bpCode: "C515",
    bpName: "GM_MFG(HQ)",
    fromStoreCode: "CA002",
    fromStoreName: "GM_WH_CANADA",
    fromLocationCode: "1110",
    fromLocationName: "AVAILABLE",
    toStoreCode: "CA1001",
    toStoreName: "GM_Toronto_MALL_Yorkdale",
    toLocationCode: "1000",
    toLocationName: "SALES",
    outboundRequestDate: "2026-03-17 (EST)",
    createdBy: "NAMCHO",
  },
  {
    id: "6",
    registrationDate: "2026-03-10 17:04 (EST)",
    outboundStatus: "Outbound Canceled",
    type: "S2L",
    uvNo: "TO0012409",
    bpCode: "C515",
    bpName: "GM_MFG(HQ)",
    fromStoreCode: "CA002",
    fromStoreName: "GM_WH_CANADA",
    fromLocationCode: "1110",
    fromLocationName: "AVAILABLE",
    toStoreCode: "CA1001",
    toStoreName: "GM_Toronto_MALL_Yorkdale",
    toLocationCode: "1000",
    toLocationName: "SALES",
    outboundRequestDate: "2026-03-10 (EST)",
    createdBy: "monster1437",
  },
  {
    id: "7",
    registrationDate: "2026-03-05 12:41 (EST)",
    outboundStatus: "Outbound Completed",
    type: "S2S",
    uvNo: "TO0012349",
    bpCode: "C515",
    bpName: "GM_MFG(HQ)",
    fromStoreCode: "CA002",
    fromStoreName: "GM_WH_CANADA",
    fromLocationCode: "1110",
    fromLocationName: "AVAILABLE",
    toStoreCode: "CA1001",
    toStoreName: "GM_Toronto_MALL_Yorkdale",
    toLocationCode: "1000",
    toLocationName: "SALES",
    outboundRequestDate: "2026-03-05 (EST)",
    createdBy: "NAMCHO",
  },
]

export const outboundDetails: Record<string, OutboundDetail> = {
  "1": {
    outbound: outboundRecords[0],
    orders: [
      {
        id: "ORD001",
        orderNo: "ORD-2026-0330-001",
        orderDate: "2026-03-29",
        customerName: "John Smith",
        items: [
          { id: "1", itemCode: "SKU-001", itemName: "Classic T-Shirt", color: "Black", size: "M", quantity: 2, unitPrice: 29.99 },
          { id: "2", itemCode: "SKU-002", itemName: "Denim Jeans", color: "Blue", size: "32", quantity: 1, unitPrice: 79.99 },
        ],
      },
      {
        id: "ORD002",
        orderNo: "ORD-2026-0330-002",
        orderDate: "2026-03-29",
        customerName: "Emily Johnson",
        items: [
          { id: "3", itemCode: "SKU-003", itemName: "Wool Sweater", color: "Grey", size: "L", quantity: 1, unitPrice: 89.99 },
        ],
      },
      {
        id: "ORD010",
        orderNo: "ORD-2026-0330-003",
        orderDate: "2026-03-28",
        customerName: "Daniel Kim",
        items: [
          { id: "16", itemCode: "SKU-016", itemName: "Canvas Sneakers", color: "White", size: "9", quantity: 1, unitPrice: 64.99 },
        ],
      },
      {
        id: "ORD011",
        orderNo: "ORD-2026-0330-004",
        orderDate: "2026-03-28",
        customerName: "Sophie Park",
        items: [
          { id: "17", itemCode: "SKU-017", itemName: "Linen Shirt", color: "Beige", size: "S", quantity: 2, unitPrice: 54.99 },
        ],
      },
      {
        id: "ORD012",
        orderNo: "ORD-2026-0330-005",
        orderDate: "2026-03-27",
        customerName: "Chris Lee",
        items: [
          { id: "18", itemCode: "SKU-018", itemName: "Cargo Pants", color: "Olive", size: "30", quantity: 1, unitPrice: 74.99 },
        ],
      },
      {
        id: "ORD013",
        orderNo: "ORD-2026-0330-006",
        orderDate: "2026-03-27",
        customerName: "Amy Chen",
        items: [
          { id: "19", itemCode: "SKU-019", itemName: "Knit Cardigan", color: "Pink", size: "M", quantity: 1, unitPrice: 69.99 },
        ],
      },
      {
        id: "ORD014",
        orderNo: "ORD-2026-0330-007",
        orderDate: "2026-03-26",
        customerName: "Ryan Choi",
        items: [
          { id: "20", itemCode: "SKU-020", itemName: "Bomber Jacket", color: "Black", size: "L", quantity: 1, unitPrice: 159.99 },
        ],
      },
      {
        id: "ORD015",
        orderNo: "ORD-2026-0330-008",
        orderDate: "2026-03-26",
        customerName: "Jessica Yoon",
        items: [
          { id: "21", itemCode: "SKU-021", itemName: "Pleated Skirt", color: "Navy", size: "S", quantity: 1, unitPrice: 49.99 },
        ],
      },
    ],
  },
  "2": {
    outbound: outboundRecords[1],
    orders: [
      {
        id: "ORD003",
        orderNo: "ORD-2026-0329-001",
        orderDate: "2026-03-28",
        customerName: "Michael Brown",
        items: [
          { id: "4", itemCode: "SKU-004", itemName: "Running Shoes", color: "White", size: "10", quantity: 1, unitPrice: 129.99 },
          { id: "5", itemCode: "SKU-005", itemName: "Sports Socks (3-pack)", color: "Mixed", size: "M", quantity: 2, unitPrice: 19.99 },
        ],
      },
    ],
  },
  "3": {
    outbound: outboundRecords[2],
    orders: [
      {
        id: "ORD004",
        orderNo: "ORD-2026-0329-002",
        orderDate: "2026-03-28",
        customerName: "Sarah Davis",
        items: [
          { id: "6", itemCode: "SKU-006", itemName: "Leather Jacket", color: "Brown", size: "S", quantity: 1, unitPrice: 249.99 },
        ],
      },
    ],
  },
  "4": {
    outbound: outboundRecords[3],
    orders: [
      {
        id: "ORD005",
        orderNo: "ORD-2026-0320-001",
        orderDate: "2026-03-19",
        customerName: "David Wilson",
        items: [
          { id: "7", itemCode: "SKU-007", itemName: "Cotton Polo", color: "Navy", size: "XL", quantity: 3, unitPrice: 44.99 },
          { id: "8", itemCode: "SKU-008", itemName: "Chino Pants", color: "Khaki", size: "34", quantity: 2, unitPrice: 64.99 },
        ],
      },
      {
        id: "ORD006",
        orderNo: "ORD-2026-0320-002",
        orderDate: "2026-03-19",
        customerName: "Jennifer Lee",
        items: [
          { id: "9", itemCode: "SKU-009", itemName: "Silk Blouse", color: "White", size: "M", quantity: 1, unitPrice: 89.99 },
        ],
      },
    ],
  },
  "5": {
    outbound: outboundRecords[4],
    orders: [
      {
        id: "ORD007",
        orderNo: "ORD-2026-0317-001",
        orderDate: "2026-03-16",
        customerName: "Robert Taylor",
        items: [
          { id: "10", itemCode: "SKU-010", itemName: "Winter Coat", color: "Black", size: "L", quantity: 1, unitPrice: 199.99 },
        ],
      },
    ],
  },
  "6": {
    outbound: outboundRecords[5],
    orders: [
      {
        id: "ORD008",
        orderNo: "ORD-2026-0310-001",
        orderDate: "2026-03-09",
        customerName: "Lisa Anderson",
        items: [
          { id: "11", itemCode: "SKU-011", itemName: "Casual Dress", color: "Red", size: "S", quantity: 1, unitPrice: 74.99 },
          { id: "12", itemCode: "SKU-012", itemName: "Cardigan", color: "Cream", size: "S", quantity: 1, unitPrice: 54.99 },
        ],
      },
    ],
  },
  "7": {
    outbound: outboundRecords[6],
    orders: [
      {
        id: "ORD009",
        orderNo: "ORD-2026-0305-001",
        orderDate: "2026-03-04",
        customerName: "James Martinez",
        items: [
          { id: "13", itemCode: "SKU-013", itemName: "Dress Shirt", color: "Light Blue", size: "M", quantity: 2, unitPrice: 59.99 },
          { id: "14", itemCode: "SKU-014", itemName: "Tie", color: "Navy Stripe", size: "One Size", quantity: 2, unitPrice: 34.99 },
          { id: "15", itemCode: "SKU-015", itemName: "Dress Pants", color: "Charcoal", size: "32", quantity: 1, unitPrice: 79.99 },
        ],
      },
    ],
  },
}
