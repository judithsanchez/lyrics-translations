class Song {
  constructor({ title, singer, album, spotify, youtube, lyrics }) {
    this.title = title;
    this.singer = singer;
    this.album = album;
    this.spotify = spotify;
    this.youtube = youtube;
    this.lyrics = lyrics;
    this.number_of_verses = lyrics.length;
  }
}
