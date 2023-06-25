<template>
    <div id="map" class="w-full h-[300px]"></div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as ELG from "esri-leaflet-geocoder";

export default {
    name: "Map",
    props: {
        latitude: Number,
        longitude: Number,
        permission: String,
    },
    data() {
        return {
            map: null,
            geocodeService: null,
            city: null,
            country: null,
            address: null,
        };
    },
    mounted() {
        console.log("hello map");
        // create the map
        this.map = L.map("map");

        // add the tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(this.map);

        const icon = L.icon({
            iconUrl: "/marker.png",
            iconSize: [24, 24],
            iconAnchor: [2, 2],
            popupAnchor: [0, -2],
        });

        // get the user's location
        if (!(this.latitude || this.longitude))
            navigator.geolocation.getCurrentPosition(
                position => {
                    // set the map's view to the user's location
                    this.map.setView([position.coords.latitude, position.coords.longitude], 13);
                    // add a marker at the user's location
                    L.marker([position.coords.latitude, position.coords.longitude], { icon }).addTo(
                        this.map
                    );
                },
                error => {
                    // handle the error
                    console.error(error);
                }
            );
        else {
            this.map.setView([+this.latitude, +this.longitude], 13);
            // add a marker at the user's location
            L.marker([+this.latitude, +this.longitude], { icon }).addTo(this.map);
        }

        this.geocodeService = ELG.geocodeService({
            apikey: "AAPKebeee2364f5e456c9c63a0b88a037d23ZdHYTLSxBsfBZ-Sddmr-MEB3fQB-sDxrkI5GZPnAqpP0c8h6cO7t67WUYhFaeNMu",
        });

        this.map.on("click", async e => {
            if (this.permission === "get") return;
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;

            // delete markers
            this.map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    this.map.removeLayer(layer);
                }
            });

            // get address
            await this.geocodeService
                .reverse()
                .latlng([lat, lng])
                .run((error, result) => {
                    // check for errors
                    if (error) {
                        console.error(error);
                        return;
                    }

                    // get the address components from the result
                    this.address = result.address.Address;
                    this.city = result.address.City;
                    this.country = result.address.CountryCode;
                });

            this.$emit("coordinates", {
                latitude: lat,
                longitude: lng,
                address: this.address,
                city: this.city,
                country: this.country,
            });
            L.marker([lat, lng], { icon }).addTo(this.map);
        });
    },
    methods: {},
};
</script>
