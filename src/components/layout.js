import { useEffect } from "react"
import Timer from "./timer"

import { useSelector } from 'react-redux'
// import { setScore, setHighestScore } from '../store/reducer/scoreSlice'

export default function Layout({ children }) {
    const score = useSelector(state => state.score.score)
    const historyHigh = useSelector(state => state.score.highestScore)
    const timeRemain = useSelector(state => state.game.timeRemain)

    useEffect(() => {
        console.log("score:", score)
        console.log("history high:", historyHigh)
    }, [])

    return (
        <div className="w-full h-full relative">
            <div className="absolute top-3 left-3">
                <Timer timeRemain={timeRemain} />
            </div>
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex flex-row justify-between w-80">
                {/* Scoreboard */}
                <div className="bg-neutral-100 w-36 bg-opacity-60 rounded-sm h-12">
                    <h1 className="text-center">History High</h1>
                    <h1 className="text-center">{historyHigh}</h1>
                </div>
                <div className="bg-neutral-100 w-36 bg-opacity-60 rounded-sm h-12">
                    <h1 className="text-center">Score</h1>
                    <h1 className="text-center">{score}</h1>
                </div>
            </div>
            {children}
        </div>
    )
}