class QuizCompletSentence {
  constructor(song_lyrics) {
    this.song_lyrics = song_lyrics;
  }
}

const quiz_camisa_negra = new QuizCompletSentence(
  song_juanes_camisa_negra.lyrics
);

console.log(quiz_camisa_negra);
