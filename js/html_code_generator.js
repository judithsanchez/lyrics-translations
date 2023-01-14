function replace_letters(string) {
  return string
    .trim()
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
    feedback_element.src =
      "https://bocaditosespanol.com/wp-content/uploads/2023/01/icon-thumbs-up.svg";
  } else {
    element.dataset.correct = "false";
    feedback_element.src =
      "https://bocaditosespanol.com/wp-content/uploads/2023/01/icon-thumbs-down.svg";
  }
}

async function checkVerseInputHandler(_, element) {
  console.log("in verse handler");
  const input = element.value;
  const lyrics = element.dataset.answer;

  // prevent API abuse
  if (input.length < 3 || input === element.dataset.lastattempt) {return;}

  const required_score = 0.70;
  const score = await check_sentence_similarity(element.value, element.dataset.answer);
  console.log(`Score: ${score}`);
  console.log(`Score > ${required_score}? ${score > required_score}`);
  console.log(`if statement: ${(input.toLowerCase() === lyrics.toLowerCase()) || score > required_score}`);
  if ((input.toLowerCase() === lyrics.toLowerCase()) || (score > required_score)) {
    console.log("correct!")
    element.style.backgroundColor = "green";
  } else {
    console.log("wrong :(")
    element.style.backgroundColor = "red";
  }

  // store the value we've called with to allow skipping logic
  element.dataset.lastattempt = input;
}

function create_verses(container_id, song, input_type) {
  const container_lyrics = document.getElementById(container_id);
  container_lyrics.innerHTML = " ";

  for (let i = 0; i < song.number_of_verses; i++) {
    const container_verse = document.createElement("div");
    container_verse.setAttribute("class", "verses");
    container_verse.setAttribute("id", `verse${i}`);
    container_lyrics.appendChild(container_verse);

    const button_translation = document.createElement("img");
    button_translation.setAttribute(
      "src",
      "https://bocaditosespanol.com/wp-content/uploads/2023/01/icon-translation-text.svg"
    );

    button_translation.setAttribute("class", "toggle_translations");
    button_translation.setAttribute(
      "onclick",
      `toggle_translation("verse_english${i}")`
    );
    container_verse.appendChild(button_translation);

    const container_verse_spanish = document.createElement("div");
    container_verse_spanish.setAttribute("class", "verses_spanish");
    container_verse.appendChild(container_verse_spanish);

    const feedback = document.createElement("img");
    feedback.setAttribute(
      "src",
      "https://bocaditosespanol.com/wp-content/uploads/2023/01/icon-thumbs-down.svg"
    );
    feedback.setAttribute("class", "feedbacks");
    container_verse.appendChild(feedback);

    const spanish_sentence = song.lyrics[i].spanish.split(" ");

    let random_number = (input_type === 'word')
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
        word_spanish.setAttribute("id", `input_answer${j}`);
        word_spanish.dataset.answer = spanish_sentence[j];
        word_spanish.dataset.correct = "false";

        word_spanish.addEventListener("input", (event) =>
          checkAnswerInputHandler(event, word_spanish, feedback)
        );
      }
      container_verse_spanish.appendChild(word_spanish);
    }

    if (input_type === 'lyrics') {
      const verse_translation = document.createElement("input");
      verse_translation.setAttribute("class", "input_lyrics");
      verse_translation.dataset.answer = song.lyrics[i].english;
      // can't do this as rapidly as input or we'll get blocked from the API
      verse_translation.addEventListener("blur", (event) =>
        checkVerseInputHandler(event, verse_translation)
      );
      container_verse.appendChild(verse_translation);
    }

    const verse_english = document.createElement("div");
    verse_english.setAttribute("class", "verses_english");
    verse_english.setAttribute("id", `verse_english${i}`);
    container_verse.appendChild(verse_english);

    const words_english = document.createElement("p");
    verse_english.appendChild(words_english);

    const english = document.createTextNode(song.lyrics[i].english);
    words_english.appendChild(english);
  }

  if (input_type === 'word') {
    const elements = document.querySelectorAll(".feedbacks");
    elements.forEach((element) => (element.style.visibility = "visible"));
  }
}

function toggle_translation(translation_id) {
  const verse_english = document.getElementById(translation_id);

  verse_english.style.display =
    verse_english.style.display === "flex" ? "none" : "flex";
}

async function check_sentence_similarity(translated_lyrics, user_sentence) {
  const response = await fetch('https://api-inference.huggingface.co/models/sentence-transformers/all-mpnet-base-v2', {
    method: 'POST',
    mode: 'cors',
    //headers: {
    //  'Authorization': 'Bearer ABC123,
    //},
    body: JSON.stringify({
      source_sentence: translated_lyrics,
      sentences: [user_sentence],
    }),
  });
  const scores = await response.json();
  return scores[0];
}
