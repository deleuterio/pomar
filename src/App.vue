<template>
  <div>
    <div id="map" style="width: 1200px; height: 1200px" class="map"></div>
  </div>
</template>

<script>
import posts from './posts.json';

export default {
  data() {
    return {
      map: null,
      marker: null
    }
  },
  async mounted() {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    await this.$loadScript(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}`);
    this.initMap();
  },
  methods: {
    initMap() {

      const location = { lat: -19.869783649952346, lng: -43.83179461119338 };
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 24,
        center: location,
        mapTypeId: google.maps.MapTypeId.SATELLITE
      });

      for (const {path, post} of posts) {
        this.marker = new google.maps.Marker({
          position: { lat: post.lat, lng: post.lon },
          map: this.map,
        });
      }
    }
  }
}
</script>

<style>
.map {
  top: 0;
  left: 0;
}
</style>