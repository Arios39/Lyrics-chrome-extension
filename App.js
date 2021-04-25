import './App.css';
import React, {useEffect, useState} from 'react';
import {getRandomTrack, getRandomLyric} from './lyrics';
import {Artists} from './Artists';

const randomNum = Math.floor(Math.random() * Math.floor(Artists.length))
export const Artist = Artists[randomNum]

function App() {
  const [errorFetchedChecker, setErrorFetchedChecker] = useState(false);
  const [lyric,SetLyric] = useState("");
  const [artist,SetArtist] = useState("");
  const [imgsrc,setImgsrc] = useState("");
  useEffect(()=>{
    fetch(`https://genius.p.rapidapi.com/search?q=${Artist}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "bc618b3879mshf3a5da4d9cb8f7cp1dac61jsnb1af9d1e88c3",
        "x-rapidapi-host": "genius.p.rapidapi.com"
      }
    }).then(res=>res.json())
    .then(response => {
      const data = response.response;
        const hits = data.hits
        const [track, cover,background] = getRandomTrack(hits);
        
        
        fetch(`https://api.lyrics.ovh/v1/${Artist}/${track}`,{
          "method": "GET"

        }).then(res=>res.json())
        .then(response => {
          const lyrics = response.lyrics.replace(new RegExp("\n","g"),"<br>")
          const obj=  lyrics.split("<br>")
          var result = Object.keys(obj).map((key) => [Number(key), obj[key]]);  
          const lyric =  getRandomLyric(result)
          if (lyric === ""){
            setErrorFetchedChecker(c => !c);
          }else{
            var div = document.getElementsByClassName('App');
            div[0].style.backgroundImage = `url(${background})`;
         
          setImgsrc(cover)
          SetLyric(lyric)
          SetArtist("- "+Artist)
          }
        }).catch(err => {
          setErrorFetchedChecker(c => !c);
          console.error(err);
        });



    })
    .catch(err => {
      console.error(err);
    });

  },[errorFetchedChecker]);

  return (
    
    <div className="App">
      <div className = "Card">
      <div className="image" >
      <img src={imgsrc}/>
      </div>
      <div className="texts"> 
      <h1>{lyric}</h1>
      <br/>
      <h3>{artist}</h3>
      </div>
      </div>
    </div>
  );
}

export default App;
