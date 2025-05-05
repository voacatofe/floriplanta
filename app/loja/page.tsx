import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ShoppingBag, Star, Shirt, Coffee, Package, Info, CreditCard, Truck, RotateCcw, HelpCircle } from 'lucide-react'; // Icons

// Placeholder data for products - Replace with actual data later
const featuredProducts = [
  {
    slug: "camiseta-logo-floriplanta",
    name: "Camiseta Logo Floriplanta",
    image: "/images/placeholder-merch-1.jpg", // Replace with actual image
    price: "R$ 69,90",
    category: "Camisetas"
  },
  {
    slug: "caneca-cultivando-esperanca",
    name: "Caneca Cultivando Esperança",
    image: "/images/placeholder-merch-2.jpg", // Replace with actual image
    price: "R$ 45,00",
    category: "Canecas e Copos"
  },
  {
    slug: "ecobag-floriplanta",
    name: "Ecobag Floriplanta",
    image: "/images/placeholder-merch-3.jpg", // Replace with actual image
    price: "R$ 35,00",
    category: "Acessórios"
  },
];

const categories = [
  { name: "Camisetas", slug: "camisetas", icon: Shirt },
  { name: "Canecas e Copos", slug: "canecas-copos", icon: Coffee },
  { name: "Acessórios", slug: "acessorios", icon: Package },
  // Add more categories as needed
];

export default function LojaPage() {
  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      <Header />

      {/* Page Header */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-gradient-to-b from-white to-brand-light-green/20">
        <div className="container mx-auto px-4 text-center">
          <ShoppingBag className="w-10 h-10 text-brand-purple mx-auto mb-4" />
          <h1 className="font-futuru font-bold text-brand-purple text-4xl lg:text-5xl mb-4">Loja Floriplanta</h1>
          <p className="font-inter text-brand-purple/85 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto mb-6">
            Vista a Causa, Apoie a Associação!
          </p>
          <p className="font-inter text-brand-purple/80 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            Aqui você encontra produtos exclusivos da Floriplanta. Cada item adquirido é uma forma de divulgar a importância da cannabis medicinal e de contribuir diretamente para a manutenção das nossas atividades.
          </p>
          <p className="font-inter font-semibold text-green-700 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mt-4 bg-green-100/50 border border-green-200 p-3 rounded-md inline-block">
            Todo o lucro obtido com a venda destes produtos é revertido para a associação.
          </p>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 lg:py-20 bg-[#f8f5f0]">
        <div className="container mx-auto px-4">
          <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-10 text-center flex items-center justify-center"><Star className="w-8 h-8 mr-3 text-yellow-500"/>Produtos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.slug} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100 group">
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    layout="fill" 
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-xs font-medium text-brand-hover-purple mb-1 uppercase tracking-wider">{product.category}</span>
                  <h3 className="font-futuru font-semibold text-brand-purple text-lg mb-2 flex-grow">
                    <Link href={`/loja/produto/${product.slug}`} className="hover:text-brand-hover-purple transition-colors">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="font-inter font-bold text-brand-purple text-xl mb-4">{product.price}</p>
                  <Link 
                    href={`/loja/produto/${product.slug}`} 
                    className="mt-auto block text-center bg-brand-purple text-white px-4 py-2 rounded-lg font-inter text-sm font-medium hover:bg-brand-hover-purple transition-colors duration-300"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-10 text-center">Explore por Categoria</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {categories.map((category) => (
              <Link 
                key={category.slug} 
                href={`/loja/categoria/${category.slug}`} 
                className="block bg-brand-light-green/30 p-6 rounded-xl border border-brand-light-green hover:bg-brand-light-green/50 transition-colors duration-300 text-center group"
              >
                <category.icon className="w-10 h-10 text-brand-purple mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-futuru font-semibold text-brand-purple text-xl">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 lg:py-20 bg-[#f8f5f0]">
        <div className="container mx-auto px-4">
          <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-10 text-center flex items-center justify-center"><Info className="w-8 h-8 mr-3"/>Informações Importantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <CreditCard className="w-8 h-8 text-brand-purple mx-auto mb-3" />
              <h3 className="font-futuru font-semibold text-brand-purple text-lg mb-2">Pagamento Seguro</h3>
              <p className="font-inter text-brand-purple/80 text-sm">Aceitamos PIX, Boleto e Cartão via plataforma segura.</p>
              {/* <Link href="/loja/pagamento" className="text-xs text-brand-hover-purple hover:underline mt-2 inline-block">Saiba mais</Link> */}
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <Truck className="w-8 h-8 text-brand-purple mx-auto mb-3" />
              <h3 className="font-futuru font-semibold text-brand-purple text-lg mb-2">Envio para Todo Brasil</h3>
              <p className="font-inter text-brand-purple/80 text-sm">Consulte prazos e valores de frete no checkout.</p>
              {/* <Link href="/loja/envio" className="text-xs text-brand-hover-purple hover:underline mt-2 inline-block">Saiba mais</Link> */}
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <RotateCcw className="w-8 h-8 text-brand-purple mx-auto mb-3" />
              <h3 className="font-futuru font-semibold text-brand-purple text-lg mb-2">Trocas e Devoluções</h3>
              <p className="font-inter text-brand-purple/80 text-sm">Consulte nossa política para trocas e devoluções.</p>
              {/* <Link href="/loja/trocas" className="text-xs text-brand-hover-purple hover:underline mt-2 inline-block">Saiba mais</Link> */}
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
              <HelpCircle className="w-8 h-8 text-brand-purple mx-auto mb-3" />
              <h3 className="font-futuru font-semibold text-brand-purple text-lg mb-2">Dúvidas?</h3>
              <p className="font-inter text-brand-purple/80 text-sm">Entre em contato conosco pela página de contato.</p>
              <Link href="/contato" className="text-xs text-brand-hover-purple hover:underline mt-2 inline-block">Fale Conosco</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

