// ===================================================================
// SISTEMA DE SALVAMENTO COMPARTILHADO (DIA DAS CRIANÇAS)
// ===================================================================
const STORAGE_KEY = 'dia_das_criancas_save';

function loadSaveData() {
  const defaultData = {
    coins: 50, // Começa com 50 moedas de presente de Dia das Crianças!
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
// BANCO DE DADOS: FRUTAS E LEGUMES DA QUITANDA DO ABACATEIRO
// ===================================================================
const produceDatabase = [
  {
    id: 'avocado',
    name: 'Abacate',
    price: 3.50,
    weight: 0.40,
    svg: `
      <path d="M 50 12 C 32 12 25 38 22 60 C 18 82 32 94 50 94 C 68 94 82 82 78 60 C 75 38 68 12 50 12 Z" fill="#2d6a4f" stroke="#1b4332" stroke-width="2.5"/>
      <path d="M 50 17 C 36 17 30 40 28 60 C 25 79 36 89 50 89 C 64 89 75 79 72 60 C 70 40 64 17 50 17 Z" fill="#b7e4c7"/>
      <circle cx="50" cy="65" r="16" fill="#6f4e37" stroke="#3d2817" stroke-width="2"/>
      <circle cx="46" cy="62" r="4" fill="#8c6245"/>
    `
  },
  {
    id: 'apple',
    name: 'Maçã',
    price: 2.00,
    weight: 0.20,
    svg: `
      <path d="M 50 24 C 36 12 20 28 20 54 C 20 80 40 92 50 92 C 60 92 80 80 80 54 C 80 28 64 12 50 24 Z" fill="#e63946" stroke="#9b111e" stroke-width="2.5"/>
      <path d="M 32 40 Q 28 58 34 68" stroke="#ff758f" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M 50 24 Q 48 12 54 8" stroke="#582f0e" stroke-width="3" fill="none"/>
      <path d="M 52 14 Q 64 10 62 20 Q 52 20 52 14 Z" fill="#52b788"/>
    `
  },
  {
    id: 'banana',
    name: 'Banana',
    price: 1.50,
    weight: 0.18,
    svg: `
      <path d="M 25 35 C 38 65 65 78 82 58 C 76 72 45 74 25 35 Z" fill="#ffd166" stroke="#e09f3e" stroke-width="2.5"/>
      <path d="M 18 25 C 32 60 62 82 85 52 C 78 78 36 78 18 25 Z" fill="#ffe494" stroke="#e09f3e" stroke-width="2.5"/>
      <circle cx="18" cy="24" r="3.5" fill="#582f0e"/>
      <circle cx="85" cy="52" r="3" fill="#582f0e"/>
    `
  },
  {
    id: 'watermelon',
    name: 'Melancia',
    price: 5.00,
    weight: 1.20,
    svg: `
      <path d="M 15 25 Q 50 92 85 25 Z" fill="#e63946" stroke="#9b111e" stroke-width="2"/>
      <path d="M 12 24 Q 50 98 88 24" stroke="#2d6a4f" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 14 24 Q 50 94 86 24" stroke="#b7e4c7" stroke-width="3" fill="none"/>
      <circle cx="36" cy="40" r="2.5" fill="#2b2d42"/>
      <circle cx="50" cy="52" r="2.5" fill="#2b2d42"/>
      <circle cx="64" cy="40" r="2.5" fill="#2b2d42"/>
    `
  },
  {
    id: 'strawberry',
    name: 'Morango',
    price: 3.00,
    weight: 0.15,
    svg: `
      <path d="M 50 25 C 25 25 22 55 50 90 C 78 55 75 25 50 25 Z" fill="#ff4d6d" stroke="#c9184a" stroke-width="2.5"/>
      <polygon points="50,26 40,16 46,26 30,22 42,28 50,28 58,28 70,22 54,26 60,16" fill="#52b788" stroke="#2d6a4f" stroke-width="1.5"/>
      <circle cx="42" cy="42" r="1.5" fill="#ffd166"/>
      <circle cx="58" cy="42" r="1.5" fill="#ffd166"/>
      <circle cx="50" cy="56" r="1.5" fill="#ffd166"/>
    `
  },
  {
    id: 'orange',
    name: 'Laranja',
    price: 1.80,
    weight: 0.25,
    svg: `
      <circle cx="50" cy="54" r="32" fill="#f77f00" stroke="#d62828" stroke-width="2.5"/>
      <ellipse cx="40" cy="42" rx="8" ry="4" fill="#fcbf49" opacity="0.6"/>
      <path d="M 50 22 Q 62 14 62 26 Q 52 26 50 22 Z" fill="#52b788" stroke="#2d6a4f" stroke-width="1.5"/>
      <circle cx="50" cy="24" r="2" fill="#582f0e"/>
    `
  },
  {
    id: 'grapes',
    name: 'Uva Roxa',
    price: 4.00,
    weight: 0.35,
    svg: `
      <circle cx="50" cy="38" r="10" fill="#7209b7" stroke="#3a0ca3" stroke-width="2"/>
      <circle cx="38" cy="48" r="10" fill="#7209b7" stroke="#3a0ca3" stroke-width="2"/>
      <circle cx="62" cy="48" r="10" fill="#7209b7" stroke="#3a0ca3" stroke-width="2"/>
      <circle cx="44" cy="64" r="10" fill="#560bad" stroke="#3a0ca3" stroke-width="2"/>
      <circle cx="56" cy="64" r="10" fill="#560bad" stroke="#3a0ca3" stroke-width="2"/>
      <circle cx="50" cy="78" r="9" fill="#3a0ca3" stroke="#240046" stroke-width="2"/>
      <path d="M 50 28 Q 50 16 54 12" stroke="#582f0e" stroke-width="3" fill="none"/>
      <path d="M 50 24 Q 38 18 36 26 Z" fill="#52b788"/>
    `
  },
  {
    id: 'carrot',
    name: 'Cenoura',
    price: 1.20,
    weight: 0.15,
    svg: `
      <polygon points="40,28 60,28 52,92 48,92" fill="#f77f00" stroke="#c85a00" stroke-width="2.5"/>
      <line x1="44" y1="42" x2="52" y2="42" stroke="#c85a00" stroke-width="2"/>
      <line x1="48" y1="58" x2="56" y2="58" stroke="#c85a00" stroke-width="2"/>
      <path d="M 50 28 L 44 12" stroke="#38b000" stroke-width="3" stroke-linecap="round"/>
      <path d="M 50 28 L 50 8" stroke="#38b000" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M 50 28 L 58 12" stroke="#38b000" stroke-width="3" stroke-linecap="round"/>
    `
  },
  {
    id: 'corn',
    name: 'Milho Doce',
    price: 2.50,
    weight: 0.30,
    svg: `
      <ellipse cx="50" cy="52" rx="14" ry="32" fill="#ffd166" stroke="#e09f3e" stroke-width="2.5"/>
      <line x1="50" y1="24" x2="50" y2="80" stroke="#e09f3e" stroke-width="1.5" stroke-dasharray="3,3"/>
      <path d="M 38 78 Q 30 50 42 38 Q 32 60 48 84 Z" fill="#70e000" stroke="#38b000" stroke-width="2"/>
      <path d="M 62 78 Q 70 50 58 38 Q 68 60 52 84 Z" fill="#70e000" stroke="#38b000" stroke-width="2"/>
    `
  },
  {
    id: 'pineapple',
    name: 'Abacaxi',
    price: 6.00,
    weight: 1.50,
    svg: `
      <ellipse cx="50" cy="62" rx="20" ry="26" fill="#f4a261" stroke="#b5651d" stroke-width="2.5"/>
      <line x1="36" y1="50" x2="64" y2="75" stroke="#b5651d" stroke-width="1.5"/>
      <line x1="36" y1="75" x2="64" y2="50" stroke="#b5651d" stroke-width="1.5"/>
      <polygon points="50,40 38,15 46,36 44,10 50,34 56,10 54,36 62,15" fill="#38b000" stroke="#206a00" stroke-width="2"/>
    `
  }
];

// ===================================================================
// BANCO DE DADOS: CLIENTES
// ===================================================================
const customersDatabase = [
  {
    id: 'cat',
    name: 'Gatinha Mingau',
    greeting: 'Miau! Quero frutinhas gostosas:',
    thanks: 'Miau! Obrigado, estão deliciosas! ⭐⭐⭐',
    svg: `
      <circle cx="70" cy="75" r="42" fill="#ffffff" stroke="#adb5bd" stroke-width="3"/>
      <polygon points="38,48 26,14 55,36" fill="#ffffff" stroke="#adb5bd" stroke-width="3"/>
      <polygon points="38,44 32,22 50,36" fill="#ffb3c6"/>
      <polygon points="102,48 114,14 85,36" fill="#ffffff" stroke="#adb5bd" stroke-width="3"/>
      <polygon points="102,44 108,22 90,36" fill="#ffb3c6"/>
      <circle cx="55" cy="72" r="5" fill="#2b2d42"/>
      <circle cx="53" cy="70" r="1.8" fill="#ffffff"/>
      <circle cx="85" cy="72" r="5" fill="#2b2d42"/>
      <circle cx="83" cy="70" r="1.8" fill="#ffffff"/>
      <circle cx="45" cy="80" r="6" fill="#ff85a1" opacity="0.6"/>
      <circle cx="95" cy="80" r="6" fill="#ff85a1" opacity="0.6"/>
      <polygon points="70,78 66,74 74,74" fill="#ff758f"/>
      <path d="M 64 82 Q 70 88 76 82" stroke="#2b2d42" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="88" cy="38" r="4" fill="#e63946"/>
      <polygon points="88,38 98,32 98,44" fill="#e63946"/>
      <polygon points="88,38 78,32 78,44" fill="#e63946"/>
    `
  },
  {
    id: 'bear',
    name: 'Ursinho Pipo',
    greeting: 'Olá! Minha mãe pediu pra levar:',
    thanks: 'Oba! O piquenique vai ser incrível! ⭐⭐⭐',
    svg: `
      <circle cx="70" cy="75" r="44" fill="#9c6644" stroke="#583101" stroke-width="3"/>
      <circle cx="34" cy="40" r="14" fill="#9c6644" stroke="#583101" stroke-width="3"/>
      <circle cx="34" cy="40" r="8" fill="#ddb892"/>
      <circle cx="106" cy="40" r="14" fill="#9c6644" stroke="#583101" stroke-width="3"/>
      <circle cx="106" cy="40" r="8" fill="#ddb892"/>
      <ellipse cx="70" cy="84" rx="18" ry="12" fill="#ddb892"/>
      <ellipse cx="70" cy="78" rx="6" ry="4" fill="#3a1d00"/>
      <path d="M 65 84 Q 70 90 75 84" stroke="#3a1d00" stroke-width="2.5" fill="none"/>
      <circle cx="52" cy="68" r="4.5" fill="#3a1d00"/>
      <circle cx="50" cy="66" r="1.5" fill="#ffffff"/>
      <circle cx="88" cy="68" r="4.5" fill="#3a1d00"/>
      <circle cx="86" cy="66" r="1.5" fill="#ffffff"/>
    `
  },
  {
    id: 'bunny',
    name: 'Coelhinha Luna',
    greeting: 'Oie! Preciso dessas delícias:',
    thanks: 'Nhami! Frutinhas perfeitas e crocantes! ⭐⭐⭐',
    svg: `
      <ellipse cx="48" cy="28" rx="10" ry="24" fill="#f8f9fa" stroke="#adb5bd" stroke-width="3"/>
      <ellipse cx="48" cy="28" rx="5" ry="16" fill="#ffb3c6"/>
      <ellipse cx="92" cy="28" rx="10" ry="24" fill="#f8f9fa" stroke="#adb5bd" stroke-width="3"/>
      <ellipse cx="92" cy="28" rx="5" ry="16" fill="#ffb3c6"/>
      <circle cx="70" cy="80" r="40" fill="#f8f9fa" stroke="#adb5bd" stroke-width="3"/>
      <circle cx="54" cy="76" r="5" fill="#2b2d42"/>
      <circle cx="52" cy="74" r="1.8" fill="#ffffff"/>
      <circle cx="86" cy="76" r="5" fill="#2b2d42"/>
      <circle cx="84" cy="74" r="1.8" fill="#ffffff"/>
      <polygon points="70,82 66,80 74,80" fill="#ff758f"/>
      <path d="M 66 86 Q 70 90 74 86" stroke="#2b2d42" stroke-width="2" fill="none"/>
      <circle cx="44" cy="84" r="6" fill="#ff85a1" opacity="0.6"/>
      <circle cx="96" cy="84" r="6" fill="#ff85a1" opacity="0.6"/>
    `
  },
  {
    id: 'fox',
    name: 'Raposinha Fred',
    greeting: 'E aí! Separa essas frutas pra mim:',
    thanks: 'Valeu demais! Essa quitanda é a melhor! ⭐⭐⭐',
    svg: `
      <polygon points="34,44 22,12 56,34" fill="#f77f00" stroke="#9d0208" stroke-width="3"/>
      <polygon points="34,40 28,20 50,34" fill="#3a1d00"/>
      <polygon points="106,44 118,12 84,34" fill="#f77f00" stroke="#9d0208" stroke-width="3"/>
      <polygon points="106,40 112,20 90,34" fill="#3a1d00"/>
      <circle cx="70" cy="76" r="42" fill="#f77f00" stroke="#9d0208" stroke-width="3"/>
      <path d="M 28 78 Q 50 110 70 88 Q 90 110 112 78 Z" fill="#fff" stroke="#9d0208" stroke-width="2"/>
      <circle cx="70" cy="86" r="4" fill="#212529"/>
      <path d="M 48 70 Q 55 64 62 70" stroke="#212529" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M 78 70 Q 85 64 92 70" stroke="#212529" stroke-width="3" fill="none" stroke-linecap="round"/>
    `
  }
];

// ===================================================================
// CATÁLOGO DE REFORMAS / UPGRADES
// ===================================================================
const upgradesCatalog = [
  {
    id: 'blender',
    title: 'Liquidificador Mágico',
    price: 30,
    icon: '🥤',
    desc: 'Permite fazer vitaminas e sucos batidos na hora com moedas em dobro!'
  },
  {
    id: 'mascot',
    title: 'Cãozinho Caramelo',
    price: 45,
    icon: '🐶',
    desc: 'Um mascote fiel que fica no balcão e atrai mais clientes felizes!'
  },
  {
    id: 'lights',
    title: 'Luzinhas Pisca-Pisca',
    price: 20,
    icon: '✨',
    desc: 'Decore o toldo da quitanda com lâmpadas coloridas festivas!'
  },
  {
    id: 'awning-watermelon',
    title: 'Toldo de Melancia',
    price: 35,
    icon: '🍉',
    desc: 'Troque o toldo tradicional por um alegre toldo de melancia fresca!'
  },
  {
    id: 'awning-golden',
    title: 'Toldo Real Dourado',
    price: 70,
    icon: '👑',
    desc: 'O toldo mais luxuoso da cidade, brilhando como ouro maciço!'
  },
  {
    id: 'goldenScale',
    title: 'Balança Dourada',
    price: 60,
    icon: '⚖️',
    desc: 'Balança de luxo que dá 50% de bônus nas vendas!'
  }
];

// ===================================================================
// ESTADO LOCAL DA PARTIDA
// ===================================================================
let soundEnabled = true;
let currentCustomer = null;
let currentOrder = [];
let scaleItems = [];
let isJuiceOrder = false;
let blenderItems = [];
let juiceReady = false;

// Elementos do DOM
const statCoins = document.getElementById('stat-coins');
const statStars = document.getElementById('stat-stars');
const btnSound = document.getElementById('btn-sound');

const awning = document.getElementById('awning');
const fairyLights = document.getElementById('fairy-lights');
const mascotWrapper = document.getElementById('mascot-wrapper');
const scaleBox = document.getElementById('scale-box');

const customerSvg = document.getElementById('customer-svg');
const customerName = document.getElementById('customer-name');
const bubbleGreeting = document.getElementById('bubble-greeting');
const orderItemsContainer = document.getElementById('order-items');

const scaleFruitsTray = document.getElementById('scale-fruits-tray');
const scaleWeight = document.getElementById('scale-weight');
const scalePrice = document.getElementById('scale-price');

const blenderStation = document.getElementById('blender-station');
const blenderBody = document.getElementById('blender-body');
const blenderSmoothie = document.getElementById('blender-smoothie');
const blenderFruitsInside = document.getElementById('blender-fruits-inside');
const btnBlend = document.getElementById('btn-blend');
const blenderOutput = document.getElementById('blender-output');

const btnCheckout = document.getElementById('btn-checkout');
const btnClear = document.getElementById('btn-clear');
const produceGrid = document.getElementById('produce-grid');
const toastAlert = document.getElementById('toast-alert');

const btnOpenShop = document.getElementById('btn-open-shop');
const btnCloseShop = document.getElementById('btn-close-shop');
const modalShop = document.getElementById('modal-shop');
const upgradesList = document.getElementById('upgrades-list');

// ===================================================================
// ÁUDIO SINTETIZADO
// ===================================================================
let audioCtx = null;
function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
}

function playPopSound() {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(840, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {}
}

function playKaChingSound() {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;

    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(987, now);
    osc1.frequency.setValueAtTime(1318, now + 0.08);

    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);
  } catch (e) {}
}

