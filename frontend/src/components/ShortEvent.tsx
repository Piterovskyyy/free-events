import { BiCalendar, BiCurrentLocation } from "react-icons/bi";

interface ShortEventProps {
    title: string;
    description: string;
    image: string;
    date: string;
    place: string;
}

const ShortEvent: React.FC<ShortEventProps> = ({ title, description, image, date, place }) => {
    return (
        <div className="bg-base-100 rounded-md mb-5 w-full h-24 grid grid-cols-[1fr_4fr_2fr]">
            <img src={image} alt="Event poster"  className="rounded-md"/>
            <div className="flex flex-col justify-center align-middle ml-5">
                <p className="font-bold text-lg">{ title }</p>
                <p className="text-sm">{ description }</p>
            </div>
            <div className="flex flex-col justify-center align-middle">
                <p className="flex gap-2 justify-start align-middle"><BiCalendar className="icon"/> { date }</p>
                <p className="flex gap-2 justify-start align-middle"><BiCurrentLocation className="icon"/> { place }</p>
            </div>
        </div>
    )
}

export default ShortEvent;