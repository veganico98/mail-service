# 📚 Library Service & 📩 Mail Service  
Projeto final – Arquitetura Limpa & Microsserviços (NestJS + RabbitMQ + Nodemailer)

---

## 🛠️ Tecnologias Utilizadas
- **NestJS** (Node.js Framework)  
- **TypeORM** + **MySQL** (persistência de dados)  
- **RabbitMQ** (mensageria entre microsserviços)  
- **Nodemailer** + **Pug** (templates de email)  
- **Brevo (Sendinblue)** – SMTP gratuito para envio de emails  

---

## 📂 Estrutura do Projeto
### 🔹 Library Service
Serviço principal, responsável pela gestão da biblioteca:  
- **Módulo Users**:  
  - Cadastro de usuários  
  - Listagem e consulta  
  - Atualização, remoção e atribuição de departamento  
  - Emissão de evento `user.created` no RabbitMQ  

- **Módulo Books**:  
  - Cadastro de livros  
  - Listagem e consulta  
  - Atualização e remoção  

- **Módulo Loans**:  
  - Criação de empréstimos (`loan.created`)  
  - Devolução de livros  
  - Controle de disponibilidade dos livros  

- **Mensageria**:  
  - Integração via `RmqModule`  
  - Emissão de eventos para o **Mail Service**  

---

### 🔹 Mail Service
Serviço de mensageria responsável pelo envio de emails:  
- **Eventos suportados**:  
  - `user.created` → Envia email de boas-vindas  
  - `loan.created` → Envia email de confirmação de empréstimo  

- **Configurações**:  
  - SMTP Brevo via `nodemailer`  
  - Templates em **Pug**  
  - Logs detalhados de envio  

---

## ⚙️ Configuração

### 📌 Pré-requisitos
- **Docker** (para RabbitMQ e MySQL)  
- **Node.js** (versão LTS recomendada)  
- **NPM / Yarn**

### 📌 Subir RabbitMQ e MySQL com Docker
```yaml
version: "3.9"
services:
  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: guest
      RABBITMQ_DEFAULT_PASS: guest

  mysql:
    image: mysql:8.1
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: library
```
# Subir os containers
`docker-compose up -d`

# MySQL
- Crie um banco de dados com o nome library_service_db com: `CREATE DATABASE library_service_db;
` 

# Importe a postman collection
- arquivo Library Service.postman_collection no repositório library-service
- `Library Service.postman_collection` Todas as rotas já estão pré-setadas com exemplos para serem seguidos na collection.

# Instalar dependencias
`npm install`

### 📌 Variáveis de Ambiente
Crie um arquivo .env em cada microsserviço.

Library Service (.env):
```yaml
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=root
DB_NAME=library
```

Mail Service (.env):
```yaml
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=SEU_USER_BREVO
SMTP_PASS=SUA_SENHA_BREVO
MAIL_FROM=seuemail@gmail.com
```
# TypeORM
##  1. Criar Migration
Sempre que criar ou alterar uma entidade (`.entity.ts`), gere uma nova migration:

```bash
npx ts-node ./node_modules/typeorm/cli.js migration:generate ./src/migrations/NOME_DA_MIGRATION -d ./src/data-source.ts
````

## 2. Rodar Migration

Para aplicar todas as migrations no banco de dados:

npx ts-node ./node_modules/typeorm/cli.js migration:run -d ./src/data-source.ts

---
Após os passos acima, rode o projeto com `npm run start:dev` e teste as rotas importadas através da collection disponibilizada.
