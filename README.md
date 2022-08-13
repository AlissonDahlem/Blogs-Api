# Boas-vindas ao repositório do projeto Blogs API!

<img src="https://i.ibb.co/RPMgjk0/Blogs-api.png" href="https://documenter.getpostman.com/view/22231157/UzXKXeb1#f6e184aa-4c28-4953-a470-dcc4fee7aae8">

Blogs API foi um projeto desenvolvido durante a formação na Trybe.

A API foi feita pensando na integração com um Front-end de um BLOG, onde temos um CRUD para Usuário e Posts.
Todas as requisições (exceto Login e Cadastro de usuário) necessitam de um TOKEN para validação de usuário.

O projeto está hospedado no HEROKU para o livre uso.

Você pode encontrar a documentação dele <a href="https://documenter.getpostman.com/view/22231157/UzXKXeb1#f6e184aa-4c28-4953-a470-dcc4fee7aae8">aqui</a>:

<br />


# Rodando o Projeto


Para rodar o projeto você deverá fazer os seguintes passos:
<br />

### Clonar o Projeto e instalar dependências

 ```console
$ git clone git@github.com:AlissonDahlem/Blogs-Api.git
$ cd Blogs-Api
$ npm install
```
<br/>

### Criar um arquivo .env

Esse arquivo é extremamente importante, pois nele ficara salvo todas as variaveis de ambiente necessarias para o funcionamento do projeto.

```console
$ touch .env
```

Dentro do arquivo .env você deve declarar as seguintes variaveis:
```javascript
#### SERVER VARS
PORT=3000

#### DATABASE VARS
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB_NAME=blogs_api_db
MYSQL_USER=root
MYSQL_PASSWORD=password

#### SECRECT VARS
JWT_SECRET=suaSenhaSecreta
```

### Criar o banco de dados usando Docker-compose

Agora vamos criar nosso Container no Docker que vai armazenar nosso Banco de dados.

```console
$ docker-compose up -d
```
Agora que nosso container já foi criado vamos criar nosso Banco de dados

```console
$ npx sequelize-cli db:create blogs_api_db
```

Nosso banco de dados foi criado porém ainda não temos nenhuma tabela nele, para criar as tabelas basta rodar o seguinte comando:

```console
$ npx sequelize-cli db:migrate
```

Maravilha!!! Temos o nosso projeto 100% pronto para funcionar, basta usar o seguinte comando para rodar o projeto

```console
$ npm start
```


