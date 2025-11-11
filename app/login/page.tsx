import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">Chào mừng quay lại</h1>
            <p className="mt-2 text-muted-foreground">Đăng nhập vào tài khoản FundHub của bạn</p>
          </div>

          <Card className="p-8">
            <LoginForm />
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
