// Written with the help of Claude (Anthropic), an AI assistant; reviewed and tested by Fadl Maghniwi.
// Each question: text, options, index of the right option (counting from 0), explanation
const QUIZ = [
  { q: "Which part of Apollo 11's Eagle is still on the Moon today?",
    options: ["The whole Eagle", "Eagle's bottom half (descent stage)", "Nothing, it all came back"],
    answer: 1,
    why: "The top half flew the astronauts back to orbit; the bottom half stayed at Tranquility Base." },
  { q: "Opportunity was planned to work for about 90 days. How long did it explore Mars?",
    options: ["90 days", "About 2 years", "More than 14 years"],
    answer: 2,
    why: "It landed in January 2004 and last talked to Earth in June 2018." },
  { q: "What did astronaut Dave Scott drop on the Moon to show that things fall at the same speed without air?",
    options: ["A hammer and a feather", "Two rocks", "A ball and a balloon"],
    answer: 0,
    why: "With no air to slow the feather down, both hit the ground at the same time." },
  { q: "What was InSight built to study?",
    options: ["Only the weather on Mars", "The inside of Mars", "The moons of Mars"],
    answer: 1,
    why: "Its seismometer and heat probe studied the core, mantle and crust of Mars." },
  { q: "Which spacecraft was the first to reach interstellar space?",
    options: ["Voyager 1", "Viking 1", "Opportunity"],
    answer: 0,
    why: "Voyager 1 crossed into interstellar space in 2012." }
];

let qi = 0;      // which question we are on
let score = 0;

function renderQuestion() {
  const box = document.getElementById("quiz-box");

  if (qi >= QUIZ.length) {   // finished
    box.innerHTML = `<p class="quiz-q">You scored ${score} / ${QUIZ.length}! 🚀</p>
                     <button id="quiz-restart">Try again</button>`;
    document.getElementById("quiz-restart").onclick = () => { qi = 0; score = 0; renderQuestion(); };
    return;
  }

  const item = QUIZ[qi];
  box.innerHTML = `<p class="quiz-q">${qi + 1}. ${item.q}</p>` +
    item.options.map((opt, i) => `<button class="quiz-opt" data-i="${i}">${opt}</button>`).join("") +
    `<p id="quiz-feedback"></p>`;

  box.querySelectorAll(".quiz-opt").forEach(btn => btn.onclick = () => {
    const right = Number(btn.dataset.i) === item.answer;
    if (right) score++;
    box.querySelectorAll(".quiz-opt").forEach(b => {
      b.disabled = true;                                        // one try per question
      if (Number(b.dataset.i) === item.answer) b.classList.add("correct");
    });
    if (!right) btn.classList.add("wrong");
    document.getElementById("quiz-feedback").innerHTML =
      `${right ? "✅ Correct!" : "❌ Not quite."} ${item.why}<br><button id="quiz-next">Next</button>`;
    document.getElementById("quiz-next").onclick = () => { qi++; renderQuestion(); };
  });
}

renderQuestion();