function playBlenderSound() {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(320, now + 0.6);
    osc.frequency.linearRampToValueAtTime(150, now + 1.2);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 1.2);
  } catch (e) {}
}

let toastTimer = null;
function showToast(msg) {
  if (toastTimer) clearTimeout(toastTimer);
  toastAlert.textContent = msg;
  toastAlert.classList.add('show');
  toastTimer = setTimeout(() => {
    toastAlert.classList.remove('show');
  }, 2400);
}

// ===================================================================
// APLICAR UPGRADES VISUAIS DA QUITANDA
// ===================================================================
function applyUpgrades() {
  const up = saveData.quitandaUpgrades;

  // 1. Toldo
  awning.className = 'awning ' + (up.awning !== 'default' ? up.awning : '');

  // 2. Luzinhas
  if (up.lights) fairyLights.classList.add('active');
  else fairyLights.classList.remove('active');

  // 3. Mascote
  if (up.mascot) mascotWrapper.classList.add('active');
  else mascotWrapper.classList.remove('active');

  // 4. Balança Dourada
  if (up.goldenScale) scaleBox.classList.add('scale-golden');
  else scaleBox.classList.remove('scale-golden');

  // 5. Liquidificador
  if (up.blender) blenderStation.classList.add('active');
  else blenderStation.classList.remove('active');

  // Placar
  statCoins.textContent = saveData.coins;
  statStars.textContent = saveData.stars;
}

