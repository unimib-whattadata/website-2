(() => {
  const SECTIONS = [
    "servizi",
    "chi-siamo",
    "progetti",
    "clienti",
    "contatti",
  ];
  const TYPING_WORDS = ["financial", "business", "clinical", "industrial"];
  const WORD_CHANGE_INTERVAL = 2400;
  const WORD_FADE_DURATION = 180;
  const PANEL_ANIMATION_DURATION = 500;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const getAll = (selector, scope = document) =>
    Array.from(scope.querySelectorAll(selector));

  function initActiveNavigation() {
    const menuItems = getAll('nav a[href^="#"]').filter((link) =>
      SECTIONS.includes(link.hash.slice(1))
    );
    const sections = SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean
    );

    if (!menuItems.length || !sections.length) {
      return;
    }

    let ticking = false;

    function updateActiveMenuItem() {
      const scrollPosition = window.scrollY + 120;
      const currentSection = sections.find((section) => {
        const sectionTop = section.offsetTop;
        return (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + section.offsetHeight
        );
      });

      menuItems.forEach((item) => {
        const isActive = currentSection?.id === item.hash.slice(1);
        item.classList.toggle("text-indigo-600", isActive);
        item.classList.toggle("font-bold", isActive);
        item.classList.toggle("text-gray-900", !isActive);

        if (isActive) {
          item.setAttribute("aria-current", "location");
        } else {
          item.removeAttribute("aria-current");
        }
      });

      ticking = false;
    }

    function requestMenuUpdate() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateActiveMenuItem);
      }
    }

    updateActiveMenuItem();
    window.addEventListener("scroll", requestMenuUpdate, { passive: true });
  }

  function initMobileMenu() {
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    if (!mobileMenuButton || !mobileMenu) {
      return;
    }

    function setMobileMenuState(isOpen) {
      mobileMenu.classList.toggle("hidden", !isOpen);
      mobileMenu.hidden = !isOpen;
      mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
      mobileMenuButton.setAttribute(
        "aria-label",
        isOpen ? "Close mobile menu" : "Open mobile menu"
      );
    }

    function closeMobileMenu() {
      setMobileMenuState(false);
    }

    mobileMenuButton.addEventListener("click", () => {
      const isExpanded =
        mobileMenuButton.getAttribute("aria-expanded") === "true";
      setMobileMenuState(!isExpanded);
    });

    document.addEventListener("click", (event) => {
      if (
        !mobileMenu.contains(event.target) &&
        !mobileMenuButton.contains(event.target)
      ) {
        closeMobileMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        mobileMenuButton.getAttribute("aria-expanded") === "true"
      ) {
        closeMobileMenu();
        mobileMenuButton.focus();
      }
    });

    getAll('nav a[href^="#"]').forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  function initSmoothScrolling() {
    function scrollToTarget(target, behavior) {
      target.scrollIntoView({
        behavior,
        block: "start",
      });
    }

    getAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.hash.slice(1);
        const target = targetId ? document.getElementById(targetId) : null;

        if (!target) {
          return;
        }

        event.preventDefault();
        scrollToTarget(
          target,
          prefersReducedMotion.matches ? "auto" : "smooth"
        );

        if (window.location.hash !== link.hash) {
          window.history.pushState(null, "", link.hash);
        }
      });
    });

    function alignInitialHash() {
      const targetId = window.location.hash.slice(1);
      const target = targetId ? document.getElementById(targetId) : null;

      if (!target) {
        return;
      }

      window.requestAnimationFrame(() => scrollToTarget(target, "auto"));
    }

    if (window.location.hash) {
      window.requestAnimationFrame(alignInitialHash);
      window.addEventListener(
        "load",
        () => {
          alignInitialHash();
          window.setTimeout(alignInitialHash, 120);
        },
        { once: true }
      );
    }
  }

  function initCustomCursor() {
    const cursor = document.getElementById("custom-cursor");
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (!cursor || !hasFinePointer) {
      return;
    }

    if (prefersReducedMotion.matches) {
      return;
    }

    document.documentElement.classList.add("custom-cursor-enabled");

    let lastEvent = null;
    let frameId = null;

    function updateCursor() {
      if (!lastEvent) {
        frameId = null;
        return;
      }

      const { clientX, clientY } = lastEvent;
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
      cursor.classList.add("is-visible");

      const hoveredElement = document.elementFromPoint(clientX, clientY);
      const isDarkTarget = hoveredElement?.closest(
        "#chi-siamo, .bg-primary, .bg-indigo-600, .bg-gray-800, .bg-gray-900, footer"
      );
      const isLimeTarget = hoveredElement?.closest(".bg-lime-400");

      cursor.classList.toggle("on-dark", Boolean(isDarkTarget || isLimeTarget));
      cursor.style.borderColor = isLimeTarget
        ? "rgb(79, 70, 229)"
        : isDarkTarget
        ? "rgb(163, 230, 53)"
        : "";

      frameId = null;
    }

    document.addEventListener(
      "mousemove",
      (event) => {
        lastEvent = event;
        if (!frameId) {
          frameId = window.requestAnimationFrame(updateCursor);
        }
      },
      { passive: true }
    );

    getAll("a, button, input, select, textarea").forEach((element) => {
      element.addEventListener("mouseenter", () =>
        cursor.classList.add("hover")
      );
      element.addEventListener("mouseleave", () =>
        cursor.classList.remove("hover")
      );
    });
  }

  function initTypingAnimation() {
    const typedText = document.getElementById("typed-text");

    if (!typedText) {
      return;
    }

    if (prefersReducedMotion.matches) {
      typedText.textContent = TYPING_WORDS[0];
      return;
    }

    let wordIndex = 0;
    let intervalId = null;
    let fadeId = null;

    typedText.textContent = TYPING_WORDS[wordIndex];
    intervalId = window.setInterval(() => {
      typedText.classList.add("is-changing");
      fadeId = window.setTimeout(() => {
        wordIndex = (wordIndex + 1) % TYPING_WORDS.length;
        typedText.textContent = TYPING_WORDS[wordIndex];
        typedText.classList.remove("is-changing");
      }, WORD_FADE_DURATION);
    }, WORD_CHANGE_INTERVAL);

    window.addEventListener(
      "pagehide",
      () => {
        window.clearInterval(intervalId);
        window.clearTimeout(fadeId);
      },
      { once: true }
    );
  }

  function initCopyEmail() {
    const copyButton = document.querySelector("[data-copy-email]");
    const status = document.querySelector("[data-copy-status]");

    if (!copyButton || !status) {
      return;
    }

    async function copyEmail() {
      const email = copyButton.dataset.copyEmail;

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const field = document.createElement("textarea");
          field.value = email;
          field.setAttribute("readonly", "");
          field.style.position = "fixed";
          field.style.opacity = "0";
          document.body.appendChild(field);
          field.select();
          const didCopy = document.execCommand("copy");
          field.remove();

          if (!didCopy) {
            throw new Error("Copy command unavailable");
          }
        }

        status.textContent = "Email address copied.";
        copyButton.textContent = "Copied";
      } catch (_error) {
        status.textContent = `Copy unavailable. Use ${email}.`;
      }

      window.setTimeout(() => {
        copyButton.textContent = "Copy email address";
      }, 2400);
    }

    copyButton.addEventListener("click", copyEmail);
  }

  function initProjectTabs() {
    const tabs = getAll("[data-project-tab]");
    const panels = getAll("#project-container > [role='tabpanel']");

    if (!tabs.length || !panels.length) {
      return;
    }

    function showProject(projectId) {
      const activePanel = document.getElementById(`${projectId}-panel`);

      if (!activePanel) {
        return;
      }

      tabs.forEach((tab) => {
        const isActive = tab.dataset.project === projectId;
        tab.classList.toggle("bg-gray-700", isActive);
        tab.classList.toggle("bg-gray-800", !isActive);
        tab.setAttribute("aria-selected", String(isActive));
        tab.setAttribute("tabindex", isActive ? "0" : "-1");
      });

      panels.forEach((panel) => {
        const isActive = panel === activePanel;
        panel.classList.toggle("hidden", !isActive);
        panel.setAttribute("aria-hidden", String(!isActive));

        if (isActive && !prefersReducedMotion.matches) {
          panel.classList.add("panel-enter");
          window.setTimeout(
            () => panel.classList.remove("panel-enter"),
            PANEL_ANIMATION_DURATION
          );
        }
      });
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => showProject(tab.dataset.project));

      tab.addEventListener("keydown", (event) => {
        const keyActions = {
          ArrowDown: (index + 1) % tabs.length,
          ArrowRight: (index + 1) % tabs.length,
          ArrowUp: (index - 1 + tabs.length) % tabs.length,
          ArrowLeft: (index - 1 + tabs.length) % tabs.length,
          Home: 0,
          End: tabs.length - 1,
        };

        if (!(event.key in keyActions)) {
          return;
        }

        event.preventDefault();
        const nextTab = tabs[keyActions[event.key]];
        nextTab.focus();
        showProject(nextTab.dataset.project);
      });
    });

    const initialProject =
      tabs.find((tab) => tab.getAttribute("aria-selected") === "true")?.dataset
        .project || tabs[0].dataset.project;

    showProject(initialProject);
  }

  function initProductShotCarousels() {
    getAll("[data-shot-carousel]").forEach((carousel) => {
      const slides = getAll("[data-shot-slide]", carousel);
      const toggle = carousel.querySelector("[data-shot-toggle]");
      const label = carousel.querySelector("[data-shot-toggle-label]");
      const status = carousel.querySelector("[data-shot-status]");

      if (slides.length < 2 || !toggle || !label || !status) {
        return;
      }

      const CYCLE_DURATION = 6000;
      const TRANSITION_DURATION = 720;
      let activeIndex = Math.max(slides.findIndex((slide) => slide.classList.contains("is-active")), 0);
      let userPaused = false;
      let isInView = true;
      let cycleTimer = null;
      let transitionTimer = null;

      const shouldPlay = () =>
        !prefersReducedMotion.matches && !userPaused && isInView && !document.hidden;

      const updateControl = () => {
        toggle.setAttribute("aria-pressed", String(userPaused));
        toggle.setAttribute("aria-label", userPaused ? "Resume screenshot rotation" : "Pause screenshot rotation");
        label.textContent = userPaused ? "Play" : "Pause";
      };

      const showSlide = (nextIndex) => {
        const previousSlide = slides[activeIndex];
        const nextSlide = slides[nextIndex];

        if (previousSlide === nextSlide) {
          return;
        }

        window.clearTimeout(transitionTimer);
        previousSlide.classList.remove("is-active");
        previousSlide.classList.add("is-previous");
        nextSlide.classList.remove("is-previous");
        nextSlide.classList.add("is-active");
        carousel.classList.add("is-transitioning");
        status.textContent = nextSlide.dataset.shotLabel;
        activeIndex = nextIndex;

        transitionTimer = window.setTimeout(() => {
          previousSlide.classList.remove("is-previous");
          carousel.classList.remove("is-transitioning");
        }, TRANSITION_DURATION);
      };

      const scheduleNext = () => {
        window.clearTimeout(cycleTimer);

        if (!shouldPlay()) {
          return;
        }

        cycleTimer = window.setTimeout(() => {
          showSlide((activeIndex + 1) % slides.length);
          scheduleNext();
        }, CYCLE_DURATION);
      };

      toggle.addEventListener("click", () => {
        userPaused = !userPaused;
        updateControl();
        scheduleNext();
      });

      const observer = new IntersectionObserver(
        ([entry]) => {
          isInView = entry.isIntersecting;
          scheduleNext();
        },
        { threshold: 0.2 }
      );

      observer.observe(carousel);
      document.addEventListener("visibilitychange", scheduleNext);
      prefersReducedMotion.addEventListener?.("change", scheduleNext);
      updateControl();
      scheduleNext();

      window.addEventListener(
        "pagehide",
        () => {
          window.clearTimeout(cycleTimer);
          window.clearTimeout(transitionTimer);
          observer.disconnect();
        },
        { once: true }
      );
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initActiveNavigation();
    initMobileMenu();
    initSmoothScrolling();
    initCustomCursor();
    initTypingAnimation();
    initCopyEmail();
    initProjectTabs();
    initProductShotCarousels();
  });
})();
