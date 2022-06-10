import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";

// Already autoprefixed for vendor prefixes.
// Also namespaced to avoid collisions.
import VueFlex from "vue-flex";

import "vue-flex/dist/vue-flex.css";


//RESPONSIVE
import { VueResponsiveComponents } from "vue-responsive-components"

// PrimeVue Theme
import "primevue/resources/themes/md-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import ToastService from "primevue/toastservice";
import Rating from 'primevue/rating';
import Toast from "primevue/toast";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import Image from "primevue/image";
import DataTable from "primevue/datatable";
import Column from 'primevue/column';
import Card from "primevue/card";
import Avatar from 'primevue/avatar';
import Divider from 'primevue/divider';
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Calendar from 'primevue/calendar';
import Navbar from './users/coach/navbar/views/Nav-bar.vue'

const app = createApp(App);
app. use(VueFlex);
app.use(VueResponsiveComponents)
app.use(router);
// PrimeVue Configuration
app.use(PrimeVue, { ripple: true });
// Toast Service
app.use(ToastService);
// PrimeVue Components

app.component("pv-data-table", DataTable);
app.component("pv-toast", Toast);
app.component("pv-button", Button);
app.component("pv-toolbar", Toolbar);
app.component("pv-image", Image);
app.component("pv-column", Column);
app.component("pv-card", Card);
app.component("pv-avatar", Avatar);
app.component("pv-divider", Divider);
app.component("pv-dialog", Dialog);
app.component("pv-input-text", InputText);
app.component("pv-textarea",Textarea);
app.component("pv-calendar",Calendar);
app.component("nav-bar",Navbar)
app.component("pv-rating",Rating);
app.mount("#app");

