"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/context/cart-context"
import { ShoppingBag, Heart } from "lucide-react"
import { useState } from "react"

export default function ProductShowcase() {
  const { addItem, setIsOpen } = useCart()
  const [wishlist, setWishlist] = useState<number[]>([])

  const products = {
    masculino: [
      {
        id: 1,
        name: "Relógio Cronógrafo Premium",
        price: "R$ 1.299,00",
        image:
          "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        category: "Relógios",
      },
      {
        id: 2,
        name: "Pulseira de Couro Trançado",
        price: "R$ 289,00",
        image:
          "https://images.unsplash.com/photo-1618151313441-bc79b11e5090?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        category: "Pulseiras",
      },
      {
        id: 3,
        name: "Carteira Slim Executive",
        price: "R$ 349,00",
        image:
          "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        category: "Carteiras",
      },
      {
        id: 4,
        name: "Gravata Seda Premium",
        price: "R$ 199,00",
        image:
          "https://images.unsplash.com/photo-1598879445146-5a1d1f0cafb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        category: "Gravatas",
      },
    ],
    feminino: [
      {
        id: 5,
        name: "Colar Veneziano Ouro Rosé",
        price: "R$ 459,00",
        image:
          "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        category: "Colares",
      },
      {
        id: 6,
        name: "Brincos Cristal Swarovski",
        price: "R$ 389,00",
        image:
          "https://images.unsplash.com/photo-1630019852942-f89202989a59?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        category: "Brincos",
      },
      {
        id: 7,
        name: "Pulseira Charm Personalizada",
        price: "R$ 299,00",
        image:
          "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        category: "Pulseiras",
      },
      {
        id: 8,
        name: "Anel Ajustável Zircônia",
        price: "R$ 249,00",
        image:
          "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        category: "Anéis",
      },
    ],
  }

  const handleAddToCart = (product: any) => {
    addItem(product)
    setIsOpen(true)
    window.showToast(`${product.name} adicionado ao carrinho!`, "success")
  }

  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((itemId) => itemId !== id))
      window.showToast("Produto removido dos favoritos", "info")
    } else {
      setWishlist([...wishlist, id])
      window.showToast("Produto adicionado aos favoritos", "success")
    }
  }

  return (
    <section id="colecoes" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossa Coleção Exclusiva</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Acessórios cuidadosamente selecionados que combinam design contemporâneo, materiais premium e acabamento
            impecável para complementar seu estilo único.
          </p>
        </div>

        <Tabs defaultValue="masculino" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="masculino" id="masculino">
                Masculino
              </TabsTrigger>
              <TabsTrigger value="feminino" id="feminino">
                Feminino
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="masculino" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.masculino.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={600}
                      height={600}
                      className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        className="bg-white text-black hover:bg-gray-100"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                      <Button
                        variant="outline"
                        className={`border-white bg-white/80 ${wishlist.includes(product.id) ? "text-red-500" : "text-gray-700"} hover:bg-white`}
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-red-500" : ""}`} />
                      </Button>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-gray-500">{product.category}</span>
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <p className="font-semibold text-gray-900 mt-1">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="feminino" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.feminino.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={600}
                      height={600}
                      className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        className="bg-white text-black hover:bg-gray-100"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                      <Button
                        variant="outline"
                        className={`border-white bg-white/80 ${wishlist.includes(product.id) ? "text-red-500" : "text-gray-700"} hover:bg-white`}
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-red-500" : ""}`} />
                      </Button>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-gray-500">{product.category}</span>
                    <h3 className="font-medium text-lg">{product.name}</h3>
                    <p className="font-semibold text-gray-900 mt-1">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-lg">Ver Coleção Completa</Button>
        </div>
      </div>
    </section>
  )
}
