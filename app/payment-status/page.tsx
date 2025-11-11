"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, XCircle, Clock } from "lucide-react"

export default function PaymentStatusPage() {
  const searchParams = useSearchParams()
  const status = searchParams.get("status")
  const projectId = searchParams.get("projectId")

  const statusConfig = {
    success: {
      icon: CheckCircle,
      title: "Ủng hộ thành công!",
      message: "Cảm ơn bạn đã ủng hộ dự án này. Bạn sẽ nhận được cập nhật mới nhất.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    pending: {
      icon: Clock,
      title: "Thanh toán đang xử lý",
      message: "Giao dịch của bạn đang được xử lý. Vui lòng không đóng trình duyệt.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    failed: {
      icon: XCircle,
      title: "Thanh toán thất bại",
      message: "Không thể xử lý thanh toán. Vui lòng kiểm tra lại thông tin và thử lại.",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  }

  const config = statusConfig[status] || statusConfig.pending
  const Icon = config.icon

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-8 text-center">
          <div className={`${config.bgColor} rounded-lg p-4 inline-block mb-6`}>
            <Icon size={48} className={config.color} />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">{config.title}</h1>
          <p className="text-muted-foreground mb-8">{config.message}</p>

          {status === "success" && (
            <div className="bg-muted/30 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-muted-foreground">
                Mã giao dịch của bạn: <span className="font-mono font-semibold text-foreground">TXN2025111501</span>
              </p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Button size="lg" asChild>
              <Link href="/dashboard">Quay lại Dashboard</Link>
            </Button>
            {projectId && (
              <Button variant="outline" size="lg" asChild>
                <Link href={`/projects/${projectId}`}>Xem dự án</Link>
              </Button>
            )}
          </div>

          <Link href="/explore" className="block mt-4 text-sm text-primary hover:underline">
            Khám phá các dự án khác
          </Link>
        </Card>
      </main>
      <Footer />
    </>
  )
}
