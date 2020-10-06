<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <div class="holder">
          <pie-api-author ref="pieApiAuthor" :content-id="contentId" :add-preview="addPreview" record-screen="false" record-screen-identity="pie-e2e-integration"></pie-api-author>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template> 

<script>
export default {
  props: {
    contentId: String,
    token: String,
    host: String,
    contentConfig: Object,
    configSettings: Object,
    addPreview: Boolean,
    addRubric: Boolean
  },
  data: () => ({
    pieApiAuthor: null
  }),
  watch: {
    contentConfig: function(newVal) {
      customElements.whenDefined("pie-api-author").then(() => {
        if (this.addRubric) {
          this.pieApiAuthor.addRubricToConfig(newVal).then(rubricModel => {
            this.pieApiAuthor.contentConfig = rubricModel;
          });
        } else {
          this.pieApiAuthor.contentConfig = newVal;
        }
      });
    },
    configSettings: function(newVal) {
      customElements.whenDefined("pie-api-author").then(() => {
        this.pieApiAuthor.configSettings = newVal;
      });
    },
    contentId: function(newVal) {
      this.pieApiAuthor.contentId = newVal;
    }
  },
  name: "PieApiAuthorContainer",
  methods: {
    changeMode: function() {},
    save: async function(updateType) {
      const newId = await this.pieApiAuthor.save(updateType);
      return newId;
    },
    release: async function() {
      const newId = await this.pieApiAuthor.release();
      return newId;
    },
    create: async function() {
      const newId = await this.pieApiAuthor.create();
      return newId;
    },
    load: async function() {
      this.pieApiAuthor.contentId = this.contentId;
      return await this.pieApiAuthor.load();
    }
  },
  async mounted() {
    await customElements.whenDefined("pie-api-author");
    this.pieApiAuthor = this.$refs.pieApiAuthor;

    this.pieApiAuthor.addEventListener("contentIdValidated", e => {
      this.$emit("content-id-validated", e);
    });

    this.pieApiAuthor.addEventListener("recordingStarted", e => {
      // eslint-disable-next-line 
      console.log(`session url == ${e.detail}`);
    });

    this.pieApiAuthor.token = this.token;
    this.pieApiAuthor.host = this.host;
    this.pieApiAuthor.recordScreen = false;


  }
};
</script>

<style lang="css">
</style>