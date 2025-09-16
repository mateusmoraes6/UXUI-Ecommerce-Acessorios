"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Cart from "./cart"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">ELEGANCE</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#masculino" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Masculino
            </Link>
            <Link href="#feminino" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Feminino
            </Link>
            <Link href="#colecoes" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Coleções
            </Link>
            <Link href="#sobre" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Sobre
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Cart />
            <Button className="bg-gray-900 hover:bg-gray-800 text-white">Comprar Agora</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Cart />
            <button className="ml-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="#masculino"
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Masculino
            </Link>
            <Link
              href="#feminino"
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Feminino
            </Link>
            <Link
              href="#colecoes"
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Coleções
            </Link>
            <Link
              href="#sobre"
              className="block py-2 text-gray-700 hover:text-gray-900 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">Comprar Agora</Button>
          </div>
        )}
      </div>
    </header>
  )
}
