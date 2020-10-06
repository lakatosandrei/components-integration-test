
<template>
  <v-app id="inspire">
    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-list dense>
        <v-list-item link v-for="link in links" :key="link.text" :to="link.route">
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark disable-resize-watcher>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Pie Api Components - Sandbox</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-badge overlap color="red" v-model="missingCredentials">
        <template v-slot:badge>
          <v-icon dark>mdi-bell</v-icon>
        </template>

        <v-icon large @click.stop="dialog = true">mdi-settings</v-icon>
      </v-badge>
    </v-app-bar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout align-start justify-center>
          <router-view :host="host" :token="token"></router-view>
        </v-layout>
      </v-container>
    </v-content>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Settings</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="token" label="Token" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="host" label="Api Url" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { envToken, envHost } from "./config";

export default {
  name: "App",
  data: () => ({
    token: envToken,
    host: envHost,
    drawer: false,
    dialog: false,
    links: [
      { icon: "mdi-pencil", text: "pie-api-author", route: "/" },
      { icon: "mdi-play", text: "pie-api-player", route: "/player" }
    ]
  }),
  computed: {
    missingCredentials: function() {
      return !this.token || !this.host;
    }
  }
};
</script>



