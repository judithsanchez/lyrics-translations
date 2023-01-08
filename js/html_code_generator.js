function create_verses(container_id, song) {
  const container_lyrics = document.getElementById(container_id);

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

    const verse_spanish = document.createElement("p");
    verse_spanish.setAttribute("class", "verses_spanish");
    verse_spanish.setAttribute("id", `verse_spanish${i}`);
    container_verse.appendChild(verse_spanish);

    const spanish = document.createTextNode(song.lyrics[i].spanish);
    verse_spanish.appendChild(spanish);

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

create_verses("lyrics", song_juanes_camisa_negra);

function toggle_translation(translation_id) {
  const verse_english = document.getElementById(translation_id);

  verse_english.style.display =
    verse_english.style.display === "flex" ? "none" : "flex";
}
