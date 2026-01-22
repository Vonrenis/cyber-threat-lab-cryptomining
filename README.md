# cyber-threat-lab-cryptomining
Criei um láb para aprender sobre cryptojacking e seus perigos
O que é cryptojacking?

Nada mais é do que um malware malicioso que infecta a vítima com o intuito de minerar criptomoedas sem o seu consentimento. Trata-se de um malware em arquivo que pode ser enviado por e-mail ou por outros meios.
Sintomas que podem indicar que você está sendo alvo desse tipo de malware:

    Queda de desempenho;

    Superaquecimento;

    Aumento exponencial da conta de luz;

    Uso de CPU/GPU muito altos.

Gostaria de ressaltar que este estudo foi feito por questões educativas. De maneira nenhuma quero ensinar alguém a fazê-lo; meu intuito foi apenas realizar uma simulação para que esse tipo de prática pudesse ser entendida e, consequentemente, combatida.

Dito isso, vamos começar dizendo que um dos métodos para aplicar essa prática é o XSS, que basicamente é uma injeção, como por exemplo a injeção de SQL, só que, neste caso, utiliza-se JavaScript. Entretanto, pode ser feito infectando o celular ou o computador através de engenharia social. Contudo, quero focar em aplicações web e, por conta disso, falaremos apenas da injeção de XSS.

O XSS possui basicamente dois tipos que são comumente usados: o refletido e o armazenado, sendo este último o mais perigoso.
Armazenado:

O cracker encontra a falha na aba de comentários ou de pesquisa de um site popular. A partir disso, ele insere <script>[o script malicioso]</script>. O site salva isso no banco de dados e, a partir daí, começa a mineração. Agora, quando uma pessoa abrir o site, o dispositivo dela será usado para a mineração sem que o dono ou a pessoa perceba.
Refletido:

O cracker cria um link malicioso na própria URL do site que contém o script de mineração, sendo mais comum em um site que contenha esse script (ex: site-vulneravel.com/busca?q=<script>minerador()</script>). Vale lembrar que o link pode ser enviado por phishing; quando a vítima clica, o site reflete o código e o navegador executa a mineração.

Contudo, você pode estar se perguntando: que tipo de criptomoeda é minerada? Bitcoin? Ethereum? USDT?

O cracker irá minerar Monero, que, além de ser uma moeda voltada para a mineração, é praticamente anônima por possuir:

    Ring Signature: que nada mais é do que misturar as solicitações com as legítimas, tornando impossível saber quem a iniciou.

    Stealth Addresses: uma característica muito marcante, onde cada transação gera um endereço único e temporário; não existe um histórico público como no Bitcoin.

    RingCT: que faz com que o valor seja ocultado.

Logo após o serviço ser concluído, o cracker converte o Monero em uma moeda comum, como Litecoin, em uma corretora que não exige verificação de identidade (No-KYC). Ele pode, então, comprar Bitcoin em uma corretora comum; essa técnica é chamada de "Chain Hopping".

Fluxo: Vítima → Script XSS → Monero (Privacidade) → Mixers/Pulos de Rede → Corretora sem Identificação → Bolso do Cracker.

Para se proteger é bem simples: basta fazer o monitoramento do site e não permitir que códigos de terceiros sejam executados.
