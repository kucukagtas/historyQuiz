function UI() {
  this.quiz_box = document.querySelector("#quiz-box");
  this.buttonBox = document.querySelector("#button-box");
  this.scoreBox = document.querySelector("#score-box");
  this.body = document.querySelector("#quiz-box #body");
  this.correctIcon = '<i class="bi bi-check-circle"></i>';
  this.inCorrectIcon = '<i class="bi bi-x-circle"></i>';
  this.btnNext = document.querySelector(".btn-next");
  this.btnReplay = document.querySelector(".btn-replay");
  this.btnQuit = document.querySelector(".btn-quit");
  this.btnStart = document.querySelector(".btn-start");
  this.timeText = document.querySelector(".time-text");
  this.timeSecond = document.querySelector(".time-second");
  this.timeLine = document.querySelector(".time-line");
  this.stepIndicators = document.querySelector(".step-indicators");
  this.liveScore = document.querySelector(".live-score");
  this.scorePoints = document.querySelector(".score-points");
  this.scoreBadge = document.querySelector(".score-badge");
}

UI.prototype.adimNoktalariOlustur = function (toplamSoru) {
  this.stepIndicators.innerHTML = "";
  for (let i = 0; i < toplamSoru; i++) {
    const dot = document.createElement("div");
    dot.classList.add("step-dot");
    dot.textContent = i + 1;
    this.stepIndicators.appendChild(dot);
  }
};

UI.prototype.adimGuncelle = function (soruIndex, durum) {
  const dots = this.stepIndicators.querySelectorAll(".step-dot");
  dots.forEach((dot, idx) => {
    if (idx === soruIndex) {
      dot.classList.remove("active", "correct", "incorrect");
      dot.classList.add(durum);
    }
  });
};

UI.prototype.soruGoster = function (soru) {
  // Body
  this.body.innerHTML = "";
  this.timeLine.style.width = "0%";

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // Title
  const title = document.createElement("h5");
  title.classList.add("question-title");
  title.textContent = soru.soruMetni;

  // Option List
  const optionList = document.createElement("div");
  optionList.classList.add("option-list");

  // Options
  for (let [key, value] of Object.entries(soru.cevapSecenekleri)) {
    const option = document.createElement("div");
    option.classList.add("option");
    option.dataset.key = key;

    option.addEventListener("click", optionSelected);

    const span = document.createElement("span");
    span.textContent = key + ") " + value;

    option.appendChild(span);
    optionList.appendChild(option);
  }

  cardBody.appendChild(title);
  cardBody.appendChild(optionList);

  this.body.appendChild(cardBody);
};

UI.prototype.aciklamaGoster = function (aciklamaMetni) {
  if (!aciklamaMetni) return;
  const existing = this.body.querySelector(".explanation-box");
  if (existing) {
    if (typeof existing.remove === "function") {
      existing.remove();
    } else if (existing.parentElement) {
      existing.parentElement.removeChild(existing);
    }
  }

  const box = document.createElement("div");
  box.classList.add("explanation-box");
  box.innerHTML = `<strong>💡 Historical Background:</strong> ${aciklamaMetni}`;

  const cardBody = this.body.querySelector(".card-body");
  if (cardBody) {
    cardBody.appendChild(box);
  }
};

UI.prototype.disableAllOption = function () {
  const options = document.querySelectorAll(".option");
  for (let option of options) {
    option.classList.add("disable");
  }
};

UI.prototype.dogruCevabiGoster = function (dogruCevap) {
  const options = document.querySelectorAll(".option");
  for (let option of options) {
    if (option.dataset.key === dogruCevap) {
      if (!option.classList.contains("correct")) {
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", this.correctIcon);
      }
    }
  }
};

UI.prototype.soruSayisiniGoster = function (soruSirasi, toplamSoru) {
  const etiket = `<span class="badge text-bg-danger"> ${soruSirasi} / ${toplamSoru} </span>`;
  document.querySelector(".question-index").innerHTML = etiket;
};

UI.prototype.puanGuncelle = function (puan) {
  if (this.liveScore) {
    this.liveScore.textContent = puan + " Points";
  }
};

UI.prototype.skoruGoster = function (dogruCevapSayisi, toplamSoru, toplamPuan) {
  let badgeHtml = "";
  if (dogruCevapSayisi === toplamSoru) {
    badgeHtml = '<span class="badge text-bg-warning">🏆 History Professor</span>';
  } else if (dogruCevapSayisi >= 4) {
    badgeHtml = '<span class="badge text-bg-success">🎖️ History Expert</span>';
  } else if (dogruCevapSayisi >= 3) {
    badgeHtml = '<span class="badge text-bg-info text-white">📚 History Enthusiast</span>';
  } else if (dogruCevapSayisi >= 1) {
    badgeHtml = '<span class="badge text-bg-secondary">📖 History Apprentice</span>';
  } else {
    badgeHtml = '<span class="badge text-bg-danger">🎯 Better Luck Next Time!</span>';
  }

  if (this.scoreBadge) {
    this.scoreBadge.innerHTML = badgeHtml;
  }
  if (this.scorePoints) {
    this.scorePoints.textContent = `Total Score: ${toplamPuan} Points`;
  }

  const etiket = `You answered <strong>${dogruCevapSayisi}</strong> out of <strong>${toplamSoru}</strong> questions correctly.`;
  document.querySelector(".score-text").innerHTML = etiket;
};
