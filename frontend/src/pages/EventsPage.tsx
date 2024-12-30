import { useEffect, useState } from "react";
import axios from "axios";
import MainEvent from "../components/MainEvent";
import ShortEvent from "../components/ShortEvent";
import EventInterface from "../types/EventInterface";
import { format } from "date-fns";

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<EventInterface[]>(
          "http://localhost:8080/api/events"
        );
        setEvents(response.data);
      } catch (err) {
        setError("Błąd podczas pobierania eventów.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-base-200 flex justify-center">
      <div className="w-2/3 mt-24 mb-24">
        <MainEvent
          title="Quebonafide - PÓŁNOC/POŁUDNIE"
          description="W 2023 roku zadeklarował, że nie będzie już żadnych solowych kawałków. Rozbudził jednak apetyty fanów, zapowiadając jeszcze jeden, ostatni koncert… I faktycznie, Quebonafide raz jeszcze powróci na scenę, aby się pożegnać. Jednak nie będzie to koncert, jakiego wszyscy się spodziewają. Zanim opadnie kurtyna, artysta szykuje projekt artystyczny, jakiego w Polsce jeszcze nie było."
          image="https://www.rmf.fm/_files/Upload/Images/queb810x700_1.jpg"
        />

        <label className="input flex items-center gap-2 mt-5">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div className="mt-5">
          {loading ? (
            <div className="w-full flex justify-center rounded-2xl align-middle">
              <span className="loading loading-spinner loading-lg text-white"></span>
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="flex flex-col gap-5 w-full box-content">
              {events.map((event) => (
                <ShortEvent key={event.name} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
