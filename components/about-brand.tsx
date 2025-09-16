import Image from "next/image"

export default function AboutBrand() {
  return (
    <section id="sobre" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-amber-400 rounded-tl-lg z-0" />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gray-900 rounded-br-lg z-0" />
            <div className="relative z-10">
              <Image
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Nossa história"
                width={800}
                height={800}
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Nossa História</h2>
            <p className="text-gray-600 mb-6">
              Fundada em 2010, a <span className="font-semibold">ELEGANCE</span> nasceu da paixão por criar acessórios
              que transcendem tendências passageiras e se tornam parte da identidade de quem os usa.
            </p>
            <p className="text-gray-600 mb-6">
              Nossa missão é oferecer peças que combinam design contemporâneo, materiais premium e acabamento impecável,
              criando acessórios que são verdadeiras expressões de estilo e personalidade.
            </p>
            <p className="text-gray-600 mb-6">
              Cada item da nossa coleção é cuidadosamente desenvolvido por nossa equipe de designers talentosos, que
              buscam inspiração em arte, arquitetura e culturas ao redor do mundo para criar peças únicas e atemporais.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-500">12+</div>
                <p className="text-gray-600">Anos de experiência</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-500">200+</div>
                <p className="text-gray-600">Designs exclusivos</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-500">50k+</div>
                <p className="text-gray-600">Clientes satisfeitos</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-500">15</div>
                <p className="text-gray-600">Países atendidos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
