# Specify a base image
FROM node:10-alpine AS alpine
# WORKDIR .
# Install dependencies
COPY ./package*.json ./
ENV DATABASE_USER=postgres \
    DATABASE_PASSWORD=storm12 \
    DATABASE_HOST=postgres \
    DATABASE_NAME=gis_app \
    DATABASE_PORT=5432 \
    PORT=5000 \
    jwtSecret=cat123
RUN npm install 
COPY . .
# Default command
CMD ["npm", "run", "dockerRun"]