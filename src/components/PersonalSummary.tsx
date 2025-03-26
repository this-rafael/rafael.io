
import { User, Clock, Heart, Lightbulb } from "lucide-react";

export default function PersonalSummary() {
  return (
    <div id="about" className="w-full py-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Resumo Pessoal</h2>
      
      <div className="card max-w-4xl mx-auto p-6 md:p-8">
        <div className="space-y-6 text-portfolio-light/90">
          <p className="leading-relaxed">
            Sou uma pessoa movida por valores sólidos, como integridade, empatia e dedicação. 
            Acredito que a confiança e o respeito mútuo são a base de qualquer relação, seja pessoal ou profissional. 
            Busco sempre agir de forma ética e responsável, tomando decisões conscientes que refletem meus princípios.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="flex gap-3">
              <User className="text-portfolio-accent shrink-0 mt-1" size={22} />
              <div>
                <h3 className="text-lg font-medium mb-2">Valores Pessoais</h3>
                <p className="text-sm text-portfolio-light/80">
                  Para mim, a evolução pessoal é um processo constante. Valorizo o aprendizado contínuo, 
                  tanto em conhecimento técnico quanto no crescimento emocional e nas interações humanas.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Clock className="text-portfolio-accent shrink-0 mt-1" size={22} />
              <div>
                <h3 className="text-lg font-medium mb-2">Disciplina e Equilíbrio</h3>
                <p className="text-sm text-portfolio-light/80">
                  A disciplina é algo que prezo muito, especialmente vivendo uma rotina cheia de responsabilidades. 
                  No entanto, acredito que o equilíbrio é fundamental.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Lightbulb className="text-portfolio-accent shrink-0 mt-1" size={22} />
              <div>
                <h3 className="text-lg font-medium mb-2">Criatividade</h3>
                <p className="text-sm text-portfolio-light/80">
                  Sou apaixonado por desafios e por encontrar soluções criativas e simples para problemas complexos. 
                  Acredito que a inovação surge da combinação de conhecimento diversificado e pensamento crítico.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Heart className="text-portfolio-accent shrink-0 mt-1" size={22} />
              <div>
                <h3 className="text-lg font-medium mb-2">Ambiente</h3>
                <p className="text-sm text-portfolio-light/80">
                  Gosto de estar cercado por pessoas com valores semelhantes e que me inspiram a ser uma versão melhor de mim mesmo.
                  Acredito no poder da colaboração e do trabalho em equipe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
