'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import DonationChart from '@/components/DonationChart'
import TransactionList from '@/components/TransactionList'

export default function Dashboard() {
  const [balance, setBalance] = useState('0')
  const [donations, setDonations] = useState([])

  useEffect(() => {
    // Здесь будет логика получения баланса и пожертвований из смарт-контракта
    setBalance('1.5 ETH')
    setDonations([
      { id: 1, organization: 'Красный Крест', amount: '0.5 ETH', date: '2023-05-01', transaction: '0x123...' },
      { id: 2, organization: 'Врачи без границ', amount: '0.3 ETH', date: '2023-05-15', transaction: '0x456...' },
      { id: 3, organization: 'Гринпис', amount: '0.7 ETH', date: '2023-05-30', transaction: '0x789...' },
    ])
  }, [])

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Дашборд пользователя</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Текущий баланс</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{balance}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Распределение пожертвований</CardTitle>
          </CardHeader>
          <CardContent>
            <DonationChart donations={donations} />
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Последние пожертвования</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionList transactions={donations} />
        </CardContent>
      </Card>
    </Layout>
  )
}

