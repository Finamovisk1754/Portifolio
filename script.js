// script.js - Sistema principal + tradução

// ========== SISTEMA DE TRADUÇÃO ==========
let currentLang = 'pt';

// Função para traduzir toda a página
function translatePage(lang) {
    const t = translations[lang];
    
    // 1. Traduzir menu
    document.querySelector('a[href="#sobre"]').textContent = t.menuSobre;
    document.querySelector('a[href="#stack"]').textContent = t.menuStack;
    document.querySelector('a[href="#experiencia"]').textContent = t.menuExperiencia;
    document.querySelector('a[href="#formacao"]').textContent = t.menuFormacao;
    document.querySelector('a[href="#certificacoes"]').textContent = t.menuCertificacoes;
    document.querySelector('a[href="#idiomas"]').textContent = t.menuIdiomas;
    document.querySelector('a[href="#projetos"]').textContent = t.menuProjetos;
    
    // 2. Traduzir títulos das seções
    document.querySelector('#sobre .section-title').textContent = t.sobreTitle;
    document.querySelector('#stack .section-title').textContent = t.stackTitle;
    document.querySelector('#experiencia .section-title').textContent = t.experienciaTitle;
    document.querySelector('#formacao .section-title').textContent = t.formacaoTitle;
    document.querySelector('#certificacoes .section-title').textContent = t.certificacoesTitle;
    document.querySelector('#idiomas .section-title').textContent = t.idiomasTitle;
    document.querySelector('#projetos .section-title').textContent = t.projetosTitle;
    
    // 3. Traduzir "Sobre Mim"
    document.querySelector('#sobre p').textContent = t.sobreTexto;
    
    // 4. Traduzir Experiências
    const expItems = document.querySelectorAll('.experiencia-item');
    if (expItems.length >= 2) {
        // Experiência 1
        expItems[0].querySelector('h2').textContent = t.exp1Cargo;
        expItems[0].querySelector('.exp-empresa').textContent = t.exp1Empresa;
        const exp1List = expItems[0].querySelectorAll('.exp-descricao li');
        t.exp1Desc.forEach((item, index) => {
            if (exp1List[index]) exp1List[index].textContent = item;
        });
        
        // Experiência 2
        expItems[1].querySelector('h2').textContent = t.exp2Cargo;
        expItems[1].querySelector('.exp-empresa').textContent = t.exp2Empresa;
        const exp2List = expItems[1].querySelectorAll('.exp-descricao li');
        t.exp2Desc.forEach((item, index) => {
            if (exp2List[index]) exp2List[index].textContent = item;
        });
        
        // Experiência 3 (se existir)
        if (expItems[2]) {
            expItems[2].querySelector('h2').textContent = t.exp3Cargo;
            expItems[2].querySelector('.exp-empresa').textContent = t.exp3Empresa;
            const exp3List = expItems[2].querySelectorAll('.exp-descricao li');
            if (t.exp3Desc) {
                t.exp3Desc.forEach((item, index) => {
                    if (exp3List[index]) exp3List[index].textContent = item;
                });
            }
        }
    }
    
    // 5. Traduzir Formação
    const formacao = document.querySelector('#formacao .experiencia-item');
    if (formacao) {
        formacao.querySelector('h2').textContent = t.formacaoCurso;
        formacao.querySelector('.exp-empresa').textContent = t.formacaoEmpresa;
        const formacaoList = formacao.querySelectorAll('.exp-descricao li');
        t.formacaoDesc.forEach((item, index) => {
            if (formacaoList[index]) formacaoList[index].textContent = item;
        });
    }
    
    // 6. Traduzir Idiomas
    const idiomaItems = document.querySelectorAll('.idioma-item');
    if (idiomaItems.length >= 2) {
        // Inglês
        idiomaItems[0].querySelector('h3').innerHTML = `<i class='bx bx-globe'></i> ${t.inglesTitulo}`;
        idiomaItems[0].querySelector('.idioma-nivel').textContent = t.inglesNivel;
        idiomaItems[0].querySelector('.idioma-descricao').textContent = t.inglesDesc;
        
        // Espanhol
        idiomaItems[1].querySelector('h3').innerHTML = `<i class='bx bx-globe'></i> ${t.espanholTitulo}`;
        idiomaItems[1].querySelector('.idioma-nivel').textContent = t.espanholNivel;
        idiomaItems[1].querySelector('.idioma-descricao').textContent = t.espanholDesc;
    }
    
    // 7. Traduzir Projetos
    const projetos = document.querySelectorAll('.projeto-card h3');
    const descProjetos = document.querySelectorAll('.projeto-card p');
    
    if (projetos.length >= 4) {
        projetos[0].textContent = t.projeto1Titulo;
        projetos[1].textContent = t.projeto2Titulo;
        projetos[2].textContent = t.projeto3Titulo;
        projetos[3].textContent = t.projeto4Titulo;
    }
    
    if (descProjetos.length >= 4) {
        descProjetos[0].textContent = t.projeto1Desc;
        descProjetos[1].textContent = t.projeto2Desc;
        descProjetos[2].textContent = t.projeto3Desc;
        descProjetos[3].textContent = t.projeto4Desc;
    }
    
    // 8. Atualizar botões ativos
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    // 9. Atualizar título da página
    document.title = `Portfolio | Matheus Finamor ${lang === 'en' ? '' : '| ' + lang.toUpperCase()}`;
    
    // Salvar preferência
    localStorage.setItem('preferredLang', lang);
    currentLang = lang;
}

// ========== EVENT LISTENERS PARA BOTÕES DE IDIOMA ==========
document.addEventListener('DOMContentLoaded', function() {
    // Configurar botões de idioma
    document.getElementById('lang-pt').addEventListener('click', () => {
        translatePage('pt');
    });
    
    document.getElementById('lang-en').addEventListener('click', () => {
        translatePage('en');
    });
    
    // Verificar preferência salva ou idioma do navegador
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = navigator.language.startsWith('pt') ? 'pt' : 'en';
    
    if (savedLang) {
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

// 7. Verificar se há traduções disponíveis
if (typeof translations === 'undefined') {
    console.warn('Arquivo translations.js não foi carregado. Certifique-se de que ele está incluído antes do script.js');
}

// 8. Função auxiliar para verificar se um elemento está visível na tela
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
    );
}

// 9. Animações ao scroll (opcional - adicione se quiser efeitos de entrada)
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.tech-item, .experiencia-item, .idioma-item, .projeto-card');
    
    function checkElements() {
        animatedElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configurar estado inicial
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Verificar ao carregar e ao scroll
    window.addEventListener('scroll', checkElements);
    checkElements(); // Verificar elementos visíveis na carga inicial
}

// Iniciar animações após o carregamento completo
window.addEventListener('load', initScrollAnimations);