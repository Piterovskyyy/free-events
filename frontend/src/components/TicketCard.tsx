import { Download, Ticket } from "lucide-react";
import TicketInterface from "../types/TicketInterface";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const TicketCard: React.FC<{ ticket: TicketInterface }> = ({ ticket }) => {
  const context = useContext(UserContext);
  const user = context?.user;
  const navigate = useNavigate(); // Hook to navigate to other pages

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/tickets/${ticket.eventId}/download`,
        {
          params: {
            attendeeName: user?.name,
            ticketNumber: ticket.ticketNumber,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", `ticket-${ticket.ticketNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading ticket:", error);
      alert("An error occurred while downloading the ticket.");
    }
  };

  const handleGoToEvent = () => {
    // Navigate to the event page using react-router
    navigate(`/events/${ticket.eventId}`);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="card-title flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              {ticket.eventName}
            </h2>
            <p className="text-sm opacity-70">
              Event Date: {new Date(ticket.eventDate).toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span
              className={`badge ${
                ticket.status === "active" ? "badge-success" : "badge-error"
              } mb-4`}
            >
              {ticket.status}
            </span>
            <div className="flex gap-2">
              <button
                className="btn btn-primary"
                onClick={handleDownload}
                disabled={ticket.status !== "active"}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Ticket
              </button>
              <button className="btn btn-secondary" onClick={handleGoToEvent}>
                Go to Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
