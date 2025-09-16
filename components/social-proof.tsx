import { Star } from "lucide-react"

export default function SocialProof() {
  return (
    <section className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="ml-2 text-gray-700 font-medium">4.9/5 (2.3k+ avaliações)</span>
          </div>

          <div className="h-8 border-l border-gray-300 hidden md:block" />

          <div className="text-gray-700 font-medium">Mais de 50.000 clientes satisfeitos</div>

          <div className="h-8 border-l border-gray-300 hidden md:block" />

          <div className="text-gray-700 font-medium">Envio gratuito em compras acima de R$300</div>
        </div>
      </div>
    </section>
  )
}
