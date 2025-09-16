"use client"

import { useCart, type CartItem } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, X, Plus, Minus, ShoppingCart, Trash2, Heart, Truck, CreditCard, ArrowRight } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Cart() {
  const { items, removeItem, updateQuantity, isOpen, setIsOpen, totalItems, clearCart, addItem } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [shippingMethod, setShippingMethod] = useState<string | null>(null)
  const [shippingCost, setShippingCost] = useState(0)
  const [savedForLater, setSavedForLater] = useState<CartItem[]>([])

  // Fechar o carrinho quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && !target.closest("[data-cart]") && !target.closest("[data-cart-trigger]")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, setIsOpen])

  // Desabilitar scroll quando o carrinho estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Calcular subtotal
  const subtotal = items.reduce((sum, item) => {
    const price = Number.parseFloat(item.price.replace(/[^\d,]/g, "").replace(",", "."))
    return sum + price * item.quantity
  }, 0)

  // Calcular total
  const total = subtotal - discount + shippingCost

  // Aplicar cupom
  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "elegance10") {
      const discountAmount = subtotal * 0.1
      setDiscount(discountAmount)
      window.showToast("Cupom aplicado com sucesso! 10% de desconto.", "success")
    } else if (couponCode.toLowerCase() === "frete") {
      setShippingCost(0)
      setShippingMethod("Frete Grátis")
      window.showToast("Cupom de frete grátis aplicado com sucesso!", "success")
    } else {
      window.showToast("Cupom inválido. Tente novamente.", "error")
    }
  }

  // Salvar para depois
  const saveForLater = (item: CartItem) => {
    setSavedForLater([...savedForLater, item])
    removeItem(item.id)
    window.showToast(`${item.name} salvo para depois.`, "info")
  }

  // Mover de volta para o carrinho
  const moveToCart = (item: CartItem) => {
    const { id, name, price, image, category } = item
    const product = { id, name, price, image, category }
    addItem(product)
    setSavedForLater(savedForLater.filter((savedItem) => savedItem.id !== item.id))
    window.showToast(`${item.name} movido para o carrinho.`, "success")
  }

  // Produtos recomendados baseados no carrinho
  const recommendedProducts = [
    {
      id: 101,
      name: "Kit de Limpeza para Joias",
      price: "R$ 89,00",
      image:
        "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      category: "Acessórios",
    },
    {
      id: 102,
      name: "Estojo de Viagem Premium",
      price: "R$ 129,00",
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      category: "Acessórios",
    },
  ]

  return (
    <>
      {/* Ícone do carrinho */}
      <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(true)} data-cart-trigger>
        <ShoppingBag className="h-5 w-5" />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
            >
              {totalItems}
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      {/* Overlay do carrinho */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              data-cart
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-hidden flex flex-col"
            >
              {/* Cabeçalho do carrinho */}
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Seu Carrinho
                  {totalItems > 0 && <Badge className="ml-2 bg-amber-500 text-black">{totalItems}</Badge>}
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Conteúdo do carrinho */}
              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Seu carrinho está vazio</h3>
                      <p className="text-gray-500 mb-6">
                        Parece que você ainda não adicionou nenhum item ao seu carrinho.
                      </p>
                      <Button className="bg-gray-900 hover:bg-gray-800" onClick={() => setIsOpen(false)}>
                        Continuar Comprando
                      </Button>
                    </motion.div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      <AnimatePresence>
                        {items.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                          >
                            <CartItemCard
                              item={item}
                              onRemove={() => removeItem(item.id)}
                              onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
                              onSaveForLater={() => saveForLater(item)}
                              addItem={addItem}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* Cupom de desconto */}
                    <div className="mb-6">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="coupon" className="border-b-0">
                          <AccordionTrigger className="py-2 text-sm font-medium">
                            Adicionar cupom de desconto
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex gap-2 mt-2">
                              <Input
                                placeholder="Código do cupom"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className="text-sm"
                              />
                              <Button variant="outline" size="sm" onClick={applyCoupon}>
                                Aplicar
                              </Button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              Experimente os cupons: "ELEGANCE10" para 10% de desconto ou "FRETE" para frete grátis
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>

                    {/* Opções de frete */}
                    <div className="mb-6">
                      <h3 className="font-medium mb-3 flex items-center">
                        <Truck className="h-4 w-4 mr-2" />
                        Opções de Entrega
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="shipping"
                              checked={shippingMethod === "standard"}
                              onChange={() => {
                                setShippingMethod("standard")
                                setShippingCost(15.9)
                              }}
                              className="mr-2"
                            />
                            <div>
                              <p className="font-medium">Entrega Padrão</p>
                              <p className="text-xs text-gray-500">3-5 dias úteis</p>
                            </div>
                          </div>
                          <span className="font-medium">R$ 15,90</span>
                        </label>

                        <label className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="shipping"
                              checked={shippingMethod === "express"}
                              onChange={() => {
                                setShippingMethod("express")
                                setShippingCost(29.9)
                              }}
                              className="mr-2"
                            />
                            <div>
                              <p className="font-medium">Entrega Expressa</p>
                              <p className="text-xs text-gray-500">1-2 dias úteis</p>
                            </div>
                          </div>
                          <span className="font-medium">R$ 29,90</span>
                        </label>

                        <label className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="shipping"
                              checked={shippingMethod === "Frete Grátis"}
                              onChange={() => {
                                setShippingMethod("Frete Grátis")
                                setShippingCost(0)
                              }}
                              className="mr-2"
                            />
                            <div>
                              <p className="font-medium">Frete Grátis</p>
                              <p className="text-xs text-gray-500">5-7 dias úteis</p>
                            </div>
                          </div>
                          <span className="font-medium">Grátis</span>
                        </label>
                      </div>
                    </div>

                    {/* Produtos recomendados */}
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Você também pode gostar</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {recommendedProducts.map((product) => (
                          <div key={product.id} className="border rounded-md p-2 hover:shadow-md transition-shadow">
                            <div className="aspect-square overflow-hidden rounded-md mb-2">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={150}
                                height={150}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h4 className="text-sm font-medium line-clamp-1">{product.name}</h4>
                            <p className="text-sm text-gray-500">{product.price}</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full mt-2 text-xs"
                              onClick={() => {
                                addItem(product)
                                window.showToast(`${product.name} adicionado ao carrinho!`, "success")
                              }}
                            >
                              Adicionar
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Itens salvos para depois */}
                    {savedForLater.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-medium mb-3 flex items-center">
                          <Heart className="h-4 w-4 mr-2" />
                          Salvos para depois ({savedForLater.length})
                        </h3>
                        <div className="space-y-3">
                          {savedForLater.map((item) => (
                            <div key={item.id} className="flex border rounded-md p-2">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={60}
                                height={60}
                                className="rounded-md object-cover"
                              />
                              <div className="ml-3 flex-1">
                                <h4 className="text-sm font-medium">{item.name}</h4>
                                <p className="text-sm text-gray-500">{item.price}</p>
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="h-auto p-0 text-xs"
                                  onClick={() => moveToCart(item)}
                                >
                                  Mover para o carrinho
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Rodapé do carrinho com resumo e botões */}
              {items.length > 0 && (
                <div className="border-t p-4 bg-gray-50">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Desconto</span>
                        <span className="text-green-600">-{formatPrice(discount)}</span>
                      </div>
                    )}
                    {shippingMethod && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Frete ({shippingMethod})</span>
                        <span>{shippingCost === 0 ? "Grátis" : formatPrice(shippingCost)}</span>
                      </div>
                    )}
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Finalizar Compra
                    </Button>
                    <div className="flex justify-between">
                      <Button variant="ghost" size="sm" className="text-gray-500" onClick={() => clearCart()}>
                        <Trash2 className="mr-1 h-4 w-4" />
                        Limpar
                      </Button>
                      <Button variant="link" size="sm" onClick={() => setIsOpen(false)}>
                        Continuar comprando
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function CartItemCard({
  item,
  onRemove,
  onUpdateQuantity,
  onSaveForLater,
  addItem,
}: {
  item: CartItem
  onRemove: () => void
  onUpdateQuantity: (quantity: number) => void
  onSaveForLater: () => void
  addItem: (item: any) => void
}) {
  // Extrair o preço numérico para cálculos
  const priceValue = Number.parseFloat(item.price.replace(/[^\d,]/g, "").replace(",", "."))
  const totalPrice = priceValue * item.quantity

  return (
    <div className="flex border rounded-lg p-3 relative hover:shadow-md transition-shadow">
      <div className="relative group">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={90}
          height={90}
          className="rounded-md object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-md" />
      </div>

      <div className="ml-3 flex-1">
        <div className="flex justify-between">
          <div>
            <h4 className="font-medium">{item.name}</h4>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-400 hover:text-gray-900 -mt-1 -mr-1"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-between items-end mt-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="text-right">
            <span className="font-semibold">{formatPrice(totalPrice)}</span>
            {item.quantity > 1 && <p className="text-xs text-gray-500">{item.price} cada</p>}
          </div>
        </div>

        <div className="mt-2 flex justify-end">
          <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={onSaveForLater}>
            Salvar para depois
          </Button>
        </div>
      </div>
    </div>
  )
}
