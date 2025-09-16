import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Acessórios elegantes"
          width={1920}
          height={1080}
          className="object-cover w-full h-full brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-32 md:py-48 lg:py-56">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Acessórios que definem seu <span className="text-amber-400">estilo único</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
            Descubra nossa coleção exclusiva de acessórios premium para homens e mulheres que valorizam elegância,
            qualidade e sofisticação em cada detalhe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-amber-500 hover:bg-amber-600 text-black font-medium text-lg px-8 py-6">
              Explorar Coleção
            </Button>
            <Button variant="outline" className="border-white text-black hover:bg-white/10 text-lg px-8 py-6">
              Conheça Nossa História
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
