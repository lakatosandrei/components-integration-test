<template>
  <v-container fill-height fluid>
    <v-layout fluid fill-height>
      <v-flex xs9>
        <v-card height="100%">
          <PieApiPlayerContainer
            ref="pieApiPlayer"
            :itemId="itemId"
            :token="token"
            :host="host"
            :env="env"
            record-screen="false"
            :renderStimulus="renderStimulus"
            @load-complete="handleLoadComplete"
          ></PieApiPlayerContainer>
        </v-card>
      </v-flex>

      <v-flex xs3 pa-4>
        <v-card>
          <v-container fluid grid-list-md pa-1>
            <v-layout column justify-space-between>
              <v-flex>
                <v-card :loading="loadItemLoading">
                  <v-card-title>Load Item</v-card-title>
                  <v-card-text>
                    <v-text-field v-model="itemId" label="Item Id"></v-text-field>
                  </v-card-text>
                </v-card>
              </v-flex>

              <v-flex>
                <v-card>
                  <v-card-title>Controls</v-card-title>
                  <v-card-text>
                    <v-select
                      :disabled="!itemId"
                      v-model="mode"
                      :items="modes"
                      label="Mode"
                      required
                    ></v-select>

                    <v-select
                      :disabled="!itemId"
                      v-model="role"
                      :items="roles"
                      label="Role"
                      required
                    ></v-select>

                    <v-switch v-model="renderStimulus" label="Show Stimulus (if available)"></v-switch>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template> 

<script>
import PieApiPlayerContainer from "./PieApiPlayerContainer";
export default {
  components: {
    PieApiPlayerContainer
  },
  props: ["token", "host"],
  data: () => ({
    itemId: null,
    mode: "gather",
    modes: ["gather", "view", "evaluate"],
    role: "student",
    roles: ["student", "instructor"],
    renderStimulus: true,
    loadItemLoading: false
  }),
  name: "pieApiPlayerDemo",
  methods: {
    handleLoadComplete: function() {
      this.loadItemLoading = false;
    }
  },
  computed: {
    env: function() {
      return { mode: this.mode, role: this.role };
    }
  },
  watch: {
    itemId: function(newVal) {
      this.loadItemLoading = true;
      this.$refs.pieApiPlayer.itemId = newVal;
    }
  }
};
</script>

<style lang="css">
</style>