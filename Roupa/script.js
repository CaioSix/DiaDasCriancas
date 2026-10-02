// ===================================================================
// SISTEMA DE SALVAMENTO COMPARTILHADO (DIA DAS CRIANÇAS)
// ===================================================================
const STORAGE_KEY = 'dia_das_criancas_save';

function loadSaveData() {
  const defaultData = {
    coins: 50,
    stars: 0,
    unlockedClothes: [],
    quitandaUpgrades: {
      blender: false,
      mascot: false,
      lights: false,
      awning: 'default',
      goldenScale: false
    }
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw);
    return { ...defaultData, ...parsed, quitandaUpgrades: { ...defaultData.quitandaUpgrades, ...(parsed.quitandaUpgrades || {}) } };
  } catch (e) {
    return defaultData;
  }
}

function saveGameData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

let saveData = loadSaveData();

// ===================================================================
// BANCO DE DADOS EXPANDIDO: ROUPAS, CABELOS E ACESSÓRIOS DETALHADOS
// ===================================================================
const itemsDatabase = {
  // -------------------------------------------------------------
  // 1. CABELOS (Com mechas, luzes e reflexos)
  // -------------------------------------------------------------
  hair: [
    {
      id: 'hair-miku-idol',
      name: 'Maria Chiquinha Idol',
      previewColor: '#00f5d4',
      backSvg: `
        <!-- Mechas traseiras volumosas estilo Miku/Idol -->
        <path d="M 138 115 C 80 115 50 200 68 310 C 80 370 120 380 110 320 C 100 260 112 180 135 140 Z" fill="#00b4d8" stroke="#005f73" stroke-width="2.5"/>
        <path d="M 75 220 C 65 280 85 340 100 360" stroke="#90e0ef" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        
        <path d="M 222 115 C 280 115 310 200 292 310 C 280 370 240 380 250 320 C 260 260 248 180 225 140 Z" fill="#00b4d8" stroke="#005f73" stroke-width="2.5"/>
        <path d="M 285 220 C 295 280 275 340 260 360" stroke="#90e0ef" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      `,
      frontSvg: `
        <!-- Franja estilosa com luzes -->
        <path d="M 134 115 C 130 60 230 60 226 115 C 218 102 208 120 198 108 C 185 125 175 110 160 125 C 148 112 140 122 134 115 Z" fill="#00b4d8" stroke="#005f73" stroke-width="2.5"/>
        <path d="M 148 85 Q 180 75 212 85" stroke="#90e0ef" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- Laços duplos -->
        <rect x="122" y="108" width="16" height="12" rx="4" fill="#ff477e" stroke="#5a0020" stroke-width="2"/>
        <circle cx="130" cy="114" r="3" fill="#ffe5ec"/>
        <rect x="222" y="108" width="16" height="12" rx="4" fill="#ff477e" stroke="#5a0020" stroke-width="2"/>
        <circle cx="230" cy="114" r="3" fill="#ffe5ec"/>
      `
    },
    {
      id: 'hair-princess-waves',
      name: 'Princesa Dourada',
      price: 40,
      previewColor: '#ffd166',
      backSvg: `
        <!-- Cachos volumosos caindo pelas costas -->
        <path d="M 136 100 C 90 140 80 250 105 340 C 120 380 145 350 135 300 C 125 240 140 180 145 150 Z" fill="#f4a261" stroke="#6f3900" stroke-width="2.5"/>
        <path d="M 224 100 C 270 140 280 250 255 340 C 240 380 215 350 225 300 C 235 240 220 180 215 150 Z" fill="#f4a261" stroke="#6f3900" stroke-width="2.5"/>
        <!-- Reflexos dourados -->
        <path d="M 98 220 Q 90 280 115 320" stroke="#ffe8a1" stroke-width="3" fill="none"/>
        <path d="M 262 220 Q 270 280 245 320" stroke="#ffe8a1" stroke-width="3" fill="none"/>
      `,
      frontSvg: `
        <path d="M 134 110 C 130 55 230 55 226 110 C 220 145 228 220 218 260 C 210 230 215 130 196 115 C 182 122 178 112 166 122 C 150 112 144 135 142 260 C 132 220 140 145 134 110 Z" fill="#f4a261" stroke="#6f3900" stroke-width="2.5"/>
        <path d="M 155 80 Q 180 72 205 80" stroke="#ffe8a1" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      `
    },
    {
      id: 'hair-goth-twotone',
      name: 'E-Girl Bicolor',
      previewColor: '#7209b7',
      backSvg: `
        <path d="M 135 110 C 115 150 110 240 130 320 C 140 290 142 210 145 150 Z" fill="#212529" stroke="#000" stroke-width="2.5"/>
        <path d="M 225 110 C 245 150 250 240 230 320 C 220 290 218 210 215 150 Z" fill="#212529" stroke="#000" stroke-width="2.5"/>
      `,
      frontSvg: `
        <!-- Metade preta, mechas frontais rosa choque -->
        <path d="M 134 112 C 130 58 230 58 226 112 C 220 135 225 180 215 190 C 205 160 210 115 198 120 C 185 112 175 120 162 112 C 150 120 145 130 145 190 C 135 180 140 135 134 112 Z" fill="#212529" stroke="#000" stroke-width="2.5"/>
        <!-- Mechas frontais rosa -->
        <path d="M 148 110 C 148 140 146 195 152 215 C 154 185 156 130 160 115 Z" fill="#ff007f" stroke="#000" stroke-width="1.5"/>
        <path d="M 212 110 C 212 140 214 195 208 215 C 206 185 204 130 200 115 Z" fill="#ff007f" stroke="#000" stroke-width="1.5"/>
      `
    },
    {
      id: 'hair-space-buns',
      name: 'Coques Duplos Buns',
      previewColor: '#9d4edd',
      backSvg: `
        <!-- Coques redondos volumosos com brilho -->
        <circle cx="120" cy="75" r="24" fill="#9d4edd" stroke="#3c096c" stroke-width="2.5"/>
        <circle cx="116" cy="70" r="18" fill="#c77dff"/>
        <circle cx="240" cy="75" r="24" fill="#9d4edd" stroke="#3c096c" stroke-width="2.5"/>
        <circle cx="236" cy="70" r="18" fill="#c77dff"/>
      `,
      frontSvg: `
        <path d="M 136 115 C 130 65 230 65 224 115 C 218 102 208 120 196 110 C 184 125 176 112 164 124 C 152 112 142 120 136 115 Z" fill="#9d4edd" stroke="#3c096c" stroke-width="2.5"/>
        <!-- Fios soltos nas têmporas -->
        <path d="M 138 115 Q 132 165 142 185" stroke="#9d4edd" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M 222 115 Q 228 165 218 185" stroke="#9d4edd" stroke-width="3" fill="none" stroke-linecap="round"/>
      `
    }
  ],

  // -------------------------------------------------------------
  // 2. ROUPAS & TOPS (Vestidos completos, uniformes, jaquetas)
  // -------------------------------------------------------------
  top: [
    {
      id: 'top-sailor-school',
      name: 'Colegial Sailor',
      previewColor: '#1d3557',
      svg: `
        <!-- Camisa branca com gola marinheira azul marinho e laço vermelho -->
        <path d="M 152 178 L 126 215 L 140 230 L 150 215 L 148 275 L 212 275 L 210 215 L 220 230 L 234 215 L 208 178 Q 180 188 152 178 Z" fill="#ffffff" stroke="#1d3557" stroke-width="2.5"/>
        <!-- Gola Marinheira Azul -->
        <path d="M 148 180 L 132 235 L 165 235 L 172 195 L 180 205 L 188 195 L 195 235 L 228 235 L 212 180 Z" fill="#1d3557" stroke="#0b1b2d" stroke-width="2"/>
        <!-- Listras brancas da gola marinheira -->
        <path d="M 136 230 L 162 230" stroke="#ffffff" stroke-width="2"/>
        <path d="M 198 230 L 224 230" stroke="#ffffff" stroke-width="2"/>
        <!-- Laço Vermelho Rubi -->
        <polygon points="180,205 168,225 180,220 192,225" fill="#e63946" stroke="#7a0010" stroke-width="2"/>
        <circle cx="180" cy="207" r="4.5" fill="#ff758f" stroke="#7a0010" stroke-width="1.5"/>
        <path d="M 174 220 L 170 248 L 180 238 L 190 248 L 186 220 Z" fill="#e63946" stroke="#7a0010" stroke-width="1.5"/>
      `
    },
    {
      id: 'top-maid-dress',
      name: 'Vestido Maid Lolita',
      previewColor: '#2b2d42',
      svg: `
        <!-- Corpete gótico de empregada com avental branco e babados rendados -->
        <!-- Mangas bufantes pretas com barra de renda -->
        <ellipse cx="132" cy="195" rx="14" ry="12" fill="#2b2d42" stroke="#111" stroke-width="2"/>
        <ellipse cx="228" cy="195" rx="14" ry="12" fill="#2b2d42" stroke="#111" stroke-width="2"/>
        <path d="M 120 202 Q 132 210 144 202" stroke="#ffffff" stroke-width="3" fill="none"/>
        <path d="M 216 202 Q 228 210 240 202" stroke="#ffffff" stroke-width="3" fill="none"/>
        <!-- Vestido base escuro -->
        <path d="M 152 178 L 146 275 L 214 275 L 208 178 Q 180 185 152 178 Z" fill="#2b2d42" stroke="#111" stroke-width="2.5"/>
        <!-- Avental Branco com alças cruzadas -->
        <path d="M 160 180 L 164 275 L 196 275 L 200 180 Q 180 190 160 180 Z" fill="#ffffff" stroke="#ddd" stroke-width="2"/>
        <line x1="162" y1="184" x2="198" y2="240" stroke="#f08080" stroke-width="2"/>
        <line x1="198" y1="184" x2="162" y2="240" stroke="#f08080" stroke-width="2"/>
        <!-- Lacinho no peito -->
        <circle cx="180" cy="198" r="4" fill="#ff4d6d" stroke="#590d22" stroke-width="1.5"/>
        <polygon points="180,198 170,192 170,204" fill="#ff4d6d"/>
        <polygon points="180,198 190,192 190,204" fill="#ff4d6d"/>
      `
    },
    {
      id: 'top-kpop-jacket',
      name: 'Jaqueta Bomber K-Pop',
      previewColor: '#7209b7',
      svg: `
        <!-- Jaqueta Bomber Puffer Aberta com Top Cropped por baixo -->
        <!-- Top Cropped preto -->
        <path d="M 162 190 L 158 240 L 202 240 L 198 190 Z" fill="#1b1b1e" stroke="#000" stroke-width="2"/>
        <!-- Corrente prateada estilosa -->
        <path d="M 164 215 Q 180 230 196 215" stroke="#ced4da" stroke-width="2.5" fill="none"/>
        <!-- Jaqueta aberta com mangas volumosas -->
        <path d="M 150 178 L 112 240 L 110 280 L 128 280 L 136 248 L 152 265 L 160 195 Q 180 182 200 195 L 208 265 L 224 248 L 232 280 L 250 280 L 248 240 L 210 178 Z" fill="#7209b7" stroke="#3a0ca3" stroke-width="2.5"/>
        <!-- Detalhes em neon/zíper -->
        <line x1="156" y1="195" x2="148" y2="265" stroke="#f72585" stroke-width="3"/>
        <line x1="204" y1="195" x2="212" y2="265" stroke="#f72585" stroke-width="3"/>
      `
    },
    {
      id: 'top-princess-corset',
      name: 'Corpete Real Encantado',
      price: 45,
      previewColor: '#48cae4',
      svg: `
        <!-- Corpete azul celeste cintilante com broche de safira e mangas princesa -->
        <!-- Mangas caídas de tule translúcido -->
        <ellipse cx="130" cy="192" rx="16" ry="10" fill="rgba(202, 240, 248, 0.7)" stroke="#90e0ef" stroke-width="2"/>
        <ellipse cx="230" cy="192" rx="16" ry="10" fill="rgba(202, 240, 248, 0.7)" stroke="#90e0ef" stroke-width="2"/>
        <!-- Corpete com decote coração -->
        <path d="M 148 190 Q 165 178 180 192 Q 195 178 212 190 L 214 275 L 180 288 L 146 275 Z" fill="#0077b6" stroke="#03045e" stroke-width="2.5"/>
        <!-- Bordados dourados reais -->
        <path d="M 154 200 Q 180 220 206 200" stroke="#ffd166" stroke-width="2.5" fill="none"/>
        <path d="M 160 230 Q 180 250 200 230" stroke="#ffd166" stroke-width="2.5" fill="none"/>
        <!-- Broche de gema no centro -->
        <polygon points="180,185 186,192 180,200 174,192" fill="#90e0ef" stroke="#ffd166" stroke-width="2"/>
      `
    }
  ],

  // -------------------------------------------------------------
  // 3. SAIAS & CALÇAS (Plissadas, babados, jeans com correntes)
  // -------------------------------------------------------------
  bottom: [
    {
      id: 'bottom-plaid-school',
      name: 'Saia Plissada Xadrez',
      previewColor: '#b5179e',
      svg: `
        <!-- Saia de pregas com padrão xadrez colegial e cinto de couro -->
        <path d="M 146 272 L 126 350 L 234 350 L 214 272 Z" fill="#b5179e" stroke="#560bad" stroke-width="2.5"/>
        <!-- Padrão xadrez com linhas verticais e horizontais -->
        <line x1="150" y1="310" x2="210" y2="310" stroke="#4cc9f0" stroke-width="2" stroke-dasharray="4,4"/>
        <line x1="140" y1="335" x2="220" y2="335" stroke="#ffd166" stroke-width="2"/>
        <!-- Pregas da saia -->
        <line x1="160" y1="275" x2="148" y2="350" stroke="#3a0ca3" stroke-width="2"/>
        <line x1="175" y1="275" x2="172" y2="350" stroke="#3a0ca3" stroke-width="2"/>
        <line x1="185" y1="275" x2="188" y2="350" stroke="#3a0ca3" stroke-width="2"/>
        <line x1="200" y1="275" x2="212" y2="350" stroke="#3a0ca3" stroke-width="2"/>
        <!-- Cinto com fivela prateada -->
        <line x1="146" y1="278" x2="214" y2="278" stroke="#2b2d42" stroke-width="4"/>
        <rect x="174" y="274" width="12" height="8" rx="2" fill="#ced4da" stroke="#2b2d42" stroke-width="1.5"/>
      `
    },
    {
      id: 'bottom-lolita-ruffles',
      name: 'Saia Lolita com Rendas',
      previewColor: '#2b2d42',
      svg: `
        <!-- Saia rodada com duas camadas e barrado de renda branca -->
        <!-- Camada inferior de renda branca -->
        <path d="M 130 340 Q 142 355 155 340 Q 167 355 180 340 Q 192 355 205 340 Q 217 355 230 340" stroke="#e9ecef" stroke-width="8" fill="none" stroke-linecap="round"/>
        <!-- Camada superior preta bufante -->
        <path d="M 146 272 C 130 310 120 335 125 340 Q 180 355 235 340 C 240 335 230 310 214 272 Z" fill="#2b2d42" stroke="#111" stroke-width="2.5"/>
        <!-- Lacinhos rosas nos lados da saia -->
        <circle cx="145" cy="315" r="3" fill="#ff4d6d"/>
        <circle cx="215" cy="315" r="3" fill="#ff4d6d"/>
      `
    },
    {
      id: 'bottom-grunge-shorts',
      name: 'Shorts Jeans com Correntes',
      previewColor: '#0077b6',
      svg: `
        <!-- Shorts jeans destroyed com barra desfiada e correntes suspensas -->
        <path d="M 146 272 L 138 325 L 176 325 L 180 300 L 184 325 L 222 325 L 214 272 Z" fill="#0077b6" stroke="#023e8a" stroke-width="2.5"/>
        <!-- Barra desfiada -->
        <path d="M 138 325 Q 157 332 176 325" stroke="#caf0f8" stroke-width="2" fill="none"/>
        <path d="M 184 325 Q 203 332 222 325" stroke="#caf0f8" stroke-width="2" fill="none"/>
        <!-- Bolsos e Correntes duplas -->
        <path d="M 148 290 Q 158 302 168 290" fill="none" stroke="#023e8a" stroke-width="1.5"/>
        <path d="M 152 282 Q 170 305 180 285" stroke="#e0e1dd" stroke-width="2" fill="none"/>
        <path d="M 156 282 Q 172 315 182 285" stroke="#adb5bd" stroke-width="1.5" fill="none"/>
      `
    },
    {
      id: 'bottom-princess-gown',
      name: 'Saia Longa de Gala',
      price: 50,
      previewColor: '#0077b6',
      svg: `
        <!-- Saia longa de tule que vai até os pés, combinando com o corpete real -->
        <path d="M 146 272 C 120 330 95 420 105 460 C 125 470 235 470 255 460 C 265 420 240 330 214 272 Z" fill="#0077b6" stroke="#03045e" stroke-width="2.5"/>
        <!-- Sobreposição de tule cintilante com glitter -->
        <path d="M 148 274 C 130 330 115 410 135 450 Q 180 465 225 450 C 245 410 230 330 212 274 Z" fill="rgba(202, 240, 248, 0.4)" stroke="#90e0ef" stroke-width="1.5"/>
        <!-- Estrelinhas brilhantes na saia -->
        <circle cx="160" cy="380" r="3" fill="#ffd166"/>
        <circle cx="200" cy="410" r="2.5" fill="#ffd166"/>
        <circle cx="180" cy="440" r="3" fill="#ffffff"/>
      `
    }
  ],

  // -------------------------------------------------------------
  // 4. MEIAS (Fishnet, 7/8 colegial, rendas)
  // -------------------------------------------------------------
  socks: [
    {
      id: 'socks-thigh-high',
      name: 'Meias 7/8 Colegial',
      previewColor: '#2b2d42',
      svg: `
        <!-- Meias pretas até a coxa com três listras brancas -->
        <path d="M 152 330 L 152 460 Q 152 475 165 475 Q 175 475 175 460 L 175 330 Z" fill="#2b2d42" stroke="#111" stroke-width="2"/>
        <path d="M 185 330 L 185 460 Q 185 475 195 475 Q 208 475 208 460 L 208 330 Z" fill="#2b2d42" stroke="#111" stroke-width="2"/>
        <!-- Listras brancas no topo -->
        <line x1="152" y1="338" x2="175" y2="338" stroke="#ffffff" stroke-width="2.5"/>
        <line x1="152" y1="344" x2="175" y2="344" stroke="#ffffff" stroke-width="2"/>
        <line x1="185" y1="338" x2="208" y2="338" stroke="#ffffff" stroke-width="2.5"/>
        <line x1="185" y1="344" x2="208" y2="344" stroke="#ffffff" stroke-width="2"/>
      `
    },
    {
      id: 'socks-fishnet',
      name: 'Meia Arrastão Grunge',
      previewColor: '#6c757d',
      svg: `
        <!-- Padrão cruzado imitando rede arrastão sobre as pernas -->
        <g stroke="#343a40" stroke-width="1.2" opacity="0.8">
          <line x1="152" y1="300" x2="175" y2="320"/>
          <line x1="152" y1="320" x2="175" y2="340"/>
          <line x1="152" y1="340" x2="175" y2="360"/>
          <line x1="152" y1="360" x2="175" y2="380"/>
          <line x1="152" y1="380" x2="175" y2="400"/>
          <line x1="152" y1="400" x2="175" y2="420"/>
          <line x1="175" y1="300" x2="152" y2="320"/>
          <line x1="175" y1="320" x2="152" y2="340"/>
          <line x1="175" y1="340" x2="152" y2="360"/>
          <line x1="175" y1="360" x2="152" y2="380"/>
          <line x1="175" y1="380" x2="152" y2="400"/>
          <line x1="175" y1="400" x2="152" y2="420"/>

          <line x1="185" y1="300" x2="208" y2="320"/>
          <line x1="185" y1="320" x2="208" y2="340"/>
          <line x1="185" y1="340" x2="208" y2="360"/>
          <line x1="185" y1="360" x2="208" y2="380"/>
          <line x1="185" y1="380" x2="208" y2="400"/>
          <line x1="185" y1="400" x2="208" y2="420"/>
          <line x1="208" y1="300" x2="185" y2="320"/>
          <line x1="208" y1="320" x2="185" y2="340"/>
          <line x1="208" y1="340" x2="185" y2="360"/>
          <line x1="208" y1="360" x2="185" y2="380"/>
          <line x1="208" y1="380" x2="185" y2="400"/>
          <line x1="208" y1="400" x2="185" y2="420"/>
        </g>
      `
    },
    {
      id: 'socks-lace-ruffle',
      name: 'Soquetes com Babado',
      previewColor: '#f8f9fa',
      svg: `
        <!-- Soquete branco no tornozelo com rendinha franzida -->
        <rect x="148" y="440" width="28" height="20" rx="3" fill="#ffffff" stroke="#dee2e6" stroke-width="2"/>
        <path d="M 146 440 Q 155 432 162 440 Q 169 432 176 440" stroke="#ff85a1" stroke-width="3" fill="none"/>
        <rect x="182" y="440" width="28" height="20" rx="3" fill="#ffffff" stroke="#dee2e6" stroke-width="2"/>
        <path d="M 180 440 Q 189 432 196 440 Q 203 432 210 440" stroke="#ff85a1" stroke-width="3" fill="none"/>
      `
    }
  ],

  // -------------------------------------------------------------
  // 5. SAPATOS (Mary Jane plataforma, coturno punk, tênis chunky)
  // -------------------------------------------------------------
  shoes: [
    {
      id: 'shoes-mary-jane',
      name: 'Mary Jane Verniz',
      previewColor: '#1b1b1e',
      svg: `
        <!-- Sapato Mary Jane clássico com salto bloco e fivela prateada -->
        <path d="M 148 450 Q 148 440 166 440 Q 178 440 178 450 L 178 476 Q 168 480 150 480 Q 146 480 148 450 Z" fill="#1b1b1e" stroke="#000" stroke-width="2.5"/>
        <ellipse cx="164" cy="448" rx="8" ry="4" fill="#ffffff" opacity="0.3"/>
        <line x1="150" y1="454" x2="176" y2="454" stroke="#e0e1dd" stroke-width="2.5"/>
        <circle cx="172" cy="454" r="2" fill="#ffd166"/>

        <path d="M 182 450 Q 182 440 200 440 Q 212 440 212 450 L 212 476 Q 204 480 186 480 Q 180 480 182 450 Z" fill="#1b1b1e" stroke="#000" stroke-width="2.5"/>
        <ellipse cx="198" cy="448" rx="8" ry="4" fill="#ffffff" opacity="0.3"/>
        <line x1="184" y1="454" x2="210" y2="454" stroke="#e0e1dd" stroke-width="2.5"/>
        <circle cx="206" cy="454" r="2" fill="#ffd166"/>
      `
    },
    {
      id: 'shoes-combat-boots',
      name: 'Coturno Plataforma Tratorado',
      previewColor: '#495057',
      svg: `
        <!-- Coturno militar alto com fivelas prateadas e sola tratorada -->
        <path d="M 148 410 L 178 410 L 180 478 Q 165 482 148 482 Q 144 470 146 430 Z" fill="#343a40" stroke="#111" stroke-width="2.5"/>
        <line x1="150" y1="425" x2="176" y2="425" stroke="#adb5bd" stroke-width="2.5"/>
        <line x1="149" y1="445" x2="177" y2="445" stroke="#adb5bd" stroke-width="2.5"/>
        <!-- Dentes da sola tratorada -->
        <line x1="148" y1="476" x2="180" y2="476" stroke="#f72585" stroke-width="3"/>

        <path d="M 182 410 L 212 410 L 214 478 Q 199 482 182 482 Q 178 470 180 430 Z" fill="#343a40" stroke="#111" stroke-width="2.5"/>
        <line x1="184" y1="425" x2="210" y2="425" stroke="#adb5bd" stroke-width="2.5"/>
        <line x1="183" y1="445" x2="211" y2="445" stroke="#adb5bd" stroke-width="2.5"/>
        <line x1="182" y1="476" x2="214" y2="476" stroke="#f72585" stroke-width="3"/>
      `
    },
    {
      id: 'shoes-chunky-sneakers',
      name: 'Tênis Chunky Pastel',
      previewColor: '#f72585',
      svg: `
        <!-- Tênis esportivo moderno de sola grossa multicor -->
        <path d="M 146 450 Q 146 440 166 440 Q 180 440 180 450 L 180 478 Q 170 482 146 482 Z" fill="#ffffff" stroke="#4a4e69" stroke-width="2"/>
        <path d="M 148 460 Q 164 452 178 460" stroke="#b5179e" stroke-width="3.5" fill="none"/>
        <rect x="146" y="472" width="34" height="6" rx="2" fill="#4cc9f0"/>

        <path d="M 180 450 Q 180 440 200 440 Q 214 440 214 450 L 214 478 Q 200 482 180 482 Z" fill="#ffffff" stroke="#4a4e69" stroke-width="2"/>
        <path d="M 182 460 Q 198 452 212 460" stroke="#b5179e" stroke-width="3.5" fill="none"/>
        <rect x="180" y="472" width="34" height="6" rx="2" fill="#4cc9f0"/>
      `
    }
  ],

  // -------------------------------------------------------------
  // 6. ACESSÓRIOS (Tiaras rendadas, coroas, óculos e chokers)
  // -------------------------------------------------------------
  accessory: [
    {
      id: 'acc-maid-headband',
      name: 'Tiara Maid de Renda',
      previewColor: '#ffffff',
      svg: `
        <!-- Tiara de babados branca com laços pretos laterais -->
        <path d="M 140 85 Q 180 68 220 85" stroke="#ffffff" stroke-width="12" fill="none" stroke-linecap="round"/>
        <path d="M 140 85 Q 180 68 220 85" stroke="#2b2d42" stroke-width="2" fill="none"/>
        <!-- Rendas franzidas -->
        <circle cx="150" cy="78" r="4" fill="#ffffff"/>
        <circle cx="165" cy="74" r="4" fill="#ffffff"/>
        <circle cx="180" cy="72" r="4" fill="#ffffff"/>
        <circle cx="195" cy="74" r="4" fill="#ffffff"/>
        <circle cx="210" cy="78" r="4" fill="#ffffff"/>
        <!-- Lacinhos pretos nos lados -->
        <circle cx="138" cy="88" r="4.5" fill="#2b2d42"/>
        <circle cx="222" cy="88" r="4.5" fill="#2b2d42"/>
      `
    },
    {
      id: 'acc-royal-crown',
      name: 'Coroa Imperial de Ouro',
      price: 60,
      previewColor: '#ffd166',
      svg: `
        <!-- Coroa dourada real com gemas reluzentes -->
        <polygon points="152,80 156,58 166,70 180,50 194,70 204,58 208,80" fill="#ffd166" stroke="#b58300" stroke-width="2.5"/>
        <circle cx="180" cy="62" r="4" fill="#e63946" stroke="#b58300" stroke-width="1"/>
        <circle cx="162" cy="72" r="3" fill="#4cc9f0"/>
        <circle cx="198" cy="72" r="3" fill="#4cc9f0"/>
      `
    },
    {
      id: 'acc-kitsune-ears',
      name: 'Orelhas de Raposa Mística',
      previewColor: '#f77f00',
      svg: `
        <!-- Orelhas felpudas alaranjadas com brinco de argola dourado -->
        <polygon points="144,90 125,48 162,75" fill="#f77f00" stroke="#331800" stroke-width="2.5"/>
        <polygon points="144,85 133,58 155,75" fill="#fff3b0"/>
        <!-- Brinco na orelha esquerda -->
        <circle cx="127" cy="56" r="4" fill="none" stroke="#ffd166" stroke-width="2"/>

        <polygon points="216,90 235,48 198,75" fill="#f77f00" stroke="#331800" stroke-width="2.5"/>
        <polygon points="216,85 227,58 205,75" fill="#fff3b0"/>
      `
    },
    {
      id: 'acc-goth-choker',
      name: 'Choker com Coração Prateado',
      previewColor: '#212529',
      svg: `
        <!-- Gargantilha preta no pescoço com pingente de coração prateado -->
        <rect x="168" y="162" width="24" height="6" rx="2" fill="#212529" stroke="#000" stroke-width="1.5"/>
        <polygon points="180,172 174,166 186,166" fill="#ced4da" stroke="#495057" stroke-width="1.5"/>
      `
    },
    {
      id: 'acc-heart-glasses',
      name: 'Óculos de Sol Coração',
      previewColor: '#ff0054',
      svg: `
        <!-- Armação fashion em formato de coração com lentes translúcidas -->
        <path d="M 160 126 C 160 120 152 112 146 118 C 140 124 146 134 160 144 C 174 134 180 124 174 118 C 168 112 160 120 160 126 Z" fill="rgba(255, 0, 84, 0.45)" stroke="#ff0054" stroke-width="2.5"/>
        <path d="M 200 126 C 200 120 192 112 186 118 C 180 124 186 134 200 144 C 214 134 220 124 214 118 C 208 112 200 120 200 126 Z" fill="rgba(255, 0, 84, 0.45)" stroke="#ff0054" stroke-width="2.5"/>
        <line x1="168" y1="126" x2="192" y2="126" stroke="#ff0054" stroke-width="2"/>
      `
    }
  ],

  // -------------------------------------------------------------
  // 7. ITENS NA MÃO (Boba Tea, Ursinho, Varinha mágica)
  // -------------------------------------------------------------
  held: [
    {
      id: 'held-boba-tea',
      name: 'Copo de Boba Tea',
      previewColor: '#e0a96d',
      svg: `
        <!-- Copo de Chá com Bolinhas de Tapioca segurado pela mão direita -->
        <g transform="translate(230, 270)">
          <!-- Copo -->
          <polygon points="5,15 25,15 22,48 8,48" fill="rgba(255, 235, 215, 0.85)" stroke="#7f4f24" stroke-width="2"/>
          <line x1="3" y1="15" x2="27" y2="15" stroke="#7f4f24" stroke-width="3" stroke-linecap="round"/>
          <!-- Bolinhas de tapioca pretas -->
          <circle cx="12" cy="42" r="2.5" fill="#2b2d42"/>
          <circle cx="18" cy="43" r="2.5" fill="#2b2d42"/>
          <circle cx="15" cy="37" r="2.5" fill="#2b2d42"/>
          <!-- Canudo roxo -->
          <line x1="15" y1="5" x2="15" y2="30" stroke="#b5179e" stroke-width="3" stroke-linecap="round"/>
        </g>
      `
    },
    {
      id: 'held-teddy-bear',
      name: 'Ursinho de Pelúcia',
      previewColor: '#a98467',
      svg: `
        <!-- Ursinho fofinho sendo abraçado pelo braço esquerdo -->
        <g transform="translate(95, 260)">
          <!-- Cabeça e orelhas -->
          <circle cx="20" cy="18" r="16" fill="#b08968" stroke="#583101" stroke-width="2"/>
          <circle cx="8" cy="8" r="6" fill="#b08968" stroke="#583101" stroke-width="1.5"/>
          <circle cx="32" cy="8" r="6" fill="#b08968" stroke="#583101" stroke-width="1.5"/>
          <!-- Focinho e olhos de botão -->
          <ellipse cx="20" cy="22" rx="6" ry="4" fill="#ede0d4"/>
          <circle cx="20" cy="20" r="2" fill="#3a1d00"/>
          <circle cx="14" cy="16" r="2" fill="#3a1d00"/>
          <circle cx="26" cy="16" r="2" fill="#3a1d00"/>
          <!-- Lacinho vermelho no pescoço do urso -->
          <polygon points="20,30 14,26 14,34" fill="#e63946"/>
          <polygon points="20,30 26,26 26,34" fill="#e63946"/>
        </g>
      `
    },
    {
      id: 'held-magic-wand',
      name: 'Cetro de Garota Mágica',
      price: 35,
      previewColor: '#ffd166',
      svg: `
        <!-- Varinha mágica estilo Sailor Moon / Sakura -->
        <g transform="translate(230, 220)">
          <!-- Haste dourada com laço e asa -->
          <line x1="8" y1="20" x2="8" y2="90" stroke="#ffd166" stroke-width="4" stroke-linecap="round"/>
          <circle cx="8" cy="90" r="4" fill="#ff70a6"/>
          <!-- Estrela dourada no topo -->
          <polygon points="8,0 12,10 22,10 14,16 18,26 8,20 -2,26 2,16 -6,10 4,10" fill="#ffd166" stroke="#b58300" stroke-width="1.5"/>
          <!-- Cristal no centro -->
          <circle cx="8" cy="13" r="3.5" fill="#ff4d6d"/>
          <!-- Asinhas ao redor da estrela -->
          <path d="M 0 14 Q -12 8 -8 2" stroke="#ffffff" stroke-width="2.5" fill="none"/>
          <path d="M 16 14 Q 28 8 24 2" stroke="#ffffff" stroke-width="2.5" fill="none"/>
        </g>
      `
    }
  ],

  // -------------------------------------------------------------
  // 8. ASAS (Anjo, Fada mística, Morcego Vampírico)
  // -------------------------------------------------------------
  wings: [
    {
      id: 'wings-angel',
      name: 'Asas de Anjo Alvas',
      price: 50,
      previewColor: '#ffffff',
      svg: `
        <!-- Asas de anjo abertas com camadas de plumas brancas -->
        <!-- Asa Esquerda -->
        <path d="M 148 180 C 100 130 30 110 20 180 C 15 220 50 250 80 270 C 110 250 135 220 148 190 Z" fill="#ffffff" stroke="#c0d6df" stroke-width="2.5"/>
        <path d="M 35 170 Q 70 190 95 240" stroke="#c0d6df" stroke-width="2" fill="none"/>
        <path d="M 50 205 Q 85 220 110 255" stroke="#c0d6df" stroke-width="2" fill="none"/>

        <!-- Asa Direita -->
        <path d="M 212 180 C 260 130 330 110 340 180 C 345 220 310 250 280 270 C 250 250 225 220 212 190 Z" fill="#ffffff" stroke="#c0d6df" stroke-width="2.5"/>
        <path d="M 325 170 Q 290 190 265 240" stroke="#c0d6df" stroke-width="2" fill="none"/>
        <path d="M 310 205 Q 275 220 250 255" stroke="#c0d6df" stroke-width="2" fill="none"/>
      `
    },
    {
      id: 'wings-fairy',
      name: 'Asas de Fada Cintilantes',
      previewColor: '#70d6ff',
      svg: `
        <!-- Asas de fada translúcidas com nervuras coloridas -->
        <path d="M 148 180 C 90 80 15 120 25 190 C 35 250 90 270 148 210 Z" fill="rgba(112, 214, 255, 0.45)" stroke="#0096c7" stroke-width="2.5"/>
        <path d="M 45 150 Q 90 170 140 195" stroke="#ffd166" stroke-width="1.5" fill="none"/>

        <path d="M 212 180 C 270 80 345 120 335 190 C 325 250 270 270 212 210 Z" fill="rgba(112, 214, 255, 0.45)" stroke="#0096c7" stroke-width="2.5"/>
        <path d="M 315 150 Q 270 170 220 195" stroke="#ffd166" stroke-width="1.5" fill="none"/>
      `
    },
    {
      id: 'wings-demon',
      name: 'Asas de Morcego Dark',
      price: 40,
      previewColor: '#7b2cbf',
      svg: `
        <!-- Asas pontiagudas de morcego/demônio gótico -->
        <path d="M 148 185 L 60 120 L 70 160 Q 50 180 30 190 Q 60 215 90 215 Q 115 235 148 200 Z" fill="#240046" stroke="#10002b" stroke-width="2.5"/>
        <line x1="60" y1="120" x2="30" y2="190" stroke="#7b2cbf" stroke-width="2"/>
        <line x1="60" y1="120" x2="90" y2="215" stroke="#7b2cbf" stroke-width="2"/>

        <path d="M 212 185 L 300 120 L 290 160 Q 310 180 330 190 Q 300 215 270 215 Q 245 235 212 200 Z" fill="#240046" stroke="#10002b" stroke-width="2.5"/>
        <line x1="300" y1="120" x2="330" y2="190" stroke="#7b2cbf" stroke-width="2"/>
        <line x1="300" y1="120" x2="270" y2="215" stroke="#7b2cbf" stroke-width="2"/>
      `
    }
  ],

  // -------------------------------------------------------------
  // 9. FUNDOS / CENÁRIOS
  // -------------------------------------------------------------
  bg: [
    { id: 'bg-pastel-room', name: 'Quarto Gamer', previewColor: '#ffe5ec' },
    { id: 'bg-cherry-garden', name: 'Sakura Garden', previewColor: '#b7e4c7' },
    { id: 'bg-starlight', name: 'Noite Mágica', previewColor: '#3a0ca3' },
    { id: 'bg-sunny-beach', name: 'Praia Verão', previewColor: '#f4a261' }
  ]
};

