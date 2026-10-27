/* ===== Business details: edit here, then save ===== */
const CONFIG = {
  phoneDisplay: "074187 58696",
  phoneLink: "07418758696",
  phone2Display: "99401 22916",      // second number
  phone2Link: "9940122916",          // used for click-to-call
  whatsappNumber: "917418758696",    // country code 91 + number, digits only
  whatsappMessage: "Hello Ammu Ladies Hostel, I would like to enquire about room availability and monthly rent. Please share the details.",
  // Exact Google Maps pins. Anna Nagar branch: 995, H Block. Shanthi Colony branch: 95C, 4th Ave.
};

const waLink = (text) => "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(text);

// Fill every link from CONFIG so you only edit details in one place
document.querySelectorAll("[data-wa]").forEach(a => a.href = waLink(CONFIG.whatsappMessage));
document.querySelectorAll("[data-call]").forEach(a => a.href = "tel:" + CONFIG.phoneLink);
document.querySelectorAll("[data-call2]").forEach(a => a.href = "tel:" + CONFIG.phone2Link);
document.getElementById("year").textContent = new Date().getFullYear();

// Room card "Enquire" buttons: open WhatsApp with the room type in the message
document.querySelectorAll("[data-room]").forEach(btn => {
  btn.addEventListener("click", () => {
    const room = btn.dataset.room;
    window.open(waLink("Hello Ammu Ladies Hostel, I would like to enquire about the " + room +
      ". Please share the current rent and availability."), "_blank", "noopener");
  });
});

// Mobile menu
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const setMenu = (open) => {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};
menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

// FAQ accordion (one open at a time)
document.querySelectorAll(".qa").forEach(item => {
  const btn = item.querySelector("button");
  btn.addEventListener("click", () => {
    const willOpen = !item.classList.contains("open");
    document.querySelectorAll(".qa").forEach(o => {
      o.classList.remove("open");
      o.querySelector("button").setAttribute("aria-expanded", "false");
    });
    if (willOpen) { item.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
  });
});
// Mark answers as regions for screen readers
document.querySelectorAll(".ans").forEach(a => a.setAttribute("role", "region"));

// Enquiry form: validate, then open WhatsApp with the details.
// Nothing is stored or emailed (see README to connect a real form service).
const form = document.getElementById("form");
const nameEl = document.getElementById("f-name");
const phoneEl = document.getElementById("f-phone");
form.addEventListener("submit", e => {
  e.preventDefault();
  const name = nameEl.value.trim();
  const phone = phoneEl.value.replace(/[\s-]/g, "");
  const room = document.getElementById("f-room").value;
  const msg = document.getElementById("f-msg").value.trim();
  let ok = true;
  const setErr = (id, text, field) => {
    document.getElementById(id).textContent = text;
    field.setAttribute("aria-invalid", text ? "true" : "false");
    if (text) ok = false;
  };
  setErr("e-name", name.length < 2 ? "Please enter your name." : "", nameEl);
  setErr("e-phone", /^(\+?91|0)?[6-9]\d{9}$/.test(phone) ? "" : "Please enter a valid 10-digit mobile number.", phoneEl);
  if (!ok) { form.querySelector("[aria-invalid=true]").focus(); return; }
  const text = "Hello Ammu Ladies Hostel, I would like to enquire about rent and availability.\n" +
    "Name: " + name + "\nPhone: " + phone + "\nPreferred room: " + room + (msg ? "\nMessage: " + msg : "");
  window.open(waLink(text), "_blank", "noopener");
});

/* ===== Effects: progress bar, scroll-spy, reveal, counters, tilt, ripple, lightbox ===== */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const hoverOK = matchMedia("(hover: hover)").matches;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

const bar = $("#progress"), hdr = $(".site-header"), up = $("#toTop");
const navLinks = $$('#nav a[href^="#"]:not(.btn)');
const navSecs = navLinks.map(a => $(a.getAttribute("href")));
function onScroll() {
  const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = "scaleX(" + (max ? y / max : 0) + ")";
  hdr.classList.toggle("shrink", y > 40);
  up.classList.toggle("show", y > 700);
  let cur = "top";
  navSecs.forEach(s => { if (s && s.getBoundingClientRect().top <= 140) cur = s.id; });
  navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
}
addEventListener("scroll", onScroll, { passive: true }); onScroll();
up.addEventListener("click", () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));

