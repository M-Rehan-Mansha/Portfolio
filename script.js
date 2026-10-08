/* ===== THEME TOGGLE LOGIC (Runs Immediately) ===== */
(function () {
  const html = document.documentElement;
  const metaTheme = document.getElementById('theme-color-meta');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    html.classList.add('dark-mode');
    if (metaTheme) metaTheme.content = '#0a0a0b';
  } else {
    if (metaTheme) metaTheme.content = '#faf3e0';
  }
})();

/* ===== CONFIG: Real Links ===== */
var CONFIG = {
  facebook: "https://www.facebook.com/share/19p7LzBzhK/?mibextid=wwXIfr",
  instagram: "https://www.instagram.com/rehanmanshallc",
  linkedin: "https://www.linkedin.com/in/muhammad-rehan-mansha",
  email: "rehanmanshallc@gmail.com",
};

var PROJECTS = [
  {
    name: "The Darna Store",
    cat: "Home & Kitchen E-commerce Brand",
    built: "Complete brand build",
    desc: "A modern e-commerce brand focused on practical home and kitchen products — positioning, Shopify experience, product presentation and conversion-focused structure.",
    tags: ["Brand Positioning", "Shopify", "Product Research", "CRO"],
    url: "https://thedarna.store/",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Arabs Exclusive",
    cat: "Niche E-commerce Store",
    built: "Full store build & optimization",
    desc: "A specialized e-commerce experience designed around product discovery, customer trust and conversion — homepage structure, product pages, collections, offers and mobile experience.",
    tags: ["Shopify", "Homepage", "Product Pages", "Trust Elements"],
    url: "http://arabsexclusive.store/",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Store Optimization",
    cat: "Conversion Rate Optimization",
    built: "Experience redesign",
    desc: "Identified weaknesses within an existing store and improved the areas that influence customer decisions — navigation, offers, CTA placement and customer journey.",
    tags: ["CRO", "UX", "Offers", "Mobile"],
    url: "#contact",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Creative & Ads Testing",
    cat: "Meta & TikTok Advertising",
    built: "Creative strategy",
    desc: "Developed ad concepts and tested hooks, formats and product angles across Meta and TikTok to find winning creative directions backed by data.",
    tags: ["Meta Ads", "TikTok Ads", "UGC", "Testing"],
    url: "#contact",
    img: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80"
  }
];

