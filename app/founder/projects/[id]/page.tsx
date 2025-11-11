"use client"

import { useState } from "react"
import Link from "next/link"
import { ProtectedLayout } from "@/components/auth/protected-layout"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

export default function ManageProjectPage({ params }) {
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [updates, setUpdates] = useState([
    {
      id: 1,
      title: "Hoàn thành giai đoạn 1!",
      content: "Chúng tôi vừa hoàn thành giai đoạn 1...",
      createdAt: "2025-11-10",
    },
  ])

  const [newUpdate, setNewUpdate] = useState({ title: "", content: "" })
  const [contributors, setContributors] = useState([
    {
      id: 1,
      email: "backer01@example.com",
      amount: 50000,
      date: "2025-11-15",
      status: "CONFIRMED",
    },
    {
      id: 2,
      email: "backer02@example.com",
      amount: 1000,
      date: "2025-11-10",
      status: "COMPLETED",
    },
  ])

  const project = {
    id: params.id,
    title: "Hệ thống tưới tiêu thông minh",
    status: "APPROVED",
    target: 50000,
    current: 35000,
    backers: 124,
  }

  const handleAddUpdate = () => {
    if (newUpdate.title && newUpdate.content) {
      setUpdates([
        {
          id: updates.length + 1,
          title: newUpdate.title,
          content: newUpdate.content,
          createdAt: new Date().toISOString().split("T")[0],
        },
        ...updates,
      ])
      setNewUpdate({ title: "", content: "" })
      setShowUpdateForm(false)
    }
  }

  const handleDeleteUpdate = (id) => {
    setUpdates(updates.filter((u) => u.id !== id))
  }

  return (
    <ProtectedLayout>
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <Link href="/founder/dashboard" className="flex items-center gap-2 text-primary hover:underline mb-8">
              <ArrowLeft size={20} />
              Quay lại
            </Link>

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">{project.title}</h1>
              <p className="mt-2 text-muted-foreground">Quản lý toàn bộ hoạt động của dự án</p>
            </div>

            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-4 mb-8">
              <Card className="p-6">
                <p className="text-sm text-muted-foreground">Tiến độ</p>
                <p className="text-2xl font-bold text-foreground">
                  {((project.current / project.target) * 100).toFixed(0)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {project.current.toLocaleString("vi-VN")} / {project.target.toLocaleString("vi-VN")} ₫
                </p>
              </Card>

              <Card className="p-6">
                <p className="text-sm text-muted-foreground">Người ủng hộ</p>
                <p className="text-2xl font-bold text-foreground">{project.backers}</p>
              </Card>

              <Card className="p-6">
                <p className="text-sm text-muted-foreground">Trạng thái</p>
                <p className="text-2xl font-bold text-primary">{project.status}</p>
              </Card>

              <Card className="p-6">
                <p className="text-sm text-muted-foreground">Cập nhật</p>
                <p className="text-2xl font-bold text-foreground">{updates.length}</p>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="updates" className="border-b border-border">
              <TabsList className="w-full justify-start rounded-none">
                <TabsTrigger value="updates">Cập nhật ({updates.length})</TabsTrigger>
                <TabsTrigger value="contributors">Người ủng hộ ({contributors.length})</TabsTrigger>
                <TabsTrigger value="analytics">Phân tích</TabsTrigger>
              </TabsList>

              {/* Updates Tab */}
              <TabsContent value="updates" className="mt-8">
                {!showUpdateForm ? (
                  <Button onClick={() => setShowUpdateForm(true)} className="mb-6 gap-2">
                    <Plus size={20} />
                    Đăng cập nhật mới
                  </Button>
                ) : (
                  <Card className="p-6 mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Đăng cập nhật mới</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Tiêu đề</label>
                        <Input
                          value={newUpdate.title}
                          onChange={(e) =>
                            setNewUpdate({
                              ...newUpdate,
                              title: e.target.value,
                            })
                          }
                          placeholder="Ví dụ: Hoàn thành giai đoạn 1!"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Nội dung</label>
                        <textarea
                          value={newUpdate.content}
                          onChange={(e) =>
                            setNewUpdate({
                              ...newUpdate,
                              content: e.target.value,
                            })
                          }
                          placeholder="Viết chi tiết về cập nhật..."
                          rows={6}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setShowUpdateForm(false)}>
                          Hủy
                        </Button>
                        <Button onClick={handleAddUpdate}>Đăng cập nhật</Button>
                      </div>
                    </div>
                  </Card>
                )}

                <div className="space-y-4">
                  {updates.map((update) => (
                    <Card key={update.id} className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{update.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(update.createdAt).toLocaleDateString("vi-VN")}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteUpdate(update.id)}
                          className="text-muted-foreground hover:text-destructive transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-foreground whitespace-pre-line">{update.content}</p>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Contributors Tab */}
              <TabsContent value="contributors" className="mt-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 font-semibold text-foreground">Email</th>
                        <th className="text-left p-4 font-semibold text-foreground">Số tiền</th>
                        <th className="text-left p-4 font-semibold text-foreground">Ngày</th>
                        <th className="text-left p-4 font-semibold text-foreground">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contributors.map((contributor) => (
                        <tr key={contributor.id} className="border-b border-border hover:bg-muted/30">
                          <td className="p-4 text-foreground">{contributor.email}</td>
                          <td className="p-4 text-foreground font-semibold">
                            {contributor.amount.toLocaleString("vi-VN")} ₫
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {new Date(contributor.date).toLocaleDateString("vi-VN")}
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                contributor.status === "COMPLETED"
                                  ? "bg-primary/10 text-primary"
                                  : "bg-secondary/10 text-secondary"
                              }`}
                            >
                              {contributor.status === "COMPLETED" ? "Hoàn tất" : "Chờ xác nhận"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="mt-8">
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">Tính năng phân tích chi tiết sẽ sớm khả dụng</p>
                  <div className="inline-block text-5xl">📊</div>
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
