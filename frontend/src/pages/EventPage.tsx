import React, { useContext, useEffect, useState } from "react";
import { Calendar, MapPin, Clock, Share2 } from "lucide-react";
import { format } from "date-fns";
import EventInterface from "../types/EventInterface";
import axios from "axios";
import { useParams } from "react-router-dom";
import { pl } from "date-fns/locale";
import GoogleMapAddress from "../components/GoogleMapAddress";
import { UserContext } from "../contexts/UserContext";

const EventPage: React.FC = () => {
  const [event, setEvent] = useState<EventInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams(); // Pobieramy id z URL
  const contex = useContext(UserContext);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<EventInterface>(
          `http://localhost:8080/api/events/${id}`
        );
        setEvent(response.data);
      } catch (err) {
        console.error(err);
        setError("Nie udało się pobrać wydarzenia. Spróbuj ponownie później.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Ładowanie szczegółów wydarzenia...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Nie znaleziono wydarzenia.</p>
      </div>
    );
  }

  const handleShare = () => {
    if (event) {
      const eventUrl = window.location.href;
      navigator.clipboard
        .writeText(eventUrl)
        .then(() => {
          alert("Link do wydarzenia został skopiowany do schowka!");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  const isPastEvent = new Date(event.eventDate) < new Date();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mt-20">
        <div className="relative h-[300px] rounded-xl overflow-hidden mb-8">
          <img
            src={event.imageUrl}
            alt={event.name}
            className={`w-full h-full object-cover ${
              isPastEvent ? "grayscale" : ""
            }`}
          />
          {isPastEvent && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full">
              Minione wydarzenie
            </div>
          )}
        </div>

        {/* Event Info */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {event.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span>
                  {format(new Date(event.eventDate), "EEEE, d MMMM yyyy", {
                    locale: pl,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="h-5 w-5" />
                <span>
                  {format(new Date(event.eventDate), "HH:mm", { locale: pl })}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span className="flex-1">{event.location}</span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                className={`w-full py-3 px-4 rounded-lg font-medium ${
                  isPastEvent || !contex?.user?.id
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isPastEvent
                  ? "Wydarzenie zakończone"
                  : contex?.user?.id
                  ? "Dołącz do wydarzenia"
                  : "Zaloguj się, aby dołączyć móc do wydarzenia"}
              </button>
              <button
                className="w-full py-3 px-4 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                Udostępnij wydarzenie
              </button>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">O wydarzeniu</h2>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </div>
          <GoogleMapAddress location={event.location} />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
