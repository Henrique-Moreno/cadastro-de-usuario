# 🚀 Cadastro de Usuário - React + Firebase

Uma aplicação web moderna para cadastro, login e gerenciamento de usuários, construída com **React**, **Firebase Authentication** e **Firestore Database**. Totalmente responsiva e deployada na **Vercel**.

## ✨ Funcionalidades

- **📝 Cadastro de Usuários**: Formulário completo com e-mail, senha, nome, sobrenome e data de nascimento
- **🔐 Autenticação Firebase**: Login seguro com Email/Password
- **💾 Banco de Dados Firestore**: Armazenamento persistente dos dados do usuário
- **📱 Design Responsivo**: Interface moderna que funciona em desktop e mobile
- **🛡️ Rotas Protegidas**: Página principal só acessível para usuários logados
- **⚡ Deploy Automático**: Integração com GitHub + Vercel para deploys instantâneos

## 🛠️ Tecnologias Utilizadas

| Frontend | Backend | Infra |
|----------|---------|-------|
| React  | Firebase Auth | Vercel |
| React Router | Firestore | GitHub |
| CSS Modules | | |

## 🎯 Como Funciona

### **Fluxo do Usuário:**
1. **Acessar Login** (`/`) - Usuário pode fazer login ou ir para cadastro
2. **Cadastro** (`/cadastro`) - Formulário completo cria usuário no Firebase Auth + dados no Firestore
3. **Dashboard** (`/principal`) - Página protegida mostra dados do usuário logado
4. **Logout** - Volta para tela de login

## Instale as dependências:

npm install

# Copie o .env.example para .env
cp .env.example .env

# Edite .env com suas credenciais do Firebase Console
# (Project Settings → General → Your apps → Web app → Config)


## Execute localmente:

npm start