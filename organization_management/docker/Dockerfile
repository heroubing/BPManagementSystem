FROM nginx:stable-alpine AS organization_management
LABEL maintainer="Hanqing Sun <DefineFC@outlook.com>"

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf


FROM organization_management AS local

VOLUME [ "/frontend" ]


FROM node:alpine AS production_intermediate

COPY vue-project /frontend/
WORKDIR /frontend
RUN npm config set registry http://mirrors.tencentyun.com/npm/ && \
    npm install --progress=false && \
    npm run build && \
    rm -r node_modules/


FROM organization_management AS production

COPY --from=production_intermediate /frontend/dist /frontend/dist
