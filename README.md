# Gerenciador de Tarefas (TechX To-Do List)

## Sobre a aplicação

Essa é uma aplicação web de gerenciamento de tarefas. A aplicação permite que usuários se cadastrem, façam login e gerenciem suas tarefas diárias.

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
* **Node.js** com **TypeScript**
* **Express.js** para a criação da API RESTful.
* **TypeORM** como ORM para interação com o banco de dados.
* **MySQL** como banco de dados relacional.
* **JSON Web Tokens (JWT)** para autenticação.
* **Bcrypt.js** para criptografia de senhas.

**Frontend:**
* **Angular** como framework.
* **TypeScript**
* **Angular Material** para a biblioteca de componentes visuais.

**Ambiente e Automação:**
* **Docker** e **Docker Compose** para orquestrar toda a aplicação em containers isolados.

---

## Como Rodar o Projeto

### Pré-requisitos

* Você precisa ter o **Docker** e o **Docker Compose** instalados na sua máquina.

### Passos para a Execução

1.  **Clone o Repositório:**
    ```bash
    git clone [https://github.com/carvalhxlucas/desafio-essentia-tecnologies.git](https://github.com/carvalhxlucas/desafio-essentia-tecnologies.git)
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

---

## Estrutura do Banco de Dados

O banco de dados relacional foi modelado com duas entidades principais, `users` e `tasks`, com um relacionamento de um-para-muitos.

**Diagrama de Entidade-Relacionamento (ERD):**

<img width="799" height="320" alt="Captura de Tela 2025-07-29 às 19 05 28" src="https://github.com/user-attachments/assets/44dad206-ab80-4e5d-9122-dbd15726df54" />

