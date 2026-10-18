(() => {
  const B = {
    wa: "201221094280", n: "01221094280",
    tt: "https://www.tiktok.com/@tag_stoor",
    items: [
      { n: "هودي أسود · أنوبيس", img: "anubis", t: "طبعة دهبية" },
      { n: "هودي رمادي · ثعبان وورود", img: "snake", t: "طبعة ظهر" },
      { n: "هودي أبيض · خالد بن الوليد", img: "khalid", t: "طبعة ظهر" },
      { n: "هودي أخضر · فرسان", img: "warriors", t: "طبعة ظهر" },
      { n: "هودي أسود · المومياء", img: "mummy", t: "طبعة دهبية" },
      { n: "هودي رمادي · فرعوني", img: "pharaoh", t: "طبعة دهبية" },
    ],
    faqs: [
      ["إزاي أطلب؟", "ابعتلنا تصميمك على واتساب 01221094280، وهنرد عليك بالتفاصيل."],
      ["فين المحل؟", "بيع من المنزل. الطلب كله أونلاين على واتساب."],
      ["أقدر أطبع تصميمي أنا؟", "أيوه، هات تصميمك وإحنا هننفذهولك."],
    ],
  };
  const $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wa = (t) => `https://wa.me/${B.wa}?text=${encodeURIComponent(t)}`;
  const hello = "أهلاً، عايز أطبع تصميم على هودي من تاج";

  const mq = "هات تصميمك وإحنا هننفذهولك · بيع من المنزل · واتساب " + B.n + " · ";
  $("#mq").innerHTML = Array.from({ length: 8 }, () => `<span>${mq}</span>`).join("");
  const tape = ["أنوبيس", "ثعبان وورود", "خالد بن الوليد", "فرسان", "المومياء", "فرعوني"];
  $("#tape").innerHTML = Array.from({ length: 6 }, () => tape.map((t) => `<span>${t}</span><i>✦</i>`).join("")).join("");

  ["#hdWa", "#ctaWa", "#heroWa"].forEach((s) => ($(s).href = wa(hello)));
  ["#hdTt", "#fTt"].forEach((s) => ($(s).href = B.tt));
  $("#fWa").href = wa(hello); $("#fWa").textContent = B.n;

  $("#grid").innerHTML = B.items.map((it, i) => `<article class="pt rv" style="--d:${(i % 3) * 0.1}s" data-i="${i}"><div class="pi"><span class="badge">${it.t}</span><img src="img/${it.img}.jpg" alt="${it.n}" loading="lazy"></div><h3>${it.n}</h3><button class="pill" type="button">اسأل عن السعر</button></article>`).join("");
  document.addEventListener("click", (e) => { const t = e.target.closest(".pt"); if (!t) return; const it = B.items[+t.dataset.i]; window.open(wa(`أهلاً، عايز أسأل عن السعر: ${it.n}\nالمقاس: `), "_blank", "noopener"); });
  $("#faqList").innerHTML = B.faqs.map(([q, a]) => `<details class="rv"><summary>${q}</summary><p>${a}</p></details>`).join("");

  // scroll-lit statement
  const big = $("#big"); big.innerHTML = big.textContent.trim().split(/\s+/).map((w) => `<span>${w}</span>`).join(" ");
  const words = [...big.children];

  let io = null;
  const count = (box) => { const b = box.querySelector("[data-n]"); if (!b || reduce) return; const to = +b.dataset.n, suf = b.dataset.s || "", t0 = performance.now(); const tick = (t) => { const p = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - p, 3); b.textContent = (to * e).toFixed(1) + suf; if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); };
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); count(x.target); } }), { threshold: 0.12 });
    $$(".rv").forEach((e) => io.observe(e));
  } else $$(".rv").forEach((e) => e.classList.add("in"));

  let started = false;
  const start = () => { if (started) return; started = true; $("#loader").classList.add("gone"); root.classList.remove("loading"); root.classList.add("ready"); };
  if (reduce) start();
  else {
    const min = new Promise((r) => setTimeout(r, 1400));
    const loaded = new Promise((r) => (document.readyState === "complete" ? r() : addEventListener("load", r)));
    Promise.all([min, loaded]).then(start);
    setTimeout(start, 4500);
  }

  // parallax: hero image, wordmark drift, editorial images, lit words
  const hero = $("#heroImg"), mark = $(".mark"), imgs = [];
  let raf = 0;
  const frame = () => {
    raf = 0; const y = scrollY;
    if (!reduce) {
      hero.style.setProperty("--hy", `${Math.min(y, 800) * 0.22}px`);
      mark.style.setProperty("--mx", `${Math.min(y, 800) * -0.08}px`);
      const r = big.getBoundingClientRect(), p = Math.min(1, Math.max(0, (innerHeight * 0.9 - r.top) / (r.height + innerHeight * 0.5)));
      const n = Math.round(p * words.length); words.forEach((w, i) => w.classList.toggle("on", i < n));
      imgs.forEach((im) => { const b = im.parentElement.getBoundingClientRect(); if (b.bottom < 0 || b.top > innerHeight) return; im.style.setProperty("--py", `${(b.top + b.height / 2 - innerHeight / 2) * parseFloat(im.dataset.s)}px`); });
    }
  };
  addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(frame); }, { passive: true }); frame();
})();
