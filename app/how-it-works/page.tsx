import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Users, TrendingUp, Zap } from "lucide-react"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Users,
      title: "Tạo dự án",
      desc: "Nhà sáng lập tạo trang dự án chi tiết với các thông tin quan trọng và mục tiêu tài chính",
    },
    {
      icon: CheckCircle,
      title: "Được duyệt",
      desc: "Đội ngũ FundHub duyệt dự án trong 5-7 ngày để đảm bảo chất lượng",
    },
    {
      icon: TrendingUp,
      title: "Gây quỹ",
      desc: "Dự án được công khai và người ủng hộ có thể tài trợ cho dự án của họ",
    },
    {
      icon: Zap,
      title: "Thực hiện",
      desc: "Khi đạt mục tiêu, nhà sáng lập bắt đầu thực hiện dự án và cập nhật tiến độ",
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Cách thức hoạt động</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Hãy cùng khám phá quá trình từ ý tưởng đến thực tế trên FundHub
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={index}>
                  <Card className="p-8 h-full relative">
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <step.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </Card>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-8 h-1 bg-gradient-to-r from-primary to-accent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For Backers */}
        <section className="bg-muted/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">Cho người ủng hộ</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Khám phá</h3>
                <p className="text-muted-foreground mb-4">
                  Duyệt qua các dự án đổi mới và tìm những dự án mà bạn yêu thích
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Ủng hộ</h3>
                <p className="text-muted-foreground mb-4">
                  Chọn gói phần thưởng và thanh toán qua các phương thức an toàn
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Nhận phần thưởng</h3>
                <p className="text-muted-foreground mb-4">Nhận những phần thưởng độc quyền từ nhà sáng lập</p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Theo dõi tiến độ</h3>
                <p className="text-muted-foreground mb-4">Nhận cập nhật thường xuyên về tiến độ thực hiện dự án</p>
              </Card>
            </div>
          </div>
        </section>

        {/* For Founders */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">Cho nhà sáng lập</h2>
            <div className="space-y-4">
              {[
                "Viết mô tả chi tiết về dự án và các mục tiêu của bạn",
                "Đặt mục tiêu tài chính và hạn chót để gây quỹ",
                "Gửi dự án để được duyệt bởi đội ngũ FundHub",
                "Khi được duyệt, dự án xuất hiện công khai trên nền tảng",
                "Nhận tài trợ từ cộng đồng và quản lý quy trình",
                "Cập nhật tiến độ định kỳ cho những người ủng hộ",
              ].map((point, i) => (
                <Card key={i} className="p-4 flex gap-4 items-start">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{point}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="bg-muted/30 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Có câu hỏi?</h2>
            <p className="text-muted-foreground mb-8">
              Hãy xem câu hỏi thường gặp của chúng tôi hoặc liên hệ với đội hỗ trợ
            </p>
            <Button size="lg" asChild>
              <Link href="/faq">Xem câu hỏi thường gặp</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
