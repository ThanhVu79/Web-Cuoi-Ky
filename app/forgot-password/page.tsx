"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Mail, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Mock request
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSubmitted(true)
    setLoading(false)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {!submitted ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground">Quên mật khẩu?</h1>
                <p className="mt-2 text-muted-foreground">
                  Nhập email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu
                </p>
              </div>

              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    {loading ? "Đang gửi..." : "Gửi link đặt lại"}
                  </Button>

                  <Link href="/login" className="flex items-center justify-center text-sm text-primary hover:underline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Quay lại đăng nhập
                  </Link>
                </form>
              </Card>
            </>
          ) : (
            <div className="text-center">
              <div className="mb-6 text-6xl">✓</div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Email đã được gửi</h1>
              <p className="text-muted-foreground mb-8">Vui lòng kiểm tra email {email} để đặt lại mật khẩu của bạn</p>
              <Button asChild className="w-full">
                <Link href="/login">Quay lại đăng nhập</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
