<h3 align="center">Monitoramento MySQL/MariaDB para DBA</h3>
<p align="center">
  <a title='License' href="https://www.isc.org/licenses" height="18" >
    <img src='https://img.shields.io/badge/license-ISC-green.svg' />
  </a>
</p>
<p align="center">
  <img src='https://img.shields.io/github/issues/Rafmco/monitor-mysql' />
  <img src='https://img.shields.io/github/forks/Rafmco/monitor-mysql' />
  <img src='https://img.shields.io/github/stars/Rafmco?style=social' />
</p>
<p align="center">
  <a title='Contato' href="https://www.linkedin.com/in/rafael-machado-692b391bb/" height="18" >
    <img src='https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white' />
  </a>
</p>

## 🖐 Requisitos
**Sistema Operacional:**
Windows/Linux

**Banco de Dados:**
MySQL/MariaDB

## ⏳ Instalação
#### Baixe o repositório
```bash
$ git clone git@github.com:Rafmco/monitor-mysql.git
```
## 🐬🦭 Execute os dumps no Banco de Dados
```bash
$ cd monitor-mysql\db\dumps\
```
#### Arquivo monitor.sql
- Banco host da aplicação
#### Arquivo audit.sql
- Banco alvo do monitoramento

## ⚙️ Back-End
#### Entre no diretório server
```bash
$ cd monitor-mysql\server
```
#### Copie o arquivo de configuração e altere as configurações:
```bash
$ cp .env.example .env
```
- APP_HOST para http: + ip do servidor
- APP_KEY com a chave de criptografia da aplicação
- Altere as configurações do banco de dados
#### Instale as dependências
```bash
$ yarn
```
#### Efetue o build da aplicação
```bash
$ yarn build
```
#### Inicialize o servidor
```bash
$ yarn start
```
## 📊 Front-End
#### Entre no diretório client
```bash
$ cd monitor-mysql\client
```
#### Instale as dependências
```bash
$ yarn
```
#### Efetue o build da aplicação
```bash
$ yarn build
```
#### Inicialize o client
```bash
$ yarn serve
```
### ⌨️ Usuário padrão
```
login: admin
senha: admin
```
- Alterar após configuração

## © Licença

[ISC License](https://www.isc.org/licenses).
