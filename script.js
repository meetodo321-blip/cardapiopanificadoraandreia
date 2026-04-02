// Sidebar Elements
const hamburger = document.getElementById('hamburger');
const sidebarNav = document.getElementById('sidebarNav');
const sidebarFooter = document.getElementById('sidebarFooter');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    sidebarNav.classList.toggle('active');
    sidebarFooter.classList.toggle('active');
});

// Smooth Scroll for Nav Links
const navLinks = document.querySelectorAll('.nav-link, .h-nav-link, .btn-primary');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (!this.getAttribute('href').startsWith('#')) return; // ignora se não for âncora
        e.preventDefault();
        
        // Remove active class
        if (this.classList.contains('nav-link')) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        } else if (this.classList.contains('h-nav-link')) {
            document.querySelectorAll('.h-nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }

        // Close sidebar on mobile after clicking
        if (window.innerWidth < 992 && this.classList.contains('nav-link')) {
            hamburger.classList.remove('active');
            sidebarNav.classList.remove('active');
            sidebarFooter.classList.remove('active');
        }

        // Scroll to section with custom offset to handle sticky headers
        const targetId = this.getAttribute('href');
        if (targetId === '#topo') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = window.innerWidth < 992 ? 140 : 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Info Pill Dropdown
const infoPillBtn = document.getElementById('infoPillBtn');
const infoDropdown = document.getElementById('infoDropdown');

if(infoPillBtn) {
    infoPillBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Previne fechar imediatamente
        const isExpanded = infoPillBtn.getAttribute('aria-expanded') === 'true';
        
        infoPillBtn.setAttribute('aria-expanded', !isExpanded);
        infoDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!infoPillBtn.contains(e.target) && !infoDropdown.contains(e.target)) {
            infoPillBtn.setAttribute('aria-expanded', 'false');
            infoDropdown.classList.remove('show');
        }
    });
}

// ==========================================
// BANCO DE DADOS DE PRODUTOS E VARIAÇÕES
// ==========================================
const variationsDb = {
  "Coxinha, Quibe e Bolinhas": [
    { name: "Coxinha Comum", price: "95,00" },
    { name: "Coxinha c/ catupiry", price: "110,00" },
    { name: "Bolinha de presunto c/ mussarela", price: "95,00" },
    { name: "Bolinha de Bacalhau", price: "130,00" },
    { name: "Quibe", price: "95,00" }
  ],
  "Empadas Diversas": [
    { name: "Empada de queijo c/ brócolis", price: "105,00" },
    { name: "Empada de queijo", price: "105,00" },
    { name: "Empada de Frango", price: "105,00" },
    { name: "Empada de Palmito", price: "105,00" },
    { name: "Empada de Camarão", price: "150,00" }
  ],
  "Pastéis (Assados e Fritos)": [
    { name: "Pastel Frito Comum de Carne", price: "105,00" },
    { name: "Pastel Frito Comum (Queijo, Pizza, Frango)", price: "95,00" },
    { name: "Pastel Português (Carne)", price: "105,00" },
    { name: "Pastel Português (Milho)", price: "105,00" },
    { name: "Pastel Português (Palmito)", price: "105,00" },
    { name: "Pastel Assado (Frango)", price: "95,00" },
    { name: "Pastel Assado (Carne)", price: "95,00" },
    { name: "Pastel Assado (Milho c/ catupiry)", price: "105,00" },
    { name: "Pastel Assado (Palmito)", price: "105,00" },
    { name: "Cigarrete", price: "95,00" },
    { name: "Enrolado Presunto c/ Mussarela (Assado)", price: "95,00" },
    { name: "Empanado de Azeitona", price: "95,00" },
    { name: "Empanado de Frango", price: "150,00" },
    { name: "Empanado de Ovos", price: "95,00" }
  ],
  "Pães de Queijo e Mini Esfirras": [
    { name: "Pão de queijo", price: "95,00" },
    { name: "Mini esfirra (Carne e Frango)", price: "95,00" },
    { name: "Hot Dog Assado", price: "150,00" },
    { name: "Enrolado assado de salsicha", price: "95,00" },
    { name: "Mini pizza (Calab/Fran/Pres/Marg)", price: "2,00 / un" }
  ],
  "Croissants e Quiche": [
    { name: "Quiche Alho Poró", price: "150,00" },
    { name: "Croissant Abacaxi c/ peito de frango", price: "160,00" },
    { name: "Croissant Frango Crocante", price: "160,00" },
    { name: "Croissant Bacon c/ ameixa", price: "160,00" },
    { name: "Croissant Coco com Frutas", price: "160,00" },
    { name: "Croissant Chocolate c/ prestigio", price: "160,00" },
    { name: "Croissant Banana c/ canela", price: "160,00" },
    { name: "Croissant Ricota c/ tomate seco", price: "160,00" },
    { name: "Croissant Peito de peru com abacaxi", price: "160,00" },
    { name: "Croissant Damasco", price: "160,00" }
  ],
  "Canapés": [
    { name: "Canapé Ovos de codorna ao creme", price: "150,00" }
  ],
  "Tabuleiros de Bolo e Cake": [
    { name: "Tabuleiro de bolo (Comum, Coco, Laranja, etc)", price: "100,00" },
    { name: "Tabuleiro de Cake", price: "120,00" },
    { name: "(Sabores: Tapioca, Multicereais, Milho, Indiano, Braune, Chocolate, Tone, Cenoura, Banana c/ Granola, Pão de mel, Fubá, Laranja)", price: "-" }
  ],
  "Bolos Redondos": [
    { name: "Bolo de Cenoura c/ chocolate (Grande - 30 fatias)", price: "70,00" },
    { name: "Bolo de Cenoura c/ chocolate (Pequeno)", price: "25,00" },
    { name: "Bolo de Limão c/ mousse (Grande)", price: "70,00" },
    { name: "Bolo de Limão c/ mousse (Pequeno)", price: "25,00" },
    { name: "Bolo Comum (Unidade)", price: "8,50" },
    { name: "Bolo Cremoso (Unidade)", price: "12,00" }
  ],
  "Roscas e Brioches": [
    { name: "Rosca c/ frutas", price: "18,00" },
    { name: "Rosca c/ Abacaxi", price: "18,00" },
    { name: "Rosca c/ Coco", price: "18,00" },
    { name: "Rosca Salgada (Grande)", price: "60,00" },
    { name: "Rosca Salgada (Pequena)", price: "30,00" },
    { name: "Brioche", price: "25,00" }
  ],
  "Pães a Granel": [
    { name: "Mine Pão", price: "65,00 / cento" },
    { name: "Mini Pão Sírio", price: "85,00 / cento" },
    { name: "Pão de Ló", price: "80,00 / un" },
    { name: "Pão Francês 50g", price: "1,00 / un" },
    { name: "Pão doce 50g", price: "1,20 / un" },
    { name: "Pão de sal e doce com manteiga", price: "2,00 / un" },
    { name: "Pão c/ Presunto e Mussarela", price: "6,00 / un" },
    { name: "Pão c/ Mortadela Defumada", price: "5,00 / un" }
  ],
  "Frango e Palmito": [
    { name: "Torta de Frango Comum (16 fatias)", price: "95,00" },
    { name: "Torta de Frango Comum Brotinho (8 fatias)", price: "49,00" },
    { name: "Torta de Frango com Catupiry (Grande)", price: "105,00" },
    { name: "Torta de Frango com Catupiry (Brotinho)", price: "55,00" },
    { name: "Torta de Frango com Palmito (Grande)", price: "105,00" },
    { name: "Torta de Frango com Palmito (Brotinho)", price: "55,00" },
    { name: "Torta de Palmito c/ molho branco (Grande)", price: "105,00" },
    { name: "Torta de Palmito c/ molho branco (Brotinho)", price: "55,00" }
  ],
  "Bacalhau ou Camarão": [
    { name: "Torta de Camarão (Grande)", price: "250,00" },
    { name: "Torta de Camarão (Brotinho)", price: "130,00" },
    { name: "Torta de Bacalhau (Grande)", price: "200,00" },
    { name: "Torta de Bacalhau (Brotinho)", price: "105,00" }
  ],
  "Torta Frango Pão de Forma": [
    { name: "Torta Frango (Tamanho G - 20 Pessoas 35x30)", price: "160,00" },
    { name: "Torta Frango (Tamanho M - 12 Pessoas 30x25)", price: "120,00" },
    { name: "Torta Frango (Tamanho P - 8 Pessoas 25x20)", price: "80,00" },
    { name: "Torta de Legumes (Unidade)", price: "100,00" }
  ],
  "Tamanhos Pequenos": [
    { name: "SABORES: Sonho de valsa, Chocolate c/ coco, Abacaxi, Coco, Morango, Maracujá, Ninho, Limão.", price: "-" },
    { name: "Tamanho PPP (6 pessoas - 20 cm)", price: "95,00" },
    { name: "Tamanho PP (10 pessoas - 25 cm)", price: "120,00" },
    { name: "*Valor fixo por tamanho, independente do sabor escolhido.*", price: "-" }
  ],
  "Médias e Grandes": [
    { name: "SABORES: Sonho de valsa, Chocolate c/ coco, Abacaxi, Coco, Morango, Maracujá, Ninho, Limão.", price: "-" },
    { name: "Tamanho Pequeno (20 pessoas - 30 cm)", price: "160,00" },
    { name: "Tamanho Médio (30 pessoas - 35 cm)", price: "195,00" },
    { name: "Tamanho Grande (50 pessoas - 30x40)", price: "280,00" },
    { name: "Tamanho Extra Grande (80 pessoas)", price: "330,00" },
    { name: "Tamanho GGG (150 pessoas - 40x65)", price: "550,00" },
    { name: "*Valor fixo por tamanho, independente do sabor escolhido.*", price: "-" }
  ],
  "Sabores Especiais": [
    { name: "--- NOZES ---", price: "-" },
    { name: "PPP: 120,00 / PP: 160,00 / Peq: 195,00", price: "-" },
    { name: "Méd: 280,00 / Grad: 330,00 / Extra G: 550,00", price: "-" },
    { name: "--- KIT KAT ---", price: "-" },
    { name: "Pequena: 220,00 / Médio: 295,00 / Grande: 380,00", price: "-" },
    { name: "Extra Grande: 550,00 / GGG: 800,00", price: "-" },
    { name: "--- TRONCO PRESTIGIO ---", price: "-" },
    { name: "Peq: 150,00 / Méd: 180,00 / Grad: 300,00", price: "-" },
    { name: "--- MORANGO COM SUSPIRO ---", price: "-" },
    { name: "PPP: 120,00 / PP: 160,00 / Peq: 195,00", price: "-" },
    { name: "Méd: 280,00 / Grad: 330,00 / Extra G: 550,00", price: "-" },
    { name: "--- ROCAMBOLE (60 CM) ---", price: "-" },
    { name: "Unidade", price: "85,00" }
  ],
  "Doces Tradicionais": [
    { name: "Brigadeiro", price: "145,00" },
    { name: "Olho de sogra", price: "145,00" },
    { name: "Cajuzinho", price: "145,00" },
    { name: "Chapéu de Napoleão", price: "145,00" },
    { name: "Moranguinho", price: "145,00" },
    { name: "Palha Italiana", price: "145,00" },
    { name: "Coco (Cocadinha)", price: "145,00" },
    { name: "Beijinho (Ninho, Coco)", price: "145,00" }
  ],
  "Bombons e Especiais": [
    { name: "Quindim (O Cento)", price: "180,00" },
    { name: "Bombom Brigadeiro (O Cento)", price: "220,00" },
    { name: "Bombom Abacaxi (O Cento)", price: "250,00" },
    { name: "Bombom Uva (O Cento)", price: "250,00" },
    { name: "Bombom Coco (O Cento)", price: "220,00" },
    { name: "Bombom Nozes (O Cento)", price: "250,00" }
  ],
  "Bombom Morango Inteiro": [
    { name: "Bombom Morango (Inteiro fresco - O Cento)", price: "600,00" },
    { name: "Cup Cake Grande (Unidade)", price: "7,00" }
  ],
  "Baguetes (16 pedaços)": [
    { name: "Baguete Tradicional", price: "65,00" },
    { name: "Baguete Italiana (Salaminho, provolone...)", price: "70,00" },
    { name: "Baguete Recheada Light (Peito Peru, Branco...)", price: "70,00" },
    { name: "Baguete c/ Calabresa (Mussarela, Requeijão)", price: "70,00" }
  ],
  "Mini Sanduíches": [
    { name: "Mini Sanduíche Especial (Pão caseiro c/ patê)", price: "4,00 / un" },
    { name: "Pão Sírio Recheado (Queijo, peito de peru...)", price: "4,00 / un" },
    { name: "Mine Sanduíche Comum", price: "4,00 / un" },
    { name: "Mine Hamburguer", price: "5,00 / un" },
    { name: "Mine Cachorro Quente", price: "3,50 / un" },
    { name: "Cachorro Quente Grande", price: "6,50 / un" },
    { name: "Sanduíche Natural Grande", price: "9,50 / un" },
    { name: "Sanduíche Marroquino", price: "15,00 / un" }
  ],
  "Tábuas Frios/Frutas": [
    { name: "Tábua de Frios (15 Pessoas, aprox 1kg)", price: "200,00" },
    { name: "Tábua de Frutas Mistas", price: "250,00" }
  ],
  "Kits Lanche (Opções 1 a 7)": [
    { name: "1ª Opção: 5 mini salgados, 1 suco natural 200ml, 1 saquinho castanha do Pará, 1 pote salada de fruta P, 1 mini sanduíche, 1 mini pão sírio. (Colher individual/guardanapo)", price: "37,00" },
    { name: "2ª Opção: 5 mini salgados, 1 suco natural 200ml, 1 pote salada de fruta, 1 mini sanduíche, 1 mini pão sírio. (Colher/guardanapo)", price: "31,00" },
    { name: "3ª Opção: 5 mini salgados, 1 fatia bolo molhado de coco, 1 suco caixinha 200ml, 1 pote salada de fruta, 1 mini sanduíche. (Colher/guardanapo)", price: "26,00" },
    { name: "4ª Opção: 5 mini salgados, 1 bolo no pote molhado P, 1 mini coca 200ml, 1 trufa de chocolate. (Colher/guardanapo)", price: "18,50" },
    { name: "5ª Opção (Sand. Grande): 1 Sanduíche grande de patê especial, 1 fruta embalada ind., 1 suco 200ml. (Guardanapo)", price: "22,00" },
    { name: "6ª Opção (Sand. Grande): 1 Sanduíche grande de patê especial, 1 fruta embalada ind., 1 suco 200ml, 1 barra de cereais, 1 chicletes. (Guardanapo)", price: "25,00" },
    { name: "7ª Opção (Sand. Grande): 1 Sanduíche grande de patê especial, 1 fruta enc., 1 suco 200ml, 1 bombom, 1 barra cereais, 1 chicletes. (Guardanapo)", price: "27,00" }
  ],
  "Combos Coffee Break": [
    { name: "Coffee Break p/ 6 Pess. (6 sand, 50 salg, 1 suco 1L, 1 refri 2L, Descartáveis, Frete)", price: "140,00" },
    { name: "Coffee Break p/ 10 Pess. (10 sand, 100 salg, 2 sucos 1L, 1 refri 2L, Descart, Frete)", price: "220,00" },
    { name: "Coffee Break p/ 15 Pess. (15 sand, 110 salg, 2 sucos 1L, 2 refris 2L, Descart, Frete)", price: "270,00" },
    { name: "Coffee Break p/ 20 Pess. (20 sand, 140 salg, 3 sucos 1L, 2 refris 2L, Descart, Frete)", price: "320,00" },
    { name: "Coffee Break p/ 25 Pess. (25 sand, 170 salg, 4 sucos 1L, 3 refris 2L, Descart, Frete)", price: "390,00" },
    { name: "Coffee Break p/ 30 Pess. (30 sand, 200 salg, 4 sucos 1L, 4 refris 2L, Descart, Frete)", price: "450,00" },
    { name: "Coffee Break p/ 35 Pess. (35 sand, 230 salg, 6 sucos 1L, 4 refris 2L, Descart, Frete)", price: "520,00" },
    { name: "Coffee Break p/ 40 Pess. (40 sand, 280 salg, 6 sucos 1L, 5 refris 2L, Descart, Frete)", price: "590,00" },
    { name: "Coffee Break p/ 45 Pess. (45 sand, 300 salg, 6 sucos 1L, 6 refris 2L, Descart, Frete)", price: "650,00" },
    { name: "Coffee Break p/ 50 Pess. (50 sand, 320 salg, 8 sucos 1L, 6 refris 2L, Descart, Frete)", price: "720,00" }
  ],
  "Itens Avulsos Coffee Break": [
    { name: "Salada de fruta (Pote Peq)", price: "8,00" },
    { name: "Salada de fruta (Pote Grande)", price: "15,00" },
    { name: "Espeto de frutas Grande", price: "20,00" },
    { name: "Frutas Picadas (Pote Grande)", price: "20,00" },
    { name: "Bolo redondo gde (Cenoura c/ calda ou Limão c/ mousse)", price: "70,00 / un" },
    { name: "Garrafa de café (Incluso aluguel e frete de recolha)", price: "100,00" }
  ],
  "Kit Festa (Empresa)": [
    { name: "Kit 1 (25 Pessoas): 175 salgados trad, 1 Bolo Peq (30cm), 4 refris 2L", price: "385,25" },
    { name: "Kit 2 (35 Pessoas): 250 salgados trad, 1 Bolo Méd (35cm), 6 refris 2L", price: "523,50" },
    { name: "Kit 3 (50 Pessoas): 350 salgados trad, 1 Bolo Grande (40x30cm), 8 refris 2L", price: "735,50" }
  ],
  "Kit Festa Infantil": [
    { name: "Kit 1 (20 Crianças): 100 salgados trad, 50 Doces, 1 Bolo PP (25cm), 2 refris 2L", price: "317,00" },
    { name: "Kit 2 (30 Crianças): 150 salgados trad, 80 Doces, 1 Bolo P (30cm), 4 refris 2L", price: "477,50" },
    { name: "Kit 3 (40 Crianças): 200 salgados trad, 100 Doces, 1 Bolo M (35cm), 5 refris 2L", price: "607,50" }
  ],
  "Festa na Caixa": [
    { name: "P/ 5 pessoas: 1 Bolo PPP, 40 salgados trads ou Especiais, 20 Docinhos", price: "180,00" },
    { name: "P/ 5 pessoas + Acréscimo de 5 Coca-Cola Lata 350ml", price: "200,00" }
  ],
  "Alho, Ervas ou Azeitona": [
    { name: "Patê de Alho", price: "45,00 / Kg" },
    { name: "Patê de Ervas Finas", price: "45,00 / Kg" },
    { name: "Patê de Azeitona", price: "45,00 / Kg" }
  ],
  "Frango e Presuntos": [
    { name: "Patê de Presunto", price: "50,00 / Kg" },
    { name: "Patê de Presunto c/ Azeitona", price: "60,00 / Kg" },
    { name: "Patê de Bacon", price: "50,00 / Kg" },
    { name: "Patê de Calabresa", price: "50,00 / Kg" },
    { name: "Patê de Frango", price: "60,00 / Kg" },
    { name: "Patê de Frango c/ Abacaxi", price: "60,00 / Kg" }
  ],
  "Queijos e Premium": [
    { name: "Patê de Parmesão", price: "50,00 / Kg" },
    { name: "Patê de Provolone", price: "50,00 / Kg" },
    { name: "Patê de Atum c/ Ricota", price: "70,00 / Kg" },
    { name: "Patê Peito de Peru Defumado", price: "70,00 / Kg" },
    { name: "Patê de Salaminho", price: "90,00 / Kg" }
  ],
  "Refrigerantes 2 Litros": [
    { name: "Coca Cola", price: "14,00" },
    { name: "Fanta", price: "13,00" },
    { name: "Sprite", price: "13,00" },
    { name: "Guaraná", price: "13,00" },
    { name: "Mate Couro", price: "13,00" }
  ],
  "Sucos e Copos 100u": [
    { name: "Sucos de 1 litro Tial", price: "8,50 / cada" },
    { name: "Sucos de 1 litro Valle", price: "10,50 / cada" },
    { name: "Garrafa de café 2 litros (valor incluído o aluguel)", price: "100,00" },
    { name: "Garrafa de 7 L", price: "250,00" },
    { name: "Salada de Frutas Grande", price: "15,00 / pote" },
    { name: "Salada de Frutas Pequena", price: "8,00 / pote" },
    { name: "Vela de aniversário", price: "4,50" },
    { name: "Copo descartáveis 300 ml", price: "9,50" },
    { name: "Copo descartáveis 200 ml", price: "7,50" },
    { name: "Guardanapo (50 un)", price: "3,50" },
    { name: "Pratinho 15 cm (10 un)", price: "2,50" },
    { name: "Colher (50 un)", price: "7,00" },
    { name: "Garfo (50 un)", price: "7,00" },
    { name: "Faca (50 un)", price: "7,00" }
  ],
  "Pizza Gigante": [
    { name: "Pizza Gigante à moda da casa", price: "49,90" },
    { name: "Pizza Gigante de Frango com Catupiry", price: "59,90" }
  ],
  "Biscoitos e Rabanada": [
    { name: "Biscoito doce com canela", price: "50,00 / Kg" },
    { name: "Biscoito de polvilho sal", price: "50,00 / Kg" },
    { name: "Rabanada", price: "40,00 / Kg" }
  ],
  "Carolina de Limão": [
    { name: "Carolina de Limão (por cento)", price: "180,00" }
  ]
};

// ==========================================
// LÓGICA DO MODAL
// ==========================================
const productCards = document.querySelectorAll('.product-card');
const modalOverlay = document.getElementById('productModal');
const closeModalBtn = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalObs = document.getElementById('modalObs');
const modalVariations = document.getElementById('modalVariations');

productCards.forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('.product-title').textContent.trim();
        
        // Verifica se tem variações no BD
        const vars = variationsDb[title];
        
        if(vars && Array.isArray(vars)) {
            // Preenche os detalhes
            modalTitle.textContent = title;
            const desc = this.querySelector('.product-desc');
            modalObs.textContent = desc && desc.textContent.trim().length > 1 && desc.textContent != "." ? desc.textContent : 'Veja todas as variações descritas na lista e seus valores:';
            
            modalVariations.innerHTML = '';
            vars.forEach(v => {
                const li = document.createElement('li');
                li.innerHTML = `<span class="var-name">${v.name}</span><span class="var-price">${v.price != '-' ? 'R$ ' + v.price : ''}</span>`;
                modalVariations.appendChild(li);
            });
            
            // Exibe o Modal
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Tranca a rolagem no mobile
        } else {
            // Caso cliquem em um card sem mapeamento 
            modalTitle.textContent = title;
            modalObs.textContent = "Opção Específica";
            
            const priceEl = this.querySelector('.product-price');
            const pText = priceEl ? priceEl.textContent.trim() : "Sob Consulta";
            
            modalVariations.innerHTML = `<li><span class="var-name">${title}</span><span class="var-price">R$ ${pText}</span></li>`;
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        // Efeito visual no card ao clicar
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

function fecharModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Destranca a rolagem
}

if(closeModalBtn) {
    closeModalBtn.addEventListener('click', fecharModal);
}
if(modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        // Fechar ao clicar fora do conteudo
        if(e.target === modalOverlay) fecharModal();
    });
}
