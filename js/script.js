// Menu Mobile Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Toggle do menu mobile
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Fechar menu ao clicar fora dele
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-toggle') && !e.target.closest('.nav-menu')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Atualizar ano no footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('#current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // Animação de scroll para elementos
    function checkScroll() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Verificar elementos ao carregar e ao scrollar
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // WhatsApp com mensagem personalizada
    function setupWhatsAppLinks() {
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
        
        whatsappLinks.forEach(link => {
            // Adicionar número padrão se não existir
            if (!link.href.includes('5511999999999')) {
                link.href = link.href.replace('5511999999999', '5511999999999');
            }
        });
    }
    
    setupWhatsAppLinks();
    
    // Contador de visitas simples (opcional)
    function updateVisitCounter() {
        let visits = localStorage.getItem('potsweetVisits');
        visits = visits ? parseInt(visits) + 1 : 1;
        localStorage.setItem('potsweetVisits', visits);
        
        // Pode ser usado para analytics simples
        console.log(`Visitas ao site: ${visits}`);
    }
    
    updateVisitCounter();
    
    // Efeito de digitação no título (opcional)
    function typeWriterEffect() {
        const heroTitle = document.querySelector('.hero-content h1');
        if (!heroTitle) return;
        
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        
    }
    
    // Loader de página (opcional)
    window.addEventListener('load', function() {
        const loader = document.createElement('div');
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bege-cremoso);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        loader.innerHTML = `
            <div style="text-align: center;">
                <div style="width: 50px; height: 50px; border: 5px solid var(--rosa-suave); border-top: 5px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
                <p style="margin-top: 20px; color: var(--marrom-chocolate); font-family: var(--fonte-titulos);">Carregando...</p>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
});

// Função para compartilhar no WhatsApp
function shareOnWhatsApp() {
    const text = 'Olha que delícia de bolos em pote que encontrei! 🍰 PotSweet Caseiro - Bolos artesanais com sabor caseiro.';
    const url = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    window.open(whatsappUrl, '_blank');
}

// Função para rastrear conversões (simples)
function trackConversion(action) {
    console.log(`Conversão: ${action} - ${new Date().toLocaleString()}`);
    
    // Aqui você pode integrar com Google Analytics ou Facebook Pixel
    // Exemplo: gtag('event', 'conversion', {'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL'});
}

// Event listeners para botões de pedido
document.addEventListener('DOMContentLoaded', function() {
    const orderButtons = document.querySelectorAll('.btn-primary, .btn-ifood');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList.contains('btn-ifood') ? 'iFood' : 'WhatsApp';
            trackConversion(`Pedido via ${platform}`);
        });
    });
});