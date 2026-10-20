"use strict";

const ITEM_SYMBOLS = [
  {
    icone: "acv-cadeira-giratoria",
    termos: [
      "cadeira giratoria",
      "cadeira de escritorio",
      "cadeira com rodinhas",
      "cadeira presidente",
      "cadeira executiva",
    ],
  },
  {
    icone: "acv-cadeira-fixa",
    termos: [
      "cadeira fixa",
      "cadeira de visitante",
      "cadeira sem rodinhas",
      "cadeira de recepcao",
    ],
  },
  {
    icone: "lucide-armchair",
    termos: ["poltrona", "poltrona de espera", "poltrona estofada"],
  },
  { icone: "acv-sofa", termos: ["sofa", "sofa de recepcao", "sofa de espera"] },
  { icone: "acv-banco", termos: ["banco", "banqueta", "banco de madeira"] },
  {
    icone: "acv-longarina",
    termos: ["longarina", "cadeira longarina", "banco de espera"],
  },
  {
    icone: "acv-mesa",
    termos: ["mesa", "mesa de trabalho", "mesa de escritorio", "escrivaninha"],
  },
  {
    icone: "acv-mesa-reuniao",
    termos: ["mesa de reuniao", "mesa de conferencia"],
  },
  { icone: "acv-mesa-redonda", termos: ["mesa redonda", "mesa circular"] },
  {
    icone: "acv-mesa-l",
    termos: ["mesa em l", "mesa angular", "estacao em l"],
  },
  {
    icone: "acv-balcao",
    termos: ["balcao de atendimento", "balcao", "guiche"],
  },
  {
    icone: "acv-gaveteiro",
    termos: ["gaveteiro", "gaveteiro volante", "gaveteiro com rodizio"],
  },
  {
    icone: "acv-armario",
    termos: [
      "armario",
      "armario de aco",
      "armario de madeira",
      "armario de escritorio",
    ],
  },
  {
    icone: "acv-arquivo",
    termos: [
      "arquivo de gavetas",
      "arquivo de aco",
      "arquivo com quatro gavetas",
      "arquivo vertical",
    ],
  },
  {
    icone: "acv-estante",
    termos: ["estante", "estante de aco", "estante de livros", "prateleira"],
  },
  {
    icone: "acv-roupeiro",
    termos: ["roupeiro", "armario vestiario", "armario com escaninhos"],
  },
  {
    icone: "acv-armario-baixo",
    termos: ["armario baixo", "armario credenza", "credenza"],
  },
  { icone: "acv-painel", termos: ["divisoria", "biombo", "painel divisorio"] },
  {
    icone: "acv-suporte-monitor",
    termos: [
      "suporte de monitor",
      "braco para monitor",
      "suporte articulado para monitor",
    ],
  },
  {
    icone: "lucide-footprints",
    termos: ["apoio para pes", "descanso para os pes"],
  },
  { icone: "acv-cadeira-giratoria", termos: ["cadeira", "cadeira estofada"] },
  { icone: "acv-cabideiro", termos: ["cabideiro", "porta casacos"] },
  {
    icone: "acv-carteira",
    termos: ["carteira escolar", "conjunto aluno", "mesa e cadeira escolar"],
  },
  {
    icone: "acv-carteira-prancheta",
    termos: [
      "cadeira universitaria",
      "cadeira com prancheta",
      "cadeira com braco de escrever",
    ],
  },
  {
    icone: "acv-mesa-infantil",
    termos: ["mesa infantil", "mesa de educacao infantil"],
  },
  {
    icone: "acv-cadeira-infantil",
    termos: ["cadeira infantil", "cadeirinha escolar"],
  },
  {
    icone: "acv-mesa-professor",
    termos: ["mesa do professor", "mesa de professor"],
  },
  {
    icone: "acv-banco-refeitorio",
    termos: ["mesa de refeitorio", "conjunto de refeitorio"],
  },
  {
    icone: "lucide-presentation",
    termos: [
      "lousa",
      "quadro branco",
      "quadro negro",
      "lousa branca",
      "quadro de giz",
    ],
  },
  {
    icone: "acv-quadro-digital",
    termos: ["lousa digital", "quadro interativo", "quadro digital"],
  },
  {
    icone: "acv-cavalete",
    termos: ["cavalete", "cavalete de pintura", "cavalete escolar"],
  },
  {
    icone: "acv-escaninho",
    termos: ["escaninho", "escaninho escolar", "organizador de alunos"],
  },
  { icone: "acv-trocador", termos: ["trocador infantil", "mesa de troca"] },
  { icone: "acv-berco", termos: ["berco", "berco infantil"] },
  {
    icone: "lucide-bed-single",
    termos: ["cama", "colchonete", "colchao", "colchonete escolar"],
  },
  {
    icone: "acv-tapete",
    termos: ["tapete", "tapete em eva", "tatame", "tapete infantil"],
  },
  {
    icone: "acv-carrinho-livros",
    termos: ["carrinho de livros", "carrinho de biblioteca"],
  },
  {
    icone: "lucide-book-open",
    termos: ["expositor de livros", "suporte de livros"],
  },
  {
    icone: "acv-bancada",
    termos: ["bancada", "bancada de laboratorio", "bancada de trabalho"],
  },
  {
    icone: "acv-painel",
    termos: ["mural de avisos", "quadro de avisos", "painel de cortica"],
  },
  { icone: "lucide-school", termos: ["maquete escolar", "maquete"] },
  {
    icone: "acv-parquinho",
    termos: ["brinquedo de playground", "escorregador", "parquinho"],
  },
  {
    icone: "lucide-computer",
    termos: [
      "computador",
      "computador de mesa",
      "desktop",
      "microcomputador",
      "estacao de trabalho",
    ],
  },
  {
    icone: "lucide-pc-case",
    termos: [
      "gabinete",
      "cpu",
      "torre de computador",
      "gabinete de computador",
    ],
  },
  {
    icone: "lucide-monitor",
    termos: ["monitor", "monitor de computador", "tela de computador"],
  },
  {
    icone: "lucide-laptop",
    termos: ["notebook", "laptop", "computador portatil"],
  },
  { icone: "acv-chromebook", termos: ["chromebook", "notebook educacional"] },
  { icone: "lucide-tablet", termos: ["tablet", "tablet educacional"] },
  {
    icone: "lucide-smartphone",
    termos: ["celular", "smartphone", "telefone celular"],
  },
  {
    icone: "acv-all-in-one",
    termos: ["computador all in one", "all in one", "computador integrado"],
  },
  {
    icone: "lucide-server",
    termos: ["servidor", "servidor de rede", "servidor fisico"],
  },
  {
    icone: "acv-mini-pc",
    termos: ["mini pc", "minicomputador", "thin client"],
  },
  {
    icone: "acv-estacao-carga",
    termos: [
      "carrinho de recarga",
      "estacao de recarga",
      "armario de recarga de tablets",
    ],
  },
  {
    icone: "acv-totem",
    termos: [
      "totem de atendimento",
      "totem digital",
      "terminal de autoatendimento",
    ],
  },
  {
    icone: "acv-leitor-digital",
    termos: [
      "leitor digital",
      "leitor de livros digitais",
      "e reader",
      "kindle",
    ],
  },
  { icone: "lucide-watch", termos: ["relogio inteligente", "smartwatch"] },
  {
    icone: "acv-mesa-digitalizadora",
    termos: ["mesa digitalizadora", "tablet grafico"],
  },
  {
    icone: "acv-microcomputador-placa",
    termos: ["placa raspberry pi", "raspberry pi"],
  },
  {
    icone: "lucide-keyboard",
    termos: ["teclado", "teclado usb", "teclado sem fio"],
  },
  { icone: "lucide-mouse", termos: ["mouse", "mouse usb", "mouse sem fio"] },
  {
    icone: "acv-mousepad",
    termos: ["mousepad", "tapete para mouse", "mouse pad"],
  },
  {
    icone: "lucide-webcam",
    termos: ["webcam", "camera web", "camera de computador"],
  },
  {
    icone: "lucide-headphones",
    termos: ["fone de ouvido", "headphone", "fone"],
  },
  { icone: "lucide-headset", termos: ["headset", "fone com microfone"] },
  {
    icone: "lucide-speaker",
    termos: ["caixa de som", "alto falante", "caixa acustica"],
  },
  {
    icone: "lucide-mic",
    termos: ["microfone", "microfone de mesa", "microfone sem fio"],
  },
  {
    icone: "lucide-printer",
    termos: ["impressora", "impressora laser", "impressora jato de tinta"],
  },
  {
    icone: "acv-multifuncional",
    termos: ["multifuncional", "impressora multifuncional", "copiadora"],
  },
  {
    icone: "lucide-scan-line",
    termos: ["scanner", "digitalizador", "scanner de documentos"],
  },
  {
    icone: "lucide-scan-barcode",
    termos: [
      "leitor de codigo de barras",
      "leitor de codigo",
      "leitor barcode",
    ],
  },
  {
    icone: "lucide-contact",
    termos: [
      "leitor de cartao",
      "leitor de cartoes",
      "leitor de cartao de memoria",
    ],
  },
  { icone: "acv-hub-usb", termos: ["hub usb", "hub", "concentrador usb"] },
  {
    icone: "acv-dock",
    termos: ["dock station", "docking station", "base de conexao"],
  },
  {
    icone: "acv-controle",
    termos: [
      "controle remoto",
      "controle para apresentacao",
      "passador de slides",
    ],
  },
  {
    icone: "lucide-gamepad-2",
    termos: ["controle de videogame", "gamepad", "joystick"],
  },
  {
    icone: "lucide-fingerprint",
    termos: ["leitor biometrico", "leitor de impressao digital", "biometria"],
  },
  {
    icone: "acv-drive-optico",
    termos: ["drive de dvd", "gravador de dvd", "drive optico", "leitor de cd"],
  },
  {
    icone: "acv-suporte-notebook",
    termos: ["suporte de notebook", "base para notebook", "suporte de laptop"],
  },
  { icone: "lucide-router", termos: ["roteador", "roteador wi fi", "router"] },
  {
    icone: "acv-switch",
    termos: ["switch", "switch de rede", "comutador de rede"],
  },
  {
    icone: "acv-access-point",
    termos: ["access point", "ponto de acesso", "ap wi fi"],
  },
  { icone: "acv-modem", termos: ["modem", "modem de internet", "ont", "onu"] },
  {
    icone: "acv-rack",
    termos: ["rack de rede", "rack de ti", "rack de servidor", "rack"],
  },
  {
    icone: "acv-patch-panel",
    termos: ["patch panel", "painel de conexao", "patchpanel"],
  },
  { icone: "acv-firewall", termos: ["firewall", "appliance firewall"] },
  {
    icone: "lucide-wifi",
    termos: ["repetidor de sinal", "repetidor wi fi", "extensor wi fi"],
  },
  {
    icone: "lucide-satellite-dish",
    termos: ["antena", "antena de rede", "antena wi fi"],
  },
  {
    icone: "acv-placa-rede",
    termos: ["placa de rede", "adaptador de rede", "adaptador ethernet"],
  },
  {
    icone: "acv-fibra",
    termos: [
      "conversor de midia",
      "conversor de fibra",
      "modulo sfp",
      "transceiver sfp",
    ],
  },
  {
    icone: "acv-rj45",
    termos: ["conector rj45", "plug rj45", "conector de rede"],
  },
  {
    icone: "acv-tomada-rede",
    termos: ["tomada de rede", "keystone", "espelho de rede"],
  },
  {
    icone: "acv-patch-cord",
    termos: ["patch cord", "cabo de rede", "cabo ethernet", "cabo utp"],
  },
  {
    icone: "acv-fibra",
    termos: ["cabo de fibra optica", "cordao optico", "fibra optica"],
  },
  { icone: "acv-poe", termos: ["injetor poe", "adaptador poe", "fonte poe"] },
  {
    icone: "acv-organizador-rack",
    termos: ["organizador de rack", "guia de cabos", "painel organizador"],
  },
  { icone: "acv-switch", termos: ["switch gerenciavel", "switch poe"] },
  { icone: "acv-nobreak", termos: ["nobreak", "no break", "ups"] },
  {
    icone: "acv-estabilizador",
    termos: ["estabilizador", "estabilizador de tensao"],
  },
  {
    icone: "acv-filtro-linha",
    termos: ["filtro de linha", "regua de tomadas", "regua de energia"],
  },
  {
    icone: "acv-extensao",
    termos: ["extensao eletrica", "cabo extensor", "extensao"],
  },
  {
    icone: "acv-fonte",
    termos: ["fonte de alimentacao", "fonte atx", "fonte de computador"],
  },
  {
    icone: "acv-carregador",
    termos: ["carregador", "carregador de notebook", "carregador de celular"],
  },
  {
    icone: "lucide-battery",
    termos: ["bateria", "bateria de notebook", "bateria recarregavel"],
  },
  {
    icone: "lucide-battery-full",
    termos: ["pilha", "pilha alcalina", "pilha recarregavel"],
  },
  {
    icone: "lucide-plug",
    termos: ["adaptador de tomada", "plugue", "plug de tomada"],
  },
  {
    icone: "acv-tomada",
    termos: ["tomada eletrica", "tomada", "espelho de tomada"],
  },
  {
    icone: "acv-cabo-usb",
    termos: ["cabo usb", "cabo usb c", "cabo micro usb", "cabo lightning"],
  },
  { icone: "acv-cabo-hdmi", termos: ["cabo hdmi", "cabo de video hdmi"] },
  { icone: "acv-cabo-vga", termos: ["cabo vga", "cabo de video vga"] },
  { icone: "acv-cabo-displayport", termos: ["cabo displayport", "cabo dp"] },
  {
    icone: "acv-cabo-audio",
    termos: ["cabo de audio", "cabo p2", "cabo p10", "cabo rca"],
  },
  {
    icone: "acv-cabo-forca",
    termos: ["cabo de forca", "cabo de energia", "cabo tripolar"],
  },
  {
    icone: "acv-adaptador-video",
    termos: [
      "adaptador de video",
      "adaptador hdmi",
      "adaptador vga",
      "conversor de video",
    ],
  },
  {
    icone: "acv-canaleta",
    termos: ["canaleta", "canaleta de cabos", "eletrocalha"],
  },
  {
    icone: "lucide-cable",
    termos: [
      "abracadeira",
      "enforca gato",
      "organizador de cabos",
      "velcro para cabos",
    ],
  },
  {
    icone: "acv-testador-cabos",
    termos: ["testador de cabos", "testador de rede"],
  },
  { icone: "acv-memoria", termos: ["memoria ram", "pente de memoria", "ram"] },
  {
    icone: "lucide-cpu",
    termos: ["processador", "cpu processador", "unidade de processamento"],
  },
  {
    icone: "acv-placa-mae",
    termos: ["placa mae", "motherboard", "placa principal"],
  },
  { icone: "acv-placa-video", termos: ["placa de video", "gpu"] },
  {
    icone: "lucide-hard-drive",
    termos: ["disco rigido", "hd", "hd interno", "disco duro"],
  },
  {
    icone: "acv-ssd",
    termos: ["ssd", "ssd sata", "ssd nvme", "unidade de estado solido"],
  },
  {
    icone: "lucide-hard-drive-download",
    termos: ["hd externo", "disco externo", "ssd externo"],
  },
  { icone: "lucide-usb", termos: ["pen drive", "pendrive", "memoria usb"] },
  {
    icone: "acv-cartao-memoria",
    termos: ["cartao de memoria", "cartao sd", "micro sd"],
  },
  {
    icone: "lucide-disc-3",
    termos: ["cd", "dvd", "midia optica", "disco virgem"],
  },
  {
    icone: "lucide-fan",
    termos: ["cooler", "ventoinha de computador", "cooler de processador"],
  },
  { icone: "lucide-pipette", termos: ["pasta termica"] },
  { icone: "acv-dissipador", termos: ["dissipador", "dissipador de calor"] },
  {
    icone: "acv-bateria-botao",
    termos: ["bateria cmos", "bateria cr2032", "pilha botao"],
  },
  {
    icone: "acv-kit-parafusos",
    termos: ["parafuso de computador", "kit de parafusos", "parafuso"],
  },
  {
    icone: "acv-suporte-hd",
    termos: ["suporte de hd", "case de hd", "gaveta de hd"],
  },
  { icone: "acv-placa-som", termos: ["placa de som", "interface de audio"] },
  { icone: "acv-nas", termos: ["nas", "armazenamento em rede"] },
  {
    icone: "lucide-projector",
    termos: ["projetor", "datashow", "projetor multimidia"],
  },
  {
    icone: "acv-tela-projecao",
    termos: ["tela de projecao", "telao", "tela retratil"],
  },
  { icone: "lucide-tv", termos: ["televisao", "tv", "smart tv", "televisor"] },
  {
    icone: "lucide-camera",
    termos: ["camera fotografica", "maquina fotografica", "camera digital"],
  },
  { icone: "lucide-video", termos: ["filmadora", "camera de video"] },
  {
    icone: "lucide-cctv",
    termos: ["camera de seguranca", "camera ip", "camera de vigilancia"],
  },
  { icone: "acv-gravador", termos: ["gravador de seguranca", "dvr", "nvr"] },
  {
    icone: "lucide-phone",
    termos: ["telefone", "telefone fixo", "aparelho telefonico"],
  },
  {
    icone: "acv-telefone-ip",
    termos: ["telefone ip", "telefone voip", "telefone sip"],
  },
  {
    icone: "lucide-radio-tower",
    termos: ["radio comunicador", "walkie talkie", "radio ht"],
  },
  { icone: "lucide-radio", termos: ["radio", "radio portatil"] },
  {
    icone: "acv-mesa-som",
    termos: ["mesa de som", "mixador de audio", "mesa de audio"],
  },
  {
    icone: "acv-amplificador",
    termos: ["amplificador", "amplificador de som"],
  },
  {
    icone: "acv-tripé",
    termos: ["tripe", "tripe de camera", "suporte de camera"],
  },
  {
    icone: "acv-suporte-tv",
    termos: ["suporte de tv", "suporte para televisao"],
  },
  { icone: "acv-microfone-lapela", termos: ["microfone de lapela", "lapela"] },
  {
    icone: "acv-gravador-audio",
    termos: ["gravador de audio", "gravador digital"],
  },
  {
    icone: "acv-videoconferencia",
    termos: ["equipamento de videoconferencia", "kit de videoconferencia"],
  },
  { icone: "acv-antena-tv", termos: ["antena de tv", "antena de televisao"] },
  { icone: "acv-contraste", termos: ["apontador laser", "ponteira laser"] },
  {
    icone: "lucide-file",
    termos: ["papel a4", "resma de papel", "papel sulfite", "papel"],
  },
  {
    icone: "lucide-files",
    termos: ["papel a3", "papel oficio", "papel timbrado"],
  },
  {
    icone: "lucide-notebook",
    termos: ["caderno", "caderno escolar", "caderno de anotacoes"],
  },
  {
    icone: "lucide-notepad-text",
    termos: ["bloco de notas", "bloco de papel", "bloco adesivo", "post it"],
  },
  { icone: "lucide-pen", termos: ["caneta", "caneta esferografica"] },
  { icone: "lucide-pencil", termos: ["lapis", "lapis grafite"] },
  {
    icone: "lucide-highlighter",
    termos: ["marca texto", "marcador de texto", "caneta marca texto"],
  },
  { icone: "lucide-eraser", termos: ["borracha", "borracha escolar"] },
  { icone: "acv-apontador", termos: ["apontador", "apontador de lapis"] },
  { icone: "lucide-ruler", termos: ["regua", "regua escolar"] },
  { icone: "lucide-scissors", termos: ["tesoura", "tesoura escolar"] },
  { icone: "acv-estilete", termos: ["estilete", "lamina de estilete"] },
  { icone: "acv-grampeador", termos: ["grampeador", "grampeador de mesa"] },
  { icone: "acv-grampo", termos: ["grampo", "grampo para grampeador"] },
  {
    icone: "lucide-paperclip",
    termos: ["clipe", "clipes", "clips", "clipe de papel"],
  },
  {
    icone: "acv-perfurador",
    termos: ["perfurador de papel", "furador de papel"],
  },
  { icone: "acv-cola", termos: ["cola", "cola branca", "cola bastao"] },
  {
    icone: "acv-fita",
    termos: ["fita adesiva", "fita crepe", "fita dupla face", "durex"],
  },
  {
    icone: "acv-porta-fita",
    termos: ["suporte de fita adesiva", "porta durex", "dispensador de fita"],
  },
  {
    icone: "lucide-folder",
    termos: ["pasta", "pasta plastica", "pasta de documentos"],
  },
  {
    icone: "lucide-folder-open",
    termos: ["pasta suspensa", "pasta sanfonada", "pasta catalogo"],
  },
  {
    icone: "lucide-mail",
    termos: ["envelope", "envelope pardo", "envelope oficio"],
  },
  {
    icone: "lucide-tag",
    termos: ["etiqueta", "etiqueta adesiva", "etiqueta patrimonial"],
  },
  { icone: "acv-carimbo", termos: ["carimbo", "carimbo datador"] },
  {
    icone: "acv-almofada",
    termos: ["almofada de carimbo", "refil de carimbo"],
  },
  {
    icone: "lucide-calculator",
    termos: ["calculadora", "calculadora de mesa"],
  },
  { icone: "lucide-clipboard", termos: ["prancheta", "prancheta de apoio"] },
  { icone: "lucide-calendar", termos: ["agenda", "calendario de mesa"] },
  {
    icone: "acv-porta-canetas",
    termos: ["porta canetas", "organizador de mesa"],
  },
  {
    icone: "acv-bandeja-papel",
    termos: ["bandeja de documentos", "caixa de correspondencia"],
  },
  { icone: "acv-plastificadora", termos: ["plastificadora", "laminadora"] },
  {
    icone: "acv-guilhotina",
    termos: ["guilhotina de papel", "cortador de papel"],
  },
  {
    icone: "acv-fragmentadora",
    termos: ["fragmentadora", "triturador de papel"],
  },
  {
    icone: "acv-encadernadora",
    termos: ["encadernadora", "maquina de encadernacao"],
  },
  { icone: "acv-espiral", termos: ["espiral de encadernacao", "espiral"] },
  {
    icone: "acv-prendedor",
    termos: ["prendedor de papel", "clipe binder", "prendedor metalico"],
  },
  { icone: "acv-toner", termos: ["toner", "cartucho de toner"] },
  { icone: "acv-cartucho", termos: ["cartucho", "cartucho de tinta"] },
  {
    icone: "acv-tinta",
    termos: ["tinta de impressora", "refil de tinta", "tinta para impressora"],
  },
  {
    icone: "acv-cilindro",
    termos: ["cilindro de impressora", "unidade de imagem", "fotocondutor"],
  },
  {
    icone: "acv-ribbon",
    termos: ["ribbon", "fita ribbon", "fita de impressora"],
  },
  { icone: "acv-bobina", termos: ["bobina de papel", "bobina termica"] },
  {
    icone: "acv-etiquetadora",
    termos: ["rotulador", "etiquetadora", "impressora de etiquetas"],
  },
  {
    icone: "acv-filamento",
    termos: ["filamento de impressora 3d", "filamento pla", "filamento abs"],
  },
  {
    icone: "acv-impressora-3d",
    termos: ["impressora 3d", "impressora tridimensional"],
  },
  {
    icone: "lucide-book",
    termos: ["livro", "livro didatico", "livro paradidatico"],
  },
  {
    icone: "lucide-book-open-text",
    termos: ["dicionario", "enciclopedia", "atlas"],
  },
  { icone: "lucide-newspaper", termos: ["revista", "jornal", "periodico"] },
  {
    icone: "lucide-notebook-tabs",
    termos: ["apostila", "material apostilado", "apostila escolar"],
  },
  {
    icone: "lucide-book-marked",
    termos: ["livro de literatura", "livro literario"],
  },
  {
    icone: "acv-livro-infantil",
    termos: ["livro infantil", "livro de historias"],
  },
  { icone: "lucide-globe", termos: ["globo terrestre", "globo escolar"] },
  { icone: "lucide-map", termos: ["mapa", "mapa escolar", "mapa geografico"] },
  { icone: "acv-abaco", termos: ["abaco", "abaco escolar"] },
  {
    icone: "acv-material-dourado",
    termos: ["material dourado", "blocos de base dez"],
  },
  { icone: "lucide-shapes", termos: ["blocos logicos", "formas geometricas"] },
  { icone: "lucide-puzzle", termos: ["quebra cabeca", "puzzle"] },
  {
    icone: "lucide-toy-brick",
    termos: ["blocos de montar", "pecas de montar", "brinquedo de encaixe"],
  },
  {
    icone: "lucide-dices",
    termos: ["jogo de tabuleiro", "jogo pedagogico", "dados", "domino"],
  },
  {
    icone: "acv-xadrez",
    termos: ["xadrez", "jogo de xadrez", "tabuleiro de xadrez"],
  },
  {
    icone: "acv-alfabeto",
    termos: ["alfabeto movel", "letras moveis", "alfabeto"],
  },
  { icone: "acv-numeros", termos: ["numeros moveis", "kit de numeros"] },
  {
    icone: "acv-regua-geometrica",
    termos: ["kit geometrico", "esquadro", "transferidor"],
  },
  { icone: "lucide-compass", termos: ["compasso", "compasso escolar"] },
  { icone: "acv-fantoche", termos: ["fantoche", "teatro de fantoches"] },
  { icone: "acv-boneca", termos: ["boneca", "boneco", "brinquedo boneco"] },
  {
    icone: "acv-carrinho",
    termos: ["carrinho de brinquedo", "carro de brinquedo"],
  },
  { icone: "acv-pelucia", termos: ["bicho de pelucia", "pelucia"] },
  { icone: "acv-massinha", termos: ["massa de modelar", "massinha"] },
  { icone: "acv-tinta", termos: ["tinta guache", "guache", "tinta acrilica"] },
  { icone: "lucide-paintbrush", termos: ["pincel", "pincel escolar"] },
  { icone: "lucide-palette", termos: ["paleta de pintura", "kit de pintura"] },
  {
    icone: "acv-lapis-cor",
    termos: ["lapis de cor", "giz de cera", "canetinha", "canetas hidrocor"],
  },
  {
    icone: "acv-cartolina",
    termos: [
      "cartolina",
      "papel cartao",
      "papel colorido",
      "papel crepom",
      "eva",
    ],
  },
  {
    icone: "acv-quadro-digital",
    termos: ["mesa interativa", "mesa digital interativa"],
  },
  {
    icone: "lucide-bot",
    termos: ["kit de robotica", "robo educacional", "robotica educacional"],
  },
  {
    icone: "lucide-circuit-board",
    termos: ["placa arduino", "arduino", "microcontrolador"],
  },
  {
    icone: "acv-kit-ciencias",
    termos: ["kit de ciencias", "kit de experimentos"],
  },
  {
    icone: "lucide-microscope",
    termos: ["microscopio", "microscopio escolar"],
  },
  { icone: "lucide-telescope", termos: ["telescopio", "luneta"] },
  {
    icone: "lucide-test-tubes",
    termos: ["tubo de ensaio", "kit de tubos de ensaio"],
  },
  {
    icone: "lucide-flask-conical",
    termos: ["erlenmeyer", "frasco erlenmeyer"],
  },
  { icone: "lucide-beaker", termos: ["bequer", "bequer graduado"] },
  { icone: "lucide-pipette", termos: ["pipeta", "conta gotas"] },
  {
    icone: "lucide-thermometer",
    termos: ["termometro", "termometro de laboratorio"],
  },
  {
    icone: "lucide-weight",
    termos: ["balanca", "balanca de precisao", "balanca digital"],
  },
  { icone: "acv-proveta", termos: ["proveta", "cilindro graduado"] },
  { icone: "acv-funil", termos: ["funil", "funil de laboratorio"] },
  { icone: "acv-placa-petri", termos: ["placa de petri", "placa petri"] },
  { icone: "acv-lamina", termos: ["lamina de microscopio", "laminula"] },
  { icone: "lucide-magnet", termos: ["ima", "ima escolar", "magneto"] },
  { icone: "acv-lupa", termos: ["lupa", "lupa de bancada"] },
  {
    icone: "acv-esqueleto",
    termos: ["modelo de esqueleto", "esqueleto anatomico"],
  },
  { icone: "acv-kit-ciencias", termos: ["modelo anatomico", "kit anatomico"] },
  {
    icone: "acv-oculos",
    termos: ["oculos de protecao", "oculos de laboratorio"],
  },
  {
    icone: "acv-luva",
    termos: ["luva", "luva descartavel", "luva de procedimento"],
  },
  {
    icone: "lucide-volleyball",
    termos: ["bola", "bola de volei", "bola de futebol", "bola de basquete"],
  },
  {
    icone: "acv-cone",
    termos: ["cone", "cone esportivo", "cone de sinalizacao"],
  },
  { icone: "acv-bambole", termos: ["bambole", "arco de ginastica"] },
  { icone: "acv-corda", termos: ["corda", "corda de pular"] },
  {
    icone: "acv-rede",
    termos: ["rede esportiva", "rede de volei", "rede de futebol"],
  },
  {
    icone: "acv-raquete",
    termos: ["raquete", "raquete de tenis", "raquete de tenis de mesa"],
  },
  {
    icone: "acv-mesa-pingpong",
    termos: ["mesa de ping pong", "mesa de tenis de mesa"],
  },
  {
    icone: "lucide-dumbbell",
    termos: ["halter", "peso de ginastica", "halteres"],
  },
  {
    icone: "acv-colchonete",
    termos: ["colchonete de ginastica", "tapete de exercicio"],
  },
  { icone: "acv-trave", termos: ["trave de futebol", "gol de futebol"] },
  {
    icone: "lucide-guitar",
    termos: ["violao", "guitarra", "instrumento de cordas"],
  },
  {
    icone: "lucide-piano",
    termos: ["teclado musical", "piano digital", "piano"],
  },
  { icone: "lucide-drum", termos: ["tambor", "surdo", "caixa de percussao"] },
  { icone: "acv-flauta", termos: ["flauta", "flauta doce"] },
  { icone: "acv-pandeiro", termos: ["pandeiro", "tamborim"] },
  {
    icone: "acv-chocalho",
    termos: ["chocalho", "maraca", "instrumento de percussao"],
  },
  {
    icone: "lucide-music",
    termos: ["estante de partituras", "partitura", "instrumento musical"],
  },
  {
    icone: "acv-fantasia",
    termos: ["fantasia", "figurino", "roupa de apresentacao"],
  },
  { icone: "lucide-paintbrush", termos: ["tela de pintura", "tela artistica"] },
  { icone: "acv-teatro", termos: ["teatro de fantoche", "palco portatil"] },
  {
    icone: "acv-cadeira-rodas",
    termos: ["cadeira de rodas", "cadeira de rodas manual"],
  },
  { icone: "acv-andador", termos: ["andador", "andador de apoio"] },
  { icone: "acv-bengala", termos: ["bengala", "muleta"] },
  {
    icone: "lucide-ear",
    termos: ["aparelho auditivo", "amplificador auditivo"],
  },
  {
    icone: "acv-braille",
    termos: ["maquina braille", "reglete", "puncao braille", "linha braille"],
  },
  { icone: "acv-lupa", termos: ["lupa eletronica", "ampliador de texto"] },
  {
    icone: "acv-comunicador",
    termos: [
      "comunicador alternativo",
      "prancha de comunicacao",
      "comunicacao alternativa",
    ],
  },
  {
    icone: "acv-cadeira-adaptada",
    termos: ["cadeira adaptada", "cadeira postural"],
  },
  {
    icone: "acv-mesa-regulavel",
    termos: ["mesa regulavel", "mesa adaptada", "mesa acessivel"],
  },
  {
    icone: "acv-abafador",
    termos: ["abafador de ruido", "protetor auricular"],
  },
  {
    icone: "acv-teclado-adaptado",
    termos: ["teclado adaptado", "teclado ampliado"],
  },
  {
    icone: "lucide-mouse-pointer",
    termos: ["mouse adaptado", "acionador acessivel"],
  },
  { icone: "lucide-refrigerator", termos: ["geladeira", "refrigerador"] },
  { icone: "acv-freezer", termos: ["freezer", "congelador"] },
  { icone: "lucide-microwave", termos: ["micro ondas", "microondas"] },
  { icone: "acv-fogao", termos: ["fogao", "fogao industrial"] },
  { icone: "acv-forno", termos: ["forno", "forno eletrico"] },
  {
    icone: "acv-liquidificador",
    termos: ["liquidificador", "liquidificador industrial"],
  },
  { icone: "acv-batedeira", termos: ["batedeira", "misturador de alimentos"] },
  { icone: "lucide-coffee", termos: ["cafeteira", "maquina de cafe"] },
  { icone: "acv-chaleira", termos: ["chaleira", "chaleira eletrica"] },
  {
    icone: "acv-bebedouro",
    termos: ["bebedouro", "purificador de agua", "filtro de agua"],
  },
  {
    icone: "acv-garrafa-termica",
    termos: ["garrafa termica", "garrafa de cafe"],
  },
  {
    icone: "lucide-cooking-pot",
    termos: ["panela", "panela de pressao", "caldeirao"],
  },
  {
    icone: "lucide-utensils",
    termos: ["talher", "garfo", "colher", "faca de mesa", "talheres"],
  },
  { icone: "acv-prato", termos: ["prato", "prato de refeicao"] },
  {
    icone: "lucide-glass-water",
    termos: ["copo", "caneca", "copo descartavel"],
  },
  { icone: "acv-garrafa", termos: ["garrafa", "squeeze", "garrafa de agua"] },
  { icone: "acv-bandeja", termos: ["bandeja", "bandeja de alimentacao"] },
  {
    icone: "acv-pote",
    termos: ["pote", "recipiente plastico", "caixa de alimentos"],
  },
  { icone: "acv-escorredor", termos: ["escorredor de louca", "escorredor"] },
  { icone: "acv-tabua", termos: ["tabua de corte", "tabua de alimentos"] },
  { icone: "acv-faca", termos: ["faca de cozinha", "faca de corte"] },
  {
    icone: "acv-balanca-cozinha",
    termos: ["balanca de cozinha", "balanca de alimentos"],
  },
  {
    icone: "acv-carrinho-servico",
    termos: ["carrinho de servico", "carrinho de refeicao"],
  },
  { icone: "lucide-milk", termos: ["leite", "leite em po"] },
  {
    icone: "lucide-package",
    termos: [
      "arroz",
      "feijao",
      "macarrao",
      "acucar",
      "sal",
      "farinha",
      "alimento embalado",
    ],
  },
  { icone: "acv-oleo", termos: ["oleo de cozinha", "oleo alimentar"] },
  { icone: "acv-vassoura", termos: ["vassoura", "vassourao"] },
  { icone: "acv-rodo", termos: ["rodo", "rodo de limpeza"] },
  { icone: "acv-pa-lixo", termos: ["pa de lixo", "pa coletora"] },
  { icone: "acv-mop", termos: ["mop", "esfregao"] },
  { icone: "acv-balde", termos: ["balde", "balde de limpeza"] },
  {
    icone: "lucide-trash-2",
    termos: ["lixeira", "cesto de lixo", "coletor de residuos"],
  },
  { icone: "lucide-recycle", termos: ["lixeira seletiva", "coletor seletivo"] },
  {
    icone: "acv-carrinho-limpeza",
    termos: ["carrinho de limpeza", "carro funcional"],
  },
  {
    icone: "acv-pano",
    termos: ["pano", "pano de chao", "flanela", "microfibra"],
  },
  { icone: "acv-esponja", termos: ["esponja", "esponja de limpeza"] },
  {
    icone: "lucide-spray-can",
    termos: [
      "alcool",
      "alcool em gel",
      "limpa telas",
      "limpa contato",
      "limpador em spray",
    ],
  },
  {
    icone: "acv-detergente",
    termos: [
      "detergente",
      "desinfetante",
      "agua sanitaria",
      "produto de limpeza",
    ],
  },
  { icone: "acv-sabao", termos: ["sabao", "sabonete", "sabonete liquido"] },
  {
    icone: "acv-papel-higienico",
    termos: ["papel higienico", "rolo de papel higienico"],
  },
  { icone: "acv-papel-toalha", termos: ["papel toalha", "toalha de papel"] },
  {
    icone: "acv-dispensador",
    termos: ["dispenser", "dispensador de sabonete", "dispenser de alcool"],
  },
  { icone: "acv-saco-lixo", termos: ["saco de lixo", "saco para residuos"] },
  { icone: "acv-aspirador", termos: ["aspirador", "aspirador de po"] },
  {
    icone: "lucide-washing-machine",
    termos: ["maquina de lavar", "lavadora de roupas"],
  },
  { icone: "acv-enceradeira", termos: ["enceradeira", "politriz de piso"] },
  { icone: "acv-escova", termos: ["escova", "escova de limpeza"] },
  { icone: "acv-luva", termos: ["luva de limpeza", "luva de borracha"] },
  { icone: "lucide-air-vent", termos: ["ar condicionado", "climatizador"] },
  {
    icone: "lucide-fan",
    termos: ["ventilador", "ventilador de mesa", "ventilador de parede"],
  },
  { icone: "acv-exaustor", termos: ["exaustor", "exaustor de ambiente"] },
  { icone: "lucide-heater", termos: ["aquecedor", "aquecedor eletrico"] },
  { icone: "lucide-lamp-desk", termos: ["luminaria de mesa", "abajur"] },
  { icone: "lucide-lightbulb", termos: ["lampada", "lampada led"] },
  {
    icone: "acv-luminaria",
    termos: ["luminaria de teto", "luminaria led", "refletor led"],
  },
  { icone: "lucide-clock", termos: ["relogio de parede", "relogio"] },
  { icone: "acv-cortina", termos: ["cortina", "persiana"] },
  { icone: "acv-escada", termos: ["escada", "escada portatil"] },
  { icone: "lucide-key-round", termos: ["chave", "chave de porta"] },
  { icone: "lucide-lock-keyhole", termos: ["cadeado", "fechadura"] },
  { icone: "acv-porta", termos: ["porta", "porta de madeira"] },
  { icone: "acv-janela", termos: ["janela", "janela de vidro"] },
  { icone: "acv-torneira", termos: ["torneira", "misturador de agua"] },
  { icone: "acv-cano", termos: ["cano", "tubo pvc", "tubo hidraulico"] },
  {
    icone: "acv-tinta-parede",
    termos: ["tinta de parede", "tinta de manutencao"],
  },
  {
    icone: "lucide-paint-roller",
    termos: ["rolo de pintura", "rolo para parede"],
  },
  {
    icone: "acv-carrinho-carga",
    termos: ["carrinho de carga", "carrinho de transporte"],
  },
  { icone: "acv-palete", termos: ["palete", "pallet", "estrado"] },
  {
    icone: "lucide-package",
    termos: ["caixa", "caixa de papelao", "caixa organizadora"],
  },
  {
    icone: "acv-caixa-plastica",
    termos: ["caixa plastica", "contentor plastico", "caixa empilhavel"],
  },
  { icone: "lucide-drill", termos: ["furadeira", "parafusadeira"] },
  { icone: "lucide-hammer", termos: ["martelo", "martelo de unha"] },
  {
    icone: "lucide-wrench",
    termos: ["chave de boca", "chave inglesa", "chave combinada"],
  },
  {
    icone: "acv-chave-fenda",
    termos: ["chave de fenda", "chave phillips", "chave philips"],
  },
  {
    icone: "acv-alicate",
    termos: ["alicate", "alicate de corte", "alicate universal"],
  },
  {
    icone: "acv-alicate-crimpar",
    termos: ["alicate de crimpar", "crimpador rj45"],
  },
  { icone: "acv-multimetro", termos: ["multimetro", "multimetro digital"] },
  { icone: "acv-ferro-solda", termos: ["ferro de solda", "estacao de solda"] },
  { icone: "acv-solda", termos: ["estanho para solda", "fio de solda"] },
  { icone: "acv-fita-metrica", termos: ["trena", "fita metrica"] },
  { icone: "acv-nivel", termos: ["nivel de bolha", "nivel de construcao"] },
  { icone: "acv-serra", termos: ["serra", "serrote", "arco de serra"] },
  { icone: "acv-lixa", termos: ["lixa", "lixa de madeira"] },
  { icone: "acv-broca", termos: ["broca", "kit de brocas"] },
  {
    icone: "acv-parafuso",
    termos: ["parafuso de manutencao", "bucha de parede", "porca", "arruela"],
  },
  {
    icone: "acv-caixa-ferramentas",
    termos: ["caixa de ferramentas", "maleta de ferramentas"],
  },
  { icone: "acv-lanterna", termos: ["lanterna", "lanterna de inspecao"] },
  { icone: "acv-fita-isolante", termos: ["fita isolante", "fita eletrica"] },
  { icone: "acv-oleo", termos: ["oleo lubrificante", "lubrificante"] },
  {
    icone: "lucide-fire-extinguisher",
    termos: ["extintor", "extintor de incendio"],
  },
  { icone: "acv-mangueira", termos: ["mangueira de incendio", "mangueira"] },
  { icone: "lucide-siren", termos: ["alarme", "alarme de incendio", "sirene"] },
  {
    icone: "lucide-alarm-smoke",
    termos: ["detector de fumaca", "detector de incendio"],
  },
  {
    icone: "acv-luz-emergencia",
    termos: ["luz de emergencia", "luminaria de emergencia"],
  },
  { icone: "acv-capacete", termos: ["capacete", "capacete de seguranca"] },
  { icone: "acv-colete", termos: ["colete", "colete refletivo"] },
  {
    icone: "acv-mascara",
    termos: ["mascara", "mascara pff2", "mascara descartavel"],
  },
  { icone: "acv-oculos", termos: ["oculos de seguranca", "oculos epi"] },
  { icone: "acv-bota", termos: ["bota", "calcado de seguranca"] },
  {
    icone: "lucide-briefcase-medical",
    termos: ["kit de primeiros socorros", "maleta de primeiros socorros"],
  },
  { icone: "acv-curativo", termos: ["curativo", "esparadrapo", "bandagem"] },
  {
    icone: "lucide-stethoscope",
    termos: ["estetoscopio", "aparelho de ausculta"],
  },
  {
    icone: "acv-medidor-pressao",
    termos: ["medidor de pressao", "aparelho de pressao", "esfigmomanometro"],
  },
  {
    icone: "lucide-thermometer",
    termos: ["termometro clinico", "termometro infravermelho"],
  },
  { icone: "acv-maca", termos: ["maca", "maca de atendimento"] },
  {
    icone: "acv-tesoura-medica",
    termos: ["tesoura de primeiros socorros", "tesoura medica"],
  },
];

const journey = {
  maxStage: 1,
  draftStage: 1,
  movementId: null,
  movementReceipt: "",
  browseScroll: 0,
  dashboardRoom: "",
  dashboardChart: "rooms",
  lastFiche: null,
};

const $ = (id) => document.getElementById(id);

const ROOMS = ["Sala Principal", "Sala da Gerência", "Almoxarifado"];

const CATEGORIES = ["Móvel", "Tecnologia", "Material"];

const TYPE = {
  PMC: "Patrimônio PMC",
  ICI: "Etiqueta ICI",
  SEM_IDENTIFICACAO: "Sem identificação",
};

const STATUS = {
  ATIVO: "Ativo",
  EMPRESTADO: "Emprestado",
  BAIXADO: "Descartado",
  ARQUIVADO: "Arquivado",
};

const ACTION = {
  emprestar: "Emprestar",
  devolver: "Registrar devolução",
  entrada: "Entrada de estoque",
  saida: "Saída de estoque",
  descarte_estoque: "Descartar quantidade",
  baixar: "Registrar descarte",
  estornar: "Reverter descarte",
  arquivar: "Arquivar",
  restaurar: "Restaurar",
};

const CATEGORY_ICON = {
  Móvel: "furniture",
  Tecnologia: "technology",
  Material: "materials",
};

const ROOM_ICON = {
  "Sala Principal": "room",
  "Sala da Gerência": "management",
  Almoxarifado: "shelf",
};

const TYPE_ICON = {
  PMC: "pmc",
  ICI: "ici",
  SEM_IDENTIFICACAO: "none",
};

const ACTION_ICON = {
  emprestar: "loan",
  devolver: "return",
  entrada: "stock-in",
  saida: "stock-out",
  descarte_estoque: "discard",
  baixar: "writeoff",
  estornar: "reverse",
  arquivar: "archive",
  restaurar: "restore",
};

const ZONE = "America/Sao_Paulo";

const AUTH_KEY = "sb-yipfkwxhpahpuiizkcny-auth-token";

const REMEMBER_KEY = "acervo:manter-conectado";

const authMemory = new Map();

let rememberSession =
  !authRead("sessionStorage", AUTH_KEY) &&
  authRead("localStorage", REMEMBER_KEY) === "sim";

const authStorage = {
  getItem(key) {
    try {
      return window[
        rememberSession ? "localStorage" : "sessionStorage"
      ].getItem(key);
    } catch {
      return authMemory.get(key) ?? null;
    }
  },
  setItem(key, value) {
    authMemory.set(key, value);
    try {
      window[rememberSession ? "localStorage" : "sessionStorage"].setItem(
        key,
        value,
      );
    } catch {}
    authRemove(rememberSession ? "sessionStorage" : "localStorage", key);
  },
  removeItem(key) {
    authMemory.delete(key);
    authRemove("localStorage", key);
    authRemove("sessionStorage", key);
  },
};

const db = window.supabase?.createClient(
  "https://yipfkwxhpahpuiizkcny.supabase.co",
  "sb_publishable_WSiEY5i1VJfNoAZ_KwUp8Q_HkmeMdlI",
  {
    auth: {
      storage: authStorage,
      storageKey: AUTH_KEY,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  },
);

let user = null,
  role = "leitor",
  rows = [],
  checks = [],
  busy = false,
  pending = null,
  page = 1,
  expanded = null,
  editor = null;

let action = "",
  selected = null,
  scene = null,
  refreshTask = null,
  pollTimer = null,
  toastTimer,
  lastSnapshot = "",
  lastSuccess = null;

let learnedKey = "",
  manual = {
    categoria: false,
    tipo: false,
    controle: false,
  },
  scanTarget = "code";

let barcodeWorker = null,
  barcodeTask = null,
  ocrPromise = null,
  ocrBusy = false,
  barcodeBusy = false;

let filters = {
  controle: "",
  ambiente: "",
  categoria: "",
  tipo: "",
  situacao: "",
  estante: "",
  prateleira: "",
  dia: "",
  item: "",
};

const internal = (id) => "ACV-" + String(id).padStart(5, "0");

const clean = (s) =>
  String(s || "")
    .trim()
    .replace(/\s+/g, " ");

const key = (s) =>
  clean(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const shortEmail = (s) =>
  String(s || "")
    .split("@")[0]
    .toLocaleUpperCase("pt-BR");

const value = (name) =>
  document.querySelector('[name="' + name + '"]:checked')?.value || "";

const type = () => value("type");

const dateBR = (v) =>
  v
    ? new Intl.DateTimeFormat("pt-BR", {
        timeZone: ZONE,
        dateStyle: "short",
        timeStyle: "medium",
      }).format(new Date(v))
    : "";

const dayKey = (v) => {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .formatToParts(new Date(v))
      .map((x) => [x.type, x.value]),
  );
  return p.year + "-" + p.month + "-" + p.day;
};

const today = () => dayKey(new Date());

let acervoSyncGeneration = 0;

const CONTROL = [
  ["INDIVIDUAL", "Individual", "individual"],
  ["QUANTIDADE", "Por quantidade", "stock"],
];

let editBaseline = "";

let timelineGeneration = 0;

const timelineCache = new Map();

let deletionTarget = null,
  deletionKey = null,
  deletionSaving = false;

const IS_DEMO = document.body.dataset.demo === "true";

const PASSWORD_SYMBOLS = "!@#$%^&*()_+-=[]{};'\":\\|<>?,./`~";

let passwordChanging = false,
  accessSaving = false,
  firstAccessSaved = false;

let demoPeople = null;

const PEOPLE_ROLES = {
  leitor: "Leitor",
  editor: "Operador",
  admin: "Administrador",
};

let accessMode = "list",
  peopleRows = [],
  peoplePage = 1,
  peopleTotal = 0,
  peopleLimit = 30,
  peopleRequest = 0,
  peopleSearchTimer = null,
  profileTarget = null,
  deleteTarget = null;

const pause = (ms) => new Promise((r) => setTimeout(r, ms));

function authRead(store, key) {
  try {
    return window[store].getItem(key);
  } catch {
    return null;
  }
}

function authRemove(store, key) {
  try {
    window[store].removeItem(key);
  } catch {}
}

function chooseSessionStorage(remember) {
  const saved = authStorage.getItem(AUTH_KEY);
  rememberSession = remember;
  try {
    localStorage.setItem(REMEMBER_KEY, remember ? "sim" : "nao");
  } catch {}
  if (saved) authStorage.setItem(AUTH_KEY, saved);
}

function nextInternalPreview() {
  if (!lastSuccess && !rows.length) return "";
  const last = rows.reduce((max, row) => {
    const id = Number(row.id);
    return Number.isSafeInteger(id) && id > max ? id : max;
  }, 0);
  return Number.isSafeInteger(last + 1) ? internal(last + 1) : "";
}

function el(tag, text, cls) {
  const n = document.createElement(tag);
  if (text !== undefined) n.textContent = text;
  if (cls) n.className = cls;
  return n;
}

function icon(name) {
  const n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  n.setAttribute("class", "icon");
  n.setAttribute("viewBox", "0 0 24 24");
  n.setAttribute("aria-hidden", "true");
  const u = document.createElementNS(n.namespaceURI, "use");
  u.setAttribute("href", "#i-" + name);
  n.append(u);
  return n;
}

function acervoBooks(settled = false) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "acervo-books" + (settled ? " is-settled" : ""));
  svg.setAttribute("viewBox", "0 0 72 54");
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML =
    '<g fill="currentColor" fill-opacity=".09" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><g class="acervo-book"><rect x="10" y="23" width="13" height="24" rx="2.8"/><path d="M14 29h5M14 33h5"/></g><g class="acervo-book"><rect x="29" y="13" width="13" height="34" rx="2.8"/><path d="M33 19h5M33 23h5M33 27h5"/></g><g class="acervo-book"><rect x="48" y="18" width="13" height="29" rx="2.8"/><path d="M52 24h5M52 28h5"/></g><path d="M7 50h57" fill="none"/></g>';
  return svg;
}

function acervoLoader(message, compact = false) {
  const loader = el(
    "div",
    undefined,
    "acervo-loader" + (compact ? " compact" : ""),
  );
  loader.setAttribute("role", "status");
  loader.append(acervoBooks(), el("span", message));
  return loader;
}

function acervoEmpty(title, description) {
  const state = el("div", undefined, "acervo-empty");
  state.append(acervoBooks(true), el("strong", title), el("p", description));
  return state;
}

function syncFieldIdentity(root = document) {
  root
    .querySelectorAll(
      '#register input:not([type="radio"]):not([type="checkbox"]):not([type="hidden"]), #register textarea, #editFields input:not([type="radio"]):not([type="checkbox"]):not([type="hidden"]), #editFields textarea, #userAccessDialog input:not([type="radio"]):not([type="hidden"])',
    )
    .forEach((n) => {
      n.dataset.acervoFilled = String(!!String(n.value).trim());
    });
}

function setAcervoSync(
  active,
  message = "Vamos ver o que mudou por aqui.",
  opening = false,
  token = null,
) {
  if (!active && token !== null && token !== acervoSyncGeneration) return;
  const generation = ++acervoSyncGeneration;
  const b = $("refresh");
  b.classList.toggle("is-syncing", active);
  b.setAttribute("aria-busy", String(active));
  b.disabled = active || busy;
  b.querySelector(":scope > .acervo-books")?.remove();
  if (active) b.prepend(acervoBooks());
  $("acervoOpening").hidden = !active;
  if (active) {
    const loader = acervoLoader(message);
    if (opening) {
      const text = loader.lastElementChild;
      const title = el("strong", "Seu acervo está chegando.");
      text.prepend(title);
    }
    $("acervoOpening").replaceChildren(loader);
  } else $("acervoOpening").replaceChildren();
  return generation;
}

function showAcervoReceipt(record, template) {
  if (mobileAcervo()) return mobileReceipt(record, template);
  const discarded = record.situacao === "BAIXADO",
    saved = $("saved");
  const row = el("div", undefined, "acervo-receipt"),
    place = el("div", undefined, "receipt-place"),
    card = el("div", undefined, "receipt-card"),
    copy = el("div", undefined, "receipt-copy");
  place.setAttribute("aria-hidden", "true");
  card.append(icon(discarded ? "discard" : "record-add"), el("i"));
  place.append(card);
  copy.append(
    el(
      "strong",
      discarded ? "Descarte registrado." : "Pronto. Mais um bem no seu lugar.",
    ),
    el("p", internal(record.id) + " · " + record.dados.item),
    el(
      "small",
      [record.dados.ambiente, locationText(record)].filter(Boolean).join(" · "),
    ),
  );
  row.append(place, copy);
  saved.classList.toggle("is-discarded", discarded);
  saved.replaceChildren(
    row,
    button(
      "Cadastrar outro igual",
      () => repeatRegistration(template),
      "",
      "copy",
    ),
  );
  if (mobileAcervo()) {
    saved.append(
      button(
        "Cadastrar outro neste local",
        () => {
          resetForm();
          for (const [name, field] of [
            ["room", "ambiente"],
            ["shelf", "estante"],
            ["level", "prateleira"],
          ])
            setChoice(name, template[field]);
          syncForm();
          saved.hidden = true;
          saveDraft();
          registrationStage(2);
        },
        "primary",
        "record-add",
      ),
    );
    saved.append(
      button(
        "Ver item",
        () => {
          query({ situacao: "TODOS" });
          expanded = record.id;
          const position = filtered().findIndex(
            (item) => item.id === record.id,
          );
          if (position >= 0) page = Math.floor(position / 25) + 1;
          renderList();
        },
        "",
        "search",
      ),
    );
    saved.append(
      button(
        "Novo local",
        () => {
          saved.hidden = true;
          setChoice("shelf", "");
          setChoice("level", "");
          syncLocation();
          registrationStage(1);
        },
        "",
        "pin",
      ),
    );
  }
  saved.hidden = false;
  if (mobileAcervo())
    saved.scrollIntoView({ block: "center", behavior: "smooth" });
}

function labelButton(n, text, name) {
  n.replaceChildren();
  const loading = /[…]|\.\.\.$/.test(text) && ["clock", "lock"].includes(name);
  n.classList.toggle("has-books-loader", loading);
  n.setAttribute("aria-busy", String(loading));
  if (loading) n.append(acervoBooks());
  else if (name) n.append(icon(name));
  n.append(document.createTextNode(text));
}

function setHelpHint(n, text, name) {
  const cue = icon(name);
  cue.classList.add("help-cue");
  n.classList.add("help-hint");
  n.replaceChildren(el("span", text), cue);
}

function button(text, fn, cls = "", name = "") {
  const n = el("button", undefined, cls);
  n.type = "button";
  labelButton(n, text, name);
  n.onclick = fn;
  return n;
}

function toast(text, error = false) {
  const activeDialog = [...document.querySelectorAll("dialog[open]")].at(-1);
  (activeDialog || document.body).append($("toast"));
  $("toast").replaceChildren(
    error ? icon("warning") : acervoBooks(true),
    el("span", text),
  );
  $("toast").className = "toast" + (error ? " error" : "");
  $("toast").hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ($("toast").hidden = true), 6000);
}

function storage(name, data) {
  try {
    if (!user?.id) return arguments.length === 1 ? null : false;
    const k = "acervo2:" + user?.id + ":" + name;
    if (arguments.length === 1)
      return JSON.parse(localStorage.getItem(k) || "null");
    if (data === null) localStorage.removeItem(k);
    else localStorage.setItem(k, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

async function rpc(name, args = {}) {
  if (mustChangePassword(user)) {
    showFirstAccess();
    throw Error("Crie sua senha pessoal para continuar.");
  }
  if (!db) throw Error("Conexão indisponível. Atualize a página.");
  chooseSessionStorage($("rememberSession").checked);
  const { data, error } = await db.rpc(name, args);
  if (error) {
    if (
      String(error.message || "").includes("ACERVO_TROCA_SENHA_OBRIGATORIA")
    ) {
      user = {
        ...user,
        app_metadata: {
          ...user?.app_metadata,
          acervo_primeiro_acesso: true,
        },
      };
      showFirstAccess();
      throw Error("Crie sua senha pessoal para continuar.");
    }
    throw error;
  }
  return data;
}

function setChoice(name, v) {
  document
    .querySelectorAll('[name="' + name + '"]')
    .forEach((n) => (n.checked = n.value === String(v || "")));
}

function choices(
  target,
  name,
  options,
  chosen = "",
  onchange = () => {},
  required = true,
) {
  target.replaceChildren(
    ...options.map((o) => {
      const [v, text, ico] = Array.isArray(o) ? o : [o, o, ""];
      const l = el("label", undefined, "choice"),
        i = el("input"),
        s = el("span");
      i.type = "radio";
      i.name = name;
      i.value = v;
      i.checked = v === chosen;
      i.required = required;
      i.setAttribute(
        "aria-label",
        name.includes("Shelf") || name === "shelf"
          ? "Estante " + text
          : name.includes("Level") || name === "level"
            ? "Prateleira " + text
            : text,
      );
      if (ico) s.append(icon(ico));
      s.append(document.createTextNode(text));
      i.onchange = onchange;
      l.append(i, s);
      return l;
    }),
  );
}

function updateNavIndicator(animate = true) {
  const nav = document.querySelector(".nav");
  const lens = nav?.querySelector(".nav-lens");
  const current = nav?.querySelector('[aria-current="page"]');
  if (!lens || !current || !nav.offsetWidth) return;
  lens.style.transition =
    animate &&
    lens.dataset.ready &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
      ? ""
      : "none";
  lens.style.width = current.offsetWidth + "px";
  lens.style.height = current.offsetHeight + "px";
  lens.style.transform = `translate(${current.offsetLeft}px, ${current.offsetTop}px)`;
  lens.dataset.ready = "true";
  nav.classList.add("has-lens");
}

function showTab(id) {
  const previous = document.querySelector("main>section:not([hidden])")?.id;
  document
    .querySelectorAll("main>section")
    .forEach((s) => (s.hidden = s.id !== id));
  document.querySelectorAll("[data-tab]").forEach((b) => {
    if (b.dataset.tab === id) b.setAttribute("aria-current", "page");
    else b.removeAttribute("aria-current");
  });
  updateNavIndicator();
  if (mobileAcervo()) {
    $("app").scrollTop = 0;
    if ($("mobileAccountDialog")?.open) $("mobileAccountDialog").close();
    document
      .querySelector(".shell > header")
      ?.scrollIntoView({ block: "start", behavior: "auto" });
    if (previous && previous !== id) {
      const tabs = ["register", "movements", "browse", "dashboard"];
      animateMobileView(
        $(id),
        tabs.indexOf(id) < tabs.indexOf(previous) ? -1 : 1,
      );
    }
  }
  if (mobileAcervo() && $("mobileJourneyHome")) {
    if (id !== "browse" && $("mobileDetail")?.open) closeMobileDetail();
    if (id === "register") syncMobileJourney();
    if (id === "movements") renderMovementResults();
    if (id === "dashboard") renderMobileDashboard();
  }
}

function setBusy(v, message = "Salvando…") {
  busy = v;
  $("fields").disabled = v || role === "leitor" || !!pending;
  document
    .querySelectorAll(
      "#app button,.mobile-app-nav button,#mobileDetail button,#operation button,#registrationDiscardDialog button",
    )
    .forEach((b) => (b.disabled = v));
  if ($("editFields"))
    $("editFields").disabled = v || role === "leitor" || !!pending;
  $("save").disabled = v || role === "leitor" || !!pending;
  $("logout").disabled = v;
  $("refresh").disabled = v;
  $("manageAccess").disabled = v;
  $("pendingBox").hidden = !pending || v;
  $("retry").disabled = v;
  labelButton($("save"), v ? message : "Cadastrar", v ? "clock" : "save");
  $("discardRegistration").disabled = v || role === "leitor" || !!pending;
  $("directReason").disabled = v;
  $("previous").disabled = v || page <= 1;
  $("next").disabled =
    v || page >= Math.max(1, Math.ceil(filtered().length / 25));
  syncMobileJourney();
}

function locationText(r) {
  const d = r.dados;
  return d.estante && d.prateleira
    ? d.estante + " · " + String(d.prateleira).padStart(2, "0")
    : r.legado?.localizacao || "";
}

function registrationGroupHeading(id, label, description, symbol) {
  const heading = el("div", undefined, "registration-group-heading"),
    text = el("div");
  heading.id = id;
  text.append(el("strong", label), el("p", description));
  heading.append(icon(symbol), text);
  return heading;
}

function organizeEditor(record) {
  const fields = $("editFields"),
    oldGrid = fields.querySelector(".grid2");
  const item = el("div", undefined, "editor-item"),
    name = el("div", undefined, "editor-name-card");
  const category = $("editCategories").closest("fieldset");
  category.classList.remove("spaced");
  category.classList.add("editor-category-card");
  category.querySelector("legend").prepend(icon("composition"));
  name.append($("editItem").previousElementSibling, $("editItem"));
  name.querySelector("label").prepend(icon("draft"));
  item.append(name, category);
  const location = el("div", undefined, "editor-location"),
    room = $("editRooms").closest("fieldset");
  room.classList.remove("spaced");
  room.querySelector("legend").prepend(icon("pin"));
  location.append(room, $("editLocation"));
  const identity = $("editTypes").closest("fieldset");
  identity.id = "editIdentityGroup";
  identity.classList.remove("spaced");
  identity
    .querySelector("legend")
    .after(
      registrationGroupHeading(
        "editIdentityHeading",
        "Identificação",
        "Qual código identifica o item?",
        "code",
      ),
    );
  identity.append($("editCodeWrap"));
  const control = el("div");
  control.id = "editControlHost";
  control.append(
    registrationGroupHeading(
      "editControlHeading",
      "Controle",
      "Como acompanhar o item?",
      "stock",
    ),
  );
  const stock = record.controle === "QUANTIDADE",
    value = el("div");
  value.id = "editControlValue";
  value.append(
    icon(stock ? "stock" : "individual"),
    el("span", stock ? "Por quantidade" : "Individual"),
  );
  control.append(value);
  control.classList.toggle("editor-stock", stock);
  identity.hidden = stock;
  const notes = el("div", undefined, "editor-note");
  notes.append($("editNote").previousElementSibling, $("editNote"));
  const grid = el("div", undefined, "editor-grid");
  grid.append(item, identity, control, notes);
  fields.prepend(location, grid);
  oldGrid.remove();
  syncMobileEditor();
}

function mountControlFields(host, prefix = "", record = null) {
  if (!host) return;
  const e = prefix === "edit";
  const id = (s) => (e ? "edit" + s[0].toUpperCase() + s.slice(1) : s);
  const box = el("div", undefined, "stock-control");
  const group = el("fieldset"),
    opts = el("div", undefined, "choices");
  group.append(el("legend", "Controle"), opts);
  choices(
    opts,
    e ? "editControl" : "control",
    CONTROL,
    record?.controle || "INDIVIDUAL",
    () => {
      if (!e) manual.controle = true;
      syncControl(prefix);
    },
  );
  if (e) {
    group.disabled = true;
    box.append(el("p", "Tipo de controle definido no cadastro.", "hint"));
  }
  box.append(group);
  const hint = el("p", "", "hint");
  hint.id = id("controlHint");
  box.append(hint);
  const stock = el("div", undefined, "grid2");
  stock.id = id("stockFields");
  const input = (parent, name, label, type, initial, attrs = {}) => {
    const wrap = el("div"),
      l = el("label", label),
      n = el("input");
    n.id = id(name);
    n.type = type;
    n.value = initial;
    l.htmlFor = n.id;
    Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
    wrap.append(l, n);
    parent.append(wrap);
    return n;
  };
  const qty = input(
    stock,
    "quantity",
    e ? "Saldo atual" : "Quantidade inicial",
    "number",
    record?.saldo ?? 1,
    {
      min: 0,
      max: 99999999999,
      step: "0.001",
    },
  );
  qty.readOnly = e;
  const unit = el("input");
  unit.id = id("unit");
  unit.type = "hidden";
  unit.value = record?.unidade || "unidade";
  unit.disabled = e;
  stock.append(unit);
  const extras = el("div");
  input(extras, "minimum", "Estoque mínimo", "number", record?.minimo ?? 0, {
    min: 0,
    max: 99999999999,
    step: "0.001",
  });
  stock.append(extras);
  box.append(stock);
  if (e) host.append(box);
  else host.replaceChildren(box);
  syncControl(prefix);
}

function syncControl(prefix = "") {
  const e = prefix === "edit",
    id = (s) => (e ? "edit" + s[0].toUpperCase() + s.slice(1) : s);
  const box = $(id("stockFields"));
  if (!box) return;
  const stock = value(e ? "editControl" : "control") === "QUANTIDADE";
  box.hidden = !stock;
  box.querySelectorAll("input").forEach((n) => {
    n.disabled = !stock;
    n.required = stock && n.id === id("quantity");
  });
  $(id("unit")).disabled = !stock || e;
  if (!e) {
    $("itemForm").classList.toggle("quantity-layout", stock);
    if (stock) setChoice("type", "SEM_IDENTIFICACAO");
    $("types").hidden = stock;
    const identity = $("identityBlock");
    if (identity) {
      if (stock) $("stockFields").after(identity);
      else if (identity.parentElement !== $("formRest"))
        $("formRest").prepend(identity);
    }
    $("types").closest("fieldset").querySelector("legend").textContent = stock
      ? "Código automático"
      : "Identificação";
    syncCode();
    updateRegistrationSummary();
  }
  const room = value(e ? "editRoom" : "room");
  setHelpHint(
    $(id("controlHint")),
    stock
      ? room && room !== "Almoxarifado"
        ? "Estoque por quantidade: selecione Almoxarifado. O ambiente não será trocado automaticamente."
        : e
          ? "Saldo ajustado em Movimentações"
          : "Saldo em unidades"
      : e
        ? "Individual"
        : "Um registro para cada bem",
    stock ? "stock" : "individual",
  );
  $(id("controlHint")).dataset.help = stock
    ? "Um registro reúne várias unidades. As saídas reduzem o saldo. Disponível no almoxarifado."
    : "Cada bem tem seu próprio código, movimentações e histórico.";
  $(id("controlHint")).tabIndex = 0;
}

function syncDirectDown() {
  $("directDown").checked = false;
  $("itemForm").classList.remove("disposal");
  $("directReason").required = false;
  labelButton($("save"), "Cadastrar", "save");
  updateRegistrationSummary();
}

function openRegistrationDiscard() {
  if (busy || role === "leitor") return;
  if (pending) return toast("Conclua a operação pendente primeiro.", true);
  if (!mobileRegistrationValidity()) return;
  const d = formData();
  if (!validateRecord(d)) return;
  const place =
    d.ambiente === "Almoxarifado"
      ? `${d.ambiente} · ${d.estante} / ${String(d.prateleira).padStart(2, "0")}`
      : d.ambiente;
  $("registrationDiscardItem").replaceChildren(
    el("strong", d.item),
    el(
      "span",
      (d.controle === "QUANTIDADE"
        ? quantityText(d.quantidade, d.unidade)
        : "1 bem individual") +
        " · " +
        place,
    ),
  );
  showAcervoDialog($("registrationDiscardDialog"));
  if (mobileAcervo()) {
    const anchor = mobileItemAnchor({ dados: d });
    anchor.querySelector("small")?.remove();
    if (d.controle === "QUANTIDADE")
      anchor
        .querySelector("div")
        .append(
          el(
            "strong",
            quantityText(d.quantidade, d.unidade),
            "mobile-discard-quantity",
          ),
        );
    $("registrationDiscardItem").replaceChildren(anchor);
    $("registrationDiscardDialog")
      .querySelector("[data-close]")
      .focus({ preventScroll: true });
  } else $("directReason").focus();
}

function movementActions(r) {
  if (r.situacao === "EMPRESTADO") return ["devolver", "baixar"];
  if (r.situacao !== "ATIVO") return [];
  return r.controle === "QUANTIDADE"
    ? ["entrada", "saida", "descarte_estoque", "baixar"]
    : ["emprestar", "baixar"];
}

function quantityText(amount, unit = "unidade") {
  const n = Number(amount),
    plural = {
      unidade: "unidades",
      rolo: "rolos",
      metro: "metros",
      litro: "litros",
      caixa: "caixas",
      kg: "kg",
    };
  return (
    n.toLocaleString("pt-BR", {
      maximumFractionDigits: 3,
    }) +
    " " +
    (n === 1 ? unit : plural[unit] || unit)
  );
}

function renderMovementResults() {
  if (!$("moveResults")) return;
  if (mobileAcervo()) return renderMobileMovement();
  const q = key($("moveSearch").value);
  const exact = rows.filter(
    (r) => q && (key(r.dados.codigo) === q || key(internal(r.id)) === q),
  );
  const found = exact.length
    ? exact
    : rows.filter(
        (r) =>
          q &&
          key(
            [r.dados.item, r.dados.codigo, internal(r.id), r.dados.ramal].join(
              " ",
            ),
          ).includes(q),
      );
  $("moveResults").replaceChildren();
  $("moveMissing").hidden = !q || found.length > 0;
  $("createDown").hidden = role === "leitor";
  if (!q) {
    const empty = el("div", undefined, "movement-empty");
    empty.append(
      icon("search"),
      el("span", "Encontre o item para ver as ações disponíveis."),
    );
    $("moveResults").append(empty);
    return;
  }
  for (const r of found.slice(0, 20)) {
    const card = el("div", undefined, "movement-result");
    const heading = el("div", undefined, "movement-result-heading");
    heading.append(
      el("h3", r.dados.item),
      el(
        "span",
        STATUS[r.situacao],
        "badge" +
          (r.situacao === "BAIXADO"
            ? " down"
            : r.situacao === "ARQUIVADO"
              ? " archive"
              : ""),
      ),
    );
    card.append(
      heading,
      el(
        "p",
        [
          internal(r.id),
          r.dados.codigo ? r.dados.tipo + " " + r.dados.codigo : "",
        ]
          .filter(Boolean)
          .join(" · "),
        "movement-code",
      ),
    );
    const position = locationText(r);
    card.append(
      el(
        "p",
        [r.dados.ambiente, position].filter(Boolean).join(" · "),
        "hint movement-location",
      ),
    );
    if (r.controle === "QUANTIDADE")
      card.append(
        el("p", "Saldo: " + quantityText(r.saldo, r.unidade), "notice"),
      );
    if (r.emprestimo)
      card.append(
        el(
          "p",
          `Com ${r.emprestimo.responsavel} · ${r.emprestimo.destino}`,
          "notice",
        ),
      );
    const actions = el("div", undefined, "actions");
    if (role !== "leitor")
      for (const a of movementActions(r))
        actions.append(
          button(
            ACTION[a],
            () => openOperation(a, r),
            a === "baixar" || a === "descarte_estoque" ? "danger" : "",
            ACTION_ICON[a],
          ),
        );
    if (role === "leitor")
      card.append(el("p", "Seu perfil permite consultar este item.", "hint"));
    else if (!actions.children.length)
      card.append(
        el(
          "p",
          r.situacao === "ARQUIVADO"
            ? "Registro arquivado. Abra os detalhes na consulta para restaurar."
            : "Item descartado. Consulte os detalhes para ver o motivo e o histórico.",
          "hint",
        ),
      );
    card.append(actions);
    $("moveResults").append(card);
  }
  if (found.length > 20)
    $("moveResults").append(
      el(
        "p",
        `${found.length} itens encontrados. Digite mais detalhes para refinar.`,
        "hint",
      ),
    );
}

function configureMovement(a, r) {
  const quantity = ["entrada", "saida", "descarte_estoque"].includes(a),
    person = ["emprestar", "saida"].includes(a);
  for (const [wrap, id, on] of [
    ["moveQuantityWrap", "moveQuantity", quantity],
    ["movePersonWrap", "movePerson", person],
    ["moveDestinationWrap", "moveDestination", person],
  ]) {
    $(wrap).hidden = !on;
    $(id).disabled = !on;
    $(id).required = on;
    $(id).value = "";
  }
  $("movePersonLabel").textContent =
    a === "saida" ? "Solicitante" : "Responsável";
  $("moveQuantity").step = ["unidade", "rolo", "caixa"].includes(r.unidade)
    ? "1"
    : "0.001";
  $("moveQuantity").min = $("moveQuantity").step;
  $("moveQuantity").max = a === "entrada" ? "99999999999" : String(r.saldo);
  const updateBalance = () => {
    const n = Number($("moveQuantity").value || 0);
    $("moveBalance").textContent =
      `Saldo atual: ${quantityText(r.saldo, r.unidade)}. Após confirmar: ${quantityText(Number((Number(r.saldo) + (a === "entrada" ? n : -n)).toFixed(3)), r.unidade)}.`;
  };
  $("moveQuantity").oninput = updateBalance;
  updateBalance();
  $("reason").required = [
    "baixar",
    "descarte_estoque",
    "estornar",
    "arquivar",
    "restaurar",
  ].includes(a);
  $("reason").previousElementSibling.textContent = [
    "baixar",
    "descarte_estoque",
  ].includes(a)
    ? "Motivo do descarte"
    : $("reason").required
      ? "Motivo / justificativa"
      : "Observação · opcional";
  $("downDate").required = a === "baixar";
  $("downDate").disabled = a !== "baixar";
  $("downFields").hidden = a !== "baixar";
  const hints = {
    emprestar: "Informe quem ficará com o bem e onde ele será usado.",
    devolver: `O bem voltará para ${r.dados.ambiente}${locationText(r) ? " · " + locationText(r) : ""}.`,
    entrada: "Informe quantas unidades entraram no estoque.",
    saida: "Informe a quantidade, quem retirou e o destino.",
    descarte_estoque: "Desconte do saldo apenas as unidades descartadas.",
    baixar: `O registro continuará no acervo como Descartado, com motivo e histórico${r.controle === "QUANTIDADE" ? `. Todo o saldo (${quantityText(r.saldo, r.unidade)}) será descartado` : ""}.`,
    arquivar: "Ação descontinuada. Registros antigos permanecem preservados.",
    restaurar: "Devolve o registro arquivado à lista corrente.",
    estornar:
      "Use para corrigir um descarte registrado por engano. O histórico será preservado.",
  };
  $("operationHint").textContent =
    hints[a] || "Confira os dados antes de confirmar.";
  labelButton($("confirmOperation"), ACTION[a], ACTION_ICON[a]);
}

function validScanValue(v) {
  return ["moveSearch", "search"].includes(scanTarget)
    ? /^\d{6}$/.test(v) || /^ACV-\d+$/i.test(v)
    : /^\d{6}$/.test(v);
}

function syncLocation(prefix = "") {
  const edit = prefix === "edit",
    room = value(edit ? "editRoom" : "room"),
    shelf = value(edit ? "editShelf" : "shelf"),
    level = value(edit ? "editLevel" : "level");
  const target = $(edit ? "editLocation" : "location");
  if (!target) return;
  const warehouse = room === "Almoxarifado";
  target.hidden = !warehouse;
  if (!edit) $("itemForm").classList.toggle("warehouse-layout", warehouse);
  target.querySelectorAll("input").forEach((i) => {
    i.required = warehouse;
    i.disabled = !warehouse;
  });
  $(edit ? "editPosition" : "position").textContent =
    shelf && level
      ? shelf + " · " + level.padStart(2, "0")
      : "Escolha a posição";
  if (!edit) updateMobileLocation();
}

function syncCode(prefix = "") {
  const edit = prefix === "edit",
    t = value(edit ? "editType" : "type"),
    n = $(edit ? "editCode" : "code"),
    none = t === "SEM_IDENTIFICACAO";
  if (!none && n.readOnly) n.value = "";
  $(edit ? "editCodeWrap" : "codeWrap").hidden = !t;
  if (!edit && $("identityBlock")) {
    $("identityBlock").dataset.type = t;
    $("types")
      .querySelectorAll("input")
      .forEach((input) => input.setAttribute("aria-controls", "codeWrap"));
  }
  $(edit ? "editCodeLabel" : "codeLabel").textContent =
    !edit && value("control") === "QUANTIDADE"
      ? "Código automático"
      : none
        ? "Identificação interna"
        : TYPE[t] || "Identificação";
  n.required = !!t && !none;
  n.readOnly = none;
  n.pattern = none ? "ACV-[0-9]{5,}" : "[0-9]{6}";
  n.maxLength = none ? 64 : 6;
  $(edit ? "editScan" : "scan").hidden = none || !mobileCamera();
  n.placeholder = none ? "Código automático" : "6 números da etiqueta";
  if (none)
    n.value = edit && editor?.id ? internal(editor.id) : nextInternalPreview();
  const help = $(edit ? "editCodeHint" : "codeHint");
  setHelpHint(
    help,
    none && !edit && n.value ? "Código previsto" : "Sobre o código",
    none ? "sequence" : "code",
  );
  help.dataset.help = none
    ? edit
      ? "Código interno deste registro."
      : "Prévia calculada pelo último registro disponível. O banco confirma o número ao salvar; ele pode mudar se houver outro cadastro ou lacunas na sequência."
    : "PMC e ICI usam seis números. Os zeros à esquerda são preservados.";
  help.tabIndex = 0;
  if (!edit && mobileAcervo() && none) {
    $("codeLabel").textContent = "Código previsto";
    help.textContent = "Confirmado ao salvar.";
    help.removeAttribute("data-help");
    help.removeAttribute("aria-label");
    help.removeAttribute("tabindex");
  }
}

function syncForm() {
  const ready = clean($("item").value).length >= 2;
  $("formRest").hidden = !ready;
  $("notesBlock").hidden = !ready;
  $("registrationSave").hidden = !ready;
  syncCode();
  syncLocation();
  syncControl();
  updateRegistrationSummary();
  syncFieldIdentity();
  syncMobileJourney();
}

function winner(list, field) {
  const count = new Map();
  for (const r of list) {
    const v =
      field === "controle" ? r.controle || "INDIVIDUAL" : r.dados[field];
    if (v) count.set(v, (count.get(v) || 0) + 1);
  }
  const ranks = [...count].sort((a, b) => b[1] - a[1]);
  return list.length >= 2 &&
    ranks[0] &&
    ranks[0][1] / list.length >= 0.6 &&
    ranks[0][1] > (ranks[1]?.[1] || 0)
    ? ranks[0][0]
    : "";
}

function learnItem() {
  const current = key($("item").value);
  if (current !== learnedKey) {
    manual = {
      categoria: false,
      tipo: false,
      controle: false,
    };
    learnedKey = current;
    setChoice("category", "");
    setChoice("type", "");
    setChoice("control", "INDIVIDUAL");
  }
  const matches = rows.filter(
    (r) => r.situacao !== "ARQUIVADO" && key(r.dados.item) === current,
  );
  const cat = winner(matches, "categoria"),
    ident = winner(matches, "tipo");
  if (!manual.categoria) setChoice("category", cat);
  if (!manual.tipo) setChoice("type", ident);
  const control = winner(matches, "controle");
  if (!manual.controle && control) setChoice("control", control);
  const suggestions = [];
  if (control && !manual.controle)
    suggestions.push(
      control === "QUANTIDADE" ? "Por quantidade" : "Individual",
    );
  if (cat && !manual.categoria) suggestions.push(cat);
  if (ident && !manual.tipo) suggestions.push(TYPE[ident]);
  setHelpHint(
    $("learningHint"),
    suggestions.length
      ? "Sugestão aplicada"
      : matches.length
        ? "Escolha as opções abaixo."
        : "Novo item",
    "suggestion",
  );
  $("learningHint").dataset.help = suggestions.length
    ? "Com base em " +
      matches.length +
      " registros: " +
      suggestions.join(" · ") +
      ". Todas as opções podem ser alteradas."
    : "Escolha um nome existente ou cadastre um novo. As sugestões se baseiam no histórico do inventário.";
  $("learningHint").tabIndex = 0;
  syncForm();
}

function suggestions() {
  const name = clean($("item").value);
  const q = key(name),
    names = new Map();
  rows.forEach((r) => {
    if (r.situacao !== "ARQUIVADO") names.set(key(r.dados.item), r.dados.item);
  });
  const found = [...names.values()]
    .filter((n) => key(n).includes(q))
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
    .slice(0, 8);
  const host = $("suggestions");
  const choose = (text) => {
    $("item").value = text;
    learnItem();
    host.hidden = true;
    $("item").setAttribute("aria-expanded", "false");
    saveDraft();
    if (mobileAcervo()) $("item").blur();
  };
  host.replaceChildren(
    ...found.map((n) => button(n, () => choose(n), "", "suggestion")),
  );
  if (mobileAcervo()) {
    [...host.children].forEach((node, i) => {
      const record = rows.find((r) => key(r.dados.item) === key(found[i]));
      const copy = el("div"),
        symbol = el("span", undefined, "mobile-item-symbol");
      symbol.append(itemIcon(record || found[i]));
      copy.append(
        el("strong", found[i]),
        el("small", record?.dados.categoria || "Já está no acervo"),
      );
      node.replaceChildren(symbol, copy, icon("right"));
    });
    if (q.length >= 2 && !found.some((n) => key(n) === q)) {
      const candidate = button(
        "",
        () => choose(name),
        "mobile-new-item",
        "plus",
      );
      const symbol = el("span", undefined, "mobile-item-symbol"),
        copy = el("div");
      symbol.append(itemIcon(name, value("category")));
      copy.append(
        el("strong", name),
        el("small", "Usar este nome · novo item"),
      );
      candidate.replaceChildren(symbol, copy, icon("plus"));
      host.prepend(candidate);
    }
  }
  host.hidden = !host.children.length;
  $("item").setAttribute("aria-expanded", String(!host.hidden));
}

function formData(prefix = "") {
  const e = prefix === "edit",
    room = value(e ? "editRoom" : "room"),
    t = value(e ? "editType" : "type");
  return {
    ambiente: room,
    categoria: value(e ? "editCategory" : "category"),
    item: clean($(e ? "editItem" : "item").value),
    tipo: t,
    codigo: t === "SEM_IDENTIFICACAO" ? "" : $(e ? "editCode" : "code").value,
    estante: room === "Almoxarifado" ? value(e ? "editShelf" : "shelf") : "",
    prateleira: room === "Almoxarifado" ? value(e ? "editLevel" : "level") : "",
    observacao: $(e ? "editNote" : "note").value.trim(),
    controle: value(e ? "editControl" : "control") || "INDIVIDUAL",
    quantidade: $(e ? "editQuantity" : "quantity")?.value || "1",
    unidade: $(e ? "editUnit" : "unit")?.value || "unidade",
    minimo: $(e ? "editMinimum" : "minimum")?.value || "0",
    ramal: e ? rows.find((r) => r.id === editor?.id)?.dados?.ramal || "" : "",
  };
}

function updateRegistrationSummary() {
  if (!$("registrationSummary")) return;
  if (mobileAcervo()) {
    mobileReview();
    syncMobileJourney();
    return;
  }
  const d = formData();
  const stock = d.controle === "QUANTIDADE";
  const summary = $("registrationSummary");
  if (!clean(d.item)) {
    summary.replaceChildren(
      el("span", "Preencha a ficha para conferir o registro."),
    );
    return;
  }
  const down = $("directDown").checked;
  const heading = el("div", undefined, "summary-heading");
  const title = el("div", undefined, "summary-title");
  title.append(el("strong", d.item));
  const status = el("span", down ? "Descartado" : "Ativo", "summary-status");
  status.append(icon(down ? "discard" : "check"));
  heading.append(title, status);
  const facts = el("dl", undefined, "summary-facts");
  function fact(label, text, detail) {
    const wrap = el("div");
    const val = el("dd", text);
    if (label === "Localização") {
      val.classList.add("location-ticket");
      val.prepend(icon("pin"));
    }
    if (detail) val.append(el("small", detail));
    wrap.dataset.fact = label;
    wrap.append(el("dt", label), val);
    facts.append(wrap);
  }
  const amount = Number(d.quantidade);
  fact(
    "Quantidade",
    stock
      ? d.quantidade === ""
        ? "A informar"
        : `${Number.isFinite(amount) ? amount.toLocaleString("pt-BR", { maximumFractionDigits: 3 }) : d.quantidade} ${amount === 1 ? "unidade" : "unidades"}`
      : "1 bem individual",
  );
  const automatic = stock || d.tipo === "SEM_IDENTIFICACAO";
  const preview = automatic ? nextInternalPreview() : "";
  fact(
    automatic && preview ? "Código previsto" : "Identificação",
    automatic
      ? preview || "Gerado ao salvar"
      : d.tipo
        ? `${d.tipo} ${d.codigo || "a informar"}`
        : "A selecionar",
  );
  fact(
    "Localização",
    d.ambiente || "A selecionar",
    d.ambiente === "Almoxarifado"
      ? `Estante ${d.estante || "a selecionar"} · Prateleira ${d.prateleira || "a selecionar"}`
      : "",
  );
  const category = el("div", undefined, "mobile-summary-fact");
  category.append(
    el("dt", "Categoria"),
    el("dd", d.categoria || "A selecionar"),
  );
  facts.prepend(category);
  if (!automatic) {
    const code = el("div", undefined, "mobile-summary-fact");
    code.append(
      el("dt", "Código interno"),
      el("dd", nextInternalPreview() || "Gerado ao salvar"),
    );
    facts.append(code);
  }
  summary.replaceChildren(heading, facts);
}

function repeatRegistration(d) {
  if (
    clean($("item").value) &&
    !confirm("Substituir o rascunho por outro item igual?")
  )
    return;
  resetForm();
  $("item").value = d.item;
  for (const [name, field] of [
    ["category", "categoria"],
    ["type", "tipo"],
    ["room", "ambiente"],
    ["shelf", "estante"],
    ["level", "prateleira"],
    ["control", "controle"],
  ])
    setChoice(name, d[field]);
  $("minimum").value = d.minimo || "0";
  manual = {
    categoria: true,
    tipo: true,
    controle: true,
  };
  learnedKey = key(d.item);
  syncForm();
  saveDraft();
  $("saved").hidden = true;
  (d.controle === "QUANTIDADE"
    ? $("quantity")
    : d.tipo === "SEM_IDENTIFICACAO"
      ? $("item")
      : $("code")
  ).focus();
}

function saveDraft() {
  if (!user || busy) return;
  if (mobileAcervo() && $("register").dataset.journey === "receipt") return;
  $("saved").hidden = true;
  $("saved").replaceChildren();
  const ok = storage("draft", {
    dados: formData(),
    etapa: Number($("itemForm").dataset.mobileStage || 1),
    editing: null,
    repeat: $("repeat").checked,
    baixaDireta: $("directDown").checked,
    motivo: $("directReason").value,
  });
  setHelpHint(
    $("draftInfo"),
    ok
      ? "Rascunho salvo"
      : "Não foi possível guardar o rascunho neste navegador.",
    "draft",
  );
}

function restoreDraft() {
  const d = storage("draft");
  if (!d?.dados) return;
  if (d.editing) {
    toast(
      "Há um rascunho de edição da versão anterior. Abra o item na consulta para revisá-lo.",
    );
    return;
  }
  const r = d.dados;
  $("item").value = r.item || "";
  $("note").value = r.observacao || "";
  $("code").value = r.codigo || "";
  setChoice("room", ROOMS.includes(r.ambiente) ? r.ambiente : ROOMS[0]);
  setChoice("category", r.categoria);
  setChoice("type", r.tipo);
  setChoice("shelf", r.estante);
  setChoice("level", r.prateleira);
  learnedKey = key(r.item);
  setChoice("control", r.controle || "INDIVIDUAL");
  $("quantity").value = r.quantidade || "1";
  $("unit").value = r.unidade || "unidade";
  $("minimum").value = r.minimo || "0";
  $("directDown").checked = false;
  $("directReason").value = d.motivo || "";
  syncDirectDown();
  manual = {
    categoria: true,
    tipo: true,
    controle: true,
  };
  $("repeat").checked = false;
  syncForm();
  journey.draftStage = Math.max(1, Math.min(4, Number(d.etapa) || 1));
  journey.maxStage = journey.draftStage;
  syncMobileJourney();
}

function resetForm() {
  registrationStage(1, false);
  const keep = false;
  $("code").value = "";
  $("note").value = "";
  if (mobileAcervo() && $("mobileNoteToggle")) {
    $("notesBlock").classList.add("mobile-notes-collapsed");
    $("mobileNoteToggle").setAttribute("aria-expanded", "false");
  }
  $("quantity").value = "1";
  $("directDown").checked = false;
  $("directReason").value = "";
  syncDirectDown();
  if (!keep) {
    $("item").value = "";
    setChoice("category", "");
    setChoice("type", "");
    manual = {
      categoria: false,
      tipo: false,
      controle: false,
    };
    setChoice("control", "INDIVIDUAL");
    $("minimum").value = "0";
    $("unit").value = "unidade";
    learnedKey = "";
    setHelpHint(
      $("learningHint"),
      "Sugestões conforme você digita.",
      "suggestion",
    );
    $("learningHint").dataset.help =
      "Escolha um nome existente ou cadastre um novo. As sugestões se baseiam no histórico do inventário.";
  }
  $("suggestions").hidden = true;
  $("item").setAttribute("aria-expanded", "false");
  syncForm();
  journey.maxStage = 1;
  journey.draftStage = 1;
  syncMobileJourney();
}

function duplicateHint() {
  const e = scanTarget === "editCode",
    code = $(e ? "editCode" : "code").value,
    t = value(e ? "editType" : "type"),
    r = rows.find(
      (r) =>
        r.dados.tipo === t &&
        r.dados.codigo === code &&
        r.id !== (e ? editor?.id : null),
    );
  setHelpHint(
    $(e ? "editCodeHint" : "codeHint"),
    r && code
      ? "Já cadastrado: " + r.dados.item + " · " + STATUS[r.situacao]
      : "Sobre o código",
    r && code ? "warning" : t === "SEM_IDENTIFICACAO" ? "sequence" : "code",
  );
}

async function refresh(visual = false) {
  if (!user || mustChangePassword(user)) return;
  if (refreshTask) {
    if (!visual) return refreshTask;
    const owner = user.id,
      token = setAcervoSync(true, "Vamos ver o que mudou por aqui.");
    try {
      return await refreshTask;
    } finally {
      if (!user || user.id === owner)
        setAcervoSync(false, undefined, false, token);
    }
  }
  const owner = user?.id;
  const visualToken = visual
    ? setAcervoSync(
        true,
        lastSuccess
          ? "Vamos ver o que mudou por aqui."
          : "Só um instante. Estamos colocando tudo no lugar.",
        !lastSuccess,
      )
    : null;
  refreshTask = (async () => {
    try {
      const data = await rpc("acervo_ler_v3");
      if (!user || user.id !== owner) return;
      rows = data.itens || [];
      checks = data.conferencias || [];
      role = data.perfil || "leitor";
      $("accountRole").textContent = PEOPLE_ROLES[role] || "Leitor";
      $("manageAccess").hidden = role !== "admin";
      if (role !== "admin" && $("userAccessDialog").open) {
        $("userAccessDialog").close();
        resetPeopleManagement();
      }
      renderMovementResults();
      lastSuccess = new Date();
      $("live").className = "live";
      $("live").textContent =
        "Atualizado " +
        new Intl.DateTimeFormat("pt-BR", {
          timeZone: ZONE,
          timeStyle: "short",
        }).format(lastSuccess);
      const snapshot = JSON.stringify([rows, checks, role]);
      if (snapshot !== lastSnapshot) {
        lastSnapshot = snapshot;
        renderFilters();
        renderMetrics();
        renderMovementTimeline();
        if (editor) {
          $("listNotice").hidden = false;
          if (role === "leitor") $("editFields").disabled = true;
        } else renderList();
      }
      updateRoomCounts();
      if (type() === "SEM_IDENTIFICACAO") syncCode();
      updateRegistrationSummary();
      renderMobileDashboard();
      $("fields").disabled = busy || !!pending || role === "leitor";
    } catch (e) {
      if (e.code === "42501") {
        endSession();
        $("loginMessage").textContent =
          "Sua conta não tem mais permissão de acesso. Consulte o administrador.";
        throw e;
      }
      $("live").className = "live stale";
      $("live").textContent = lastSuccess
        ? "Sem atualização · tentando reconectar"
        : "Não foi possível atualizar";
      throw e;
    }
  })().finally(() => {
    refreshTask = null;
    if (visual && (!user || user.id === owner))
      setAcervoSync(false, undefined, false, visualToken);
  });
  return refreshTask;
}

function updateRoomCounts() {
  for (const input of document.querySelectorAll("[name=room]")) {
    const span = input.nextElementSibling;
    let count = span.querySelector("b");
    if (!count) {
      count = el("b");
      span.append(count);
    }
    count.textContent = rows.filter(
      (r) => r.situacao === "ATIVO" && r.dados.ambiente === input.value,
    ).length;
  }
}

function startPolling() {
  clearInterval(pollTimer);
  pollTimer = setInterval(() => {
    if (user && !document.hidden && !busy) refresh().catch(() => {});
  }, 5000);
}

function filtered() {
  const q = key($("search").value);
  return rows
    .filter((r) => {
      const d = r.dados;
      return (
        (!q ||
          key(
            [
              d.item,
              d.codigo,
              internal(r.id),
              d.observacao,
              r.legado?.numero_serie,
            ].join(" "),
          ).includes(q)) &&
        (!filters.ambiente || d.ambiente === filters.ambiente) &&
        (!filters.controle ||
          (r.controle || "INDIVIDUAL") === filters.controle) &&
        (!filters.categoria || d.categoria === filters.categoria) &&
        (!filters.tipo || d.tipo === filters.tipo) &&
        (filters.situacao === "TODOS" ||
          (!filters.situacao
            ? r.situacao !== "ARQUIVADO"
            : filters.situacao === "EM_USO"
              ? ["ATIVO", "EMPRESTADO"].includes(r.situacao)
              : r.situacao === filters.situacao)) &&
        (!filters.estante || d.estante === filters.estante) &&
        (!filters.prateleira || String(d.prateleira) === filters.prateleira) &&
        (!filters.dia || dayKey(r.criado_em) === filters.dia) &&
        (!filters.item || key(d.item) === key(filters.item))
      );
    })
    .sort(
      (a, b) => new Date(b.criado_em) - new Date(a.criado_em) || b.id - a.id,
    );
}

function leaveEditor() {
  return editor ? closeEdit() : true;
}

function changeFilter(field, v) {
  if (!leaveEditor()) return;
  filters[field] = v;
  if (field === "ambiente" && v !== "Almoxarifado") {
    filters.estante = "";
    filters.prateleira = "";
  }
  page = 1;
  expanded = null;
  renderFilters();
  renderList();
}

function filterButtons(target, field, opts) {
  $(target).replaceChildren(
    ...[["", field === "situacao" ? "Lista corrente" : "Todos"], ...opts].map(
      ([v, t]) => {
        const b = button(
          t,
          () => changeFilter(field, v),
          "chip" + (filters[field] === v ? " active" : ""),
        );
        b.setAttribute("aria-pressed", String(filters[field] === v));
        return b;
      },
    ),
  );
}

function renderFilters() {
  filterButtons(
    "quickRooms",
    "ambiente",
    ROOMS.map((v) => [v, v]),
  );
  filterButtons(
    "filterCategory",
    "categoria",
    CATEGORIES.map((v) => [v, v]),
  );
  filterButtons("filterType", "tipo", Object.entries(TYPE));
  filterButtons("filterStatus", "situacao", [
    ["TODOS", "Todos os registros"],
    ...Object.entries(STATUS).filter(
      ([state]) =>
        state !== "ARQUIVADO" || rows.some((r) => r.situacao === "ARQUIVADO"),
    ),
  ]);
  const discarded = rows.filter((r) => r.situacao === "BAIXADO").length;
  labelButton(
    $("viewDiscarded"),
    "Descartados (" + discarded + ")",
    "writeoff",
  );
  $("viewDiscarded").setAttribute(
    "aria-pressed",
    String(filters.situacao === "BAIXADO"),
  );
  filterButtons(
    "filterShelf",
    "estante",
    [..."ABCDE"].map((v) => [v, v]),
  );
  filterButtons(
    "filterLevel",
    "prateleira",
    [1, 2, 3, 4, 5, 6].map((v) => [String(v), String(v).padStart(2, "0")]),
  );
  $("warehouseFilters").hidden = filters.ambiente !== "Almoxarifado";
  const names = {
    controle: "Controle",
    ambiente: "Ambiente",
    categoria: "Categoria",
    tipo: "Identificação",
    situacao: "Situação",
    estante: "Estante",
    prateleira: "Prateleira",
    dia: "Cadastro",
    item: "Item",
  };
  $("applied").replaceChildren(
    ...Object.entries(filters)
      .filter(([, v]) => v)
      .map(([f, v]) =>
        button(
          names[f] +
            ": " +
            (TYPE[v] ||
              (v === "EM_USO" ? "Ativos e emprestados" : STATUS[v]) ||
              (v === "QUANTIDADE" ? "Por quantidade" : v)),
          () => changeFilter(f, ""),
          "chip",
          "close",
        ),
      ),
  );
}

function query(preset) {
  if (!leaveEditor()) return;
  Object.keys(filters).forEach((k) => (filters[k] = preset[k] || ""));
  $("search").value = "";
  page = 1;
  expanded = null;
  renderFilters();
  renderList();
  showTab("browse");
}

function renderList() {
  if (editor) return;
  const found = filtered(),
    pages = Math.max(1, Math.ceil(found.length / 25));
  page = Math.min(page, pages);
  $("resultCount").textContent = found.length + " registros encontrados";
  $("pageLabel").textContent = page + " / " + pages;
  $("previous").disabled = busy || page === 1;
  $("next").disabled = busy || page === pages;
  if (mobileAcervo())
    return renderMobileRecords(found.slice((page - 1) * 25, page * 25));
  closeMobileDetail();
  $("results").replaceChildren();
  for (const r of found.slice((page - 1) * 25, page * 25)) {
    const tr = el("tr", undefined, "record-row");
    tr.dataset.id = r.id;
    const d = r.dados;
    tr.append(
      el("td", d.item),
      el("td", d.codigo ? TYPE[d.tipo] + " " + d.codigo : internal(r.id)),
      el("td", d.ambiente + (locationText(r) ? " · " + locationText(r) : "")),
    );
    if (r.controle === "QUANTIDADE")
      tr.firstChild.append(
        el(
          "div",
          r.situacao === "BAIXADO"
            ? r.baixa?.quantidade != null
              ? "Descarte: " + quantityText(r.baixa.quantidade, r.unidade)
              : "Estoque descartado"
            : `${r.saldo} ${r.unidade} · em estoque`,
          "hint",
        ),
      );
    if (r.emprestimo)
      tr.firstChild.append(
        el(
          "div",
          `${r.emprestimo.responsavel} · ${r.emprestimo.destino}`,
          "hint",
        ),
      );
    const status = el("td");
    status.append(
      el(
        "span",
        STATUS[r.situacao],
        "badge" +
          (r.situacao === "BAIXADO"
            ? " down"
            : r.situacao === "ARQUIVADO"
              ? " archive"
              : ""),
      ),
    );
    tr.append(
      status,
      el("td", d.observacao || "—", "note"),
      el("td", dateBR(r.criado_em), "date"),
    );
    const actionCell = el("td");
    const open = button(
      expanded === r.id ? "Fechar" : "Abrir",
      () => {
        if (!leaveEditor()) return;
        expanded = expanded === r.id ? null : r.id;
        renderList();
      },
      "",
      expanded === r.id ? "close" : "right",
    );
    open.setAttribute("aria-expanded", String(expanded === r.id));
    const recordIcon = icon(CATEGORY_ICON[d.categoria] || "draft");
    recordIcon.classList.add("mobile-record-icon");
    tr.firstChild.prepend(recordIcon);
    tr.addEventListener("click", (event) => {
      if (mobileAcervo() && !event.target.closest("button")) open.click();
    });
    actionCell.append(open);
    tr.append(actionCell);
    $("results").append(tr);
    [
      "Item",
      "Identificação",
      "Ambiente",
      "Situação",
      "Observação",
      "Cadastrado em",
      "Detalhes",
    ].forEach((label, i) => (tr.children[i].dataset.label = label));
    if (expanded === r.id) {
      const row = el("tr", undefined, "detail-row"),
        cell = el("td"),
        panel = el("div", undefined, "detail-panel");
      cell.colSpan = 7;
      panel.id = "detailPanel";
      cell.append(panel);
      row.append(cell);
      $("results").append(row);
      renderDetails(r, panel);
      if (mobileAcervo()) {
        row.remove();
        const detail = el("div", undefined, "mobile-item-detail");
        detail.id = "mobileDetail";
        const back = button(
          "Voltar aos resultados",
          () => {
            const id = expanded;
            expanded = null;
            renderList();
            $("results").querySelector(`[data-id="${id}"] button`)?.focus();
          },
          "",
          "left",
        );
        detail.append(back, panel);
        $("browse").append(detail);
        $("browse").classList.add("mobile-detail-open");
        back.focus({ preventScroll: true });
      }
    }
  }
  if (!found.length) {
    const tr = el("tr"),
      td = el("td", undefined, "empty");
    td.append(
      acervoEmpty(
        "Ainda não encontramos por aqui.",
        "Vamos tentar outro nome ou ajustar os filtros?",
      ),
    );
    td.colSpan = 7;
    tr.append(td);
    $("results").append(tr);
  }
}

function renderDetails(r, panel) {
  if (mobileAcervo()) return renderMobileRecordDetail(r, panel);
  panel.replaceChildren();
  panel.append(el("h3", r.dados.item + " · " + internal(r.id)));
  const dl = el("dl");
  for (const [label, text] of [
    ["Categoria", r.dados.categoria],
    [
      "Identificação",
      TYPE[r.dados.tipo] + (r.dados.codigo ? " · " + r.dados.codigo : ""),
    ],
    ["Localização", r.dados.ambiente + " " + locationText(r)],
    ["Cadastro", dateBR(r.criado_em)],
    ["Observação", r.dados.observacao || "—"],
    [
      "Controle",
      r.controle === "QUANTIDADE"
        ? `Por quantidade · ${r.saldo} ${r.unidade} · mínimo ${r.minimo}`
        : "Individual",
    ],
  ])
    dl.append(el("dt", label), el("dd", text));
  panel.append(dl);
  if (r.emprestimo)
    panel.append(
      el(
        "p",
        `Emprestado para ${r.emprestimo.responsavel} · ${r.emprestimo.destino} · ${dateBR(r.emprestimo.momento)}`,
        "notice",
      ),
    );
  if (r.situacao === "BAIXADO") {
    const disposal = el("aside", undefined, "discard-summary");
    const title = el("strong");
    title.append(
      icon("writeoff"),
      document.createTextNode("Descarte registrado"),
    );
    disposal.append(
      title,
      el(
        "p",
        "Este item continua no acervo para consulta. Não conta como bem disponível ou estoque ativo.",
        "hint",
      ),
    );
    const facts = el("dl"),
      baixa = r.baixa || {};
    const disposalDate = /^\d{4}-\d{2}-\d{2}$/.test(baixa.data || "")
      ? baixa.data.split("-").reverse().join("/")
      : baixa.data || "Não informada";
    for (const [label, text] of [
      ["Data do descarte", disposalDate],
      ["Motivo", baixa.motivo || "Não informado"],
      ["Registrado por", baixa.email],
      ["Documento / processo", baixa.documento],
      [
        "Quantidade descartada",
        r.controle === "QUANTIDADE" && baixa.quantidade != null
          ? quantityText(baixa.quantidade, r.unidade)
          : "",
      ],
    ]) {
      if (text) facts.append(el("dt", label), el("dd", text));
    }
    disposal.append(facts);
    panel.append(disposal);
  }
  if (r.legado) {
    const box = el("details");
    box.append(
      el("summary", "Informações preservadas da versão anterior"),
      el("pre", JSON.stringify(r.legado, null, 2)),
    );
    panel.append(box);
  }
  const actions = el("div", undefined, "actions");
  if (role !== "leitor") {
    for (const a of movementActions(r)) {
      if (a !== "baixar")
        actions.append(
          button(ACTION[a], () => openOperation(a, r), "", ACTION_ICON[a]),
        );
    }
    if (r.situacao === "EMPRESTADO")
      actions.append(
        button(
          "Registrar descarte",
          () => openOperation("baixar", r),
          "danger",
          ACTION_ICON.baixar,
        ),
      );
  }
  if (role !== "leitor" && r.situacao === "ATIVO")
    actions.append(
      button("Editar", () => startEdit(r), "", "edit"),
      button(
        "Registrar descarte",
        () => openOperation("baixar", r),
        "danger",
        ACTION_ICON.baixar,
      ),
    );
  if (role === "admin" && ["BAIXADO", "ARQUIVADO"].includes(r.situacao)) {
    const a = r.situacao === "BAIXADO" ? "estornar" : "restaurar";
    actions.append(
      button(ACTION[a], () => openOperation(a, r), "", ACTION_ICON[a]),
    );
    if (a === "restaurar")
      panel.append(
        el(
          "p",
          "Registro arquivado em uma versão anterior. Seus dados e histórico foram preservados. Restaurar devolve o registro à consulta corrente.",
          "hint",
        ),
      );
  }
  if (role === "admin")
    actions.append(
      button(
        "Excluir definitivamente",
        () => openItemDeletion(r),
        "danger item-delete-action",
        "close",
      ),
    );
  panel.append(actions);
  const history = el("div", undefined, "history");
  history.append(el("h3", "Histórico"));
  const content = el("div");
  content.append(acervoLoader("Puxando a ficha desta história…", true));
  history.append(content);
  panel.append(history);
  loadHistory(r.id, content);
}

function historyAction(h) {
  const action = String(h.acao || "").toLowerCase();
  const names = {
    cadastrar: "Registro",
    criar: "Registro",
    registro: "Registro",
    editar: "Edição",
    edicao: "Edição",
    baixar: "Descarte",
    baixa: "Descarte",
    estornar: "Descarte revertido",
    arquivar: "Arquivamento",
    restaurar: "Restauração",
    conferir: "Conferência",
    emprestar: "Empréstimo",
    devolver: "Devolução",
    entrada: "Entrada de estoque",
    saida: "Saída de estoque",
    descarte_estoque: "Descarte de estoque",
    cadastrar_baixado: "Cadastro de item descartado",
  };
  if (action === "salvar")
    return h.antes === null && h.depois ? "Registro" : "Edição";
  return (
    names[action] ||
    (action ? action.charAt(0).toUpperCase() + action.slice(1) : "Atualização")
  );
}

function historyFacts(h) {
  const object = (v) =>
    v && typeof v === "object" && !Array.isArray(v) ? v : {};
  const before = object(h.antes),
    after = object(h.depois);
  const movement = object(after.movimento);
  const a = String(h.acao || "").toLowerCase();
  const registration =
    ["cadastrar", "criar", "registro", "cadastrar_baixado"].includes(a) ||
    (a === "salvar" && h.antes === null);
  const facts = [];
  const add = (label, v) => {
    if (v !== undefined && v !== null && String(v).trim())
      facts.push([label, String(v)]);
  };
  const number = (v) =>
    v !== null && v !== undefined && v !== "" && Number.isFinite(Number(v))
      ? Number(v)
      : null;
  const format = (v) =>
    Number(v).toLocaleString("pt-BR", {
      maximumFractionDigits: 3,
    });
  const stock = (after.controle || before.controle) === "QUANTIDADE";
  const unit = after.unidade || before.unidade || "";
  const amount = (v) =>
    unit
      ? `${format(v)} ${unit === "unidade" && Number(v) !== 1 ? "unidades" : unit}`
      : format(v);
  const initial = number(before.saldo),
    final = number(after.saldo);
  if (["entrada", "saida", "descarte_estoque"].includes(a)) {
    const delta = initial !== null && final !== null ? final - initial : null;
    const recorded = number(movement.quantidade);
    const derived =
      delta !== null && (a === "entrada" ? delta > 0 : delta < 0)
        ? Math.abs(delta)
        : null;
    const quantity = recorded !== null && recorded > 0 ? recorded : derived;
    if (quantity !== null) add("Quantidade", amount(quantity));
  }
  if (stock && initial !== null && final !== null && initial !== final)
    add("Saldo", `${format(initial)} → ${amount(final)}`);
  else if (
    stock &&
    registration &&
    !Object.keys(before).length &&
    final !== null
  )
    add("Saldo inicial", amount(final));
  const loan =
    a === "devolver" ? object(before.emprestimo) : object(after.emprestimo);
  if (["emprestar", "devolver", "saida"].includes(a)) {
    add(
      a === "saida" ? "Solicitante" : "Responsável",
      movement.responsavel || loan.responsavel,
    );
    add("Destino", movement.destino || loan.destino);
  }
  if (before.situacao && after.situacao && before.situacao !== after.situacao)
    add(
      "Situação",
      `${STATUS[before.situacao] || before.situacao} → ${STATUS[after.situacao] || after.situacao}`,
    );
  const bd = object(before.dados),
    ad = object(after.dados);
  if (
    ["salvar", "editar", "edicao"].includes(a) &&
    Object.keys(before).length
  ) {
    for (const [field, label] of [
      ["item", "Item"],
      ["categoria", "Categoria"],
      ["ambiente", "Ambiente"],
      ["tipo", "Identificação"],
      ["codigo", "Código da etiqueta"],
      ["estante", "Estante"],
      ["prateleira", "Prateleira"],
      ["observacao", "Observação"],
      ["ramal", "Ramal"],
    ]) {
      if (
        field in bd &&
        field in ad &&
        String(bd[field] ?? "") !== String(ad[field] ?? "")
      ) {
        const display = (v) => (field === "tipo" ? TYPE[v] || v : v);
        add(
          label,
          `${display(bd[field]) || "Não informado"} → ${display(ad[field]) || "Não informado"}`,
        );
      }
    }
    const oldMin = number(before.minimo),
      newMin = number(after.minimo);
    if (stock && oldMin !== null && newMin !== null && oldMin !== newMin)
      add("Estoque mínimo", `${format(oldMin)} → ${amount(newMin)}`);
  }
  if (registration) {
    add(
      "Identificação",
      ad.tipo === "SEM_IDENTIFICACAO"
        ? after.id
          ? internal(after.id)
          : "Código interno"
        : [TYPE[ad.tipo], ad.codigo].filter(Boolean).join(" · "),
    );
    add("Ambiente", ad.ambiente);
    if (ad.estante && ad.prateleira)
      add(
        "Posição",
        `${ad.estante} · ${String(ad.prateleira).padStart(2, "0")}`,
      );
  }
  add("Motivo / observação", h.motivo);
  if (["baixar", "baixa", "cadastrar_baixado"].includes(a))
    add("Documento", object(after.baixa).documento);
  return facts;
}

function appendHistoryDetails(target, h) {
  const facts = historyFacts(h);
  if (!facts.length) return;
  const list = el("dl", undefined, "history-details");
  for (const [label, detail] of facts) {
    const line = el("div");
    line.append(el("dt", label), el("dd", detail));
    list.append(line);
  }
  target.append(list);
}

async function loadHistory(id, target) {
  try {
    const data = await rpc("acervo_historico", {
      p_id: id,
    });
    if (!target.isConnected) return;
    target.replaceChildren(
      ...data.map((h) => {
        const n = el("div", undefined, "history-entry");
        n.append(
          el("strong", historyAction(h)),
          el("span", dateBR(h.momento)),
          el("span", shortEmail(h.email) || "Não informado", "history-user"),
        );
        appendHistoryDetails(n, h);
        return n;
      }),
    );
    if (!data.length)
      target.textContent = "Nenhuma alteração registrada nesta versão.";
  } catch (e) {
    if (target.isConnected) target.textContent = e.message;
  }
}

function finishEdit() {
  editor = null;
  if ($("editDialog").open) $("editDialog").close();
  $("editDialogContent").replaceChildren();
  $("listNotice").hidden = true;
  editBaseline = "";
  delete $("editDialog").dataset.mode;
}

function closeEdit() {
  if (busy || pending) {
    toast("Conclua a operação pendente antes de fechar a edição.", true);
    return false;
  }
  if (
    editor &&
    JSON.stringify(formData("edit")) !== editBaseline &&
    !confirm("Descartar as alterações não salvas?")
  )
    return false;
  const id = editor?.id;
  finishEdit();
  renderList();
  document.querySelector('.record-row[data-id="' + id + '"] button')?.focus();
  return true;
}

function startEdit(r) {
  if (busy || pending)
    return toast("Conclua a operação pendente primeiro.", true);
  delete $("editDialog").dataset.mode;
  editor = {
    id: r.id,
    versao: r.versao,
  };
  $("editDialogTitle").textContent = "Editar " + internal(r.id);
  const panel = $("editDialogContent");
  panel.replaceChildren();
  const template = $("editorTemplate").content.cloneNode(true);
  panel.append(template);
  const d = r.dados;
  $("editItem").value = d.item;
  organizeEditor(r);
  mountControlFields($("editControlHost"), "edit", r);
  if (r.controle === "QUANTIDADE")
    $("editStockFields").after($("editCodeWrap"));
  $("editCode").value = d.codigo || "";
  $("editNote").value = d.observacao || "";
  choices(
    $("editCategories"),
    "editCategory",
    CATEGORIES.map((v) => [v, v, CATEGORY_ICON[v]]),
    d.categoria,
  );
  choices(
    $("editTypes"),
    "editType",
    Object.entries(TYPE).map(([v, t]) => [v, t, TYPE_ICON[v]]),
    d.tipo,
    () => {
      $("editCode").value = "";
      syncCode("edit");
    },
  );
  choices(
    $("editRooms"),
    "editRoom",
    ROOMS.map((v) => [v, v, ROOM_ICON[v]]),
    d.ambiente,
    () => syncLocation("edit"),
  );
  choices($("editShelves"), "editShelf", [..."ABCDE"], d.estante);
  choices(
    $("editLevels"),
    "editLevel",
    [1, 2, 3, 4, 5, 6].map((v) => [String(v), String(v).padStart(2, "0")]),
    String(d.prateleira || ""),
  );
  document
    .querySelectorAll("[name=editShelf],[name=editLevel]")
    .forEach((n) => (n.onchange = () => syncLocation("edit")));
  syncCode("edit");
  syncLocation("edit");
  $("editCancel").onclick = closeEdit;
  $("editScan").onclick = () => openScanner("editCode");
  $("editCode").oninput = () => {
    $("editCode").value = $("editCode").value.replace(/\D/g, "").slice(0, 6);
  };
  $("editForm").onsubmit = (e) => {
    e.preventDefault();
    if (busy || role === "leitor" || !$("editForm").reportValidity()) return;
    saveRecord("edit");
  };
  syncFieldIdentity();
  editBaseline = JSON.stringify(formData("edit"));
  showAcervoDialog($("editDialog"));
  focusAcervoDialog($("editDialog"), "editItem");
  $("editDialog").scrollTop = 0;
}

function validateRecord(d, id = null) {
  const reject = (message) => {
    toast(message, true);
    return false;
  };
  const duplicate = rows.find(
    (r) =>
      d.codigo &&
      r.dados.tipo === d.tipo &&
      r.dados.codigo === d.codigo &&
      r.id !== id,
  );
  if (duplicate)
    return reject("Código já cadastrado: " + internal(duplicate.id), true);
  if (d.controle === "QUANTIDADE" && d.ambiente !== "Almoxarifado")
    return reject(
      "Por quantidade: selecione Almoxarifado ou troque o controle para Individual.",
      true,
    );
  if (d.controle === "QUANTIDADE" && d.tipo !== "SEM_IDENTIFICACAO")
    return reject(
      "Um estoque agrupado usa identificação interna. Selecione Sem identificação ou controle Individual.",
      true,
    );
  return true;
}

function saveRecord(prefix = "", discard = false) {
  if (busy || role === "leitor" || pending) return false;
  if (mobileAcervo() && !prefix) {
    const graphic = $("registrationSummary").querySelector(
      ".mobile-item-symbol",
    );
    const rect = graphic?.getBoundingClientRect();
    journey.lastFiche = rect?.width
      ? {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        }
      : null;
  }
  const d = formData(prefix),
    id = prefix === "edit" ? editor?.id : null;
  if (!validateRecord(d, id)) return false;
  const observation = $("directReason").value.trim();
  const discardReason = observation
    ? observation.length >= 3
      ? observation
      : "Observação: " + observation
    : "Descarte registrado no cadastro.";
  commit(
    {
      acao: "salvar",
      id,
      versao: prefix === "edit" ? editor.versao : null,
      dados: d,
      baixa_direta: !id && discard,
      motivo: !id && discard ? discardReason : "",
    },
    prefix === "edit" ? "edit" : "create",
  );
  return true;
}

function openOperation(a, r) {
  if (busy || pending)
    return toast("Conclua a operação pendente primeiro.", true);
  selected = r;
  action = a;
  $("operation").classList.toggle(
    "destructive",
    ["baixar", "descarte_estoque"].includes(a),
  );
  $("operationTitle").textContent = ACTION[a];
  $("operationMark").replaceChildren(icon(ACTION_ICON[a] || "history"));
  const context = el("div"),
    code = el("span", internal(r.id), "operation-code");
  context.append(
    el("strong", r.dados.item),
    el(
      "small",
      [r.dados.ambiente, locationText(r)].filter(Boolean).join(" · "),
    ),
  );
  $("operationRecord").replaceChildren(context, code);
  $("confirmOperation").replaceChildren(
    icon(ACTION_ICON[a] || "history"),
    document.createTextNode(ACTION[a]),
  );
  $("confirmOperation").classList.toggle(
    "danger",
    ["baixar", "descarte_estoque"].includes(a),
  );
  $("operationHint").textContent =
    a === "baixar"
      ? "Controle interno do acervo. Não executa a baixa patrimonial oficial."
      : a === "emprestar"
        ? "Informe quem ficará com o bem e onde ele será utilizado."
        : "Esta movimentação ficará registrada no histórico.";
  $("downFields").hidden = a !== "baixar";
  $("downDate").required = a === "baixar";
  $("downDate").value = today();
  $("downDate").max = today();
  $("reason").value = "";
  $("document").value = "";
  configureMovement(a, r);
  showAcervoDialog($("operation"));
  if (mobileAcervo()) {
    $("operationRecord").prepend(itemIcon(r));
    updateMobileOperation();
  }
}

async function commit(body, origin = "operation") {
  if (busy || role === "leitor") return;
  if (pending)
    return toast("Use Verificar e concluir antes de outra operação.", true);
  pending = {
    chave: crypto.randomUUID(),
    body,
    origin,
  };
  if (!storage("pending", pending)) {
    pending = null;
    return toast(
      "Habilite o armazenamento do navegador antes de salvar.",
      true,
    );
  }
  await transmit();
}

async function transmit() {
  if (busy || !pending) return;
  setBusy(true);
  const op = pending;
  const owner = user?.id;
  try {
    if (refreshTask) await refreshTask.catch(() => {});
    const result = await rpc("acervo_gravar_v3", {
      p_chave: op.chave,
      p: op.body,
    });
    if (!user || user.id !== owner) return;
    pending = null;
    storage("pending", null);
    if (mobileAcervo() && op.body.id)
      journey.movementReceipt =
        $("editDialog").dataset.mode === "transfer"
          ? "Localização atualizada. A mudança ficou no histórico."
          : "Movimentação registrada. A ficha foi atualizada.";
    if (op.body.acao === "salvar" && (op.origin === "create" || !op.body.id)) {
      const template = {
        ...op.body.dados,
      };
      resetForm();
      showAcervoReceipt(result, template);
      storage("draft", {
        dados: formData(),
        editing: null,
        repeat: $("repeat").checked,
      });
    }
    if (op.origin === "edit" || op.body.id) {
      finishEdit();
      if (op.body.id) expanded = op.body.id;
      $("listNotice").hidden = true;
    }
    if ($("operation").open) $("operation").close();
    $("save").classList.remove("saved-flash");
    requestAnimationFrame(() => $("save").classList.add("saved-flash"));
    setTimeout(() => $("save").classList.remove("saved-flash"), 700);
    if (
      !(
        mobileAcervo() &&
        (op.origin === "create" || !op.body.id) &&
        op.body.acao === "salvar"
      )
    )
      toast(
        op.origin === "create" && result.situacao !== "BAIXADO"
          ? "Pronto. Mais um bem no seu lugar."
          : "Operação salva.",
      );
    try {
      await refresh();
    } catch {
      toast(
        "Salvo no banco. A lista será atualizada quando a conexão voltar.",
        true,
      );
    }
    if (op.origin === "create" && !mobileAcervo()) $("item").focus();
  } catch (e) {
    if (e.code) {
      pending = null;
      storage("pending", null);
    }
    toast(e.message || "Sem confirmação. Use Verificar e concluir.", true);
  } finally {
    setBusy(false);
    if (!editor) renderList();
  }
}

function chart(target, groups, total, fn) {
  $(target).replaceChildren(
    ...groups.map(([label, n, k]) => {
      const b = button("", () => fn(k ?? label), "chartline");
      const track = el("div", undefined, "track"),
        fill = el("div", undefined, "fill");
      fill.style.width = (total ? (n / total) * 100 : 0) + "%";
      track.append(fill);
      b.append(el("span", label), track, el("b", n));
      b.title =
        label +
        ": " +
        n +
        (total ? " (" + Math.round((n / total) * 100) + "%)" : "");
      return b;
    }),
  );
}

async function renderMovementTimeline() {
  const generation = ++timelineGeneration;
  const owner = user?.id;
  const candidates = [...rows]
    .sort(
      (a, b) =>
        new Date(b.atualizado_em || b.criado_em) -
        new Date(a.atualizado_em || a.criado_em),
    )
    .slice(0, 12);
  $("toggleMovementTimeline").hidden = true;
  $("movementTimeline").replaceChildren(
    acervoLoader("Cada movimento tem uma história. Vamos buscar a sua.", true),
  );
  try {
    const histories = await Promise.all(
      candidates.map(async (r) => {
        const cacheKey = `${owner}:${r.id}:${r.versao}`;
        let history = timelineCache.get(cacheKey);
        if (!history) {
          history = await rpc("acervo_historico", {
            p_id: r.id,
          });
          timelineCache.set(cacheKey, history);
        }
        return history.map((h) => ({
          ...h,
          itemName: r.dados.item,
          itemId: r.id,
        }));
      }),
    );
    if (generation !== timelineGeneration || user?.id !== owner) return;
    const events = histories
      .flat()
      .sort((a, b) => new Date(b.momento) - new Date(a.momento) || b.id - a.id)
      .slice(0, 12);
    $("movementTimeline").replaceChildren(
      ...events.map((h) => {
        const row = el("div", undefined, "recent-row");
        const event = el("div");
        event.append(el("span", historyAction(h)));
        const facts = historyFacts(h);
        if (facts.length)
          event.append(
            el(
              "small",
              facts
                .slice(0, 2)
                .map(([label, detail]) => `${label}: ${detail}`)
                .join(" · "),
              "movement-event-detail",
            ),
          );
        row.append(
          el("strong", h.itemName),
          event,
          el("small", `${shortEmail(h.email)} · ${dateBR(h.momento)}`),
          button(
            "Consultar",
            () => {
              query({});
              $("search").value = internal(h.itemId);
              renderList();
            },
            "",
            "right",
          ),
        );
        return row;
      }),
    );
    syncDashboardList(
      "movementTimeline",
      "toggleMovementTimeline",
      4,
      "movimentações",
    );
    if (!events.length)
      $("movementTimeline").textContent =
        "Cada movimento tem uma história. A primeira vai aparecer aqui.";
  } catch {
    if (generation === timelineGeneration)
      $("movementTimeline").replaceChildren(
        el("p", "Não foi possível carregar as movimentações."),
        button("Tentar novamente", renderMovementTimeline),
      );
  }
}

function syncDashboardList(id, controlId, limit, noun) {
  const list = $(id),
    control = $(controlId);
  const remaining = Math.max(0, list.children.length - limit);
  const expanded = list.classList.contains("expanded");
  control.hidden = remaining === 0;
  control.setAttribute("aria-expanded", String(expanded));
  const label =
    remaining === 1
      ? {
          materiais: "material",
          movimentações: "movimentação",
          empréstimos: "empréstimo",
        }[noun] || noun
      : noun;
  labelButton(
    control,
    expanded ? "Mostrar menos" : "Ver mais " + remaining + " " + label,
    "right",
  );
}

function openDashboardRecord(r) {
  if (!leaveEditor()) return;
  query({});
  $("search").value = internal(r.id);
  expanded = r.id;
  renderList();
}

function renderExecutiveSummary(active, loans, lowStock) {
  const stocks = active.filter((r) => r.controle === "QUANTIDADE");
  const pulse = $("dashboardPulse"),
    copy = el("div");
  pulse.dataset.state = lowStock.length ? "attention" : "neutral";
  const heading = lowStock.length
    ? "Atenção à reposição"
    : stocks.length
      ? "Estoque acima do mínimo"
      : "Estoque ainda não cadastrado";
  const emptyStocks = lowStock.filter((r) => Number(r.saldo) <= 0).length;
  const description = lowStock.length
    ? `${lowStock.length} ${lowStock.length === 1 ? "material está" : "materiais estão"} no mínimo ou abaixo dele${emptyStocks ? `; ${emptyStocks} sem saldo` : ""}.`
    : stocks.length
      ? "Nenhum material chegou ao mínimo definido no cadastro."
      : "Cadastre materiais por quantidade no Almoxarifado para acompanhar os saldos.";
  copy.append(el("strong", heading), el("p", description));
  pulse.replaceChildren(icon(lowStock.length ? "stock-alert" : "stock"), copy);
  $("loanWatchCount").textContent = loans.length;
  $("loanWatch").replaceChildren(
    ...(loans.length
      ? [...loans]
          .sort((a, b) =>
            String(
              a.emprestimo?.momento || a.atualizado_em || "",
            ).localeCompare(
              String(b.emprestimo?.momento || b.atualizado_em || ""),
            ),
          )
          .map((r) => {
            const card = el("article", undefined, "loan-watch-card");
            card.append(
              el("h4", r.dados.item),
              el(
                "p",
                r.emprestimo?.responsavel || "Responsável não informado",
                "loan-holder",
              ),
            );
            if (r.emprestimo?.destino)
              card.append(el("p", r.emprestimo.destino));
            if (r.emprestimo?.momento)
              card.append(
                el("p", "Desde " + dateBR(r.emprestimo.momento), "hint"),
              );
            const actions = el("div", undefined, "attention-actions");
            actions.append(
              button("Consultar", () => openDashboardRecord(r), "", "right"),
            );
            if (role !== "leitor")
              actions.append(
                button(
                  "Registrar devolução",
                  () => openOperation("devolver", r),
                  "",
                  "return",
                ),
              );
            card.append(actions);
            return card;
          })
      : [el("p", "Nenhum bem emprestado no momento.", "dashboard-empty")]),
  );
  syncDashboardList("loanWatch", "toggleLoanWatch", 3, "empréstimos");
  $("roomSummary").replaceChildren(
    ...ROOMS.map((room) => {
      const roomActive = active.filter((r) => r.dados.ambiente === room);
      const goods = roomActive.filter(
        (r) => r.controle !== "QUANTIDADE",
      ).length;
      const stockCount = roomActive.filter(
        (r) => r.controle === "QUANTIDADE",
      ).length;
      const low = lowStock.filter((r) => r.dados.ambiente === room).length;
      const card = button(
        "",
        () =>
          query({
            ambiente: room,
            situacao: "ATIVO",
          }),
        "room-summary",
      );
      const title = el("span", undefined, "room-summary-heading");
      title.append(icon(ROOM_ICON[room]), el("span", room));
      const counts = el("span", undefined, "room-summary-count");
      counts.append(
        el("b", goods),
        document.createTextNode(goods === 1 ? " bem ativo" : " bens ativos"),
      );
      if (stockCount)
        counts.append(
          el(
            "span",
            `${stockCount} ${stockCount === 1 ? "estoque" : "estoques"}${low ? ` · ${low} para repor` : ""}`,
          ),
        );
      const meter = el("span", undefined, "room-summary-meter"),
        fill = el("i");
      const totalGoods = active.filter(
        (r) => r.controle !== "QUANTIDADE",
      ).length;
      fill.style.width = (totalGoods ? (goods / totalGoods) * 100 : 0) + "%";
      meter.setAttribute("aria-hidden", "true");
      meter.append(fill);
      card.append(
        title,
        counts,
        meter,
        el(
          "span",
          totalGoods
            ? Math.round((goods / totalGoods) * 100) + "% dos bens ativos"
            : "Nenhum bem individual ativo",
          "room-summary-state",
        ),
      );
      card.setAttribute(
        "aria-label",
        `${room}: ${goods} bens ativos, ${stockCount} estoques ativos. Consultar itens.`,
      );
      return card;
    }),
  );
}

function renderOverviewCharts() {
  const percent = (n, total) =>
    total ? Math.round((n / total) * 100) + "%" : "0%";
  const goods = rows.filter(
    (r) =>
      r.controle !== "QUANTIDADE" &&
      ["ATIVO", "EMPRESTADO", "BAIXADO"].includes(r.situacao),
  );
  const groups = [
    ["Ativos", "ATIVO", "#1376c5"],
    ["Emprestados", "EMPRESTADO", "#b17b2e"],
    ["Descartados", "BAIXADO", "#bb4561"],
  ].map(([label, state, color]) => ({
    label,
    state,
    color,
    n: goods.filter((r) => r.situacao === state).length,
  }));
  const visual = el("div", undefined, "status-visual"),
    ring = el("div", undefined, "status-ring"),
    center = el("div", undefined, "status-ring-center"),
    legend = el("div", undefined, "visual-legend");
  let offset = 0;
  const stops = groups.map((g) => {
    const start = offset;
    offset += goods.length ? (g.n / goods.length) * 360 : 0;
    return `${g.color} ${start}deg ${offset}deg`;
  });
  if (goods.length)
    ring.style.background = `conic-gradient(${stops.join(",")})`;
  ring.setAttribute("aria-hidden", "true");
  center.append(el("b", goods.length), el("span", "bens no gráfico"));
  ring.append(center);
  groups.forEach((g) => {
    const b = button("", () =>
      query({
        controle: "INDIVIDUAL",
        situacao: g.state,
      }),
    );
    b.style.setProperty("--segment", g.color);
    b.append(
      el("i", undefined, "legend-dot"),
      el("span", g.label),
      el("b", g.n),
      el("small", percent(g.n, goods.length)),
    );
    b.setAttribute(
      "aria-label",
      `${g.label}: ${g.n} bens individuais, ${percent(g.n, goods.length)}. Consultar.`,
    );
    legend.append(b);
  });
  visual.append(ring, legend);
  $("goodsStatusChart").replaceChildren(
    visual,
    el(
      "p",
      goods.length
        ? "Clique na legenda para consultar. Estoques e registros arquivados ficam fora deste gráfico."
        : "Nenhum bem individual cadastrado para este gráfico.",
      "visual-footnote",
    ),
  );
  const stocks = rows.filter(
    (r) => r.controle === "QUANTIDADE" && r.situacao === "ATIVO",
  );
  const health = [
    {
      label: "Acima do mínimo",
      color: "#1376c5",
      n: stocks.filter(
        (r) => Number(r.saldo) > 0 && Number(r.saldo) > Number(r.minimo),
      ).length,
    },
    {
      label: "No mínimo ou abaixo",
      color: "#b17b2e",
      n: stocks.filter(
        (r) => Number(r.saldo) > 0 && Number(r.saldo) <= Number(r.minimo),
      ).length,
    },
    {
      label: "Sem saldo",
      color: "#bb4561",
      n: stocks.filter((r) => Number(r.saldo) <= 0).length,
    },
  ];
  const heading = el("div", undefined, "stock-health-total"),
    track = el("div", undefined, "stock-health-track"),
    list = el("div");
  heading.append(
    el("b", stocks.length),
    el(
      "span",
      stocks.length === 1 ? "material acompanhado" : "materiais acompanhados",
    ),
  );
  track.setAttribute("aria-hidden", "true");
  health.forEach((g) => {
    if (g.n) {
      const segment = el("span");
      segment.style.width = (g.n / stocks.length) * 100 + "%";
      segment.style.setProperty("--segment", g.color);
      track.append(segment);
    }
    const line = el("div", undefined, "stock-health-row");
    line.style.setProperty("--segment", g.color);
    line.append(
      el("i", undefined, "legend-dot"),
      el("span", g.label),
      el("b", g.n),
      el("small", percent(g.n, stocks.length)),
    );
    list.append(line);
  });
  $("stockHealthChart").replaceChildren(
    heading,
    track,
    list,
    el(
      "p",
      stocks.length
        ? "Contagem de materiais cadastrados, sem somar unidades diferentes."
        : "Cadastre materiais por quantidade para acompanhar os estoques.",
      "visual-footnote",
    ),
  );
}

function renderMetrics() {
  const individual = rows.filter(
    (r) =>
      r.controle !== "QUANTIDADE" &&
      ["ATIVO", "EMPRESTADO"].includes(r.situacao),
  );
  const available = individual.filter((r) => r.situacao === "ATIVO").length,
    borrowed = individual.length - available;
  const active = rows.filter((r) => r.situacao === "ATIVO"),
    inUse = rows.filter((r) => ["ATIVO", "EMPRESTADO"].includes(r.situacao)),
    count = (f, v) => inUse.filter((r) => r.dados[f] === v).length;
  const lowStock = active
    .filter(
      (r) => r.controle === "QUANTIDADE" && Number(r.saldo) <= Number(r.minimo),
    )
    .sort(
      (a, b) =>
        Number(a.saldo > 0) - Number(b.saldo > 0) ||
        Number(a.saldo) / Math.max(1, Number(a.minimo)) -
          Number(b.saldo) / Math.max(1, Number(b.minimo)) ||
        String(a.dados.item).localeCompare(String(b.dados.item), "pt-BR"),
    );
  const metricButton = ([title, total, mark, filter]) => {
    const b = button(
      "",
      () => (filter ? query(filter) : revealStockWatch()),
      "stat",
      mark,
    );
    b.dataset.tone = mark;
    b.append(el("b", total), el("span", title));
    return b;
  };
  const loans = rows.filter((r) => r.situacao === "EMPRESTADO");
  const stockCount = active.filter((r) => r.controle === "QUANTIDADE").length;
  const primary = [
    [
      "Bens acompanhados",
      individual.length,
      "available",
      {
        controle: "INDIVIDUAL",
        situacao: "EM_USO",
      },
      `${available} ${available === 1 ? "ativo" : "ativos"} · ${borrowed} ${borrowed === 1 ? "emprestado" : "emprestados"}`,
    ],
    [
      "Bens emprestados",
      loans.length,
      "loan",
      {
        situacao: "EMPRESTADO",
      },
      "Empréstimos ainda em aberto",
    ],
    [
      "Materiais em estoque",
      stockCount,
      "stock",
      {
        situacao: "ATIVO",
        controle: "QUANTIDADE",
      },
      "Cadastros por quantidade",
    ],
    [
      "Materiais para repor",
      lowStock.length,
      "stock-alert",
      null,
      "Saldo no mínimo ou abaixo dele",
    ],
  ];
  $("stats").replaceChildren(
    ...primary.map((metric) => {
      const b = metricButton(metric);
      b.append(el("small", metric[4]));
      return b;
    }),
  );
  renderExecutiveSummary(active, loans, lowStock);
  renderOverviewCharts();
  chart(
    "typeChart",
    Object.entries(TYPE).map(([v, n]) => [
      n,
      individual.filter((r) => r.dados.tipo === v).length,
      v,
    ]),
    individual.length,
    (v) =>
      query({
        tipo: v,
        controle: "INDIVIDUAL",
        situacao: "EM_USO",
      }),
  );
  $("sideTotal").textContent = active.length;
  const a = active.length
      ? (count("ambiente", ROOMS[0]) / active.length) * 360
      : 0,
    b = active.length ? (count("ambiente", ROOMS[1]) / active.length) * 360 : 0;
  $("sideRing").style.background =
    `conic-gradient(#b6e4ff 0deg ${a}deg,#65a0d0 ${a}deg ${a + b}deg,#526473 ${a + b}deg 360deg)`;
  $("sideRooms").replaceChildren(
    ...ROOMS.map((room) => {
      const n = button(
        room,
        () =>
          query({
            ambiente: room,
            situacao: "ATIVO",
          }),
        "",
        ROOM_ICON[room],
      );
      n.append(el("b", count("ambiente", room)));
      return n;
    }),
  );
  $("stockAlertCount").textContent =
    lowStock.length + (lowStock.length === 1 ? " material" : " materiais");
  const numberBR = (n) =>
    Number(n).toLocaleString("pt-BR", {
      maximumFractionDigits: 3,
    });
  $("stockAlerts").replaceChildren(
    ...(lowStock.length
      ? lowStock.map((r) => {
          const card = el("article", undefined, "stock-alert-card");
          const state = el("span", undefined, "stock-alert-status");
          state.append(
            icon("stock-alert"),
            el(
              "span",
              Number(r.saldo) <= 0
                ? "Sem saldo"
                : Number(r.saldo) < Number(r.minimo)
                  ? "Abaixo do mínimo"
                  : "No mínimo",
            ),
          );
          const amounts = el("div", undefined, "stock-alert-values");
          const unit =
            {
              unidade: "un.",
              rolo: "rolo",
              kg: "kg",
              metro: "m",
              litro: "L",
              caixa: "cx.",
            }[r.unidade] ||
            r.unidade ||
            "un.";
          for (const [label, n] of [
            [`Saldo (${unit})`, r.saldo],
            [`Mínimo (${unit})`, r.minimo],
          ]) {
            const group = el("div");
            group.append(el("small", label), el("strong", numberBR(n)));
            amounts.append(group);
          }
          const actions = el("div", undefined, "attention-actions");
          actions.append(
            button("Consultar", () => openDashboardRecord(r), "", "right"),
          );
          if (role !== "leitor")
            actions.append(
              button(
                "Registrar entrada",
                () => openOperation("entrada", r),
                "",
                "stock-in",
              ),
            );
          card.append(
            el("h4", r.dados.item),
            state,
            amounts,
            el(
              "p",
              [r.dados.ambiente, locationText(r)].filter(Boolean).join(" · "),
              "hint stock-alert-location",
            ),
            actions,
          );
          return card;
        })
      : [
          el(
            "p",
            active.some((r) => r.controle === "QUANTIDADE")
              ? "Nenhum material precisa de reposição pelo mínimo definido."
              : "Os materiais com saldo baixo aparecerão aqui após o cadastro do estoque.",
            "dashboard-empty",
          ),
        ]),
  );
  syncDashboardList("stockAlerts", "toggleStockAlerts", 3, "materiais");
  renderMobileDashboard();
}

function openItemDeletion(record) {
  if (role !== "admin" || busy || pending) return;
  deletionTarget = record;
  deletionKey = crypto.randomUUID();
  $("deleteItemName").textContent = record.dados.item;
  $("deleteItemCode").textContent = internal(record.id);
  $("deleteItemConfirmation").value = "";
  $("deleteItemConfirmation").setCustomValidity("");
  $("deleteItemError").textContent = "";
  showAcervoDialog($("deleteItemDialog"));
}

function passwordRequirements(password) {
  return {
    length: Array.from(password).length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special:
      Array.from(password).filter((c) => PASSWORD_SYMBOLS.includes(c)).length >=
      2,
  };
}

function mustChangePassword(person) {
  return person?.app_metadata?.acervo_primeiro_acesso === true;
}

function setPasswordVisibility(button, show) {
  $(button.dataset.passwordTarget).type = show ? "text" : "password";
  button.setAttribute(
    "aria-label",
    (show ? "Ocultar " : "Mostrar ") + button.dataset.passwordLabel,
  );
  button.setAttribute("aria-pressed", String(show));
  button
    .querySelector("use")
    .setAttribute("href", show ? "#i-eye-off" : "#i-eye");
}

function resetPasswordVisibility() {
  document
    .querySelectorAll("[data-password-target]")
    .forEach((button) => setPasswordVisibility(button, false));
}

function updatePasswordRules() {
  const checks = passwordRequirements($("newPassword").value);
  document
    .querySelectorAll("[data-password-rule]")
    .forEach((node) =>
      node.classList.toggle("met", checks[node.dataset.passwordRule]),
    );
  const met = Object.values(checks).filter(Boolean).length;
  $("passwordRuleProgress").value = met;
  $("passwordRuleCount").textContent = met + " de 5 requisitos atendidos";
  const confirmed = $("confirmPassword").value;
  const match = !!confirmed && confirmed === $("newPassword").value;
  $("passwordMatchHint").textContent = !confirmed
    ? "Digite a mesma senha nos dois campos."
    : match
      ? "As senhas coincidem."
      : "As senhas ainda estão diferentes.";
  $("passwordMatchHint").classList.toggle("matched", match);
  $("saveFirstPassword").disabled =
    passwordChanging ||
    !Object.values(checks).every(Boolean) ||
    $("newPassword").value !== $("confirmPassword").value;
}

function resetFirstAccess() {
  $("firstAccessForm").reset();
  firstAccessSaved = false;
  $("newPassword").disabled = $("confirmPassword").disabled = false;
  $("login").classList.remove("first-access-active");
  resetPasswordVisibility();
  $("firstAccess").hidden = true;
  $("loginForm").hidden = false;
  $("loginHeading").textContent = "Bem-vindo.";
  $("firstAccessMessage").textContent = "";
  passwordChanging = false;
  $("leaveFirstAccess").disabled = false;
  updatePasswordRules();
}

function showFirstAccess() {
  clearInterval(pollTimer);
  $("app").hidden = true;
  $("login").hidden = false;
  $("loginForm").hidden = true;
  $("firstAccess").hidden = false;
  $("login").classList.add("first-access-active");
  updatePasswordRules();
  $("loginHeading").textContent = "Defina sua senha.";
  $("loginMessage").textContent = "";
  $("loginButton").disabled = false;
  $("newPassword").focus();
}

async function accessService(body) {
  if (IS_DEMO) {
    if (body.acao === "trocar_senha") {
      if (!Object.values(passwordRequirements(body.senha || "")).every(Boolean))
        throw Error("A nova senha precisa atender aos requisitos indicados.");
      user.app_metadata = {
        ...user.app_metadata,
        acervo_primeiro_acesso: false,
      };
      return {
        ok: true,
      };
    }
    if (role !== "admin")
      throw Error("Somente administradores podem gerenciar pessoas.");
    if (!demoPeople)
      demoPeople = [
        {
          id: user.id,
          nome: "Administrador da demonstração",
          email: user.email,
          perfil: "admin",
          primeiro_acesso: false,
        },
        {
          id: "22222222-2222-4222-8222-222222222222",
          nome: "Pessoa de exemplo",
          email: "pessoa.demo@acervo.invalid",
          perfil: "editor",
          primeiro_acesso: true,
        },
      ];
    if (body.acao === "listar_usuarios") {
      const search = String(body.busca || "").toLowerCase();
      const all = demoPeople.filter((p) =>
        (p.nome + " " + p.email).toLowerCase().includes(search),
      );
      return {
        ok: true,
        pessoas: all,
        total: all.length,
        pagina: 1,
        limite: 30,
        demonstracao: true,
      };
    }
    if (body.acao === "criar_usuario") {
      if (demoPeople.some((p) => p.email === body.email))
        throw Error("Já existe uma conta com esse e-mail.");
      const person = {
        id: crypto.randomUUID(),
        nome: body.nome,
        email: body.email,
        perfil: body.perfil || "leitor",
        primeiro_acesso: true,
      };
      demoPeople.push(person);
      return {
        ok: true,
        ...person,
        senha_inicial: "curitiba",
        demonstracao: true,
      };
    }
    if (body.usuario === user.id)
      throw Error("Sua própria conta permanece como administradora.");
    const person = demoPeople.find((p) => p.id === body.usuario);
    if (!person) throw Error("Essa conta não foi encontrada.");
    if (body.acao === "alterar_perfil") person.perfil = body.perfil;
    else if (body.acao === "excluir_usuario")
      demoPeople = demoPeople.filter((p) => p.id !== body.usuario);
    else throw Error("Operação não reconhecida.");
    return {
      ok: true,
      demonstracao: true,
    };
  }
  const { data, error } = await db.functions.invoke("acervo-acessos", {
    body,
  });
  if (error) {
    let message =
      "Não foi possível concluir. O recurso de acesso precisa estar ativado pelo administrador.";
    try {
      const result = await error.context?.json();
      if (result?.message) message = result.message;
    } catch {}
    throw Error(message);
  }
  if (!data?.ok)
    throw Error(data?.message || "Não foi possível concluir a operação.");
  return data;
}

function personInitials(person) {
  return (person.nome || person.email || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((v) => v[0])
    .join("")
    .toUpperCase();
}

function setAccessView(mode) {
  if (mode !== "list") {
    ++peopleRequest;
    clearTimeout(peopleSearchTimer);
  }
  accessMode = mode;
  $("peoplePanel").hidden = mode !== "list";
  $("newUserForm").hidden = mode !== "create";
  $("personRoleForm").hidden = mode !== "profile";
  $("newUserResult").hidden = mode !== "result";
  $("accessBack").hidden = mode === "list";
  $("userAccessDialog").classList.toggle("creating-person", mode !== "list");
  $("newUserMessage").textContent = "";
  const labels = {
    list: [
      "Gerenciar pessoas",
      "Veja quem tem uma conta, escolha o perfil e gerencie os acessos ao Acervo.",
      "users",
    ],
    create: [
      "Adicionar pessoa",
      "Crie uma conta com nome, e-mail e perfil. No primeiro acesso, a pessoa define sua própria senha.",
      "user-add",
    ],
    profile: [
      "Alterar perfil",
      "Escolha o que essa pessoa poderá fazer no Acervo. A alteração vale para as próximas operações.",
      "shield-key",
    ],
    result: [
      "Conta cadastrada",
      "Repasse o e-mail e a senha inicial à pessoa. Ela criará sua própria senha ao entrar.",
      "check",
    ],
  };
  if (mobileAcervo()) {
    labels.list = ["Pessoas", "Gerencie os acessos ao Acervo.", "users"];
    labels.create = [
      "Adicionar pessoa",
      "Cadastre a pessoa e escolha o perfil.",
      "user-add",
    ];
    labels.profile = [
      "Perfil de acesso",
      "Escolha as permissões desta pessoa.",
      "shield-key",
    ];
    labels.result = [
      "Acesso criado",
      "Compartilhe as instruções de primeiro acesso.",
      "check",
    ];
  }
  if (mobileAcervo() && mode === "create")
    labelButton($("newUserSave"), "Criar acesso");
  $("userAccessTitle").textContent = labels[mode][0];
  $("userAccessDescription").textContent = labels[mode][1];
  $("userAccessMark")
    .querySelector("use")
    .setAttribute("href", "#i-" + labels[mode][2]);
}

function resetPeopleManagement() {
  ++peopleRequest;
  clearTimeout(peopleSearchTimer);
  peopleRows = [];
  peoplePage = 1;
  peopleTotal = 0;
  profileTarget = null;
  deleteTarget = null;
  accessSaving = false;
  $("peopleSearch").value = "";
  $("peopleList").replaceChildren();
  $("peopleList").setAttribute("aria-busy", "false");
  $("peopleCount").textContent = "";
  $("peoplePagination").hidden = true;
  $("personRoleForm").reset();
  if ($("deletePersonDialog").open) $("deletePersonDialog").close();
  $("deletePersonName").textContent =
    $("deletePersonEmail").textContent =
    $("deletePersonMessage").textContent =
      "";
  $("profilePersonName").textContent =
    $("profilePersonEmail").textContent =
    $("profilePersonAvatar").textContent =
      "";
  $("newUserMessage").textContent = "";
  $("newUserForm").reset();
  $("newUserResult").replaceChildren();
  setPeopleBusy(false);
  labelButton($("newUserSave"), "Cadastrar pessoa", "user-add");
  labelButton($("savePersonRole"), "Salvar perfil", "check");
  labelButton($("confirmPersonDelete"), "Excluir pessoa", "discard");
  setAccessView("list");
}

function setPeopleBusy(value) {
  accessSaving = value;
  for (const id of [
    "closeUserAccess",
    "accessBack",
    "newUserSave",
    "savePersonRole",
    "cancelPersonRole",
    "confirmPersonDelete",
    "cancelPersonDelete",
  ])
    $(id).disabled = value;
  $("newUserForm").setAttribute("aria-busy", String(value));
  $("personRoleForm").setAttribute("aria-busy", String(value));
}

function renderPeople() {
  const nodes = peopleRows.map((person) => {
    const row = el("div", undefined, "people-row");
    const avatar = el("span", personInitials(person), "people-avatar");
    avatar.setAttribute("aria-hidden", "true");
    const info = el("div", undefined, "people-person");
    const name = el("div", person.nome || person.email, "people-name");
    const self = person.id === user?.id;
    if (self) name.append(el("span", "Você", "people-self"));
    const meta = el("div", undefined, "people-meta");
    meta.append(
      el(
        "span",
        PEOPLE_ROLES[person.perfil] || "Sem acesso",
        "people-role " + (person.perfil || "unassigned"),
      ),
    );
    if (person.perfil)
      meta.append(
        el(
          "span",
          person.primeiro_acesso
            ? "Primeiro acesso pendente"
            : "Acesso liberado",
          "people-status",
        ),
      );
    info.append(name, el("p", person.email, "people-email"), meta);
    const actions = el("div", undefined, "people-actions");
    const profile = el("button");
    profile.type = "button";
    labelButton(
      profile,
      person.perfil ? "Alterar perfil" : "Liberar acesso",
      "shield-key",
    );
    profile.disabled = self;
    profile.setAttribute(
      "aria-label",
      (person.perfil ? "Alterar perfil de " : "Liberar acesso de ") +
        (person.nome || person.email),
    );
    if (self) profile.title = "Sua conta permanece como administradora.";
    profile.onclick = () => editPersonRole(person);
    const remove = el("button", undefined, "danger");
    remove.type = "button";
    labelButton(remove, "Excluir", "discard");
    remove.disabled = self;
    remove.setAttribute(
      "aria-label",
      "Excluir " + (person.nome || person.email),
    );
    if (self) remove.title = "Você não pode excluir sua própria conta.";
    remove.onclick = () => confirmPersonRemoval(person);
    actions.append(profile, remove);
    if (mobileAcervo()) {
      const menu = el("details", undefined, "people-overflow");
      const toggle = el("summary", "•••");
      toggle.setAttribute(
        "aria-label",
        "Ações de " + (person.nome || person.email),
      );
      menu.append(toggle, actions);
      menu.addEventListener("toggle", () => {
        if (menu.open)
          $("peopleList")
            .querySelectorAll(".people-overflow")
            .forEach((other) => {
              if (other !== menu) other.open = false;
            });
      });
      menu.addEventListener("click", (event) => {
        if (event.target.closest("button")) menu.open = false;
      });
      row.append(avatar, info, menu);
    } else row.append(avatar, info, actions);
    return row;
  });
  $("peopleList").replaceChildren(
    ...(nodes.length
      ? nodes
      : [
          acervoEmpty(
            "Ainda não encontramos por aqui.",
            "Tente outro nome ou e-mail. Para um novo acesso, use Adicionar pessoa.",
          ),
        ]),
  );
  if (mobileAcervo())
    for (const row of $("peopleList").querySelectorAll(".people-row")) {
      const badge = row.querySelector(".people-role");
      if (badge) row.insertBefore(badge, row.querySelector(".people-overflow"));
    }
  $("peopleCount").textContent =
    peopleTotal + (peopleTotal === 1 ? " pessoa" : " pessoas");
  const pages = Math.max(1, Math.ceil(peopleTotal / peopleLimit));
  $("peoplePagination").hidden = pages <= 1;
  $("peoplePage").textContent = peoplePage + " de " + pages;
  $("peoplePrevious").disabled = peoplePage <= 1;
  $("peopleNext").disabled = peoplePage >= pages;
}

function showPeopleLoading() {
  const loading = el("div", undefined, "people-loading"),
    status = el("p", undefined, "people-loading-status"),
    spinner = acervoBooks();
  spinner.setAttribute("aria-hidden", "true");
  status.setAttribute("role", "status");
  status.append(spinner, el("span", "Quem cuida do acervo está chegando."));
  loading.append(status);
  for (let i = 0; i < 3; i++) {
    const row = el("div", undefined, "people-skeleton"),
      copy = el("div", undefined, "people-skeleton-copy");
    row.setAttribute("aria-hidden", "true");
    copy.append(
      el("span", undefined, "people-skeleton-line"),
      el("span", undefined, "people-skeleton-line"),
    );
    row.append(el("span", undefined, "people-skeleton-avatar"), copy);
    loading.append(row);
  }
  $("peopleCount").textContent = "";
  $("peopleList").replaceChildren(loading);
}

async function loadPeople(page = peoplePage) {
  if (role !== "admin" || !$("userAccessDialog").open) return;
  clearTimeout(peopleSearchTimer);
  const request = ++peopleRequest,
    owner = user?.id;
  $("newUserMessage").textContent = "";
  $("peopleList").setAttribute("aria-busy", "true");
  showPeopleLoading();
  $("peoplePagination").hidden = true;
  try {
    const result = await accessService({
      acao: "listar_usuarios",
      busca: $("peopleSearch").value.trim(),
      pagina: page,
    });
    if (
      request !== peopleRequest ||
      owner !== user?.id ||
      !$("userAccessDialog").open
    )
      return;
    peopleRows = result.pessoas || [];
    peoplePage = result.pagina || 1;
    peopleTotal = result.total || 0;
    peopleLimit = result.limite || 30;
    renderPeople();
  } catch (error) {
    if (
      request !== peopleRequest ||
      owner !== user?.id ||
      !$("userAccessDialog").open
    )
      return;
    peopleRows = [];
    $("peopleCount").textContent = "";
    $("peopleList").replaceChildren(
      el(
        "p",
        "A lista não pôde ser carregada. Use Atualizar para tentar novamente.",
        "people-empty",
      ),
    );
    $("newUserMessage").textContent = error.message;
  } finally {
    if (request === peopleRequest && owner === user?.id)
      $("peopleList").setAttribute("aria-busy", "false");
  }
}

function returnToPeople() {
  if (accessSaving) return;
  profileTarget = null;
  setAccessView("list");
  loadPeople();
  focusAcervoDialog($("userAccessDialog"), "peopleSearch");
}

function editPersonRole(person) {
  if (role !== "admin" || accessSaving || person.id === user?.id) return;
  profileTarget = person;
  $("personRoleForm").reset();
  $("profilePersonAvatar").textContent = personInitials(person);
  $("profilePersonName").textContent = person.nome || person.email;
  $("profilePersonEmail").textContent = person.email;
  $("personRoleForm").querySelector(
    `input[value="${PEOPLE_ROLES[person.perfil] ? person.perfil : "leitor"}"]`,
  ).checked = true;
  setAccessView("profile");
  $("personRoleForm").querySelector("input:checked").focus();
}

function confirmPersonRemoval(person) {
  if (role !== "admin" || accessSaving || person.id === user?.id) return;
  deleteTarget = person;
  $("deletePersonName").textContent = person.nome || person.email;
  $("deletePersonEmail").textContent = person.email;
  $("deletePersonMessage").textContent = "";
  showAcervoDialog($("deletePersonDialog"));
  $("cancelPersonDelete").focus();
}

async function loginReady(session, initialPassword = false) {
  if (!session?.user?.id) throw Error("Sessão inválida. Entre novamente.");
  if (user && user.id !== session.user.id) endSession();
  let verified = session.user;
  if (!IS_DEMO) {
    const { data, error } = await db.auth.getUser();
    if (error || !data?.user || data.user.id !== session.user.id)
      throw Error("Não foi possível verificar sua sessão. Entre novamente.");
    verified = data.user;
  }
  user = initialPassword
    ? {
        ...verified,
        app_metadata: {
          ...verified.app_metadata,
          acervo_primeiro_acesso: true,
        },
      }
    : verified;
  if (mustChangePassword(user)) {
    showFirstAccess();
    return;
  }
  resetFirstAccess();
  pending = storage("pending");
  const userDisplayName =
    String(user.user_metadata?.nome || shortEmail(user.email)).trim() ||
    "Pessoa";
  $("account").textContent = userDisplayName;
  $("account").title = userDisplayName;
  $("accountAvatar").textContent = userDisplayName
    .charAt(0)
    .toLocaleUpperCase("pt-BR");
  $("accountRole").textContent = "Acesso ao Acervo";
  $("login").hidden = true;
  $("app").hidden = false;
  $("logout").hidden = false;
  try {
    await refresh(true);
    restoreDraft();
    syncFieldIdentity();
    setBusy(false);
    if (role === "leitor") showTab("browse");
    startPolling();
    if (mobileCamera()) {
      warmBarcode();
      warmOCR();
    }
  } catch (e) {
    $("app").hidden = true;
    $("login").hidden = false;
    $("loginMessage").textContent = e.message;
  }
}

function initForm() {
  mountControlFields($("controlHost"));
  const rest = $("formRest"),
    fields = $("fields");
  const roomStep = $("rooms").closest(".step");
  const identityStep = $("types").closest(".step");
  const header = el("div");
  header.id = "registrationHeader";
  const bar = $("register").querySelector(".workspace > .card > .bar");
  const rooms = $("rooms").closest("fieldset");
  rooms.id = "registrationRooms";
  header.append(bar.querySelector("h2"), rooms);
  bar.remove();
  const body = el("div");
  body.id = "registrationBody";
  const main = el("div");
  main.id = "registrationMain";
  const item = el("div");
  item.id = "registrationItem";
  item.append(
    $("item").previousElementSibling,
    $("item"),
    $("suggestions"),
    $("learningHint"),
  );
  item.querySelector("label").prepend(icon("draft"));
  const category = $("categories").closest("fieldset");
  category.id = "registrationCategory";
  category.querySelector("legend").prepend(icon("composition"));
  const identity = $("types").closest("fieldset");
  identity.id = "identityBlock";
  identity.classList.remove("spaced");
  const control = $("controlHost");
  control.classList.remove("step");
  identity
    .querySelector("legend")
    .after(
      registrationGroupHeading(
        "identityHeading",
        "Identificação",
        "Qual código identifica o item?",
        "code",
      ),
    );
  control.prepend(
    registrationGroupHeading(
      "controlHeading",
      "Controle",
      "Como acompanhar o item?",
      "stock",
    ),
  );
  const notes = $("notesBlock"),
    location = $("location"),
    code = $("codeWrap");
  main.append(item, category, rest, notes);
  identity.append(code);
  rest.replaceChildren(identity, control);
  body.append(location, main);
  roomStep.remove();
  identityStep.remove();
  fields.prepend(header, body);
  $("itemForm").addEventListener("input", updateRegistrationSummary);
  $("itemForm").addEventListener("change", updateRegistrationSummary);
  $("discardRegistration").onclick = openRegistrationDiscard;
  $("directReason").addEventListener("input", saveDraft);
  $("registrationDiscardDialog").addEventListener("cancel", (event) => {
    if (busy) event.preventDefault();
  });
  $("registrationDiscardForm").onsubmit = (event) => {
    event.preventDefault();
    if (
      !busy &&
      $("registrationDiscardForm").reportValidity() &&
      mobileRegistrationValidity() &&
      saveRecord("", true)
    )
      $("registrationDiscardDialog").close();
  };
  $("moveSearch").oninput = renderMovementResults;
  $("moveScan").hidden = !mobileCamera();
  $("moveScan").onclick = () => openScanner("moveSearch");
  $("createDown").onclick = () => {
    if (
      clean($("item").value) &&
      !confirm(
        "Substituir o rascunho atual por um cadastro de item descartado?",
      )
    )
      return;
    $("repeat").checked = false;
    resetForm();
    showTab("register");
    syncDirectDown();
    toast("Preencha a ficha e use Descartar para concluir.");
    const q = $("moveSearch").value.trim();
    if (/^\d{6}$/.test(q)) $("code").value = q;
    $("item").focus();
    saveDraft();
  };
  choices(
    $("categories"),
    "category",
    CATEGORIES.map((v) => [v, v, CATEGORY_ICON[v]]),
    "",
    () => {
      manual.categoria = true;
    },
  );
  choices(
    $("types"),
    "type",
    Object.entries(TYPE).map(([v, t]) => [v, t, TYPE_ICON[v]]),
    "",
    () => {
      manual.tipo = true;
      $("code").value = "";
      syncCode();
    },
  );
  choices(
    $("rooms"),
    "room",
    ROOMS.map((v) => [v, v, ROOM_ICON[v]]),
    ROOMS[0],
    () => {
      syncLocation();
      syncControl();
    },
  );
  choices($("shelves"), "shelf", [..."ABCDE"], "", () => syncLocation(), false);
  choices(
    $("levels"),
    "level",
    [1, 2, 3, 4, 5, 6].map((v) => [String(v), String(v).padStart(2, "0")]),
    "",
    () => syncLocation(),
    false,
  );
  syncForm();
  renderFilters();
  renderList();
}

function endSession() {
  resetFirstAccess();
  if ($("deleteItemDialog").open) $("deleteItemDialog").close();
  deletionTarget = deletionKey = null;
  if ($("registrationDiscardDialog").open)
    $("registrationDiscardDialog").close();
  finishEdit();
  clearTimeout(toastTimer);
  $("toast").hidden = true;
  if ($("userAccessDialog").open) $("userAccessDialog").close();
  resetPeopleManagement();
  demoPeople = null;
  $("inventoryDetails").open = false;
  setAcervoSync(false);
  for (const id of ["stockAlerts", "movementTimeline"])
    $(id).classList.remove("expanded");
  $("toggleStockAlerts").hidden = $("toggleMovementTimeline").hidden = true;
  $("newUserForm").reset();
  $("newUserResult").replaceChildren();
  $("newUserResult").hidden = true;
  $("manageAccess").hidden = true;
  clearInterval(pollTimer);
  storage("draft", null);
  closeScanner();
  timelineGeneration++;
  timelineCache.clear();
  pending = null;
  selected = null;
  action = "";
  role = "leitor";
  resetForm();
  $("password").value = "";
  $("moveSearch").value = "";
  $("search").value = "";
  $("saved").replaceChildren();
  $("saved").hidden = true;
  for (const id of [
    "moveResults",
    "movementTimeline",
    "stats",
    "secondaryStats",
    "roomChart",
    "categoryChart",
    "typeChart",
    "topChart",
    "recent",
    "rackMap",
    "availability",
    "stockAlerts",
    "suggestions",
  ])
    $(id)?.replaceChildren();
  user = null;
  rows = [];
  checks = [];
  editor = null;
  expanded = null;
  lastSnapshot = "";
  $("app").hidden = true;
  $("login").hidden = false;
  $("logout").hidden = true;
  $("account").textContent = "Sessão encerrada";
  $("account").removeAttribute("title");
  $("accountAvatar").textContent = "A";
  $("accountRole").textContent = "Acesso ao Acervo";
  $("results").replaceChildren();
  if ($("operation").open) $("operation").close();
  journey.maxStage = journey.draftStage = 1;
  journey.movementId = null;
  journey.movementReceipt = "";
  if ($("mobileJourneyHome")) {
    $("register").dataset.journey = "home";
    syncMobileJourney();
  }
}

function excelDate(value) {
  if (!value) return null;
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date(value))
      .map((x) => [x.type, x.value]),
  );
  return new Date(
    Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second),
  );
}

async function exportExcel(all) {
  if (busy) return;
  setBusy(true, "Aguarde…");
  const exportVisual = setAcervoSync(true, "Montando seu acervo em planilha…");
  try {
    await refresh();
    if (!window.ExcelJS)
      throw Error("A biblioteca do Excel ainda não carregou. Tente novamente.");
    const emitted = new Date();
    const list = all ? [...rows] : filtered();
    const wb = new ExcelJS.Workbook();
    wb.creator = "ACERVO";
    wb.created = emitted;
    wb.modified = emitted;
    wb.subject = "Gestão de bens e materiais · Curitiba";
    wb.calcProperties.fullCalcOnLoad = true;
    const color = {
      green: "FF124FA3",
      lime: "FFB6E4FF",
      ink: "FF19304D",
      muted: "FF607489",
      soft: "FFF1F5FC",
      paper: "FFF3F5F7",
      white: "FFFFFFFF",
      line: "FFDCE5F1",
      amber: "FF99642C",
      warning: "FFFCF5E8",
      chart: "FF357CAF",
      neutral: "FFE4EAF0",
    };
    const filterNames = {
      controle: "Controle",
      ambiente: "Ambiente",
      categoria: "Categoria",
      tipo: "Identificação",
      situacao: "Situação",
      estante: "Estante",
      prateleira: "Prateleira",
      dia: "Cadastro",
      item: "Item",
    };
    const scope = all
      ? "Inventário completo"
      : Object.entries(filters)
          .filter(([, v]) => v)
          .map(
            ([k, v]) =>
              (filterNames[k] || k) +
              ": " +
              (TYPE[v] ||
                (v === "TODOS" ? "Todos os registros" : STATUS[v]) ||
                {
                  EM_USO: "Em uso",
                  INDIVIDUAL: "Individual",
                  QUANTIDADE: "Por quantidade",
                }[v] ||
                v),
          )
          .concat(
            !filters.situacao
              ? ["Situação: Lista corrente (sem arquivados)"]
              : [],
          )
          .concat($("search").value ? ["Busca: " + $("search").value] : [])
          .join(" · ") || "Lista corrente";
    const issued = dateBR(emitted);
    const shortDate = (v) =>
      v
        ? new Intl.DateTimeFormat("pt-BR", {
            timeZone: ZONE,
            dateStyle: "short",
          }).format(new Date(v))
        : "";
    const fill = (argb) => ({
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb,
      },
    });
    function cellBorders(tone = "FFBCCDE1") {
      const edge = () => ({ style: "thin", color: { argb: tone } });
      return { top: edge(), right: edge(), bottom: edge(), left: edge() };
    }
    function formatStatusCell(cell) {
      const tones = {
        Ativo: ["FFDCEBFF", "FF0D438A", "FF7FA7D6"],
        Emprestado: ["FFDEF1F8", "FF125C7A", "FF86B7CD"],
        Descartado: ["FFF9E1E7", "FF8E2340", "FFD895A8"],
        Arquivado: ["FFE8EDF4", "FF465B71", "FFB2BDC9"],
      };
      const tone = tones[String(cell.value)];
      if (!tone) return;
      cell.fill = fill(tone[0]);
      cell.font = {
        name: "Aptos",
        size: 10,
        bold: true,
        color: { argb: tone[1] },
      };
      cell.border = cellBorders(tone[2]);
      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
        indent: 0,
      };
    }
    function text(ws, range, value, options = {}) {
      if (range.includes(":")) ws.mergeCells(range);
      const cell = ws.getCell(range.split(":")[0]);
      cell.value = value;
      cell.font = {
        name: options.serif ? "Georgia" : "Aptos",
        size: options.size || 11,
        color: {
          argb: options.fg || color.ink,
        },
        bold: !!options.bold,
      };
      cell.alignment = {
        vertical: "middle",
        horizontal: options.align || "left",
        wrapText: true,
        indent: options.indent || 0,
      };
      if (options.bg) cell.fill = fill(options.bg);
      if (options.border) cell.border = options.border;
      return cell;
    }
    function paint(ws, firstRow, lastRow, firstCol, lastCol, bg) {
      for (let r = firstRow; r <= lastRow; r++)
        for (let c = firstCol; c <= lastCol; c++)
          ws.getCell(r, c).fill = fill(bg);
    }
    const measure = document.createElement("canvas").getContext("2d");
    measure.font = "14.67px Arial";
    function wrap(value, pixels) {
      const lines = [];
      String(value ?? "")
        .split(/\r?\n/)
        .forEach((paragraph) => {
          let line = "";
          for (const word of paragraph.split(/\s+/).filter(Boolean)) {
            const next = line ? line + " " + word : word;
            if (measure.measureText(next).width <= pixels) {
              line = next;
              continue;
            }
            if (line) {
              lines.push(line);
              line = "";
            }
            let part = "";
            for (const ch of word) {
              if (part && measure.measureText(part + ch).width > pixels) {
                lines.push(part);
                part = "";
              }
              part += ch;
            }
            line = part;
          }
          lines.push(line);
        });
      return lines;
    }
    const logo = new Image();
    logo.src =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDY0IDY0Ij4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYWNlcnZvLWJsdWUiIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjdiMWYzIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMC40OCIgc3RvcC1jb2xvcj0iIzA4N2NkZCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwNTQ4OWMiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgcng9IjE2IiBmaWxsPSJ1cmwoI2FjZXJ2by1ibHVlKSIvPgogIDxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyLjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CiAgICA8cmVjdCB4PSIxNiIgeT0iMjEiIHdpZHRoPSIxNSIgaGVpZ2h0PSIyOSIgcng9IjMiLz4KICAgIDxyZWN0IHg9IjM0IiB5PSIxNCIgd2lkdGg9IjE1IiBoZWlnaHQ9IjM2IiByeD0iMyIvPgogICAgPHBhdGggZD0iTTIxIDI3aDVNMjEgMzJoNU0zOSAyMGg1TTM5IDI1aDVNMzkgMzBoNU0xNCA1MWgzOCIvPgogIDwvZz4KPC9zdmc+Cg==";
    await logo.decode().catch(() => {});
    const municipalityMark = document.querySelector(".institution-logo");
    const imageCache = new Map();
    async function graphicIcon(name, tone = "#155bb9") {
      const key = name + tone;
      if (imageCache.has(key)) return imageCache.get(key);
      const symbol = document.getElementById("i-" + name);
      if (!symbol) return null;
      const image = new Image();
      const loaded = new Promise((resolve) => {
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
      });
      image.src =
        "data:image/svg+xml;charset=utf-8," +
        encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="' +
            tone +
            '" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
            symbol.innerHTML +
            "</svg>",
        );
      const result = await loaded;
      imageCache.set(key, result);
      return result;
    }
    function graphic(width, height) {
      const canvas = document.createElement("canvas");
      canvas.width = width * 2;
      canvas.height = height * 2;
      const context = canvas.getContext("2d");
      context.scale(2, 2);
      return { canvas, context };
    }
    function rounded(context, x, y, width, height, radius, bg, shadow = false) {
      context.save();
      if (shadow) {
        context.shadowColor = "#174c8720";
        context.shadowBlur = 22;
        context.shadowOffsetY = 7;
      }
      context.beginPath();
      context.roundRect(x, y, width, height, radius);
      context.fillStyle = bg;
      context.fill();
      context.restore();
    }
    function label(
      context,
      value,
      x,
      y,
      size = 18,
      tone = "#173659",
      weight = 400,
      max = Infinity,
    ) {
      context.save();
      context.font = weight + " " + size + "px Arial";
      context.fillStyle = tone;
      let text = String(value ?? "");
      if (context.measureText(text).width > max) {
        while (text.length && context.measureText(text + "…").width > max)
          text = text.slice(0, -1);
        text += "…";
      }
      context.fillText(text, x, y);
      context.restore();
    }
    function contain(context, image, x, y, width, height, white = false) {
      if (!image?.complete || !image.naturalWidth) return;
      const ratio = Math.min(
        width / image.naturalWidth,
        height / image.naturalHeight,
      );
      const w = image.naturalWidth * ratio,
        h = image.naturalHeight * ratio;
      context.save();
      if (white) context.filter = "brightness(0) invert(1)";
      context.drawImage(image, x + (width - w) / 2, y + (height - h) / 2, w, h);
      context.restore();
    }
    async function drawExportPanel() {
      const ws = wb.addWorksheet("Resumo", {
        properties: { tabColor: { argb: color.green } },
        views: [{ showGridLines: false, zoomScale: 90 }],
        pageSetup: {
          paperSize: 9,
          orientation: "landscape",
          fitToPage: true,
          fitToWidth: 1,
          fitToHeight: 1,
          printArea: "A1:D40",
          margins: {
            left: 0.2,
            right: 0.2,
            top: 0.2,
            bottom: 0.2,
            header: 0.08,
            footer: 0.08,
          },
        },
      });
      ws.columns = Array.from({ length: 4 }, () => ({ width: 40 }));
      const panelWidth = 4 * (40 * 7 + 5),
        panelHeight = (panelWidth * 1160) / 1600;
      const panelRowHeight = (panelHeight * 0.75) / 40;
      for (let row = 1; row <= 40; row++)
        ws.getRow(row).height = panelRowHeight;
      paint(ws, 1, 40, 1, 4, "FFEAF1FC");
      const { canvas, context: c } = graphic(1600, 1160);
      c.fillStyle = "#eaf1fc";
      c.fillRect(0, 0, 1600, 1160);
      const glow = c.createRadialGradient(1240, 70, 0, 1240, 70, 970);
      glow.addColorStop(0, "#cce4ff");
      glow.addColorStop(1, "#eaf1fc00");
      c.fillStyle = glow;
      c.fillRect(0, 0, 1600, 1160);
      const blue = c.createLinearGradient(40, 40, 1520, 230);
      blue.addColorStop(0, "#093b84");
      blue.addColorStop(0.55, "#155fc1");
      blue.addColorStop(1, "#1994d6");
      rounded(c, 40, 36, 1520, 180, 28, blue, true);
      contain(c, logo, 64, 59, 72, 72);
      c.font = "700 38px Georgia";
      c.fillStyle = "white";
      c.fillText("ACERVO", 153, 103);
      label(c, "GESTÃO DE BENS E MATERIAIS", 155, 128, 12, "#d7edff", 700);
      label(c, "Visão geral do acervo", 66, 177, 38, "white", 700);
      label(c, scope, 66, 199, 13, "#d7edff", 400, 1020);
      rounded(c, 1210, 62, 318, 92, 16, "#ffffff");
      contain(c, municipalityMark, 1228, 73, 282, 70);
      c.textAlign = "right";
      label(c, "EMITIDO EM CURITIBA", 1528, 179, 11, "#cbe7ff", 700);
      label(c, issued, 1528, 199, 14, "#ffffff", 400, 318);
      c.textAlign = "left";
      const goods = list.filter((r) => r.controle !== "QUANTIDADE"),
        stocks = list.filter(
          (r) => r.controle === "QUANTIDADE" && r.situacao === "ATIVO",
        );
      const available = goods.filter((r) => r.situacao === "ATIVO").length;
      const borrowed = list.filter((r) => r.situacao === "EMPRESTADO").length;
      const disposed = list.filter((r) => r.situacao === "BAIXADO").length;
      const low = stocks.filter(
        (r) => Number(r.saldo) <= Number(r.minimo),
      ).length;
      const cards = [
        [
          "Bens em uso",
          available,
          "Controle individual",
          "available",
          "#155fc1",
        ],
        [
          "Materiais em estoque",
          stocks.length,
          "Cadastros por quantidade",
          "stock",
          "#216aba",
        ],
        [
          "Bens emprestados",
          borrowed,
          "Empréstimos em aberto",
          "loan",
          "#3479c2",
        ],
        [
          "Materiais para repor",
          low,
          "Saldo no mínimo ou abaixo",
          "stock-alert",
          "#a96718",
        ],
      ];
      for (let i = 0; i < cards.length; i++) {
        const [title, value, note, mark, tone] = cards[i],
          x = 40 + i * 386,
          w = 362;
        rounded(c, x, 240, w, 145, 20, i === 0 ? blue : "white", true);
        rounded(c, x + 20, 261, 43, 43, 13, i === 0 ? "#ffffff20" : "#edf4ff");
        const image = await graphicIcon(mark, i === 0 ? "white" : tone);
        if (image) c.drawImage(image, x + 30, 271, 23, 23);
        label(
          c,
          title,
          x + 76,
          287,
          17,
          i === 0 ? "white" : "#21466e",
          700,
          266,
        );
        label(
          c,
          value.toLocaleString("pt-BR"),
          x + 22,
          342,
          46,
          i === 0 ? "white" : tone,
          700,
          320,
        );
        label(
          c,
          note,
          x + 22,
          369,
          13,
          i === 0 ? "#d3e9ff" : "#74859c",
          400,
          320,
        );
      }
      rounded(c, 40, 410, 745, 302, 22, "white", true);
      rounded(c, 809, 410, 751, 302, 22, "white", true);
      label(c, "Situação dos bens", 66, 450, 23, "#164478", 700);
      label(
        c,
        "Controle individual · exclui registros arquivados",
        66,
        475,
        13,
        "#75879d",
      );
      const states = [
        ["Em uso", available, "#216bcc"],
        [
          "Emprestados",
          goods.filter((r) => r.situacao === "EMPRESTADO").length,
          "#82baf2",
        ],
        [
          "Descartados",
          goods.filter((r) => r.situacao === "BAIXADO").length,
          "#cc6a82",
        ],
      ];
      const total = states.reduce((n, s) => n + s[1], 0);
      let start = -Math.PI / 2;
      c.lineWidth = 28;
      c.strokeStyle = "#edf3fa";
      c.beginPath();
      c.arc(204, 588, 82, 0, Math.PI * 2);
      c.stroke();
      for (const [, n, tone] of states) {
        if (!n) continue;
        const end = start + (n / Math.max(1, total)) * Math.PI * 2;
        c.strokeStyle = tone;
        c.beginPath();
        c.arc(204, 588, 82, start, end);
        c.stroke();
        start = end;
      }
      c.textAlign = "center";
      label(
        c,
        total.toLocaleString("pt-BR"),
        204,
        594,
        total > 9999 ? 30 : total > 999 ? 37 : 45,
        "#164478",
        700,
      );
      label(c, "bens", 204, 620, 14, "#74859c");
      c.textAlign = "left";
      states.forEach(([title, n, tone], i) => {
        const y = 534 + i * 53;
        rounded(c, 346, y - 13, 12, 12, 4, tone);
        label(c, title, 374, y, 17, "#3d5572");
        c.textAlign = "right";
        label(c, n.toLocaleString("pt-BR"), 749, y, 21, "#1f4779", 700, 130);
        c.textAlign = "left";
      });
      label(c, "Saúde do estoque", 835, 450, 23, "#164478", 700);
      label(
        c,
        "Materiais ativos · sem somar unidades diferentes",
        835,
        475,
        13,
        "#75879d",
      );
      const health = [
        [
          "Acima do mínimo",
          stocks.filter((r) => Number(r.saldo) > Number(r.minimo)).length,
          "#286dce",
        ],
        [
          "No mínimo ou abaixo",
          stocks.filter(
            (r) => Number(r.saldo) > 0 && Number(r.saldo) <= Number(r.minimo),
          ).length,
          "#e8b254",
        ],
        [
          "Sem saldo",
          stocks.filter((r) => Number(r.saldo) <= 0).length,
          "#d27387",
        ],
      ];
      rounded(c, 835, 500, 695, 22, 11, "#edf3fa");
      let offset = 835;
      c.save();
      c.beginPath();
      c.roundRect(835, 500, 695, 22, 11);
      c.clip();
      for (const [, n, tone] of health) {
        const width = (695 * n) / Math.max(1, stocks.length);
        if (width) {
          c.fillStyle = tone;
          c.fillRect(offset, 500, width, 22);
          offset += width;
        }
      }
      c.restore();
      health.forEach(([title, n, tone], i) => {
        const y = 563 + i * 47;
        rounded(c, 838, y - 13, 12, 12, 4, tone);
        label(c, title, 865, y, 17, "#3d5572");
        c.textAlign = "right";
        label(c, n.toLocaleString("pt-BR"), 1430, y, 22, "#21466e", 700, 130);
        label(
          c,
          (stocks.length ? Math.round((n / stocks.length) * 100) : 0) + "%",
          1528,
          y,
          14,
          "#74859c",
        );
        c.textAlign = "left";
      });
      label(c, "Onde está o acervo", 42, 756, 24, "#164478", 700);
      label(c, "Bens individuais em uso por ambiente", 42, 779, 13, "#75879d");
      const roomMarks = ROOMS.map((room) => ROOM_ICON[room]);
      for (let i = 0; i < ROOMS.length; i++) {
        const room = ROOMS[i],
          x = 40 + i * 515,
          n = goods.filter(
            (r) => r.situacao === "ATIVO" && r.dados.ambiente === room,
          ).length;
        rounded(c, x, 799, 490, 130, 20, "white", true);
        rounded(c, x + 19, 818, 40, 40, 12, "#edf4ff");
        const image = await graphicIcon(roomMarks[i]);
        if (image) c.drawImage(image, x + 29, 828, 20, 20);
        label(c, room, x + 73, 844, 17, "#21466e", 700, 380);
        const roomNumber = n.toLocaleString("pt-BR"),
          roomSize = n >= 1000000 ? 25 : 33;
        label(c, roomNumber, x + 21, 892, roomSize, "#155fc1", 700, 150);
        c.save();
        c.font = "700 " + roomSize + "px Arial";
        const roomNumberWidth = c.measureText(roomNumber).width;
        c.restore();
        label(
          c,
          "bens em uso",
          x + 37 + Math.min(150, roomNumberWidth),
          892,
          14,
          "#74859c",
        );
        rounded(c, x + 21, 910, 448, 5, 2.5, "#e8f0fb");
        const bar = (448 * n) / Math.max(1, available);
        if (bar) rounded(c, x + 21, 910, bar, 5, 2.5, "#3d85d9");
      }
      rounded(c, 40, 952, 1520, 83, 18, "#dbe8fa");
      const untagged = goods.filter(
        (r) => r.situacao === "ATIVO" && r.dados.tipo === "SEM_IDENTIFICACAO",
      ).length;
      label(c, "Para acompanhar", 63, 980, 16, "#164478", 700);
      label(
        c,
        low + (low === 1 ? " material para repor" : " materiais para repor"),
        63,
        1010,
        17,
        "#7c561e",
        700,
      );
      label(
        c,
        untagged +
          (untagged === 1
            ? " bem em uso sem etiqueta externa"
            : " bens em uso sem etiqueta externa"),
        502,
        1010,
        17,
        "#31577f",
        700,
      );
      label(
        c,
        disposed +
          (disposed === 1 ? " registro descartado" : " registros descartados"),
        1120,
        1010,
        17,
        "#9c425e",
        700,
      );
      const destinations = [
        "Inventário",
        "Empréstimos",
        "Descartados",
        "Relatório A4",
      ];
      destinations.forEach((name, index) => {
        const x = 40 + index * 386;
        rounded(c, x, 1052, 362, 53, 14, "#155fc1");
        label(c, name + "  →", x + 20, 1085, 17, "white", 700, 260);
      });
      label(
        c,
        list.length +
          " registros no arquivo · " +
          (all ? "Inventário completo" : "Recorte filtrado"),
        42,
        1138,
        13,
        "#5d7797",
        700,
      );
      c.textAlign = "right";
      label(
        c,
        "Abra os detalhes pelos cards e botões.",
        1558,
        1138,
        13,
        "#5d7797",
      );
      c.textAlign = "left";
      const panelImage = wb.addImage({
        base64: canvas.toDataURL("image/jpeg", 0.96),
        extension: "jpeg",
      });
      ws.addImage(panelImage, {
        tl: { col: 0, row: 0 },
        br: { col: 4, row: 40 },
        editAs: "absolute",
      });
      function linkArea(x, y, width, height, destination, tooltip) {
        const hit = document.createElement("canvas");
        hit.width = hit.height = 1;
        const imageId = wb.addImage({
          base64: hit.toDataURL("image/png"),
          extension: "png",
        });
        const scale = panelWidth / 1600,
          top = y * scale,
          left = x * scale,
          rowHeight = (panelRowHeight * 4) / 3,
          colWidth = 285;
        const row = Math.floor(top / rowHeight),
          col = Math.floor(left / colWidth);
        ws.addImage(imageId, {
          tl: {
            nativeCol: col,
            nativeColOff: Math.round((left - col * colWidth) * 9525),
            nativeRow: row,
            nativeRowOff: Math.round((top - row * rowHeight) * 9525),
          },
          ext: { width: width * scale, height: height * scale },
          editAs: "oneCell",
          hyperlinks: { hyperlink: "#'" + destination + "'!A1", tooltip },
        });
      }
      ["Inventário", "Inventário", "Empréstimos", "Inventário"].forEach(
        (name, index) =>
          linkArea(40 + index * 386, 240, 362, 145, name, "Abrir " + name),
      );
      linkArea(
        40,
        410,
        745,
        302,
        "Inventário",
        "Consultar os bens no inventário",
      );
      linkArea(
        809,
        410,
        751,
        302,
        "Inventário",
        "Consultar saldo, unidade e mínimo no inventário",
      );
      destinations.forEach((name, index) =>
        linkArea(40 + index * 386, 1052, 362, 53, name, "Abrir " + name),
      );
      destinations.forEach((name, index) => {
        ws.mergeCells(37, index + 1, 39, index + 1);
        const cell = ws.getCell(37, index + 1);
        cell.value = {
          formula: "HYPERLINK(\"#'" + name + '\'!A1","' + name + ' →")',
          result: name + " →",
        };
        cell.font = {
          name: "Aptos",
          size: 12,
          bold: true,
          color: { argb: color.green },
        };
        cell.fill = fill(color.soft);
        cell.alignment = { vertical: "middle", horizontal: "center" };
      });

      return ws;
    }
    async function drawTableHeading(ws, title, lastCol) {
      const width = ws.columns
        .slice(0, lastCol)
        .reduce((sum, col) => sum + (col.hidden ? 0 : col.width * 7 + 5), 0);
      const height = 144;
      const { canvas, context: c } = graphic(width, height);
      c.fillStyle = "white";
      c.fillRect(0, 0, width, height);
      paint(ws, 1, 3, 1, lastCol, color.white);
      for (let row = 1; row <= 3; row++)
        for (let col = 1; col <= lastCol; col++)
          ws.getCell(row, col).value = null;
      const blue = c.createLinearGradient(0, 0, Math.min(width, 1300), height);
      blue.addColorStop(0, "#093b84");
      blue.addColorStop(0.62, "#155fc1");
      blue.addColorStop(1, "#1688cf");
      rounded(c, 0, 0, width, height, 18, blue);
      contain(c, logo, 22, 22, 51, 51);
      label(c, "ACERVO", 86, 43, 22, "white", 700);
      label(c, "GESTÃO DE BENS E MATERIAIS", 87, 61, 9, "#d5ebff", 700);
      const markX = width - 252;
      rounded(c, markX, 18, 230, 70, 13, "white");
      contain(c, municipalityMark, markX + 13, 25, 204, 56);
      label(c, title, 23, 113, 36, "white", 700, markX - 46);
      c.textAlign = "right";
      label(c, "Emitido em " + issued, width - 22, 106, 11, "#d5ebff");
      label(c, "← Voltar ao resumo", width - 22, 128, 12, "#e2f1ff", 700);
      c.textAlign = "left";
      for (let row = 1; row <= 3; row++)
        ws.getRow(row).height = (height * 0.75) / 3;
      const imageId = wb.addImage({
        base64: canvas.toDataURL("image/jpeg", 0.96),
        extension: "jpeg",
      });
      ws.addImage(imageId, {
        tl: { col: 0, row: 0 },
        br: { col: lastCol, row: 3 },
        editAs: "absolute",
        hyperlinks: { hyperlink: "#'Resumo'!A1", tooltip: "Voltar ao resumo" },
      });
    }

    function brand(ws, start, lastCol) {
      const edge = ws.getColumn(lastCol).letter;
      const left = Math.min(2, lastCol - 2);
      text(
        ws,
        "A" + start + ":" + ws.getColumn(left).letter + start,
        "ACERVO",
        {
          size: 13,
          fg: color.green,
          indent: 0,
        },
      );
      text(
        ws,
        "A" + (start + 1) + ":" + ws.getColumn(left).letter + (start + 1),
        "Prefeitura de Curitiba",
        {
          size: 9,
          fg: color.muted,
          indent: 0,
        },
      );
      const right = ws.getColumn(left + 1).letter;
      text(ws, right + start + ":" + edge + start, "Emitido em " + issued, {
        size: 9,
        fg: color.muted,
        align: "right",
      });
      text(
        ws,
        right + (start + 1) + ":" + edge + (start + 1),
        "Gestão de bens e materiais",
        {
          size: 9,
          fg: color.green,
          align: "right",
        },
      );
      ws.getRow(start).height = 23;
      ws.getRow(start + 1).height = 16;
    }
    function banner(ws, title, lastCol) {
      brand(ws, 1, lastCol);
      const edge = ws.getColumn(lastCol).letter;
      text(ws, "A3:" + edge + "3", title, {
        size: 22,
        bold: true,
        fg: color.green,
      });
      ws.getRow(3).height = 40;
      text(ws, "A4:" + edge + "4", scope, {
        size: 9,
        fg: color.muted,
        border: {
          bottom: {
            style: "thin",
            color: {
              argb: color.line,
            },
          },
        },
      });
      const width = ws.columns
        .slice(0, lastCol)
        .reduce((n, c) => n + c.width * 7, 0);
      ws.getRow(4).height = Math.max(
        25,
        wrap(scope, width - 20).length * 12 + 10,
      );
      ws.getRow(6).height = 14;
      paint(ws, 1, 3, 1, lastCol, "FF133C78");
      for (const address of [
        "A1",
        "A2",
        "A3",
        ws.getColumn(Math.min(2, lastCol - 2) + 1).letter + "1",
        ws.getColumn(Math.min(2, lastCol - 2) + 1).letter + "2",
      ]) {
        const cell = ws.getCell(address);
        cell.font = {
          ...cell.font,
          color: { argb: address === "A2" ? "FFD2E3FA" : color.white },
        };
        cell.alignment = { ...cell.alignment, indent: 1 };
      }
      ws.getRow(1).height = 28;
      ws.getRow(2).height = 22;
    }
    const inventoryHeaders = [
      "Código interno",
      "Item",
      "Categoria",
      "Identificação",
      "Código externo",
      "Ambiente",
      "Posição",
      "Situação",
      "Observação",
      "Cadastrado em (Curitiba)",
      "Série anterior",
      "Localização anterior",
      "Controle",
      "Saldo",
      "Unidade",
      "Mínimo",
    ];
    const inventoryRow = (r) => [
      internal(r.id),
      r.dados.item,
      r.dados.categoria,
      TYPE[r.dados.tipo] || r.dados.tipo,
      String(r.dados.codigo || ""),
      r.dados.ambiente,
      locationText(r),
      STATUS[r.situacao] || r.situacao,
      r.dados.observacao || "",
      excelDate(r.criado_em),
      r.legado?.numero_serie || "",
      r.legado?.localizacao || "",
      r.controle === "QUANTIDADE" ? "Por quantidade" : "Individual",
      r.controle === "QUANTIDADE" ? Number(r.saldo) : null,
      r.controle === "QUANTIDADE" ? r.unidade || "" : "",
      r.controle === "QUANTIDADE" ? Number(r.minimo) : null,
    ];
    function table(name, tableName, headers, data, widths, options = {}) {
      const shown = options.printCols || (options.details ? 8 : headers.length);
      const ws = wb.addWorksheet(name, {
        properties: {
          tabColor: {
            argb: options.tabColor || color.green,
          },
        },
        views: [
          {
            state: "frozen",
            ySplit: 7,
            xSplit: 0,
            topLeftCell: "A8",
            showGridLines: false,
            zoomScale: 90,
          },
        ],
        pageSetup: {
          paperSize: 9,
          orientation: "landscape",
          fitToPage: true,
          fitToWidth: 1,
          fitToHeight: 0,
          printTitlesRow: "7:7",
          margins: {
            left: 0.3,
            right: 0.3,
            top: 0.35,
            bottom: 0.35,
            header: 0.15,
            footer: 0.15,
          },
        },
        headerFooter: {
          oddFooter: "&LACERVO&C" + shortDate(emitted) + "&RPágina &P de &N",
        },
      });
      ws.columns = widths.map((width) => ({
        width,
      }));
      banner(ws, name, shown);
      text(
        ws,
        "A5:B5",
        data.length
          ? {
              formula:
                "SUBTOTAL(103,A8:A" +
                (data.length + 7) +
                ')&" registros visíveis"',
              result: data.length + " registros visíveis",
            }
          : "0 registros",
        {
          size: 10,
          fg: color.muted,
        },
      );
      text(
        ws,
        "C5:" + ws.getColumn(shown).letter + "5",
        options.details
          ? "Filtre nos títulos. Role à direita para observações, datas e estoque."
          : "Filtre pelos cabeçalhos",
        {
          size: 9,
          fg: color.muted,
          align: "right",
        },
      );
      ws.getRow(5).height = 26;
      if (data.length)
        ws.addTable({
          name: tableName,
          ref: "A7",
          headerRow: true,
          totalsRow: false,
          style: {
            theme: null,
            showRowStripes: false,
            showColumnStripes: false,
          },
          columns: headers.map((name) => ({
            name,
            filterButton: true,
          })),
          rows: data,
        });
      else {
        ws.getRow(7).values = headers;
        ws.autoFilter = {
          from: "A7",
          to: ws.getColumn(headers.length).letter + "7",
        };
        text(
          ws,
          "A8:" + ws.getColumn(shown).letter + "8",
          "Nenhum registro neste recorte.",
          {
            size: 11,
            fg: color.muted,
            bg: color.soft,
            indent: 1,
          },
        );
        ws.getRow(8).height = 40;
        for (let column = 1; column <= shown; column++)
          ws.getCell(8, column).border = cellBorders();
      }
      ws.getRow(7).height = 38;
      for (let j = 1; j <= headers.length; j++) {
        const cell = ws.getCell(7, j);
        cell.fill = fill(color.green);
        cell.font = {
          name: "Aptos",
          size: 10,
          bold: true,
          color: {
            argb: color.white,
          },
        };
        cell.alignment = {
          vertical: "middle",
          wrapText: true,
          indent: 1,
        };
        cell.border = cellBorders("FF5982B3");
      }
      data.forEach((values, i) => {
        const row = ws.getRow(i + 8);
        row.height = Math.min(
          409,
          Math.max(
            35,
            ...values.map((v, j) =>
              v instanceof Date
                ? 31
                : wrap(
                    v && typeof v === "object" ? (v.result ?? v.text ?? "") : v,
                    widths[j] * 7 - 18,
                  ).length *
                    14 +
                  10,
            ),
          ),
        );
        for (let j = 1; j <= headers.length; j++) {
          const cell = row.getCell(j);
          const missing =
            options.details && j === 4 && values[3] === TYPE.SEM_IDENTIFICACAO;
          cell.fill = fill(
            missing ? color.warning : i % 2 ? color.soft : color.white,
          );
          cell.font = {
            name: "Aptos",
            size: 11,
            bold: j === 1,
            color: {
              argb: missing ? color.amber : color.ink,
            },
          };
          cell.alignment = {
            vertical: "middle",
            horizontal: typeof cell.value === "number" ? "right" : "left",
            wrapText: true,
            indent: 1,
          };
          if (typeof cell.value === "number")
            cell.numFmt = Number.isInteger(cell.value) ? "#,##0" : "#,##0.###";
          cell.border = cellBorders();
          if (options.details && j === 8) formatStatusCell(cell);
          if ((options.dates || []).includes(j))
            cell.numFmt = options.dateOnly
              ? "dd/mm/yyyy"
              : "dd/mm/yyyy hh:mm:ss";
          else if (typeof cell.value === "string") cell.numFmt = "@";
        }
      });
      if (options.details) {
        ws.properties.outlineLevelCol = 1;
        for (let c = 11; c <= 12; c++) {
          ws.getColumn(c).outlineLevel = 1;
          ws.getColumn(c).hidden = true;
        }
      }
      ws.pageSetup.printArea =
        "A1:" + ws.getColumn(shown).letter + Math.max(8, data.length + 7);
      return ws;
    }
    await drawExportPanel();
    const widths = [
      18, 35, 18, 26, 19, 26, 15, 17, 48, 25, 24, 30, 20, 12, 16, 12,
    ];
    table(
      "Inventário",
      "ACERVO_Inventario",
      inventoryHeaders,
      list.map(inventoryRow),
      widths,
      {
        details: true,
        dates: [10],
      },
    );
    table(
      "Descartados",
      "ACERVO_Baixas",
      [
        "Código interno",
        "Item",
        "Identificação",
        "Data do descarte",
        "Motivo",
        "Documento/processo",
        "Responsável",
        "Ambiente anterior",
      ],
      list
        .filter((r) => r.situacao === "BAIXADO")
        .map((r) => [
          internal(r.id),
          r.dados.item,
          String(r.dados.codigo || internal(r.id)),
          r.baixa?.data
            ? excelDate(
                r.baixa.data.length === 10
                  ? r.baixa.data + "T12:00:00-03:00"
                  : r.baixa.data,
              )
            : null,
          r.baixa?.motivo || "",
          r.baixa?.documento || "",
          r.baixa?.email || "",
          r.baixa?.ambiente || "",
        ]),
      [18, 35, 24, 23, 45, 28, 32, 26],
      {
        dates: [4],
        dateOnly: true,
        tabColor: "FFB65871",
      },
    );
    table(
      "Empréstimos",
      "ACERVO_Emprestimos",
      [
        "Código interno",
        "Item",
        "Etiqueta",
        "Responsável",
        "Local atual",
        "Emprestado em (Curitiba)",
        "Ambiente de origem",
      ],
      list
        .filter((r) => r.situacao === "EMPRESTADO")
        .map((r) => [
          internal(r.id),
          r.dados.item,
          String(r.dados.codigo || ""),
          r.emprestimo?.responsavel || "",
          r.emprestimo?.destino || "",
          excelDate(r.emprestimo?.momento),
          r.dados.ambiente,
        ]),
      [18, 35, 23, 32, 32, 28, 28],
      {
        dates: [6],
      },
    );
    const report = wb.addWorksheet("Relatório A4", {
      properties: {
        tabColor: {
          argb: "FF82B7E5",
        },
      },
      views: [
        {
          state: "frozen",
          ySplit: 5,
          topLeftCell: "A6",
          showGridLines: false,
          zoomScale: 90,
        },
      ],
      pageSetup: {
        paperSize: 9,
        orientation: "landscape",
        fitToPage: true,
        fitToWidth: 1,
        fitToHeight: 0,
        printTitlesRow: "5:5",
        margins: {
          left: 0.3,
          right: 0.3,
          top: 0.35,
          bottom: 0.35,
          header: 0.15,
          footer: 0.15,
        },
      },
      headerFooter: {
        oddFooter: "&LACERVO&C" + shortDate(emitted) + "&RPágina &P de &N",
      },
    });
    measure.font = "14.67px Arial";
    const reportWidths = [15, 34, 25, 17, 21, 46];
    report.columns = reportWidths.map((width) => ({ width }));
    text(report, "A4:F4", scope + " · " + list.length + " registros", {
      size: 10,
      fg: color.muted,
    });
    report.getRow(4).height = 27;
    report.getRow(5).values = [
      "Código interno",
      "Item",
      "Identificação",
      "Situação",
      "Estoque",
      "Observação",
    ];
    report.getRow(5).height = 28;
    report.getRow(5).eachCell((cell) => {
      cell.fill = fill(color.green);
      cell.font = {
        name: "Aptos",
        size: 10,
        bold: true,
        color: { argb: color.white },
      };
      cell.alignment = { vertical: "middle", wrapText: true, indent: 1 };
      cell.border = cellBorders("FF5982B3");
    });
    const groups = new Map();
    for (const record of list) {
      const room = record.dados.ambiente || "Localização não informada";
      if (!groups.has(room)) groups.set(room, []);
      groups.get(room).push(record);
    }
    const groupOrder = [...groups.keys()].sort((a, b) => {
      const x = ROOMS.indexOf(a),
        y = ROOMS.indexOf(b);
      return (
        (x < 0 ? ROOMS.length : x) - (y < 0 ? ROOMS.length : y) ||
        a.localeCompare(b, "pt-BR")
      );
    });
    let nextRow = 6,
      pageHeight = 163;
    const printScale = Math.min(
      1,
      (841.89 - 43.2) /
        (reportWidths.reduce((sum, width) => sum + width * 7 + 5, 0) * 0.75),
    );
    const pageLimit = (595.28 - 50.4) / printScale - 2;
    function startReportPage() {
      report.getRow(nextRow - 1).addPageBreak();
      pageHeight = 28;
    }
    function roomHeading(room, count, tone, shade) {
      const row = nextRow++;
      text(report, "A" + row + ":E" + row, room, {
        size: 11,
        bold: true,
        fg: tone,
        bg: shade,
        indent: 1,
      });
      text(report, "F" + row, count + (count === 1 ? " item" : " itens"), {
        size: 10,
        bold: true,
        fg: tone,
        bg: shade,
        align: "right",
        indent: 1,
      });
      report.getRow(row).height = 22;
      report.getRow(row).eachCell((cell, column) => {
        const edges = cellBorders("FF9FBBD8");
        cell.style = {
          ...cell.style,
          border:
            column === 6
              ? edges
              : {
                  top: edges.top,
                  bottom: edges.bottom,
                  ...(column === 1 ? { left: edges.left } : {}),
                  ...(column === 5 ? { right: edges.right } : {}),
                },
          alignment: { ...cell.alignment, vertical: "middle" },
        };
      });
      pageHeight += 22;
    }
    let groupIndex = 0;
    for (const room of groupOrder) {
      const knownRoomIndex = ROOMS.indexOf(room);
      const roomIndex =
        knownRoomIndex >= 0
          ? knownRoomIndex
          : ROOMS.length + groupOrder.indexOf(room);
      const roomTone = ["FF286CAB", "FF1988A5", "FF5C779B"][roomIndex % 3];
      const roomShade = ["FFE1EDFA", "FFDFF1F7", "FFE5EBF3"][roomIndex % 3];
      const roomStripe = ["FFF0F6FC", "FFEDF8FC", "FFF1F4F9"][roomIndex % 3];
      const records = groups
        .get(room)
        .sort(
          (a, b) =>
            a.dados.item.localeCompare(b.dados.item, "pt-BR") || a.id - b.id,
        );
      let headingPending = true,
        itemIndex = 0;
      for (const r of records) {
        const stock = r.controle === "QUANTIDADE",
          position = locationText(r);
        const item = r.dados.item + (position ? "\nPosição: " + position : "");
        const identity =
          r.dados.tipo === "SEM_IDENTIFICACAO"
            ? "Sem etiqueta externa"
            : (TYPE[r.dados.tipo] || r.dados.tipo) +
              "\n" +
              String(r.dados.codigo || "");
        const balance = stock
          ? quantityText(r.saldo, r.unidade) + "\nMínimo: " + Number(r.minimo)
          : "—";
        const notes = [
          r.dados.observacao || "",
          r.situacao === "BAIXADO" && r.baixa?.motivo
            ? "Motivo do descarte: " + r.baixa.motivo
            : "",
          r.situacao === "EMPRESTADO"
            ? [
                r.emprestimo?.responsavel
                  ? "Emprestado a: " + r.emprestimo.responsavel
                  : "",
                r.emprestimo?.destino ? "Destino: " + r.emprestimo.destino : "",
              ]
                .filter(Boolean)
                .join("\n")
            : "",
        ]
          .filter(Boolean)
          .join("\n");
        const values = [
          internal(r.id),
          item,
          identity,
          STATUS[r.situacao] || r.situacao,
          balance,
          notes,
        ];
        const lines = values.map((v, i) => wrap(v, reportWidths[i] * 7 - 18));
        const longest = Math.max(...lines.map((v) => v.length));
        for (let offset = 0; offset < longest; offset += 8) {
          const part = lines.map((v, j) =>
            j === 0
              ? values[0]
              : offset === 0
                ? v.slice(0, 8).join("\n")
                : j === 1
                  ? offset < v.length
                    ? v.slice(offset, offset + 8).join("\n") + " (continuação)"
                    : "Continuação do item"
                  : offset >= v.length
                    ? ""
                    : v.slice(offset, offset + 8).join("\n"),
          );
          const height = Math.max(
            32,
            ...part.map(
              (v, j) => wrap(v, reportWidths[j] * 7 - 18).length * 14 + 10,
            ),
          );
          if (headingPending) {
            const gap = groupIndex ? 7 : 0;
            if (pageHeight + gap + 22 + height > pageLimit) startReportPage();
            else if (gap) {
              report.getRow(nextRow++).height = gap;
              pageHeight += gap;
            }
            roomHeading(room, records.length, roomTone, roomShade);
            headingPending = false;
            groupIndex++;
          } else if (pageHeight + height > pageLimit) {
            startReportPage();
          }
          const row = report.getRow(nextRow++);
          row.values = part;
          row.height = height;
          row.eachCell((cell, column) => {
            cell.font = {
              name: "Aptos",
              size: column === 1 ? 10 : 11,
              bold: column === 2,
              color: { argb: color.ink },
            };
            cell.numFmt = "@";
            cell.fill = fill(itemIndex % 2 ? roomStripe : color.white);
            cell.alignment = {
              vertical: "middle",
              horizontal: "left",
              wrapText: true,
              indent: 1,
            };
            cell.border = {
              ...cellBorders(),
              ...(column === 1
                ? { left: { style: "medium", color: { argb: roomTone } } }
                : {}),
            };
          });
          if (offset === 0) {
            const positionStart = part[1].indexOf("\nPosição:");
            if (positionStart >= 0)
              row.getCell(2).value = {
                richText: [
                  {
                    text: part[1].slice(0, positionStart),
                    font: {
                      name: "Aptos",
                      size: 11,
                      bold: true,
                      color: { argb: color.ink },
                    },
                  },
                  {
                    text: part[1].slice(positionStart),
                    font: {
                      name: "Aptos",
                      size: 10,
                      color: { argb: color.muted },
                    },
                  },
                ],
              };
            formatStatusCell(row.getCell(4));
            if (
              stock &&
              r.situacao === "ATIVO" &&
              Number(r.saldo) <= Number(r.minimo)
            )
              row.getCell(5).font = {
                name: "Aptos",
                size: 11,
                bold: true,
                color: { argb: "FF98631D" },
              };
          }
          pageHeight += height;
        }
        itemIndex++;
      }
    }
    if (!list.length) {
      text(report, "A6:F6", "Nenhum registro neste recorte.", {
        fg: color.muted,
      });
      report.getRow(6).height = 35;
      for (let column = 1; column <= 6; column++)
        report.getCell(6, column).border = cellBorders();
      nextRow = 7;
    }
    report.pageSetup.printArea = "A1:F" + (nextRow - 1);
    [
      "Resumo",
      "Inventário",
      "Empréstimos",
      "Descartados",
      "Relatório A4",
    ].forEach((name, index) => {
      wb.getWorksheet(name).orderNo = index;
    });
    for (const sheet of wb.worksheets) {
      if (sheet.name !== "Resumo")
        await drawTableHeading(sheet, sheet.name, sheet.columnCount);
    }
    const buffer = await wb.xlsx.writeBuffer();
    const url = URL.createObjectURL(
      new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download =
      "Acervo - " +
      (all ? "Inventário Completo" : "Consulta Filtrada") +
      " - " +
      shortDate(emitted).replaceAll("/", "-") +
      ".xlsx";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    toast("Excel gerado com " + list.length + " registros.");
  } catch (e) {
    toast(e.message, true);
  } finally {
    setAcervoSync(false, undefined, false, exportVisual);
    setBusy(false);
  }
}

function warmBarcode() {
  if (barcodeWorker) return;
  try {
    const source = `
      importScripts(
        'https://cdn.jsdelivr.net/npm/zxing-wasm@3.1.4/dist/iife/reader/index.js'
      );

      const ready=ZXingWASM.prepareZXingModule({
        overrides:{
          locateFile:(p)=>
            'https://cdn.jsdelivr.net/npm/zxing-wasm@3.1.4/dist/reader/'+p
        },
        fireImmediately:true
      });

      ready.catch(()=>{});

      onmessage=async e=>{
        try{
          await ready;

          const results=await ZXingWASM.readBarcodes(
            new ImageData(
              new Uint8ClampedArray(e.data.buffer),
              e.data.width,
              e.data.height
            ),
            {
              formats:['AllReadable'],
              tryHarder:true,
              tryRotate:true,
              tryInvert:true,
              maxNumberOfSymbols:4,
              minLineCount:1
            }
          );

          postMessage({
            results:results
              .filter(r=>!r.error)
              .map(r=>({
                text:r.text,
                format:r.format
              }))
          });
        }catch(err){
          postMessage({error:err.message});
        }
      };
    `;
    const url = URL.createObjectURL(
      new Blob([source], {
        type: "text/javascript",
      }),
    );
    barcodeWorker = new Worker(url);
    URL.revokeObjectURL(url);
    barcodeWorker.onmessage = (e) => {
      if (barcodeTask) {
        clearTimeout(barcodeTask.timer);
        if (e.data.error) {
          barcodeTask.reject(Error(e.data.error));
        } else {
          barcodeTask.resolve(e.data.results);
        }
        barcodeTask = null;
      }
    };
    barcodeWorker.onerror = () => {
      if (barcodeTask) {
        clearTimeout(barcodeTask.timer);
        barcodeTask.reject(Error("Leitor de barras indisponível"));
        barcodeTask = null;
      }
      barcodeWorker?.terminate();
      barcodeWorker = null;
    };
  } catch (e) {
    console.warn(e);
  }
}

function decode(image) {
  return new Promise((resolve, reject) => {
    warmBarcode();
    if (!barcodeWorker) {
      return reject(Error("Leitor indisponível"));
    }
    const timer = setTimeout(() => {
      barcodeWorker?.terminate();
      barcodeWorker = null;
      barcodeTask = null;
      reject(Error("Leitor demorou a responder"));
    }, 20000);
    barcodeTask = {
      resolve,
      reject,
      timer,
    };
    barcodeWorker.postMessage(
      {
        buffer: image.data.buffer,
        width: image.width,
        height: image.height,
      },
      [image.data.buffer],
    );
  });
}

function warmOCR() {
  if (!ocrPromise) {
    ocrPromise = (async () => {
      if (!window.Tesseract) throw Error("OCR não carregou");
      const w = await Tesseract.createWorker("eng", 1);
      await w.setParameters({
        tessedit_pageseg_mode: "7",
        tessedit_char_whitelist: "0123456789 ",
        preserve_interword_spaces: "1",
      });
      return w;
    })().catch((e) => {
      ocrPromise = null;
      return null;
    });
  }
  return ocrPromise;
}

function crop(guide, contrast = false, angle = 0) {
  const v = $("video");
  const vr = v.getBoundingClientRect();
  const r = $(guide).getBoundingClientRect();
  if (!v.videoWidth || !vr.width) return null;
  const scale = Math.max(vr.width / v.videoWidth, vr.height / v.videoHeight);
  const ox = (vr.width - v.videoWidth * scale) / 2;
  const oy = (vr.height - v.videoHeight * scale) / 2;
  const x = Math.max(0, (r.left - vr.left - ox) / scale);
  const y = Math.max(0, (r.top - vr.top - oy) / scale);
  const w = Math.min(v.videoWidth - x, r.width / scale);
  const h = Math.min(v.videoHeight - y, r.height / scale);
  const c = document.createElement("canvas");
  const factor = Math.min(1.5, 1400 / w);
  c.width = Math.round(w * factor);
  c.height = Math.round(h * factor);
  const ctx = c.getContext("2d", {
    willReadFrequently: true,
  });
  ctx.drawImage(v, x, y, w, h, 0, 0, c.width, c.height);
  const img = ctx.getImageData(0, 0, c.width, c.height);
  if (contrast) {
    for (let i = 0; i < img.data.length; i += 4) {
      let g =
        (img.data[i] * 0.299 +
          img.data[i + 1] * 0.587 +
          img.data[i + 2] * 0.114 -
          128) *
          1.5 +
        128;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = g;
    }
    ctx.putImageData(img, 0, 0);
  }
  if (angle) {
    const rotated = document.createElement("canvas");
    const a = (angle * Math.PI) / 180;
    rotated.width = Math.ceil(
      Math.abs(c.width * Math.cos(a)) + Math.abs(c.height * Math.sin(a)),
    );
    rotated.height = Math.ceil(
      Math.abs(c.height * Math.cos(a)) + Math.abs(c.width * Math.sin(a)),
    );
    const rc = rotated.getContext("2d");
    rc.fillStyle = "white";
    rc.fillRect(0, 0, rotated.width, rotated.height);
    rc.translate(rotated.width / 2, rotated.height / 2);
    rc.rotate(a);
    rc.drawImage(c, -c.width / 2, -c.height / 2);
    return {
      canvas: rotated,
      image: rc.getImageData(0, 0, rotated.width, rotated.height),
    };
  }
  return {
    canvas: c,
    image: img,
  };
}

function showCandidates(s) {
  if (scene !== s) return;
  $("candidates").replaceChildren();
  for (const [value, entry] of [...s.candidates.entries()].slice(-4)) {
    if (validScanValue(value)) {
      $("candidates").append(
        button("Usar " + value + " · " + entry.source, () =>
          acceptCode(s, value),
        ),
      );
    } else {
      const p = el("p");
      p.textContent =
        entry.source +
        ": " +
        value.slice(0, 300) +
        " — conteúdo diferente dos seis números esperados. Não foi preenchido.";
      $("candidates").append(p);
    }
  }
}

function candidate(s, text, source, automatic) {
  if (scene !== s) return;
  const value = String(text || "").trim();
  if (!value || value.length > 4096) return;
  const now = performance.now();
  const old = s.candidates.get(value);
  const count = old && now - old.time < 2000 ? old.count + 1 : 1;
  s.candidates.set(value, {
    source,
    count,
    time: now,
  });
  for (const [v, e] of s.candidates) {
    if (now - e.time > 4000) s.candidates.delete(v);
  }
  showCandidates(s);
  if (
    automatic &&
    validScanValue(value) &&
    count >= 2 &&
    s.candidates.size === 1
  ) {
    acceptCode(s, value);
  }
}

function acceptCode(s, value) {
  if (scene !== s) return;
  $(scanTarget).value = value;
  closeScanner();
  if (scanTarget === "moveSearch") {
    renderMovementResults();
    return;
  }
  if (scanTarget === "search") {
    page = 1;
    expanded = null;
    renderList();
    return;
  }
  if (scanTarget === "code") saveDraft();
  duplicateHint();
  toast("Código " + value + " preenchido.");
}

async function barcodeLoop(s) {
  let n = 0;
  let errors = 0;
  while (scene === s) {
    if (barcodeBusy) {
      await pause(150);
      continue;
    }
    barcodeBusy = true;
    try {
      n++;
      const frame = crop(
        "barcodeGuide",
        n % 5 === 0,
        n % 4 === 2 ? 8 : n % 4 === 3 ? -8 : 0,
      );
      if (frame) {
        const results = await decode(frame.image);
        if (scene !== s) break;
        errors = 0;
        for (const r of results) {
          candidate(s, r.text, r.format, true);
        }
      }
    } catch (e) {
      if (scene === s) {
        $("cameraStatus").textContent =
          "Aproxime a etiqueta. Se preferir, digite o código.";
      }
      if (++errors >= 3) break;
    } finally {
      barcodeBusy = false;
    }
    await pause(130);
  }
}

async function ocrLoop(s) {
  let n = 0;
  while (scene === s) {
    if (ocrBusy) {
      await pause(250);
      continue;
    }
    ocrBusy = true;
    try {
      const w = await warmOCR();
      if (scene !== s) break;
      if (!w) {
        $("cameraStatus").textContent =
          "Aponte para o código de barras ou digite o número.";
        break;
      }
      const frame = crop("numberGuide", ++n % 2 === 0);
      if (frame) {
        const { data } = await w.recognize(frame.canvas);
        if (scene !== s) break;
        if (data.confidence >= 65) {
          for (const line of data.text.split(/[\r\n]+/)) {
            const value = line.replace(/\s/g, "");
            if (/^\d{6}$/.test(value)) {
              candidate(s, value, "Número encontrado", false);
            }
          }
        }
      }
    } catch (e) {
      if (scene === s) {
        $("cameraStatus").textContent =
          "Aponte para o código de barras ou digite o número.";
      }
      break;
    } finally {
      ocrBusy = false;
    }
    await pause(400);
  }
}

function mobileCamera() {
  const ua = navigator.userAgent || "";
  return (
    /Android|iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

async function openScanner(target = "code") {
  if (!mobileCamera()) return;
  if (
    scene ||
    busy ||
    pending ||
    (!["moveSearch", "search"].includes(target) &&
      value(target === "editCode" ? "editType" : "type") ===
        "SEM_IDENTIFICACAO")
  )
    return;
  const s = {
    candidates: new Map(),
    stream: null,
    torch: false,
  };
  scanTarget = target;
  scene = s;
  $("cameraTitle").textContent = "Ler etiqueta";
  $("cameraStatus").textContent = "Procurando etiqueta…";
  $("candidates").replaceChildren();
  $("torch").disabled = true;
  $("torch").setAttribute("aria-pressed", "false");
  $("zoomLabel").hidden = true;
  $("camera").showModal();
  warmBarcode();
  warmOCR();
  try {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw Error("Abra o site HTTPS no Safari ou Chrome.");
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: {
          ideal: "environment",
        },
        width: {
          ideal: 1920,
        },
        height: {
          ideal: 1080,
        },
      },
    });
    if (scene !== s) {
      stream.getTracks().forEach((t) => t.stop());
      return;
    }
    s.stream = stream;
    s.track = stream.getVideoTracks()[0];
    $("video").srcObject = stream;
    await $("video").play();
    if (scene !== s) return;
    const caps = s.track.getCapabilities?.() || {};
    $("torch").disabled = !caps.torch;
    if (caps.zoom && caps.zoom.max > caps.zoom.min) {
      $("zoomLabel").hidden = false;
      const min = caps.zoom.min,
        max = caps.zoom.max,
        step = caps.zoom.step || 0.1;
      $("zoom").min = min;
      $("zoom").max = max;
      $("zoom").step = step;
      const initialZoom = Math.min(
        max,
        Math.max(min, min + Math.round(((max - min) * 0.25) / step) * step),
      );
      try {
        await cameraSettings(s, {
          zoom: initialZoom,
        });
      } catch {}
      if (scene !== s) return;
      $("zoom").value = s.track.getSettings().zoom ?? min;
      zoomLabel();
    }
    if (caps.focusMode?.includes("continuous")) {
      try {
        await cameraSettings(s, {
          focusMode: "continuous",
        });
      } catch {}
    }
    if (scene === s) {
      barcodeLoop(s);
      ocrLoop(s);
    }
  } catch (e) {
    if (scene === s) {
      closeScanner();
      toast("Câmera: " + e.message, true);
    }
  }
}

function closeScanner() {
  const s = scene;
  scene = null;
  s?.stream?.getTracks().forEach((t) => t.stop());
  $("video").pause();
  $("video").srcObject = null;
  if ($("camera").open) $("camera").close();
}

function zoomLabel() {
  const min = Number($("zoom").min),
    max = Number($("zoom").max),
    v = Number($("zoom").value);
  $("zoomValue").textContent =
    (max > min ? Math.round(((v - min) / (max - min)) * 100) : 0) + "%";
}

async function cameraSettings(s, change) {
  const current = s.track.getSettings(),
    options = {};
  for (const key of ["zoom", "torch", "focusMode"])
    if (current[key] !== undefined) options[key] = current[key];
  await s.track.applyConstraints({
    advanced: [
      {
        ...options,
        ...change,
      },
    ],
  });
}

function initVisualExperience() {
  const opening = el("div");
  opening.id = "acervoOpening";
  opening.hidden = true;
  $("app").querySelector(".nav").after(opening);
  document.addEventListener("input", (event) => {
    if (event.target.matches("input,textarea")) syncFieldIdentity();
  });
  document.addEventListener("change", () => syncFieldIdentity());
  syncFieldIdentity();
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const tip = $("contextTip");
  let activeHelp = null;
  function closeTip() {
    if (activeHelp) activeHelp.removeAttribute("aria-describedby");
    activeHelp = null;
    tip.hidden = true;
  }
  function positionTip(target) {
    const r = target.getBoundingClientRect(),
      t = tip.getBoundingClientRect();
    tip.style.left =
      Math.max(12, Math.min(innerWidth - t.width - 12, r.left)) + "px";
    tip.style.top =
      Math.max(
        12,
        r.bottom + t.height + 12 > innerHeight
          ? r.top - t.height - 8
          : r.bottom + 8,
      ) + "px";
    const dialog = tip.closest("dialog");
    if (dialog) {
      const bounds = dialog.getBoundingClientRect();
      const left = Math.max(
        bounds.left + 12,
        Math.min(bounds.right - t.width - 12, r.left),
      );
      const top = Math.max(
        bounds.top + 12,
        Math.min(
          bounds.bottom - t.height - 12,
          r.bottom + t.height + 12 > bounds.bottom
            ? r.top - t.height - 8
            : r.bottom + 8,
        ),
      );
      tip.style.left =
        left - bounds.left - dialog.clientLeft + dialog.scrollLeft + "px";
      tip.style.top =
        top - bounds.top - dialog.clientTop + dialog.scrollTop + "px";
    }
  }
  function openTip(target) {
    closeTip();
    activeHelp = target;
    const dialog = mobileAcervo() ? target.closest("dialog") : null;
    (dialog || document.body).append(tip);
    tip.style.position = dialog ? "absolute" : "fixed";
    tip.textContent = target.dataset.help;
    tip.hidden = false;
    target.setAttribute("aria-describedby", "contextTip");
    positionTip(target);
  }
  function moveTip() {
    if (!activeHelp) return;
    const r = activeHelp.getBoundingClientRect();
    if (
      activeHelp === document.activeElement &&
      r.bottom > 0 &&
      r.top < innerHeight &&
      r.right > 0 &&
      r.left < innerWidth
    )
      positionTip(activeHelp);
    else closeTip();
  }
  document.addEventListener("pointerover", (e) => {
    const t = e.target.closest("[data-help]");
    if (t && t !== activeHelp && e.pointerType !== "touch") openTip(t);
  });
  document.addEventListener("pointerout", (e) => {
    if (
      activeHelp &&
      !activeHelp.contains(e.relatedTarget) &&
      activeHelp.contains(e.target)
    )
      closeTip();
  });
  document.addEventListener("focusin", (e) => {
    const t = e.target.closest("[data-help]");
    if (t) openTip(t);
    else closeTip();
  });
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-help]");
    if (t) openTip(t);
    else closeTip();
    if (!e.target.closest(".export-menu"))
      document.querySelector(".export-menu")?.removeAttribute("open");
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeTip();
  });
  addEventListener("scroll", moveTip, {
    passive: true,
    capture: true,
  });
  addEventListener("resize", moveTip);
  document.addEventListener(
    "pointermove",
    (e) => {
      if (reduced.matches || e.pointerType !== "mouse") return;
      const b = e.target.closest(".primary");
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty("--px", e.clientX - r.left + "px");
      b.style.setProperty("--py", e.clientY - r.top + "px");
    },
    {
      passive: true,
    },
  );
  document.querySelectorAll("[data-password-target]").forEach((button) => {
    button.onclick = () => {
      const field = $(button.dataset.passwordTarget);
      const show = field.type === "password";
      setPasswordVisibility(button, show);
    };
  });
  const footer = document.querySelector(".institution-footer");
  let footerAnimation = null;
  function revealFooter() {
    footerAnimation?.cancel();
    if (reduced.matches || !footer.animate) return;
    footerAnimation = footer.animate(
      [
        {
          opacity: 0,
          transform: "translateY(12px)",
        },
        {
          opacity: 1,
          transform: "translateY(0)",
        },
      ],
      {
        duration: 500,
        delay: 0,
        easing: "cubic-bezier(.2,.75,.25,1)",
        fill: "backwards",
      },
    );
  }
  function finishIntro() {
    const wasIntro = !!$("brandIntro");
    $("brandIntro")?.remove();
    document.body.classList.remove(
      "intro-active",
      "intro-reveal",
      "intro-landed",
    );
    document.body.classList.add("screen-ready");
    if (wasIntro && !footerAnimation) revealFooter();
  }
  let previousAuthScreen = null;
  function syncScreen() {
    const authScreen = !$("login").hidden;
    document.body.classList.toggle("auth-screen", authScreen);
    document.documentElement.classList.toggle("auth-viewport", authScreen);
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((meta) =>
        meta.setAttribute(
          "content",
          mobileAcervo()
            ? authScreen
              ? "#0852b8"
              : "#0852b8"
            : authScreen
              ? "#0d61b0"
              : "#e8f1fa",
        ),
      );
    if (
      previousAuthScreen !== null &&
      previousAuthScreen !== authScreen &&
      !$("brandIntro")
    )
      revealFooter();
    previousAuthScreen = authScreen;
    $("syncTools").hidden = !$("login").hidden;
    requestAnimationFrame(() => updateNavIndicator(false));
    if ($("login").hidden) {
      finishIntro();
      setPasswordVisibility($("togglePassword"), false);
    }
  }
  new MutationObserver(syncScreen).observe($("login"), {
    attributes: true,
    attributeFilter: ["hidden"],
  });
  syncScreen();
  const nav = document.querySelector(".nav");
  if (typeof ResizeObserver !== "undefined") {
    const navObserver = new ResizeObserver(() => updateNavIndicator(false));
    navObserver.observe(nav);
    nav
      .querySelectorAll("button")
      .forEach((button) => navObserver.observe(button));
  } else {
    addEventListener("resize", () => updateNavIndicator(false));
  }
  const intro = $("brandIntro");
  if (intro) {
    if (reduced.matches) finishIntro();
    else {
      document.body.classList.add("intro-active");
      setTimeout(() => {
        if (!intro.isConnected) return;
        const from = $("introMark").getBoundingClientRect(),
          to = $("loginMark").getBoundingClientRect();
        intro.classList.add("departing");
        document.body.classList.add("intro-reveal");
        revealFooter();
        $("introMark").style.transform =
          "translate(" +
          (to.left + to.width / 2 - from.left - from.width / 2) +
          "px," +
          (to.top + to.height / 2 - from.top - from.height / 2) +
          "px) scale(" +
          to.width / from.width +
          ")";
        setTimeout(() => {
          if (!intro.isConnected) return;
          $("introMark").style.visibility = "hidden";
          document.body.classList.add("intro-landed");
          intro.style.opacity = "0";
          setTimeout(finishIntro, 380);
        }, 850);
      }, 1300);
    }
  }
  reduced.addEventListener("change", () => {
    if (reduced.matches) {
      footerAnimation?.cancel();
      finishIntro();
    }
  });
  setHelpHint($("draftInfo"), "Rascunho automático", "draft");
  $("draftInfo").dataset.help =
    "O rascunho fica neste navegador, associado à sua conta. O registro definitivo acontece ao cadastrar.";
  $("draftInfo").tabIndex = 0;
  setHelpHint(
    $("learningHint"),
    $("learningHint").textContent.trim(),
    "suggestion",
  );
  if (!$("learningHint").dataset.help)
    $("learningHint").dataset.help =
      "Escolha um nome existente ou cadastre um novo. As sugestões se baseiam no histórico do inventário.";
  $("learningHint").tabIndex = 0;
  document.querySelectorAll(".step-title").forEach((n) => {
    n.textContent = n.textContent.replace(/^0[1-3] \/ /, "");
  });
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries)
        if (e.isIntersecting) {
          if (!reduced.matches) e.target.classList.add("motion-enter");
          observer.unobserve(e.target);
        }
    },
    {
      threshold: 0.08,
    },
  );
  document.querySelectorAll("#app .card").forEach((n) => observer.observe(n));
  for (const id of ["exportFiltered", "exportAll"])
    $(id).addEventListener("click", () =>
      document.querySelector(".export-menu").removeAttribute("open"),
    );
  $("refresh").setAttribute("aria-label", "Atualizar inventário");
  $("refresh").dataset.help = "Atualizar inventário";
}

function initAppViewport() {
  const root = document.documentElement;
  const installed = matchMedia("(display-mode: standalone)");
  const viewport = window.visualViewport;
  let scheduled = 0;
  let baselineHeight = window.innerHeight;
  let baselineWidth = window.innerWidth;
  function update() {
    scheduled = 0;
    root.classList.toggle(
      "app-installed",
      installed.matches || navigator.standalone === true,
    );
    const authScreen = !$("login").hidden;
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((meta) =>
        meta.setAttribute(
          "content",
          mobileAcervo()
            ? authScreen
              ? "#0852b8"
              : "#0852b8"
            : authScreen
              ? "#0d61b0"
              : "#e8f1fa",
        ),
      );
    const height = viewport?.height || window.innerHeight;
    const active = document.activeElement;
    const focused = active?.matches(
      "input,textarea,select,[contenteditable='true']",
    );
    if (Math.abs(window.innerWidth - baselineWidth) > 50) {
      baselineWidth = window.innerWidth;
      baselineHeight = window.innerHeight;
    } else if (!focused)
      baselineHeight = Math.max(baselineHeight, window.innerHeight);
    const keyboard =
      !!focused &&
      !!viewport &&
      viewport.scale === 1 &&
      Math.max(baselineHeight, window.innerHeight) - height > 120;
    root.classList.toggle("keyboard-open", keyboard && authScreen);
    root.classList.toggle("app-typing", keyboard && !authScreen);
    if (!viewport || viewport.scale === 1) {
      root.style.setProperty("--app-visible-height", Math.round(height) + "px");
      root.style.setProperty(
        "--app-viewport-top",
        Math.round(viewport?.offsetTop || 0) + "px",
      );
    }
    if (mobileAcervo() && keyboard && $("app").contains(active)) {
      requestAnimationFrame(() => {
        if (document.activeElement !== active) return;
        const app = $("app");
        const area = app.getBoundingClientRect();
        const field = active.getBoundingClientRect();
        const top = Math.max(area.top, viewport.offsetTop) + 16;
        const bottom =
          Math.min(area.bottom, viewport.offsetTop + viewport.height) - 20;
        if (field.bottom > bottom)
          app.scrollBy({ top: field.bottom - bottom, behavior: "instant" });
        else if (field.top < top)
          app.scrollBy({ top: field.top - top, behavior: "instant" });
      });
    }
  }
  function schedule() {
    if (!scheduled) scheduled = requestAnimationFrame(update);
  }
  installed.addEventListener?.("change", schedule);
  window.addEventListener("resize", schedule, { passive: true });
  window.addEventListener("pageshow", schedule);
  viewport?.addEventListener("resize", schedule, { passive: true });
  viewport?.addEventListener("scroll", schedule, { passive: true });
  document.addEventListener("focusin", schedule);
  document.addEventListener("focusout", schedule);
  update();
}

function mobileAcervo() {
  return matchMedia(
    "(max-width: 640px), (hover: none) and (pointer: coarse) and (max-width: 1024px)",
  ).matches;
}

function animateMobileView(node, direction = 1) {
  if (
    !node ||
    !mobileAcervo() ||
    matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !node.animate
  )
    return;
  animateMobileView.active ||= new WeakMap();
  animateMobileView.active.get(node)?.cancel();
  const animation = node.animate(
    [
      { opacity: 0.25, transform: `translateX(${direction * 18}px)` },
      { opacity: 1, transform: "translateX(0)" },
    ],
    { duration: 300, easing: "cubic-bezier(.16,1,.3,1)" },
  );
  animateMobileView.active.set(node, animation);
  animation.finished
    .then(() => {
      if (animateMobileView.active.get(node) === animation)
        animateMobileView.active.delete(node);
    })
    .catch(() => {});
}

function registrationStage(step, focus = true) {
  const form = $("itemForm");
  if (!$("mobileRegistration")) return;
  const previous = Number(form.dataset.mobileStage || 1);
  form.dataset.mobileStage = String(step);
  if (mobileAcervo() && step === 4)
    $("registrationSave").append($("notesBlock"));
  else $("registrationMain").append($("notesBlock"));
  const titles = [
    "Onde fica o item?",
    "Qual é o item?",
    "Como acompanhar?",
    "Tudo certo?",
  ];
  const symbols = ["pin", "draft", "stock", "save"];
  const heading = $("mobileRegistrationTitle");
  heading.replaceChildren(
    icon(symbols[step - 1]),
    document.createTextNode(titles[step - 1]),
  );
  $("mobileRegistrationProgress")
    .querySelectorAll("button")
    .forEach((node, i) => {
      node.classList.toggle("complete", i + 1 < step);
      node.disabled = i + 1 > step;
      if (i + 1 === step) node.setAttribute("aria-current", "step");
      else node.removeAttribute("aria-current");
    });
  $("mobileRegistrationBack").hidden = step === 1;
  $("mobileRegistrationNext").hidden = step === 4;
  $("mobileRegistrationActions").hidden = step === 4;
  if (focus && mobileAcervo() && !$("register").hidden) {
    heading.focus({ preventScroll: true });
    $("app").scrollTop = 0;
    if (previous !== step)
      animateMobileView(
        $("mobileRegistrationContent"),
        step < previous ? -1 : 1,
      );
  }
  if (mobileAcervo() && $("mobileJourneyHome")) {
    journey.draftStage = step;
    syncMobileJourney();
    updateRegistrationSummary();
    $("mobileRegistrationContent").scrollTop = 0;
    if (focus && user && !busy) saveDraft();
    if (focus && mobileAcervo())
      requestAnimationFrame(() => {
        $("app").scrollTop = 0;
        $("mobileRegistrationContent").scrollTop = 0;
      });
  }
}

function validateRegistrationStage(step) {
  const d = formData();
  if (
    step === 1 &&
    (!d.ambiente ||
      (d.ambiente === "Almoxarifado" && (!d.estante || !d.prateleira)))
  ) {
    toast("Selecione o ambiente e a posição do item.", true);
    return false;
  }
  if (step === 2 && (d.item.length < 2 || !d.categoria)) {
    toast("Informe o nome do item e escolha a categoria.", true);
    return false;
  }
  if (step === 3) {
    if (
      !d.tipo ||
      (d.tipo !== "SEM_IDENTIFICACAO" && !/^\d{6}$/.test(d.codigo))
    ) {
      toast(
        "Escolha a identificação e informe os seis números da etiqueta.",
        true,
      );
      return false;
    }
    for (const id of ["code", "quantity", "minimum"]) {
      const node = $(id);
      if (!node.disabled && !node.checkValidity()) {
        node.reportValidity();
        return false;
      }
    }
    if (!validateRecord(d)) return false;
  }
  return true;
}

function mobileRegistrationValidity() {
  if (!mobileAcervo()) return $("itemForm").reportValidity();
  for (let stage = 1; stage <= 3; stage++) {
    registrationStage(stage, false);
    if (!validateRegistrationStage(stage)) {
      registrationStage(stage);
      return false;
    }
  }
  registrationStage(4, false);
  if (!$("note").checkValidity()) return $("note").reportValidity();
  return true;
}

function closeMobileDetail() {
  if (!mobileAcervo()) {
    $("mobileDetail")?.remove();
    $("browse").classList.remove("mobile-detail-open");
    return;
  }
  const dialog = $("mobileDetail");
  const id = expanded;
  expanded = null;
  if (dialog?.open) dialog.close();
  $("browse").classList.remove("mobile-detail-open");
  if (mobileAcervo() && !$("browse").hidden) {
    $("app").scrollTop = journey.browseScroll;
    $("results")
      .querySelector(`[data-id="${id}"] button`)
      ?.focus({ preventScroll: true });
  }
}

function initMobileAcervo() {
  const form = $("itemForm");
  const top = el("div", undefined, "mobile-registration");
  top.id = "mobileRegistration";
  const progress = el("nav");
  progress.id = "mobileRegistrationProgress";
  progress.setAttribute("aria-label", "Etapas do cadastro");
  ["Local", "Item", "Controle", "Revisão"].forEach((label, i) => {
    const choice = button(label, () => {
      if (i + 1 <= Number(form.dataset.mobileStage)) registrationStage(i + 1);
    });
    choice.prepend(el("span", String(i + 1)));
    progress.append(choice);
  });
  const title = el("h2");
  title.id = "mobileRegistrationTitle";
  title.tabIndex = -1;
  top.append(progress, title);
  $("fields").prepend(top);
  const actions = el("div", undefined, "mobile-registration-actions");
  actions.id = "mobileRegistrationActions";
  const back = button(
    "Voltar",
    () => registrationStage(Number(form.dataset.mobileStage) - 1),
    "",
    "left",
  );
  back.id = "mobileRegistrationBack";
  const next = button(
    "Continuar",
    () => {
      const step = Number(form.dataset.mobileStage);
      if (validateRegistrationStage(step)) registrationStage(step + 1);
    },
    "primary",
    "right",
  );
  next.id = "mobileRegistrationNext";
  actions.append(back, next);
  $("fields").append(actions);
  const reviewBack = button(
    "Voltar",
    () => registrationStage(3),
    "mobile-review-back",
    "left",
  );
  $("registrationSave")
    .querySelector(".registration-actions")
    .before(reviewBack);
  form.addEventListener("keydown", (event) => {
    if (
      mobileAcervo() &&
      event.key === "Enter" &&
      event.target.tagName === "INPUT" &&
      Number(form.dataset.mobileStage) < 4
    ) {
      event.preventDefault();
      next.click();
    }
  });
  const query = matchMedia(
    "(max-width: 640px), (hover: none) and (pointer: coarse) and (max-width: 1024px)",
  );
  const resize = () => {
    form.noValidate = query.matches;
    if (!query.matches) {
      closeMobileDetail();
      $("registrationMain").append($("notesBlock"));
    } else registrationStage(Number(form.dataset.mobileStage), false);
    renderList();
    updateNavIndicator(false);
  };
  query.addEventListener("change", resize);
  registrationStage(1, false);
  resize();
}

function updateMobileLocation() {
  const target = $("mobileLocationSummary");
  if (!target) return;
  const d = formData();
  const line = [d.ambiente];
  if (d.ambiente === "Almoxarifado" && d.estante && d.prateleira)
    line.push(
      `Estante ${d.estante}`,
      `Prateleira ${d.prateleira.padStart(2, "0")}`,
    );
  target.hidden = d.ambiente !== "Almoxarifado";
  const copy = el("div");
  copy.append(
    el("small", "Local selecionado"),
    el("span", line.filter(Boolean).join(" · ")),
  );
  target.replaceChildren(icon("pin"), copy);
}

function initMobileIdentity() {
  const header = document.querySelector(".shell > header"),
    accountHost = header.querySelector(".header-meta"),
    accountToolbar = accountHost.querySelector(".account-toolbar"),
    footer = document.querySelector(".institution-footer");
  const accountMenu = el("div", undefined, "mobile-account-menu");
  accountMenu.id = "mobileAccountMenu";
  const accountButton = el("button", undefined, "mobile-account-trigger");
  accountButton.type = "button";
  accountButton.id = "mobileAccountTrigger";
  accountButton.setAttribute("aria-haspopup", "dialog");
  accountButton.setAttribute("aria-controls", "mobileAccountDialog");
  accountButton.setAttribute("aria-label", "Abrir perfil e ações da conta");
  const avatar = el("span", "A", "mobile-account-avatar");
  accountButton.append(avatar, icon("right"));
  const accountPanel = el("dialog", undefined, "mobile-account-panel");
  accountPanel.id = "mobileAccountDialog";
  accountPanel.setAttribute("aria-labelledby", "mobileAccountTitle");
  const accountHeading = el("div", undefined, "mobile-account-heading");
  const accountTitle = el("h2", "Sua conta");
  accountTitle.id = "mobileAccountTitle";
  const accountClose = button("", () => accountPanel.close(), "", "close");
  accountClose.setAttribute("aria-label", "Fechar opções da conta");
  accountHeading.append(accountTitle, accountClose);
  accountPanel.append(accountHeading);
  accountButton.onclick = () => showAcervoDialog(accountPanel);
  const credit = footer.cloneNode(true);
  credit.className = "mobile-institution-credit";
  accountPanel.append(credit);
  accountMenu.append(accountButton);
  document.body.append(accountPanel);
  header.append(accountMenu);
  const avatarObserver = new MutationObserver(
    () => (avatar.textContent = $("accountAvatar").textContent),
  );
  avatarObserver.observe($("accountAvatar"), {
    childList: true,
    characterData: true,
    subtree: true,
  });
  avatar.textContent = $("accountAvatar").textContent;
  accountPanel.addEventListener(
    "click",
    (event) => {
      if (event.target.closest("button")) accountPanel.close();
    },
    true,
  );
  const queryMenu = el("details", undefined, "mobile-query-menu");
  queryMenu.id = "mobileQueryMenu";
  const queryButton = el("summary", "•••");
  queryButton.setAttribute("aria-label", "Exportação e itens descartados");
  queryMenu.append(queryButton);
  const queryBar = $("browse").querySelector(".card > .bar"),
    queryTools = queryBar.querySelector(".query-tools");
  queryBar.append(queryMenu);
  const camera = button(
    "",
    () => openScanner("search"),
    "primary mobile-browse-scan",
    "scan",
  );
  camera.id = "mobileBrowseScan";
  camera.setAttribute("aria-label", "Ler código para consultar");
  $("search").after(camera);
  const formContent = el("div", undefined, "mobile-registration-content");
  formContent.id = "mobileRegistrationContent";
  $("mobileRegistration").after(formContent);
  formContent.append(
    $("registrationHeader"),
    $("registrationBody"),
    $("registrationSave"),
  );
  const reviewActions = $("registrationSave").querySelector(
    ".registration-actions",
  );
  const reviewBack = $("registrationSave").querySelector(".mobile-review-back");
  const descriptions = [
    "Escolha o ambiente.",
    "Informe o nome e escolha a categoria.",
    "Escolha o tipo de controle para este item.",
    "Confira as informações antes de salvar.",
  ];
  const description = el("p", descriptions[0], "mobile-stage-description");
  description.id = "mobileRegistrationDescription";
  $("mobileRegistrationTitle").after(description);
  const title = (text, name) => {
    const bar = el("div", undefined, "mobile-card-heading");
    bar.append(icon(name), el("strong", text));
    return bar;
  };
  $("registrationRooms").prepend(title("Localização", "pin"));
  $("location").prepend(title("Posição no almoxarifado", "shelf"));
  $("registrationCategory").prepend(title("Categoria", "composition"));
  const fieldLabel = el("span", "Nome do item", "mobile-field-label");
  $("item").before(fieldLabel);
  const local = el("div", undefined, "mobile-location-summary");
  local.id = "mobileLocationSummary";
  $("registrationBody").append(local);
  updateMobileLocation();
  const observer = new MutationObserver(() => {
    const stage = Number($("itemForm").dataset.mobileStage);
    description.textContent = descriptions[stage - 1];
    $("mobileRegistrationProgress")
      .querySelectorAll("button")
      .forEach((node, i) => {
        const badge = node.querySelector("span");
        if (i + 1 < stage) badge.replaceChildren(icon("check"));
        else badge.textContent = String(i + 1);
      });
  });
  observer.observe($("itemForm"), {
    attributes: true,
    attributeFilter: ["data-mobile-stage"],
  });
  document.addEventListener("click", (event) => {
    if (event.target === accountPanel) {
      const bounds = accountPanel.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      )
        accountPanel.close();
    }
    if (!queryMenu.contains(event.target)) queryMenu.open = false;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (accountPanel.open) accountPanel.close();
      queryMenu.open = false;
    }
  });
  const appNav = document.querySelector(".nav");
  const media = matchMedia(
    "(max-width: 640px), (hover: none) and (pointer: coarse) and (max-width: 1024px)",
  );
  const layout = () => {
    if (media.matches) {
      reviewActions.id = "mobileReviewActions";
      reviewActions.prepend(reviewBack);
      $("fields").append(reviewActions);
      const body = accountPanel.querySelector(".mobile-dialog-body");
      if (body) body.prepend(accountToolbar);
      else accountHeading.after(accountToolbar);
      appNav.classList.add("mobile-app-nav");
      document.querySelector(".shell").append(appNav);
      credit.before($("draftInfo"));
      queryMenu.append(queryTools);
    } else {
      reviewActions.removeAttribute("id");
      $("registrationSave").append(reviewBack, reviewActions);
      accountHost.append(accountToolbar);
      appNav.classList.remove("mobile-app-nav");
      $("app").insertBefore(
        appNav,
        $("acervoOpening") || $("app").querySelector("section"),
      );
      $("itemForm").after($("draftInfo"));
      queryBar.append(queryTools);
      if (accountPanel.open) accountPanel.close();
      queryMenu.open = false;
    }
    camera.hidden = !media.matches || !mobileCamera();
    syncMobileEditor();
    labelButton(
      $("discardRegistration"),
      media.matches ? "Registrar descarte" : "Descartar",
      "discard",
    );
    const mark = document.querySelector('[data-tab="register"] use');
    mark.setAttribute("href", media.matches ? "#i-record-add" : "#i-plus");
    requestAnimationFrame(() => updateNavIndicator(false));
  };
  media.addEventListener("change", layout);
  layout();
}

function revealStockWatch() {
  const panel = $("stockWatch");
  const group = panel.closest("details");
  if (group) group.open = true;
  panel.scrollIntoView({
    block: "start",
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
}

function initMobileDashboard() {
  const dashboard = $("dashboard"),
    visuals = dashboard.querySelector(".dashboard-visuals"),
    focus = dashboard.querySelector(".dashboard-focus"),
    rooms = dashboard.querySelector(".dashboard-rooms"),
    goods = visuals.children[0],
    stocks = visuals.children[1];
  const switcher = el("div", undefined, "mobile-chart-switcher");
  switcher.setAttribute("role", "tablist");
  switcher.setAttribute("aria-label", "Gráficos da visão geral");
  let chart = "goods";
  const controls = [
    ["goods", "Bens", "composition", goods],
    ["stocks", "Estoques", "stock", stocks],
  ].map(([key, label, mark, panel]) => {
    const control = button(
      label,
      () => {
        if (chart === key) return;
        chart = key;
        update();
        animateMobileView(panel, key === "stocks" ? 1 : -1);
      },
      "",
      mark,
    );
    control.id = "mobileChart" + key;
    control.setAttribute("role", "tab");
    panel.id = "mobileChartPanel" + key;
    control.setAttribute("aria-controls", panel.id);
    switcher.append(control);
    return { key, control, panel };
  });
  visuals.before(switcher);
  const groups = [
    ["stockWatch", "Materiais para repor", "stock-alert", "stockAlertCount"],
    ["loanWatch", "Bens emprestados", "loan", "loanWatchCount"],
  ].map(([id, label, mark, source]) => {
    const section = id === "stockWatch" ? $(id) : $(id).closest("section");
    const details = el("details", undefined, "mobile-dashboard-group");
    const summary = el("summary");
    const count = el("span", "0", "mobile-dashboard-count");
    summary.append(icon(mark), el("strong", label), count, icon("right"));
    details.append(summary);
    focus.append(details);
    return { section, details, count, source };
  });
  const media = matchMedia(
    "(max-width: 640px), (hover: none) and (pointer: coarse) and (max-width: 1024px)",
  );
  function update() {
    const captions = [
      "Bens acompanhados",
      "Emprestados",
      "Estoques ativos",
      "Para repor",
    ];
    [...$("stats").children].forEach((metric, i) => {
      const caption = metric.querySelector(":scope > span");
      if (!caption) return;
      if (!metric.dataset.desktopCaption)
        metric.dataset.desktopCaption = caption.textContent;
      caption.textContent = media.matches
        ? captions[i] || metric.dataset.desktopCaption
        : metric.dataset.desktopCaption;
    });
    controls.forEach(({ key, control, panel }) => {
      control.setAttribute("aria-selected", String(key === chart));
      control.tabIndex = key === chart ? 0 : -1;
      panel.hidden = media.matches && key !== chart;
      if (media.matches) {
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", control.id);
      } else {
        panel.removeAttribute("role");
        panel.removeAttribute("aria-labelledby");
      }
    });
    groups.forEach(
      (group) => (group.count.textContent = $(group.source).textContent || "0"),
    );
  }
  switcher.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? 1
          : chart === "goods"
            ? 1
            : 0;
    chart = controls[next].key;
    update();
    controls[next].control.focus();
  });
  const layout = () => {
    if (media.matches) {
      $("stats").after($("dashboardPulse"));
      switcher.before(focus);
      groups.forEach((group) => group.details.append(group.section));
    } else {
      $("stats").before($("dashboardPulse"));
      rooms.before(focus);
      groups.forEach((group) =>
        focus.insertBefore(group.section, groups[0].details),
      );
    }
    update();
  };
  new MutationObserver(update).observe($("stats"), { childList: true });
  media.addEventListener("change", layout);
  layout();
}

function syncMobileEditor() {
  const fields = $("editFields");
  if (!fields) return;
  const location = fields.querySelector(".editor-location"),
    grid = fields.querySelector(".editor-grid");
  if (!location || !grid) return;
  let content = fields.querySelector(".mobile-editor-content");
  if (mobileAcervo()) {
    if (!content) {
      content = el("div", undefined, "mobile-editor-content");
      fields.prepend(content);
    }
    content.append(location, grid);
  } else if (content) {
    fields.prepend(location, grid);
    content.remove();
  }
}

function itemIcon(item, category = "") {
  const description = typeof item === "object" ? item.dados?.item : item;
  const group = typeof item === "object" ? item.dados?.categoria : category;
  const normalized = key(description)
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  let symbol = "";
  let score = 0;
  for (const entry of ITEM_SYMBOLS) {
    for (const term of entry.termos) {
      const exact = normalized === term;
      if (normalized && (exact || ` ${normalized} `.includes(` ${term} `))) {
        const weight =
          (exact ? 10000 : 5000) + term.split(" ").length * 100 + term.length;
        if (weight > score) {
          score = weight;
          symbol = entry.icone;
        }
      }
    }
  }
  if (!symbol) return icon(CATEGORY_ICON[group] || "draft");
  const svg = icon("draft");
  svg.firstChild.setAttribute("href", "#" + symbol);
  svg.dataset.itemSymbol = symbol;
  return svg;
}

function mobileItemAnchor(record, className = "") {
  const root = el("div", undefined, "mobile-item-anchor " + className);
  const graphic = el("span", undefined, "mobile-item-symbol");
  graphic.append(itemIcon(record));
  const copy = el("div");
  const data = record.dados || record;
  copy.append(el("strong", data.item || "Seu próximo item"));
  copy.append(
    el(
      "small",
      record.id ? internal(record.id) : data.categoria || "Ficha em construção",
    ),
  );
  root.append(graphic, copy);
  if (record.situacao) root.append(mobileStatus(record));
  return root;
}

function mobileStatus(record) {
  return el(
    "span",
    STATUS[record.situacao] || record.situacao,
    "badge mobile-status " + record.situacao.toLowerCase(),
  );
}

function openMobileJourney(step = null) {
  if (busy || pending || role === "leitor") return;
  $("register").dataset.journey = "form";
  $("saved").hidden = true;
  journey.maxStage = Math.max(journey.maxStage, step || 1);
  registrationStage(step || journey.draftStage || 1);
  syncMobileJourney();
}

function syncMobileJourney() {
  if (!$("mobileJourneyHome")) return;
  const d = formData();
  const stage = Number($("itemForm").dataset.mobileStage || 1);
  if (mobileAcervo() && stage === 3 && !d.tipo) {
    setChoice("type", "SEM_IDENTIFICACAO");
    syncCode();
  }
  const hasDraft = !!clean(d.item);
  $("mobileJourneyStart").setAttribute(
    "aria-label",
    hasDraft ? "Continuar cadastro de " + d.item : "Começar cadastro",
  );
  $("mobileJourneyStart")
    .querySelector(".mobile-start-caption")
    ?.replaceChildren(
      document.createTextNode(
        hasDraft ? "Continuar cadastro" : "Começar cadastro",
      ),
    );
  $("mobileJourneyStart").disabled = busy || !!pending || role === "leitor";
  $("mobileJourneyRestart").hidden = !hasDraft;
  $("mobileJourneyDraft").textContent = hasDraft
    ? `${d.item} · ${d.ambiente || "Local a escolher"}`
    : "Um cadastro simples, passo a passo.";
  $("mobileJourneyLocation").hidden = true;
  $("mobileJourneyLocationText").textContent = [
    d.ambiente || "Escolher local",
    d.ambiente === "Almoxarifado"
      ? [d.estante, d.prateleira].filter(Boolean).join("")
      : "",
  ]
    .filter(Boolean)
    .join(" · ");
  const live = $("mobileLiveFiche");
  live.hidden = true;
  const fingerprint = [
    d.item,
    d.categoria,
    d.ambiente,
    d.estante,
    d.prateleira,
    d.controle,
    d.quantidade,
  ].join("|");
  if (live.dataset.fingerprint !== fingerprint) {
    const copy = el("div");
    copy.append(el("strong", d.item || "Seu próximo item"));
    copy.append(el("small", d.categoria || ""));
    const symbol = el("span", undefined, "mobile-item-symbol");
    symbol.append(itemIcon(d.item, d.categoria));
    live.replaceChildren(symbol, copy);
    live.dataset.fingerprint = fingerprint;
  }
  $("mobileJourneyExit").hidden = stage !== 1;
  $("mobileRegistrationDescription").textContent = [
    "Escolha o ambiente.",
    "Informe o nome e escolha a categoria.",
    "Escolha o tipo de controle para este item.",
    "Confira as informações antes de salvar.",
  ][stage - 1];
  if (stage === 3) {
    const automatic = value("type") === "SEM_IDENTIFICACAO";
    $("itemForm").classList.toggle("mobile-automatic-code", automatic);
    if (automatic)
      $("codeHint").setAttribute(
        "aria-label",
        "O banco gera o código interno ao salvar.",
      );
  }
  if (mobileAcervo()) {
    if ($("mobileProgressLabel"))
      $("mobileProgressLabel").textContent =
        stage + " · " + ["Local", "Item", "Controle", "Conferência"][stage - 1];
    if (!busy)
      labelButton(
        $("save"),
        d.controle === "QUANTIDADE" ? "Cadastrar estoque" : "Cadastrar item",
        "save",
      );
    if (clean($("note").value) && $("mobileNoteToggle")) {
      $("notesBlock").classList.remove("mobile-notes-collapsed");
      $("mobileNoteToggle").setAttribute("aria-expanded", "true");
    }
    journey.maxStage = Math.max(journey.maxStage, stage);
    $("mobileRegistrationProgress")
      .querySelectorAll("button")
      .forEach((node, i) => {
        node.disabled = busy || i + 1 > journey.maxStage;
      });
  }
}

function mobileReview() {
  const d = formData(),
    stock = d.controle === "QUANTIDADE";
  const anchor = mobileItemAnchor({ dados: d });
  const edit = button(
    "",
    () => registrationStage(2),
    "mobile-inline-edit",
    "edit",
  );
  edit.setAttribute("aria-label", "Alterar item e categoria");
  const copy = anchor.querySelector("div");
  if (stock) {
    copy.querySelector("small")?.remove();
    const quantity = button(
      quantityText(d.quantidade, d.unidade),
      () => registrationStage(3),
      "mobile-review-stock-value",
    );
    quantity.setAttribute(
      "aria-label",
      "Alterar saldo inicial: " + quantityText(d.quantidade, d.unidade),
    );
    copy.append(quantity);
  } else
    copy.querySelector("small").textContent = [d.categoria, "Individual"]
      .filter(Boolean)
      .join(" · ");
  anchor.append(edit);
  const facts = el("div", undefined, "mobile-review-facts");
  const location =
    d.ambiente === "Almoxarifado"
      ? `${d.ambiente} · ${d.estante || "—"} / ${String(d.prateleira || "—").padStart(2, "0")}`
      : d.ambiente;
  const pairs = [["Local", location || "Escolher local", 1]];
  if (stock) pairs.push(["Mínimo", quantityText(d.minimo, d.unidade), 3]);
  pairs.push([
    d.tipo === "SEM_IDENTIFICACAO" ? "Código previsto" : "Identificação",
    d.tipo === "SEM_IDENTIFICACAO"
      ? nextInternalPreview()
      : [d.tipo, d.codigo].filter(Boolean).join(" "),
    3,
  ]);
  for (const [label, value, stage] of pairs) {
    const row = el("div", undefined, "mobile-review-row"),
      text = el("div");
    text.append(el("small", label), el("strong", value));
    row.append(text);
    const edit = button(
      "",
      () => registrationStage(stage),
      "mobile-inline-edit",
      "edit",
    );
    edit.setAttribute("aria-label", "Alterar " + label.toLowerCase());
    row.append(edit);
    facts.append(row);
  }
  $("registrationSummary").replaceChildren(anchor, facts);
}

function mobileReceipt(record, template) {
  const discarded = record.situacao === "BAIXADO";
  const stock = record.controle === "QUANTIDADE";
  const saved = $("saved");
  $("register").dataset.journey = "receipt";
  const visual = el("div", undefined, "mobile-receipt-visual");
  const check = el("span", undefined, "mobile-receipt-check");
  check.append(icon(discarded ? "discard" : "check"));
  const anchor = mobileItemAnchor(record);
  anchor.querySelector(".mobile-status")?.remove();
  visual.append(
    check,
    el(
      "h2",
      discarded
        ? "Descarte registrado"
        : stock
          ? "Estoque cadastrado"
          : "Item cadastrado",
    ),
    anchor,
  );
  if (stock)
    anchor
      .querySelector("div")
      .append(
        el(
          "strong",
          quantityText(record.saldo, record.unidade),
          "mobile-receipt-stock",
        ),
      );
  const code = el("div", undefined, "mobile-receipt-code");
  code.append(
    el("small", "Código do registro"),
    el("strong", internal(record.id)),
  );
  visual.append(code);
  const celebration = el("div", undefined, "mobile-receipt-celebration");
  celebration.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 10; i++) {
    const spark = el("i");
    spark.style.setProperty("--spark", i);
    celebration.append(spark);
  }
  visual.prepend(celebration);
  const another = button(
    "Cadastrar outro aqui",
    () => {
      resetForm();
      for (const [name, field] of [
        ["room", "ambiente"],
        ["shelf", "estante"],
        ["level", "prateleira"],
      ])
        setChoice(name, template[field]);
      syncForm();
      openMobileJourney(2);
      saveDraft();
    },
    "mobile-primary",
    "record-add",
  );
  const restart = button(
    "Concluir e voltar ao início",
    () => {
      $("register").dataset.journey = "home";
      resetForm();
      setChoice("room", "");
      setChoice("shelf", "");
      setChoice("level", "");
      syncForm();
      journey.maxStage = 1;
      journey.draftStage = 1;
      saveDraft();
      $("app").scrollTop = 0;
    },
    "mobile-receipt-restart",
    "left",
  );
  saved.className =
    "notice mobile-receipt" + (discarded ? " is-discarded" : "");
  const next = el("div", undefined, "mobile-receipt-next");
  next.append(
    el("small", "PRÓXIMO PASSO"),
    another,
    el("span", "Mantém " + template.ambiente + "."),
    restart,
  );
  saved.replaceChildren(visual, next);
  saved.hidden = false;
  $("app").scrollTop = 0;
  const origin = journey.lastFiche;
  const target = anchor.querySelector(".mobile-item-symbol");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  requestAnimationFrame(() => {
    const destination = target.getBoundingClientRect();
    if (
      !origin ||
      !destination.width ||
      origin.top < 0 ||
      origin.top > innerHeight
    )
      return animateMobileView(visual);
    const token = target.cloneNode(true);
    token.classList.add("mobile-fiche-flight");
    token.setAttribute("aria-hidden", "true");
    Object.assign(token.style, {
      left: origin.left + "px",
      top: origin.top + "px",
      width: origin.width + "px",
      height: origin.height + "px",
    });
    document.body.append(token);
    target.style.visibility = "hidden";
    const cleanup = () => {
      token.remove();
      target.style.visibility = "";
    };
    token
      .animate(
        [
          { transform: "translate(0,0) scale(1)", opacity: 1 },
          {
            transform: `translate(${destination.left - origin.left}px,${destination.top - origin.top}px) scale(${destination.width / origin.width})`,
            opacity: 1,
          },
        ],
        { duration: 420, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" },
      )
      .finished.then(cleanup)
      .catch(cleanup);
  });
}

function renderMobileRecords(found) {
  const host = $("results");
  const currentScroll = $("app").scrollTop;
  host.replaceChildren();
  let room = null;
  const ordered = [...found].sort(
    (a, b) => ROOMS.indexOf(a.dados.ambiente) - ROOMS.indexOf(b.dados.ambiente),
  );
  for (const record of ordered) {
    if (!filters.ambiente && room !== record.dados.ambiente) {
      room = record.dados.ambiente;
      const group = el("tr", undefined, "mobile-room-heading");
      const cell = el("td", room);
      cell.colSpan = 7;
      group.append(cell);
      host.append(group);
    }
    const row = el("tr", undefined, "record-row mobile-record-row");
    row.dataset.id = record.id;
    const cell = el("td");
    cell.colSpan = 7;
    const open = button(
      "",
      () => {
        if (busy || !leaveEditor()) return;
        journey.browseScroll = $("app").scrollTop;
        expanded = record.id;
        openMobileRecord(record);
      },
      "mobile-record-button",
    );
    open.setAttribute(
      "aria-label",
      `Abrir ${record.dados.item}, ${internal(record.id)}, ${record.dados.ambiente}`,
    );
    open.setAttribute("aria-haspopup", "dialog");
    open.setAttribute("aria-expanded", String(expanded === record.id));
    const symbol = el("span", undefined, "mobile-item-symbol");
    symbol.append(itemIcon(record));
    const copy = el("div", undefined, "mobile-record-copy");
    copy.append(el("strong", record.dados.item));
    copy.append(
      el(
        "small",
        [
          record.dados.codigo
            ? `${record.dados.tipo} ${record.dados.codigo}`
            : internal(record.id),
          record.dados.ambiente,
        ].join(" · "),
      ),
    );
    if (record.controle === "QUANTIDADE")
      copy.append(
        el(
          "span",
          quantityText(record.saldo, record.unidade),
          "mobile-stock-caption",
        ),
      );
    open.append(symbol, copy, mobileStatus(record), icon("right"));
    cell.append(open);
    row.append(cell);
    host.append(row);
  }
  if (!found.length) {
    const row = el("tr");
    const cell = el("td");
    cell.colSpan = 7;
    cell.append(
      acervoEmpty(
        "Nenhum item por aqui.",
        "Tente outro nome ou ajuste os filtros.",
      ),
      button(
        "Limpar filtros",
        () => $("clearFilters").click(),
        "mobile-empty-clear",
        "filter",
      ),
    );
    row.append(cell);
    host.append(row);
  }
  $("resultCount").textContent =
    filtered().length + (filtered().length === 1 ? " item" : " itens");
  if ($("browse").hidden) expanded = null;
  if (expanded !== null) {
    const record = rows.find((item) => item.id === expanded);
    if (record) openMobileRecord(record, false);
    else closeMobileDetail();
  } else if ($("mobileDetail")?.open) closeMobileDetail();
  $("app").scrollTop = currentScroll;
}

function openMobileRecord(record, focus = true) {
  let dialog = $("mobileDetail");
  if (dialog?.dataset.mobileSuspended === "true") return;
  if (!dialog) {
    dialog = el("dialog", undefined, "mobile-detail-sheet");
    dialog.id = "mobileDetail";
    dialog.setAttribute("aria-labelledby", "mobileDetailTitle");
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeMobileDetail();
    });
    dialog.addEventListener("close", () => {
      if (
        !dialog.dataset.mobileSuspended &&
        !editor &&
        !$("operation").open &&
        !$("deleteItemDialog").open
      )
        expanded = null;
    });
    document.body.append(dialog);
  }
  if (dialog.dataset.fingerprint !== `${record.id}:${record.versao}:${role}`) {
    const content = el("div", undefined, "mobile-detail-content");
    const close = button("", closeMobileDetail, "mobile-sheet-close", "close");
    close.setAttribute("aria-label", "Fechar detalhes e voltar à lista");
    const toolbar = el("div", undefined, "mobile-detail-toolbar");
    toolbar.append(el("span", "Ficha do item"), close);
    dialog.replaceChildren(toolbar, content);
    renderMobileRecordDetail(record, content);
    dialog.dataset.fingerprint = `${record.id}:${record.versao}:${role}`;
  }
  prepareAcervoDialog(dialog);
  if (!dialog.open) showAcervoDialog(dialog);
  if (focus) focusAcervoDialog(dialog);
}

function renderMobileRecordDetail(record, panel) {
  panel.replaceChildren();
  const header = mobileItemAnchor(record);
  header.classList.add("mobile-detail-anchor");
  header.querySelector("strong").id = "mobileDetailTitle";
  const tabs = el("div", undefined, "mobile-detail-tabs");
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-label", "Informações do item");
  const summary = el("section", undefined, "mobile-detail-summary");
  summary.id = "mobileDetailSummary";
  summary.setAttribute("role", "tabpanel");
  summary.setAttribute("aria-labelledby", "mobileDetailSummaryTab");
  const history = el("section", undefined, "mobile-detail-history");
  history.id = "mobileDetailHistory";
  history.hidden = true;
  history.setAttribute("role", "tabpanel");
  history.setAttribute("aria-labelledby", "mobileDetailHistoryTab");
  const historyEntries = el("div", undefined, "history");
  history.append(historyEntries);
  let loaded = false;
  const summaryTab = button("Resumo", () => select(false));
  const historyTab = button("Histórico", () => select(true));
  summaryTab.id = "mobileDetailSummaryTab";
  historyTab.id = "mobileDetailHistoryTab";
  for (const [tab, target] of [
    [summaryTab, summary],
    [historyTab, history],
  ]) {
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", target.id);
    tab.onkeydown = (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
        return;
      event.preventDefault();
      const next =
        event.key === "Home"
          ? summaryTab
          : event.key === "End"
            ? historyTab
            : tab === summaryTab
              ? historyTab
              : summaryTab;
      next.click();
      next.focus();
    };
  }
  function select(showHistory) {
    summary.hidden = showHistory;
    history.hidden = !showHistory;
    for (const [tab, active] of [
      [summaryTab, !showHistory],
      [historyTab, showHistory],
    ]) {
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    }
    if (showHistory && !loaded) {
      loaded = true;
      historyEntries.append(acervoLoader("Abrindo o histórico…", true));
      loadHistory(record.id, historyEntries);
    }
  }
  tabs.append(summaryTab, historyTab);
  if (record.controle === "QUANTIDADE") {
    const balance = el("div", undefined, "mobile-detail-balance");
    const main = el("div");
    main.append(
      el("small", "Saldo disponível"),
      el("strong", quantityText(record.saldo, record.unidade)),
    );
    const minimum = el("div");
    minimum.append(
      el("small", "Estoque mínimo"),
      el("strong", quantityText(record.minimo, record.unidade)),
    );
    balance.append(main, minimum);
    summary.append(balance);
  }
  const facts = el("dl", undefined, "mobile-detail-facts");
  const pairs = [
    ["Local", record.dados.ambiente],
    ...(locationText(record) ? [["Posição", locationText(record)]] : []),
    ["Categoria", record.dados.categoria],
    [
      "Controle",
      record.controle === "QUANTIDADE" ? "Por quantidade" : "Individual",
    ],
    [
      "Identificação",
      record.dados.codigo
        ? `${record.dados.tipo} ${record.dados.codigo}`
        : internal(record.id),
    ],
  ];
  for (const [label, value] of pairs) {
    const row = el("div");
    row.append(el("dt", label), el("dd", value || "Não informado"));
    facts.append(row);
  }
  summary.append(facts);
  function extra(title, pairs) {
    const group = el("section", undefined, "mobile-detail-extra");
    group.append(el("h3", title));
    for (const [label, value] of pairs)
      if (value) {
        const line = el("p");
        line.append(el("small", label), el("span", value));
        group.append(line);
      }
    summary.append(group);
  }
  if (record.emprestimo)
    extra("Empréstimo em aberto", [
      ["Responsável", record.emprestimo.responsavel],
      ["Destino", record.emprestimo.destino],
      ["Desde", dateBR(record.emprestimo.momento)],
    ]);
  if (record.situacao === "BAIXADO") {
    const info = record.baixa || {};
    extra("Descarte registrado", [
      [
        "Data",
        /^\d{4}-\d{2}-\d{2}$/.test(info.data || "")
          ? info.data.split("-").reverse().join("/")
          : info.data,
      ],
      ["Motivo", info.motivo],
      ["Responsável", info.email],
      ["Documento", info.documento],
    ]);
  }
  if (record.dados.observacao)
    extra("Observação", [["", record.dados.observacao]]);
  if (record.legado) {
    const old = el("details");
    old.append(
      el("summary", "Informações da versão anterior"),
      el("pre", JSON.stringify(record.legado, null, 2)),
    );
    history.append(old);
  }
  const actions = el("div", undefined, "mobile-detail-actions");
  if (role !== "leitor") {
    if (record.situacao === "ATIVO")
      actions.append(
        button("Editar", () => startEdit(record), "mobile-outline", "edit"),
      );
    if (movementActions(record).length)
      actions.append(
        button(
          "Movimentar",
          () => {
            closeMobileDetail();
            openMobileMovement(record);
          },
          "primary",
          "movement",
        ),
      );
    if (
      role === "admin" &&
      ["BAIXADO", "ARQUIVADO"].includes(record.situacao)
    ) {
      const action = record.situacao === "BAIXADO" ? "estornar" : "restaurar";
      actions.append(
        button(
          ACTION[action],
          () => openOperation(action, record),
          "",
          ACTION_ICON[action],
        ),
      );
    }
  }
  if (role === "admin") {
    const remove = button(
      "Excluir definitivamente",
      () => openItemDeletion(record),
      "danger item-delete-action",
      "discard",
    );
    remove.setAttribute(
      "aria-label",
      "Excluir definitivamente " + record.dados.item,
    );
    actions.append(remove);
  }

  panel.append(header, tabs, summary, history);
  if (actions.children.length) panel.append(actions);
  const balance = summary.querySelector(".mobile-detail-balance");
  if (balance) panel.insertBefore(balance, tabs);
  const primary = el("div", undefined, "mobile-detail-primary");
  const location =
    record.dados.ambiente === "Almoxarifado"
      ? [
          record.dados.ambiente,
          record.dados.estante +
            " / " +
            String(record.dados.prateleira).padStart(2, "0"),
        ].join(" · ")
      : record.dados.ambiente;
  for (const [name, value, symbol] of [
    ["Local", location, "pin"],
    ["Código do registro", internal(record.id), "code"],
  ]) {
    const tile = el("div"),
      graphic = el("span"),
      copy = el("div");
    graphic.append(symbol === "code" ? mobileBarcodeMark() : icon(symbol));
    copy.append(el("small", name), el("strong", value));
    tile.append(graphic, copy);
    primary.append(tile);
  }
  const more = el("details", undefined, "mobile-detail-more");
  more.append(el("summary", "Mais detalhes"));
  facts.replaceWith(primary, more);
  more.append(facts);
  for (const row of [...facts.children])
    if (["Local", "Posição"].includes(row.querySelector("dt").textContent))
      row.remove();
  for (const group of summary.querySelectorAll(".mobile-detail-extra"))
    if (group.querySelector("h3").textContent === "Observação") {
      const notes = el("details", undefined, "mobile-detail-notes"),
        label = el("summary", "Observação");
      group.querySelector("h3").remove();
      notes.append(label);
      group.replaceWith(notes);
      notes.append(group);
    }
  select(false);
}

function openMobileMovement(record) {
  journey.movementId = record.id;
  journey.movementReceipt = "";
  $("moveSearch").value = internal(record.id);
  showTab("movements");
  renderMovementResults();
}

function renderMobileMovement() {
  const host = $("moveResults");
  const search = key($("moveSearch").value);
  const selectedRecord = rows.find(
    (record) => record.id === journey.movementId,
  );
  host.replaceChildren();
  $("movements").classList.toggle("mobile-movement-selected", !!selectedRecord);
  $("moveMissing").hidden = true;
  if (selectedRecord) {
    const back = button(
      "Trocar item",
      () => {
        journey.movementId = null;
        journey.movementReceipt = "";
        $("moveSearch").value = "";
        renderMovementResults();
        $("moveSearch").focus();
      },
      "mobile-text-action",
      "left",
    );
    host.append(back, mobileItemAnchor(selectedRecord));
    if (journey.movementReceipt)
      host.append(el("p", journey.movementReceipt, "mobile-operation-receipt"));
    host.append(el("h3", "O que vai acontecer?"));
    const descriptions = {
      emprestar: "Registrar quem ficará com o bem.",
      devolver: "Confirmar o retorno ao local de origem.",
      entrada: "Acrescentar unidades ao saldo.",
      saida: "Registrar a retirada de unidades.",
      descarte_estoque: "Descontar somente a quantidade descartada.",
      baixar: "Preservar o registro como descartado.",
    };
    if (role !== "leitor") {
      if (
        selectedRecord.situacao === "ATIVO" &&
        selectedRecord.controle !== "QUANTIDADE"
      ) {
        const transfer = button(
          "",
          () => openMobileTransfer(selectedRecord),
          "mobile-action-tile",
          "movement",
        );
        const copy = el("div");
        copy.append(
          el("strong", "Transferir"),
          el("small", "Mudar o ambiente ou a posição."),
        );
        transfer.append(copy, icon("right"));
        host.append(transfer);
      }
      for (const action of movementActions(selectedRecord)) {
        const tile = button(
          "",
          () => openOperation(action, selectedRecord),
          "mobile-action-tile" +
            (["baixar", "descarte_estoque"].includes(action)
              ? " is-danger"
              : ""),
          ACTION_ICON[action],
        );
        const copy = el("div");
        copy.append(
          el("strong", ACTION[action]),
          el("small", descriptions[action]),
        );
        tile.append(copy, icon("right"));
        host.append(tile);
      }
    }
    if (!movementActions(selectedRecord).length || role === "leitor")
      host.append(
        el(
          "p",
          role === "leitor"
            ? "Seu perfil permite consultar os dados deste item."
            : "Este registro está disponível para consulta e histórico.",
          "mobile-context-hint",
        ),
      );
    host.append(
      button(
        "Ver ficha do item",
        () => openDashboardRecord(selectedRecord),
        "mobile-text-action",
        "search",
      ),
    );
    return;
  }
  if (!search) {
    host.append(
      acervoEmpty(
        "Qual item vamos movimentar?",
        "Busque pelo nome ou leia o código da etiqueta.",
      ),
    );
    return;
  }
  const exact = rows.filter(
    (record) =>
      key(internal(record.id)) === search ||
      key(record.dados.codigo) === search,
  );
  const found = exact.length
    ? exact
    : rows.filter((record) =>
        key(
          [record.dados.item, record.dados.codigo, internal(record.id)].join(
            " ",
          ),
        ).includes(search),
      );
  for (const record of found.slice(0, 20)) {
    const choose = button(
      "",
      () => {
        journey.movementId = record.id;
        renderMovementResults();
      },
      "mobile-movement-result",
    );
    choose.append(
      mobileItemAnchor(record),
      el("small", record.dados.ambiente),
      icon("right"),
    );
    choose.setAttribute(
      "aria-label",
      `Selecionar ${record.dados.item}, ${internal(record.id)}`,
    );
    host.append(choose);
  }
  $("moveMissing").hidden = found.length > 0;
  $("createDown").hidden = role === "leitor";
  if (found.length > 20)
    host.append(
      el(
        "p",
        "Digite mais detalhes para encontrar o item.",
        "mobile-context-hint",
      ),
    );
}

function openMobileTransfer(record) {
  startEdit(record);
  if (!editor) return;
  $("editDialog").dataset.mode = "transfer";
  $("editDialogTitle").textContent = "Transferir item";
  const origin = el("div", undefined, "mobile-transfer-origin");
  origin.append(
    mobileItemAnchor(record),
    el(
      "p",
      "Origem: " +
        [record.dados.ambiente, locationText(record)]
          .filter(Boolean)
          .join(" · "),
    ),
  );
  $("editFields").querySelector(".mobile-editor-content").prepend(origin);
  labelButton($("editSave"), "Confirmar transferência", "movement");
  $("editRooms").closest("fieldset").querySelector("legend").textContent =
    "Novo ambiente";
}

function updateMobileOperation() {
  if (!mobileAcervo() || !selected || !$("operation").open) return;
  const actions = {
    emprestar: "Confirmar empréstimo",
    devolver: "Confirmar devolução",
    entrada: "Confirmar entrada",
    saida: "Confirmar saída",
    descarte_estoque: "Confirmar descarte",
    baixar: "Confirmar descarte",
    estornar: "Confirmar reversão",
    restaurar: "Confirmar restauração",
  };
  labelButton(
    $("confirmOperation"),
    actions[action] || "Confirmar movimentação",
    ACTION_ICON[action],
  );
  const root = $("mobileOperationPreview");
  if (!root) return;
  const amount = Number($("moveQuantity").value || 0);
  let sentence = "";
  if (["entrada", "saida", "descarte_estoque"].includes(action)) {
    const next =
      Number(selected.saldo) + (action === "entrada" ? amount : -amount);
    sentence = `Saldo: ${quantityText(selected.saldo, selected.unidade)} → ${quantityText(next, selected.unidade)} após confirmar.`;
  } else if (action === "emprestar")
    sentence = `${selected.dados.item} ficará com ${$("movePerson").value.trim() || "o responsável informado"}, em ${$("moveDestination").value.trim() || "local a informar"}.`;
  else if (action === "devolver")
    sentence = `${selected.dados.item} voltará para ${selected.dados.ambiente}.`;
  else if (action === "baixar")
    sentence = `${selected.dados.item} continuará no acervo como descartado.`;
  else sentence = `A alteração de ${selected.dados.item} ficará no histórico.`;
  root.textContent = sentence;
}

function mobileDashboardQuery(preset = {}) {
  query({
    ...preset,
    ...(journey.dashboardRoom ? { ambiente: journey.dashboardRoom } : {}),
  });
}

function renderMobileDashboard() {
  const root = $("mobileDashboard");
  if (!root || !mobileAcervo()) return;
  const scoped = rows.filter(
    (record) =>
      !journey.dashboardRoom || record.dados.ambiente === journey.dashboardRoom,
  );
  const goods = scoped.filter(
    (record) =>
      record.controle !== "QUANTIDADE" &&
      ["ATIVO", "EMPRESTADO"].includes(record.situacao),
  );
  const active = goods.filter((record) => record.situacao === "ATIVO");
  const loans = scoped.filter((record) => record.situacao === "EMPRESTADO");
  const stocks = scoped.filter(
    (record) => record.controle === "QUANTIDADE" && record.situacao === "ATIVO",
  );
  const low = stocks.filter(
    (record) => Number(record.saldo) <= Number(record.minimo),
  );
  $("mobileDashboardRoom").value = journey.dashboardRoom;
  $("mobileDashboardHero").querySelector("b").textContent =
    goods.length.toLocaleString("pt-BR");
  $("mobileDashboardHero").querySelector("small").textContent =
    `${active.length} ativos · ${goods.length - active.length} emprestados`;
  $("mobileDashboardUpdated").textContent = lastSuccess
    ? "Atualizado " +
      new Intl.DateTimeFormat("pt-BR", {
        timeZone: ZONE,
        timeStyle: "short",
      }).format(lastSuccess)
    : "Aguardando atualização";
  $("mobileDashboardAttributes").replaceChildren(
    ...[
      [
        "Emprestados",
        loans.length,
        "loan",
        () => mobileDashboardQuery({ situacao: "EMPRESTADO" }),
      ],
      [
        "Materiais em estoque",
        stocks.length,
        "stock",
        () =>
          mobileDashboardQuery({ controle: "QUANTIDADE", situacao: "ATIVO" }),
      ],
      [
        "Para repor",
        low.length,
        "stock-alert",
        () => {
          $("mobileDashboardAttention").open = true;
          $("mobileDashboardAttention").scrollIntoView({
            block: "nearest",
            behavior: "smooth",
          });
        },
      ],
    ].map(([title, total, mark, fn]) => {
      const control = button("", fn, "mobile-attribute", mark);
      control.append(el("b", String(total)), el("span", title));
      return control;
    }),
  );
  const panel = $("mobileDashboardDistribution");
  const entries = journey.dashboardChart === "categories" ? CATEGORIES : ROOMS;
  const field =
    journey.dashboardChart === "categories" ? "categoria" : "ambiente";
  panel.replaceChildren(
    el(
      "h3",
      journey.dashboardChart === "categories"
        ? "Bens por categoria"
        : "Bens por ambiente",
    ),
  );
  if (!goods.length)
    panel.append(
      el(
        "p",
        "Os bens cadastrados aparecerão nesta distribuição.",
        "mobile-empty-note",
      ),
    );
  else
    for (const entry of entries) {
      const count = goods.filter(
        (record) => record.dados[field] === entry,
      ).length;
      if (
        journey.dashboardRoom &&
        field === "ambiente" &&
        entry !== journey.dashboardRoom
      )
        continue;
      const row = button(
        "",
        () =>
          mobileDashboardQuery({
            [field]: entry,
            controle: "INDIVIDUAL",
            situacao: "EM_USO",
          }),
        "mobile-distribution-row",
      );
      const bar = el("i");
      bar.style.setProperty("--portion", `${(count / goods.length) * 100}%`);
      row.append(el("span", entry), bar, el("b", String(count)));
      panel.append(row);
    }
  $("mobileDashboardTabs")
    .querySelectorAll("button")
    .forEach((button) =>
      button.setAttribute(
        "aria-selected",
        String(button.dataset.chart === journey.dashboardChart),
      ),
    );
  const attention = $("mobileDashboardAttention");
  attention.querySelector("summary strong").textContent = low.length
    ? `${low.length} ${low.length === 1 ? "material precisa" : "materiais precisam"} de reposição`
    : "Reposição em dia";
  const list = $("mobileDashboardAlerts");
  list.replaceChildren();
  if (!low.length)
    list.append(
      el(
        "p",
        stocks.length
          ? "Nenhum material está no mínimo ou abaixo dele."
          : "Os alertas aparecem quando houver materiais por quantidade.",
        "mobile-empty-note",
      ),
    );
  for (const record of low) {
    const box = el("div", undefined, "mobile-alert-record");
    box.append(
      mobileItemAnchor(record),
      el(
        "p",
        `Saldo ${quantityText(record.saldo, record.unidade)} · mínimo ${quantityText(record.minimo, record.unidade)}`,
      ),
    );
    const actions = el("div", undefined, "actions");
    actions.append(
      button("Ver item", () => openDashboardRecord(record), "", "right"),
    );
    if (role !== "leitor")
      actions.append(
        button(
          "Registrar entrada",
          () => openOperation("entrada", record),
          "primary",
          "stock-in",
        ),
      );
    box.append(actions);
    list.append(box);
  }
}

function initMobileRefresh() {
  const app = $("app");
  const indicator = el("div", undefined, "mobile-pull-refresh");
  indicator.id = "mobilePullRefresh";
  indicator.setAttribute("role", "status");
  indicator.setAttribute("aria-live", "polite");
  const books = acervoBooks(true);
  const label = el("span", "Puxe para atualizar");
  const content = el("div", undefined, "mobile-refresh-content");
  const outcome = el("span", undefined, "mobile-refresh-outcome");
  outcome.append(icon("check"));
  content.append(books, label, outcome);
  indicator.append(content);
  app.prepend(indicator);
  let start = null;
  let distance = 0;
  let loading = false;
  let timer = 0;
  let ready = false;
  const blocked = () =>
    !mobileAcervo() ||
    !user ||
    $("app").hidden ||
    busy ||
    !!pending ||
    !!editor ||
    document.documentElement.matches(".keyboard-open, .app-typing") ||
    !!document.querySelector("dialog[open]");
  function reset() {
    start = null;
    distance = 0;
    ready = false;
    if (loading) return;
    indicator.style.height = "0px";
    indicator.dataset.state = "idle";
    books.classList.add("is-settled");
    app.classList.remove("pull-tracking");
  }
  function draw(amount) {
    distance = amount;
    indicator.style.height = amount + "px";
    const next = amount >= 64;
    if (next !== ready) {
      ready = next;
      label.textContent = ready
        ? "Solte para atualizar"
        : "Puxe para atualizar";
    }
    indicator.dataset.state = ready ? "ready" : "pulling";
  }
  async function finish() {
    start = null;
    app.classList.remove("pull-tracking");
    if (loading) return;
    if (distance < 64 || blocked()) return reset();
    clearTimeout(timer);
    const owner = user.id;
    const started = performance.now();
    loading = true;
    indicator.style.height = "64px";
    indicator.dataset.state = "loading";
    books.classList.remove("is-settled");
    label.textContent = "Atualizando o acervo…";
    try {
      await refresh(false);
      await new Promise((resolve) =>
        setTimeout(resolve, Math.max(0, 500 - (performance.now() - started))),
      );
      if (user?.id === owner) {
        label.textContent = "Acervo atualizado";
        indicator.dataset.state = "done";
      }
    } catch (error) {
      if (user?.id === owner) {
        label.textContent = "Não foi possível atualizar";
        indicator.dataset.state = "error";
        toast("Não foi possível atualizar. Puxe novamente para tentar.", true);
      }
    } finally {
      loading = false;
      timer = setTimeout(reset, user?.id === owner ? 1800 : 0);
    }
  }
  app.addEventListener(
    "touchstart",
    (event) => {
      if (
        loading ||
        blocked() ||
        event.touches.length !== 1 ||
        app.scrollTop > 1
      )
        return;
      if (
        event.target.closest(
          "input,textarea,select,button,a,summary,dialog,[contenteditable='true'],.choices",
        )
      )
        return;
      clearTimeout(timer);
      reset();
      label.textContent = "Puxe para atualizar";
      start = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    },
    { passive: true },
  );
  app.addEventListener(
    "touchmove",
    (event) => {
      if (!start || loading) return;
      if (event.touches.length !== 1 || blocked()) return reset();
      const dx = event.touches[0].clientX - start.x;
      const dy = event.touches[0].clientY - start.y;
      if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) return reset();
      if (dy <= 8 || app.scrollTop > 1) {
        if (distance) reset();
        return;
      }
      if (event.cancelable) event.preventDefault();
      app.classList.add("pull-tracking");
      draw(Math.min(88, (dy - 8) * 0.55));
    },
    { passive: false },
  );
  app.addEventListener("touchend", finish, { passive: true });
  app.addEventListener("touchcancel", reset, { passive: true });
  window.addEventListener("resize", reset, { passive: true });
  reset();
}

function initMobileAccount() {
  const dialog = $("mobileAccountDialog");
  const heading = dialog.querySelector(".mobile-account-heading");
  const title = $("mobileAccountTitle");
  const copy = el("div", undefined, "mobile-account-title");
  copy.append(el("small", "ACERVO · SUA CONTA"), title);
  heading.prepend(copy);
  const mark = el("span", undefined, "mobile-account-mark");
  mark.append(icon("users"));
  heading.prepend(mark);
  const status = el("p", undefined, "mobile-account-sync");
  status.id = "mobileAccountSync";
  const help = el("div", undefined, "mobile-account-refresh-help");
  help.append(
    icon("refresh"),
    el("p", "Para atualizar, volte à tela e puxe o conteúdo para baixo."),
  );
  dialog.querySelector(".mobile-institution-credit").before(status, help);
  const update = () => {
    status.textContent = $("live").textContent;
    status.classList.toggle("is-stale", $("live").classList.contains("stale"));
  };
  new MutationObserver(update).observe($("live"), {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["class"],
  });
  update();
}

function mobileBooksMark(className = "") {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "8 8 48 48");
  svg.setAttribute("class", "mobile-books-mark " + className);
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML =
    '<g fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="21" width="15" height="29" rx="3"/><rect x="34" y="14" width="15" height="36" rx="3"/><path d="M21 27h5M21 32h5M39 20h5M39 25h5M39 30h5M14 51h38"/></g>';
  return svg;
}

function mobileBarcodeMark() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("class", "icon");
  svg.setAttribute("aria-hidden", "true");
  svg.innerHTML =
    '<path d="M4 4v16M7 4v16M11 4v16M14 4v16M18 4v16M21 4v16" fill="none" stroke="currentColor" stroke-width="1.8"/>';
  return svg;
}

function initMobileReference() {
  const home = $("mobileJourneyHome");
  home.prepend(home.querySelector("h1"), $("mobileJourneyDraft"));
  const start = $("mobileJourneyStart"),
    caption = start.querySelector(".mobile-start-caption");
  const emblem = el("span", undefined, "mobile-start-emblem");
  emblem.append(mobileBooksMark());
  start.querySelector(".mobile-home-mark").replaceWith(emblem);
  const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  arrow.setAttribute("viewBox", "0 0 24 24");
  arrow.setAttribute("class", "icon");
  arrow.setAttribute("aria-hidden", "true");
  arrow.innerHTML =
    '<path d="M4 12h16M13 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
  arrow.classList.add("mobile-start-arrow");
  start.insertBefore(arrow, caption);
  for (const node of [$("manageAccess"), $("logout")]) {
    const arrow = icon("right");
    arrow.classList.add("mobile-account-arrow");
    node.append(arrow);
  }
  const symbol = el("span", undefined, "mobile-code-symbol");
  symbol.append(mobileBarcodeMark());
  $("codeWrap").prepend(symbol);
  for (const input of $("controlHost").querySelectorAll(
    'input[name="control"]',
  )) {
    const caption = el(
      "small",
      input.value === "QUANTIDADE"
        ? "Vários itens iguais em estoque."
        : "Um bem por cadastro.",
      "mobile-control-description",
    );
    input.nextElementSibling.append(caption);
  }
  $("mobileNoteToggle").replaceChildren(
    icon("plus"),
    el("span", "Observação opcional"),
    icon("right"),
  );
  const cameraTitle = $("cameraTitle"),
    cameraMark = mobileBooksMark("mobile-camera-mark");
  cameraTitle.before(cameraMark);
  const zoomControls = el("div", undefined, "mobile-camera-zoom-controls");
  const adjust = (direction) => {
    const slider = $("zoom"),
      min = Number(slider.min),
      max = Number(slider.max),
      step = Number(slider.step) || 0.1;
    slider.value = Math.min(
      max,
      Math.max(
        min,
        min +
          Math.round(
            (Number(slider.value) + (direction * (max - min)) / 10 - min) /
              step,
          ) *
            step,
      ),
    );
    slider.dispatchEvent(new Event("input", { bubbles: true }));
    slider.dispatchEvent(new Event("change", { bubbles: true }));
  };
  const decrease = button("−", () => adjust(-1)),
    increase = button("+", () => adjust(1));
  decrease.setAttribute("aria-label", "Diminuir zoom");
  increase.setAttribute("aria-label", "Aumentar zoom");
  zoomControls.append(decrease, $("zoom"), increase);
  $("zoomLabel").append(zoomControls);
  const loading = el("div", undefined, "mobile-camera-loading");
  loading.append(mobileBooksMark(), $("cameraStatus"));
  const dots = el("span", undefined, "mobile-camera-dots");
  dots.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 3; i++) dots.append(el("i"));
  loading.append(dots);
  $("cameraManual").before(loading);
  const discardCounter = el("small", "0/2000", "mobile-discard-counter");
  $("directReason").after(discardCounter);
  $("directReason").addEventListener(
    "input",
    () =>
      (discardCounter.textContent = $("directReason").value.length + "/2000"),
  );
  const mainAnchor = document.createComment(""),
    exitAnchor = document.createComment("");
  $("mobileRegistrationActions").before(mainAnchor);
  $("mobileJourneyExit").before(exitAnchor);
  const media = matchMedia(
    "(max-width: 640px), (hover: none) and (pointer: coarse) and (max-width: 1024px)",
  );
  const originalDiscard = $("registrationDiscardDescription").innerHTML;
  const originalDiscardTitle = $("registrationDiscardTitle").textContent;
  const originalPlaceholder = $("directReason").placeholder;
  const originalCancel = $("registrationDiscardForm").querySelector(
    "[data-close]",
  ).textContent;
  const originalNewSave = $("newUserSave").innerHTML;
  const roomIcons = [...$("rooms").querySelectorAll("use")].map((n) =>
    n.getAttribute("href"),
  );
  const originalExit = $("mobileJourneyExit").innerHTML;
  const originalRoles = [
    ...$("newUserForm").querySelectorAll(".role-option small"),
  ].map((n) => n.textContent);
  const layout = () => {
    const content = $("mobileRegistrationContent"),
      review = $("save").parentElement;
    if (media.matches) {
      content.append(
        $("mobileRegistrationActions"),
        $("mobileJourneyExit"),
        review,
      );
      $("registrationDiscardTitle").textContent = "Registrar descarte";
      labelButton($("mobileJourneyExit"), "Voltar");
      const rooms = $("rooms").querySelectorAll("use");
      rooms[1]?.setAttribute("href", "#i-users");
      rooms[2]?.setAttribute("href", "#acv-armario");
      $("registrationDiscardDescription").textContent =
        "O registro fica no histórico como descartado.";
      $("directReason").placeholder = "Conte o motivo, se quiser.";
      $("registrationDiscardForm").querySelector("[data-close]").textContent =
        "Voltar";
      $("newUserName").placeholder = "Digite o nome completo";
      $("newUserEmail").placeholder = "Digite o e-mail institucional";
      labelButton($("newUserSave"), "Criar acesso");
      const descriptions = [
        "Apenas consulta e leitura.",
        "Cadastro e movimentações.",
        "Acesso total ao sistema.",
      ];
      $("newUserForm")
        .querySelectorAll(".role-option small")
        .forEach((n, i) => (n.textContent = descriptions[i]));
    } else {
      mainAnchor.after($("mobileRegistrationActions"));
      exitAnchor.after($("mobileJourneyExit"));
      $("registrationSave").append(review);
      $("registrationDiscardTitle").textContent = originalDiscardTitle;
      $("rooms")
        .querySelectorAll("use")
        .forEach((n, i) => n.setAttribute("href", roomIcons[i]));
      $("mobileJourneyExit").innerHTML = originalExit;
      $("registrationDiscardDescription").innerHTML = originalDiscard;
      $("directReason").placeholder = originalPlaceholder;
      $("registrationDiscardForm").querySelector("[data-close]").textContent =
        originalCancel;
      $("newUserName").placeholder = "";
      $("newUserEmail").placeholder = "";
      $("newUserSave").innerHTML = originalNewSave;
      $("newUserForm")
        .querySelectorAll(".role-option small")
        .forEach((n, i) => (n.textContent = originalRoles[i]));
    }
    syncMobileJourney();
  };
  media.addEventListener("change", layout);
  layout();
  initMobilePolish();
}

function initMobilePolish() {
  const home = $("mobileJourneyHome");
  const title = home.querySelector("h1");
  title.replaceChildren(
    document.createTextNode("Cadastre "),
    el("span", "um item."),
  );
  const start = $("mobileJourneyStart"),
    label = el("span", undefined, "mobile-start-label");
  label.append(
    start.querySelector(".mobile-start-caption"),
    start.querySelector(".mobile-start-arrow"),
  );
  start.append(label);
  const labels = ["Local", "Item", "Controle", "Conferir"];
  $("mobileRegistrationProgress")
    .querySelectorAll("button")
    .forEach((node, i) => {
      const number = node.querySelector("span");
      node.replaceChildren(number, el("small", labels[i]));
    });
  const back = document.querySelector(".mobile-review-back");
  const discard = $("discardRegistration");
  const originalBack = back.innerHTML;
  const media = matchMedia(
    "(max-width: 640px), (hover: none) and (pointer: coarse) and (max-width: 1024px)",
  );
  const layout = () => {
    if (media.matches) {
      back.replaceChildren(icon("left"));
      back.setAttribute("aria-label", "Voltar ao controle");
      back.title = "Voltar ao controle";
      discard.replaceChildren(icon("discard"));
      discard.setAttribute("aria-label", "Registrar descarte");
      discard.title = "Registrar descarte";
    } else {
      back.innerHTML = originalBack;
      back.removeAttribute("aria-label");
      back.removeAttribute("title");
      discard.removeAttribute("aria-label");
      discard.removeAttribute("title");
    }
  };
  media.addEventListener("change", layout);
  layout();
  initMobileContinuity();
}

function initMobileContinuity() {
  const start = $("mobileJourneyStart"),
    label = start.querySelector(".mobile-start-label");
  label.prepend(start.querySelector(".mobile-start-arrow"));
  const source = document.querySelector(".institution-footer");
  const credit = el("footer", undefined, "mobile-app-credit");
  credit.setAttribute("aria-label", "Sobre o Acervo e desenvolvimento");
  const logo = source.querySelector(".institution-logo").cloneNode(true),
    copy = el("div");
  copy.append(
    el("small", "SOBRE O ACERVO"),
    el("span", "Gestão de bens e materiais"),
    el("small", "Concepção e desenvolvimento"),
    el(
      "strong",
      source.querySelector(".institution-credits strong").textContent.trim(),
    ),
  );
  const logoWrap = el("span", undefined, "mobile-credit-logo");
  const wordmark = el("span", undefined, "mobile-credit-wordmark");
  wordmark.setAttribute("aria-hidden", "true");
  wordmark.append(el("small", "Prefeitura de"), el("b", "CURITIBA"));
  logoWrap.append(logo, wordmark);
  credit.append(logoWrap, copy);
  $("app").append(credit);
  const about = $("mobileAccountDialog").querySelector(".mobile-account-about");
  const institutional = about?.querySelector(".mobile-institution-credit");
  if (about && institutional) about.replaceWith(institutional);
  const kicker = $("mobileAccountDialog").querySelector(
    ".mobile-account-title > small",
  );
  if (kicker) kicker.textContent = "PERFIL E ACESSO";
  $("retry").setAttribute(
    "aria-label",
    "Verificar a confirmação da operação pendente",
  );
}

function initMobileCompact() {
  const home = $("mobileJourneyHome"),
    art = home.querySelector(".mobile-journey-art"),
    start = $("mobileJourneyStart");
  art.removeAttribute("aria-hidden");
  const mark = art.querySelector(".mobile-home-mark");
  start.className = "mobile-start-symbol";
  start.replaceChildren(mark, el("span", "Começar", "mobile-start-caption"));
  art.append(start);
  home.querySelector("h1").textContent = "Cadastre um item";
  const progressCopy = el("span", undefined, "mobile-progress-label");
  progressCopy.id = "mobileProgressLabel";
  $("mobileRegistration").prepend(progressCopy);
  $("mobileRegistrationProgress")
    .querySelectorAll("button")
    .forEach((button, i) =>
      button.setAttribute(
        "aria-label",
        ["Local", "Item", "Controle", "Revisão"][i] +
          ", etapa " +
          (i + 1) +
          " de 4",
      ),
    );
  const notes = $("notesBlock");
  const noteToggle = button(
    "Adicionar observação",
    () => {
      const expanded = noteToggle.getAttribute("aria-expanded") !== "true";
      noteToggle.setAttribute("aria-expanded", String(expanded));
      notes.classList.toggle("mobile-notes-collapsed", !expanded);
      if (expanded) $("note").focus();
    },
    "mobile-note-toggle",
    "draft",
  );
  noteToggle.id = "mobileNoteToggle";
  noteToggle.setAttribute("aria-controls", "note");
  noteToggle.setAttribute("aria-expanded", "false");
  notes.prepend(noteToggle);
  notes.classList.add("mobile-notes-collapsed");
  const credit = $("mobileAccountDialog").querySelector(
    ".mobile-institution-credit",
  );
  const about = el("details", undefined, "mobile-account-about");
  about.append(el("summary", "Sobre o Acervo"), credit);
  $("mobileAccountDialog").append(about);
  $("mobileAccountDialog")
    .querySelector(".mobile-account-refresh-help")
    ?.remove();
  $("camera").setAttribute("aria-labelledby", "cameraTitle");
  $("closeCamera").setAttribute("aria-label", "Fechar leitor da câmera");
  const instruction = $("camera").querySelector(".camerafoot > p");
  instruction.textContent = "Posicione a etiqueta na moldura.";
  const manual = button(
    "Digitar código",
    () => {
      const target = scanTarget;
      closeScanner();
      $(target)?.focus({ preventScroll: true });
    },
    "mobile-camera-manual",
    "edit",
  );
  manual.id = "cameraManual";
  $("camera").querySelector(".camerafoot").append(manual);
  const firstAccess = el(
    "p",
    "No primeiro acesso, a pessoa troca a senha inicial.",
    "mobile-new-access-help",
  );
  $("newUserSave").before(firstAccess);
  const media = matchMedia(
    "(max-width: 640px), (hover: none) and (pointer: coarse) and (max-width: 1024px)",
  );
  const layout = () => {
    const actions = $("save").parentElement;
    actions.append($("discardRegistration"));
    syncMobileJourney();
    if ($("userAccessDialog").open) renderPeople();
  };
  media.addEventListener("change", layout);
  layout();
}

function initMobileJourney() {
  const register = $("register");
  const form = $("itemForm");
  register.dataset.journey = "home";
  const home = el("section", undefined, "mobile-journey-home");
  home.id = "mobileJourneyHome";
  const art = el("div", undefined, "mobile-journey-art");
  art.setAttribute("aria-hidden", "true");
  const mark = el("img", undefined, "mobile-home-mark");
  mark.src =
    document.querySelector(".brand .acervo-mark")?.src || "./favicon.svg?v=5";
  mark.alt = "";
  for (const name of ["Cadeira giratória", "Monitor", "Armário"]) {
    const card = el("span", undefined, "mobile-art-fiche");
    card.append(itemIcon(name));
    art.append(card);
  }
  art.append(mark);
  const title = el("h1");
  title.textContent = "Mais um item no lugar.";
  const description = el("p", "Escolha o local. O Acervo guia o restante.");
  description.id = "mobileJourneyDraft";
  const start = button(
    "Começar cadastro",
    () => openMobileJourney(),
    "mobile-primary",
    "right",
  );
  start.id = "mobileJourneyStart";
  const restart = button(
    "Começar outro cadastro",
    () => {
      if (
        clean($("item").value) &&
        !confirm("Descartar o rascunho e começar outro cadastro?")
      )
        return;
      resetForm();
      journey.draftStage = 1;
      openMobileJourney(1);
    },
    "mobile-text-action",
  );
  restart.id = "mobileJourneyRestart";
  home.append(
    art,
    title,
    description,
    start,
    restart,
    el("small", "Puxe a tela para atualizar o acervo."),
  );
  form.before(home);
  const location = button(
    "",
    () => registrationStage(1),
    "mobile-journey-location",
    "pin",
  );
  location.id = "mobileJourneyLocation";
  const locationText = el("span");
  locationText.id = "mobileJourneyLocationText";
  location.append(locationText, el("small", "Alterar"), icon("right"));
  $("mobileRegistration").after(location);
  const exit = button(
    "Voltar ao início",
    () => {
      register.dataset.journey = "home";
      saveDraft();
      $("app").scrollTop = 0;
    },
    "mobile-text-action",
    "left",
  );
  exit.id = "mobileJourneyExit";
  $("mobileRegistrationActions").before(exit);
  $("mobileRegistrationTitle").classList.add("mobile-journey-title");
  $("mobileRegistrationDescription").classList.add(
    "mobile-journey-description",
  );
  $("mobileRegistrationContent").prepend(
    $("mobileRegistrationTitle"),
    $("mobileRegistrationDescription"),
  );
  const live = el("div", undefined, "mobile-live-fiche");
  live.id = "mobileLiveFiche";
  $("mobileRegistrationContent").append(live);
  $("mobileRegistrationProgress")
    .querySelectorAll("button")
    .forEach((node, i) => {
      node.onclick = () => {
        if (i + 1 > journey.maxStage) return;
        if (i + 1 > Number(form.dataset.mobileStage)) {
          for (let stage = 1; stage < i + 1; stage++)
            if (!validateRegistrationStage(stage)) {
              registrationStage(stage);
              return;
            }
        }
        registrationStage(i + 1);
      };
    });
  $("mobileRegistrationBack").onclick = () =>
    registrationStage(Math.max(1, Number(form.dataset.mobileStage) - 1));
  for (const event of ["input", "change"])
    form.addEventListener(event, syncMobileJourney);
  $("moveSearch").oninput = () => {
    journey.movementId = null;
    journey.movementReceipt = "";
    renderMovementResults();
  };
  const preview = el("p", undefined, "mobile-operation-preview");
  preview.id = "mobileOperationPreview";
  $("confirmOperation").before(preview);
  $("operationForm").addEventListener("input", updateMobileOperation);
  $("operation").addEventListener("close", () => {
    if (!$("mobileDetail")?.open && !$("movements").hidden)
      renderMovementResults();
  });
  $("createDown").addEventListener("click", () => {
    openMobileJourney(1);
  });
  $("editDialog").addEventListener(
    "submit",
    (event) => {
      if ($("editDialog").dataset.mode !== "transfer" || !editor) return;
      const record = rows.find((item) => item.id === editor.id);
      const d = formData("edit");
      if (
        record &&
        d.ambiente === record.dados.ambiente &&
        d.estante === record.dados.estante &&
        d.prateleira === record.dados.prateleira
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        toast("Escolha um destino diferente da localização atual.", true);
      }
    },
    true,
  );
  const originalSearchPlaceholder = $("search").placeholder;
  const dashboard = el("div", undefined, "mobile-dashboard");
  dashboard.id = "mobileDashboard";
  const heading = el("div", undefined, "mobile-dashboard-heading");
  heading.append(el("h2", "Visão geral"));
  const rooms = el("select");
  rooms.id = "mobileDashboardRoom";
  rooms.setAttribute("aria-label", "Ambiente da visão geral");
  for (const [value, name] of [
    ["", "Todos os ambientes"],
    ...ROOMS.map((name) => [name, name]),
  ]) {
    const option = el("option", name);
    option.value = value;
    rooms.append(option);
  }
  rooms.onchange = () => {
    journey.dashboardRoom = rooms.value;
    renderMobileDashboard();
  };
  heading.append(rooms);
  const updated = el(
    "small",
    "Aguardando atualização",
    "mobile-dashboard-updated",
  );
  updated.id = "mobileDashboardUpdated";
  const hero = button(
    "",
    () => mobileDashboardQuery({ controle: "INDIVIDUAL", situacao: "EM_USO" }),
    "mobile-dashboard-hero",
  );
  hero.id = "mobileDashboardHero";
  const image = mark.cloneNode();
  image.className = "mobile-dashboard-mark";
  const numbers = el("div");
  numbers.append(
    el("b", "0"),
    el("span", "Bens acompanhados"),
    el("small", "0 ativos · 0 emprestados"),
  );
  hero.append(image, numbers);
  const attributes = el("div", undefined, "mobile-dashboard-attributes");
  attributes.id = "mobileDashboardAttributes";
  const tabs = el("div", undefined, "mobile-dashboard-tabs");
  tabs.id = "mobileDashboardTabs";
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-label", "Distribuição dos bens");
  for (const [value, title] of [
    ["rooms", "Ambientes"],
    ["categories", "Categorias"],
  ]) {
    const tab = button(title, () => {
      journey.dashboardChart = value;
      renderMobileDashboard();
      animateMobileView($("mobileDashboardDistribution"));
    });
    tab.dataset.chart = value;
    tab.setAttribute("role", "tab");
    tabs.append(tab);
  }
  const distribution = el(
    "section",
    undefined,
    "mobile-dashboard-distribution",
  );
  distribution.id = "mobileDashboardDistribution";
  const attention = el("details", undefined, "mobile-dashboard-attention");
  attention.id = "mobileDashboardAttention";
  const summary = el("summary");
  summary.append(
    icon("stock-alert"),
    el("strong", "Reposição em dia"),
    icon("right"),
  );
  const alerts = el("div");
  alerts.id = "mobileDashboardAlerts";
  attention.append(summary, alerts);
  const recent = el("details", undefined, "mobile-dashboard-recent");
  recent.append(el("summary", "Últimas movimentações"));
  const recentTimeline = $("movementTimeline");
  const recentToggle = $("toggleMovementTimeline");
  const placeholder = document.createComment("");
  recentTimeline.before(placeholder);
  dashboard.append(
    heading,
    updated,
    hero,
    attributes,
    tabs,
    distribution,
    attention,
    recent,
  );
  $("dashboard").prepend(dashboard);
  const layout = () => {
    if (mobileAcervo()) {
      recent.append(recentTimeline, recentToggle);
      $("search").placeholder = "Nome, código ou observação";
      $("types").querySelector(
        '[value="SEM_IDENTIFICACAO"]',
      ).nextElementSibling.lastChild.textContent = "Automático";
    } else {
      placeholder.after(recentTimeline, recentToggle);
      $("search").placeholder = originalSearchPlaceholder;
      $("types").querySelector(
        '[value="SEM_IDENTIFICACAO"]',
      ).nextElementSibling.lastChild.textContent = TYPE.SEM_IDENTIFICACAO;
      if ($("mobileDetail")?.open) closeMobileDetail();
    }
    syncMobileJourney();
    renderMobileDashboard();
  };
  const media = matchMedia(
    "(max-width: 640px), (hover: none) and (pointer: coarse) and (max-width: 1024px)",
  );
  media.addEventListener("change", layout);
  layout();
}

$("editDialogClose").onclick = closeEdit;

$("editDialog").addEventListener("cancel", (event) => {
  event.preventDefault();
  closeEdit();
});

for (const [id, controlId, limit, noun] of [
  ["stockAlerts", "toggleStockAlerts", 3, "materiais"],
  ["movementTimeline", "toggleMovementTimeline", 4, "movimentações"],
  ["loanWatch", "toggleLoanWatch", 3, "empréstimos"],
])
  $(controlId).onclick = () => {
    $(id).classList.toggle("expanded");
    syncDashboardList(id, controlId, limit, noun);
  };

$("deleteItemConfirmation").addEventListener("input", () =>
  $("deleteItemConfirmation").setCustomValidity(""),
);

$("deleteItemClose").onclick = () => {
  if (!deletionSaving) $("deleteItemDialog").close();
};

$("deleteItemDialog").addEventListener("cancel", (event) => {
  if (deletionSaving) event.preventDefault();
});

$("deleteItemForm").onsubmit = async (event) => {
  event.preventDefault();
  if (role !== "admin" || busy || pending || deletionSaving || !deletionTarget)
    return;
  if (
    $("deleteItemConfirmation").value.trim() !== internal(deletionTarget.id)
  ) {
    $("deleteItemConfirmation").setCustomValidity(
      "Digite exatamente " + internal(deletionTarget.id) + ".",
    );
    $("deleteItemConfirmation").reportValidity();
    return;
  }
  const owner = user?.id,
    record = deletionTarget,
    key = deletionKey;
  deletionSaving = true;
  setBusy(true);
  $("deleteItemSave").disabled = true;
  $("deleteItemError").textContent = "";
  try {
    if (refreshTask) await refreshTask;
    await rpc("acervo_excluir_item", {
      p_chave: key,
      p_id: record.id,
      p_versao: record.versao,
    });
    if (user?.id !== owner) return;
    rows = rows.filter((item) => item.id !== record.id);
    timelineCache.clear();
    expanded = null;
    renderList();
    renderMetrics();
    renderMovementTimeline();
    renderMovementResults();
    $("deleteItemDialog").close();
    deletionTarget = null;
    toast("Registro excluído. Auditoria preservada.");
  } catch (error) {
    if (user?.id === owner) $("deleteItemError").textContent = error.message;
  } finally {
    deletionSaving = false;
    $("deleteItemSave").disabled = false;
    setBusy(false);
  }
};

$("newPassword").oninput = updatePasswordRules;

$("confirmPassword").oninput = updatePasswordRules;

$("firstAccessForm").onsubmit = async (event) => {
  event.preventDefault();
  if (passwordChanging) return;
  const password = $("newPassword").value;
  if (!Object.values(passwordRequirements(password)).every(Boolean)) {
    $("firstAccessMessage").textContent =
      "Atenda a todos os requisitos da nova senha.";
    return;
  }
  if (new TextEncoder().encode(password).length > 72) {
    $("firstAccessMessage").textContent =
      "Essa senha ficou longa demais. Use até 72 caracteres comuns ou reduza os símbolos e letras acentuadas.";
    return;
  }
  if (password !== $("confirmPassword").value) {
    $("firstAccessMessage").textContent = "As duas senhas precisam ser iguais.";
    $("confirmPassword").focus();
    return;
  }
  if (password === "curitiba" || password === "Curitiba@01!") {
    $("firstAccessMessage").textContent =
      "Escolha uma senha diferente da senha inicial.";
    return;
  }
  passwordChanging = true;
  updatePasswordRules();
  $("leaveFirstAccess").disabled = true;
  $("firstAccessMessage").textContent = "";
  labelButton($("saveFirstPassword"), "Salvando…", "clock");
  const owner = user?.id;
  try {
    if (!firstAccessSaved) {
      await accessService({
        acao: "trocar_senha",
        senha: password,
      });
      firstAccessSaved = true;
      $("newPassword").disabled = $("confirmPassword").disabled = true;
    }
    if (user?.id !== owner) return;
    toast("Senha salva. Entrando no Acervo…");
    let session;
    if (IS_DEMO)
      session = {
        user,
      };
    else {
      const { data, error } = await db.auth.signInWithPassword({
        email: user.email,
        password,
      });
      if (error || !data?.session)
        throw Error(
          "Sua senha foi salva, mas a conexão não permitiu entrar automaticamente. Tente entrar novamente.",
        );
      session = data.session;
      if (session.user?.id !== owner)
        throw Error("Não foi possível confirmar a conta após salvar a senha.");
    }
    if (user?.id !== owner) return;
    resetFirstAccess();
    await loginReady(session);
    if (!$("app").hidden) toast("Senha salva. Bem-vindo ao Acervo!");
  } catch (error) {
    $("firstAccessMessage").textContent = error.message;
  } finally {
    passwordChanging = false;
    $("leaveFirstAccess").disabled = false;
    labelButton(
      $("saveFirstPassword"),
      firstAccessSaved ? "Entrar no Acervo" : "Salvar senha e continuar",
      "lock",
    );
    updatePasswordRules();
  }
};

$("leaveFirstAccess").onclick = async () => {
  if (passwordChanging) return;
  const { error } = await db.auth.signOut({
    scope: "local",
  });
  if (error) {
    $("firstAccessMessage").textContent =
      "Não foi possível sair. Tente novamente.";
    return;
  }
  endSession();
};

$("manageAccess").onclick = () => {
  if (role !== "admin" || busy || pending) return;
  resetPeopleManagement();
  showAcervoDialog($("userAccessDialog"));
  loadPeople(1);
  focusAcervoDialog($("userAccessDialog"), "peopleSearch");
};

$("closeUserAccess").onclick = () => {
  if (!accessSaving) $("userAccessDialog").close();
};

$("userAccessDialog").addEventListener("cancel", (event) => {
  if (accessSaving) event.preventDefault();
});

$("userAccessDialog").addEventListener("close", () => {
  ++peopleRequest;
  clearTimeout(peopleSearchTimer);
});

$("peopleSearch").oninput = () => {
  clearTimeout(peopleSearchTimer);
  peopleSearchTimer = setTimeout(() => loadPeople(1), 300);
};

$("refreshPeople").onclick = () => loadPeople();

$("peoplePrevious").onclick = () => loadPeople(peoplePage - 1);

$("peopleNext").onclick = () => loadPeople(peoplePage + 1);

$("accessBack").onclick = $("cancelPersonRole").onclick = returnToPeople;

$("addPerson").onclick = () => {
  if (accessSaving) return;
  $("newUserForm").reset();
  $("newUserResult").replaceChildren();
  setAccessView("create");
  focusAcervoDialog($("userAccessDialog"), "newUserName");
};

$("newUserForm").onsubmit = async (event) => {
  event.preventDefault();
  if (role !== "admin" || accessSaving || !$("newUserForm").reportValidity())
    return;
  setPeopleBusy(true);
  $("newUserMessage").textContent = "";
  labelButton($("newUserSave"), "Cadastrando…", "clock");
  const owner = user?.id;
  try {
    const result = await accessService({
      acao: "criar_usuario",
      nome: $("newUserName").value.trim(),
      email: $("newUserEmail").value.trim(),
      perfil: new FormData($("newUserForm")).get("newUserRole"),
    });
    if (user?.id !== owner) return;
    const resultTitle = el("strong", "Conta cadastrada.");
    resultTitle.prepend(icon("check"));
    $("newUserResult").replaceChildren(
      resultTitle,
      el("p", result.email),
      el("p", "Senha inicial: " + result.senha_inicial),
      el("p", "Perfil: " + (PEOPLE_ROLES[result.perfil] || "Leitor")),
      el("p", "No primeiro acesso, a pessoa criará sua própria senha."),
    );
    setAccessView("result");
  } catch (error) {
    if (user?.id === owner) $("newUserMessage").textContent = error.message;
  } finally {
    if (user?.id === owner) {
      setPeopleBusy(false);
      labelButton($("newUserSave"), "Cadastrar pessoa", "user-add");
    }
  }
};

$("personRoleForm").onsubmit = async (event) => {
  event.preventDefault();
  if (role !== "admin" || accessSaving || !profileTarget) return;
  const owner = user?.id,
    id = profileTarget.id;
  setPeopleBusy(true);
  $("newUserMessage").textContent = "";
  labelButton($("savePersonRole"), "Salvando…", "clock");
  try {
    await accessService({
      acao: "alterar_perfil",
      usuario: id,
      perfil: new FormData($("personRoleForm")).get("personRole"),
    });
    if (user?.id !== owner) return;
    setAccessView("list");
    await loadPeople();
    toast("Perfil de acesso atualizado.");
  } catch (error) {
    if (user?.id === owner) $("newUserMessage").textContent = error.message;
  } finally {
    if (user?.id === owner) {
      setPeopleBusy(false);
      labelButton($("savePersonRole"), "Salvar perfil", "check");
    }
  }
};

$("cancelPersonDelete").onclick = () => {
  if (!accessSaving) $("deletePersonDialog").close();
};

$("deletePersonDialog").addEventListener("cancel", (event) => {
  if (accessSaving) event.preventDefault();
});

$("confirmPersonDelete").onclick = async () => {
  if (role !== "admin" || accessSaving || !deleteTarget) return;
  const owner = user?.id,
    id = deleteTarget.id;
  setPeopleBusy(true);
  $("deletePersonMessage").textContent = "";
  labelButton($("confirmPersonDelete"), "Excluindo…", "clock");
  try {
    await accessService({
      acao: "excluir_usuario",
      usuario: id,
    });
    if (user?.id !== owner) return;
    $("deletePersonDialog").close();
    deleteTarget = null;
    await loadPeople();
    toast("Pessoa excluída. O histórico foi preservado.");
  } catch (error) {
    if (user?.id === owner) {
      $("deletePersonMessage").textContent = error.message;
      await loadPeople();
    }
  } finally {
    if (user?.id === owner) {
      setPeopleBusy(false);
      labelButton($("confirmPersonDelete"), "Excluir pessoa", "discard");
    }
  }
};

$("item").oninput = () => {
  learnItem();
  suggestions();
};

$("item").onfocus = suggestions;

$("item").onkeydown = (e) => {
  if (e.key === "Escape") {
    $("suggestions").hidden = true;
    $("item").setAttribute("aria-expanded", "false");
  }
  if (e.key === "ArrowDown") {
    e.preventDefault();
    $("suggestions").querySelector("button")?.focus();
  }
};

document.addEventListener("click", (e) => {
  if (!e.target.closest("#suggestions") && e.target !== $("item")) {
    $("suggestions").hidden = true;
    $("item").setAttribute("aria-expanded", "false");
  }
});

$("code").oninput = () => {
  $("code").value = $("code").value.replace(/\D/g, "").slice(0, 6);
  scanTarget = "code";
  duplicateHint();
};

$("itemForm").addEventListener("input", saveDraft);

$("itemForm").addEventListener("change", saveDraft);

$("itemForm").onsubmit = (e) => {
  e.preventDefault();
  if (!busy && role !== "leitor" && mobileRegistrationValidity()) saveRecord();
};

$("operationForm").onsubmit = (e) => {
  e.preventDefault();
  if (!busy && $("operationForm").reportValidity())
    commit({
      acao: action,
      id: selected.id,
      versao: selected.versao,
      motivo: $("reason").value.trim(),
      data: $("downDate").value,
      documento: $("document").value.trim(),
      quantidade: $("moveQuantity").value,
      responsavel: $("movePerson").value.trim(),
      destino: $("moveDestination").value.trim(),
    });
};

$("search").oninput = () => {
  if (editor) {
    $("listNotice").hidden = false;
    return;
  }
  page = 1;
  expanded = null;
  renderList();
};

$("viewDiscarded").onclick = () =>
  query({
    situacao: "BAIXADO",
  });

$("moreFilters").onclick = () => {
  $("filterPanel").hidden = !$("filterPanel").hidden;
  $("moreFilters").setAttribute(
    "aria-expanded",
    String(!$("filterPanel").hidden),
  );
};

$("clearFilters").onclick = () => {
  if (!leaveEditor()) return;
  Object.keys(filters).forEach((k) => (filters[k] = ""));
  $("search").value = "";
  page = 1;
  expanded = null;
  renderFilters();
  renderList();
};

$("previous").onclick = () => {
  if (leaveEditor()) {
    page = Math.max(1, page - 1);
    expanded = null;
    renderList();
  }
};

$("next").onclick = () => {
  if (leaveEditor()) {
    page++;
    expanded = null;
    renderList();
  }
};

document
  .querySelectorAll("[data-tab]")
  .forEach((b) => (b.onclick = () => showTab(b.dataset.tab)));

document.querySelectorAll("[data-close]").forEach(
  (b) =>
    (b.onclick = () => {
      if (!busy) $(b.dataset.close).close();
    }),
);

$("operation").addEventListener("cancel", (e) => {
  if (busy) e.preventDefault();
});

$("refresh").onclick = async () => {
  if (busy) return;
  try {
    await refresh(true);
    toast("Dados atualizados.");
  } catch (e) {
    toast(e.message, true);
  }
};

$("retry").onclick = transmit;

$("exportAll").onclick = () => exportExcel(true);

$("exportFiltered").onclick = () => exportExcel(false);

$("rememberSession").checked =
  rememberSession || authRead("localStorage", REMEMBER_KEY) === "sim";

$("loginForm").onsubmit = async (e) => {
  e.preventDefault();
  if ($("loginButton").disabled) return;
  $("loginButton").disabled = true;
  $("loginButton").classList.add("loading");
  $("loginButton").setAttribute("aria-busy", "true");
  labelButton($("loginButton"), "Entrando…", "lock");
  $("loginMessage").textContent = "";
  try {
    if (!db) throw Error("Conexão indisponível. Atualize a página.");
    const { data, error } = await db.auth.signInWithPassword({
      email: $("email").value.trim(),
      password: $("password").value,
    });
    if (error) throw error;
    const initialPassword = ["curitiba", "Curitiba@01!"].includes(
      $("password").value,
    );
    $("password").value = "";
    await loginReady(data.session, initialPassword);
  } catch (e) {
    $("loginMessage").textContent = e.message;
  } finally {
    $("loginButton").disabled = false;
    $("loginButton").classList.remove("loading");
    $("loginButton").removeAttribute("aria-busy");
    labelButton($("loginButton"), "Entrar", "lock");
  }
};

$("logout").onclick = async () => {
  if (busy || !leaveEditor()) return;
  if (pending)
    return toast(
      "Conclua a operação pendente em Verificar e concluir antes de sair.",
      true,
    );
  try {
    const { error } = await db.auth.signOut({
      scope: "local",
    });
    if (error) throw error;
    endSession();
  } catch {
    toast("Não foi possível encerrar a sessão. Tente novamente.", true);
  }
};

db?.auth.onAuthStateChange((event) => {
  if (event === "SIGNED_OUT") endSession();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    saveDraft();
    closeScanner();
  } else if (user && !busy) refresh().catch(() => {});
});

window.addEventListener("online", () => {
  if (user && !busy) refresh().catch(() => {});
});

window.addEventListener("pagehide", () => {
  saveDraft();
  closeScanner();
});

$("scan").onclick = () => openScanner("code");

$("closeCamera").onclick = closeScanner;

$("camera").addEventListener("cancel", (e) => {
  e.preventDefault();
  closeScanner();
});

$("torch").onclick = async () => {
  const s = scene;
  if (!s?.track) return;
  $("torch").disabled = true;
  try {
    await cameraSettings(s, {
      torch: !s.torch,
    });
    if (scene === s) {
      s.torch = !s.torch;
      $("torch").setAttribute("aria-pressed", String(s.torch));
      $("torch").setAttribute(
        "aria-label",
        s.torch ? "Desligar lanterna" : "Ligar lanterna",
      );
    }
  } catch {
    if (scene === s)
      $("cameraStatus").textContent = "Lanterna indisponível nesta câmera.";
  } finally {
    if (scene === s) $("torch").disabled = false;
  }
};

$("zoom").oninput = zoomLabel;

$("zoom").onchange = async () => {
  const s = scene;
  if (!s?.track) return;
  try {
    await cameraSettings(s, {
      zoom: Number($("zoom").value),
    });
  } catch {
    if (scene === s)
      $("cameraStatus").textContent = "Não foi possível aplicar esse zoom.";
  } finally {
    if (scene === s) {
      $("zoom").value = s.track.getSettings().zoom ?? $("zoom").value;
      zoomLabel();
    }
  }
};

initForm();

initAppViewport();

initVisualExperience();

(async () => {
  if (!db) {
    $("loginMessage").textContent =
      "Biblioteca de conexão indisponível. Atualize a página.";
    return;
  }
  const { data, error } = await db.auth.getSession();
  if (error) $("loginMessage").textContent = error.message;
  else if (data.session) await loginReady(data.session);
})();

initMobileAcervo();

initMobileIdentity();

initMobileDashboard();

initMobileJourney();

initMobileAccount();

initMobileRefresh();

initMobileCompact();

initMobileReference();

function focusAcervoDialog(dialog, desktopField) {
  if (!mobileAcervo()) {
    if (desktopField) $(desktopField).focus();
    return;
  }
  const heading = dialog.querySelector(
    ".mobile-dialog-heading h2, .mobile-dialog-heading [data-dialog-title], .mobile-dialog-heading",
  );
  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }
}

function prepareAcervoDialog(dialog) {
  if (!mobileAcervo() || dialog.id === "camera") return;
  dialog.classList.add("mobile-dialog");
  let heading = dialog.querySelector(":scope > .mobile-dialog-heading");
  if (!heading) {
    heading = dialog.querySelector(
      ":scope > .operation-hero, :scope > .access-dialog-hero, :scope > .dialog-heading, :scope > .delete-person-heading, :scope > .mobile-account-heading, :scope > .mobile-detail-toolbar, :scope > .mobile-about-heading",
    );
    if (!heading) return;
    heading.classList.add("mobile-dialog-heading");
  }
  if (!dialog.querySelector(":scope > .mobile-dialog-body")) {
    const body = el("div", undefined, "mobile-dialog-body");
    for (const node of [...dialog.childNodes])
      if (node !== heading) body.append(node);
    dialog.append(body);
  }
  const context = heading.querySelector("#operationRecord");
  if (context)
    dialog.querySelector(":scope > .mobile-dialog-body").prepend(context);
  for (const control of heading.querySelectorAll("button")) {
    if (control.id === "accessBack") continue;
    control.mobileOriginalMarkup ??= control.innerHTML;
    control.classList.add("mobile-dialog-close");
    control.setAttribute(
      "aria-label",
      control.getAttribute("aria-label") || "Fechar janela",
    );
    control.replaceChildren(icon("close"));
  }
  const title = heading.querySelector("h2") || heading;
  title.tabIndex = -1;
  title.setAttribute("autofocus", "");
  if (dialog.dataset.mobilePrepared) return;
  dialog.dataset.mobilePrepared = "true";
  dialog.addEventListener("close", () => {
    const parent = dialog.mobileParentDialog;
    dialog.mobileParentDialog = null;
    if (!parent) return;
    delete parent.dataset.mobileSuspended;
    if (!mobileAcervo() || $("app").hidden || parent.open) return;
    if (parent.id === "mobileDetail") {
      const record = rows.find((item) => item.id === expanded);
      if (record) openMobileRecord(record);
    } else if (parent.id === "userAccessDialog" && role === "admin") {
      showAcervoDialog(parent);
    }
  });
}

function showAcervoDialog(dialog) {
  if (!mobileAcervo()) {
    if (!dialog.open) dialog.showModal();
    return;
  }
  prepareAcervoDialog(dialog);
  if (!dialog.open) {
    const parent = [...document.querySelectorAll("dialog[open]")].find(
      (node) => node !== dialog && node.id !== "camera",
    );
    if (parent) {
      dialog.mobileParentDialog = parent;
      parent.dataset.mobileSuspended = "true";
      parent.close();
    }
    dialog.showModal();
  }
  focusAcervoDialog(dialog);
}

function initMobileSurfaces() {
  const account = $("mobileAccountDialog");
  const oldCredit = document.querySelector("#app > .mobile-app-credit");
  oldCredit?.remove();
  const source = document.querySelector(".institution-footer");
  const author = source
    .querySelector(".institution-credits strong")
    .textContent.trim();
  const about = el("dialog");
  about.id = "mobileAboutDialog";
  about.setAttribute("aria-labelledby", "mobileAboutTitle");
  const heading = el("div", undefined, "mobile-about-heading");
  const title = el("h2", "Sobre o Acervo");
  title.id = "mobileAboutTitle";
  const close = button("", () => about.close(), "", "close");
  close.setAttribute("aria-label", "Fechar informações do Acervo");
  heading.append(title, close);
  const info = el("div", undefined, "mobile-about-content");
  const logo = source.querySelector(".institution-logo").cloneNode(true);
  const mark = el("span", undefined, "mobile-about-mark");
  mark.append(mobileBooksMark());
  info.append(
    mark,
    el("h3", "ACERVO"),
    el("p", "Gestão de bens e materiais"),
    el("small", "Concepção e desenvolvimento"),
    el("strong", author),
    logo,
  );
  about.append(heading, info);
  document.body.append(about);
  const signature = button(
    "",
    () => showAcervoDialog(about),
    "mobile-about-signature",
  );
  signature.append(
    mobileBooksMark(),
    el("span", "Sobre o Acervo"),
    el("small", "por " + author),
  );
  signature.setAttribute("aria-haspopup", "dialog");
  signature.setAttribute("aria-controls", about.id);
  $("mobileJourneyHome").append(signature);
  const accountAbout = button(
    "",
    () => showAcervoDialog(about),
    "mobile-account-about-link",
  );
  const copy = el("span");
  copy.append(
    el("strong", "Sobre o Acervo"),
    el("small", "Desenvolvimento e Prefeitura de Curitiba"),
  );
  accountAbout.append(mobileBooksMark(), copy, icon("right"));
  account.append(accountAbout);
  const media = matchMedia(
    "(max-width: 640px), (hover: none) and (pointer: coarse) and (max-width: 1024px)",
  );
  const update = () => {
    for (const dialog of document.querySelectorAll(
      "body > dialog:not(#camera)",
    )) {
      if (media.matches) prepareAcervoDialog(dialog);
      else {
        const body = dialog.querySelector(":scope > .mobile-dialog-body");
        if (body) {
          const context = body.querySelector("#operationRecord");
          if (context) dialog.querySelector(".operation-hero").append(context);
          body.replaceWith(...body.childNodes);
        }
        for (const control of dialog.querySelectorAll(".mobile-dialog-close")) {
          control.innerHTML = control.mobileOriginalMarkup;
          control.classList.remove("mobile-dialog-close");
        }
        dialog.classList.remove("mobile-dialog");
        for (const title of dialog.querySelectorAll("[autofocus]"))
          title.removeAttribute("autofocus");
      }
    }
  };
  media.addEventListener("change", update);
  update();
  const app = $("app");
  const measure = () =>
    app.style.setProperty("--mobile-main-height", app.clientHeight + "px");
  new ResizeObserver(measure).observe(app);
  measure();
}

initMobileSurfaces();