// ==========================================
// ESTADO DO VISUAL DA PERSONAGEM
// ==========================================
const currentOutfit = {
  hair: 'hair-miku-idol',
  top: 'top-sailor-school',
  bottom: 'bottom-plaid-school',
  socks: 'socks-thigh-high',
  shoes: 'shoes-mary-jane',
  accessory: 'acc-goth-choker',
  held: 'held-boba-tea',
  wings: null,
  bg: 'bg-pastel-room'
};

let activeCategory = 'hair';
let soundEnabled = true;

// Referências aos Elementos
const itemsGrid = document.getElementById('items-grid');
const categoryTabs = document.querySelectorAll('.tab-btn');
const layerBg = document.getElementById('layer-bg');
const layerBase = document.getElementById('layer-base');

const slotWings = document.getElementById('wings-back-slot');
const slotHairBack = document.getElementById('hair-back-slot');
const slotHairFront = document.getElementById('hair-front-slot');
const slotTop = document.getElementById('slot-top');
const slotBottom = document.getElementById('slot-bottom');
const slotSocks = document.getElementById('slot-socks');
const slotShoes = document.getElementById('slot-shoes');
const slotAccessory = document.getElementById('slot-accessory');
const slotHeld = document.getElementById('slot-held');

const sparkleFx = document.getElementById('sparkle-fx');
const toastMessage = document.getElementById('toast-message');
const btnSound = document.getElementById('btn-sound');
const btnCamera = document.getElementById('btn-camera');
const screenshotCanvas = document.getElementById('screenshot-canvas');
const statCoins = document.getElementById('stat-coins');

