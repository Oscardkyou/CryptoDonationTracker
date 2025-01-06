import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { OrganizationRating } from './OrganizationRating'

const OrganizationCard = ({ organization }) => {
  const progress = (parseFloat(organization.currentFunds) / parseFloat(organization.goal)) * 100

  const handleRate = (rating: number) => {
    console.log(`Rated ${organization.name} with ${rating} stars`)
    // Здесь будет логика отправки рейтинга на сервер
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{organization.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{organization.description}</p>
        <div className="mb-2">
          <span className="font-semibold">Текущий сбор:</span> {organization.currentFunds}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Цель:</span> {organization.goal}
        </div>
        <Progress value={progress} className="w-full mb-4" />
        <OrganizationRating initialRating={organization.rating || 0} onRate={handleRate} />
      </CardContent>
      <CardFooter>
        <Button className="w-full">Пожертвовать</Button>
      </CardFooter>
    </Card>
  )
}

export default OrganizationCard

