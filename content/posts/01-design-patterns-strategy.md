---
id: 1
title: "Design Patterns: Strategy"
labels: ["Design Patterns", "Arquitetura"]
image: /images/strategy.webp
url: https://www.linkedin.com/pulse/aumente-funcionalidade-do-seu-sistema-sem-se-com-padrão-s-pereira/
extracted: true
---

# Design Patterns: Strategy

Aumente a funcionalidade do seu sistema, sem se preocupar com a complexidade. O padrão Strategy funciona como um contrato que define "O QUE" será feito e não "COMO" será, e então deixa que o contexto define para você qual é a melhor implementação deste contrato.

"O conceito de estratégia, em grego strateegia, em latim strategi, em francês stratégie...".

Referências à parte, o conceito do design pattern strategy é simples, nossa funcionalidade é descrita através de um contrato, e esse contrato é implementado de acordo com a melhor opção de acordo com o contexto atual, basicamente através de padrão de design podemos separar a responsabilidade dos nossos sistemas, declarando uma interface comum de implementação e desenvolvendo implementações realmente especializadas em realizar a ação em determinados contexto, tudo isso trás as vantagens de termos um baixo acoplamento, uma fácil manutenção e uma rápida escalabilidade.

Imagine uma calculadora ela faz soma, subtração multiplicação e divisão, nesse contexto é muito comum (dentro do raciocínio orientado a objeto) desenvolvermos uma classe Calculator com os os métodos acima privados e uma função geral 'call' que a partir de um sinal (operador) determina qual dos métodos acima invocar, e até aí tudo bem…

Entretanto imagine que ao invés disso agora nossa calculadora, deverá implementar todas as operações binárias entre números inteiros, e só para exemplificar podemos falar da operação de percentual e da operação de exponenciação, nesse caso a cada funcionalidade inserida teríamos de modificar nossa implementação original o que na maior parte dos casos significa aumentar o acoplamento do sistema o que aumenta a sua complexidade, diminui a manutenibilidade, é normalmente não é isso que queremos, daí podemos utilizar o strategy.

Basicamente através do Strategy informamos para nossa aplicação um contrato que fornece ao seu consumidor a assinatura de que quando os dados de um tipo X forem informados, teremos em respostas os dados Y (geralmente isso acontece em uma interface ou classe abstrata) e é aí onde mora uma das maiores maravilhas, como deixamos que nossa dependência seja uma abstração, a implementação de fato pode nos ser dada via polimorfismo O que em outras palavras significa que a implementação pode ser variada, é além disso deve nos ser fornecida baseada no contexto.

ou seja a cada requisição a nossa funcionalidade avalia o contexto da operação atual, e com isso determina qual implementação é a mais apropriada para ser colocado no lugar no contrato.

Viu só como é fácil?

**Próximos passos?**

Agora imagine que se ao invés de uma simples calculadora nós estivéssemos lidando com aquele ser caso de uso legado, onde temos pelo menos 4 ou 5 variações de regras de negócio, e para cada um temos um if diferente, e em cada if uma regra de negócio gigante, imagine as vantagens de aplicar o padrão Strategy, imagine abstrair a parte genérica em um contrato - Nossa Estratégia, e para cada uma das variações da regra de negócio isola-la em uma classe, criar um analisador de contexto.

Se você chegou até aqui da uma olhada também no meu artigo sobre o padrão adapter — aposto que você vai gostar.

Qualquer coisa se tiver dúvidas, joga nos comentários ( :^ ] )
