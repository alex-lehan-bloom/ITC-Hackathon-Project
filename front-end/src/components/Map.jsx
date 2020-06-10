import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker.jsx";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import "../css/Map.css";
import { getlatlng } from "../lib/api";
import { ApiKey } from "./api_key";
import MyLoader from "./Loader";
import Places from "./Places";

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
    myPlaceCoordsLat: 32.052725,
    myPlaceCoordsLng: 34.772358,
    loader: false,
    data: [],
    ArrayOfCoordinates: [1, 2, 3],
    displayArrayOfCoordinates: false,
    myLatLng: { lat: -25.363, lng: 131.044 },
    test: [1, 2, 3],
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
    console.log("this.state.ArrayOfCoordinates");
    console.log(this.state.ArrayOfCoordinates);
  }
  handleOnChange(event) {
    console.log(event);
    this.setState({ inputPlace: event });
  }

  async handleOnSubmit() {
    let { inputPlace, myPlaceCoordsLat, myPlaceCoordsLng } = this.state;
    console.log("in the func");
    // console.log(this.state.inputPlace); // this is the input from the user
    let response = await getlatlng(
      inputPlace,
      myPlaceCoordsLat,
      myPlaceCoordsLng
    );
    this.setState({ data: response.data });
    console.log("response.data");
    console.log(response.data);
  }

  handleCordinates(coordinates) {
    console.log(coordinates);
    this.setState(
      {
        ArrayOfCoordinates: coordinates,
      },
      () => {
        console.log("test");
        this.setState({ displayArrayOfCoordinates: true });
      }
    );
  }

  render() {
    let { data, test } = this.state;
    return (
      <>
        <img
          src="./images/coavoid-logo.png"
          className="coavoidLogo"
          alt="co(a)void-19"
        />
        <div className="main-box flex">
          <div className="row mapSize">
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
                    className="btnColor"
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
                  onGoogleApiLoaded={({ map, maps }) =>
                    this.renderMarkers(map, maps)
                  }
                >
                  {this.state.displayArrayOfCoordinates &&
                    this.state.ArrayOfCoordinates.map((coordinates) => {
                      {
                        console.log(coordinates);
                      }
                      return (
                        <Marker
                          lat={coordinates.lat}
                          lng={coordinates.long}
                          name={coordinates.name}
                          color="red"
                        />
                      );
                    })}
                  {/*  */}
                </GoogleMapReact>
                {this.state.loader === true && <MyLoader />}
              </div>
            </div>{" "}
          </div>

          <Places
            data={this.state.data}
            handleCordinates={(cordinates) => {
              this.handleCordinates(cordinates);
            }}
          />
        </div>
      </>
    );
  }
}

export default Map;
