"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "Nông nghiệp", "Điện ảnh", "Y tế", "Công nghệ", "Giáo dục"]

  const projects = [
    {
      id: 1,
      title: "Hệ thống tưới tiêu thông minh",
      category: "Nông nghiệp",
      target: 50000,
      current: 35000,
      deadline: "2026-01-31",
      status: "APPROVED",
      founder: "Nguyễn Văn A",
      backers: 124,
      image: "/smart-farming-system.jpg",
    },
    {
      id: 2,
      title: "Phim ngắn Nghệ thuật Bóng",
      category: "Điện ảnh",
      target: 10000,
      current: 7500,
      deadline: "2025-12-01",
      status: "APPROVED",
      founder: "Trần Thị B",
      backers: 89,
      image: "/art-film-production.jpg",
    },
    {
      id: 3,
      title: "Ứng dụng quản lý sức khỏe",
      category: "Y tế",
      target: 30000,
      current: 12000,
      deadline: "2026-02-15",
      status: "APPROVED",
      founder: "Lê Văn C",
      backers: 56,
      image: "/health-app-development.jpg",
    },
    {
      id: 4,
      title: "Nền tảng e-learning Tiếng Anh",
      category: "Giáo dục",
      target: 20000,
      current: 18000,
      deadline: "2026-03-10",
      status: "APPROVED",
      founder: "Phạm Hồ D",
      backers: 203,
      image: "/online-learning-platform.png",
    },
    {
      id: 5,
      title: "Công cụ AI viết code tự động",
      category: "Công nghệ",
      target: 100000,
      current: 45000,
      deadline: "2026-04-20",
      status: "APPROVED",
      founder: "Vũ Thế E",
      backers: 312,
      image: "/ai-coding-tool.jpg",
    },
    {
      id: 6,
      title: "Ứng dụng giao hàng nông sản",
      category: "Nông nghiệp",
      target: 25000,
      current: 8000,
      deadline: "2026-05-01",
      status: "APPROVED",
      founder: "Tôn Thị F",
      backers: 34,
      image: "/agricultural-delivery-app.jpg",
    },
  ]

  const filteredProjects = projects.filter(
    (p) =>
      (selectedCategory === "all" || p.category === selectedCategory) &&
      p.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getProgressColor = (current, target) => {
    const percentage = current / target
    if (percentage >= 0.9) return "from-primary to-primary"
    if (percentage >= 0.6) return "from-secondary to-secondary"
    return "from-accent to-accent"
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Page Header */}
        <section className="border-b border-border bg-muted/20 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl font-bold text-foreground">Khám phá dự án</h1>
            <p className="mt-2 text-muted-foreground">Tìm kiếm và hỗ trợ các dự án startup đổi mới</p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="border-b border-border bg-background px-4 py-8 sm:px-6 lg:px-8 sticky top-[72px] z-40">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-[1fr_auto]">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm dự án..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-6"
                />
              </div>

              {/* Results */}
              <div className="flex items-center justify-end text-sm text-muted-foreground">
                {filteredProjects.length} dự án
              </div>
            </div>

            {/* Categories */}
            <div className="mt-6 flex flex-wrap gap-3">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className="capitalize"
                >
                  {cat === "all" ? "Tất cả" : cat}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {filteredProjects.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden group hover:shadow-xl transition-shadow">
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute top-4 right-4 inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        {project.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-foreground line-clamp-2 min-h-14">{project.title}</h3>

                      <p className="mt-3 text-sm text-muted-foreground">
                        bởi <span className="font-semibold">{project.founder}</span>
                      </p>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-bold text-primary">
                            {((project.current / project.target) * 100).toFixed(0)}%
                          </span>
                          <span className="text-muted-foreground">{project.target.toLocaleString("vi-VN")} ₫</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                            style={{
                              width: `${Math.min((project.current / project.target) * 100, 100)}%`,
                            }}
                          />
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">{project.backers} người ủng hộ</p>
                      </div>

                      {/* Footer Info */}
                      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                        <span className="text-xs text-muted-foreground">
                          Hạn cuối: {new Date(project.deadline).toLocaleDateString("vi-VN")}
                        </span>
                        <Button size="sm" asChild>
                          <Link href={`/projects/${project.id}`}>Xem chi tiết</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">Không tìm thấy dự án phù hợp</p>
                <Button variant="outline" className="mt-4 bg-transparent">
                  Xóa bộ lọc
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
