/* ===================== MENÚ RESPONSIVE ===================== */
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const links = navLinks.querySelectorAll("a");

// Indicar página activa en el menú
function setActivePage() {
    const currentPage = window.location.pathname.split("/").pop();
    links.forEach(link => {
        const linkPage = link.getAttribute("href");
        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    if (navLinks.classList.contains("active")) {
        menuBtn.innerHTML = "X";
        menuBtn.setAttribute("aria-expanded", "true");
    } else {
        menuBtn.innerHTML = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
    }
});

links.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.innerHTML = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
    });
});

// Filtrar productos por categoría
function filterProducts(category) {
    const products = document.querySelectorAll('.card');
    products.forEach(product => {
        if (category === 'all' || product.closest(`#${category}`)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Inicializar página activa al cargar
document.addEventListener('DOMContentLoaded', function() {
    setActivePage();
    
    // Configurar filtros de categoría si existen
    const categoryLinks = document.querySelectorAll('.menu-list a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('href').substring(1);
            filterProducts(category);
        });
    });
});

/* ===================== VALIDACIÓN FORMULARIO ===================== */
document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('register-form');
    
    if (registroForm) {
        const nombre = document.getElementById("name");
        const mail = document.getElementById("email");
        const clave1 = document.getElementById("password");
        const clave2 = document.getElementById("password2");
        const direccion = document.getElementById("address");
        const telefono = document.getElementById("phone");
        const errores = document.getElementById("errores");
        
        const set = new Set();
        
        function validarNombre() {
            if (nombre.value.trim().length < 3) {
                nombre.classList.add("error");
                set.add("<p>El nombre debe tener al menos 3 caracteres.</p>");
                return false;
            } else {
                nombre.classList.remove("error");
                set.delete("<p>El nombre debe tener al menos 3 caracteres.</p>");
                return true;
            }
        }
        
        function validarEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(mail.value)) {
                mail.classList.add("error");
                set.add("<p>Ingresa un email válido.</p>");
                return false;
            } else {
                mail.classList.remove("error");
                set.delete("<p>Ingresa un email válido.</p>");
                return true;
            }
        }
        
        function validarPassword() {
            if (clave1.value.length < 6) {
                clave1.classList.add("error");
                set.add("<p>La contraseña debe tener al menos 6 caracteres.</p>");
                return false;
            } else {
                clave1.classList.remove("error");
                set.delete("<p>La contraseña debe tener al menos 6 caracteres.</p>");
                return true;
            }
        }
        
        function validarPassword2() {
            if (clave1.value !== clave2.value) {
                clave2.classList.add("error");
                set.add("<p>Las contraseñas no coinciden.</p>");
                return false;
            } else {
                clave2.classList.remove("error");
                set.delete("<p>Las contraseñas no coinciden.</p>");
                return true;
            }
        }
        
        function validarDireccion() {
            if (direccion.value.trim().length < 5) {
                direccion.classList.add("error");
                set.add("<p>La dirección debe tener al menos 5 caracteres.</p>");
                return false;
            } else {
                direccion.classList.remove("error");
                set.delete("<p>La dirección debe tener al menos 5 caracteres.</p>");
                return true;
            }
        }
        
        function validarTelefono() {
            const phoneRegex = /^[0-9+]{8,15}$/;
            if (telefono.value && !phoneRegex.test(telefono.value.replace(/\s/g, ''))) {
                telefono.classList.add("error");
                set.add("<p>Ingresa un teléfono válido (8-15 dígitos).</p>");
                return false;
            } else {
                telefono.classList.remove("error");
                set.delete("<p>Ingresa un teléfono válido (8-15 dígitos).</p>");
                return true;
            }
        }
        
        nombre.addEventListener("blur", validarNombre);
        mail.addEventListener("blur", validarEmail);
        clave1.addEventListener("blur", validarPassword);
        clave2.addEventListener("blur", validarPassword2);
        direccion.addEventListener("blur", validarDireccion);
        telefono.addEventListener("blur", validarTelefono);
        
        registroForm.addEventListener("submit", (e) => {
            // Limpiar errores previos
            set.clear();
            if (errores) errores.innerHTML = "";
            
            // Validar todos los campos
            const val1 = validarNombre();
            const val2 = validarEmail();
            const val3 = validarPassword();
            const val4 = validarPassword2();
            const val5 = validarDireccion();
            const val6 = validarTelefono();
            
            // Si hay errores, prevenir envío y mostrarlos
            if (!val1 || !val2 || !val3 || !val4 || !val5 || !val6) {
                e.preventDefault();
                if (errores) {
                    set.forEach(msg => {
                        errores.innerHTML += msg;
                    });
                }
            } else {
                // Simular envío exitoso (en un caso real, se enviaría al servidor)
                alert("¡Registro exitoso! Serás redirigido a la página de inicio.");
                // window.location.href = "index.html"; // Descomentar en implementación real
            }
        });
    }
    
    // Validación formulario de contacto
    const contactoForm = document.getElementById('contact-form');
    if (contactoForm) {
        contactoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Mensaje enviado! Te contactaremos pronto.');
            this.reset();
        });
    }
});
/*carrousel*/ 
const slides = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let index = 0;
let interval;

// Función para mostrar slide
function showSlide(i) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[i].classList.add('active');
}

// Función siguiente
function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

// Función anterior
function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

// Eventos botones
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetInterval();
});
prevBtn.addEventListener('click', () => {
  prevSlide();
  resetInterval();
});

// Rotación automática cada 2 segundos
function startInterval() {
  interval = setInterval(nextSlide, 2500);
}
function resetInterval() {
  clearInterval(interval);
  startInterval();
}

// Iniciar
startInterval();
// Iniciar mostrando la primera slide
showSlide(index);
startInterval();
