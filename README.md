# Spassu - Desafio Técnico Full Stack

Sistema desenvolvido para uma papelaria hipotética, como parte de um desafio técnico para uma vaga de **Desenvolvedor Full Stack** na **Spassu**.

A aplicação permite registrar vendas, gerenciar produtos, clientes e vendedores, além de calcular comissões de vendedores com base nos produtos vendidos e nas regras de comissão configuradas por dia da semana.

O projeto possui:

- Backend em **Python**, **Django** e **Django REST Framework**
- Frontend em **React**, **Vite**, **TypeScript** e **Material UI**
- Banco de dados **SQLite**
- Documentação automática da API com Swagger
- Docker e Docker Compose para execução padronizada
- Carga inicial do banco de dados configurável via `.env`
- Testes no backend e no frontend


## Aplicação completa:

O frontend está hospedado na **vercel** já o backend está hospeado no **Render**.


Frontend: https://spassu-desafio-tecnico.vercel.app/

Backen: https://spassu-desafio-tecnico.onrender.com/api/

Obs: O Render não exibe a interface gráfica do Django. Além disso, como o backend está hospedado em um serviço gratuito, recomendo acessar primeiro o link do backend para que o Render inicialize o serviço. Depois disso, acesse o frontend

## Funcionalidades implementadas

### Backend

- CRUD de vendedores
- CRUD de clientes
- CRUD de produtos
- CRUD de vendas
- Cadastro de vendas com um ou mais produtos
- Cadastro de regras de comissão por dia da semana
- Cálculo de comissão considerando:
  - percentual de comissão do produto
  - valor unitário do produto
  - quantidade vendida
  - regra mínima e máxima de comissão por dia da semana
- Relatório de comissões por vendedor em um período
- Total de vendas por vendedor no relatório de comissões
- Total geral de comissões no período
- API REST com Django REST Framework
- Documentação Swagger da API
- Paginação global nas APIs
- Limite de chamadas por usuário anônimo e autenticado
- Logs de operações da aplicação - diretório de logs
- Logs dos testes automatizados  - diretório de logs
- Testes automatizados de services e APIs
- Django Admin para gerenciamento dos dados

### Frontend

- Listagem de vendas
- Cadastro de vendas
- Edição de vendas
- Remoção de vendas com modal de confirmação
- Visualização dos detalhes da venda
- Busca server-side para clientes, vendedores e produtos
- Relatório de comissões por período
- Filtro por data no relatório de comissões
- Exibição do total de vendas por vendedor
- Exibição do total geral de comissões
- Notificações de confirmação
- Tabela listando comissões e vendas
- Integração com API do backend via variável de ambiente


## Tecnologias utilizadas

### Backend

- Python 3.12, Django, Django REST Framework, drf-spectacular, django-cors-headers, SQLite, Docker, Docker Compose

### Frontend

- React, Vite, TypeScript, Material UI, MUI X Date Pickers, Axios, React Virtuoso, ESLint, Jest

## Pré-requisitos

Para executar o projeto localmente, é necessário ter instalado:

- Python 3.12 ou superior, pip, venv, Node.js, npm
- Docker - Opcional
- Docker Compose - Opcional


# Executando o projeto sem Docker

## Backend

Entre na pasta do backend e crie e ative o ambiente virtual:

