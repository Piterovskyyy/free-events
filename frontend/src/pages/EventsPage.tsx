import { useEffect, useState } from "react";
import axios from "axios";
import MainEvent from "../components/MainEvent";
import ShortEvent from "../components/ShortEvent";
import EventInterface from "../types/EventInterface";

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchEvents = async () => {
    if (searchTerm.trim() === "") return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<EventInterface[]>(
        `http://localhost:8080/api/events/search?name=${encodeURIComponent(
          searchTerm
        )}`
      );
      setEvents(response.data);
    } catch (err) {
      setError("Błąd podczas pobierania eventów.");
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<EventInterface[]>(
        `http://localhost:8080/api/events/${filter}`
      );
      setEvents(response.data);
    } catch (err) {
      setError("Błąd podczas pobierania eventów.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchEvents();
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    fetchEvents();
  };

  const reloadEvents = () => {
    fetchEvents();
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center">
      <div className="w-2/3 mt-24 mb-24">
        <MainEvent/>
        <div className="flex gap-3 mt-5">
          <label className="input flex items-center gap-2 flex-1">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70 cursor-pointer"
              onClick={searchEvents}
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          <select
            className="select select-bordered w-56"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Wszytskie wydarzenia</option>
            <option value="upcoming">Nadchodzące wydarzenia</option>
            <option value="past">Minione wydarzenia</option>
            <option value="today">Dzisiejsze wydarzenia</option>
          </select>
        </div>

        <div className="mt-5">
          {loading ? (
            <div className="w-full flex justify-center rounded-2xl align-middle">
              <span className="loading loading-spinner loading-lg text-white"></span>
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : events.length === 0 ? (
            <div className="text-center">
              <p>Brak wydarzeń spełniających podane filtry.</p>
              <button
                className="mt-3 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={reloadEvents}
              >
                Załaduj wszystkie wydarzenia
              </button>
              <button
                className="mt-3 ml-3 py-2 px-4 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
                onClick={clearSearch}
              >
                Wyczyść wyszukiwanie
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5 w-full box-content">
              {events.map((event) => (
                <ShortEvent key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
