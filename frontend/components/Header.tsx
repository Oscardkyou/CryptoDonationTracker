import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Charity Tracker
        </Link>
        <div className="space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost">Дашборд</Button>
          </Link>
          <Link href="/organizations">
            <Button variant="ghost">Организации</Button>
          </Link>
          <Link href="/transactions">
            <Button variant="ghost">Транзакции</Button>
          </Link>
          <Link href="/feedback">
            <Button variant="ghost">Обратная связь</Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header