// ===================================================================
// INICIALIZAR CAIXOTES DE FRUTAS
// ===================================================================
function renderProduceCrates() {
  produceGrid.innerHTML = '';
  produceDatabase.forEach(item => {
    const card = document.createElement('div');
    card.className = 'crate-card';
    card.id = `crate-${item.id}`;
    card.innerHTML = `
      <div class="crate-icon">
        <svg viewBox="0 0 100 100">${item.svg}</svg>
      </div>
      <span class="crate-name">${item.name}</span>
      <span class="crate-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
    `;

    card.onclick = () => {
      handleFruitTap(item.id);
    };

    produceGrid.appendChild(card);
  });
}

// ===================================================================
// SISTEMA DE PEDIDOS E CLIENTES (COM VITAMINAS SE DESBLOQUEADO)
// ===================================================================
function spawnNewCustomer() {
  const randomCustomer = customersDatabase[Math.floor(Math.random() * customersDatabase.length)];
  currentCustomer = randomCustomer;

  customerSvg.innerHTML = randomCustomer.svg;
  customerName.textContent = randomCustomer.name;

  // Decide se é pedido de vitamina/suco (se o liquidificador estiver desbloqueado)
  const canMakeJuice = saveData.quitandaUpgrades.blender;
  isJuiceOrder = canMakeJuice && (Math.random() > 0.5);

  currentOrder = [];

  if (isJuiceOrder) {
    bubbleGreeting.textContent = '🥤 Quero uma Vitamina Especial:';
    // Pede 2 frutas para bater a vitamina
    const f1 = produceDatabase[Math.floor(Math.random() * produceDatabase.length)];
    let f2 = produceDatabase[Math.floor(Math.random() * produceDatabase.length)];
    if (f1.id === f2.id) f2 = produceDatabase.find(f => f.id !== f1.id);

    currentOrder.push({ fruitId: f1.id, required: 1, current: 0 });
    currentOrder.push({ fruitId: f2.id, required: 1, current: 0 });
  } else {
    bubbleGreeting.textContent = randomCustomer.greeting;
    const availableFruits = [...produceDatabase];
    const orderCount = Math.random() > 0.4 ? 2 : 1;

    // Alta chance de pedir abacate
    if (Math.random() > 0.3) {
      currentOrder.push({
        fruitId: 'avocado',
        required: Math.floor(Math.random() * 2) + 1,
        current: 0
      });
    }

    while (currentOrder.length < orderCount) {
      const randFruit = availableFruits[Math.floor(Math.random() * availableFruits.length)];
      if (!currentOrder.some(o => o.fruitId === randFruit.id)) {
        currentOrder.push({
          fruitId: randFruit.id,
          required: Math.floor(Math.random() * 2) + 1,
          current: 0
        });
      }
    }
  }

  clearScale();
  clearBlender();
  renderOrderBubble();
  highlightOrderCrates();
}

