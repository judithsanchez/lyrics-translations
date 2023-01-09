function replace_letters(string) {
  return string
    .toLowerCase()
    .replace(/[aeiou]/g, (vowel) => "áéíóú"["aeiou".indexOf(vowel)])
    .replace(/ñ/g, "n")
    .replace(/ü/g, "u");
}

function checkAnswerInputHandler(_, element, feedback_element) {
  if (
    replace_letters(element.value) === replace_letters(element.dataset.answer)
  ) {
    element.dataset.correct = "true";
    feedback_element.style.backgroundColor = "#6DEEBB";
  } else {
    element.dataset.correct = "false";
    feedback_element.style.backgroundColor = "#DB4D89";
  }
}

function create_verses(container_id, song, generate_input) {
  const container_lyrics = document.getElementById(container_id);
  container_lyrics.innerHTML = " ";

  for (let i = 0; i < song.number_of_verses; i++) {
    const container_verse = document.createElement("div");
    container_verse.setAttribute("class", "verses");
    container_verse.setAttribute("id", `verse${i}`);
    container_lyrics.appendChild(container_verse);

    const button_translation = document.createElement("span");
    button_translation.setAttribute("class", "toggle_translations");
    button_translation.setAttribute(
      "onclick",
      `toggle_translation("verse_english${i}")`
    );
    container_verse.appendChild(button_translation);

    const container_verse_spanish = document.createElement("div");
    container_verse_spanish.setAttribute("class", "verses_spanish");
    container_verse.appendChild(container_verse_spanish);

    const feedback = document.createElement("span");
    feedback.setAttribute("class", "feedbacks");
    container_verse.appendChild(feedback);

    const spanish_sentence = song.lyrics[i].spanish.split(" ");

    let random_number = generate_input
      ? Math.floor(Math.random() * spanish_sentence.length)
      : -1;

    for (let j = 0; j < spanish_sentence.length; j++) {
      let word_spanish;
      if (j !== random_number) {
        word_spanish = document.createElement("p");
        const word = document.createTextNode(spanish_sentence[j]);
        word_spanish.appendChild(word);
      } else {
        word_spanish = document.createElement("input");
        word_spanish.setAttribute("class", "input_answers");
        word_spanish.dataset.answer = spanish_sentence[j];
        word_spanish.dataset.correct = "false";
        word_spanish.addEventListener("input", (event) =>
          checkAnswerInputHandler(event, word_spanish, feedback)
        );
      }
      container_verse_spanish.appendChild(word_spanish);
    }

    const verse_english = document.createElement("p");
    verse_english.setAttribute("class", "verses_english");
    verse_english.setAttribute("id", `verse_english${i}`);
    container_verse.appendChild(verse_english);

    const english = document.createTextNode(song.lyrics[i].english);
    verse_english.appendChild(english);
  }

  // I NEED TO FIX THIS

  const video0 = document.getElementById("video0");
  const verse0 = document.getElementById("verse0");
  verse0.parentNode.insertBefore(video0, verse0);
  video0.style.display = "flex";

  const video1 = document.getElementById("video1");
  const verse4 = document.getElementById("verse4");
  verse4.parentNode.insertBefore(video1, verse4);
  video1.style.display = "flex";

  const video2 = document.getElementById("video2");
  const verse8 = document.getElementById("verse8");
  verse8.parentNode.insertBefore(video2, verse8);
  video2.style.display = "flex";

  const video3 = document.getElementById("video3");
  const verse12 = document.getElementById("verse12");
  verse12.parentNode.insertBefore(video3, verse12);
  video3.style.display = "flex";

  const video4 = document.getElementById("video4");
  const verse16 = document.getElementById("verse16");
  verse16.parentNode.insertBefore(video4, verse16);
  video4.style.display = "flex";

  const video5 = document.getElementById("video5");
  const verse24 = document.getElementById("verse24");
  verse24.parentNode.insertBefore(video5, verse24);
  video5.style.display = "flex";

  const video6 = document.getElementById("video6");
  const verse31 = document.getElementById("verse31");
  verse31.parentNode.insertBefore(video6, verse31);
  video6.style.display = "flex";

  const video7 = document.getElementById("video7");
  const verse39 = document.getElementById("verse39");
  verse39.parentNode.insertBefore(video7, verse39);
  video7.style.display = "flex";
}

function toggle_translation(translation_id) {
  const verse_english = document.getElementById(translation_id);

  verse_english.style.display =
    verse_english.style.display === "flex" ? "none" : "flex";
}
