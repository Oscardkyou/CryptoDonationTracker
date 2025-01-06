import Layout from "@/components/Layout"
import { DonationMap } from "@/components/DonationMap"

const donations = [
  { id: 1, organization: "Красный Крест", amount: "0.5 ETH", latitude: 51.5074, longitude: -0.1278 },
  { id: 2, organization: "Врачи без границ", amount: "0.3 ETH", latitude: 48.8566, longitude: 2.3522 },
  { id: 3, organization: "Гринпис", amount: "0.7 ETH", latitude: 52.3676, longitude: 4.9041 },
]

export default function DonationMapPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Карта пожертвований</h1>
      <DonationMap donations={donations} />
    </Layout>
  )
}

