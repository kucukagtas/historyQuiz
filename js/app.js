const soruListesi = [
  new Soru(
    "1) Which international treaty, signed in 1923, effectively nullified the Treaty of Sèvres and secured the international recognition of the new, independent Turkish State?",
    { a: "Treaty of Kars", b: "Treaty of Lausanne", c: "Treaty of Montreux", d: "Treaty of Mudanya" },
    "b",
    "The Treaty of Lausanne (July 24, 1923) effectively nullified the Treaty of Sèvres and secured the international recognition of the new Republic of Turkey and its National Pact (Misak-ı Millî) borders."
  ),
  new Soru(
    "2) During the structural transformation of the nascent Turkish State, the Grand National Assembly (TBMM) formally separated the Caliphate from the Sultanate and abolished the latter on November 1, 1922. What was the immediate diplomatic catalyst for this abrupt legislative action?",
    { a: "The outbreak of the Sheikh Said Rebellion in the eastern provinces.", b: "The dual invitation of both the Ankara and Istanbul governments to the Lausanne Peace Conference by the Entente powers.", c: "The signing of the Ankara Agreement with France.", d: "The official proclamation of the Republic and the election of Mustafa Kemal as president." },
    "b",
    "The Entente powers inviting both the Ankara (TBMM) and Istanbul governments to the Lausanne Conference accelerated the TBMM's decision to abolish the Sultanate on November 1, 1922, eliminating dual representation."
  ),
  new Soru(
    "3) The 1923 Population Exchange between Greece and Turkey (Mübadele) was a cornerstone demographic event of the early Republican era. According to the convention signed in Lausanne, what was the sole criterion used to determine which populations would be subjected to the compulsory exchange?",
    { a: "Spoken mother tongue", b: "Ethnic lineage and genetic heritage", c: "Religious affiliation", d: "Geographic proximity to the newly established borders" },
    "c",
    "The 1923 Population Exchange Convention signed in Lausanne used religious affiliation (Greek Orthodox and Turkish Muslims) as the sole criterion rather than language or ethnic lineage."
  ),
  new Soru(
    '4) In the First Grand National Assembly (1920–1923), deputies were broadly divided into the "First Group" (led by Mustafa Kemal) and the "Second Group." While both factions were united in their pursuit of national independence, what was the primary political characteristic of the Second Group?',
    { a: "They advocated for an immediate transition to a socialist, state-controlled economic model.", b: "They fiercely defended the absolute, unchecked authority of the executive branch and military tribunals.", c: "They were highly protective of parliamentary supremacy, deeply suspicious of centralized executive power, and highly critical of the Independence Tribunals (İstiklal Mahkemeleri).", d: "They favored a British mandate as a temporary measure to ensure the survival of the Anatolian resistance." },
    "c",
    "The Second Group in the First TBMM strictly defended parliamentary supremacy and legislative oversight, while strongly criticizing the unchecked concentration of executive power and the extraordinary authority of Independence Tribunals."
  ),
  new Soru(
    '5) Before adopting rigorous state-led industrialization (étatism/devletçilik) in the 1930s as a response to the Great Depression, the early Republic convened the İzmir Economic Congress in 1923. Which of the following best characterizes the economic paradigm endorsed during this initial congress?',
    { a: "A strict adherence to Soviet-style central planning and the complete nationalization of all agricultural and industrial enterprises.", b: "A mixed, liberal-leaning economy that encouraged private enterprise and foreign investment, provided it did not threaten the nation's political independence.", c: "An isolationist autarky that completely banned the importation of foreign manufactured goods and severed all ties with European markets.", d: "A highly decentralized, agrarian-only model that explicitly prohibited heavy industry in favor of transferring state monopolies to local landowners." },
    "b",
    "The 1923 İzmir Economic Congress endorsed a mixed, liberal-leaning economic model that welcomed foreign investment (provided it respected national sovereignty) and stimulated domestic private enterprise."
  ),
];

const quiz = new Quiz(soruListesi);
quiz.toplamPuan = 0;
const ui = new UI();

let counter = null;
let counterLine = null;
let currentRemainingTime = 10;



// Fisher-Yates Karıştırma Algoritması
function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function stopTimers() {
  if (counter) {
    clearInterval(counter);
    counter = null;
  }
  if (counterLine) {
    clearInterval(counterLine);
    counterLine = null;
  }
}

