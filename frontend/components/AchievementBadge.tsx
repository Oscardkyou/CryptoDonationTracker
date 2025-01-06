import { Badge } from "@/components/ui/badge"

interface AchievementBadgeProps {
  name: string
  description: string
  achieved: boolean
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({ name, description, achieved }) => {
  return (
    <Badge variant={achieved ? "default" : "secondary"} className="flex items-center gap-2">
      {achieved ? "🏆" : "🔒"} {name}
      <span className="sr-only">{description}</span>
    </Badge>
  )
}