```bash
python3 -m venv venv
source venv/bin/activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Execute as migrations:

```bash
python3 manage.py migrate
```

Crie um superusuário:

```bash
python3 manage.py createsuperuser
```

Opcionalmente, execute a carga inicial:

```bash
python3 manage.py seed_initial_data
```

Inicie o servidor:

```bash
python3 manage.py runserver
```

O backend ficará disponível em:

```txt
http://127.0.0.1:8000/
```

## Frontend

Entre na pasta do frontend e instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend ficará disponível em:

```txt
http://localhost:5173/
```


# Executando o projeto com Docker

Na raiz do projeto, execute:

```bash
docker compose up --build
```

Depois acesse:

```txt
Frontend: http://localhost:5173/
Backend:  http://localhost:8000/
```

Ao subir a aplicação dockerizada, é criado automaticamente um usuário admin, caso as variáveis de superusuário estejam configuradas:

```txt
Usuário: admin
Senha: admin
```

Para alterar o usuário padrão, modifique as variáveis `DEFAULT_SUPERUSER_*` no `.env` do backend.

# Links úteis


## Django Admin

```txt
http://127.0.0.1:8000/admin/
```

Use o usuário criado com `createsuperuser` ou o usuário padrão criado via Docker.

## API Root

```txt
http://127.0.0.1:8000/api/
```

## Documentação Swagger

```txt
http://127.0.0.1:8000/api/docs/
```

# Configurações do backend via `.env`

Abaixo estão as variáveis disponíveis para configurar o backend.

## Configurações gerais

Define quais hosts podem acessar a aplicação Django.

```env
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0
```

## CORS

```env
CORS_ALLOWED_ORIGINS=http://127.0.0.1:5173,http://localhost:5173
```

Define quais origens podem acessar a API do backend.



## Limite de chamadas da API

```env
DRF_THROTTLE_ANON_RATE=1000/hour
DRF_THROTTLE_USER_RATE=1000/hour
```

Define o limite de requisições para usuários anônimos e autenticados.

Isso permite até 1000 requisições por hora.


## Logs

Descrição:

- `LOG_LEVEL`: nível geral de logs
- `DJANGO_LOG_LEVEL`: logs internos do Django
- `DJANGO_REQUEST_LOG_LEVEL`: logs de requisições Django
- `VENDAS_LOG_LEVEL`: logs específicos da aplicação de vendas

```env
LOG_FILE=logs/app.log
```

Define o arquivo onde os logs da aplicação serão gravados.


## Testes automatizados

```env
RUN_TESTS_ON_STARTUP=True
```

Quando definido como `True`, os testes são executados automaticamente ao iniciar a aplicação dockerizada.

Para executar manualmente em desenvolvimento:

```bash
python3 manage.py test
```

```env
TEST_DEBUG=False
```

Quando definido como `True`, imprime informações adicionais dos testes no terminal.

```env
TEST_LOG_FILE=logs/test_logs_file.log
```

Define o arquivo onde os logs dos testes serão salvos.

No frontend os testes unitários podem ser executados usando:

```env
npm run test
```

## Banco de dados

```env
DB_ENGINE=sqlite
SQLITE_NAME=db.sqlite3
```

Define o banco utilizado pela aplicação. Atualmente, o projeto está configurado para usar SQLite.

## Carga inicial do banco

```env
LOAD_INITIAL_DATA=True
```

Quando definido como `True`, executa a carga inicial automaticamente ao subir a aplicação dockerizada.

Para executar manualmente em desenvolvimento:

```bash
python3 manage.py seed_initial_data
```

Descrição:

- `SEED_TOTAL_CLIENTES`: quantidade de clientes criados
- `SEED_TOTAL_VENDEDORES`: quantidade de vendedores criados
- `SEED_TOTAL_PRODUTOS`: quantidade de produtos criados
- `SEED_TOTAL_VENDAS`: quantidade de vendas criadas
- `SEED_ITENS_POR_VENDA`: quantidade de itens por venda
- `SEED_BATCH_SIZE`: tamanho dos lotes usados na inserção de muitos registros

## Usuário administrador padrão

```env
DEFAULT_SUPERUSER_USERNAME=admin
DEFAULT_SUPERUSER_EMAIL=admin@email.com
DEFAULT_SUPERUSER_PASSWORD=admin
```

Define o usuário administrador criado automaticamente ao subir a aplicação dockerizada.

## Paginação

```env
PAGE_SIZE=10
```

Define o tamanho da página retornada pelas API do sistema.


# Configurações do frontend via `.env`

```env
VITE_API_URL=http://localhost:8000/api
```

Essa variável define a URL base das API consumida pelo frontend.


# Visão geral da arquitetura

## Backend

A aplicação foi organizada com separação de responsabilidades:

- `models`: entidades do domínio
- `serializers`: conversão entre models e JSON
- `views`: endpoints da API
- `services`: regras de negócio, como cálculo de comissão
- `docs`: documentação customizada da API
- `tests`: testes automatizados
- `signals`: logs de operações
- `management/commands`: comandos customizados, como carga inicial
- `entrypoints.sh`: script com o código para executar as configurações automaticas ao subir a aplicação.

Principais decisões:

- Regra de comissão separada em service
- Logs separados em signals
- Testes organizados com `LoggedTestCase`
- Documentação da API customizada com drf-spectacular
- Paginação global configurável por `.env`
- Configuração centralizada por variáveis de ambiente


## Frontend

O frontend foi organizado em:

- `components`: componentes reutilizáveis da interface
- `pages`: páginas principais da aplicação
- `services`: comunicação com a API
- `types`: interfaces que interagem com o backend
- `styles`: estilos das paginas
- `hooks`: hooks personalizados 
- `utils`: funções utilitárias

Principais decisões:

- Uso de Material UI para interface
- Uso de TypeScript para melhor segurança
- Services separados para comunicação com a API
- Busca server-side para lidar com grandes volumes de dados
- Componentização de tabela, filtros, mensagens e modais
- Uso de tabela virtualizada para melhor performance