(function () {
  var d = document,
    rm = matchMedia("(prefers-reduced-motion:reduce)").matches,
    fine = matchMedia("(hover:hover) and (pointer:fine)").matches;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  d.getElementById("yr").textContent = new Date().getFullYear();

  addEventListener("load", function () {
    setTimeout(function () {
      d.getElementById("load").classList.add("done");
    }, rm ? 0 : 500);
  });

  d.getElementById("projects").innerHTML = PROJECTS.map(function (p) {
    var hasImg = p.img ? 'style="background-image: url(\'' + p.img + '\'); background-size: cover; background-position: center;"' : '';
    var imgClass = p.img ? 'has-image' : '';
    var btnText = (p.url && p.url !== "#contact") ? "VIEW LIVE STORE" : "DISCUSS A SIMILAR PROJECT";
    var btnLink = p.url ? esc(p.url) : "#contact";
    var targetAttr = (p.url && p.url !== "#contact") ? 'target="_blank" rel="noopener"' : '';

    return (
      '<article class="card rv"><div class="in">' +
      '<div class="shot ' + imgClass + '" ' + hasImg + ' role="img" aria-label="Project screenshot of ' + esc(p.name) + '"></div>' +
      '<div class="cb"><small>' + esc(p.cat) + "</small><h3>" + esc(p.name) +
      '</h3><p><strong style="color:var(--ivory);font-weight:600">' + esc(p.built) + ".</strong> " + esc(p.desc) +
      '</p><div class="tags">' + p.tags.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") +
      "</div>" +
      '<a href="' + btnLink + '" ' + targetAttr + '>' + btnText + '</a>' +
      "</div></div></article>"
    );
  }).join("");

  var L = [
    ["Facebook", CONFIG.facebook],
    ["Instagram", CONFIG.instagram],
    ["LinkedIn", CONFIG.linkedin],
    ["Email", CONFIG.email ? "mailto:" + CONFIG.email : ""],
  ],
    ds = d.getElementById("direct"),
    fl = d.getElementById("fl");

  L.forEach(function (x) {
    if (!x[1]) return;
    ds.insertAdjacentHTML("beforeend", '<a class="btn" target="_blank" rel="noopener" href="' + x[1] + '">' + x[0] + "</a>");
    if (x[0] === "Instagram" || x[0] === "LinkedIn" || x[0] === "Facebook") {
      fl.insertAdjacentHTML("beforeend", '<li><a target="_blank" rel="noopener" href="' + x[1] + '">' + x[0] + "</a></li>");
    }
  });

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  d.querySelectorAll(".rv").forEach(function (el) { io.observe(el); });

  var nav = d.getElementById("nav"), bg = d.getElementById("bg");
  bg.onclick = function () {
    var o = nav.classList.toggle("open");
    bg.setAttribute("aria-expanded", o);
  };
  d.querySelectorAll("#menu a").forEach(function (a) {
    a.onclick = function () {
      nav.classList.remove("open");
      bg.setAttribute("aria-expanded", false);
    };
  });

  var pr = d.getElementById("prog"), hd = d.getElementById("hd"), tl = d.getElementById("tl"),
    steps = tl.querySelectorAll(".step"), tk = false;
  function onS() {
    tk = false;
    var h = d.documentElement.scrollHeight - innerHeight, y = scrollY;
    pr.style.transform = "scaleX(" + (h > 0 ? y / h : 0) + ")";
    hd.classList.toggle("s", y > 30);
    var r = tl.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight * 0.7 - r.top) / r.height));
    tl.style.setProperty("--p", rm ? 1 : p);
    steps.forEach(function (s, i) {
      s.classList.toggle("on", rm || p >= i / (steps.length - 1) - 0.02);
    });
  }
  addEventListener("scroll", function () {
    if (!tk) { tk = true; requestAnimationFrame(onS); }
  }, { passive: true });
  onS();

  if (fine && !rm) {
    var g = d.getElementById("glow");
    addEventListener("pointermove", function (e) {
      g.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)";
    }, { passive: true });

    d.querySelectorAll(".card .in, .svc article, .node").forEach(function (c) {
      c.addEventListener("pointermove", function (e) {
        var b = c.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
        c.style.setProperty("--tilt-y", (x * 8) + "deg");
        c.style.setProperty("--tilt-x", (-y * 8) + "deg");
      });
      c.addEventListener("pointerleave", function () {
        c.style.setProperty("--tilt-y", "0deg");
        c.style.setProperty("--tilt-x", "0deg");
      });
    });
  }

  if (CONFIG.email) {
    var ce = d.getElementById("cemail");
    if (ce) { ce.textContent = CONFIG.email; ce.style.color = "var(--gold)"; }
  }

  var f = d.getElementById("f"), m = d.getElementById("msg"),
    submitBtn = f.querySelector('button[type="submit"]'),
    originalBtnText = submitBtn.textContent;

  f.addEventListener("submit", function (e) {
    e.preventDefault();
    m.textContent = "";
    m.style.color = "var(--mute)";

    var v = Object.fromEntries(new FormData(f));

    if (!v.name.trim() || !/^\S+@\S+\.\S+$/.test(v.email) || !v.message.trim()) {
      m.style.color = "#e0a39a";
      m.textContent = "Please fill in all required fields with valid information.";
      if (!v.name.trim()) f.querySelector('[name="name"]').style.borderColor = "#e0a39a";
      if (!/^\S+@\S+\.\S+$/.test(v.email)) f.querySelector('[name="email"]').style.borderColor = "#e0a39a";
      if (!v.message.trim()) f.querySelector('[name="message"]').style.borderColor = "#e0a39a";
      return;
    }

    f.querySelectorAll('input, textarea, select').forEach(el => el.style.borderColor = "");

    submitBtn.disabled = true;
    submitBtn.textContent = "OPENING EMAIL...";
    submitBtn.style.opacity = "0.7";
    submitBtn.style.cursor = "wait";

    if (CONFIG.email) {
      location.href = "mailto:" + CONFIG.email +
        "?subject=" + encodeURIComponent("Portfolio Inquiry: " + v.type) +
        "&body=" + encodeURIComponent("Name: " + v.name + "\nEmail: " + v.email + "\nBudget: " + v.budget + "\n\nMessage:\n" + v.message);
    }

    setTimeout(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
      submitBtn.style.opacity = "1";
      submitBtn.style.cursor = "pointer";
      m.style.color = "var(--gold)";
      m.textContent = "Email client opened. If it didn't open, please email me directly.";
    }, 1000);
  });

  f.querySelectorAll('input, textarea, select').forEach(function (el) {
    el.addEventListener('input', function () { this.style.borderColor = ""; });
  });

  d.querySelectorAll(".ripple-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var circle = document.createElement("span");
      var diameter = Math.max(btn.clientWidth, btn.clientHeight);
      var radius = diameter / 2;
      var rect = btn.getBoundingClientRect();
      circle.style.width = circle.style.height = diameter + "px";
      circle.style.left = (e.clientX - rect.left - radius) + "px";
      circle.style.top = (e.clientY - rect.top - radius) + "px";
      circle.classList.add("ripple-circle");
      var ripple = btn.getElementsByClassName("ripple-circle")[0];
      if (ripple) ripple.remove();
      btn.appendChild(circle);
    });
  });

  d.querySelectorAll(".split-text").forEach(function (el) {
    var text = el.innerHTML;
    el.innerHTML = '<span class="split-line-wrap"><span class="split-line">' + text + '</span></span>';
  });

  const themeToggle = d.getElementById('theme-toggle');
  const metaTheme = d.getElementById('theme-color-meta');

  themeToggle.addEventListener('click', () => {
    d.documentElement.classList.toggle('dark-mode');
    const isDark = d.documentElement.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (metaTheme) metaTheme.content = isDark ? '#0a0a0b' : '#faf3e0';
  });

})();

