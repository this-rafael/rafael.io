"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Send } from "lucide-react";
import { Header } from "@/components/Header";
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
    <div className="min-h-screen bg-portfolio-dark text-portfolio-light flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="w-full py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="card bg-portfolio-dark-lighter border border-portfolio-light/10 rounded-lg p-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-portfolio-accent">
                Solicitar Serviço
              </h1>

              <p className="text-portfolio-light/80 text-center mb-10">
                Preencha o formulário abaixo com os detalhes do serviço que você
                precisa. Após o envio, você será redirecionado para o WhatsApp
                para finalizar o contato.
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
                            <Input placeholder="rafael.@email.com" {...field} />
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
                    className="w-full bg-portfolio-accent hover:bg-portfolio-accent/80 text-black font-medium py-2 px-4"
                  >
                    <Send className="mr-2 h-4 w-4" /> Enviar Solicitação via
                    WhatsApp
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
        <FooterSection />
      </main>
    </div>
  );
}
