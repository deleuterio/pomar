<template>
  <div>
    <div id="map" style="width: 1200px; height: 1200px" class="map"></div>

    <v-dialog width="900" height="900" v-model="dialog">

      <v-card title="Dialog">
        <v-card-text>
          <div v-html="markdownToHtml(post.content)"></div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close Dialog"
            @click="dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import posts from './posts.json';
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

export default {
  data() {
    return {
      map: null,
      markers: [],
      post: null,
      dialog: false,
      components: [],
    };
  },
  computed: {
    formattedPost() {
      return JSON.stringify(this.post, null, 4);
    },
  },
  async mounted() {
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    await this.$loadScript(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}`);
    this.initMap();
  },
  methods: {
    async getContent(path) {
      const response = await fetch(`/content/${path}.md`)
      const content = await response.text();

      // Reescrever os caminhos das imagens
      const imagePath = `/content/${path.split('/').slice(0, -1).join('/')}`;
      return content.replace(/!\[(.*?)\]\((.*?)\)/g, `<img src="${imagePath}/$2" alt="$1" class="markdown-image">`)
    },
    async initMap() {
      const location = { lat: -19.869783649952346, lng: -43.83179461119338 };
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 24,
        center: location,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
      });

      for (const { path, post } of posts) {
        const marker = new google.maps.Marker({
          position: { lat: post.lat, lng: post.lon },
          map: this.map,
        });

        const text = await this.getContent(path);
        // remove the metadata from the content
        const content = text.split('---')[2];

        google.maps.event.addListener(marker, 'click', () => {
            this.post = {...post, content };
            this.$nextTick(() => this.dialog = true);
        });

        this.markers.push(marker);
      }
    },
    markdownToHtml(markdown) {
      return md.render(markdown)
    },
  },
};
</script>

<style>
.map {
  top: 0;
  left: 0;
}
</style>

<style scoped>
.markdown-image {
  width: 500px;
  height: auto;
}
</style>