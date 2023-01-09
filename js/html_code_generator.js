function inputHandler(_, element, feedback_element) {
  if (element.value.toLowerCase() === element.dataset.answer.toLowerCase()) {
    element.dataset.correct = "true";
    feedback_element.style.backgroundColor = "green";
  } else {
    element.dataset.correct = "false";
    feedback_element.style.backgroundColor = "red";
  }
}

function create_verses(container_id, song, generate_input = true) {
  const container_lyrics = document.getElementById(container_id);

  for (let i = 0; i < song.number_of_verses; i++) {
    const container_verse = document.createElement("div");
    container_verse.setAttribute("class", "verses");
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
        word_spanish.dataset.answer = spanish_sentence[j];
        word_spanish.dataset.correct = "false";
        word_spanish.addEventListener("input", (event) =>
          inputHandler(event, word_spanish, feedback)
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
}

function toggle_translation(translation_id) {
  const verse_english = document.getElementById(translation_id);

  verse_english.style.display =
    verse_english.style.display === "flex" ? "none" : "flex";
}