/* ============ VIP 3D & MOTION LAYER ============ */
(function () {
  var rm = matchMedia("(prefers-reduced-motion: reduce)").matches,
    fine = matchMedia("(hover:hover) and (pointer:fine)").matches;

  if (window.THREE && !rm) {
    var box = document.getElementById("scene3d");
    if (box) {
      var W = box.clientWidth || 600, H = box.clientHeight || 560;
      var scene = new THREE.Scene();
      var cam = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
      cam.position.set(0, 0, 8);
      var rd = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      rd.setSize(W, H);
      rd.setPixelRatio(Math.min(devicePixelRatio, 2));
      box.appendChild(rd.domElement);

      var knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.7, 0.5, 180, 28), new THREE.MeshStandardMaterial({ color: 0x1d1d20, metalness: 0.9, roughness: 0.25 }));
      var wire = new THREE.Mesh(new THREE.TorusKnotGeometry(1.72, 0.51, 110, 16), new THREE.MeshBasicMaterial({ color: 0xc9a96a, wireframe: true, transparent: true, opacity: 0.28 }));
      var grp = new THREE.Group(); grp.add(knot); grp.add(wire); scene.add(grp);

      var ring = new THREE.Mesh(new THREE.TorusGeometry(3.1, 0.015, 12, 120), new THREE.MeshBasicMaterial({ color: 0xc9a96a, transparent: true, opacity: 0.5 }));
      ring.rotation.x = Math.PI / 2.4; scene.add(ring);
      var ring2 = ring.clone(); ring2.scale.setScalar(1.25); ring2.rotation.x = Math.PI / 1.8; ring2.rotation.y = 0.6; ring2.material = ring.material.clone(); ring2.material.opacity = 0.22; scene.add(ring2);

      var N = 700, pos = new Float32Array(N * 3);
      for (var i = 0; i < N; i++) {
        var r = 3.5 + Math.random() * 6, t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(p) * Math.cos(t); pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t); pos[i * 3 + 2] = r * Math.cos(p) - 3;
      }
      var pg = new THREE.BufferGeometry();
      pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      var pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xc9a96a, size: 0.03, transparent: true, opacity: 0.75 }));
      scene.add(pts);

      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      var key = new THREE.PointLight(0xc9a96a, 1.6, 40); key.position.set(5, 4, 6); scene.add(key);
      var fill = new THREE.PointLight(0x8899ff, 0.5, 40); fill.position.set(-6, -3, 4); scene.add(fill);

      var mx = 0, my = 0, tx = 0, ty = 0;
      if (fine) addEventListener("pointermove", function (e) { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5; }, { passive: true });

      var clock = new THREE.Clock();
      (function tick() {
        requestAnimationFrame(tick);
        var t = clock.getElapsedTime();
        mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
        grp.rotation.y = t * 0.22 + mx * 0.8; grp.rotation.x = Math.sin(t * 0.3) * 0.15 + my * 0.6;
        wire.rotation.y = -t * 0.1; ring.rotation.z = t * 0.15; ring2.rotation.z = -t * 0.1; pts.rotation.y = t * 0.03;
        cam.position.x += (mx * 1.2 - cam.position.x) * 0.05; cam.position.y += (-my * 0.9 - cam.position.y) * 0.05;
        cam.lookAt(0, 0, 0); rd.render(scene, cam);
      })();

      var resizeTimeout;
      addEventListener("resize", function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
          W = box.clientWidth; H = box.clientHeight; cam.aspect = W / H; cam.updateProjectionMatrix(); rd.setSize(W, H);
        }, 100);
      });
    }
  }

  if (fine && !rm) {
    var dot = document.getElementById("cdot"), ringEl = document.getElementById("cring");
    var x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
    addEventListener("pointermove", function (e) { x = e.clientX; y = e.clientY; dot.style.transform = "translate(" + x + "px," + y + "px)"; }, { passive: true });
    (function follow() {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      ringEl.style.transform = "translate(" + rx + "px," + ry + "px)";
      requestAnimationFrame(follow);
    })();
    document.querySelectorAll("a, button, .card, .svc article, input, select, textarea").forEach(function (el) {
      el.addEventListener("pointerenter", function () { ringEl.classList.add("big"); });
      el.addEventListener("pointerleave", function () { ringEl.classList.remove("big"); });
    });
  }

  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    if (!rm) {
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from("header", { y: -40, opacity: 0, duration: 0.8 }, 0.5)
        .from(".hero .eyebrow", { y: 20, opacity: 0, duration: 0.7 }, 0.7)
        .from(".hero h1 .split-line", { y: 50, opacity: 0, duration: 1 }, 0.85)
        .from(".hero p.lead", { y: 30, opacity: 0, duration: 0.8 }, 1.05)
        .from(".hero .ctas .btn", { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 }, 1.2)
        .from(".photo-frame-wrap", { scale: 0.9, opacity: 0, duration: 1.2, ease: "power3.out" }, 0.8);

      gsap.utils.toArray("section h2 .split-line").forEach(function (h) {
        gsap.from(h, { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: h, start: "top 88%" } });
      });

      [[".cards .card", 0.1], [".svc article", 0.08], [".why .card", 0.08]].forEach(function (g) {
        gsap.from(g[0], { y: 30, opacity: 0, stagger: g[1], duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: g[0], start: "top 88%" } });
      });

      gsap.from(".cta .btn", { scale: 0.9, opacity: 0, duration: 0.6, ease: "back.out(1.5)", scrollTrigger: { trigger: ".cta", start: "top 75%" } });
    }

    if (fine && !rm) {
      document.querySelectorAll(".btn").forEach(function (b) {
        b.addEventListener("pointermove", function (e) {
          var r = b.getBoundingClientRect();
          gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.2, y: (e.clientY - r.top - r.height / 2) * 0.25, duration: 0.35, ease: "power2.out", overwrite: true });
        });
        b.addEventListener("pointerleave", function () {
          gsap.to(b, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
        });
      });
    }
  }
})();

