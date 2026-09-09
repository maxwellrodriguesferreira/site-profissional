/**
 * Website Profissional - Maxwell Rodrigues Ferreira (Farmacêutico Freelancer)
 * Interações, Formulário WhatsApp e Utilitários de Interface
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollSpy();
});

/**
 * Menu Mobile Toggle
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

/**
 * Função para copiar texto para a área de transferência com feedback Toast
 * @param {string} text 
 * @param {string} message 
 */
function copiarTexto(text, message = 'Copiado para a área de transferência!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      mostrarToast(message);
    }).catch(() => {
      fallbackCopiarTexto(text, message);
    });
  } else {
    fallbackCopiarTexto(text, message);
  }
}

function fallbackCopiarTexto(text, message) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    mostrarToast(message);
  } catch (err) {
    console.error('Falha ao copiar:', err);
  }
  document.body.removeChild(textArea);
}

/**
 * Exibe notificação Toast flutuante
 * @param {string} message 
 */
function mostrarToast(message) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

/**
 * Envia o formulário direto para o WhatsApp com mensagem formatada
 * @param {Event} event 
 */
function enviarMensagemForm(event) {
  event.preventDefault();

  const tipoServico = document.getElementById('tipo-servico').value;
  const nomeEmpresa = document.getElementById('nome-empresa').value.trim();
  const cidadeLocal = document.getElementById('cidade-local').value.trim();
  const mensagemAdicional = document.getElementById('mensagem-adicional').value.trim();

  let mensagemWhatsApp = `Olá Maxwell! Me chamo *${nomeEmpresa}* (${cidadeLocal}).\n\n`;
  mensagemWhatsApp += `Gostaria de solicitar orçamento/disponibilidade para: *${tipoServico}*.\n`;

  if (mensagemAdicional) {
    mensagemWhatsApp += `\n*Detalhes adicionais:*\n${mensagemAdicional}\n`;
  }

  mensagemWhatsApp += `\n(Enviado através do site profissional)`;

  const urlEncoded = encodeURIComponent(mensagemWhatsApp);
  const whatsappUrl = `https://wa.me/5511990279590?text=${urlEncoded}`;

  window.open(whatsappUrl, '_blank');
}

/**
 * ScrollSpy para destacar o link de navegação conforme o scroll
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
