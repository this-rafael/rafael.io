import FooterSection from "@/components/FooterSection";
import { Github, Linkedin, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <div className="min-h-screen bg-portfolio-dark text-portfolio-light">
      <main className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Entre em Contato
            </h1>
            <p className="text-portfolio-light/70 max-w-2xl mx-auto">
              Estou sempre aberto a novas oportunidades, parcerias e discussões
              técnicas. Sinta-se à vontade para entrar em contato comigo através
              de qualquer um dos canais abaixo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-portfolio-dark-secondary rounded-xl p-8 border border-white/10 hover:border-portfolio-accent/50 transition-all duration-300">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6">
                  Informações de Contato
                </h2>

                <div className="flex items-start gap-4">
                  <Mail
                    className="text-portfolio-accent shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <a
                      href="mailto:dev.rafaelsp@gmail.com"
                      className="text-portfolio-light/70 hover:text-portfolio-accent transition-colors duration-300"
                    >
                      dev.rafaelsp@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Linkedin
                    className="text-portfolio-accent shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <h3 className="font-medium mb-1">LinkedIn</h3>
                    <a
                      href="https://www.linkedin.com/in/this-rafael-pereira/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portfolio-light/70 hover:text-portfolio-accent transition-colors duration-300"
                    >
                      linkedin.com/in/this-rafael-pereira
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Github
                    className="text-portfolio-accent shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <h3 className="font-medium mb-1">GitHub</h3>
                    <a
                      href="https://github.com/this-rafael"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portfolio-light/70 hover:text-portfolio-accent transition-colors duration-300"
                    >
                      github.com/this-rafael
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MessageSquare
                    className="text-portfolio-accent shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <h3 className="font-medium mb-1">WhatsApp</h3>
                    <a
                      href="https://wa.me/5583981188111"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portfolio-light/70 hover:text-portfolio-accent transition-colors duration-300"
                    >
                      +55 (83) 98118-8111
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-portfolio-dark-secondary rounded-xl p-8 border border-white/10">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-portfolio-dark border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-portfolio-accent/50"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-portfolio-dark border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-portfolio-accent/50"
                    placeholder="Seu email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-portfolio-dark border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-portfolio-accent/50"
                    placeholder="Como posso ajudar?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-portfolio-accent text-portfolio-dark font-medium py-3 px-6 rounded-lg hover:bg-portfolio-accent/90 transition-colors duration-300"
                >
                  Enviar mensagem
                </button>
              </form>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Ou volte para</h2>
            <div className="flex justify-center space-x-4">
              <Link
                href="/"
                className="px-6 py-3 bg-portfolio-dark-secondary border border-white/10 rounded-lg hover:border-portfolio-accent/50 transition-all duration-300"
              >
                Home
              </Link>
              <Link
                href="/artigos"
                className="px-6 py-3 bg-portfolio-dark-secondary border border-white/10 rounded-lg hover:border-portfolio-accent/50 transition-all duration-300"
              >
                Artigos
              </Link>
              <Link
                href="/projetos"
                className="px-6 py-3 bg-portfolio-dark-secondary border border-white/10 rounded-lg hover:border-portfolio-accent/50 transition-all duration-300"
              >
                Projetos
              </Link>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
