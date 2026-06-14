/**
 * GRAJAL FELINO - LÓGICA DE LA APLICACIÓN WEB
 * Control de la barra de navegación, interactividad y formularios
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCopyClipboard();
  initContactForm();
  
  // Inicializar iconos de Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

/**
 * 1. Control del Menú de Navegación Móvil y Scroll
 */
function initNavbar() {
  const header = document.querySelector('.header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  // Cambiar estilo del navbar al hacer scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Toggle menú móvil
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      
      // Cambiar icono del toggle (de hamburguesa a X)
      const isOpen = navMenu.classList.contains('open');
      navToggle.innerHTML = isOpen 
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' 
        : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
      });
    });
  }
}

/**
 * 2. Funcionalidad de Copiar al Portapapeles (IBAN, Bizum)
 */
function initCopyClipboard() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-copy');
      const textElement = document.getElementById(targetId);
      
      if (textElement) {
        const textToCopy = textElement.textContent.trim().replace(/\s/g, ''); // Eliminar espacios
        
        try {
          await navigator.clipboard.writeText(textToCopy);
          
          // Cambiar el icono temporalmente para dar feedback visual
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3E8E75" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
          btn.style.transform = 'scale(1.2)';
          
          // Crear un tooltip flotante
          const tooltip = document.createElement('span');
          tooltip.textContent = '¡Copiado!';
          tooltip.style.position = 'absolute';
          tooltip.style.backgroundColor = '#2C3531';
          tooltip.style.color = '#FFFFFF';
          tooltip.style.padding = '4px 8px';
          tooltip.style.borderRadius = '4px';
          tooltip.style.fontSize = '11px';
          tooltip.style.fontWeight = 'bold';
          tooltip.style.pointerEvents = 'none';
          tooltip.style.zIndex = '1000';
          
          // Posicionar tooltip
          const rect = btn.getBoundingClientRect();
          tooltip.style.top = `${rect.top + window.scrollY - 30}px`;
          tooltip.style.left = `${rect.left + window.scrollX - 15}px`;
          document.body.appendChild(tooltip);

          // Limpiar feedback después de 1.5s
          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.transform = 'none';
            tooltip.remove();
          }, 1500);
          
        } catch (err) {
          console.error('Error al copiar al portapapeles: ', err);
        }
      }
    });
  });
}

/**
 * 3. Formulario de Contacto Interactivo
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Obtener datos
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Validación básica
      if (!name || !email || !subject || !message) {
        showStatus('Por favor, rellena todos los campos obligatorios.', 'error');
        return;
      }
      
      // Feedback de carga
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<svg class="spinner" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg> Enviando...';

      // Enviar datos vía AJAX a FormSubmit
      try {
        const response = await fetch('https://formsubmit.co/ajax/grajalfelino@hotmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            Nombre: name,
            Email: email,
            Asunto: subject,
            Mensaje: message,
            _subject: `Contacto Web: ${subject}`
          })
        });

        if (response.ok) {
          showStatus('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo lo antes posible.', 'success');
          contactForm.reset();
        } else {
          showStatus('Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.', 'error');
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        showStatus('Error de conexión. Por favor, comprueba tu red e inténtalo de nuevo.', 'error');
      } finally {
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    
    // Auto ocultar después de 6 segundos
    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 6000);
  }
}

// Estilos de animación para el spinner (inyectados si no están en el CSS)
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
