import React from "react";
import { BsFillTicketPerforatedFill } from "react-icons/bs";

interface MainEventProps {
    title: string; 
    description: string; 
    image: string
}

const MainEvent: React.FC<MainEventProps> = ({ title, description, image }) => {
    return (
        <div className="bg-base-100 rounded-md h-96 w-full relative">
            <div className=" absolute left-0 right-0 top-0 bg-primary flex justify-center align-middle gap-7 rounded-tl-md rounded-tr-md font-semibold uppercase tracking-widest">
                <BsFillTicketPerforatedFill className="icon"/>
                Najnowszy Event
                <BsFillTicketPerforatedFill className="icon"/>
            </div>
            <div className="grid grid-cols-[2fr_1fr] w-full h-full mt-5">
                <div className="flex flex-col justify-center h-full mr-10">
                    <p className="text-5xl capitalize font-bold text-primary ml-10 p-5 pl-0">{ title }</p>
                    <p className="ml-10">{ description }</p>
                    <button className="btn btn-primary max-w-fit ml-10 mt-5">Kup bilet</button>
                </div>
                <div className="flex justify-center align-center">
                    <img className="rounded-md rounded-bl-none w-full h-full" src={image} alt="Event poster"/>
                </div>
            </div>
        </div>
    )
}

export default MainEvent;