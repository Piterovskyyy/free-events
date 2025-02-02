import React, { useEffect, useState } from "react";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import EventInterface from "../types/EventInterface";
import axios from "axios";
import { useAlert } from "../contexts/AlertContext";

const MainEvent: React.FC= () => {
    const navigate = useNavigate();
    const showAlert = useAlert();

    const [eventDescription, setEventDescription] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventId, setEventId] = useState('');
    const [eventImageUrl, setEventImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchLatestEvent = async () => {
        try {
            const url = 'http://localhost:8080/api/events/nearest';
            const response = await axios.get<EventInterface>(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const { id, name, description, imageUrl } = response.data;
    
            setEventDescription(description);
            setEventName(name);
            setEventId(id);
            setEventImageUrl(imageUrl);
            setIsLoading(false);
        } catch (e: any) {
            showAlert('Wystąpił błąd przy pobieraniu najbliższego wydarzenia.');
        }
    };
    

    useEffect(() => {
        fetchLatestEvent();
    }, [])

    return (
        <div className="bg-base-100 rounded-md h-96 w-full relative">
            <div className=" absolute left-0 right-0 top-0 bg-primary flex justify-center align-middle gap-7 rounded-tl-md rounded-tr-md font-semibold uppercase tracking-widest">
                <BsFillTicketPerforatedFill className="icon"/>
                    Najbliższe Wydarzenie
                <BsFillTicketPerforatedFill className="icon"/>
            </div>
            { isLoading ? 
                <div className="flex justify-center w-full h-full items-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div> 
                :   
                <div className="grid grid-cols-[2fr_1fr] w-full h-full mt-5">
                    <div className="flex flex-col justify-center h-full mr-10">
                        <p className="text-5xl capitalize font-bold text-primary ml-10 p-5 pl-0">{ eventName }</p>
                        <p className="ml-10">{ eventDescription }</p>
                        <button onClick={() => navigate(`/events/${eventId}`)} className="btn btn-primary max-w-fit ml-10 mt-5">Zarezerwuj bilet</button>
                    </div>
                    <div className="flex justify-center align-center">
                        <img className="rounded-md rounded-bl-none h-[calc(100%-24px)] mt-[24px]" src={eventImageUrl} alt="Event poster"/>
                    </div>
                </div>
            }
        </div>
    )
}

export default MainEvent;