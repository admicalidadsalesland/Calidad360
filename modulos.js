
    // ✅ Lógica del sidebar
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const toggleBtn = document.getElementById('toggleSidebar');

    function toggleSidebar() {
      if (window.innerWidth >= 768) {
        sidebar.classList.toggle('mini');
        mainContent.classList.toggle('ml-16');
        mainContent.classList.toggle('ml-64');
      } else {
        sidebar.classList.toggle('open');
      }
    }

    toggleBtn.addEventListener('click', toggleSidebar);







let scrollbarWidth = 0;

function getScrollbarWidth() {
  if (scrollbarWidth) return scrollbarWidth;
  const scrollDiv = document.createElement("div");
  scrollDiv.style.width = "100px";
  scrollDiv.style.height = "100px";
  scrollDiv.style.overflow = "scroll";
  scrollDiv.style.position = "absolute";
  scrollDiv.style.top = "-9999px";
  document.body.appendChild(scrollDiv);

  scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  const width = getScrollbarWidth();

  // Solo aplicar compensación si el body realmente tiene scroll vertical
  if (document.body.scrollHeight > window.innerHeight) {
    document.body.style.paddingRight = width + "px";
  }

  document.body.classList.add("overflow-hidden");
  modal.classList.remove("hidden");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  // Restaurar estado original
  document.body.style.paddingRight = "";
  document.body.classList.remove("overflow-hidden");

  modal.classList.add("hidden");
}




    // ✅ Carrusel corregido
    document.addEventListener('DOMContentLoaded', () => {
      let currentGroup = 0;
      const totalPlans = 6;
      const visible = 2;
      const totalGroups = Math.ceil(totalPlans / visible); // 3 grupos
      const carousel = document.getElementById('planes-carousel');
      const indicators = document.querySelectorAll('.indicator');

      function updateIndicators() {
        indicators.forEach((btn, i) => {
          if (i === currentGroup) {
            btn.classList.add('bg-blue-400');
            btn.classList.remove('bg-gray-300');
          } else {
            btn.classList.add('bg-gray-300');
            btn.classList.remove('bg-blue-400');
          }
        });
      }

      function goToNext() {
        currentGroup = (currentGroup + 1) % totalGroups;
        carousel.style.transform = `translateX(-${currentGroup * 100}%)`;
        updateIndicators();
      }

      function goToPrev() {
        currentGroup = (currentGroup - 1 + totalGroups) % totalGroups;
        carousel.style.transform = `translateX(-${currentGroup * 100}%)`;
        updateIndicators();
      }

      document.getElementById('next-plan').addEventListener('click', goToNext);
      document.getElementById('prev-plan').addEventListener('click', goToPrev);

      indicators.forEach((btn, i) => {
        btn.addEventListener('click', () => {
          if (i !== currentGroup) {
            currentGroup = i;
            carousel.style.transform = `translateX(-${currentGroup * 100}%)`;
            updateIndicators();
          }
        });
      });

      updateIndicators();
    });






    // Acordeón: Speech de Abordaje
document.getElementById('speech-toggle').addEventListener('click', function () {
  const content = document.getElementById('speech-content');
  const icon = document.getElementById('speech-icon');
  const isExpanded = content.classList.contains('hidden');

  // Alternar visibilidad
  content.classList.toggle('hidden');
  
  // Rotar ícono (flecha hacia arriba/abajo)
  if (isExpanded) {
    icon.style.transform = 'rotate(180deg)';
    this.setAttribute('aria-expanded', 'true');
  } else {
    icon.style.transform = 'rotate(0deg)';
    this.setAttribute('aria-expanded', 'false');
  }
});



   // Carrusel de Consejos

const slides = document.querySelectorAll("#consejos-carousel .consejo-slide");
const indicators = document.querySelectorAll("#consejos-carousel [data-slide]");
let currentSlide = 0;
let autoPlay;

function showSlide(index) {
  // Actualizar slides
  slides.forEach((slide, i) => {
    slide.classList.toggle("hidden", i !== index);
    slide.classList.toggle("opacity-0", i !== index);
    slide.classList.toggle("opacity-100", i === index);
  });

  // Actualizar indicadores
  indicators.forEach((btn, i) => {
    btn.classList.toggle("bg-blue-400", i === index);
    btn.classList.toggle("bg-gray-300", i !== index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function resetAutoPlay() {
  clearInterval(autoPlay);
  autoPlay = setInterval(nextSlide, 16000);
}



// Indicadores clickeables
indicators.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    currentSlide = i;
    showSlide(currentSlide);
    resetAutoPlay();
  });
});

// Pausar autoplay al hacer hover
const carousel = document.getElementById("consejos-carousel");
carousel.addEventListener("mouseenter", () => clearInterval(autoPlay));
carousel.addEventListener("mouseleave", () => {
  autoPlay = setInterval(nextSlide, 5000);
});

// Inicialización
showSlide(currentSlide);
autoPlay = setInterval(nextSlide, 5000);
