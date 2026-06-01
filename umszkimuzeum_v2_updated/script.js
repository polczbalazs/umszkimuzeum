/* =====================================================
   MÚZEUM — script.js
   Navbar · Reveal · Counter · Gallery · Modal · Quiz
   ===================================================== */

/* ── 1. NAVBAR ── */
const nav       = document.getElementById('mainNav');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveNav();
}, { passive: true });

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

function updateActiveNav() {
  const sections = ['hero', 'about', 'gallery', 'quiz'];
  let current = 'hero';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top < 100) current = id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

/* ── 2. REVEAL ON SCROLL — kikapcsolva (elemek mindig láthatók) ── */
// const revealObserver = new IntersectionObserver((entries) => {
//   entries.forEach((entry, i) => {
//     if (entry.isIntersecting) {
//       entry.target.style.transitionDelay = (i * 0.06) + 's';
//       entry.target.classList.add('visible');
//       revealObserver.unobserve(entry.target);
//     }
//   });
// }, { threshold: 0.12 });
// document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── 3. COUNTER ANIMATION ── */
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const increment = target / 80;
      const timer = setInterval(() => {
        current = Math.min(current + increment, target);
        el.textContent = Math.floor(current).toLocaleString('hu-HU');
        if (current >= target) clearInterval(timer);
      }, 20);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

/* ── 4. GALLERY FILTER ── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-card').forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
    });
  });
});

/* ── 5. MODAL ── */
const modalData = {
  modal1: {
    tag: 'Történelem',
    title: 'Középkori fegyvergyűjtemény',
    body: 'Gyűjteményünk egyik büszkesége ez az egyedülálló középkori fegyver- és páncélkollekció. A tárgyak valódi csatatereken használt, eredeti példányok, melyek 12–15. századi mesterek keze munkáját dicsérik. A kiállítás bemutatja a korabeli fegyverkészítés technikáját és a lovagi kultúra emlékét.',
    meta: ['<span><i class="bi bi-calendar3"></i> 12–15. század</span>', '<span><i class="bi bi-geo-alt"></i> 2. terem</span>']
  },
  modal2: {
    tag: 'Művészet',
    title: 'Barokk festészet',
    body: 'A barokk kor (1600–1750) leglenyűgözőbb festményei sorakoznak ezen a kiállításon. A drámai fény-árnyék hatások, az érzelmi intenzitás és a gazdag részletgazdagság jellemzi ezeket az alkotásokat.',
    meta: ['<span><i class="bi bi-calendar3"></i> 1600–1750</span>', '<span><i class="bi bi-geo-alt"></i> 3. terem</span>']
  },
  modal3: {
    tag: 'Tudomány',
    title: 'Az ipari forradalom',
    body: 'Az ipari forradalom gyökeresen megváltoztatta az emberiség életét. Kiállításunkon eredeti gőzgép-alkatrészek, korabeli gyári berendezések és interaktív modellek segítségével elevenedik meg ez az izgalmas korszak.',
    meta: ['<span><i class="bi bi-calendar3"></i> 19. század</span>', '<span><i class="bi bi-geo-alt"></i> 5. terem</span>']
  },
  modal4: {
    tag: 'Természet',
    title: 'Ősvilági élőlények',
    body: 'Több mint 65 millió évvel ezelőtt óriási lények járták a Földet. Kiállításunkban életnagyságú dinoszaurusz-csontvázak rekonstrukcióit, valódi ősmaradványokat és interaktív tablókat talál.',
    meta: ['<span><i class="bi bi-calendar3"></i> 65+ millió éve</span>', '<span><i class="bi bi-geo-alt"></i> 1. terem</span>']
  },
  modal5: {
    tag: 'Történelem',
    title: 'Antik térképészet',
    body: 'A világ felfedezésének izgalmas története bontakozik ki ezen a kiállításon. Korabeli pergamen- és réztáblás térképek mutatják, hogyan képzelték el őseink a Földet.',
    meta: ['<span><i class="bi bi-calendar3"></i> 15–18. század</span>', '<span><i class="bi bi-geo-alt"></i> 4. terem</span>']
  },
  modal6: {
    tag: 'Művészet',
    title: 'Hangszerek a múltból',
    body: 'Évszázados lantok, cembálók, fuvolák és vonóshangszerek gyűjteménye várja a látogatókat. QR-kódok segítségével meghallgathatja, hogyan szóltak ezek a hangszerek eredeti felvételeken.',
    meta: ['<span><i class="bi bi-calendar3"></i> 16–19. század</span>', '<span><i class="bi bi-geo-alt"></i> 6. terem</span>']
  },
  modal7: {
    tag: 'Tudomány',
    title: 'Az űrkutatás kora',
    body: 'Az Apollo misszióktól a Szputnyikig — az emberiség legmerészebb kalandja a csillagok felé. Eredeti műszerek, szkafanderek és dokumentumok teszik élővé az 1957–1972 közötti korszakot.',
    meta: ['<span><i class="bi bi-calendar3"></i> 1957–1972</span>', '<span><i class="bi bi-geo-alt"></i> 7. terem</span>']
  },
  modal8: {
    tag: 'Történelem',
    title: 'Ókori civilizációk',
    body: 'Az emberiség bölcsőjeként számontartott ókori kultúrák — görögök, rómaiak, egyiptomiak — lenyűgöző tárgyi emlékeit mutatja be ez a kiállítás. Eredeti leletek és életű rekonstrukciók segítik a megismerést.',
    meta: ['<span><i class="bi bi-calendar3"></i> Kr.e. 3000 – Kr.u. 400</span>', '<span><i class="bi bi-geo-alt"></i> 8. terem</span>']
  },
  modal9: {
    tag: 'Művészet',
    title: 'Reneszánsz szobrok',
    body: 'A reneszánsz kor (1400–1600) legjelentősebb kőfaragó mestereinek alkotásai — eredeti töredékek, másolatok és részletes dokumentáció alapján rekonstruált szobrok egyaránt megtalálhatók a gyűjteményben.',
    meta: ['<span><i class="bi bi-calendar3"></i> 1400–1600</span>', '<span><i class="bi bi-geo-alt"></i> 9. terem</span>']
  }
};

