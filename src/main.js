import { createApp } from 'vue'
import { createPinia } from 'pinia'


import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAx7MnzEhJe7-hGORE6kWB9W1m2Vdtwc7M",
  authDomain: "lab9-349.firebaseapp.com",
  projectId: "lab9-349",
  storageBucket: "lab9-349.appspot.com",
  messagingSenderId: "31336565990",
  appId: "1:31336565990:web:ce09c7f45aa27ac2f0bf27"
};

const initfirestore = initializeApp(firebaseConfig);
export const db = getFirestore(initfirestore);

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
app.use(bootstrap)
