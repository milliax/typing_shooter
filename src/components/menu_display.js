import React from 'react'
import Layout from "./layout";

import settings from '../settings.config'

import { useDispatch, connect } from "react-redux";
import { setState } from "../store/reducer/gameSlice";

const mapStateToProps = (state) => {
    return {
        timeRemain: state.game.timeRemain
    };
}

function MenuDisplay({ ...props }) {
    const dispatch = useDispatch();

    return (
        <Layout>
            <div className="w-full h-full flex flex-row items-center justify-center">
                <div className="bg-neutral-100 w-80 my-auto py-3 rounded-md flex flex-col items-center">
                    {['Resume', 'New Game', 'Settings', 'References'].map((text) => (
                        <React.Fragment key={text}>
                            {(text === 'Resume' && (props.timeRemain === settings.gameTime || props.timeRemain < 0)) ||
                                <div className="w-72 h-12 text-center text-2xl text-neutral-900 hover:rounded-lg hover:bg-neutral-200 hover:shadow-lg cursor-pointer hover:border-2 border-black flex flex-col justify-center" onClick={() => {
                                    if (["load_game"].includes(text.toLowerCase().replace(" ", "_"))) {
                                        // prevent the user from accessing unfinished features
                                        alert("This feature is not yet implemented.");
                                        return;
                                    }
                                    // setGameState(text.toLowerCase().replace(" ", "_"))
                                    dispatch(setState(text.toLowerCase().replace(" ", "_")))
                                }} >
                                    {text}
                                </div>
                            }
                        </React.Fragment>
                    ))}
                </div>
            </div >
        </Layout>
    )
}

export default connect(mapStateToProps)(MenuDisplay);