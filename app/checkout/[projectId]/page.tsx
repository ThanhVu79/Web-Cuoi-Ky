"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Loader2 } from "lucide-react"

const getProject = (id) => ({
  id,
  title: "Hệ thống tưới tiêu thông minh",
  founder: "Nguyễn Văn A",
  image: "/smart-farming-system.jpg",
  target: 50000,
})

export default function CheckoutPage({ params }) {
  const router = useRouter()
  const project = getProject(params.projectId)
  const [amount, setAmount] = useState(1000)
  const [paymentMethod, setPaymentMethod] = useState("vnpay")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState("amount")

  const presetAmounts = [1000, 5000, 10000, 50000, 100000]

  const handlePayment = async () => {
    setLoading(true)

    try {
      // Mock payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Store contribution (mock)
      const contribution = {
        contribution_id: Math.floor(Math.random() * 10000),
        user_id: "backer01",
        project_id: project.id,
        amount,
        payment_status: "PENDING",
        payment_url: `https://sandbox.vnpayment.vn/payment-url/${Date.now()}`,
      }

      localStorage.setItem("last_contribution", JSON.stringify(contribution))

      // Redirect to payment status
      router.push(`/payment-status?status=success&projectId=${project.id}`)
    } catch (error) {
      console.error("Payment error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen py-8 px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <Link href={`/projects/${project.id}`} className="flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft size={20} />
            Quay lại dự án
          </Link>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <h1 className="text-2xl font-bold text-foreground mb-8">Ủng hộ dự án</h1>

                {step === "amount" && (
                  <div className="space-y-8">
                    {/* Amount Selection */}
                    <div>
                      <h2 className="text-lg font-semibold text-foreground mb-4">Chọn số tiền ủng hộ</h2>

                      {/* Preset Amounts */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {presetAmounts.map((preset) => (
                          <button
                            key={preset}
                            onClick={() => setAmount(preset)}
                            className={`p-3 rounded-lg border-2 transition ${
                              amount === preset ? "border-primary bg-primary/5" : "border-border hover:border-primary"
                            }`}
                          >
                            <p className="font-semibold text-foreground">{preset.toLocaleString("vi-VN")} ₫</p>
                          </button>
                        ))}
                      </div>

                      {/* Custom Amount */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Hoặc nhập số tiền tùy chỉnh
                        </label>
                        <Input
                          type="number"
                          min="1000"
                          value={amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          className="w-full"
                          placeholder="Số tiền (₫)"
                        />
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="border-t border-border pt-8">
                      <h2 className="text-lg font-semibold text-foreground mb-4">Phương thức thanh toán</h2>

                      <div className="space-y-3">
                        {[
                          { id: "vnpay", name: "VNPay", desc: "Ví điện tử VNPay" },
                          { id: "momo", name: "Momo", desc: "Ví điện tử Momo" },
                          { id: "card", name: "Thẻ ngân hàng", desc: "Visa, Mastercard, JCB" },
                        ].map((method) => (
                          <label
                            key={method.id}
                            className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition ${
                              paymentMethod === method.id ? "border-primary bg-primary/5" : "border-border"
                            }`}
                          >
                            <input
                              type="radio"
                              name="payment"
                              value={method.id}
                              checked={paymentMethod === method.id}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="w-4 h-4"
                            />
                            <div>
                              <p className="font-semibold text-foreground">{method.name}</p>
                              <p className="text-sm text-muted-foreground">{method.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Button size="lg" className="w-full" onClick={() => setStep("review")}>
                      Tiếp theo
                    </Button>
                  </div>
                )}

                {step === "review" && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground mb-4">Xác nhận ủng hộ</h2>

                      <div className="space-y-3 bg-muted/30 p-6 rounded-lg">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dự án</span>
                          <span className="font-semibold text-foreground">{project.title}</span>
                        </div>
                        <div className="border-t border-border pt-3 flex justify-between">
                          <span className="text-muted-foreground">Số tiền</span>
                          <span className="font-bold text-primary text-lg">{amount.toLocaleString("vi-VN")} ₫</span>
                        </div>
                        <div className="border-t border-border pt-3 flex justify-between">
                          <span className="text-muted-foreground">Phương thức</span>
                          <span className="font-semibold text-foreground">
                            {paymentMethod === "vnpay" && "VNPay"}
                            {paymentMethod === "momo" && "Momo"}
                            {paymentMethod === "card" && "Thẻ ngân hàng"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex-1 bg-transparent"
                        onClick={() => setStep("amount")}
                        disabled={loading}
                      >
                        Quay lại
                      </Button>
                      <Button size="lg" className="flex-1" onClick={handlePayment} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {loading ? "Đang xử lý..." : "Xác nhận & Thanh toán"}
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="sticky top-8 p-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="font-bold text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">Nhà sáng lập: {project.founder}</p>

                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Số tiền sẽ ủng hộ</p>
                  <p className="text-3xl font-bold text-primary">{amount.toLocaleString("vi-VN")} ₫</p>
                </div>

                <div className="mt-4 p-3 bg-secondary/5 rounded-lg text-sm">
                  <p className="text-muted-foreground mb-2">Điều khoản:</p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>✓ Giao dịch an toàn và bảo mật</li>
                    <li>✓ Không hoàn tiền sau khi xác nhận</li>
                    <li>✓ Bạn sẽ nhận được phần thưởng</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
