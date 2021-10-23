FROM node:14-slim
WORKDIR /performance-analytics-dashboard
COPY . .
RUN npm install
RUN npm run build
EXPOSE 2000
CMD ["npm","start"]