const modalUnlock = document.getElementById('modal-unlock');
const btnCloseUnlock = document.getElementById('btn-close-unlock');
const btnConfirmBuy = document.getElementById('btn-confirm-buy');
const unlockPreview = document.getElementById('unlock-preview');
const unlockItemName = document.getElementById('unlock-item-name');
const unlockPrice = document.getElementById('unlock-price');
let pendingUnlockItem = null;

// ==========================================
// SISTEMA DE ÁUDIO WEB SINTETIZADO
// ==========================================
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playPopSound() {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    const now = audioCtx.currentTime;
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(960, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {}
}

function playCameraSound() {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.setValueAtTime(1000, now + 0.05);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  } catch (e) {}
}

// ==========================================
// FEEDBACK VISUAL (BRILHO E TOAST)
// ==========================================
function triggerSparkle() {
  sparkleFx.classList.add('active');
  setTimeout(() => {
    sparkleFx.classList.remove('active');
  }, 180);
}

let toastTimer = null;
function showToast(text) {
  if (toastTimer) clearTimeout(toastTimer);
  toastMessage.textContent = text;
  toastMessage.classList.add('show');
  toastTimer = setTimeout(() => {
    toastMessage.classList.remove('show');
  }, 2200);
}

// ==========================================
// ATUALIZAÇÃO DO PALCO
// ==========================================
function updateStage() {
  // 1. Asas
  const wingItem = itemsDatabase.wings ? itemsDatabase.wings.find(item => item.id === currentOutfit.wings) : null;
  slotWings.innerHTML = wingItem ? wingItem.svg : '';

  // 2. Cabelo (Back & Front)
  const hairItem = itemsDatabase.hair.find(item => item.id === currentOutfit.hair);
  if (hairItem) {
    slotHairBack.innerHTML = hairItem.backSvg || '';
    slotHairFront.innerHTML = hairItem.frontSvg || '';
  } else {
    slotHairBack.innerHTML = '';
    slotHairFront.innerHTML = '';
  }

  // 3. Meias
  const socksItem = itemsDatabase.socks ? itemsDatabase.socks.find(item => item.id === currentOutfit.socks) : null;
  slotSocks.innerHTML = socksItem ? socksItem.svg : '';

  // 4. Parte de Baixo (Saias/Calças)
  const bottomItem = itemsDatabase.bottom.find(item => item.id === currentOutfit.bottom);
  slotBottom.innerHTML = bottomItem ? bottomItem.svg : '';

  // 5. Sapatos
  const shoesItem = itemsDatabase.shoes.find(item => item.id === currentOutfit.shoes);
  slotShoes.innerHTML = shoesItem ? shoesItem.svg : '';

  // 6. Parte de Cima (Top/Vestido)
  const topItem = itemsDatabase.top.find(item => item.id === currentOutfit.top);
  slotTop.innerHTML = topItem ? topItem.svg : '';

  // 7. Acessórios
  const accItem = itemsDatabase.accessory.find(item => item.id === currentOutfit.accessory);
  slotAccessory.innerHTML = accItem ? accItem.svg : '';

  // 8. Itens na Mão
  const heldItem = itemsDatabase.held ? itemsDatabase.held.find(item => item.id === currentOutfit.held) : null;
  slotHeld.innerHTML = heldItem ? heldItem.svg : '';

  // 9. Cenário de Fundo
  layerBg.className = 'layer background-layer ' + (currentOutfit.bg || 'bg-pastel-room');
}

