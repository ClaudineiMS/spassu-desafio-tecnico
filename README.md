# Backend

Backend desenvolvido em **Python** e **Django** para uma papelaria hipotética, como parte de um desafio técnico para uma vaga de **Desenvolvedor Full Stack** na **Spassu**.

A aplicação tem como objetivo registrar vendas, gerenciar produtos, clientes e vendedores, além de calcular comissões de vendedores com base nos produtos vendidos e nas regras de comissão configuradas por dia da semana.

O projeto utiliza o **Django REST Framework** para criação da API REST e o **SQLite** como banco de dados inicial, visando simplicidade no desenvolvimento e facilidade de execução. Também foi adicionada uma configuração com **Docker**, permitindo executar a aplicação em um ambiente padronizado.

## Pré-requisitos

Para executar o projeto localmente no Linux, é necessário ter instalado:

- Python 3.12 ou superior
- pip
- venv
- Docker e Docker Compose, caso deseje executar com Docker

---

## Executando o projeto localmente com ambiente virtual

Crie o ambiente virtual:

```bash
python3 -m venv venv
```

Ative o ambiente virtual:

```bash
source venv/bin/activate
```

Com o ambiente virtual ativo, instale as dependências do projeto:

```bash
pip install -r requirements.txt
```

Execute as migrations para criar as tabelas no banco de dados:

```bash
python3 manage.py migrate
```

Crie um superusuário para acessar o Django Admin:

```bash
python3 manage.py createsuperuser
```

Inicie o servidor de desenvolvimento:

```bash
python3 manage.py runserver
```

A aplicação estará disponível em:

```txt
http://127.0.0.1:8000/
```

O painel administrativo do Django estará disponível em:

```txt
http://127.0.0.1:8000/admin/
```

Use o usuário e a senha cadastrados no comando `createsuperuser` para acessar o admin.

---

## Executando o projeto com Docker

Também é possível executar a aplicação utilizando Docker.

Na raiz do projeto, execute:

```bash
docker compose up --build
```

A aplicação estará disponível em:

```txt
http://127.0.0.1:8000/
```

## Funcionalidades implementadas

- Cadastro de vendedores
- Cadastro de clientes
- Cadastro de produtos
- Cadastro de vendas com um ou mais produtos
- Cadastro de regras de comissão por dia da semana
- Cálculo de comissão considerando:
  - percentual de comissão do produto
  - valor unitário do produto
  - quantidade vendida
  - regra mínima e máxima de comissão por dia da semana
- Relatório de comissões por vendedor em um período
- Total geral de comissões no período
- Django Admin para gerenciamento dos dados
- API REST com CRUD de produtos, clientes, vendedores e vendas
- Documentação Swagger da API
- Paginação global nas APIs
- Logs de operações da aplicação
- Logs dos testes automatizados
- Testes automatizados de serviços e APIs

---