function renderOrderBubble() {
  orderItemsContainer.innerHTML = '';
  currentOrder.forEach(order => {
    const fruitInfo = produceDatabase.find(f => f.id === order.fruitId);
    const isDone = order.current >= order.required;

    const tag = document.createElement('div');
    tag.className = `order-tag ${isDone ? 'completed' : ''}`;
    tag.innerHTML = `
      <div class="order-tag-icon">
        <svg viewBox="0 0 100 100">${fruitInfo.svg}</svg>
      </div>
      <span>${fruitInfo.name}: ${order.current}/${order.required} ${isDone ? '✅' : ''}</span>
    `;
    orderItemsContainer.appendChild(tag);
  });

  checkOrderStatus();
}

function highlightOrderCrates() {
  document.querySelectorAll('.crate-card').forEach(c => c.classList.remove('highlight'));
  currentOrder.forEach(order => {
    if (order.current < order.required) {
      const crate = document.getElementById(`crate-${order.fruitId}`);
      if (crate) crate.classList.add('highlight');
    }
  });
}

// ===================================================================
// COLOCAR FRUTA NA BALANÇA OU NO LIQUIDIFICADOR
// ===================================================================
function handleFruitTap(fruitId) {
  initAudio();
  playPopSound();

  if (isJuiceOrder && !juiceReady) {
    // Adiciona ao liquidificador
    blenderItems.push(fruitId);
    const fruit = produceDatabase.find(f => f.id === fruitId);

    const miniFruit = document.createElement('div');
    miniFruit.style.width = '14px';
    miniFruit.style.height = '14px';
    miniFruit.innerHTML = `<svg viewBox="0 0 100 100">${fruit.svg}</svg>`;
    blenderFruitsInside.appendChild(miniFruit);

    // Atualiza pedido
    const orderMatch = currentOrder.find(o => o.fruitId === fruitId);
    if (orderMatch && orderMatch.current < orderMatch.required) {
      orderMatch.current++;
    }

    renderOrderBubble();
    highlightOrderCrates();

    // Se colocou os 2 ingredientes, pisca botão de bater
    if (currentOrder.every(o => o.current >= o.required)) {
      showToast('Ingredientes prontos! Aperte BATER! 🌀');
    }
  } else {
    // Adiciona à balança normal
    scaleItems.push(fruitId);

    const orderMatch = currentOrder.find(o => o.fruitId === fruitId);
    if (orderMatch && orderMatch.current < orderMatch.required) {
      orderMatch.current++;
    }

    updateScaleDisplay();
    renderOrderBubble();
    highlightOrderCrates();
  }
}

