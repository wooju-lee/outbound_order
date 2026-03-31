'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { OutboundOrderList } from '@/components/outbound-order/outbound-order-list'
import { OutboundOrderDetail } from '@/components/outbound-order/outbound-order-detail'

export default function OutboundOrderListPage() {
  const [selectedOutboundId, setSelectedOutboundId] = useState<string | null>(null)

  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-1 flex-col overflow-hidden w-full">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {selectedOutboundId ? (
            <OutboundOrderDetail
              outboundId={selectedOutboundId}
              onBack={() => setSelectedOutboundId(null)}
            />
          ) : (
            <OutboundOrderList onSelectOutbound={setSelectedOutboundId} />
          )}
        </main>
        <footer className="px-6 py-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground bg-card">
          <span>&copy; 2025 IICOMBINED CO., LTD. ALL RIGHTS RESERVED.</span>
          <span>V.1.0.0</span>
        </footer>
      </div>
    </div>
  )
}
