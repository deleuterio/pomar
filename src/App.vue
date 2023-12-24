<template>
  <div>
    <div id="map" style="width: 1200px; height: 1200px" class="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      marker: null
    }
  },
  mounted() {
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
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
      });
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