function inputHandler(_, element) {
  if (element.value === element.dataset.answer) {
    element.dataset.correct = "true";
    document.getElementById("check_answer0").style.backgroundColor = "green";
  } else {
    element.dataset.correct = "false";
    document.getElementById("check_answer0").style.backgroundColor = "red";
  }
}

function create_verses(container_id, song) {
  const container_lyrics = document.getElementById(container_id);
  // let word_index = 0;

  for (let i = 0; i < song.number_of_verses; i++) {
    const container_verse = document.createElement("div");
    container_verse.setAttribute("class", "verses");
    container_verse.setAttribute("id", `verse${i}`);
    container_lyrics.appendChild(container_verse);

    const button_translation = document.createElement("span");
    button_translation.setAttribute("class", "toggle_translations");
    button_translation.setAttribute("id", `toggle_translation${i}`);
    button_translation.setAttribute(
      "onclick",
      `toggle_translation("verse_english${i}")`
    );
    container_verse.appendChild(button_translation);

    const container_verse_spanish = document.createElement("div");
    container_verse_spanish.setAttribute("class", "verses_spanish");
    container_verse_spanish.setAttribute("id", `verse_spanish${i}`);
    container_verse.appendChild(container_verse_spanish);

    const spanish_sentence = song.lyrics[i].spanish.split(" ");

    const random_number = i == 0 ? 3 : -1;

    for (let j = 0; j < spanish_sentence.length; j++) {
      let word_spanish;
      if (j !== random_number) {
        word_spanish = document.createElement("p");
        word_spanish.setAttribute("class", "spanish_words");
        const word = document.createTextNode(spanish_sentence[j]);
        word_spanish.appendChild(word);
      } else {
        word_spanish = document.createElement("input");
        word_spanish.dataset.answer = "negra";
        word_spanish.dataset.correct = "false";
        word_spanish.addEventListener("input", (event) =>
          inputHandler(event, word_spanish)
        );
      }
      container_verse_spanish.appendChild(word_spanish);
    }

    const check_answer = document.createElement("span");
    check_answer.setAttribute("class", "check_answers");
    check_answer.setAttribute("id", `check_answer${i}`);
    container_verse.appendChild(check_answer);

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

// song_juanes_camisa_negra.lyrics[0].spanish.split(" ")
// ['Tengo', 'la', 'camisa', 'negra']
