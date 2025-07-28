/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração para produção
  output: 'standalone',
  // Mantém imagens não otimizadas para compatibilidade
  images: {
    unoptimized: true
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/:path*',
      },
    ];
  },
}

export default nextConfig;