// ===================================================================
// BATER O LIQUIDIFICADOR
// ===================================================================
btnBlend.addEventListener('click', () => {
  if (blenderItems.length === 0) {
    showToast('Coloque frutas dentro do liquidificador primeiro! 🍓');
    return;
  }

  initAudio();
  playBlenderSound();
  blenderBody.classList.add('shaking');

  setTimeout(() => {
    blenderBody.classList.remove('shaking');
    blenderFruitsInside.innerHTML = '';
    blenderSmoothie.classList.add('filled');

    // Gera copo pronto com canudo
    blenderOutput.innerHTML = `<div class="blender-cup" title="Vitamina Pronta!"></div>`;
    juiceReady = true;
    showToast('Vitamina pronta e deliciosa! 🥤');
    checkOrderStatus();
  }, 1200);
});

function clearBlender() {
  blenderItems = [];
  juiceReady = false;
  blenderFruitsInside.innerHTML = '';
  blenderSmoothie.classList.remove('filled');
  blenderOutput.innerHTML = '';
}

// ===================================================================
// ATUALIZAR BALANÇA
// ===================================================================
function updateScaleDisplay() {
  let totalWeight = 0;
  let totalPrice = 0;

  scaleFruitsTray.innerHTML = '';
  scaleItems.slice(-6).forEach(fId => {
    const fruit = produceDatabase.find(f => f.id === fId);
    if (fruit) {
      const miniSvg = document.createElement('div');
      miniSvg.className = 'scale-fruit-mini';
      miniSvg.innerHTML = `<svg viewBox="0 0 100 100">${fruit.svg}</svg>`;
      scaleFruitsTray.appendChild(miniSvg);
    }
  });

  scaleItems.forEach(fId => {
    const fruit = produceDatabase.find(f => f.id === fId);
    if (fruit) {
      totalWeight += fruit.weight;
      totalPrice += fruit.price;
    }
  });

  // Bônus se tiver a Balança Dourada
  if (saveData.quitandaUpgrades.goldenScale) {
    totalPrice *= 1.5;
  }

  scaleWeight.textContent = `${totalWeight.toFixed(2)} kg`;
  scalePrice.textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;

  checkOrderStatus();
}

