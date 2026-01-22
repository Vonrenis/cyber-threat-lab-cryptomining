/**
 * @jest-environment jsdom
 * SIMULADOR DE CRYPTOJACKING (CPU STRESS TEST)
 * Objetivo: Validar a execução de Workers em background e consumo de recursos.
 */
(function(W, D, undefined) {
    /* ---------- 1. CONFIGURAÇÃO ---------- */
    const CFG = {
        cores: W.navigator.hardwareConcurrency || 4, // Usa todos os núcleos
        throttle: 200, // Intervalo em ms para não travar totalmente o navegador
    };

    /* ---------- 2. GATILHO ---------- */
    if (D.readyState === 'loading') {
        D.addEventListener('DOMContentLoaded', init);
    } else { init(); }

    /* ---------- 3. INICIALIZAÇÃO ---------- */
    function init() {
        console.log("[*] Iniciando Simulação de Mineração...");
        console.log(`[*] Detectados ${CFG.cores} núcleos lógicos.`);
        launchWorkers();
    }

    /* ---------- 4. PAYLOAD DO WORKER (O PESO) ---------- */
    // Este código roda isolado em uma thread separada para não travar o clique do mouse
    const WW = `
        onmessage = function(e) {
            if (e.data.cmd === 'run') {
                const start = Date.now();
                // Loop Matemático Pesado (Simula o Hash)
                while (true) {
                    Math.sqrt(Math.random() * Math.random());
                    
                    // Pequena pausa para permitir comando de 'stop' se necessário
                    if (Date.now() - start > 5000) { 
                        postMessage({status: 'working'});
                        // Reinicia contador para não estourar memória
                        break; 
                    }
                }
                // Auto-reinício para manter o stress
                postMessage({cmd: 'restart'});
            }
        };
    `;
    
    // Cria um arquivo virtual na memória do navegador
    const WORKER_BLOB = URL.createObjectURL(new Blob([WW], {type: 'application/javascript'}));

    /* ---------- 5. LANÇA WORKERS ---------- */
    function launchWorkers() {
        for (let i = 0; i < CFG.cores; i++) {
            const w = new Worker(WORKER_BLOB);
            
            // Ouve mensagens do worker
            w.onmessage = function(msg) {
                if(msg.data.cmd === 'restart') {
                    w.postMessage({cmd: 'run'});
                }
            };

            // Dá a ordem de início
            w.postMessage({cmd: 'run'});
            console.log(`[+] Worker ${i+1} iniciado.`);
        }
    }

})(window, document);
