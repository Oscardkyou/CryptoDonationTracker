import { useState } from "react"
import { Star } from 'lucide-react'

interface OrganizationRatingProps {
  initialRating: number
  onRate: (rating: number) => void
}

export const OrganizationRating: React.FC<OrganizationRatingProps> = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating)

  const handleRate = (newRating: number) => {
    setRating(newRating)
    onRate(newRating)
  }

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 cursor-pointer ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
          onClick={() => handleRate(star)}
        />
      ))}
    </div>
  )
}

