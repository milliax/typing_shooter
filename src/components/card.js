import { useEffect } from 'react'
import clsx from 'clsx'

import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { removeCard } from '../store/reducer/gameSlice'
import { addScoreByAmount } from '../store/reducer/scoreSlice'

const mapStateToProps = (state) => ({
    // gameState: state.game.state,
    timeRemain: state.game.timeRemain
})

function Card({ card, className, ...props }) {
    const dispatch = useDispatch()

    useEffect(() => {
        // console.log(card.spawnTime)
        if ((card.spawnTime - props.timeRemain) * card.velocity > 80) {
            console.log('remove card')
            dispatch(removeCard(card.id))
            dispatch(addScoreByAmount(card.word.length * -5))
        }
    }, [props.timeRemain])

    return (
        <div className={clsx(
            className,
            "px-3 py-1"
        )}
            style={{
                left: `${card.x}%`,
                top: `${(card.spawnTime - props.timeRemain) * card.velocity + 5}%`,
            }}
        >
            <p className="text-center text-4xl">{card.word}</p>
        </ div >
    )
}

export default connect(mapStateToProps)(Card)