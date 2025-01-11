export default interface TicketInterface {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  status: "active" | "expired";
  ticketNumber: string;
}
