"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Mail, Lock, Loader2 } from "lucide-react"

export function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nickName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState(1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName || !formData.nickName) {
      setError("Vui lòng điền đầy đủ tên")
      return false
    }
    setError("")
    return true
  }

  const validateStep2 = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp")
      return false
    }
    if (formData.password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự")
      return false
    }
    setError("")
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Mock registration - in production, call your backend API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock success
      const mockSession = {
        user_id: "newuser_" + Date.now(),
        email: formData.email,
        nick_name: formData.nickName,
        role: "user",
        token: "eyJhbGc...[mock-jwt-token]...I8F",
      }
      localStorage.setItem("auth_session", JSON.stringify(mockSession))
      router.push("/dashboard")
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="rounded-lg bg-destructive/10 p-4 text-destructive text-sm">{error}</div>}

      {step === 1 ? (
        <>
          {/* Step 1: Personal Info */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
              Tên
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="firstName"
                name="firstName"
                placeholder="Tên"
                value={formData.firstName}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
              Họ
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="lastName"
                name="lastName"
                placeholder="Họ"
                value={formData.lastName}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="nickName" className="block text-sm font-medium text-foreground mb-2">
              Tên hiển thị (nickname)
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="nickName"
                name="nickName"
                placeholder="Johnny"
                value={formData.nickName}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button type="button" size="lg" className="w-full" onClick={() => validateStep1() && setStep(2)}>
            Tiếp theo
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link href="/login" className="text-primary hover:underline font-semibold">
              Đăng nhập
            </Link>
          </p>
        </>
      ) : (
        <>
          {/* Step 2: Account Info */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Ít nhất 8 ký tự</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="flex-1 bg-transparent"
              onClick={() => setStep(1)}
            >
              Quay lại
            </Button>
            <Button type="submit" size="lg" className="flex-1" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </div>
        </>
      )}
    </form>
  )
}
