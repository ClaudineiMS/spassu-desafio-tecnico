# Spassu - Desafio Técnico Full Stack

Sistema desenvolvido para uma papelaria hipotética, como parte de um desafio técnico para uma vaga de **Desenvolvedor Full Stack** na **Spassu**.

A aplicação permite registrar vendas, gerenciar produtos, clientes e vendedores, além de calcular comissões de vendedores com base nos produtos vendidos e nas regras de comissão configuradas por dia da semana.

O projeto possui:

- Backend em **Python**, **Django** e **Django REST Framework**
- Frontend em **React**, **Vite**, **TypeScript** e **Material UI**
- Banco de dados **SQLite**
- Documentação automática da API com Swagger
- Docker e Docker Compose
- Configuração do sistema por `.env`
- Testes no backend e no frontend


## Aplicação completa:

O frontend está hospedado na **vercel** já o backend está hospeado no **Render**.


Frontend: https://spassu-desafio-tecnico.vercel.app/

Backen: https://spassu-desafio-tecnico.onrender.com/api/

Obs: O Render não exibe a interface gráfica do Django. Além disso, como o backend está hospedado em um serviço gratuito, recomendo acessar primeiro o link do backend para que o Render inicialize o serviço. Depois disso, acesse o frontend


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


## Frontend

O frontend foi organizado em:

- `components`: componentes reutilizáveis da interface
- `pages`: páginas principais da aplicação
- `services`: comunicação com a API
- `types`: interfaces que interagem com o backend
- `styles`: estilos das paginas
- `hooks`: hooks personalizados 
- `utils`: funções utilitárias

## Considerações finais
O desafio técnico foi implementado desde o início pensando no uso de Docker, com dois serviços separados: um para o frontend e outro para o backend.

Iniciei o desenvolvimento pelo backend, estruturando primeiro os models, depois os serializers e, por fim, as views junto com os endpoints da API. Inicialmente, optei por trabalhar na branch main para desenvolver um MVP do backend. Após finalizar essa primeira versão, ramifiquei a main para uma nova branch, onde comecei o desenvolvimento do frontend.

À medida que o desafio avançou, percebi que ainda existiam alguns ajustes e melhorias a serem feitos no backend. Por isso, criei outra branch específica para tratar essas alterações. A partir desse momento, o desenvolvimento seguiu em paralelo, com uma branch voltada para o frontend e outra para os ajustes do backend. Ao final, as duas branches foram integradas novamente à main, onde está a versão completa da aplicação.

Por se tratar de um desafio técnico com prazo reduzido, algumas melhorias que eu gostaria de implementar ficaram de fora. Tanto no backend quanto no frontend, eu gostaria de ter aumentado a cobertura de testes para contemplar mais cenários da aplicação.

Especificamente no frontend, também gostaria de realizar algumas melhorias na tela de nova venda e atualização de venda. Apesar de funcional, ainda existem pontos que poderiam ser otimizados, como a redução de algumas requisições desnecessárias ao backend, principalmente durante o carregamento e preenchimento dos dados do formulário. Além disso, eu gostaria de componentizar ainda mais algumas partes da interface e reduzir a complexidade de determinados hooks, deixando a manutenção do código mais simples e a separação de responsabilidades ainda mais clara.


## Documentação complementar

[Visualizar documentação complementar](./docs/Documentação_complementar.pdf)