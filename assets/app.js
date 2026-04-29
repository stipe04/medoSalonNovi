(() => {
  "use strict";

  const d = document;
  const w = window;
  const b = d.body;
  const $ = (selector) => d.querySelector(selector);
  const $$ = (selector) => d.querySelectorAll(selector);

  const header = $("#site-header");
  const menuBtn = $("#menu-toggle");
  const menu = $("#mobile-menu");
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightbox-img");
  const lightboxClose = $("#lightbox-close");
  const mapWrap = $("#map-wrap");

  if (header) {
    const onScroll = () => header.classList[w.scrollY > 30 ? "add" : "remove"]("scrolled");
    w.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (menuBtn && menu) {
    const setOpen = (open) => {
      if (open) {
        menu.removeAttribute("hidden");
        menuBtn.classList.add("is-open");
        menuBtn.setAttribute("aria-expanded", "true");
        b.style.overflow = "hidden";
        return;
      }

      menu.setAttribute("hidden", "");
      menuBtn.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
      b.style.overflow = "";
    };

    menuBtn.addEventListener("click", () => setOpen(menu.hasAttribute("hidden")));
    $$("#mobile-menu a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
  }

  if (lightbox && lightboxImg && lightboxClose) {
    let galleryImages = [];
    let currentIndex = 0;

    const collectGalleryImages = () => {
      galleryImages = Array.from($$(".gal-item")).map(item => item.getAttribute("data-src"));
    };

    const openLightbox = (src) => {
      currentIndex = galleryImages.indexOf(src);
      if (currentIndex === -1) currentIndex = 0;
      updateLightboxImage();
      lightbox.removeAttribute("hidden");
      b.style.overflow = "hidden";
    };

    const updateLightboxImage = () => {
      lightboxImg.src = galleryImages[currentIndex];
    };

    const prevImage = () => {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      updateLightboxImage();
    };

    const nextImage = () => {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      updateLightboxImage();
    };

    const closeLightbox = () => {
      lightbox.setAttribute("hidden", "");
      lightboxImg.src = "";
      b.style.overflow = "";
    };

    collectGalleryImages();

    $$(".gal-item").forEach((item) => {
      item.addEventListener("click", () => openLightbox(item.getAttribute("data-src") || ""));
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
    d.addEventListener("keydown", (event) => {
      if (!lightbox.hasAttribute("hidden")) {
        if (event.key === "Escape") {
          closeLightbox();
        } else if (event.key === "ArrowLeft") {
          prevImage();
        } else if (event.key === "ArrowRight") {
          nextImage();
        }
      }
    });

    // Add nav button listeners
    const lightboxPrev = $("#lightbox-prev");
    const lightboxNext = $("#lightbox-next");
    if (lightboxPrev) lightboxPrev.addEventListener("click", prevImage);
    if (lightboxNext) lightboxNext.addEventListener("click", nextImage);
  }

  if (mapWrap) {
    const loadMap = () => {
      const iframe = d.createElement("iframe");
      iframe.title = "Lokacija Salon Medo — Đure Sudete 4, Sesvete";
      iframe.src = "https://www.google.com/maps?q=%C4%90ure+Sudete+4,+Sesvete,+Zagreb&output=embed";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      mapWrap.innerHTML = "";
      mapWrap.appendChild(iframe);
    };

    if ("IntersectionObserver" in w) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMap();
            observer.disconnect();
          }
        });
      }, { rootMargin: "200px" });

      observer.observe(mapWrap);
    } else {
      loadMap();
    }
  }
})();
