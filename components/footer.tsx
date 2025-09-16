import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-bold mb-4">ELEGANCE</h3>
            <p className="text-gray-600 mb-4">
              Acessórios premium que elevam seu estilo e expressam sua personalidade única.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Início
                </Link>
              </li>
              <li>
                <Link href="#masculino" className="text-gray-600 hover:text-gray-900">
                  Masculino
                </Link>
              </li>
              <li>
                <Link href="#feminino" className="text-gray-600 hover:text-gray-900">
                  Feminino
                </Link>
              </li>
              <li>
                <Link href="#colecoes" className="text-gray-600 hover:text-gray-900">
                  Coleções
                </Link>
              </li>
              <li>
                <Link href="#sobre" className="text-gray-600 hover:text-gray-900">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Ajuda</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Envio e Entrega
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Política de Devolução
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Termos e Condições
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Av. Paulista, 1000 - São Paulo, SP</li>
              <li>
                <Link href="tel:+551199999999" className="text-gray-600 hover:text-gray-900">
                  +55 11 9999-9999
                </Link>
              </li>
              <li>
                <Link href="mailto:contato@elegance.com" className="text-gray-600 hover:text-gray-900">
                  contato@elegance.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} ELEGANCE. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
