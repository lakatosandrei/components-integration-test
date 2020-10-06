<template>
  <v-container fill-height fluid>
    <v-layout fluid fill-height>
      <v-flex xs9>
        <v-card height="100%">
          <PieApiAuthorContainer
            ref="pieApiAuthor"
            :contentId="contentId"
            :token="token"
            :host="host"
            :contentConfig="contentConfig"
            :configSettings="configSettings"
            :addPreview="addPreview"
            :addRubric="addRubric"
            @content-id-validated="contentIdValidated"
          ></PieApiAuthorContainer>
        </v-card>
      </v-flex>

      <v-flex xs3 pl-1>
        <v-card>
          <v-container fluid grid-list-md pa-1>
            <v-layout column justify-space-between>
              <v-flex>
                <v-card :loading="saveNewLoading">
                  <v-card-title>Create</v-card-title>
                  <v-card-text>
                    <v-select
                      v-model="selectedItemType"
                      :items="itemTypes"
                      item-text="name"
                      return-object
                      label="Choose Question Type"
                      required
                    ></v-select>
                    <v-switch v-model="addPreview" label="Add Preview"></v-switch>
                    <v-switch v-model="addRubric" label="Add Rubric"></v-switch>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn class="mr-4" @click="create(selectedItemType)">Create</v-btn>
                    <v-btn class="mr-4" @click="save('premajor', true)">save</v-btn>
                  </v-card-actions>
                </v-card>
                <v-flex py-2>
                  <v-card :loading="loadItemLoading" outlined>
                    <v-card-title>Load Item</v-card-title>
                    <v-card-text>
                      <v-text-field
                        v-model="contentId"
                        label="Content Id"
                        persistent-hint
                        :hint="contentIdHint()"
                      ></v-text-field>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex>
                  <v-card :loading="savePrereleaseLoading" outlined>
                    <v-card-title>Save Pre-Release</v-card-title>
                    <v-card-text>
                      <v-select
                        :disabled="!contentId"
                        v-model="preReleaseType"
                        :items="preReleaseTypes"
                        item-text="label"
                        item-value="value"
                        label="Pre Release Type"
                        required
                      ></v-select>
                    </v-card-text>

                    <v-card-actions>
                      <v-btn class="mr-4" @click="save(preReleaseType)">save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
                <v-flex pt-2>
                  <v-card outlined>
                    <v-card-title>Release Item</v-card-title>
                    <v-card-actions>
                      <v-btn
                        class="mr-4"
                        :disabled="!contentId && (contentIdStatus !== 'pre-release')"
                        @click="release"
                      >release</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template> 

<script>
import PieApiAuthorContainer from "./PieApiAuthorContainer";
import { authorSettings, ibxItemTypes } from "../interactions";

export default {
  props: ["id", "config", "token", "host"],
  components: {
    PieApiAuthorContainer
  },
  data: () => ({
    addPreview: true,
    addRubric: false,
    contentId: null,
    contentIdStatus: null,
    contentIdIsValid: false,
    contentConfig: {},
    configSettings: {},
    itemTypes: ibxItemTypes,
    selectedItemType: ibxItemTypes[0],
    preReleaseType: "",
    preReleaseTypes: [
      {
        label: "Pre Major",
        value: "premajor"
      },
      {
        label: "Pre Minor",
        value: "preminor"
      },
      {
        label: "Pre Patch",
        value: "prepatch"
      },
      {
        label: "Pre Release",
        value: "prerelease"
      },
      {
        label: "None",
        value: null
      }
    ],
    snackbar: false,
    snackBarText: "",
    saveNewLoading: false,
    loadItemLoading: false,
    savePrereleaseLoading: false
  }),
  watch: {
    contentId: function(newVal) {
      if (newVal) {
        this.load()
      }
    }
  },
  name: "pieApiAuthorDemo",
  methods: {
    create: function(itemType) {
      this.contentConfig = authorSettings[itemType.id].contentConfig;
      this.configSettings = authorSettings[itemType.id].configSettings;
    },
    save: function(preReleaseType, saveNew = false) {
      const prType = preReleaseType ? preReleaseType : this.preReleaseType;
      if (!saveNew) {
        if (this.$refs.pieApiAuthor.contentId) {
          this.savePrereleaseLoading = true;
          this.$refs.pieApiAuthor
            .save(prType)
            .then(newId => {
              this.contentId = newId;
            })
            .catch(() => {
              // todo
            })
            .finally(() => {
              this.savePrereleaseLoading = false;
            });
        }
      } else {
        this.saveNewLoading = true;
        this.$refs.pieApiAuthor
          .create()
          .then(newId => {
            this.contentId = newId;
          })
          .catch(() => {
            // todo
          })
          .finally(() => {
            this.saveNewLoading = false;
          });
      }

      this.snackBarText = `saved ${this.contentId}`;
      this.snackBar = true;
    },
    load: function() {
      this.loadItemLoading = true;
      this.$refs.pieApiAuthor.contentId = this.contentId;
      this.$refs.pieApiAuthor
        .load()
        .catch(e => {
          this.snackBarText = e;
          this.snackbar = true;
        })
        .finally(() => {
          this.loadItemLoading = false;
        });
    },
    release: function() {
      this.$refs.pieApiAuthor.release().then(newId => {
        this.contentId = newId;
      });
    },
    contentIdValidated: function(e) {
      this.contentIdIsValid = e.detail.valid;
      this.contentIdStatus = e.detail.status; // 'pre-release' | 'released'
    },
    contentIdHint() {
      if (this.contentIdIsValid) {
        return `content item status: ${this.contentIdStatus}`;
      } else {
        return this.contentId ? "invalid versioned id" : "no id";
      }
    }
  },
  mounted() {
    if (customElements.get("pie-api-player")) {
      return;
    }
  }
};
</script>

<style lang="css">
</style>