# rafael.io

Portfólio pessoal de Rafael Pereira — Engenheiro de Software Sênior.

## Stack

- **Next.js** (static export / SSG)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (Radix UI)
- **Framer Motion** para animações
- **gray-matter** para parsing de posts em Markdown

## Estrutura

```
content/posts/      # Artigos em Markdown
public/             # Assets estáticos e imagens dos posts
src/
  app/              # Rotas Next.js (artigos, projetos, serviços, contato)
  components/       # Componentes de UI
  lib/              # Utilitários (leitura de posts, etc.)
scripts/            # Scripts auxiliares (extração de imagens, LinkedIn)
```

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

## Build

Gera saída estática em `dist/`:

```bash
pnpm build
```

## Scripts auxiliares

```bash
pnpm extract:images   # Extrai imagens referenciadas nos posts
```
