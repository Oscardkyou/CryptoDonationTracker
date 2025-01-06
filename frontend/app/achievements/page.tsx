import Layout from "@/components/Layout"
import { AchievementBadge } from "@/components/AchievementBadge"

const achievements = [
  { name: "Первое пожертвование", description: "Сделайте свое первое пожертвование", achieved: true },
  { name: "Щедрая душа", description: "Пожертвуйте в общей сложности 10 ETH", achieved: false },
  { name: "Постоянный благотворитель", description: "Делайте пожертвования 5 месяцев подряд", achieved: false },
]

export default function Achievements() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Достижения</h1>
      <div className="grid gap-4">
        {achievements.map((achievement, index) => (
          <AchievementBadge key={index} {...achievement} />
        ))}
      </div>
    </Layout>
  )
}

