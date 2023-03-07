import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.scss";

const Home = () => {
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.orhanaydogdu.com.tr/deprem/kandilli/live")
      .then((response) => {
        setEarthquakes(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(earthquakes);
  return (
    <div className="home">
      <div className="nav">
        <h1>KANDİLLİ DEPREM APP</h1>
      </div>
      <div className="container">
        {earthquakes.map((earthquake) => (
          <div key={earthquake.id} className="box">
            <div className="box-1">
              <div className="box-1-box">
                <span className="buyukluk">Büyüklük</span>
                <span>{earthquake.mag}</span>
              </div>
              <div className="bilgi">
                <span>
                  {earthquake.date} {earthquake.time}
                </span>
                <span>{earthquake.title}</span>
              </div>
            </div>
            <div className="box-2">
              <span>Derinlik: {earthquake.depth} km</span>
              <div
                className="location"
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/search/${earthquake.geojson.coordinates[1]},+${earthquake.geojson.coordinates[0]}?shorturl=1 `
                  );
                }}
              >
                <img src="./search-icon.png" alt="" />
                <span>Konumu Gör</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
