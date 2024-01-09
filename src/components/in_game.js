import { PauseIcon } from "@heroicons/react/24/solid";
import Cannon from "./cannon";
import Cards from './cards'
import Layout from "./layout";

import { useDispatch } from "react-redux";
import { setState } from "../store/reducer/gameSlice";

export default function Game() {
    const dispatch = useDispatch();

    return (
        <Layout>
            <PauseIcon className="w-8 absolute top-3 right-3 cursor-pointer hover:scale-125 text-white" onClick={() => {
                // setGameState("menu")
                dispatch(setState("menu"))
            }} />
            <Cannon />
            <Cards />
        </Layout>
    )
}