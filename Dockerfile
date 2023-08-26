# Start your image with a node base image
FROM node:latest

# The /app directory should act as the main application directory
WORKDIR /app/sso

COPY . /app/sso

RUN npm cache verify
RUN npm cache clean -f

# 安装依赖并构建
RUN npm install --registry https://registry.npm.taobao.org && npm run build

ENV HOST 0.0.0.0
ENV PORT 9002

EXPOSE 9002

# Start the app using serve command
CMD [ "node", "/app/sso/dist/app.js" ]