import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
// PrimeVue Theme
import "primevue/resources/themes/md-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import ToastService from "primevue/toastservice";

import Toast from "primevue/toast";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import Image from "primevue/image";
import DataTable from "primevue/datatable";
import Column from 'primevue/column';
import Card from "primevue/card";
import Avatar from 'primevue/avatar';
import Divider from 'primevue/divider';

const app = createApp(App);

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

app.mount("#app");

