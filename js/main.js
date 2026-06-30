(() => {
  const SECTIONS = [
    "servizi",
    "chi-siamo",
    "progetti",
    "clienti",
    "team",
    "contatti",
  ];
  const TYPING_WORDS = ["finanziari", "aziendali", "clinici", "industriali"];
  const TYPING_SPEED = 100;
  const ERASE_SPEED = 50;
  const PAUSE_DURATION = 2000;
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
        isOpen ? "Chiudi menu mobile" : "Apri menu mobile"
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
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId = null;

    function tick() {
      const currentWord = TYPING_WORDS[wordIndex];
      typedText.textContent = currentWord.slice(0, charIndex);

      if (!isDeleting && charIndex < currentWord.length) {
        charIndex += 1;
        timeoutId = window.setTimeout(tick, TYPING_SPEED);
        return;
      }

      if (!isDeleting) {
        isDeleting = true;
        timeoutId = window.setTimeout(tick, PAUSE_DURATION);
        return;
      }

      if (charIndex > 0) {
        charIndex -= 1;
        timeoutId = window.setTimeout(tick, ERASE_SPEED);
        return;
      }

      isDeleting = false;
      wordIndex = (wordIndex + 1) % TYPING_WORDS.length;
      timeoutId = window.setTimeout(tick, TYPING_SPEED);
    }

    tick();
    window.addEventListener("pagehide", () => window.clearTimeout(timeoutId), {
      once: true,
    });
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

  document.addEventListener("DOMContentLoaded", () => {
    initActiveNavigation();
    initMobileMenu();
    initSmoothScrolling();
    initCustomCursor();
    initTypingAnimation();
    initProjectTabs();
  });
})();