const overlay    = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.gallery-card[data-modal]').forEach(card => {
  card.addEventListener('click', () => {
    const data = modalData[card.dataset.modal];
    if (!data) return;
    document.getElementById('modalTag').textContent   = data.tag;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalBody').textContent  = data.body;
    document.getElementById('modalMeta').innerHTML    = data.meta.join('');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── 6. QUIZ ── */
const quizData = [
  {
    q: 'Melyik évben szállt az ember először a Holdra?',
    options: ['1961', '1969', '1972', '1965'],
    correct: 1,
    explain: 'Az Apollo 11 küldetés 1969. július 20-án szállt le a Holdon. Neil Armstrong volt az első ember, aki rálépett a Hold felszínére.'
  },
  {
    q: 'Ki festette a Sixtus-kápolna mennyezetét?',
    options: ['Leonardo da Vinci', 'Rafael', 'Michelangelo', 'Tiziano'],
    correct: 2,
    explain: 'Michelangelo 1508–1512 között festette meg a Sixtus-kápolna mennyezetét — egyike a világ legcsodálatosabb műalkotásainak.'
  },
  {
    q: 'Melyik civilizáció építette a piramisokat?',
    options: ['Maja', 'Egyiptomi', 'Mezopotámiai', 'Görög'],
    correct: 1,
    explain: 'Az ókori egyiptomiak építették a piramisokat, amelyek fáraóik síremlékeiként szolgáltak. A legismertebb a Gízai Nagy Piramis.'
  },
  {
    q: 'Ki fedezte fel az elektromágneses indukciót?',
    options: ['Thomas Edison', 'Nikola Tesla', 'Michael Faraday', 'James Watt'],
    correct: 2,
    explain: 'Michael Faraday 1831-ben fedezte fel az elektromágneses indukciót, amely az elektromos generátorok alapelve.'
  },
  {
    q: 'Mikor volt az ipari forradalom kezdete?',
    options: ['1600-as évek', '1700-as évek', '1800-as évek', '1500-as évek'],
    correct: 1,
    explain: 'Az ipari forradalom a 18. század második felében kezdődött Nagy-Britanniában, és a 19. században terjedt el Európában.'
  },
  {
    q: 'Hány évig tartott a százéves háború?',
    options: ['100 évig', '116 évig', '87 évig', '150 évig'],
    correct: 1,
    explain: 'A százéves háború valójában 116 évig tartott (1337–1453) Anglia és Franciaország között — neve ellenére nem pontosan száz év volt.'
  },
  {
    q: 'Ki volt az első ember, aki megkerülte a Földet?',
    options: ['Cristoforo Colombo', 'Vasco da Gama', 'Ferdinand Magellán', 'Juan Sebastián Elcano'],
    correct: 3,
    explain: 'Bár Magellán szervezte az expedíciót, ő maga meghalt Fülöp-szigeteken 1521-ben. Juan Sebastián Elcano volt az, aki ténylegesen visszaért Spanyolországba 1522-ben.'
  },
  {
    q: 'Milyen anyagból készültek a legelső írótáblák Mezopotámiában?',
    options: ['Papiruszból', '​Kőből', 'Agyagból', 'Fából'],
    correct: 2,
    explain: 'A sumérok agyagtáblákat használtak íráshoz. Az égetett agyag tartós anyag, ezért sok ilyen tábla máig fennmaradt.'
  }
];

let currentQ = 0, score = 0, answered = false;

function renderQuiz() {
  const q = quizData[currentQ];
  document.getElementById('quizQuestion').textContent = q.q;
  document.getElementById('quizCounter').textContent  = `${currentQ + 1} / ${quizData.length}`;
  document.getElementById('quizFeedback').textContent = '';
  document.getElementById('quizFeedback').className   = 'quiz-feedback';
  document.getElementById('quizNext').style.display   = 'none';
  document.getElementById('quizProgressFill').style.width = (currentQ / quizData.length * 100) + '%';
  answered = false;

  const opts = document.getElementById('quizOptions');
  opts.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className   = 'quiz-option';
    btn.textContent = opt;
    btn.addEventListener('click', () => selectAnswer(i, btn));
    opts.appendChild(btn);
  });
}

