'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import TransactionList from '@/components/TransactionList'
import { Button } from '@/components/ui/button'

const transactions = [
  { id: 1, organization: 'Красный Крест', amount: '0.5 ETH', date: '2023-05-01', transaction: '0x123...' },
  { id: 2, organization: 'Врачи без границ', amount: '0.3 ETH', date: '2023-05-15', transaction: '0x456...' },
  { id: 3, organization: 'Гринпис', amount: '0.7 ETH', date: '2023-05-30', transaction: '0x789...' },
  // Добавьте больше транзакций здесь
]

export default function Transactions() {
  const [, setDownloadingPDF] = useState(false)

  const handleDownloadPDF = () => {
    setDownloadingPDF(true)
    // Здесь будет логика для генерации и скачивания PDF
    setTimeout(() => {
      setDownloadingPDF(false)
      alert('PDF отчет успешно скачан')
    }, 2000)
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">История транзакций</h1>
      <div className="mb-8">
        <Button onClick={handleDownloadPDF}>Скачать PDF отчет</Button>
      </div>
      <TransactionList transactions={transactions} />
    </Layout>
  )
}

