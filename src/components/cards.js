import React, { useEffect, useRef } from 'react'
import words from '../words.json'

import { connect, } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addCard } from '../store/reducer/gameSlice'
import Card from './card'

const mapStateToProps = (state) => {
    return {
        gameState: state.game.state,
        cards: state.game.cards,
        timeRemain: state.game.timeRemain
    }
}

function Cards({ ...props }) {
    const dispatch = useDispatch()
    const timeRemainRef = useRef(props.timeRemain)

    useEffect(() => {
        const interval = setInterval(() => {
            // console.log('hola')
            if (props.gameState === 'in_game' && Math.random() < 0.003) {
                addNewCards(generateRandomWord());
            }
        }, 10);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        timeRemainRef.current = props.timeRemain
    }, [props.timeRemain])

    const addNewCards = (word) => {
        // console.log(props.timeRemain)
        // const timeRemain = useSelector(state => state.game.timeRemain)
        // console.log(props.timeRemain)
        dispatch(addCard({
            id: Date.now(),
            x: word.length > 8 ? (Math.random() * 70) : (Math.random() * 80),
            velocity: 1 + Math.random() * 3,
            word: word,
            spawnTime: timeRemainRef.current,
        }))
    }

    return (
        <React.Fragment>
            {props.cards.map((card, cnt) => {
                return (
                    <Card key={`${cnt}${card.word}`}
                        card={card}
                        className="absolute top-8 transform -translate-y-1/2 bg-white rounded-lg shadow-lg"
                    />
                )
            })}
        </React.Fragment>
    )
}

const generateRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)]
}

export default connect(mapStateToProps)(Cards)