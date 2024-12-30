import { BiSolidCalendarEvent, BiSolidPhotoAlbum } from "react-icons/bi";
import GoogleMapAddress from "../components/GoogleMapAddress";
import DateTimePicker from "../components/DateTimePicker";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const NewEventPage: React.FC = () => {
  const context = useContext(UserContext);

  const [eventName, setEventName] = useState<string>("");
  const [eventDescription, setEventDescription] = useState<string>("");
  const [eventLocation, setEventLocation] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const eventData = {
      name: eventName,
      description: eventDescription,
      location: eventLocation,
      eventDate: eventDate,
      organizerId: context?.user?.id,
    };

    const formData = new FormData();
    formData.append("event", JSON.stringify(eventData));
    formData.append("image", image!);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/events/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Event created successfully!");
      } else {
        alert("Failed to create event.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred while creating the event.");
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center">
      <div className="w-2/3 mt-24 mb-10">
        <div className="bg-base-100 rounded-md h-auto pb-10 w-full relative">
          <div className=" absolute left-0 right-0 top-0 bg-primary flex justify-center align-middle gap-7 rounded-tl-md rounded-tr-md font-semibold uppercase tracking-widest">
            <BiSolidCalendarEvent className="icon" />
            Tworzenie Eventu
            <BiSolidCalendarEvent className="icon" />
          </div>
          <div className="w-full h-full pt-16">
            <div className="flex justify-center items-center max-h-min">
              {/* <BiRename className="icon"/> */}
              <input
                type="text"
                placeholder="Nazwa wydarzenia..."
                className="input input-bordered w-full max-w-lg ml-5"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center max-h-min">
              <GoogleMapAddress
                setLocation={setEventLocation}
                location={eventLocation}
              />
            </div>
          </div>
          <div className="flex justify-around items-center p-10 gap-2">
            <DateTimePicker setDate={setEventDate} date={eventDate} />
            <div className="flex justify-center gap-2 items-center">
              <BiSolidPhotoAlbum className="icon" />
              <input
                type="file"
                className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                accept="image/*"
                aria-label="Dodaj zdjęcie"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <textarea
              className="textarea textarea-bordered w-2/3 resize-none h-36"
              placeholder="Opis wydarzenia..."
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-center items-center mt-10">
            <button
              onClick={handleSubmit}
              className="btn btn-primary cursor-pointer"
            >
              Utwórz wydarzenie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEventPage;
