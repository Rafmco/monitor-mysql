<h3 align="center">Monitoramento MySQL para DBA</h3>
<p align="center">
  <a title='License' href="https://www.isc.org/licenses" height="18">
    <img src='https://img.shields.io/badge/license-ISC-green.svg' />
  </a>
</p>

## 🖐 Requisitos
**Sistema Operacional:**

**Stack:**

**Banco de Dados:**

## ⏳ Instalação
#### Baixe o repositório
```bash
$ git clone git@github.com:Rafmco/monitor-mysql.git
```
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
## © Licença

[ISC License](https://www.isc.org/licenses).
