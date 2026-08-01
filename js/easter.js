/* =============================================================================
   K&S TRAVEL JOURNAL — SILICON VALLEY EASTER-EGG HUNT
   Faded emojis are hidden around the page. Click them to reveal a Pied Piper
   reference; a little HUD tracks how many you've found.
   ========================================================================== */
(function () {
  const EGGS = {
    piper: {
      title: 'Pied Piper',
      text: 'A compression company. I compressed all my love for you into this one place. 🥧'
    },
    commas: {
      title: 'Tres Commas',
      text: 'Tres Commas means a billion 🤑 — exactly the number of reasons I love you!'
    },
    anton: {
      title: 'Anton',
      text: 'Anton is back online. 🖥️ The server survived. Our uptime record: continuous since 2022, zero downtime.'
    },
    middleout: {
      title: 'Middle-Out',
      text: 'Middle-out compression engaged. 📦 My Weissman score for you: 5.2 — the theoretical maximum. 🚀'
    },
    hotdog: {
      title: 'SeeFood™',
      text: 'Running the “Not Hotdog” classifier… 🌭 → result: <span class="nothotdog">HOTDOG ✅</span> (it only knows two things, much like me before I met you).'
    }
  };

  let toastWrap;
  function showToast(title, html) {
    if (!toastWrap) {
      toastWrap = document.createElement('div');
      toastWrap.className = 'toast-wrap';
      document.body.appendChild(toastWrap);
    }
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = '<span class="toast-title">🥚 ' + title + '</span>' + html;
    toastWrap.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 400);
    }, 5200);
  }

  const tokens = Array.prototype.slice.call(document.querySelectorAll('.egg'));
  const total = tokens.length;
  if (!total) return;

  let found;
  try { found = new Set(JSON.parse(sessionStorage.getItem('kns-eggs') || '[]')); }
  catch (e) { found = new Set(); }

  // HUD
  const hud = document.createElement('div');
  hud.className = 'egg-hud';
  document.body.appendChild(hud);
  function renderHud() {
    const n = found.size;
    hud.innerHTML = '🥚 easter eggs · <b>' + n + '</b> / ' + total +
      '<span class="egg-hint">' +
        (n >= total
          ? 'you found them all. this guy <i>ships</i>. 🏆'
          : 'the show is full of secrets — so is this page. tap the faded emojis hiding around. 👀') +
      '</span>';
    hud.classList.toggle('complete', n >= total);
  }
  renderHud();

  function persist() {
    try { sessionStorage.setItem('kns-eggs', JSON.stringify(Array.prototype.slice.call(found))); } catch (e) {}
  }

  tokens.forEach(tok => {
    const id = tok.getAttribute('data-egg');
    if (found.has(id)) tok.classList.add('found');
    tok.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const egg = EGGS[id];
      if (egg) showToast(egg.title, egg.text);
      if (!found.has(id)) {
        found.add(id);
        tok.classList.add('found');
        persist();
        renderHud();
        if (found.size >= total) {
          setTimeout(() => showToast('Acquisition complete', 'All eggs found. Hooli tried to buy them. We said no. 🥧🏆'), 900);
        }
      }
    });
  });
})();