function clearScale() {
  scaleItems = [];
  currentOrder.forEach(o => o.current = 0);
  updateScaleDisplay();
  renderOrderBubble();
  highlightOrderCrates();
}

function checkOrderStatus() {
  if (isJuiceOrder) {
    if (juiceReady) btnCheckout.classList.remove('disabled');
    else btnCheckout.classList.add('disabled');
  } else {
    const isOrderFulfilled = currentOrder.length > 0 && currentOrder.every(o => o.current >= o.required);
    const hasItemsOnScale = scaleItems.length > 0;
    if (isOrderFulfilled || hasItemsOnScale) btnCheckout.classList.remove('disabled');
    else btnCheckout.classList.add('disabled');
  }
}

// ===================================================================
// PASSAR NO CAIXA E GANHAR MOEDAS
// ===================================================================
btnCheckout.addEventListener('click', () => {
  if (btnCheckout.classList.contains('disabled')) {
    showToast('Complete o pedido ou pese as frutas primeiro!');
    return;
  }

  initAudio();
  playKaChingSound();

  let earnedCoins = 0;

  if (isJuiceOrder) {
    // Vitamina batida no liquidificador dá 25 a 35 moedas!
    earnedCoins = 30;
    saveData.stars += 1;
  } else {
    scaleItems.forEach(fId => {
      const fruit = produceDatabase.find(f => f.id === fId);
      if (fruit) earnedCoins += Math.round(fruit.price * 2);
    });

    const fulfilledOrder = currentOrder.every(o => o.current >= o.required);
    if (fulfilledOrder) {
      earnedCoins += 12;
      saveData.stars += 1;
    }

    if (saveData.quitandaUpgrades.goldenScale) {
      earnedCoins = Math.round(earnedCoins * 1.5);
    }
  }

  // Salva no LocalStorage compartilhado
  saveData.coins += earnedCoins;
  saveGameData(saveData);

  statCoins.textContent = saveData.coins;
  statStars.textContent = saveData.stars;

  bubbleGreeting.textContent = currentCustomer ? currentCustomer.thanks : 'Muito obrigado! ⭐';
  showToast(`Venda Realizada! +🪙 ${earnedCoins} Moedas!`);

  setTimeout(() => {
    spawnNewCustomer();
  }, 1600);
});

