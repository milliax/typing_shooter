import React, { useState, useEffect, useRef } from 'react'

import { useDispatch } from 'react-redux';
import { removeCardByWord } from '../store/reducer/gameSlice';
import { addScoreByAmount } from '../store/reducer/scoreSlice';

import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    cards: state.game.cards,
    timeRemain: state.game.timeRemain
})

function Fort({ ...props }) {
    const dispatch = useDispatch();

    const [angle, setAngle] = useState(0);
    const barrelRef = useRef(null);
    const [typedWord, setTypedWord] = useState('')
    const typedWordRef = useRef('');
    const wordListRef = useRef([]);
    const keyBoardClicked = (event) => {
        if (event.code.startsWith('Key')) {
            // this is letter clicked
            setTypedWord(p => p + event.code.slice(-1))
            typedWordRef.current = typedWordRef.current + event.code.slice(-1)
        } else if (event.code === 'Backspace') {
            setTypedWord(p => p.slice(0, -1))
            typedWordRef.current = typedWordRef.current.slice(0, -1)
        } else if (event.code === 'Enter') {
            submitWord(typedWordRef.current);
            setTypedWord('');
            typedWordRef.current = '';
        } else {
            console.log('nothing', event.code)
        }
        // switch (event.code) {
        //     case 'ArrowLeft':
        //         setAngle(angle => angle - 1)
        //         break;
        //     case 'ArrowRight':
        //         setAngle(angle => angle + 1)
        //         break;
        //     default:
        //         console.log('nothing')
        //         break;
        // }
    }

    useEffect(() => {
        // console.log('new event listeners')
        document.addEventListener('keydown', keyBoardClicked);
        return () => {
            document.removeEventListener('keydown', keyBoardClicked)
        }
    }, [])

    useEffect(() => {
        // console.log('new word list')
        wordListRef.current = props.cards.map((card) => card)
    }, [props.cards])

    const submitWord = (word) => {
        // verify
        let isWordExist = false;
        let c = null;
        for (let card of wordListRef.current) {
            if (card.word.toLowerCase() === word.toLowerCase()) {
                isWordExist = true;
                c = card;
                console.log(card)
                break;
            }
        }
        if (!isWordExist) {
            dispatch(addScoreByAmount(word.length * -1))
            console.log('word not exist')
            return;
        }
        console.log('rocked launched: ', word)
        // dispatch(setState('in_game'))

        // set degree
        const opposite_percent = (90 - ((c.spawnTime - props.timeRemain) * c.velocity)) / 100
        const neighbor_percent = (c.x - 50) / 100
        const degree = Math.atan(window.innerHeight / window.innerWidth * opposite_percent / neighbor_percent) * 2 / Math.PI * 100
        console.log("opposite percent", opposite_percent)
        console.log("neighbor percent", neighbor_percent)
        console.log('degree', degree)

        setAngle(degree > 0 ? 90 - degree : (90 + degree) * -1);

        dispatch(removeCardByWord(word))
        dispatch(addScoreByAmount(word.length * 2))
    }

    return (
        <React.Fragment>
            <img src="/image/cannon_foundation.png"
                className='absolute bottom-10 left-1/2 transform -translate-x-1/2 w-20 aspect-square z-20'
                alt="cannon foundation"
            />
            <img src="/image/cannon_barrel.png"
                className='absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 aspect-square z-10'
                alt="canon barrel"
                ref={barrelRef}
                style={{
                    rotate: `${angle}deg`,
                    transformOrigin: '0% 50%',
                }}
            />
            <div className='w-80 bg-neutral-50 rounded-lg h-10 absolute bottom-3 left-1/2 transform -translate-x-1/2'>
                <p className='text-center text-2xl'>{typedWord}</p>
            </div>
        </React.Fragment>
    )
}

export default connect(mapStateToProps)(Fort)