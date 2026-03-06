/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Habilita exportação estática (SSG)
  distDir: "dist", // Mesmo diretório de saída do Vite
  images: {
    unoptimized: true, 
  },
  // Se você tiver múltiplos domínios para imagens, configure:
  // images: {
  //   domains: ['exemplo.com'],
  // },
  reactStrictMode: true,
};

export default nextConfig;
