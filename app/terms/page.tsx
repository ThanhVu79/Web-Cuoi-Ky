import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Điều khoản sử dụng</h1>

          <div className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-3">1. Chấp nhận điều khoản</h2>
              <p className="text-muted-foreground">
                Bằng cách truy cập và sử dụng FundHub, bạn đồng ý tuân theo các điều khoản và điều kiện này.
              </p>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-3">2. Hạn chế sử dụng</h2>
              <p className="text-muted-foreground">
                Bạn không được phép sử dụng nền tảng này cho bất kỳ mục đích bất hợp pháp hoặc không được phép, bao gồm
                lừa đảo, vi phạm bản quyền hoặc các hoạt động độc hại khác.
              </p>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-3">3. Trách nhiệm của người dùng</h2>
              <p className="text-muted-foreground">
                Bạn chịu trách nhiệm về tất cả thông tin mà bạn cung cấp và các hành động bạn thực hiện trên nền tảng.
              </p>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-3">4. Sở hữu trí tuệ</h2>
              <p className="text-muted-foreground">
                Tất cả nội dung trên FundHub, bao gồm văn bản, hình ảnh và logo, được bảo vệ bởi luật bản quyền.
              </p>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-3">5. Khước từ trách nhiệm</h2>
              <p className="text-muted-foreground">
                FundHub cung cấp dịch vụ trên cơ sở "nguyên trạng". Chúng tôi không đưa ra bất kỳ bảo đảm nào, rõ ràng
                hoặc ngụ ý.
              </p>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-3">6. Giới hạn trách nhiệm</h2>
              <p className="text-muted-foreground">
                Trong bất kỳ trường hợp nào, FundHub sẽ không chịu trách nhiệm về bất kỳ thiệt hại gián tiếp, ngẫu
                nhiên, đặc biệt hoặc hậu quả nào.
              </p>
            </Card>
          </div>

          <p className="text-sm text-muted-foreground mt-12">Cập nhật lần cuối: Tháng 11 năm 2025</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
