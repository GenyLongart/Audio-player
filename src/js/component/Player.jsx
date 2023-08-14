import React, {useState, useEffect, useRef} from "react";

const Player = () => {
    const [sounds,setSounds] = useState([]);
    const [currentSong,setCurrentSong] = useState([]);
    const [soundStatus,setSoundStatus] = useState("play");
    const [isActiveLi,setIsActiveLi] = useState(-1);
    const myAudio = useRef("");

    let soundsURL = "https://playground.4geeks.com/apis/fake/sound/";

    
    function getSounds() {
        fetch(soundsURL+'songs') 
            .then((response) => {
                return response.json()
            }) 
            .then((data) => { console.log(data); setSounds(data)})
            .catch((err) => console.log(err))
        myAudio.current.volume = "0.50"
    }

    function toggleAudio(position, audioURL, audioName) {
            setSoundStatus("pause")
            setIsActiveLi(position)
            setCurrentSong([position, audioName])
            myAudio.current.src = audioURL
            myAudio.current.play()
    }

    function previousSong() {
        if (currentSong[0] === 0) {
            toggleAudio(sounds.length-1, soundsURL+sounds[sounds.length-1].url, sounds[sounds.length-1].name)
            document.getElementsByClassName('list-group-item')[sounds.length-1].scrollIntoView()
        }else{
            toggleAudio(currentSong[0]-1, soundsURL+sounds[currentSong[0]-1].url, sounds[currentSong[0]-1].name)
            document.getElementsByClassName('list-group-item')[currentSong[0]-1].scrollIntoView()
        }
    }

    function nextSong() {
        if (currentSong[0] === sounds.length-1) {
            toggleAudio(0, soundsURL+sounds[0].url, sounds[0].name)
            document.getElementsByClassName('list-group-item')[0].scrollIntoView()
        }else{
            toggleAudio(currentSong[0]+1, soundsURL+sounds[currentSong[0]+1].url, sounds[currentSong[0]+1].name)
            document.getElementsByClassName('list-group-item')[currentSong[0]+1].scrollIntoView()
        }
    }

    function playPauseSong(opt) {
        if (opt === "pause"){
            setSoundStatus("play")
            myAudio.current.pause()
        }else if(opt === "play"){
            setSoundStatus("pause")
            myAudio.current.play()
        } 
    }
    
    useEffect(()=>{
        getSounds()
    },[])

	return (
		<div>
            <ul className="list-group rounded-0">
                {sounds.map((song, index)=>
                    <li key={index} onClick={() => toggleAudio(index, soundsURL+song.url, song.name)} role="button" className={+isActiveLi === index ? "list-group-item active" : "list-group-item bg-dark text-white"}><span className="text-secondary d-inline-block text-center" style={{width: "30px"}}>{index + 1}</span><span className="text-white mx-4">{song.name}</span></li>
                )}
            </ul>
            <div className="bg-dark position-sticky bottom-0 py-2 d-flex justify-content-center align-items-center">
                <div className="d-flex mx-4">
                    {/*controles*/}
                    <button type="button" className="btn btn-light rounded-circle mx-1" onClick={() => previousSong()}><i className="fas fa-step-backward"></i></button>
                    <button type="button" onClick={() => playPauseSong(soundStatus)} className="btn rounded-circle btn-light mx-1"><i className={soundStatus === "pause" ?"fas fa-pause"  : "fas fa-play"}></i></button>
                    <button type="button" className="btn rounded-circle btn-light mx-1" onClick={() => nextSong()}><i className="fas fa-step-forward"></i></button>
                </div>    
            </div>
            {/*Elemento donde se reproducirán las canciones*/}
            <audio ref={myAudio} src="" onEnded={() => nextSong()} type="audio" hidden></audio>
		</div>
	);
};

export default Player;