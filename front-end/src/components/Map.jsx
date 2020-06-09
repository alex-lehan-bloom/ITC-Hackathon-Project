import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import "../css/Map.css";
import { getlatlng } from "../lib/api";
import { ApiKey } from "./api_key";

class Map extends Component {
	static defaultProps = {
		center: {
			// this are Tel Aviv cocrds
			lat: 32.083333,
			lng: 34.7999968,
		},
		zoom: 13,
	};
	state = {
		inputPlace: "",
		//itc coords
		myPlaceCoordsLat: 32.053038,
		myPlaceCoordsLng: 34.772103,
	};

	renderMarkers(map, maps) {
		let marker = new maps.Marker({
			position: {
				lat: this.state.myPlaceCoordsLat,
				lng: this.state.myPlaceCoordsLng,
			},
			map: map,
			// title: "Hello World!",
		});
	}

	handleOnChange(event) {
		console.log(event);
		this.setState({ inputPlace: event });
	}

	async handleOnSubmit() {
		let { inputPlace, myPlaceCoordsLat, myPlaceCoordsLng } = this.state;
		console.log("in the func");
		// console.log(this.state.inputPlace); // this is the input from the user
    let response = await getlatlng(inputPlace, myPlaceCoordsLat, myPlaceCoordsLng);
    console.log(response);
	}

	render() {
		return (
			<div className="row">
			<div className="col-10 offset-1">
				<InputGroup className="marginInput">
					<FormControl
						placeholder="Where Do You Want To Go?"
						aria-label="Where Do You Want To Go?"
						aria-describedby="basic-addon2"
						onChange={(event) => this.handleOnChange(event.target.value)}
					/>
					<InputGroup.Append>
						<Button
							variant="primary"
							onClick={() => {
								this.handleOnSubmit();
							}}
						>
							Button
						</Button>
					</InputGroup.Append>
				</InputGroup>

				<div className="map">
					<GoogleMapReact
						bootstrapURLKeys={{
							key: ApiKey,
						}}
						defaultCenter={this.props.center}
						defaultZoom={this.props.zoom}
						onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
					></GoogleMapReact>
				</div>
			</div>
			</div>
		);
	}
}

export default Map;