// ==========================================
// RENDERIZAÇÃO DA GRADE DE ITENS
// ==========================================
function renderWardrobeItems() {
  itemsGrid.innerHTML = '';
  const items = itemsDatabase[activeCategory] || [];

  // Categorias opcionais que podem ter botão "Nenhum"
  const optionalCategories = ['accessory', 'shoes', 'bottom', 'top', 'socks', 'held', 'wings'];
  if (optionalCategories.includes(activeCategory)) {
    const removeCard = document.createElement('div');
    removeCard.className = `item-card remove-card ${!currentOutfit[activeCategory] ? 'selected' : ''}`;
    removeCard.innerHTML = `
      <div class="item-preview">❌</div>
      <span class="item-name">Nenhum</span>
    `;
    removeCard.onclick = () => {
      currentOutfit[activeCategory] = null;
      playPopSound();
      triggerSparkle();
      updateStage();
      renderWardrobeItems();
    };
    itemsGrid.appendChild(removeCard);
  }

  // Renderizar cada item
  items.forEach(item => {
    const card = document.createElement('div');
    const isSelected = currentOutfit[activeCategory] === item.id;
    const isLocked = item.price && !saveData.unlockedClothes.includes(item.id);

    card.className = `item-card ${isSelected ? 'selected' : ''} ${isLocked ? 'locked' : ''}`;

    let previewHtml = '';
    if (activeCategory === 'bg') {
      previewHtml = `<div style="width:34px; height:34px; border-radius:50%; background:${item.previewColor}; box-shadow: 0 2px 6px rgba(0,0,0,0.15)"></div>`;
    } else {
      previewHtml = `
        <svg viewBox="0 0 360 520" style="width: 100%; height: 100%;">
          ${item.svg || (item.frontSvg || '')}
        </svg>
      `;
    }

    card.innerHTML = `
      ${isLocked ? `<div class="locked-badge">🔒 🪙 ${item.price}</div>` : ''}
      <div class="item-preview">${previewHtml}</div>
      <span class="item-name">${item.name}</span>
    `;

    card.onclick = () => {
      if (isLocked) {
        openUnlockModal(item);
      } else {
        currentOutfit[activeCategory] = item.id;
        playPopSound();
        triggerSparkle();
        updateStage();
        renderWardrobeItems();
      }
    };

    itemsGrid.appendChild(card);
  });
}

