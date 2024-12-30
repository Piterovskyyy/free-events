import { BiCalendar, BiCurrentLocation } from "react-icons/bi";
import EventInterface from "../types/EventInterface";
import { format } from "date-fns";

interface ShortEventProps {
  event: EventInterface;
}

const ShortEvent: React.FC<ShortEventProps> = ({ event }) => {
  const { name, description, imageUrl, eventDate, location } = event;

  return (
    <div className="bg-base-100 rounded-md w-full h-32 p-4">
      <div className="w-full h-full grid grid-cols-[20%_40%_40%]">
        <div className="h-full w-full rounded-md overflow-hidden">
          <img
            src={imageUrl}
            alt="Event poster"
            className="object-cover w-full h-full box-border"
          />
        </div>
        <div className="flex flex-col justify-center align-middle ml-5 gap-4">
          <p className="font-bold text-lg truncate">{name}</p>
          <p className="text-sm truncate">{description}</p>
        </div>
        <div className="flex flex-col justify-center ml-5 gap-4">
          <p className="flex gap-2 justify-start truncate">
            <BiCalendar className="icon" />{" "}
            {format(eventDate, "dd.MM.yyyy HH:mm")}
          </p>
          <div className="flex gap-2 justify-start items-center">
            <BiCurrentLocation className="icon" />
            <p className="truncate flex-1">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortEvent;
