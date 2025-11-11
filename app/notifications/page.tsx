"use client"

import Link from "next/link"
import { ProtectedLayout } from "@/components/auth/protected-layout"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Trash2 } from "lucide-react"
import { useState } from "react"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      notification_id: 1,
      title: "Dự án đã được duyệt!",
      message: "Chúc mừng, dự án 'Phim ngắn Nghệ thuật Bóng' của bạn đã được duyệt.",
      is_read: false,
      type: "PROJECT_APPROVED",
      url: "/projects/102",
      created_at: "2025-11-09T10:00:00Z",
    },
    {
      notification_id: 2,
      title: "Cập nhật tiến độ mới",
      message: "Dự án 'Phim ngắn Nghệ thuật Bóng' vừa đăng một cập nhật mới: 'Hoàn thành casting!'",
      is_read: true,
      type: "NEW_UPDATE",
      url: "/projects/102/milestones/5",
      created_at: "2025-11-10T14:00:00Z",
    },
    {
      notification_id: 3,
      title: "Người mới ủng hộ dự án",
      message: "Có 5 người mới ủng hộ dự án của bạn hôm nay",
      is_read: true,
      type: "NEW_BACKER",
      url: "/projects/102",
      created_at: "2025-11-11T09:30:00Z",
    },
  ])

  const handleDelete = (id) => {
    setNotifications(notifications.filter((n) => n.notification_id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.is_read).length

  return (
    <ProtectedLayout>
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Bell size={32} />
                Thông báo
              </h1>
              {unreadCount > 0 && <p className="mt-2 text-muted-foreground">Bạn có {unreadCount} thông báo chưa đọc</p>}
            </div>

            {notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Card
                    key={notification.notification_id}
                    className={`p-6 transition hover:shadow-md ${
                      !notification.is_read ? "border-primary/50 bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground">{notification.title}</h3>
                          {!notification.is_read && <Badge className="bg-primary">Mới</Badge>}
                        </div>
                        <p className="text-muted-foreground text-sm">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-3">
                          {new Date(notification.created_at).toLocaleDateString("vi-VN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {notification.url && (
                          <Link
                            href={notification.url}
                            className="inline-block px-3 py-1.5 rounded bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition"
                          >
                            Xem
                          </Link>
                        )}
                        <button
                          onClick={() => handleDelete(notification.notification_id)}
                          className="inline-flex items-center justify-center px-3 py-1.5 rounded bg-muted text-muted-foreground hover:bg-muted/80 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Bell size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground text-lg">Không có thông báo mới</p>
              </Card>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedLayout>
  )
}
