import axios from "axios";

const baseUrl = "http://127.0.0.1:5000";

export function getlatlng(place, lat, lng) {
	let lat2 = lat + 0.02;
	console.log("place, lat, lng");
	console.log(place, lat, lng);
	return axios.get(`${baseUrl}/place?category=${place}`);
}
