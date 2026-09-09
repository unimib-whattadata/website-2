(() => {
  const SECTIONS = [
    "progetti",
    "servizi",
    "chi-siamo",
    "pubblicazioni",
    "clienti",
    "contatti",
  ];
  const TYPING_WORDS = ["industrial", "clinical", "business", "financial"];
  const TYPEWRITER_START_DELAY = 420;
  const TYPEWRITER_KEYSTROKE = 82;
  const TYPEWRITER_DELETE = 44;
  const TYPEWRITER_HOLD = 1450;
  const TYPEWRITER_WORD_GAP = 260;
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
    window.addEventListener("resize", requestMenuUpdate, { passive: true });
  }

  function initMobileMenu() {
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    if (!mobileMenuButton || !mobileMenu) {
      return;
    }

    let menuAnimation = null;
    let menuSequence = 0;

    function clearMenuAnimationStyles() {
      mobileMenu.style.removeProperty("will-change");
    }

    function hideMobileMenu() {
      mobileMenu.classList.add("hidden");
      mobileMenu.hidden = true;
      clearMenuAnimationStyles();
    }

    function setMobileMenuState(isOpen) {
      const sequence = ++menuSequence;
      const canAnimate =
        !prefersReducedMotion.matches &&
        typeof mobileMenu.animate === "function";

      menuAnimation?.cancel();
      menuAnimation = null;

      mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
      mobileMenuButton.setAttribute(
        "aria-label",
        isOpen ? "Close mobile menu" : "Open mobile menu"
      );

      if (isOpen) {
        mobileMenu.classList.remove("hidden");
        mobileMenu.hidden = false;

        if (!canAnimate) {
          clearMenuAnimationStyles();
          return;
        }

        mobileMenu.style.willChange = "clip-path, opacity";
        menuAnimation = mobileMenu.animate(
          [
            { clipPath: "inset(0 0 100% 0)", opacity: 0.58 },
            { clipPath: "inset(0)", opacity: 1 },
          ],
          {
            duration: 280,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "both",
          }
        );

        menuAnimation.addEventListener(
          "finish",
          () => {
            if (sequence !== menuSequence) {
              return;
            }

            menuAnimation?.cancel();
            menuAnimation = null;
            clearMenuAnimationStyles();
          },
          { once: true }
        );
        return;
      }

      if (mobileMenu.hidden || mobileMenu.classList.contains("hidden")) {
        hideMobileMenu();
        return;
      }

      if (!canAnimate) {
        hideMobileMenu();
        return;
      }

      const currentStyle = window.getComputedStyle(mobileMenu);
      const currentClipPath =
        currentStyle.clipPath === "none" ? "inset(0)" : currentStyle.clipPath;

      mobileMenu.style.willChange = "clip-path, opacity";
      menuAnimation = mobileMenu.animate(
        [
          { clipPath: currentClipPath, opacity: Number(currentStyle.opacity) },
          { clipPath: "inset(0 0 100% 0)", opacity: 0.58 },
        ],
        {
          duration: 180,
          easing: "cubic-bezier(0.4, 0, 1, 1)",
          fill: "both",
        }
      );

      menuAnimation.addEventListener(
        "finish",
        () => {
          if (sequence !== menuSequence) {
            return;
          }

          hideMobileMenu();
          menuAnimation?.cancel();
          menuAnimation = null;
        },
        { once: true }
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

    const compactNavigation = window.matchMedia("(max-width: 1100px)");
    compactNavigation.addEventListener("change", (event) => {
      if (!event.matches) {
        closeMobileMenu();
      }
    });
  }

  function initProductEvidenceArrival() {
    const frame = document.querySelector(".product-hero-shot");

    if (
      !frame ||
      prefersReducedMotion.matches ||
      document.visibilityState === "hidden" ||
      typeof frame.animate !== "function"
    ) {
      return;
    }

    const isCompact = window.matchMedia("(max-width: 760px)").matches;
    const duration = isCompact ? 560 : 720;
    const distance = isCompact ? "12px" : "20px";
    const sweep = document.createElement("span");
    sweep.className = "product-evidence-sweep";
    sweep.setAttribute("aria-hidden", "true");
    frame.appendChild(sweep);

    frame.style.willChange = "clip-path, transform";
    sweep.style.willChange = "transform, opacity";

    const frameAnimation = frame.animate(
      [
        {
          clipPath: "inset(0 100% 0 0)",
          transform: `translate3d(${distance}, 0, 0)`,
        },
        { clipPath: "inset(0)", transform: "translate3d(0, 0, 0)" },
      ],
      {
        duration,
        delay: 90,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "both",
      }
    );

    const sweepAnimation = sweep.animate(
      [
        { transform: "translate3d(-120%, 0, 0)", opacity: 0 },
        { opacity: 1, offset: 0.12 },
        { transform: "translate3d(620%, 0, 0)", opacity: 0.9, offset: 0.84 },
        { transform: "translate3d(720%, 0, 0)", opacity: 0 },
      ],
      {
        duration,
        delay: 90,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "both",
      }
    );

    let cleanedUp = false;

    function cleanup() {
      if (cleanedUp) {
        return;
      }

      cleanedUp = true;
      frameAnimation.cancel();
      sweepAnimation.cancel();
      frame.style.removeProperty("will-change");
      sweep.remove();
    }

    Promise.allSettled([frameAnimation.finished, sweepAnimation.finished]).then(
      cleanup
    );
    window.addEventListener("pagehide", cleanup, { once: true });
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
        "#chi-siamo, .about-section, .section-space--dark, .product-close, .bg-primary, .bg-indigo-600, .bg-gray-800, .bg-gray-900, footer"
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
    const caret = typedText?.nextElementSibling;

    if (!typedText) {
      return;
    }

    let wordIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;
    let timeoutId = null;
    let isRunning = false;

    function setCaretState(isTyping) {
      caret?.classList.toggle("is-typing", isTyping);
    }

    function schedule(delay) {
      timeoutId = window.setTimeout(step, delay);
    }

    function step() {
      if (!isRunning) {
        return;
      }

      const word = TYPING_WORDS[wordIndex];
      setCaretState(true);

      if (isDeleting) {
        characterIndex = Math.max(characterIndex - 1, 0);
        typedText.textContent = word.slice(0, characterIndex);

        if (characterIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % TYPING_WORDS.length;
          setCaretState(false);
          schedule(TYPEWRITER_WORD_GAP);
          return;
        }

        schedule(TYPEWRITER_DELETE);
        return;
      }

      characterIndex = Math.min(characterIndex + 1, word.length);
      typedText.textContent = word.slice(0, characterIndex);

      if (characterIndex === word.length) {
        isDeleting = true;
        setCaretState(false);
        schedule(TYPEWRITER_HOLD);
        return;
      }

      schedule(TYPEWRITER_KEYSTROKE + (characterIndex % 3) * 12);
    }

    function stopTyping() {
      isRunning = false;
      window.clearTimeout(timeoutId);
      setCaretState(false);
    }

    function startTyping() {
      stopTyping();

      if (prefersReducedMotion.matches) {
        typedText.textContent = TYPING_WORDS[0];
        return;
      }

      wordIndex = 0;
      characterIndex = 0;
      isDeleting = false;
      isRunning = true;
      typedText.textContent = "";
      schedule(TYPEWRITER_START_DELAY);
    }

    function handleMotionPreferenceChange() {
      startTyping();
    }

    startTyping();

    if (typeof prefersReducedMotion.addEventListener === "function") {
      prefersReducedMotion.addEventListener(
        "change",
        handleMotionPreferenceChange
      );
    } else {
      prefersReducedMotion.addListener(handleMotionPreferenceChange);
    }

    window.addEventListener(
      "pagehide",
      () => {
        stopTyping();

        if (typeof prefersReducedMotion.removeEventListener === "function") {
          prefersReducedMotion.removeEventListener(
            "change",
            handleMotionPreferenceChange
          );
        } else {
          prefersReducedMotion.removeListener(handleMotionPreferenceChange);
        }
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
    initProductEvidenceArrival();
    initProductShotCarousels();
  });
})();
