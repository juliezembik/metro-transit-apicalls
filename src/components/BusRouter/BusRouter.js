import React, { useState, useEffect } from "react";

const BASE_URL = "http://svc.metrotransit.org/NexTrip/Routes?format=json";

export default () => {
  
  const [ bus, setBus ] = useState(0);
  
    //GET ALL
  useEffect(() => {
    const response = fetch(BASE_URL);
    const data = response;
    const [item] = data.data;
    setBus(item);
  }, []);



  return (
    <div>
        {bus && <div>{bus}</div>}
    </div>
  );
};
