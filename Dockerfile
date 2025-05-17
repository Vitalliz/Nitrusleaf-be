# Dockerfile para sua API Node.js
# Usando Node.js versão 18 como base
FROM node:18

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Copiando os arquivos de configuração e código
COPY package*.json ./
COPY . .

# Instalando dependências
RUN npm install

# Expondo a porta da API
EXPOSE 3000

# Comando para iniciar a API
CMD ["npm", "start"]