import React from "react"
import { useEffect, useRef } from "react"

import { connect, useDispatch } from 'react-redux'
import { setMusic } from "../store/reducer/gameSlice"

const mapStateToProps = (state) => {
    return {
        isPlaying: state.game.music
    }
}

function MusicPlayer({ ...props }) {
    // const audio = new Audio(`${process.env.PUBLIC_URL}/audio/bg_music.mp3`)
    const isPlayingRef = useRef(props.isPlaying)
    const audioRef = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        window.addEventListener('ended', playMusic(false))

        return () => {
            window.removeEventListener('ended', playMusic(false))
        }
    }, [])

    useEffect(() => {
        isPlayingRef.current = props.isPlaying
        playMusic()
    }, [props.isPlaying])

    const playMusic = () => {
        if (isPlayingRef.current) {
            try {
                console.log('play music')
                audioRef.current.play();
            } catch (err) {
                dispatch(setMusic(false))
            }
        }
        else {
            console.log('stop music')
            audioRef.current.pause();
            // audio.currentTime = 0;   
        }
    }

    return (
        <React.Fragment>
            <audio id="bg_music"
                src={`${process.env.PUBLIC_URL}/audio/bg_music.mp3`}
                loop
                // control={true}
                ref={audioRef}
            />
        </React.Fragment>
    )
}

export default connect(mapStateToProps)(MusicPlayer)