"use client"

import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TrendingUp, Users, Zap } from "lucide-react"

export default function Home() {
  const featuredProjects = [
    {
      id: 1,
      title: "Hệ thống tưới tiêu thông minh",
      category: "Nông nghiệp",
      target: 50000,
      current: 35000,
      image: "/smart-farming-system.jpg",
      founder: "Nguyễn Văn A",
    },
    {
      id: 2,
      title: "Phim ngắn Nghệ thuật Bóng",
      category: "Điện ảnh",
      target: 10000,
      current: 7500,
      image: "/art-film-production.jpg",
      founder: "Trần Thị B",
    },
    {
      id: 3,
      title: "Ứng dụng quản lý sức khỏe",
      category: "Y tế",
      target: 30000,
      current: 12000,
      image: "/health-app-development.jpg",
      founder: "Lê Văn C",
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl">
                Hỗ trợ Startup
                <span className="block text-primary"> Độc Lập Của Bạn</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Kết nối với các nhà đầu tư, người ủng hộ và cộng đồng để biến ý tưởng sáng tạo của bạn thành hiện thực
              </p>
              <div className="mt-8 flex gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/explore">Khám phá dự án</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/register">Bắt đầu dự án của bạn</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Tại sao chọn FundHub?</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { icon: Zap, title: "Nhanh chóng & Dễ dàng", desc: "Quy trình duyệt nhanh chóng trong 5-7 ngày" },
                { icon: Users, title: "Cộng đồng Sôi Động", desc: "Kết nối với hơn 50,000 nhà đầu tư trong nước" },
                { icon: TrendingUp, title: "Tỷ lệ Thành công Cao", desc: "Hơn 78% dự án đạt được mục tiêu tài chính" },
              ].map((item, i) => (
                <Card key={i} className="p-8 text-center">
                  <item.icon className="mx-auto mb-4 h-12 w-12 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="bg-muted/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Dự án nổi bật</h2>
              <p className="mt-2 text-muted-foreground">Những dự án đang nổi bật trên FundHub</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {featuredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <p className="text-sm text-primary font-medium">{project.category}</p>
                    <h3 className="mt-2 text-xl font-bold text-foreground line-clamp-2">{project.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">bởi {project.founder}</p>

                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold text-foreground">
                          {((project.current / project.target) * 100).toFixed(0)}%
                        </span>
                        <span className="text-muted-foreground">{project.target.toLocaleString("vi-VN")} ₫</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent transition-all"
                          style={{ width: `${Math.min((project.current / project.target) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    <Button className="mt-6 w-full" asChild>
                      <Link href={`/projects/${project.id}`}>Xem chi tiết</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
