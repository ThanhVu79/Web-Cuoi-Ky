"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Lock, Loader2, Shield } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock admin login
      if (email === "admin@fundhub.com" && password === "AdminPass123!") {
        const adminSession = {
          user_id: "admin_001",
          email: "admin@fundhub.com",
          role: "admin",
          token: "admin-jwt-token",
        }
        localStorage.setItem("admin_session", JSON.stringify(adminSession))
        router.push("/admin/dashboard")
      } else {
        setError("Email hoặc mật khẩu admin không chính xác")
      }
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary mx-auto mb-4">
              <Shield size={32} className="text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Đăng nhập Admin</h1>
            <p className="mt-2 text-muted-foreground">Quản lý nền tảng FundHub</p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <div className="rounded-lg bg-destructive/10 p-4 text-destructive text-sm">{error}</div>}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Admin
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>

              <Card className="bg-muted/30 p-3 border-none">
                <p className="text-xs text-muted-foreground text-center">Demo: admin@fundhub.com / AdminPass123!</p>
              </Card>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
