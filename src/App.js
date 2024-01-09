import { useState, useEffect, useRef } from "react"

import MenuDisplay from "./components/menu_display";
import References from "./components/references";
import Game from "./components/in_game";
import SettingsPage from "./components/settings";

import settings from './settings.config'
import MusicPlayer from "./components/music";

import { useDispatch } from 'react-redux'
import { DecreaseTimeRemain, setState, setTimeRemain as setStoreTimeRemain } from "./store/reducer/gameSlice";
import { connect } from "react-redux";
import { setHighestScore, setScore } from "./store/reducer/scoreSlice";

const mapStateToProps = (state) => {
    return {
        gameState: state.game.state,
        timeRemain: state.game.timeRemain,
        score: state.score.score,
    };
}

function App(props) {
    const [isPlaying, setIsPlaying] = useState(false);
    const timerRef = useRef(null);
    const scoreRef = useRef(0);
    const dispatch = useDispatch()
    const timeRemainRef = useRef(props.timeRemain)

    useEffect(() => {
        console.log(props.gameState)
        switch (props.gameState) {
            case "new_game":
                if (timeRemainRef.current === settings.gameTime || window.confirm("Are you sure you want to start a new game?")) {
                    dispatch(setStoreTimeRemain(settings.gameTime))
                    setTimeout(() => {
                        startCountDown()
                    }, 10)
                    dispatch(setState("in_game"))
                    dispatch(setScore(0))
                } else {
                    dispatch(setState("menu"))
                }
                break;
            case "resume":
                dispatch(setState("in_game"))
                startCountDown();
                break;
            case "finish":
                dispatch(setState("menu"))
                dispatch(setHighestScore(scoreRef.current))
                dispatch(setScore(0))
                break;
            // case "exit":
            //     window.opener = null;
            //     window.open("", "_self");
            //     window.close();
            //     break;
            case "settings":
                break;
            case "references":
                break;
            case 'menu':
                // stop timer
                clearInterval(timerRef.current)
                timerRef.current = null
                break;
            case "in_game":
                break;
            default:
                console.log(props.gameState, 'not defined')

        }
    }, [props.gameState])

    useEffect(() => {
        // Prevents the user from leaving the page accidentally
        window.addEventListener("beforeunload", relaod_handler)
        return () => {
            window.removeEventListener("beforeunload", relaod_handler)
        }
    }, [])

    useEffect(()=>{
        timeRemainRef.current = props.timeRemain
    },[props.timeRemain])

    useEffect(() => {
        scoreRef.current = props.score
    }, [props.score])

    const startCountDown = () => {
        timerRef.current = setInterval(() => {
            if (timeRemainRef.current <= 0) {
                dispatch(setState("finish"))
                clearInterval(timerRef.current)
                alert('Time is up!')
            }
            dispatch(DecreaseTimeRemain())
        }, 1000)
    }

    const relaod_handler = (event) => {
        event.preventDefault();
        event.returnValue = "";
    }

    return (
        <div className="w-[100vw] h-[100vh] p-1 bg-gradient-to-tr from-black to-gray-900 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-tr from-black to-gray-900 mx-auto mb-auto">
                {props.gameState === "menu" && <MenuDisplay
                />}
                {props.gameState === "in_game" && <Game
                />}
                {props.gameState === "references" && <References
                />}
                {props.gameState === 'settings' && <SettingsPage
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                />}
            </div>
            <MusicPlayer isPlaying={isPlaying} />
        </div>
    )
}



export default connect(mapStateToProps)(App);
