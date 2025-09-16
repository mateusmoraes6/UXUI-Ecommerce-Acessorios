"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Simulação de envio
      setTimeout(() => {
        setSubmitted(true)
      }, 500)
    }
  }

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Receba Novidades e Ofertas Exclusivas</h2>
          <p className="text-gray-300 mb-8">
            Inscreva-se em nossa newsletter e seja o primeiro a conhecer nossas novas coleções, promoções exclusivas e
            dicas de estilo personalizadas.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center space-x-2 text-amber-400">
              <Check className="h-6 w-6" />
              <span className="text-lg">Obrigado por se inscrever!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus-visible:ring-amber-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-black font-medium">
                Inscrever-se
              </Button>
            </form>
          )}

          <p className="text-gray-400 text-sm mt-4">
            Respeitamos sua privacidade. Você pode cancelar sua inscrição a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  )
}
