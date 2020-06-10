import React, { Component, useState, useEffect } from "react";
import Map from "./Map";
import GaugeChart from "react-gauge-chart";

function Places(props) {
  const [data, setData] = useState();
  const [coordinates, setCoordinates] = useState({});

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    console.log("DATA");
    let coords = [];
    if (data != undefined) {
      data.map((item) => {
        console.log(item.coordinates.lat);
        coords.push({
          lat: item.coordinates.lat,
          long: item.coordinates.lng,
          name: item.name,
        });
      });
    }
    setCoordinates(coords);
  }, [data]);

  useEffect(() => {
    props.handleCordinates(coordinates);
  }, [coordinates]);


	return (
		<>
			{data !== undefined && (
				<ul className="data-ul">
					{data.map((item) => (
						<>
							<li key={item.id} className="place-in-list">
								<div className="detail flexColum">
									<div>
										<b>{item.name}</b>
									</div>
									<div>{item.address}</div>
								</div>
								{/* <div className="chart flex">

									
                                
                                    
								</div> */}
                <div className="rating flexColum">
                  <div>Population</div>
                  <div className="flex chart">
                    <GaugeChart
                      id={item.id}
                      className="gaugeChart"
                      style={{ width: "80%" }}
                      textColor={"rgb(0, 0, 0)"}
                      nrOfLevels={10}
                      colors={["#FF5F6D", "rgb(105, 189, 79)"]}
                      arcWidth={0.3}
                      percent={0.37}
                    />
                  </div>
                </div>

                <div className="rating flexColum">
                  <div>Rating</div>
                  <div className="ratingBox">{item.rating}</div>
                </div>
                {/* <div className="tweet-text">{item.coordinates.lat}</div>
								<div className="tweet-text">{item.coordinates.lng}</div> */}
              </li>
            </>
          ))}
        </ul>
      )}
    </>
  );
}

export default Places;
