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
      const location = { lat: -34.397, lng: 150.644 };
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: location,
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