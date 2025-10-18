
  // === FUNCIONES DE MODAL ===
  function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
  }
  function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
  }
  // === CARRUSEL SUPERIOR (banners) ===
  document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#carouselTop');
    const banners = root.querySelectorAll('.carousel-top-slide');
    const indicators = document.querySelectorAll('.indicator-top');
    let currentIndex = 0;
    function showBanner(index) {
      banners.forEach((banner, i) => {
        banner.classList.toggle('opacity-100', i === index);
        banner.classList.toggle('opacity-0', i !== index);
      });
      indicators.forEach((dot, i) => {
        dot.classList.toggle('bg-white/60', i === index);
        dot.classList.toggle('bg-white/30', i !== index);
      });
      currentIndex = index;
    }
    indicators.forEach((dot, i) => {
      dot.addEventListener('click', () => showBanner(i));
    });
    setInterval(() => {
      const newIndex = (currentIndex + 1) % banners.length;
      showBanner(newIndex);
    }, 20000);
  });
  // === CARRUSEL DE PLANES ===
  document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('planes-carousel');
    const prevBtn = document.getElementById('prev-plan');
    const nextBtn = document.getElementById('next-plan');
    const indicators = document.querySelectorAll('.indicator');
    const totalPlans = 9;
    const plansPerGroup = 3;
    const totalGroups = Math.ceil(totalPlans / plansPerGroup);
    let currentGroup = 0;
    function updateCarousel() {
      const translateX = -currentGroup * 100;
      carousel.style.transform = `translateX(${translateX}%)`;
      indicators.forEach((indicator, index) => {
        if (index === currentGroup) {
          indicator.classList.add('bg-blue-500');
          indicator.classList.remove('bg-gray-300');
        } else {
          indicator.classList.add('bg-gray-300');
          indicator.classList.remove('bg-blue-500');
        }
      });
    }
    prevBtn.addEventListener('click', () => {
      if (currentGroup > 0) {
        currentGroup--;
        updateCarousel();
      }
    });
    nextBtn.addEventListener('click', () => {
      if (currentGroup < totalGroups - 1) {
        currentGroup++;
        updateCarousel();
      }
    });
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        currentGroup = index;
        updateCarousel();
      });
    });
    updateCarousel();
  });

  // === CARRUSEL 3D DE EQUIPOS (¡AGREGADO!) ===
  document.addEventListener('DOMContentLoaded', () => {
    const totalItems = 6;
    const radius = 530;
    let currentAngle = 0;
    let autoRotate = true;
    let autoRotateInterval;
    // URLs corregidas (sin espacios)
    const slides = [
      { img: 'https://raw.githubusercontent.com/gporrast20/imagenes/refs/heads/main/BLADE%20A56%20PRO.png', title: 'ZTE BLADE A56 PRO', subtitle: 'ZTE BLADE A56 PRO DORADO 128GB' },
      { img: 'https://raw.githubusercontent.com/gporrast20/imagenes/refs/heads/main/GALAXY%20A07.png', title: 'SAMSUNG GXY A07', subtitle: 'SAMSUNG GXY A07 SM-A075M 128GB' },
      { img: 'https://raw.githubusercontent.com/gporrast20/imagenes/refs/heads/main/GALAXY%20A16.png', title: 'SAMSUNG GXY A16', subtitle: 'SAMSUNG GXY A16 SM-A165M 128GB LTE' },
      { img: 'https://raw.githubusercontent.com/gporrast20/imagenes/refs/heads/main/GALAXY%20A26.png', title: 'SAMSUNG GXY A26', subtitle: 'SAMSUNG GXY A26 SM-A266M 128GB 5G' },
      { img: 'https://raw.githubusercontent.com/gporrast20/imagenes/refs/heads/main/HONOR%20X5B.png', title: 'HONOR X5B', subtitle: 'HONOR X5B GFY-LX3 128GB' },
      { img: 'https://raw.githubusercontent.com/gporrast20/imagenes/refs/heads/main/HONOR%20X7C.png', title: 'HONOR X7C', subtitle: 'HONOR X7C ALT-LX3 256GB' },
      { img: 'https://raw.githubusercontent.com/gporrast20/imagenes/refs/heads/main/REDMI%20A5.png', title: 'REDMI A5', subtitle: 'XIAOMI REDMI A5 64GB' },
      { img: 'https://raw.githubusercontent.com/gporrast20/imagenes/refs/heads/main/REDMI%20NOTE%2014%20PRO.png', title: 'REDMI NOTE 14 PRO', subtitle: 'XIAOMI REDMI NOTE 14 PRO 256GB' },
      { img: 'https://raw.githubusercontent.com/gporrast20/imagenes/refs/heads/main/REDMI%20NOTE%2014.png', title: 'REDMI NOTE 14', subtitle: 'XIAOMI REDMI NOTE 14 LTE 256GB' },
      { img: 'https://raw.githubusercontent.com/gporrast20/imagenes/refs/heads/main/REDMI15C_01.png', title: 'REDMI 15C', subtitle: 'XIAOMI REDMI 15C 256GB' }
    ];
    const track = document.getElementById('carouselTrack');
    const clickWrapper = document.getElementById('clickWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalClose = document.getElementById('modalClose');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    let carouselItems = [];
    // Crear elementos del carrusel
    for (let i = 0; i < totalItems; i++) {
      const slide = slides[i];
      const item = document.createElement('div');
      item.className = 'carousel-item';
      item.innerHTML = `
        <img src="${slide.img}" alt="${slide.title}">
        <div class="caption">
          <h3>${slide.title}</h3>
          <p>${slide.subtitle}</p>
        </div>
      `;
      track.appendChild(item);
      carouselItems.push({ element: item, slide });
    }
    function normalizeAngle(angle) {
      angle = angle % 360;
      if (angle < 0) angle += 360;
      return angle;
    }
    function updateFrontItem() {
      let closestIndex = 0;
      let minDiff = Infinity;
      for (let i = 0; i < totalItems; i++) {
        const itemAngle = normalizeAngle((i / totalItems) * 360 - currentAngle);
        let diff = Math.min(Math.abs(itemAngle), Math.abs(itemAngle - 360));
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = i;
        }
      }
      carouselItems.forEach(item => item.element.classList.remove('is-front'));
      carouselItems[closestIndex].element.classList.add('is-front');
    }
    function updatePositions() {
      for (let i = 0; i < totalItems; i++) {
        const angle = (i / totalItems) * 360 - currentAngle;
        const rad = (angle * Math.PI) / 180;
        const x = radius * Math.sin(rad);
        const z = -radius * Math.cos(rad);
        const item = carouselItems[i].element;
        item.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${-angle}deg)`;
        item.style.zIndex = Math.round(z + radius);
      }
      updateFrontItem();
    }
    function rotateCarouselTo(index) {
      currentAngle = index * (360 / totalItems);
      updatePositions();
    }
    // 🔍 Búsqueda
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      searchResults.innerHTML = '';
      if (!query) {
        searchResults.classList.add('hidden');
        return;
      }
      const filtered = slides.filter(slide =>
        slide.title.toLowerCase().includes(query) || slide.subtitle.toLowerCase().includes(query)
      );
      if (filtered.length > 0) {
        searchResults.classList.remove('hidden');
        filtered.forEach(result => {
          const li = document.createElement('li');
          li.textContent = `${result.title} — ${result.subtitle}`;
          li.className = 'px-4 py-2.5 text-sm border-b border-gray-700 last:border-b-0 cursor-pointer';
          li.onclick = () => {
            const index = slides.findIndex(s => s.title === result.title);
            rotateCarouselTo(index);
            autoRotate = false;
            playPauseBtn.textContent = 'Reanudar';
            searchResults.classList.add('hidden');
            searchInput.value = '';
          };
          searchResults.appendChild(li);
        });
      } else {
        searchResults.classList.add('hidden');
      }
    });
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.add('hidden');
      }
    });
    // Abrir modal al hacer clic en el carrusel
    clickWrapper.addEventListener('click', (e) => {
      if (e.target.closest('button')) return;
      const frontItem = track.querySelector('.carousel-item.is-front');
      if (!frontItem) return;
      const index = Array.from(track.children).indexOf(frontItem);
      const slide = carouselItems[index].slide;
      modalImg.src = slide.img;
      modalTitle.textContent = slide.title;
      modalSubtitle.textContent = slide.subtitle;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    function rotateCarousel(direction) {
      currentAngle += direction * (360 / totalItems);
      updatePositions();
    }
    function startAutoRotate() {
      autoRotateInterval = setInterval(() => {
        if (autoRotate) rotateCarousel(-1);
      }, 4500);
    }
    function toggleAutoRotate() {
      autoRotate = !autoRotate;
      playPauseBtn.textContent = autoRotate ? 'Pausar' : 'Reanudar';
    }
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    nextBtn.addEventListener('click', () => rotateCarousel(-1));
    prevBtn.addEventListener('click', () => rotateCarousel(1));
    playPauseBtn.addEventListener('click', toggleAutoRotate);
    updatePositions();
    startAutoRotate();
  });