/* ===== PAYMENT MODAL ===== */
function initPaymentModal() {
  var WA_NUMBER = '923474299799';

  var modal = document.getElementById('payment-modal');
  var card = document.getElementById('pmodal-card');
  var btnClose = document.getElementById('close-modal-btn') || document.getElementById('pmodal-close') || document.querySelector('.pmodal-close');
  var modalTitle = document.getElementById('modal-plan-title') || document.getElementById('pmodal-title');
  var whatsappBtn = document.getElementById('modal-whatsapp-btn') || document.getElementById('pmodal-wa');

  if (!modal) return;

  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── Open Modal with Selected Plan Details ── */
  function openModal(plan, price, duration) {
    var rawPlan = (plan || 'Mentorship Plan').trim();
    var planFormatted = rawPlan.endsWith('Plan') ? rawPlan : rawPlan + ' Plan';
    var rawPrice = (price || '').trim();
    var durationText = (duration || '').trim();

    // Dynamic Header: Plan Name — Price PKR [Duration]
    if (modalTitle) {
      var headerDuration = durationText ? ' <span class="pmodal-duration-tag">[' + esc(durationText) + ']</span>' : '';
      modalTitle.innerHTML = esc(planFormatted) + ' &mdash; ' + esc(rawPrice) + headerDuration;
    }

    // Direct WhatsApp Gated Receipt URL:
    if (whatsappBtn) {
      var message = 'Hi Rehan! I have transferred the payment for the ' + planFormatted + ' (' + rawPrice + '). Here is my payment receipt.';
      whatsappBtn.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
    }

    modal.removeAttribute('hidden');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { modal.classList.add('pmodal--open'); }, 10);
    if (btnClose) btnClose.focus();
  }

  /* ── Close Modal ── */
  function closeModal() {
    modal.classList.remove('pmodal--open');
    document.body.style.overflow = '';
    setTimeout(function () {
      modal.setAttribute('hidden', '');
      modal.classList.add('hidden');
    }, 320);
  }

  /* ── Wire pricing CTA buttons ── */
  var ctaButtons = document.querySelectorAll('.open-modal-btn, .open-payment-modal, [data-plan][data-price]');
  ctaButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var plan = btn.getAttribute('data-plan') || btn.dataset.plan;
      var price = btn.getAttribute('data-price') || btn.dataset.price;
      var duration = btn.getAttribute('data-duration') || btn.dataset.duration;
      openModal(plan, price, duration);
    });
  });

  /* ── Copy Account / Phone Numbers ── */
  document.querySelectorAll('.pmodal-copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var textToCopy = btn.dataset.copy || (btn.previousElementSibling ? btn.previousElementSibling.textContent.trim() : '');
      var tooltip = btn.querySelector('.pmodal-copy-tooltip');

      function onCopied() {
        if (tooltip) tooltip.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          if (tooltip) tooltip.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(onCopied).catch(function () {
          fallbackCopy(textToCopy, onCopied);
        });
      } else {
        fallbackCopy(textToCopy, onCopied);
      }
    });
  });

  function fallbackCopy(text, cb) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      if (cb) cb();
    } catch (err) {
      console.error('Copy failed', err);
    }
    document.body.removeChild(ta);
  }

  /* ── Close Triggers ── */
  if (btnClose) btnClose.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal || (card && !card.contains(e.target))) {
      closeModal();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden') && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  /* ── Focus trap ── */
  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var focusable = Array.from(card.querySelectorAll('a,button,[tabindex]:not([tabindex="-1"])'));
    if (!focusable.length) return;
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPaymentModal);
} else {
  initPaymentModal();
}