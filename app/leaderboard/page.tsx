"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Trophy, TrendingUp } from "lucide-react"

export default function LeaderboardPage() {
  const topProjects = [
    {
      rank: 1,
      title: "Công cụ AI viết code tự động",
      founder: "Vũ Thế E",
      target: 100000,
      current: 95000,
      backers: 312,
      percentage: 95,
    },
    {
      rank: 2,
      title: "Hệ thống tưới tiêu thông minh",
      founder: "Nguyễn Văn A",
      target: 50000,
      current: 45000,
      backers: 124,
      percentage: 90,
    },
    {
      rank: 3,
      title: "Nền tảng e-learning Tiếng Anh",
      founder: "Phạm Hồ D",
      target: 20000,
      current: 18000,
      backers: 203,
      percentage: 90,
    },
  ]

  const topBackers = [
    { rank: 1, name: "Trần Minh", contributions: 45, totalAmount: 2500000 },
    { rank: 2, name: "Lê Hồng", contributions: 38, totalAmount: 2100000 },
    { rank: 3, name: "Phạm Anh", contributions: 32, totalAmount: 1850000 },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Bảng xếp hạng</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Khám phá các dự án hàng đầu và những người ủng hộ tích cực nhất
            </p>
          </div>
        </section>

        {/* Leaderboards */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Tabs defaultValue="projects" className="border-b border-border">
              <TabsList className="w-full justify-start rounded-none">
                <TabsTrigger value="projects">Dự án hàng đầu</TabsTrigger>
                <TabsTrigger value="backers">Người ủng hộ hàng đầu</TabsTrigger>
              </TabsList>

              {/* Top Projects */}
              <TabsContent value="projects" className="mt-8">
                <div className="space-y-4">
                  {topProjects.map((project) => (
                    <Card key={project.rank} className="p-6 hover:shadow-md transition">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0">
                          <span className="text-lg font-bold text-primary-foreground">{project.rank}</span>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">{project.founder}</p>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-primary/20 text-primary">{project.percentage}%</Badge>
                            <span className="font-semibold text-foreground">{project.backers} người ủng hộ</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {project.current.toLocaleString("vi-VN")} / {project.target.toLocaleString("vi-VN")} ₫
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Top Backers */}
              <TabsContent value="backers" className="mt-8">
                <div className="space-y-4">
                  {topBackers.map((backer) => (
                    <Card key={backer.rank} className="p-6 hover:shadow-md transition">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex-shrink-0">
                          <span className="text-lg font-bold text-secondary-foreground">{backer.rank}</span>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-foreground">{backer.name}</h3>
                          <p className="text-sm text-muted-foreground">{backer.contributions} lần ủng hộ</p>
                        </div>

                        <div className="flex items-center gap-2 text-right flex-shrink-0">
                          <TrendingUp className="h-5 w-5 text-accent" />
                          <span className="font-bold text-lg text-foreground">
                            {backer.totalAmount.toLocaleString("vi-VN")} ₫
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
