// Hlavní hra

// Pole s otázkami a uvnitř objekty jako otázky
const questions = [
  {
      question: "Co je CBD zkratkou?",
      answers: ["Cannabidiol", "Cannabis", "Cannabigerol"],
      correctAnswer: "Cannabidiol",
  },
  {
      question: "Která část rostliny Cannabis obsahuje nejvíce CBD?",
      answers: ["Květy", "Kořeny", "Listy"],
      correctAnswer: "Květy",
  },
  {
      question: "Jaký je hlavní účinek CBD?",
      answers: ["Psychoaktivní", "Uklidňující", "Euforizující"],
      correctAnswer: "Uklidňující",
  },
  {
      question: "V jakém roce vyšlo album Yzomandias?",
      answers: ["2015", "2018", "2016"],
      correctAnswer: "2015",
  },
  {
      question: "Jaká písnička není v albu Yzomandias?",
      answers: ["Zlato", "NahoruDolu", "Hvshthvg"],
      correctAnswer: "NahoruDolu",
  },
  {
      question: "Na jaké z těchto písniček má feat Karlo? #FREEKARLO",
      answers: ["How High 3", "Bye Bye", "Loupež"],
      correctAnswer: "Loupež",
  },
  {
      question: "V jaké písničce se nachází tento text? ´Díky těm věcem, co se dějou, už přestávám cejtit v žilách life´",
      answers: ["Nikdy už nebudu Ok", "FREE KARLO", "Rodinnej Typ"],
      correctAnswer: "FREE KARLO",
  },
  {
      question: "Doplň text: ´Kdy jsi byl naposled u Tří prasátek?´",
      answers: ["Hejtuj hru, nehejtuj hráče", "Pomalej seš, ty nemáš náběh", "A ty máš problém se mnou, tak žaluj mě nebo žaluj mámě"],
      correctAnswer: "Pomalej seš, ty nemáš náběh",
  },
  {
      question: "Kdo se nenachází na albu Yzomandias II?",
      answers: ["Lvcas Dope", "Karlo", "Doktor601"],
      correctAnswer: "Lvcas Dope",
  },
  {
      question: "Ve kterém tracku se neobjevuje Nik Tendo?",
      answers: ["Odpočívej v Pokoji", "Hlad", "NEVÍŠ NIC pt. 1"],
      correctAnswer: "Odpočívej v Pokoji",
  },
  {
    question: "Kteří dva interpreti se nacházejí na tracku číslo 13.VÁHY?",
    answers: ["Lvcas Dope, CBCH", "Jickson, Hasan", "Saul, Zkrat"],
    correctAnswer: "Saul, Zkrat",
  },
  {
    question: "Doplň, jak pokračuje text v tracku JÁN JÁKOBY vs SVĚT -  ´Yzo dal Vary na mapu´",
    answers: ["Legenda budu jak Guwop", "Koukej mama, všechno to klaplo", "Jediný, co chci, je moolah"],
    correctAnswer: "Koukej mama, všechno to klaplo",
  },
  {
    question: "Kolik tracku se nachází na YZOMANDIAS II: Zpátky na svojí planetu?",
    answers: ["13", "8", "19"],
    correctAnswer: "13",
  },
  {
    question: "Která z těchto vybraných písní je nejkratší?",
    answers: ["Flexim jako gott", "Pod vlivem skit", "Cykloskit"],
    correctAnswer: "Pod vlivem skit",
  },
  {
    question: "Kdo z beatmakeru dělal všechny beaty? na YZOMANDIAS II: Zpátky na svojí planetu?",
    answers: ["Nobodylisten", "HAARP", "Decky"],
    correctAnswer: "Decky",
  }
];


// Proměnné pro sledování aktuální otázky a počtu bodů
let currentQuestionIndex = 0;
let seedCount = 0;

// Const pro různé DOM elementy a manipulaci s HTML
const startButton = document.getElementById("start-button");
const introContainer = document.getElementById("intro-container");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-button");
const seedCountText = document.getElementById("seed-count");
const resetButton = document.getElementById("reset-button");
const playerNameInput = document.getElementById("player-name-input");
const nameSubmitButton = document.getElementById("name-submit-button");
const gameContainer = document.getElementById("game-container");
const welcomeBox = document.createElement("div");

// Listener pro odeslání jména hráče
nameSubmitButton.addEventListener("click", function() {
  // Získání jména hráče z inputu
  const playerNameInput = document.getElementById("player-name-input");
  const playerName = playerNameInput.value.trim();

  // Kontrola, zda hráč zadal jméno
  if (playerName !== "") {
      // Skrytí formuláře pro zadání jména a zobrazení hry
      document.getElementById("name-input-container").style.display = "none";
      gameContainer.style.display = "block";

      // Přivítání hráče s jeho jménem
      welcomeBox.textContent = `Vítám tě, ${playerName}, zajímá tě to, co je neznámé, tajemné, nevysvětlitelné, proto jsi přece tady. A my teď poprvé řekneme celou pravdu o tom, co se stalo.`;
      welcomeBox.id = "welcome-box";
      welcomeBox.classList.add("welcome-box");
      gameContainer.insertBefore(welcomeBox, gameContainer.firstChild);

      // Skrytí přivítacího textu po pěti sekundách
      setTimeout(function() {
          welcomeBox.style.display = "none";

          // Zobrazení jména hráče nad hrou
          const playerNameDiv = document.createElement("div");
          playerNameDiv.textContent = `Jméno hráče: ${playerName}`;
          playerNameDiv.id = "nameofUser";
          document.getElementById("game-container").insertBefore(playerNameDiv, document.querySelector(".title"));
      }, 5000);
  } else {
      // Upozornění na zadání jména, pokud není vyplněno
      alert("Napiš své jméno:");
  }
});

