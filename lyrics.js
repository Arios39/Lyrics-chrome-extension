
export const getRandomTrack = (tracks)=>{
    const randomNum = Math.floor(Math.random() * Math.floor(tracks.length));
    const track = tracks[randomNum].result.title
    const cover = tracks[randomNum].result.song_art_image_thumbnail_url
    const background = tracks[randomNum].result.header_image_url
    return [track, cover,background];
};

export const getRandomLyric = (lyrics)=>{
    const randomNum = Math.floor(Math.random() * Math.floor(lyrics.length));
    const lyric = lyrics[randomNum][1]
    return lyric;
}