// ==========================================
// MODAL DE DESBLOQUEIO DE ROUPAS
// ==========================================
function openUnlockModal(item) {
  initAudio();
  playPopSound();
  pendingUnlockItem = item;
  unlockItemName.textContent = item.name;
  unlockPrice.textContent = `🪙 ${item.price}`;
  unlockPreview.innerHTML = `
    <svg viewBox="0 0 360 520" style="width: 100%; height: 100%;">
      ${item.svg || (item.frontSvg || '')}
    </svg>
  `;
  modalUnlock.classList.add('active');
}

if (btnCloseUnlock) {
  btnCloseUnlock.addEventListener('click', () => {
    modalUnlock.classList.remove('active');
  });
}

if (btnConfirmBuy) {
  btnConfirmBuy.addEventListener('click', () => {
    if (!pendingUnlockItem) return;
    if (saveData.coins < pendingUnlockItem.price) {
      showToast(`Faltam 🪙 ${pendingUnlockItem.price - saveData.coins} moedas! Ganhe mais na Quitanda! 🥑`);
      return;
    }

    initAudio();
    playCameraSound();

    saveData.coins -= pendingUnlockItem.price;
    if (!saveData.unlockedClothes.includes(pendingUnlockItem.id)) {
      saveData.unlockedClothes.push(pendingUnlockItem.id);
    }
    saveGameData(saveData);

    if (statCoins) statCoins.textContent = saveData.coins;
    currentOutfit[activeCategory] = pendingUnlockItem.id;

    modalUnlock.classList.remove('active');
    triggerSparkle();
    updateStage();
    renderWardrobeItems();
    showToast(`Parabéns! ${pendingUnlockItem.name} é seu para sempre! 💖`);
  });
}

