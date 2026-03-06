import type { Metadata } from "next";
import StaticPostLayout from "@/components/posts/StaticPostLayout";
import type { StaticPostMeta } from "@/components/posts/StaticPostLayout";
import PostImage from "@/components/posts/PostImage";
import CodeBlock from "@/components/posts/CodeBlock";

const meta: StaticPostMeta = {
  id: 3,
  title: "Clean Architecture na Prática",
  slug: "clean-architecture-na-pratica",
  description:
    "Chega de teoria e vamos pro código! Neste artigo explico detalhadamente as camadas Entities, Usecases, Protocols, Repositories, Services e Controllers na prática usando TypeScript e conceitos sólidos de Clean Architecture.",
  labels: ["Arquitetura", "Node.js", "Clean Architecture"],
  image: "/images/Cleanarch.webp",
  url: "https://www.linkedin.com/posts/activity-7278788939790696449-Y_14/?utm_source=share&utm_medium=member_desktop",
  readingTime: 18,
};

export const metadata: Metadata = {
  title: `${meta.title} — Rafael Pereira`,
  description: meta.description,
  openGraph: {
    title: `${meta.title} — Rafael Pereira`,
    description: meta.description,
    type: "article",
    url: `https://rafael.io/artigos/${meta.slug}`,
    images: [
      {
        url: `https://rafael.io${meta.image}`,
        width: 1200,
        height: 630,
        alt: meta.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${meta.title} — Rafael Pereira`,
    description: meta.description,
    images: [`https://rafael.io${meta.image}`],
  },
};

export default function CleanArchitecturePage() {
  return (
    <StaticPostLayout meta={meta}>
      <PostImage
        src="/posts/images/texto/03-clean-arch-slide-01.jpg"
        alt="Clean Architecture na Prática"
        portrait
      />

      <h2>Problematização</h2>
      <p>
        O desenvolvimento de software é um processo complexo e contínuo, que
        envolve muitas etapas e que frequentemente passa por mudanças. Graças a
        isso é um processo que nunca termina, e é por isso que a aplicação de
        uma arquitetura ruim pode ocasionar uma série de problemas. Uma
        arquitetura inadequada pode levar a problemas com a manutenção do
        software, dificuldade de adição de novas funcionalidades, instabilidade
        e baixa qualidade do software. Além disso, uma arquitetura ruim pode
        tornar difícil a tarefa de realizar testes e correção de bugs. Portanto,
        é fundamental que os desenvolvedores invistam tempo e esforço para
        planejar e manter uma arquitetura sólida para garantir a evolução do
        software de forma suave.
      </p>

      <h2>Um pouco de história</h2>
      <p>
        A Clean Architecture é um conceito de arquitetura de software criado por
        Robert C. Martin, mais conhecido como Uncle Bob, publicado em 2012 no
        livro{" "}
        <em>
          "Clean Architecture: A Craftsman's Guide to Software Structure and
          Design"
        </em>
        . Na abordagem proposta por Uncle Bob, a solução busca fugir da
        complexidade e rigidez das arquiteturas tradicionais. Ao invés disso,
        ele propõe uma arquitetura flexível que pode ser facilmente adaptada
        para atender as necessidades do negócio. Esse conceito foi baseado em
        uma série de experiências de Uncle Bob com projetos de software, e foi
        inspirado em conceitos de arquitetura de software como o DDD (Domain
        Driven Design) e o SOLID, além de outras arquiteturas como a Onion
        Architecture e a Hexagonal Architecture.
      </p>

      <h2>Proposta Geral</h2>
      <p>
        A Clean Architecture é um conceito de como estruturar um projeto de
        software, separando-o em camadas que possuem responsabilidades e
        restrições específicas. O seguinte artigo propõe apresentar uma visão
        sobre essa arquitetura e simplificar a estruturação do sistema,
        demonstrando assim uma derivação da arquitetura limpa para projetos de
        back-end em TypeScript.
      </p>
      <p>
        A proposta geral é dividir o sistema em pelo menos três camadas
        principais: <strong>Core</strong>, <strong>Adapters</strong> e{" "}
        <strong>Infra</strong>.
      </p>
      <ul>
        <li>
          A camada <strong>Core</strong> é a mais interna e é responsável por
          lidar com a regra de negócio e com as representações das entidades do
          domínio.
        </li>
        <li>
          A camada <strong>Infra</strong> é responsável por lidar especificamente
          com conexões com dependências externas — repositórios que se conectam
          ao banco de dados, controladores que recebem requisições REST, módulos
          de configuração de dependências, entre outros.
        </li>
        <li>
          Por fim, a camada <strong>Adapter</strong> intermedia as requisições
          feitas de ambos os lados. Por exemplo, quando uma requisição de um
          controller implica em uma execução de uma regra de negócio, ela deverá
          passar por um membro da camada Adapter (como um serviço). Quando uma
          regra de negócio deve executar uma ação no banco de dados, ela não deve
          acessar diretamente o banco, mas sim passar por uma camada de abstração
          da camada Adapter, que por sua vez será capaz de lidar com um membro da
          Infra.
        </li>
      </ul>

      <PostImage
        src="/posts/images/diagrama/03-clean-arch-slide-03.jpg"
        alt="O gráfico original da Clean Architecture evidenciando a Regra de Dependência"
        caption="A regra de dependência: As camadas internas não devem saber nada sobre as camadas externas."
        portrait
      />

      <p>
        A utilização de uma arquitetura limpa apresenta diversos benefícios: a
        separação do sistema em camadas com responsabilidades bem definidas
        facilita o entendimento e, consequentemente, a manutenção. Além disso,
        ela garante flexibilidade e adaptabilidade, tornando o projeto escalável
        e preparado para mudanças. Por fim, ela garante que o sistema seja
        facilmente testável, já que cada camada possui responsabilidades bem
        definidas que podem ser testadas de forma isolada.
      </p>

      <h2>Guia de Camadas</h2>
      <p>
        Para descrever estritamente cada uma das camadas da proposta de
        arquitetura, vamos considerar um simples caso de uso de um CRUD de
        usuários utilizando requisições REST HTTP e o framework NestJS. Os
        "detalhes" da instalação de cada uma das dependências serão omitidos
        uma vez que não são o foco.
      </p>

      <h2>Core — Camada de Domínio</h2>
      <p>
        Essa camada é uma aglutinação das camadas <em>domain</em> e{" "}
        <em>entities</em> da proposta inicial da arquitetura limpa. Como elas
        estão estreitamente acopladas — uma consome especificamente todos os
        dados da outra — são tratadas unicamente como <strong>Core</strong>,
        que é o núcleo. Essa camada interna representa tudo que a regra de
        negócio é: é nela que serão descritas as funcionalidades do sistema,
        bem como as entidades que representam o domínio do problema da nossa
        aplicação.
      </p>

      <h3>Entities</h3>
      <p>
        Para o nosso exemplo, consideraremos a entidade principal "Usuário" — um
        objeto com nome e ID. Ele será uma classe criada dentro de uma subcamada
        do Core chamada <strong>Entities</strong>, que existe para guardar
        classes/interfaces que representam puramente objetos do domínio.
      </p>

      <CodeBlock>
        <code className="language-typescript">
          {`// core/entities/UserEntity.ts
export interface UserEntityProps {
  id?: string;
  name: string;
}

export class UserEntity {
  constructor(private readonly props: UserEntityProps) {}

  get id(): string {
    return this.props.id ?? '';
  }

  get name(): string {
    return this.props.name;
  }
}`}
        </code>
      </CodeBlock>

      <p>
        A classe representa o usuário recebendo como parâmetro uma interface que
        representa os atributos do usuário. Dentro da classe temos as ações
        básicas dessa entidade, que são basicamente os métodos <em>gets</em>.
        Essa classe segue bem o princípio SOLID, já que representa uma entidade
        da regra de negócio e depende de uma interface que pode ser implementada
        por qualquer classe de transferência de dados, como um DTO.
      </p>

      <h3>Features &amp; Usecases</h3>
      <p>
        Com a entidade de usuários definida, pensamos agora nas funcionalidades
        que o sistema deve expor — nesse caso, um CRUD simples (criar, buscar,
        atualizar e remover usuários).
      </p>
      <p>
        Os membros da camada Core devem ao máximo seguir os princípios SOLID.
        Cada caso de uso (Usecase) deve implementar uma interface seguindo os
        princípios de Substituição de Liskov (L) e Aberto/Fechado (O). A
        interface deve ter apenas um único método público que reflete o objetivo
        da funcionalidade, respeitando a Segregação de Interfaces (I), fazendo
        com que o Usecase que o implementa tenha apenas uma única
        responsabilidade (S). Além disso, o Usecase não acessa diretamente o
        banco de dados, mas sim conhece uma interface (Protocolo) que determina
        o contrato para acessar o banco de dados (D — Inversão de Dependência).
      </p>
      <p>
        Em TypeScript, uma classe abstrata com apenas métodos abstratos pode ser
        implementada e tratada como interface. Isso é interessante porque uma
        interface se refere apenas a um tipo, enquanto uma classe abstrata se
        trata de uma definição de tipo e valor — na prática,{" "}
        <code>const createUserSymbol = CreateUser</code> é possível, o que é
        muito útil em um contexto de injeção de dependências.
      </p>

      <CodeBlock>
        <code className="language-typescript">
          {`// core/features/CreateUser.ts
export abstract class CreateUser {
  abstract execute(name: string): Promise<UserEntity>;
}

// core/usecases/CreateUserUsecase.ts
export class CreateUserUsecase implements CreateUser {
  constructor(
    private readonly createUserProtocol: CreateUserProtocol,
    private readonly getByNameProtocol: GetUserByNameProtocol,
  ) {}

  async execute(name: string): Promise<UserEntity> {
    const existsName = await this.getByNameProtocol.getByName(name);

    if (existsName) {
      throw new UserAlreadyExistsException(\`The name \${name} already exists\`);
    }

    return this.createUserProtocol.register(name);
  }
}`}
        </code>
      </CodeBlock>

      <p>
        Observe que o caso de uso dita apenas <strong>o que</strong> será feito
        (uma validação para o nome e o registro do usuário) e não
        necessariamente define <strong>como</strong> um usuário é buscado via
        nome ou onde é cadastrado. A vantagem disso é que a regra de negócio
        independe totalmente de bibliotecas, frameworks e banco de dados — o que
        torna a aplicação flexível.
      </p>
      <p>
        <strong>Cuidado!</strong> Em muitas situações é comum que um caso de uso
        apenas delegue informações para o protocolo e aguarde o retorno. Você
        deverá se questionar se o protocolo (ou melhor, a classe que o
        implementa) não está definindo a regra de negócio. Por exemplo, o
        <code>CreateUserUsecase</code> estaria incorretamente implementado se
        apenas delegasse a obrigação para a interface{" "}
        <code>CreateUserProtocol</code> sem fazer a validação (consultando o
        protocolo que busca usuário por nome) — ele não cumpriria a obrigação.
      </p>

      <h3>Exceptions</h3>
      <p>
        As exceções de regras de negócio também são membros da camada Core, uma
        vez que um fluxo inesperado da regra de negócio também é parte da regra.
        É importante para a manutenção do código que cada falha no sistema seja
        mapeada para uma exceção conhecida. Criamos uma classe base{" "}
        <code>IBaseException</code> que estende o{" "}
        <code>Error</code> nativo e adiciona um atributo extra: o código da
        exception (que futuramente será usado para determinar o HTTP status
        code).
      </p>

      <CodeBlock>
        <code className="language-typescript">
          {`// core/exceptions/IBaseException.ts
export abstract class IBaseException extends Error {
  code: number;

  constructor(message: string) {
    super(message);
  }
}

// core/exceptions/UserAlreadyExistsException.ts
export class UserAlreadyExistsException extends IBaseException {
  constructor(message?: string) {
    super(message);
    this.code = 400;
  }
}

// core/exceptions/UserNotExistsException.ts
export class UserNotExistsException extends IBaseException {
  constructor(message: string) {
    super(message);
    this.code = 404;
  }
}`}
        </code>
      </CodeBlock>

      <p>
        <strong>Importante:</strong> Note que o usecase pode "lançar" exceções,
        mas para ele é vetada a opção de tratar exceções. Se uma exceção tiver
        que ser mapeada de um tipo desconhecido para um tipo conhecido, esse
        tratamento deve ser feito em uma classe da camada Adapter ou Infra.
      </p>

      <h3>Protocols</h3>
      <p>
        No <code>CreateUserUsecase</code> vimos duas dependências:{" "}
        <code>CreateUserProtocol</code> e <code>GetUserByNameProtocol</code>.
        Cada uma dessas dependências trata-se de uma interface que define como
        um membro da camada Core pode acessar um dispositivo externo (lib,
        framework, etc.). É importante que cada Protocolo seja definido apenas
        com a intenção de prover à regra de negócio uma informação, ou que seja
        acionado apenas para disparar uma ação que DEVE acessar algo externo à
        regra de negócio. Um Protocolo <strong>NÃO DEVE</strong> ser criado para
        processar regra de negócio.
      </p>
      <p>
        Assim como as Features, é indicado que cada Protocolo possua apenas um
        método público.
      </p>

      <CodeBlock>
        <code className="language-typescript">
          {`// core/protocols/CreateUserProtocol.ts
export abstract class CreateUserProtocol {
  abstract register(name: string): Promise<UserEntity>;
}

// core/protocols/GetUserByNameProtocol.ts
export abstract class GetUserByNameProtocol {
  abstract getByName(name: string): Promise<UserEntity | null>;
}

// core/protocols/GetUserByIdProtocol.ts
export abstract class GetUserByIdProtocol {
  abstract getById(id: string): Promise<UserEntity>;
}

// core/protocols/UpdateUserProtocol.ts
export abstract class UpdateUserProtocol {
  abstract update(id: string, name: string): Promise<UserEntity>;
}

// core/protocols/DeleteUserProtocol.ts
export abstract class DeleteUserProtocol {
  abstract delete(id: string): Promise<void>;
}`}
        </code>
      </CodeBlock>

      <h2>Adapter — Camada de Adaptação</h2>
      <p>
        A camada de adaptação faz o controle bidirecional: tanto quando um
        módulo externo deseja utilizar alguma regra de negócio, quanto quando um
        caso de uso precisa se comunicar com o mundo exterior.
      </p>
      <p>
        Os adaptadores podem ser vistos como dois grupos distintos: os que são
        chamados pela camada Core (e que devem essencialmente implementar pelo
        menos um Protocolo) e os que são chamados pela camada de Infra (geralmente
        chamados de <em>services</em>).
      </p>

      <h3>Connectors, Handlers &amp; Repositories</h3>
      <p>
        De maneira geral, conectores, handlers e repositories são as classes que
        implementam os Protocolos. Cada um deles é responsável por adaptar
        apenas um dispositivo externo:
      </p>
      <ul>
        <li>
          <strong>Repositories:</strong> Quando se tratar de uma implementação
          de Protocolo que se conecta com um banco de dados.
        </li>
        <li>
          <strong>Connectors:</strong> Quando a implementação deve retornar
          dados, mas não se conecta com o banco de dados. Por exemplo, um
          client HTTP pode ser expresso como{" "}
          <code>ClientHttpFetchConnector</code> ou{" "}
          <code>ClientHttpAxiosConnector</code>.
        </li>
        <li>
          <strong>Handlers:</strong> Reservado para funções que apenas processam
          dados mas não retornam valores. Por exemplo, funções para disparar
          eventos em um tópico de processamento assíncrono (uma fila).
        </li>
      </ul>

      <CodeBlock>
        <code className="language-typescript">
          {`// adapters/repositories/UsersMockRepository.ts
export class UsersMockRepository
  implements
    GetUserByIdProtocol,
    GetUserByNameProtocol,
    CreateUserProtocol,
    UpdateUserProtocol,
    DeleteUserProtocol
{
  private db: DbConnector; // Poderia ser Prisma, Sequelize, TypeORM, etc.

  constructor() {
    this.db = mockDbConnector;
  }

  async getById(id: string): Promise<UserEntity> {
    return this.db.users.getById(id);
  }

  async getByName(name: string): Promise<UserEntity> {
    return this.db.users.getByName(name);
  }

  async register(name: string): Promise<UserEntity> {
    return this.db.users.register(name);
  }

  async update(id: string, name: string): Promise<UserEntity> {
    return this.db.users.update(id, name);
  }

  async delete(id: string): Promise<void> {
    return this.db.users.delete(id);
  }
}`}
        </code>
      </CodeBlock>

      <p>
        É importante notar que, por utilizar a inversão de dependências e a
        segregação de interfaces, as classes que usam o{" "}
        <code>UsersMockRepository</code> conhecem apenas o contrato das
        interfaces que o repositório implementa. Por exemplo, o{" "}
        <code>CreateUserUsecase</code> recebe em seu construtor duas instâncias
        de <code>UsersMockRepository</code> — uma tipada como{" "}
        <code>CreateUserProtocol</code> e outra como{" "}
        <code>GetUserByNameProtocol</code> — e não conhece a implementação
        concreta, o que torna a classe completamente desacoplada e substituível.
      </p>

      <h3>Services</h3>
      <p>
        Os serviços representam a adaptação de chamadas vindas da Infra para
        membros da camada de negócio. Por exemplo, quando se tem uma chamada
        REST para criar um usuário, o controller irá receber a requisição e
        chamar o serviço, que irá chamar o caso de uso, que por sua vez irá
        chamar o repositório que irá chamar o banco de dados. Da mesma forma
        seria se fosse um evento de uma fila (handler → service → usecase →
        repository) ou um Resolver GraphQL.
      </p>
      <p>
        Independente do meio de entrada, o serviço é responsável por receber a
        requisição, chamar o caso de uso e retornar a resposta para o meio de
        saída.
      </p>

      <CodeBlock>
        <code className="language-typescript">
          {`// adapters/services/UserService.ts
export class UserService {
  constructor(
    private createUserUsecase: CreateUser,
    private updateUserUsecase: UpdateUser,
    private deleteUserUsecase: DeleteUser,
    private getUserUsecase: GetUser,
  ) {}

  async getUser(id: string): Promise<UserEntity> {
    try {
      return this.getUserUsecase.execute(id);
    } catch (error) {
      console.error(error);
      throw RestError.fromBaseException(error);
    }
  }

  createUser(name: string): Promise<UserEntity> {
    try {
      return this.createUserUsecase.execute(name);
    } catch (error) {
      console.error(error);
      throw RestError.fromBaseException(error);
    }
  }

  updateUser(id: string, name: string): Promise<UserEntity> {
    try {
      return this.updateUserUsecase.execute(id, name);
    } catch (error) {
      console.error(error);
      throw RestError.fromBaseException(error);
    }
  }

  deleteUser(id: string): Promise<void> {
    try {
      return this.deleteUserUsecase.execute(id);
    } catch (error) {
      console.error(error);
      throw RestError.fromBaseException(error);
    }
  }
}`}
        </code>
      </CodeBlock>

      <p>
        Note que o serviço trata as exceções lançadas pelos usecases e as
        converte para um tipo <code>RestError</code>, que é uma exceção que
        representa um erro de negócio e que pode ser manipulada pelo controller
        para retornar uma resposta adequada ao cliente.
      </p>
      <p>
        <strong>Boa prática:</strong> Serviços são classes utilizadas apenas por
        membros da camada Infra e não são utilizadas por membros da camada de
        negócio. Além disso, cada serviço deve adaptar chamadas externas de um
        mesmo instrumento externo (lib, framework, etc.) para chamadas internas.
        Por exemplo, um service usado para adaptar chamadas de um controller
        Express não deve ser utilizado para adaptar chamadas de um handler ou
        resolver — entretanto, um middleware (que também utiliza Express) poderá
        acessar o mesmo service.
      </p>

      <h2>Infra — Camada de Infraestrutura</h2>
      <p>
        A camada de Infra contém tudo relacionado ao framework que está sendo
        utilizado: a configuração de um módulo para injeção de dependências,
        classes para receber/retornar informações do cliente, ou qualquer código
        boilerplate que não seja de negócio e não seja adaptador.
      </p>

      <h3>Controller e DTOs</h3>

      <CodeBlock>
        <code className="language-typescript">
          {`// infra/dtos/UserDto.ts
export class UserDto implements UserEntityProps {
  id?: string;
  name: string;

  constructor(props: UserEntityProps) {
    this.id = props.id;
    this.name = props.name;
  }
}

// infra/controllers/UserController.ts
@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserDto> {
    return this.service.getUser(id);
  }

  @Post()
  async createUser(@Body() user: UserDto): Promise<UserDto> {
    return this.service.createUser(user.name);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: UserDto,
  ): Promise<UserEntity> {
    return this.service.updateUser(id, user.name);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.service.deleteUser(id);
  }
}`}
        </code>
      </CodeBlock>

      <h3>Módulo NestJS</h3>
      <p>
        O módulo de configuração de dependências é onde toda a injeção de
        dependências é montada. Observe que as classes abstratas (Features e
        Protocols) são usadas como tokens de injeção, enquanto as implementações
        concretas (Usecases e Repositories) são fornecidas como{" "}
        <code>useClass</code>.
      </p>

      <CodeBlock>
        <code className="language-typescript">
          {`// infra/modules/UserModule.ts
@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: CreateUser, useClass: CreateUserUsecase },
    { provide: UpdateUser, useClass: UpdateUserUsecase },
    { provide: DeleteUser, useClass: DeleteUserUsecase },
    { provide: GetUser,    useClass: GetUserUsecase },
    { provide: CreateUserProtocol,     useClass: UserPrismaRepository },
    { provide: UpdateUserProtocol,     useClass: UserPrismaRepository },
    { provide: DeleteUserProtocol,     useClass: UserPrismaRepository },
    { provide: GetUserByNameProtocol,  useClass: UserPrismaRepository },
    { provide: GetUserByIdProtocol,    useClass: UserPrismaRepository },
  ],
})
export class UserModule {}`}
        </code>
      </CodeBlock>

      <h2>CRUD Completo — Usecases Restantes</h2>
      <p>
        Para finalizar a implementação, veja como ficam os usecases de busca,
        atualização e deleção de usuário:
      </p>

      <CodeBlock>
        <code className="language-typescript">
          {`// Busca de usuário
// core/features/GetUser.ts
export abstract class GetUser {
  abstract execute(id: string): Promise<UserEntity>;
}

// core/usecases/GetUserUsecase.ts
export class GetUserUsecase implements GetUser {
  constructor(private readonly getProtocol: GetUserByIdProtocol) {}

  async execute(id: string): Promise<UserEntity> {
    return this.getProtocol.getById(id);
  }
}

// Atualização de usuário
// core/features/UpdateUser.ts
export abstract class UpdateUser {
  abstract execute(id: string, name: string): Promise<UserEntity>;
}

// core/usecases/UpdateUserUsecase.ts
export class UpdateUserUsecase implements UpdateUser {
  constructor(
    private readonly updateProtocol: UpdateUserProtocol,
    private readonly getByIdProtocol: GetUserByIdProtocol,
  ) {}

  async execute(id: string, name: string): Promise<UserEntity> {
    const exists = await this.getByIdProtocol.getById(id);

    if (!exists) {
      throw new UserNotExistsException(\`User with id \${id} not exists\`);
    }

    return this.updateProtocol.update(id, name);
  }
}

// Deleção de usuário
// core/features/DeleteUser.ts
export abstract class DeleteUser {
  abstract execute(id: string): Promise<void>;
}

// core/usecases/DeleteUserUsecase.ts
export class DeleteUserUsecase implements DeleteUser {
  constructor(
    private readonly deleteProtocol: DeleteUserProtocol,
    private readonly getByIdProtocol: GetUserByIdProtocol,
  ) {}

  async execute(id: string): Promise<void> {
    const exists = await this.getByIdProtocol.getById(id);

    if (!exists) {
      throw new UserNotExistsException(\`User with id \${id} not exists\`);
    }

    return this.deleteProtocol.delete(id);
  }
}`}
        </code>
      </CodeBlock>

      <h2>Fluxo de Execução</h2>
      <p>
        No código mostrado acima, podemos ver que o controller (Infra) recebe
        uma requisição e chama o serviço (Adapter), que por sua vez chama os
        usecases (Core), que por sua vez acessam o repositório (Adapter), que
        por sua vez acessa o banco de dados (Infra).
      </p>
      <p>
        Claro que no fluxo há também a inversão de dependências: o repositório
        não é acessado diretamente pelo usecase, mas sim a interface que o
        repositório implementa (Protocol). E o usecase não é acessado
        diretamente pelo serviço, mas sim a interface que o usecase implementa
        (Feature).
      </p>

      <h2>Conclusão</h2>
      <p>
        A adoção da arquitetura limpa pode trazer inúmeras vantagens para um
        projeto, como a redução da complexidade e maior flexibilidade,
        escalabilidade e resiliência. Com a separação de funcionalidades em
        serviços independentes e com a comunicação entre eles por meio de
        interfaces padronizadas, torna-se mais fácil desenvolver, testar e
        implantar cada serviço individualmente, permitindo uma entrega mais
        rápida e frequente de novas funcionalidades.
      </p>
      <p>
        Além disso, a arquitetura limpa possibilita uma melhor distribuição de
        carga e gerenciamento de recursos, tornando o sistema mais eficiente e
        tolerante a falhas. Em resumo, a adoção dessa arquitetura pode trazer
        uma série de benefícios significativos para o projeto, aumentando sua
        qualidade e adaptabilidade às necessidades do negócio.
      </p>

      <PostImage
        src="/posts/images/texto/03-clean-arch-slide-17.jpg"
        alt="Deixe seu like e comentário!"
        portrait
      />
    </StaticPostLayout>
  );
}