// Reveal on scroll, staggered by position inside the parent
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target; el.classList.add("in"); io.unobserve(el);
  setTimeout(() => el.classList.add("done"), 1000 + parseInt(el.style.getPropertyValue("--d") || 0));
}), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
if (!reduce) $$(".head,.about>*,.split>*,.card,.gal figure,.why-list li,.qa,.offer,.rentnote,.cta-grid>*,.foot-grid>*,.strip-grid>div").forEach(el => {
  el.classList.add("reveal");
  el.style.setProperty("--d", ([...el.parentElement.children].indexOf(el) % 6) * 70 + "ms");
  io.observe(el);
});

// Count-up numbers
const cio = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; cio.unobserve(e.target);
  const el = e.target, to = +el.dataset.count, d = +(el.dataset.dec || 0), t0 = performance.now();
  (function f(t) { const p = Math.min((t - t0) / 1400, 1); el.textContent = (to * (1 - Math.pow(1 - p, 3))).toFixed(d); if (p < 1) requestAnimationFrame(f); })(t0);
}), { threshold: 0.6 });
if (!reduce) $$("[data-count]").forEach(el => { el.textContent = (0).toFixed(+(el.dataset.dec || 0)); cio.observe(el); });

// Mouse parallax in the hero, card tilt with glow
const hero = $(".hero");
if (!reduce && hoverOK) {
  hero.addEventListener("pointermove", e => {
    hero.style.setProperty("--px", e.clientX / innerWidth - 0.5);
    hero.style.setProperty("--py", e.clientY / innerHeight - 0.5);
  });
  $$(".grid5 .card,.quote,.review").forEach(c => {
    c.addEventListener("pointermove", e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.setProperty("--mx", x * 100 + "%"); c.style.setProperty("--my", y * 100 + "%");
      c.style.transform = "perspective(700px) rotateX(" + (0.5 - y) * 6 + "deg) rotateY(" + (x - 0.5) * 8 + "deg) translateY(-4px)";
    });
    c.addEventListener("pointerleave", () => { c.style.transform = ""; });
  });
}

// Button ripple
$$(".btn").forEach(b => b.addEventListener("click", e => {
  if (reduce) return;
  const r = b.getBoundingClientRect(), s = document.createElement("span");
  s.className = "ripple"; s.style.left = e.clientX - r.left + "px"; s.style.top = e.clientY - r.top + "px";
  b.appendChild(s); setTimeout(() => s.remove(), 600);
}));

// Gallery lightbox (Esc closes, arrow keys move)
const figs = $$(".gal figure"), lb = $("#lb"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
let li = 0, lastFocus;
const show = i => {
  li = (i + figs.length) % figs.length;
  const im = figs[li].querySelector("img");
  lbImg.src = im.src; lbImg.alt = im.alt;
  lbCap.textContent = figs[li].querySelector("figcaption").textContent + " (" + (li + 1) + " of " + figs.length + ")";
};
const openLb = i => { lastFocus = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = "hidden"; $("#lbClose").focus(); };
const closeLb = () => { lb.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); };
figs.forEach((f, i) => {
  f.tabIndex = 0; f.setAttribute("role", "button");
  f.setAttribute("aria-label", "Enlarge photo: " + f.querySelector("figcaption").textContent);
  f.addEventListener("click", () => openLb(i));
  f.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLb(i); } });
});
$("#lbClose").onclick = closeLb; $("#lbPrev").onclick = () => show(li - 1); $("#lbNext").onclick = () => show(li + 1);
lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLb(); if (e.key === "ArrowLeft") show(li - 1); if (e.key === "ArrowRight") show(li + 1);
});

