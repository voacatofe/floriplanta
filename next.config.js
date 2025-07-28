/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para produção
  output: 'standalone',
  // Mantém imagens não otimizadas para compatibilidade
  images: {
    unoptimized: true
  },
  // Disable ESLint during build to avoid configuration issues
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig;