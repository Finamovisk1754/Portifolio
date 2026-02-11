// script.js - Sistema principal + tradução SIMPLIFICADO

// ========== SISTEMA DE TRADUÇÃO ==========
let currentLang = 'pt';

// Função para traduzir toda a página (VERSÃO SIMPLIFICADA)
function translatePage(lang) {
    const t = translations[lang];
    
    console.log(`Iniciando tradução para: ${lang}`);
    
    // 1. Traduzir TODOS os elementos com data-key
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        const translation = t[key];
        
        if (translation) {
            element.textContent = translation;
            console.log(`✓ ${key}: "${translation.substring(0, 30)}..."`);
        } else {
            console.warn(`✗ Tradução não encontrada para: ${key}`);
        }
    });
    
    // 2. Atualizar botões ativos
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.getElementById(`lang-${lang}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // 3. Atualizar atributo lang do HTML
    document.documentElement.lang = lang;
    
    // 4. Salvar preferência
    localStorage.setItem('preferredLang', lang);
    currentLang = lang;
    
    console.log(`✅ Tradução para ${lang} concluída com sucesso!`);
}

// ========== EVENT LISTENERS PARA BOTÕES DE IDIOMA ==========
document.addEventListener('DOMContentLoaded', function() {
    // Configurar botões de idioma
    document.getElementById('lang-pt').addEventListener('click', () => {
        if (currentLang !== 'pt') {
            translatePage('pt');
        }
    });
    
    document.getElementById('lang-en').addEventListener('click', () => {
        if (currentLang !== 'en') {
            translatePage('en');
        }
    });
    
    // Verificar preferência salva ou idioma do navegador
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = navigator.language.startsWith('pt') ? 'pt' : 'en';
    
    if (savedLang && (savedLang === 'pt' || savedLang === 'en')) {
        translatePage(savedLang);
    } else if (browserLang === 'en') {
        translatePage('en');
    }
    
    // ========== NAVEGAÇÃO SUAVE ==========
    
    // 1. Navegação suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Adiciona classe ativa ao link do menu conforme scroll
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if(window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if(href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Adicionar classe ativa ao carregar a página
    function setActiveLinkOnLoad() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('nav a');
        
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            
            if (window.scrollY >= (sectionTop - 200)) {
                const currentId = section.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    
                    if (href === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
                break;
            }
        }
    }

    // Executar ao carregar a página
    setActiveLinkOnLoad();
    
    // 4. Efeito de hover nos cards de projeto
    const projetoCards = document.querySelectorAll('.projeto-card');
    projetoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // 5. Efeito de hover nos itens de tecnologia
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-3px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    // 6. Efeito de hover na foto de perfil
    const fotoPerfil = document.querySelector('.foto-perfil');
    if (fotoPerfil) {
        fotoPerfil.addEventListener('mouseenter', () => {
            fotoPerfil.style.transform = 'translateY(-5px)';
        });
        
        fotoPerfil.addEventListener('mouseleave', () => {
            fotoPerfil.style.transform = 'translateY(0)';
        });
    }
});

// Verificar se há traduções disponíveis
if (typeof translations === 'undefined') {
    console.error('❌ Arquivo translations.js não foi carregado. Certifique-se de que ele está incluído antes do script.js');
} else {
    console.log('✅ Traduções carregadas com sucesso!');
}
