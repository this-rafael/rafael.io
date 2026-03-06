import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="bg-portfolio-dark border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold text-portfolio-accent mb-4 inline-block"
            >
              Rafael Pereira
            </Link>
            <p className="text-portfolio-light/70 max-w-md">
              Engenheiro de Software Senior especializado em arquitetura de
              sistemas escaláveis. Node.js, NestJS, Golang e AWS. Foco em
              performance, resiliência e código que dura.
            </p>

            <div className="flex space-x-4 mt-6">
              <a
                href="https://github.com/this-rafael"
                target="_blank"
                rel="noopener noreferrer"
                className="text-portfolio-light/60 hover:text-portfolio-accent transition-colors duration-300"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/this-rafael-pereira/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-portfolio-light/60 hover:text-portfolio-accent transition-colors duration-300"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>

              <a
                href="mailto:dev.rafaelsp@gmail.com"
                className="text-portfolio-light/60 hover:text-portfolio-accent transition-colors duration-300"
                aria-label="Email"
                title="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-portfolio-light/70 hover:text-portfolio-accent transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#skills"
                  className="text-portfolio-light/70 hover:text-portfolio-accent transition-colors duration-300"
                >
                  Stack Técnica
                </Link>
              </li>
              <li>
                <Link
                  href="/#articles"
                  className="text-portfolio-light/70 hover:text-portfolio-accent transition-colors duration-300"
                >
                  Artigos
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-portfolio-light/70 hover:text-portfolio-accent transition-colors duration-300"
                >
                  Sobre Mim
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-portfolio-light/70 hover:text-portfolio-accent transition-colors duration-300"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/servicos#o-que-ofeco"
                  className="text-portfolio-light/70 hover:text-portfolio-accent transition-colors duration-300"
                >
                  Consultoria Técnica
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos#o-que-ofeco"
                  className="text-portfolio-light/70 hover:text-portfolio-accent transition-colors duration-300"
                >
                  Desenvolvimento Backend
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos#o-que-ofeco"
                  className="text-portfolio-light/70 hover:text-portfolio-accent transition-colors duration-300"
                >
                  Arquitetura de Sistemas
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos#solicitar"
                  className="text-portfolio-light/70 hover:text-portfolio-accent transition-colors duration-300"
                >
                  Solicitar Proposta
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-portfolio-light/50">
            &copy; {new Date().getFullYear()} Rafael Pereira. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