// Událost pro spuštění hry po kliknutí na tlačítko Start
startButton.addEventListener("click", startGame);
// Událost pro resetování hry po kliknutí na tlačítko Reset
resetButton.addEventListener("click", resetGame);

// Funkce pro přehrávání úvodní hudby hry
const introMusic = new Audio('krajni.mp3');

function playIntroMusic() {
    introMusic.play();
}

// Funkce pro zastavení přehrávání úvodní hudby hry
function stopIntroMusic() {
    introMusic.pause();
    introMusic.currentTime = 0;
}

// Funkce pro spuštění hry
function startGame() {
    // Skrytí jména hráče
    document.getElementById("nameofUser").style.display = "none";
    // Skrytí tlačítka Start
    startButton.style.display = "none";
    // Zobrazení úvodního kontejneru
    introContainer.style.display = "block";
    // Resetování počtu bodů a indexu aktuální otázky
    seedCount = 0;
    currentQuestionIndex = 0;
    // Aktualizace první otázky
    updateQuestion();

    // Spuštění úvodní hudby
    playIntroMusic();

    // Skrytí úvodního kontejneru po 8 sekundách
    setTimeout(function() {
        introContainer.style.display = "none";
        // Zobrazení kontejneru s otázkami
        questionContainer.style.display = "block";
        // Zastavení přehrávání úvodní hudby
        stopIntroMusic();
    }, 8000);
}

// Funkce pro aktualizaci otázky, používá if a else
function updateQuestion() {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    // Zobrazení textu aktuální otázky
    questionText.textContent = question.question;
    // Nastavení odpovědí na tlačítkách, použivá cyklus for 
    for (let i = 0; i < 3; i++) {
      answerButtons[i].textContent = question.answers[i];
      // Přidání posluchače událostí pro ověření odpovědi
      answerButtons[i].addEventListener("click", checkAnswer);
    }
  } else {
    // Konec hry, pokud jsou zodpovězeny všechny otázky
    endGame();
  }
}

// Funkce pro ověření zodpovězené otázky
function checkAnswer(event) {
  const selectedAnswer = event.target.textContent;
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  // Zvýšení počtu bodů, pokud je odpověď správná
  if (selectedAnswer === correctAnswer) {
    seedCount++;
    // Aktualizace zobrazení počtu bodů
    seedCountText.textContent = seedCount;
  }

  // Přechod na další otázku
  currentQuestionIndex++;
  // Konec hry, pokud je dosaženo maximálního počtu bodů
  if (seedCount === 15) {
    endGame();
  } else {
    // Aktualizace další otázky
    updateQuestion();
  }
}

// Funkce pro ukončení hry
function endGame() {
  // Skrytí kontejneru s otázkami
  questionContainer.style.display = "none";
  // Selektory pro kontejner s videem a zprávami
  const videoContainer = document.getElementById("video-container");
  const message = document.getElementById("message");
  const message2 = document.getElementById("message2");

  // Selektor pro tlačítko pro restart hry
  const restartButton = document.getElementById("restart-button");

  // Zobrazení zprávy pro hráče podle počtu bodů
  if (seedCount <= 5) {
    // Zobrazení videa a zprávy pro hráče s nízkým počtem bodů
    videoContainer.style.display = "block";
    videoContainer.style.textAlign = "center";
    message.textContent = "Ty jsi úplně mimo, zkus to znovu.";
    restartButton.style.display = "block";
  } else if (seedCount >= 6 && seedCount <= 14) {
    // Zobrazení zprávy pro hráče s průměrným počtem bodů
    const midMessage = document.getElementById("mid-message");
    midMessage.style.display = "block";
    midMessage.style.textAlign = "center";
    message2.textContent = "Nejsi marný. Chce to jen mnohem více tréninku!";
    restartButton.style.display = "block"; 
  } else if (seedCount === 15) {
    // Zobrazení zprávy pro hráče s maximálním počtem bodů
    const winMessage = document.getElementById("win-message");
    winMessage.style.display = "block"; 
    // Přehrání zvukového efektu pro vítěze
    playWinSound(); 
  }
}

// Funkce pro přehrávání zvukového efektu pro vítěze
const winSound = new Audio('beat.mp3');

function playWinSound() {
  winSound.play();
}

// Funkce pro resetování hry
function resetGame() {
  location.reload(); // Refresh stránky (Díky stackoverflow)
}
