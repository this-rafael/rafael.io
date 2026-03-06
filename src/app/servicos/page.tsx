"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Send, LayoutPanelLeft, Zap, RefreshCw, Code2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FooterSection from "@/components/FooterSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const SERVICES = [
  {
    icon: LayoutPanelLeft,
    title: "Arquitetura de Sistemas",
    tag: "DESIGN",
    description:
      "Projeto de microsserviços, definição de domínios, escolha de padrões (DDD, CQRS, Event Sourcing) e decisões de infraestrutura. Do zero ou revisão de arquitetura existente.",
  },
  {
    icon: Zap,
    title: "Otimização de Performance",
    tag: "ANÁLISE",
    description:
      "Investigação de gargalos, tuning de banco de dados, otimização de queries N+1, caching estratégico e redução de latência ponta a ponta.",
  },
  {
    icon: RefreshCw,
    title: "Modernização de Legado",
    tag: "MIGRAÇÃO",
    description:
      "Estratégias incrementais de re-escrita, strangler fig pattern, migração de monolitos para serviços e eliminação de dependências críticas.",
  },
  {
    icon: Code2,
    title: "Desenvolvimento Backend",
    tag: "EXECUÇÃO",
    description:
      "APIs REST e GraphQL, workers e filas com BullMQ/Kafka, integrações com provedores externos e automações com Node.js, NestJS ou Golang.",
  },
];

const COMPANIES = [
  "MaxMilhas",
  "South System",
  "Flapper",
  "Átomos",
  "Infosistemas",
];

const formSchema = z.object({
  name: z.string().min(3, {
    message: "O nome deve ter pelo menos 3 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, informe um email válido.",
  }),
  phone: z.string().min(10, {
    message: "Por favor, informe um telefone válido.",
  }),
  serviceType: z.string({
    required_error: "Por favor, selecione um tipo de serviço.",
  }),
  description: z.string().min(20, {
    message: "A descrição deve ter pelo menos 20 caracteres.",
  }),
  deadline: z.string().optional(),
  budget: z.string().optional(),
});

export default function RequestAnService() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      description: "",
      deadline: "",
      budget: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Formatar a mensagem para o WhatsApp
    const message = `Olá, gostaria de solicitar um serviço:
*Nome/Empresa*: ${values.name}
*Email*: ${values.email}
*Telefone*: ${values.phone}
*Tipo de Serviço*: ${values.serviceType}
*Descrição*: ${values.description}
${values.deadline ? `*Prazo desejado*: ${values.deadline}` : ""}
${values.budget ? `*Orçamento estimado*: ${values.budget}` : ""}`;

    // Número do WhatsApp - substitua pelo seu número
    const phoneNumber = "5583981188111"; // Substitua pelo seu número com DDD

    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(message);

    // Criar a URL do WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Abrir o WhatsApp em uma nova janela
    window.open(whatsappUrl, "_blank");
  }

  return (
    <div className="min-h-screen text-portfolio-light flex flex-col">
      <main className="flex-grow">
        {/* ── Hero ── */}
        <section
          id="servicos-hero"
          className="w-full pt-28 pb-16 px-6 text-center"
        >
          <div className="max-w-3xl mx-auto space-y-5">
            <span className="inline-block text-xs font-semibold tracking-widest text-portfolio-accent/80 border border-portfolio-accent/30 px-3 py-1 rounded-full bg-portfolio-accent/5">
              OPEN FOR WORK · PROJETOS & CONTRATOS
            </span>
            <h1 className="text-4xl md:text-5xl font-syne font-bold leading-tight">
              Engenharia de software{" "}
              <span className="text-gradient-primary">
                com foco em resultado
              </span>
            </h1>
            <p className="text-portfolio-light/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Ajudo times e empresas a construir sistemas que escalam, migrar
              legados que travam e extrair performance onde antes havia
              gargalos.
            </p>
          </div>
        </section>

        {/* ── Service Grid ── */}
        <section id="o-que-ofeco" className="w-full py-12 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SERVICES.map(({ icon: Icon, title, description, tag }) => (
              <div
                key={title}
                className="card p-6 flex gap-4 hover:border-portfolio-accent/40 hover:shadow-[0_0_24px_rgba(10,132,255,0.15)] transition-all duration-300"
              >
                <span className="shrink-0 w-10 h-10 rounded-lg bg-portfolio-accent/10 flex items-center justify-center mt-0.5">
                  <Icon size={20} className="text-portfolio-accent" />
                </span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-portfolio-light">
                      {title}
                    </h3>
                    <span className="text-[10px] font-bold tracking-widest text-portfolio-secondary border border-portfolio-secondary/30 px-1.5 py-0.5 rounded-full">
                      {tag}
                    </span>
                  </div>
                  <p className="text-xs text-portfolio-light/60 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Social Proof ── */}
        <section id="prova-social" className="w-full py-10 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-center text-xs font-semibold tracking-widest text-portfolio-light/30 mb-6 uppercase">
              Já trabalhei com
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              {COMPANIES.map((name) => (
                <span
                  key={name}
                  className="text-sm font-medium text-portfolio-light/40 hover:text-portfolio-light/70 transition-colors duration-200"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact Form ── */}
        <section id="solicitar" className="w-full py-12 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="card border border-portfolio-light/10 rounded-lg p-8">
              <h2 className="text-2xl md:text-3xl font-syne font-bold mb-3 text-center">
                Solicitar proposta
              </h2>
              <p className="text-portfolio-light/60 text-center text-sm mb-8">
                Preencha os detalhes abaixo. Você será redirecionado para o
                WhatsApp para finalizar o contato.
              </p>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome/Empresa</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Seu nome ou nome da empresa"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="seuemail@exemplo.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input placeholder="(00) 00000-0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Serviço</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="text-black">
                              <SelectValue placeholder="Selecione um tipo de serviço" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="desenvolvimento-web">
                              Desenvolvimento de Sites
                            </SelectItem>
                            <SelectItem value="desenvolvimento-backend">
                              Desenvolvimento Sistemas
                            </SelectItem>
                            <SelectItem value="arquitetura-software">
                              Arquitetura de Software
                            </SelectItem>
                            <SelectItem value="consultoria">
                              Consultoria Técnica
                            </SelectItem>
                            <SelectItem value="performance">
                              Otimização de Performance
                            </SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Selecione a categoria que melhor descreve o seu
                          projeto.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Descreva o serviço que você precisa em detalhes..."
                            className="resize-y min-h-[120px] text-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="deadline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prazo Desejado (opcional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ex: 2 meses"
                              className="text-black"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Orçamento Estimado (opcional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ex: R$ 1.000"
                              className="text-black"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-portfolio-accent to-portfolio-secondary text-white font-semibold py-2 px-4 hover:shadow-[0_0_24px_rgba(10,132,255,0.4)] transition-all duration-300"
                  >
                    <Send className="mr-2 h-4 w-4" /> Enviar via WhatsApp
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