btnClear.addEventListener('click', () => {
  initAudio();
  playPopSound();
  clearScale();
  clearBlender();
  showToast('Balcão limpo! 🧺');
});

btnSound.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  btnSound.textContent = soundEnabled ? '🔊' : '🔇';
  showToast(soundEnabled ? 'Som Ativado 🔊' : 'Som Desativado 🔇');
  if (soundEnabled) playPopSound();
});

// ===================================================================
// MODAL: LOJA DE REFORMAS DA QUITANDA (UPGRADES)
// ===================================================================
btnOpenShop.addEventListener('click', () => {
  initAudio();
  playPopSound();
  renderUpgradesList();
  modalShop.classList.add('active');
});

btnCloseShop.addEventListener('click', () => {
  modalShop.classList.remove('active');
});

function renderUpgradesList() {
  upgradesList.innerHTML = '';
  const up = saveData.quitandaUpgrades;

  upgradesCatalog.forEach(item => {
    let isPurchased = false;
    if (item.id === 'awning-watermelon') isPurchased = (up.awning === 'awning-watermelon');
    else if (item.id === 'awning-golden') isPurchased = (up.awning === 'awning-golden');
    else isPurchased = !!up[item.id];

    const row = document.createElement('div');
    row.className = 'upgrade-item';
    row.innerHTML = `
      <div class="upgrade-info">
        <span class="upgrade-icon">${item.icon}</span>
        <div>
          <div class="upgrade-title">${item.title}</div>
          <div class="upgrade-desc">${item.desc}</div>
        </div>
      </div>
      <button class="btn-buy-upgrade ${isPurchased ? 'purchased' : ''}" id="buy-${item.id}">
        ${isPurchased ? 'Comprado ✅' : `Comprar 🪙 ${item.price}`}
      </button>
    `;

    const buyBtn = row.querySelector(`#buy-${item.id}`);
    if (!isPurchased) {
      buyBtn.onclick = () => {
        buyUpgrade(item);
      };
    }

    upgradesList.appendChild(row);
  });
}

function buyUpgrade(item) {
  if (saveData.coins < item.price) {
    showToast(`Moedas insuficientes! Você precisa de 🪙 ${item.price}`);
    return;
  }

  initAudio();
  playKaChingSound();

  saveData.coins -= item.price;

  if (item.id === 'awning-watermelon') saveData.quitandaUpgrades.awning = 'awning-watermelon';
  else if (item.id === 'awning-golden') saveData.quitandaUpgrades.awning = 'awning-golden';
  else saveData.quitandaUpgrades[item.id] = true;

  saveGameData(saveData);
  applyUpgrades();
  renderUpgradesList();

  showToast(`Parabéns! Você desbloqueou: ${item.title} ✨`);
}

// Inicialização
applyUpgrades();
renderProduceCrates();
spawnNewCustomer();
