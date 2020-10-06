<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <div class="holder">
          <pie-api-player ref="pieApiPlayer" :item-id="itemId" :env="env" record-screen="true" record-screen-identity="pie-e2e-integration"></pie-api-player>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template> 

<script>
export default {
  props: {
    itemId: String,
    token: String,
    host: String,
    env: Object,
    renderStimulus: Boolean
  },
  data: () => ({
    pieApiPlayer: null
  }),
  watch: {
    itemId: function(newVal) {
      return (this.pieApiPlayer.itemId = newVal);
    },
    renderStimulus: function(newVal) {
      this.pieApiPlayer.renderStimulus = newVal;
    },
    env: function(newVal) {
      this.pieApiPlayer.env = newVal;
    }
  },
  name: "PieApiPlayerContainer",
  methods: {
    load: async function() {
      this.pieApiPlayer.itemId = this.itemId;
      return await this.pieApiPlayer.load();
    }
  },
  async mounted() {
    await customElements.whenDefined("pie-api-player");
    this.pieApiPlayer = this.$refs.pieApiPlayer;
    this.pieApiPlayer.token = this.token;
    this.pieApiPlayer.host = this.host;
    this.pieApiPlayer.recordScreen = true;
    // TODO not sure why this is necessary
    this.pieApiPlayer.addEventListener("load-complete", event => {
      this.$emit("load-complete", event);
    });
    this.pieApiPlayer.addEventListener("recordingStarted", e => {
      // eslint-disable-next-line
      console.log(`session url == ${e.detail}`);
    });
  }
};
</script>

<style lang="css">
</style>