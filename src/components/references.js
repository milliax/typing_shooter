import { XMarkIcon } from "@heroicons/react/24/solid"

import { useDispatch } from "react-redux"
import { setState } from "../store/reducer/gameSlice"

const references = [{
    title: "Flat Icon",
    text: "Place I get free icons",
    url: "https://www.flaticon.com/"
}, {
    title: "Motion Array",
    text: 'free music ',
    url: 'https://motionarray.com'
}]

export default function References({ }) {
    const dispatch = useDispatch()

    return (
        <div className="w-full h-full flex flex-row items-center justify-center">
            <div className="bg-neutral-100 w-80 my-auto py-3 rounded-md flex flex-col items-center">
                <div className="w-full text-center relative">
                    <h1 className="font-bold text-lg">References</h1>
                    <XMarkIcon className="absolute right-3 w-6 top-0 hover:scale-125 cursor-pointer" onClick={() => {
                        dispatch(setState("menu"))
                    }} />
                </div>
                <div className="w-full px-5 py-4">
                    {references.map((item) => <SubReference
                        key={item.title}
                        title={item.title}
                        text={item.text}
                        url={item.url}
                    />)}
                </div>
            </div>
        </div>
    )
}

const SubReference = ({ title, text, url }) => {
    return (
        <div className="bg-neutral-200 w-full rounded-lg px-2 mt-3">
            <a href={url} target="_blank" rel="noreferrer noopener">
                <h1 className="text-lg font-bold">{title}</h1>
                <h1 className="text-gray-700">{text}</h1>
            </a>
        </div>
    )
}