// ==========================================
// SELEÇÃO DE ABAS
// ==========================================
categoryTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    initAudio();
    categoryTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeCategory = tab.dataset.category;
    
    // Centralizar aba visível no mobile touch scroll
    tab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    
    playPopSound();
    renderWardrobeItems();
  });
});

// ==========================================
// CONTROLES DO CABEÇALHO
// ==========================================
btnSound.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  btnSound.textContent = soundEnabled ? '🔊' : '🔇';
  showToast(soundEnabled ? 'Som Ativado 🔊' : 'Som Desativado 🔇');
  if (soundEnabled) playPopSound();
});

document.getElementById('btn-random').addEventListener('click', () => {
  initAudio();
  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)].id;
  currentOutfit.hair = getRandom(itemsDatabase.hair);
  currentOutfit.top = getRandom(itemsDatabase.top);
  currentOutfit.bottom = getRandom(itemsDatabase.bottom);
  currentOutfit.socks = Math.random() > 0.3 ? getRandom(itemsDatabase.socks) : null;
  currentOutfit.shoes = getRandom(itemsDatabase.shoes);
  currentOutfit.accessory = Math.random() > 0.3 ? getRandom(itemsDatabase.accessory) : null;
  currentOutfit.held = Math.random() > 0.4 ? getRandom(itemsDatabase.held) : null;
  currentOutfit.wings = Math.random() > 0.6 ? getRandom(itemsDatabase.wings) : null;
  currentOutfit.bg = getRandom(itemsDatabase.bg);

  playPopSound();
  triggerSparkle();
  updateStage();
  renderWardrobeItems();
  showToast('Visual Aleatório! 🎲');
});

