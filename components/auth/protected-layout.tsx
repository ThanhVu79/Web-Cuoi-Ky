"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const session = localStorage.getItem("auth_session")
    if (!session) {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-muted-foreground">Đang tải...</div>
        </div>
        <Footer />
      </>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return children
}
