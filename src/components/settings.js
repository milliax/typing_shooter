import { XMarkIcon } from "@heroicons/react/24/solid";
import Layout from "./layout";
import React from "react";

import clsx from "clsx";

import { useDispatch, useSelector } from "react-redux";
import { setState, setMusic } from "../store/reducer/gameSlice";

export default function SettingsPage({ ...props }) {
    const isPlaying = useSelector((state) => state.game.music);
    const dispatch = useDispatch();

    return (
        <Layout>
            <div className="w-full h-full flex flex-col justify-center items-center ">
                <div className="bg-neutral-100 rounded-md w-80 relative">
                    <h1 className="text-center py-5">設定</h1>
                    <XMarkIcon className="w-6 absolute top-5 right-5 cursor-pointer hover:scale-125 hover:text-red-600" onClick={() => {
                        // setGameState('menu')
                        dispatch(setState('menu'))
                    }} />
                    <div className="py-5 px-3">
                        <SettigsItem title="播放音樂">
                            <OnOffSwitch
                                state={isPlaying}
                                setState={(value) => { dispatch(setMusic(value)) }}
                            />
                        </SettigsItem>
                    </div>
                </div>
            </div>

        </Layout>
    )
}


const SettigsItem = ({ title, children }) => {
    return (
        <div className="flex flex-row w-full justify-between">
            <h1>{title}</h1>
            <div>
                {children}
            </div>
        </div>
    )
}

const OnOffSwitch = ({ state, setState }) => {
    return (
        <React.Fragment>
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
                <input type="checkbox" value={state} className="sr-only peer" onClick={() => {
                    console.log(state)
                    setState(!state)
                }} />
                <div className={clsx(
                    "w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600",
                    state ? "bg-blue-600 after:translate-x-full after:border-white" : "bg-gray-200"
                )} />
                {/* <span class="ms-3 text-sm font-medium text-gray-400 dark:text-gray-500">Disabled toggle</span> */}
            </label>
        </React.Fragment>
    )
}