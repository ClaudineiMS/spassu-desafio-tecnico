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

## Executando o projeto em modo de desenvolvimento

Crie o ambiente virtual, ative o ambiente virtual, com o ambiente virtual ativo instale as dependências do projeto,
execute as migrations para criar as tabelas no banco de dados, crie um superusuário para acessar o Django Admin e por fim
inicie o servidor de desenvolvimento

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py createsuperuser
python3 manage.py runserver
```

## Links uteis
Os links são os mesmos para a aplicação dockerizada ou em modo de desenvolvimento

Aplicação:
```txt
http://127.0.0.1:8000/
```

Painel administrativo do Django:
```txt
http://127.0.0.1:8000/admin/
```
Use o usuário e a senha cadastrados no comando `createsuperuser` para acessar o admin.


API root e documentação:
```txt
http://127.0.0.1:8000/api
http://127.0.0.1:8000/api/docs
```

---

## Executando o projeto com Docker

Também é possível executar a aplicação utilizando Docker.

Na raiz do projeto, execute:
```
bash
docker compose up
```

Ao subir a aplicação dockerizada é criado automaticamente o usuário admin:
```bash
usuário: admin
senha: admin
```
Além disso os testes já são executados automaticamente e ficam disponíveis na pasta de logs. 
A implementação desse comportamento pode ser encontrada no arquivo **entrypoint.sh**



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