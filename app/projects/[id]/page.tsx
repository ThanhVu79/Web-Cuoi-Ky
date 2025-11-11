"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2 } from "lucide-react"

// Mock project data - in real app, fetch from API
const getProject = (id) => ({
  id,
  title: "Hệ thống tưới tiêu thông minh",
  shortDescription: "Giải pháp tưới tiêu tự động sử dụng AI cho nông dân",
  description: `Dự án của chúng tôi nhằm mục đích cách mạng hóa nông nghiệp Việt Nam bằng cách giới thiệu một hệ thống tưới tiêu hoàn toàn tự động.

Với công nghệ cảm biến độ ẩm đất hiện đại và AI dự đoán thời tiết, hệ thống của chúng tôi sẽ:
- Tiết kiệm đến 40% nước so với phương pháp truyền thống
- Giảm chi phí lao động up to 60%
- Tăng năng suất cây trồng lên 25-30%
- Hoạt động 24/7 mà không cần can thiệp thủ công

Chúng tôi đã hoàn thành giai đoạn prototype và sẵn sàng phát triển cho thị trường.`,
  targetAmount: 50000,
  currentAmount: 35000,
  deadline: "2026-01-31",
  category: "Nông nghiệp",
  status: "APPROVED",
  founder: {
    id: "johndoe",
    name: "Nguyễn Văn A",
    avatar: "/diverse-profile-avatars.png",
    bio: "Kỹ sư nông nghiệp với 10 năm kinh nghiệm",
    verified: true,
  },
  backers: 124,
  updates: [
    {
      id: 1,
      title: "Hoàn thành giai đoạn 1!",
      content: "Chúng tôi vừa hoàn thành giai đoạn 1 của dự án với việc phát triển module cảm biến và kết nối IoT.",
      image: "/milestone-photo.jpg",
      createdAt: "2025-11-10",
    },
  ],
  images: ["/smart-farming-system.jpg", "/smart-farming-technology.jpg", "/agricultural-sensor-system.jpg"],
  video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  rewards: [
    {
      id: 1,
      amount: 50000,
      title: "Gói Startup",
      description: "Hệ thống tưới tiêu hoàn chỉnh + hỗ trợ kỹ thuật 1 năm",
      backers: 5,
      limit: 10,
    },
    {
      id: 2,
      amount: 10000,
      title: "Gói Nhà nông",
      description: "1 bộ cảm biến + ứng dụng mobile",
      backers: 45,
      limit: 100,
    },
    {
      id: 3,
      amount: 1000,
      title: "Gói Ủng hộ",
      description: "Tên tuỳ chọn + cập nhật tiến độ",
      backers: 74,
      limit: "Không giới hạn",
    },
  ],
})

export default function ProjectPage({ params }) {
  const project = getProject(params.id)
  const [liked, setLiked] = useState(false)
  const [selectedReward, setSelectedReward] = useState(null)

  const progressPercentage = (project.currentAmount / project.targetAmount) * 100
  const daysLeft = Math.ceil((new Date(project.deadline) - new Date()) / (1000 * 60 * 60 * 24))

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero with Images */}
        <section className="relative h-96 overflow-hidden bg-muted">
          <img
            src={project.images[0] || "/placeholder.svg"}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </section>

        {/* Main Content */}
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left Column */}
              <div className="lg:col-span-2">
                {/* Header Info */}
                <div className="mb-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge className="mb-4">{project.category}</Badge>
                      <h1 className="text-3xl font-bold text-foreground md:text-4xl">{project.title}</h1>
                    </div>
                    <button onClick={() => setLiked(!liked)} className="text-3xl transition">
                      <Heart size={32} className={liked ? "fill-red-500 text-red-500" : "text-muted-foreground"} />
                    </button>
                  </div>

                  <p className="text-lg text-muted-foreground">{project.shortDescription}</p>

                  {/* Founder Card */}
                  <Card className="mt-6 p-4 flex items-center gap-4">
                    <img
                      src={project.founder.avatar || "/placeholder.svg"}
                      alt={project.founder.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{project.founder.name}</h3>
                        {project.founder.verified && <span className="text-primary">✓</span>}
                      </div>
                      <p className="text-sm text-muted-foreground">{project.founder.bio}</p>
                    </div>
                  </Card>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="description" className="mt-8">
                  <TabsList className="border-b border-border w-full justify-start rounded-none">
                    <TabsTrigger value="description">Mô tả</TabsTrigger>
                    <TabsTrigger value="updates">Cập nhật ({project.updates.length})</TabsTrigger>
                    <TabsTrigger value="comments">Bình luận</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="mt-8 space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-4">Về dự án</h2>
                      <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{project.description}</p>
                    </div>

                    {project.video && (
                      <div className="mt-8">
                        <h3 className="text-xl font-bold text-foreground mb-4">Video giới thiệu</h3>
                        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                          <iframe
                            width="100%"
                            height="100%"
                            src={project.video}
                            title={project.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="updates" className="mt-8 space-y-6">
                    {project.updates.map((update) => (
                      <Card key={update.id} className="p-6">
                        <h3 className="text-xl font-bold text-foreground">{update.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          {new Date(update.createdAt).toLocaleDateString("vi-VN")}
                        </p>
                        {update.image && (
                          <img
                            src={update.image || "/placeholder.svg"}
                            alt={update.title}
                            className="mt-4 rounded-lg w-full h-64 object-cover"
                          />
                        )}
                        <p className="mt-4 text-foreground">{update.content}</p>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="comments" className="mt-8">
                    <Card className="p-6 text-center text-muted-foreground">
                      <MessageCircle className="mx-auto mb-2 h-8 w-8" />
                      <p>Hãy đăng nhập để bình luận</p>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right Column - Funding Widget */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 p-6">
                  <div className="space-y-6">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-3xl font-bold text-foreground">
                          {(project.currentAmount / 1000).toFixed(0)}k
                        </span>
                        <span className="text-sm text-muted-foreground">
                          / {(project.targetAmount / 1000).toFixed(0)}k ₫
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        />
                      </div>
                      <p className="mt-3 text-sm font-semibold text-foreground">
                        {progressPercentage.toFixed(0)}% tài trợ
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 border-t border-b border-border py-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{project.backers}</p>
                        <p className="text-xs text-muted-foreground">Người ủng hộ</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{daysLeft}</p>
                        <p className="text-xs text-muted-foreground">Ngày còn lại</p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button size="lg" className="w-full" asChild>
                      <Link href={`/checkout/${project.id}`}>Ủng hộ ngay</Link>
                    </Button>

                    {/* Social */}
                    <div className="flex gap-2 justify-center">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Share2 size={16} className="mr-2" />
                        Chia sẻ
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Rewards */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">Gói ủng hộ</h3>
                  <div className="space-y-4">
                    {project.rewards.map((reward) => (
                      <Card
                        key={reward.id}
                        className={`p-4 cursor-pointer transition ${
                          selectedReward?.id === reward.id ? "ring-2 ring-primary" : "hover:border-primary"
                        }`}
                        onClick={() => setSelectedReward(reward)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-lg text-primary">
                            {reward.amount.toLocaleString("vi-VN")} ₫
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {reward.backers} {typeof reward.limit === "number" ? ` / ${reward.limit}` : " người"}
                          </span>
                        </div>
                        <h4 className="font-semibold text-foreground">{reward.title}</h4>
                        <p className="text-xs text-muted-foreground mt-2">{reward.description}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
