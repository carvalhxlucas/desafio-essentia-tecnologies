# Gerenciador de Tarefas (TechX To-Do List)

## Sobre a aplicação

Essa é uma aplicação web de gerenciamento de tarefas. A aplicação permite que usuários se cadastrem, façam login e gerenciem suas tarefas diárias.

<img width="773" height="425" alt="Captura de Tela 2025-07-30 às 10 04 02" src="https://github.com/user-attachments/assets/8266ecc3-3ec6-487a-bd8c-148fd0c31b72" />

---

## Sumário

* [Funcionalidades Implementadas](#-funcionalidades-implementadas)
* [Tecnologias Utilizadas](#-tecnologias-utilizadas)
* [Como Rodar o Projeto](#-como-rodar-o-projeto)
* [Estrutura do Banco de Dados](#-estrutura-do-banco-de-dados)
* [Decisões de Arquitetura](#-decisões-de-arquitetura)

---

## Funcionalidades Implementadas

* **Autenticação de Usuários:**
    * Registro de novas contas com senha.
    * Login com geração de token de segurança.
    * Rotas da API protegidas, garantindo que um usuário só possa acessar suas próprias tarefas.

* **Gerenciamento de Tarefas:**
    * **Criar:** Adicionar novas tarefas.
    * **Ler:** Visualizar a lista de tarefas do usuário logado.
    * **Atualizar:** Editar o título de uma tarefa existente.
    * **Marcar como Concluída:** Alternar o status de uma tarefa entre pendente e concluída.
    * **Deletar:** Remover uma tarefa.

---

## Tecnologias Utilizadas

**Backend:**
* Node.js com TypeScript
* Express.js
* TypeORM
* MySQL
* JSON Web Tokens (JWT) & Bcrypt.js
* Swagger (para documentação da API)

**Frontend:**
* Angular
* TypeScript
* Angular Material

**Ambiente e Automação:**
* Docker e Docker Compose para orquestrar toda a aplicação em containers isolados.
* GitHub Actions para Integração Contínua (CI)

---

## Como Rodar o Projeto

### Pré-requisitos

* Você precisa ter o **Docker** e o **Docker Compose** instalados na sua máquina.

### Passos para a Execução

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/carvalhxlucas/desafio-essentia-tecnologies.git
    cd desafio-essentia-tecnologies
    ```

2.  **Configure o arquivo .env:**
    Na raiz do projeto, configure o arquivo env com os valores corretos.
    ```bash
    mv .env.example .env
    ```

3.  **Suba a Aplicação com Docker Compose:**
    Execute o seguinte comando na raiz do projeto. Ele irá construir as imagens e iniciar a aplicação.
    ```bash
    docker-compose up --build
    ```

4.  **Acesse a Aplicação:**
    Após o build terminar, a aplicação estará disponível nos seguintes endereços:
    * **Frontend (Aplicação Web):** `http://localhost:4200`
    * **Backend (API):** `http://localhost:3000`
    * **Documentação da API (Swagger):** `http://localhost:3000/api-docs`

---

## Estrutura do Banco de Dados

O banco de dados relacional foi modelado com duas entidades principais, `users` e `tasks`, com um relacionamento de um-para-muitos.

**Diagrama de Entidade-Relacionamento (ERD):**

<img width="799" height="320" alt="Captura de Tela 2025-07-29 às 19 05 28" src="https://github.com/user-attachments/assets/44dad206-ab80-4e5d-9122-dbd15726df54" />

---

## Decisões de Arquitetura

* **Orquestração com Docker Compose:** Optei por containerizar toda a aplicação para garantir um ambiente de desenvolvimento consistente e fácil de buildar, elimina problemas de "na minha máquina funciona" 😅.
* **Autenticação JWT:** A escolha do JWT permite a criação de um sistema de login seguro e stateless, ideal para SPAs como o Angular.
* **CI com GitHub Actions:** Implementei um workflow de Integração Contínua visando a qualidade do código, prevenindo bugs e automatizando testes em cada alteração.
* **Documentação com Swagger:** A documentação da API foi gerada com Swagger para fornecer uma interface clara para os endpoints.

---
