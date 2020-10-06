# pie-api-components-e2e

This is a micro app for end-to-end testing the features of `@pie-api/pie-api-components`

The primary purpose is to have a target for running end-to-end tests on new releases of 
`@pie-api/pie-api-components` that uses it in a real-world context, connecting to running instance of `pie-api`

Another purpose is to provide a utilty for QA and prod/devt teams to isolate and reproduce any potential bugs or issues.

It also serves as a way for PIE Devs to dogfood usage of the player in an external app, to  help inform and improve API design.

It is built with Vue and Vuetify to have similarity to env in which player runs in IBX, to help catch corner cases that may arise in that context.

## Project setup
```
npm install
```

### Development
```
npm run serve
```

Go to the server url shown in the console shown after running this command.

Click the  settings icon to set the API token and Api Url to use.
These can alternatively be saved locally to a `.env.*` file e.g.  `.env.local` (the file should not be added to git.) as `VUE_APP_TOKEN` and `VUE_APP_HOST` and will be picked up by server.


### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
