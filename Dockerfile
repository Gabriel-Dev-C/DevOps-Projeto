# Usar imagem oficial do Node.js
FROM node:22

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json ./

# Instalar dependências


# Copiar código da aplicação
COPY . .

# Expor porta da aplicação
EXPOSE 3000



# Comando para iniciar a aplicação
CMD ["node", "index.js"]