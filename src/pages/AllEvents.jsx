import { useState } from "react";
import useFetch from "../components/useFetch";

const formatCustomDateIST = (utcString) => {
  // 1. Create a Date object from the UTC string
  const date = new Date(utcString);

  // 2. Adjust for IST (UTC + 5 hours 30 minutes)
  // 5.5 hours = 5 * 60 + 30 minutes = 330 minutes * 60,000 milliseconds
  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(date.getTime() + IST_OFFSET_MS);

  // 3. Extract components in IST
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days[istTime.getDay()];

  // Note: The example output "Jun" and "2020" seems arbitrary and not derived
  // from the input "2025-09-15". We will use the correct date components from the IST time.
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[istTime.getMonth()];
  const dd = istTime.getDate().toString().padStart(2, "0");
  const year = istTime.getFullYear();

  // 4. Time components (HH:MM:SS AM/PM)
  let hours = istTime.getHours();
  const minutes = istTime.getMinutes().toString().padStart(2, "0");
  const seconds = istTime.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours.toString().padStart(2, "0");

  // 5. Assemble the final string
  // Format: "Day Mon DD YYYY . HH:MM:SS AM IST"
  const formattedDate = `${day} ${month} ${dd} ${year} . ${hours}:${minutes}:${seconds} ${ampm} IST`;

  return formattedDate;
};

const showEvents = (data) => {
  return data?.map((event) => (
    <div className="col-4 mb-4 px-4">
      <div>
        <div class="badge bg-white text-dark position-absolute rounded-2 mt-2 ms-2 p-2">
          {event.type + " Event"}
        </div>
        <img
          src="https://placehold.co/600x400?text=Event"
          className="card-img-top rounded"
          alt={event.title}
        />
      </div>
      <div className="text-body-secondary">
        {formatCustomDateIST(event.startTime)}
      </div>
      <p className="fs-4 fw-bolder">{event.title}</p>
    </div>
  ));
};

const AllEvents = () => {
  const [eventType, setEventType] = useState("All");
  const apiUrl = () => {
    let url = "";
    if (eventType === "All") {
      url = "https://meetup-apis.vercel.app/events";
    } else {
      url = "https://meetup-apis.vercel.app/events/type/" + eventType;
    }
    return url;
  };
  // console.log(apiUrl());

  const { data, loading, error } = useFetch(apiUrl());

  return (
    <div className="mx-5">
      <div className="row mb-3">
        <div className="col">
          <h1>Meetup Events</h1>
        </div>
        <div className="col d-flex flex-row-reverse">
          <div>
            <select
              className="text-body-secondary mt-3 border-0"
              name=""
              id=""
              onChange={(event) => setEventType(event.target.value)}
            >
              <option value="All">Select Event Type</option>
              <option value="Offline">Offline</option>
              <option value="Online">Online</option>
            </select>
          </div>
        </div>
      </div>
      {loading && <div>Loading ...</div>}
      <div className="row">{showEvents(data)}</div>
    </div>
  );
};
export default AllEvents;
