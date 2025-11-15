import useFetch from "../components/useFetch";

const AllEvents = () => {
  const { data, loading, error } = useFetch(
    "https://meetup-apis.vercel.app/events"
  );
  return (
    <div className="mx-5">
      <div className="row mb-3">
        <div className="col">
          <h1>Meetup Events</h1>
        </div>
        <div className="col d-flex flex-row-reverse">
          <select name="" id="">
            <option value="Both">Select Event Type</option>
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
          </select>
        </div>
      </div>
      {loading && <div>Loading ...</div>}
      <div className="row">
        {data?.map((event) => (
          <div className="col-4">
            {/* <div className="card" key={event._id}> */}
            <img
              src="https://placehold.co/600x400?text=Event"
              className="card-img-top"
              alt={event.title}
            />
            {/* <div className="card-body"> */}
            <div className="text-body-secondary">{event.startTime}</div>
            <p className="fs-5 fw-bold">{event.title}</p>

            {/* <a href="#" className="btn btn-primary">
                  Go somewhere
                </a> */}
            {/* </div> */}
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};
export default AllEvents;
