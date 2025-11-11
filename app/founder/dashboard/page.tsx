"use client"

import Link from "next/link"
import { ProtectedLayout } from "@/components/auth/protected-layout"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, BarChart3, Users, TrendingUp } from "lucide-react"

export default function FounderDashboardPage() {
  const projects = [
    {
      id: 1,
      title: "Hệ thống tưới tiêu thông minh",
      status: "APPROVED",
      target: 50000,
      current: 35000,
      backers: 124,
      deadline: "2026-01-31",
      image: "/smart-farming-system.jpg",
    },
  ]

  const totalRaised = projects.reduce((sum, p) => sum + p.current, 0)
  const totalBackers = projects.reduce((sum, p) => sum + p.backers, 0)

  return (
    <ProtectedLayout>
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Bảng quản lý dự án</h1>
                <p className="mt-2 text-muted-foreground">Quản lý và theo dõi dự án của bạn</p>
              </div>
              <Button asChild size="lg" className="gap-2">
                <Link href="/founder/create-project">
                  <Plus size={20} />
                  Tạo dự án mới
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-4 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Tổng vốn gây được</p>
                    <p className="text-2xl font-bold text-foreground">{totalRaised.toLocaleString("vi-VN")} ₫</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary opacity-20" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Tổng người ủng hộ</p>
                    <p className="text-2xl font-bold text-foreground">{totalBackers}</p>
                  </div>
                  <Users className="h-8 w-8 text-secondary opacity-20" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Dự án hoạt động</p>
                    <p className="text-2xl font-bold text-foreground">{projects.length}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-accent opacity-20" />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Tỷ lệ thành công</p>
                    <p className="text-2xl font-bold text-foreground">
                      {projects.length > 0
                        ? ((projects.filter((p) => p.current >= p.target).length / projects.length) * 100).toFixed(0)
                        : 0}
                      %
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary opacity-20" />
                </div>
              </Card>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Dự án của tôi</h2>

              {projects.length > 0 ? (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <Card key={project.id} className="p-6 hover:shadow-md transition">
                      <div className="grid gap-6 md:grid-cols-4 items-center">
                        {/* Image & Title */}
                        <div>
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="h-24 w-24 rounded-lg object-cover mb-3"
                          />
                          <h3 className="font-semibold text-foreground line-clamp-2">{project.title}</h3>
                        </div>

                        {/* Progress */}
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Tiến độ gây quỹ</p>
                          <div>
                            <p className="text-lg font-bold text-primary">
                              {((project.current / project.target) * 100).toFixed(0)}%
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {project.current.toLocaleString("vi-VN")} / {project.target.toLocaleString("vi-VN")} ₫
                            </p>
                          </div>
                          <div className="h-2 bg-muted rounded-full mt-2">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{
                                width: `${Math.min((project.current / project.target) * 100, 100)}%`,
                              }}
                            />
                          </div>
                        </div>

                        {/* Backers */}
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Người ủng hộ</p>
                          <p className="text-2xl font-bold text-foreground">{project.backers}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 justify-end md:flex-col">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/founder/projects/${project.id}`}>Quản lý</Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/projects/${project.id}`}>Xem công khai</Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">Bạn chưa có dự án nào</p>
                  <Button asChild>
                    <Link href="/founder/create-project">Tạo dự án đầu tiên</Link>
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedLayout>
  )
}
