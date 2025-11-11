"use client"
import Link from "next/link"
import { ProtectedLayout } from "@/components/auth/protected-layout"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, TrendingUp, Award } from "lucide-react"

export default function DashboardPage() {
  const session = JSON.parse(localStorage.getItem("auth_session") || "{}")

  const contributions = [
    {
      id: 1,
      projectId: 102,
      projectTitle: "Phim ngắn Nghệ thuật Bóng",
      amount: 50000,
      date: "2025-11-15",
      status: "CONFIRMED",
      reward: "Gói Startup",
    },
    {
      id: 2,
      projectId: 1,
      projectTitle: "Hệ thống tưới tiêu thông minh",
      amount: 1000,
      date: "2025-11-10",
      status: "COMPLETED",
      reward: "Gói Ủng hộ",
    },
  ]

  const favorites = [
    {
      id: 1,
      title: "Ứng dụng quản lý sức khỏe",
      category: "Y tế",
      founder: "Lê Văn C",
      target: 30000,
      current: 12000,
      image: "/health-app-development.jpg",
    },
    {
      id: 3,
      title: "Công cụ AI viết code tự động",
      category: "Công nghệ",
      founder: "Vũ Thế E",
      target: 100000,
      current: 45000,
      image: "/placeholder.svg?key=2zqme",
    },
  ]

  return (
    <ProtectedLayout>
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">Chào mừng, {session.nick_name}!</h1>
              <p className="mt-2 text-muted-foreground">Quản lý các ủng hộ và yêu thích của bạn</p>
            </div>

            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Tổng đã ủng hộ</p>
                    <p className="text-2xl font-bold text-foreground">
                      {contributions.reduce((sum, c) => sum + c.amount, 0).toLocaleString("vi-VN")} ₫
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Số dự án ủng hộ</p>
                    <p className="text-2xl font-bold text-foreground">{contributions.length}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                    <Award className="h-6 w-6 text-secondary" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Dự án yêu thích</p>
                    <p className="text-2xl font-bold text-foreground">{favorites.length}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Content Tabs */}
            <Tabs defaultValue="contributions" className="border-b border-border">
              <TabsList className="w-full justify-start rounded-none">
                <TabsTrigger value="contributions">Đóng góp ({contributions.length})</TabsTrigger>
                <TabsTrigger value="favorites">Yêu thích ({favorites.length})</TabsTrigger>
                <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
              </TabsList>

              {/* Contributions Tab */}
              <TabsContent value="contributions" className="mt-8">
                <div className="space-y-4">
                  {contributions.map((contribution) => (
                    <Card key={contribution.id} className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-foreground">{contribution.projectTitle}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(contribution.date).toLocaleDateString("vi-VN")}
                          </p>
                        </div>
                        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                          {contribution.amount.toLocaleString("vi-VN")} ₫
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <p className="text-muted-foreground">Gói nhận: {contribution.reward}</p>
                          <p
                            className={`mt-1 ${
                              contribution.status === "CONFIRMED" ? "text-primary" : "text-secondary"
                            }`}
                          >
                            {contribution.status === "CONFIRMED" ? "Đang chờ" : "Hoàn thành"}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/projects/${contribution.projectId}`}>Xem dự án</Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Favorites Tab */}
              <TabsContent value="favorites" className="mt-8">
                <div className="grid gap-6 md:grid-cols-2">
                  {favorites.map((project) => (
                    <Card key={project.id} className="overflow-hidden hover:shadow-lg transition">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="h-40 w-full object-cover"
                      />
                      <div className="p-4">
                        <p className="text-xs text-primary font-medium">{project.category}</p>
                        <h3 className="mt-2 font-semibold text-foreground line-clamp-2">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">bởi {project.founder}</p>

                        <div className="mt-4">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-semibold">
                              {((project.current / project.target) * 100).toFixed(0)}%
                            </span>
                            <span className="text-muted-foreground">{project.target.toLocaleString("vi-VN")} ₫</span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent"
                              style={{
                                width: `${Math.min((project.current / project.target) * 100, 100)}%`,
                              }}
                            />
                          </div>
                        </div>

                        <Button className="mt-4 w-full" size="sm" asChild>
                          <Link href={`/projects/${project.id}`}>Xem chi tiết</Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="mt-8">
                <Card className="p-8 max-w-2xl">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Thông tin cá nhân</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Tên hiển thị</p>
                          <p className="mt-1 font-semibold text-foreground">{session.nick_name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="mt-1 font-semibold text-foreground">{session.email}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Các hành động khác</h3>
                      <Button variant="outline" asChild className="w-full md:w-auto bg-transparent">
                        <Link href="/dashboard/settings">Cải đặt tài khoản</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedLayout>
  )
}