function startTimer(totalSeconds = 10) {
  if (counter) {
    clearInterval(counter);
  }

  currentRemainingTime = totalSeconds;
  ui.timeSecond.textContent = currentRemainingTime;
  ui.timeText.textContent = "Time Left";

  counter = setInterval(function () {
    currentRemainingTime--;

    if (currentRemainingTime >= 0) {
      ui.timeSecond.textContent = currentRemainingTime;
    }

    if (currentRemainingTime <= 0) {
      stopTimers();
      ui.timeText.textContent = "Time's Up";
      ui.timeSecond.textContent = "0";

      const soru = quiz.soruGetir();
      if (soru) {
        ui.dogruCevabiGoster(soru.dogruCevap);
        ui.aciklamaGoster(soru.aciklama);
      }

      ui.adimGuncelle(quiz.soruIndex, "incorrect");
      ui.disableAllOption();
      ui.btnNext.classList.add("show");
    }
  }, 1000);
}

function startTimerLine(totalSeconds = 10) {
  if (counterLine) {
    clearInterval(counterLine);
  }

  ui.timeLine.style.width = "0%";
  const intervalMs = 50;
  const totalSteps = (totalSeconds * 1000) / intervalMs;
  let currentStep = 0;

  counterLine = setInterval(function () {
    currentStep++;
    const percent = Math.min((currentStep / totalSteps) * 100, 100);
    ui.timeLine.style.width = percent + "%";

    if (currentStep >= totalSteps) {
      clearInterval(counterLine);
      counterLine = null;
    }
  }, intervalMs);
}

function optionSelected(e) {
  stopTimers();

  const selectedOption = e.currentTarget || e.target.closest(".option");
  if (!selectedOption) return;

  const cevap = selectedOption.dataset.key;
  const soru = quiz.soruGetir();
  if (!soru) return;

  if (soru.cevabiKontrolEt(cevap)) {
    quiz.dogruCevapSayisi += 1;
    // Puan: 100 Taban Puan + Kalan Saniye x 10 Hız Bonusu
    const kazanilanPuan = 100 + (Math.max(0, currentRemainingTime) * 10);
    quiz.toplamPuan += kazanilanPuan;
    ui.puanGuncelle(quiz.toplamPuan);

    selectedOption.classList.add("correct");
    selectedOption.insertAdjacentHTML("beforeend", ui.correctIcon);
    ui.adimGuncelle(quiz.soruIndex, "correct");
  } else {
    selectedOption.classList.add("incorrect");
    selectedOption.insertAdjacentHTML("beforeend", ui.inCorrectIcon);
    ui.dogruCevabiGoster(soru.dogruCevap);
    ui.adimGuncelle(quiz.soruIndex, "incorrect");
  }

  ui.aciklamaGoster(soru.aciklama);
  ui.disableAllOption();
  ui.btnNext.classList.add("show");
}

function startQuizRound() {
  quiz.sorular = shuffleArray(soruListesi);
  quiz.soruIndex = 0;
  quiz.dogruCevapSayisi = 0;
  quiz.toplamPuan = 0;
  stopTimers();

  ui.adimNoktalariOlustur(quiz.sorular.length);
  ui.adimGuncelle(0, "active");
  ui.puanGuncelle(0);

  ui.buttonBox.classList.remove("active");
  ui.scoreBox.classList.remove("active");
  ui.quiz_box.classList.add("active");
  ui.btnNext.classList.remove("show");

  ui.soruGoster(quiz.soruGetir());
  ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
  startTimer(10);
  startTimerLine(10);
}

ui.btnStart.addEventListener("click", function () {
  startQuizRound();
});

ui.btnNext.addEventListener("click", function () {
  stopTimers();
  ui.btnNext.classList.remove("show");

  quiz.soruIndex += 1;

  if (quiz.soruIndex < quiz.sorular.length) {
    ui.adimGuncelle(quiz.soruIndex, "active");
    ui.soruGoster(quiz.soruGetir());
    ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    startTimer(10);
    startTimerLine(10);
  } else {
    ui.quiz_box.classList.remove("active");
    ui.scoreBox.classList.add("active");
    ui.skoruGoster(quiz.dogruCevapSayisi, quiz.sorular.length, quiz.toplamPuan);
  }
});

ui.btnReplay.addEventListener("click", function () {
  startQuizRound();
});

ui.btnQuit.addEventListener("click", function () {
  stopTimers();
  window.location.reload();
});

// ==========================================================================
// Dark / Light Mode Theme Management
// ==========================================================================
const themeToggleBtn = document.querySelector("#theme-toggle");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("quiz_theme", theme);
  } catch (e) {
    // localStorage might be unavailable in restricted environments
  }

  if (themeToggleBtn) {
    const icon = themeToggleBtn.querySelector("i");
    if (icon) {
      if (theme === "dark") {
        icon.className = "bi bi-sun-fill text-warning";
      } else {
        icon.className = "bi bi-moon-stars-fill";
      }
    }
  }
}

// Initial theme detection: LocalStorage > System Preference
let savedTheme = null;
try {
  savedTheme = localStorage.getItem("quiz_theme");
} catch (e) {}

if (savedTheme) {
  applyTheme(savedTheme);
} else if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  applyTheme("dark");
} else {
  applyTheme("light");
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
  });
}
