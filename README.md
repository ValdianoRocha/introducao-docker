<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# 📘 API de Gerenciamento Educacional
## 📌 Sobre o Projeto

Esta API foi desenvolvida com o objetivo de gerenciar usuários, autenticação e cursos dentro de um sistema educacional.
Ela fornece endpoints que permitem registro, login, listagem, busca, atualização e exclusão de usuários e cursos, garantindo um fluxo seguro e organizado.

# 📦 Pré-requisitos :

Antes de iniciar o projeto, é necessário ter algumas ferramentas instaladas no seu computador. Elas são essenciais para o funcionamento da aplicação e para que você possa executá-la localmente.

### 🔧 Git :

O Git é um sistema de controle de versão. Ele permite que você clone (copie) o projeto do repositório remoto para a sua máquina e também contribua com atualizações no código.

- 🔗 Baixar: [https://git-scm.com/downloads](https://git-scm.com/downloads)
- 📥 Após a instalação, verifique se está funcionando corretamente:
  ```bash
  git --version

<!-- - Esse e nosso repositório no git 
 - [Git](https://github.com/amontada-valley/squad-02-amotur-backend) -->
 ## 📁 Repositório do projeto:
https://github.com/ValdianoRocha/introducao-docker


## 🐳 Instalando Docker.
O Docker é uma plataforma que permite criar containers — ambientes isolados que contêm tudo o que seu projeto precisa para rodar (linguagem, dependências, banco de dados, etc.).

No nosso caso, usamos o Docker para rodar tanto o banco de dados quanto a própria aplicação de forma automatizada e independente do seu sistema operacional.

🧭 Passos para instalar:
Acesse o site do Docker:

- [Docker e Docker Compose](https://www.docker.com/get-started)

Baixe a versão compatível com o seu sistema operacional:

Windows (com WSL2 habilitado)

macOS (Intel ou Apple Silicon)

Linux (use o gerenciador de pacotes da sua distribuição)

Siga o processo de instalação da interface do Docker Desktop.

Após instalar, reinicie o computador se necessário e abra o Docker Desktop para garantir que está rodando corretamente.

Para confirmar se está tudo funcionando, execute os comandos no terminal:

```bash
$ docker --version
$ docker compose version
```


# 🚀 Funcionalidades
## 🔑 Autenticação (Auth)

- Registro de estudantes e professores
- Login seguro com validação de credenciais

## 👥 Usuários (User)

- Listagem de todos os usuários cadastrados
- Consulta individual por CPF
- Atualização e exclusão de usuários pelo CPF

## 📚 Cursos (Cursos)

- Criação de novos cursos
- Listagem de cursos cadastrados
- Consulta por ID ou nome
- Atualização e exclusão de cursos

## 🛠️ Tecnologias Utilizadas

- Node.js
- NestJS
- Prisma (ORM)
- Swagger (documentação da API)
- PostgreSQL


## 📦 Clone.
```bash
$ git clone git@github.com:ValdianoRocha/introducao-docker.git
```

## 📥 Instalando as dependências.

```bash
$ npm install
```

## 📦 Criar um .env:
```bash
$ cp .env.example .env
```
- Preencha os campos corretamente.

## 🧬 Inicializando o Prisma.
```bash
$ npx prisma migrate dev --name [new_name]
$ npx prisma generate
```

## 🔼 Subindo os containers com Docker Compose.
- O Docker deve estar iniciado.
```bash
$ docker compose up --build -d
```

## 🚀 Iniciando a API.

```bash
$ npm run start:dev
```
- Caso se der um erro na porta (localhost:3333), vc vai ate o arquivo docker-compose.yml, mude a porta do lado esquerdo, depois va no .env na (URL) e mude a porta para a mesma.

- Depois use o comando: 
```bash
$ docker compose down
$ docker compose up -d
```


A API estará disponível em: http://localhost:3333

## 🧪 Teste e Documentação.
A API está documentada com Swagger, permitindo fácil exploração dos endpoints diretamente pelo navegador.
http://localhost:3333/api

# 📌 Status do Projeto

✅ Em desenvolvimento contínuo.
