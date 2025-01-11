import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import TicketInterface from "../types/TicketInterface";
import TicketCard from "../components/TicketCard";
import { UserContext } from "../contexts/UserContext";

const TicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<TicketInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const context = useContext(UserContext);
  const user = context?.user;

  const searchTickets = async () => {
    if (searchTerm.trim() === "") return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<TicketInterface[]>(
        `http://localhost:8080/api/tickets/search?event=${encodeURIComponent(
          searchTerm
        )}`
      );
      setTickets(response.data);
    } catch (err) {
      setError("Error fetching tickets.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<TicketInterface[]>(
        `http://localhost:8080/api/tickets/${filter}`,
        {
          params: { userId: user?.id },
        }
      );
      setTickets(response.data);
    } catch (err) {
      setError("Error fetching tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [filter]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchTickets();
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    fetchTickets();
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center">
      <div className="w-2/3 mt-24 mb-24">
        <h1 className="text-4xl font-bold mb-8">My Tickets</h1>

        <div className="flex gap-3 mb-8">
          <label className="input flex items-center gap-2 flex-1">
            <input
              type="text"
              className="grow"
              placeholder="Search by event name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <Search
              className="h-4 w-4 opacity-70 cursor-pointer"
              onClick={searchTickets}
            />
          </label>

          <select
            className="select select-bordered w-56"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Tickets</option>
            <option value="active">Active Tickets</option>
            <option value="expired">Expired Tickets</option>
          </select>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="w-full flex justify-center rounded-2xl align-middle">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : error ? (
            <div className="alert alert-error">
              <p>{error}</p>
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-8">
              <p className="mb-4">No tickets found.</p>
              <button className="btn btn-primary mr-2" onClick={fetchTickets}>
                Reload Tickets
              </button>
              <button className="btn btn-ghost" onClick={clearSearch}>
                Clear Search
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
