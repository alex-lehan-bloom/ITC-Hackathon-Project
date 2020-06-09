import React, { Component, useState, useEffect } from "react";
import Map from "./Map";

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
				coords.push({ lat: item.coordinates.lat, long: item.coordinates.lng });
			});
		}
		setCoordinates(coords);
	}, [data]);

	useEffect(() => {
		props.handleCordinates(coordinates);
	}, [coordinates]);

	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		data: this.props.data,
	// 	};
	// }

	// componentDidUpdate() {
	//     this.setState({data: this.props.data})
	// }

	// let { data } = this.state;
	// console.log("DATA");
	// console.log(data);
	// console.log(this.props.data);
	return (
		<div>
			{data !== undefined && (
				<ul className="data-ul">
					{data.map((item) => (
						<>
							<li key={item.id} className="place-in-list">
								{/* {this.setState({ firstPlaceLat: item.coordinates.lat })} */}
								{/* {this.setState({ firstPlaceLng: item.coordinates.lng })} */}
								<div className="name-date">
									<span>Name: {item.name} </span>
									<span>Rating: {item.rating}</span>
								</div>
								<div className="tweet-text">{item.coordinates.lat}</div>
								<div className="tweet-text">{item.coordinates.lng}</div>
							</li>
						</>
					))}
				</ul>
			)}
		</div>
	);
}

export default Places;
