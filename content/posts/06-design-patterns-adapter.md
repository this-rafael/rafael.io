---
id: 6
title: "Design Patterns: Adapter"
labels: ["Design Patterns", "Arquitetura"]
image: /images/adapter.webp
url: https://www.linkedin.com/pulse/pare-de-ser-refém-das-dependências-diga-bem-vindo-ao-design-rafael/
extracted: true
---

# Pare de ser refém das dependências. Diga olá ao Design Pattern Adapter

Com o padrão Adapter, isolamos a regra de negócio de nossa dependência.

## Cenário Inicial

O cenário é: temos um Backend qualquer que executa as operações de um CRUD simples de usuário, criamos, editamos, recuperamos, e deletamos esse usuário através de simples endpoints na nossa API, armazenamos o resultado dessas operações em um banco qualquer, digamos MySql, e então fazemos nossa estrutura Controller -> Service -> Database, e até então todos os programadores estão muito felizes...

Até a equipe responsável por tomar as decisões decide: a partir da semana que vem temos que migrar nossos dados de MySql para Postgresql, e a partir daí "a casa cai" para o time de tecnologia, além das preocupações de pensar na reestruturação do banco eles vão ter que se preocupar em alterar todas as referências ao banco Mysql, desde a parte onde são executadas as inserções no banco, a parte que executa a conexão com o banco.

E na maioria das vezes este é o caso onde atrasamos as entregas, entregamos resultados com qualidade abaixo da desejada, não implementamos os testes apropriados, criamos bug's e etc.

Seria bom se fosse possível diminuir a dependência entre as partes que são responsáveis pelo negócio, das partes que são responsáveis por executar uma operação específica, no nosso caso executar operações no banco de dados, nesse caso temos o Adapter para nos ajudar a construir nosso sistema assim.

## Padrão Adapter

O Adapter funciona assim, temos um plugin/library/module/service/qualquer-código-de-terceiros, que faz alguma coisa que desejamos muito adicionar na nossa regra de negócio (no nosso caso salvar dados no banco de dados) então fazemos assim:

Primeiro definimos uma interface, que determina o contrato do que queremos fazer, e por sermos bons respeitadores do SOLID fazemos com que essa interface exponha apenas contratos (métodos) que realmente façam sentido para o contexto, e em seguida implementamos essa interface com classes que fazem a adaptação do código de terceiros.

Nesse caso criamos uma interface `CreateDatabaseCustomer` e por se tratar de um protocolo de comunicação com dependências de nível mais baixo vou renomear a interface para `CreateDatabaseCustomerProtocol` e essa interface expõe um método `create` que dado um input `CustomerInputEntity` e retornará um `SuccessfulEntityCreation`.

Daí então modificamos nossa estrutura, ao invés de `Controller -> Service -> Database` passaremos à: `Controller -> Service -> Protocols -> Plugin`.

Isso significa que nossa classe de serviço vai perder o conhecimento de como as operações de CRUD estão sendo mandadas para o banco, mas passará a ser composta pelos protocolos (interfaces) e sua implementação deverá ser-nos fornecida em tempo de execução (por exemplo via injeção de dependências) e então enquanto usarmos nosso Postgresql, implementamos os protocolos nos chamados Adapters (ou Connectors).

Então nossa interface `CreateDatabaseCustomerProtocol` será implementada pelo `CreateDatabaseCustomerPostgresqlAdapter` e pelo `CreateDatabaseCustomerMysqlAdapter` mas também poderia ser implementada pelo `CreateDatabaseCustomerMongoDBAdapter`, ou pelo `CreateDatabaseCustomerMockedAdapter`, e nosso serviço passaria a ser:

Para o nosso serviço isso significa que, tanto faz se esses bancos retornam os dados em json, xml, html, texto puro, proto-buffer se o formato está no correto para o nosso uso (e na maioria das vezes ele não está) mas sabemos que o nosso Adapter fará essa tradução.

## Quais Vantagens

- **Facilita a manutenção**: Qualquer plugin pode ser substituído.
- **Simplifica testes**: Se precisamos testar a regra de negócio, puramente, podemos substituir o adapter real por um adapter mocked que implementa o mesmo protocolo.
- **Limpa o código**: Dividimos as responsabilidades, não poluímos a visualização da nossa regra de negócio com código específico de um plugin.

## Próximos passos?

Imagine "aquele" frontend js que tem umas 100 bibliotecas que usadas para os mais diversos fins, tente identificar dessas bibliotecas quais funcionalidades você realmente usa (eu aposto com você que você não usa 100% dessas 100 bibliotecas). Quando fizer isso tente implementar um protocolo para uma funcionalidade específica digamos: converter real em dólar — descrevemos o contrato (e aqui você deve se lembrar de tratar tanto os objetos de entrada da função quantos os de saída) e em seguida implementamos nosso adapter com que tem dependência com a nossa biblioteca, e assim por diante. ;-)

Enfim, eu fico por aqui, se tiver uma dúvida ou sugestão joga aí nos comentários :-D
