import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import {clickOutSide} from "./utils.ts";

const app = createApp(App)
app.directive('clickOutSide', clickOutSide)
app.mount('#app')
