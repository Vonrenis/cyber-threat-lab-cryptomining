FROM alpine:edge

# 1. Instala pacotes
RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache nginx xmrig

# 2. Prepara as pastas
RUN mkdir -p /run/nginx /app

# 3. CONFIGURAÇÃO FORÇADA DO NGINX
# Aqui apagamos a config padrão e criamos uma que aponta EXPLICITAMENTE para /app
RUN rm -f /etc/nginx/http.d/default.conf && \
    echo "server { listen 80; root /app; index index.html; }" > /etc/nginx/http.d/default.conf

# 4. Copia o site para a pasta /app (que acabamos de configurar)
COPY . /app

# 5. Configura o script de inicialização
COPY start.sh /start.sh
RUN chmod +x /start.sh

# 6. Inicia
CMD ["/start.sh"]
