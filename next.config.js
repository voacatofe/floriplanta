/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para produção
  output: 'standalone',
  // Mantém imagens não otimizadas para compatibilidade
  images: {
    unoptimized: true
  }
}

export default nextConfig; 