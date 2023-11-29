# Use a imagem base
FROM node:latest

# Crie o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie os arquivos necessários para o contêiner
COPY package*.json ./
COPY . .

# Instale as dependências
RUN npm install

# Exponha a porta que a aplicação utiliza
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm", "start"]