document.getElementById('btn-reset').addEventListener('click', () => {
  initAudio();
  currentOutfit.hair = 'hair-miku-idol';
  currentOutfit.top = null;
  currentOutfit.bottom = null;
  currentOutfit.socks = null;
  currentOutfit.shoes = null;
  currentOutfit.accessory = null;
  currentOutfit.held = null;
  currentOutfit.wings = null;
  currentOutfit.bg = 'bg-pastel-room';

  playPopSound();
  triggerSparkle();
  updateStage();
  renderWardrobeItems();
  showToast('Look resetado! 🔄');
});

// 📸 Salvar Foto em Alta Definição
btnCamera.addEventListener('click', () => {
  initAudio();
  playCameraSound();
  showToast('Preparando sua foto... 📸');

  const canvas = screenshotCanvas;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  const bgColors = {
    'bg-pastel-room': '#ffe5ec',
    'bg-cherry-garden': '#d8f3dc',
    'bg-starlight': '#1b1035',
    'bg-sunny-beach': '#90e0ef'
  };
  ctx.fillStyle = bgColors[currentOutfit.bg] || '#ffffff';
  ctx.fillRect(0, 0, width, height);

  const svgCopy = layerBase.cloneNode(true);
  svgCopy.setAttribute('width', width);
  svgCopy.setAttribute('height', height);

  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(svgCopy);
  const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const img = new Image();

  img.onload = () => {
    ctx.drawImage(img, 0, 0, width, height);
    URL.revokeObjectURL(url);

    ctx.fillStyle = 'rgba(74, 62, 78, 0.4)';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Sonia Modas ✨', width / 2, height - 30);

    const downloadLink = document.createElement('a');
    downloadLink.download = 'meu-anime-look.png';
    downloadLink.href = canvas.toDataURL('image/png');
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    showToast('Foto salva na sua galeria! ✨');
  };

  img.src = url;
});

// Inicialização
if (statCoins) statCoins.textContent = saveData.coins;
updateStage();
renderWardrobeItems();
