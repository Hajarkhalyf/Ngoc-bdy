// Typing intro
const introText = [
  "> Ngọc",
  "> today is your birthday",
  "> So I made you this little program"
];

const introEl = document.getElementById("intro");
const cakePage = document.querySelector(".cake-page");
const miniGame = document.querySelector(".mini-game");
const floatingContainer = document.querySelector(".floating-emojis");
const finalPage = document.querySelector(".final-page");
const finalTextEl = document.getElementById("finalText");

let introIndex = 0;

function typeIntroLine(line, callback) {
  let i = 0;
  const lineEl = document.createElement("div");
  introEl.appendChild(lineEl);

  function typing() {
    if (i < line.length) {
      lineEl.innerHTML += line[i];
      i++;
      setTimeout(typing, 150); // slower typing
    } else {
      const dots = document.createElement("span");
      dots.classList.add("dots");
      dots.innerText = " . . . ";
      lineEl.appendChild(dots);
      setTimeout(callback, 1200);
    }
  }

  typing();
}

function nextIntroLine() {
  if (introIndex < introText.length) {
    typeIntroLine(introText[introIndex], () => {
      introIndex++;
      nextIntroLine();
    });
  } else {
    introEl.classList.add("hidden");
    showCakePage();
  }
}

// Cake page
function showCakePage() {
  cakePage.classList.remove("hidden");
  createConfetti(50);
  setTimeout(() => {
    cakePage.classList.add("hidden");
    showMiniGame();
  }, 5000);
}

// Confetti
function createConfetti(amount) {
  const container = document.querySelector(".confetti-container");
  for(let i=0;i<amount;i++){
    const c = document.createElement("div");
    c.classList.add("confetti");
    c.style.left = Math.random()*100+"%";
    c.style.backgroundColor = `hsl(${Math.random()*360},80%,60%)`;
    c.style.animationDuration = (3+Math.random()*2)+"s";
    container.appendChild(c);
  }
}

// Mini-game floating emojis
function showMiniGame() {
  miniGame.classList.remove("hidden");
  createFloatingEmojis(20);
  setTimeout(() => {
    miniGame.classList.add("hidden");
    showFinalPage();
  }, 15000);
}

function createFloatingEmojis(amount){
  const emojis = ["🍰","🎂","🎉","✨","💖"];
  const messages = ["Good gurl","Bravoo","Nicee","Amazing","Yaay"];
  for(let i=0;i<amount;i++){
    const e = document.createElement("div");
    e.classList.add("emoji");
    e.innerText = emojis[Math.floor(Math.random()*emojis.length)];
    e.style.left = Math.random()*90+"%";
    e.style.top = Math.random()*70+"vh";
    e.style.animationDuration = (5+Math.random()*5)+"s";
    floatingContainer.appendChild(e);
    e.addEventListener("click",()=>{popMessage(e,messages);});
  }
}

function popMessage(e,msgs){
  const m = document.createElement("div");
  m.classList.add("pop-message");
  m.innerText = msgs[Math.floor(Math.random()*msgs.length)];
  m.style.left = e.offsetLeft+"px";
  m.style.top = e.offsetTop+"px";
  document.body.appendChild(m);
  setTimeout(()=>m.remove(),1000);
}

// Final page with teddy bear + message
function showFinalPage(){
  finalPage.classList.remove("hidden");
  const message = `Happy Birthday, Ngọc! 💖
I made this with love for you 🫶✨
I hope today brings you lots of smiles and everything you enjoy.
Can’t wait to hang out and have our little movie break together 🍿
Wishing you a day as amazing as you are
- Hajar`;

  typeFinalMessage(message,finalTextEl,0);
}

function typeFinalMessage(text,el,i){
  if(i<text.length){
    el.innerHTML += text[i]==="\n"?"<br>":text[i];
    setTimeout(()=>typeFinalMessage(text,el,i+1), 100); // slower typing
  }
}

// Start
nextIntroLine();
