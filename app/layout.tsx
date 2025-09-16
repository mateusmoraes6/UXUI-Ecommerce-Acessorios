import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import { ToastContainer } from "@/components/ui/toast-notification"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ELEGANCE - Acessórios Premium",
  description:
    "Descubra nossa coleção exclusiva de acessórios premium para homens e mulheres que valorizam elegância, qualidade e sofisticação em cada detalhe.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CartProvider>
          {children}
          <ToastContainer />
        </CartProvider>
      </body>
    </html>
  )
}
