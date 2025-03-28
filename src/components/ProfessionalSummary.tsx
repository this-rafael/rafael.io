import Image from "next/image";
import { Download } from "lucide-react";

export default function ProfessionalSummary() {
  return (
    <div id="experience" className="w-full py-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Experiência Profissional
      </h2>

      <div className="card max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="md:col-span-1">
          <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
            <Image
              fill
              src="/images/profile.jpeg"
              alt="Rafael Pereira"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-portfolio-dark/70 to-transparent" />
          </div>

          <a
            href="/Rafael_Pereira.pdf"
            className="button-primary w-full flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Veja meu currículo
          </a>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-portfolio-accent">
              Atomos
            </h3>
            <p className="text-sm text-portfolio-light/90">
              Na Atomoss, lidero a arquitetura e o desenvolvimento de sistemas
              avançados para gestão de leads e clientes, com foco em performance
              e escalabilidade. Coordeno integrações complexas com CRMs
              utilizando Node.js e TypeScript, otimizando processos e reduzindo
              o tempo de resposta dos serviços em 53%. Também melhoro o SLA de
              processos de comissão em 97%, garantindo eficiência operacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-portfolio-accent">
                Flapper
              </h3>
              <ul className="text-sm text-portfolio-light/90 list-disc pl-5 space-y-1">
                <li>Otimização de APIs para alta performance.</li>
                <li>Integração de serviços complexos com eficiência.</li>
                <li>Redução de tempos de resposta em sistemas críticos.</li>
                <li>Garantia de estabilidade e qualidade técnica.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-portfolio-accent">
                Southsystem/Quiq
              </h3>
              <ul className="text-sm text-portfolio-light/90 list-disc pl-5 space-y-1">
                <li>
                  Redução de custos operacionais com integração de sistemas.
                </li>
                <li>Aumento da escalabilidade com microserviços robustos.</li>
                <li>Melhoria na eficiência com otimização de processos.</li>
                <li>
                  Maior qualidade técnica com aplicação de Clean Architecture.
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-portfolio-accent">
                Maxmilhas
              </h3>
              <ul className="text-sm text-portfolio-light/90 list-disc pl-5 space-y-1">
                <li>Maior estabilidade e desempenho em sistemas legados.</li>
                <li>Integrações otimizadas com parceiros externos.</li>
                <li>Redução de erros operacionais em processos críticos.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-portfolio-accent">
                Sustentec
              </h3>
              <ul className="text-sm text-portfolio-light/90 list-disc pl-5 space-y-1">
                <li>
                  Automatização de fluxos para maior eficiência operacional.
                </li>
                <li>Evolução de um sistema java legado.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
