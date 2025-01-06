'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import OrganizationCard from '@/components/OrganizationCard'

const organizations = [
  { id: 1, name: 'Красный Крест', description: 'Международная гуманитарная организация', currentFunds: '10 ETH', goal: '20 ETH' },
  { id: 2, name: 'Врачи без границ', description: 'Международная медицинская организация', currentFunds: '15 ETH', goal: '30 ETH' },
  { id: 3, name: 'Гринпис', description: 'Международная экологическая организация', currentFunds: '8 ETH', goal: '25 ETH' },
]

export default function Organizations() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Благотворительные организации</h1>
      <div className="mb-8 flex gap-4">
        <Input
          type="text"
          placeholder="Поиск организаций"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button>Поиск</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredOrganizations.map(org => (
          <OrganizationCard key={org.id} organization={org} />
        ))}
      </div>
    </Layout>
  )
}