function selectAnswer(index, btn) {
  if (answered) return;
  answered = true;
  const q = quizData[currentQ];
  document.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);

  if (index === q.correct) {
    btn.classList.add('correct');
    score++;
    document.getElementById('quizFeedback').textContent = '✓ Helyes! ' + q.explain;
    document.getElementById('quizFeedback').classList.add('correct');
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('.quiz-option')[q.correct].classList.add('correct');
    document.getElementById('quizFeedback').textContent = '✗ Sajnos nem. ' + q.explain;
    document.getElementById('quizFeedback').classList.add('wrong');
  }

  const nextBtn = document.getElementById('quizNext');
  nextBtn.style.display = 'inline-flex';
  nextBtn.textContent = currentQ < quizData.length - 1 ? 'Következő →' : 'Eredmény megtekintése';
}

document.getElementById('quizNext').addEventListener('click', () => {
  currentQ++;
  if (currentQ < quizData.length) {
    renderQuiz();
  } else {
    showResult();
  }
});

function showResult() {
  document.getElementById('quizContainer').style.display = 'none';
  document.getElementById('quizResult').style.display    = 'block';
  document.getElementById('resultScore').textContent     = `${score} / ${quizData.length}`;
  const pct = score / quizData.length;
  let msg;
  if (pct === 1)      msg = '🏅 Tökéletes! Igazi múzeumi szakértő vagy!';
  else if (pct >= .8) msg = '🎉 Nagyon jó! Lenyűgöző a tudásod!';
  else if (pct >= .6) msg = '👍 Szép eredmény! Még egy kicsit tanulni érdemes.';
  else if (pct >= .4) msg = '📚 Ügyes kísérlet! Nézd meg a kiállításokat és próbáld újra!';
  else                msg = '🔍 Ne add fel! A múzeum segít többet megtudni!';
  document.getElementById('resultMsg').textContent = msg;
}

document.getElementById('quizRestart').addEventListener('click', () => {
  currentQ = 0; score = 0;
  document.getElementById('quizContainer').style.display = 'block';
  document.getElementById('quizResult').style.display    = 'none';
  renderQuiz();
});

renderQuiz();

/* ── 7. SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
