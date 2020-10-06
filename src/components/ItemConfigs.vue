<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12>
        <VueJsonEditor v-model="jsonConfig" :show-btns="true" @json-change="onJsonChange"></VueJsonEditor>
      </v-flex>
    </v-layout>
  </v-container>
</template> 

<script>
import VueJsonEditor from "vue-json-editor";
export default {
  props: ["jsonConfig"],
  // data: () => ({
  //   _jsonConfig: this.jsonConfig
  // }),
  components: {
    VueJsonEditor
  },
  methods: {
    onJsonChange: function() {
      this.$emit('config-changed', this._jsonConfig)
    }
  }
};
</script>

<style lang="css">
</style>