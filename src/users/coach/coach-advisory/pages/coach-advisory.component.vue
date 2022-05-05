<link rel="stylesheet" href="https://unpkg.com/primeflex@3.1.0/primeflex.css">

<template>

  <div>
    <pv-button
        class="p-button-lg"
        label="New Advisory"
        icon="pi pi-plus"
        align="Center"
        @click="openNew"
    />
    <pv-divider/>
    <pv-card class="p-card">

      <template #header>

        <div>
          <pv-avatar image="https://www.infobae.com/new-resizer/MNHmV03_B5YfGxHUoWdlomoS2JQ=/992x558/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/08/09153344/Oxaciano.jpg"
                     size= "xlarge" />
        </div>
        <div>
          <h2>Coach name</h2>
        </div>
        <h3>Title:</h3>
        <h3>Schedule:</h3>
        <h3>Chanel</h3>
        <h3>Media:</h3>
        <pv-image
            src="https://d37b96571lewzk.cloudfront.net/assets/image/92/5fbd041a0c9c6/top_games_for_cyber_cafe_o.jpg"
            alt="image advisory"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            width="275"
            height="275"
            preview
        />
      </template>

    </pv-card>
    <pv-dialog
      v-model:visible="advisoryDialog"
      :style="{ width: '500px'}"
      header="Advisory Information"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <span class="p-float-label">
          <pv-input-text
            type="text"
            id="title"
            v-model.trim="advisory.title"
            required="true"
            autofocus
            :class="{'p-invalid':submitted && !advisory.title}"
          />
          <label for="title">Title</label>
          <samll class="p-error" v-if="submitted && !advisory.title"
                 >Title is required</samll>

        </span>

      </div>
      <div class="field">
        <span class="p-float-label">
          <pv-calendar
              id="multiple"
              v-model="advisory.schedule"
              selectionMode="multiple"
              required="true"
              :manualInput="false"
          />
          <label for="schedule">Schedule</label>
          <samll class="p-error" v-if="submitted && !advisory.schedule"
          >Schedule is required</samll>
        </span>
      </div>
      <div class="field">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="title"
              v-model.trim="advisory.chanel"
              required="true"
              autofocus
              :class="{'p-invalid':submitted && !advisory.chanel}"
          />
          <label for="chanel">Chanel</label>
          <samll class="p-error" v-if="submitted && !advisory.chanel"
          >Title is required</samll>

        </span>

      </div>
      <div class="field">
        <span class="p-float-label">
          <pv-textarea
              id="description"
              v-model="advisory.media"
              required="false"
              rows="2"
              cols="2"
          />
          <label for="media">media</label>
        </span>
      </div>

      <template #footer>
        <pv-button
            label="Cancel"
            icon="pi pi-times"
            class="p-button-text"
            @click="hideDialog"
        />
        <pv-button
            label="Save"
            icon="pi pi-check"
            class="p-button-text"
            @click="saveCoachAdvisory"
        />
      </template>

    </pv-dialog>
  </div>


</template>

<script>
import { coachAdvisoryService } from "../services/coach-advisory.service";

export default {
  name: "coach-advisory",
  data() {
    return {
      advisoryes: [],
      coachDialog: false,
      submitted: false,
      advisoryService: null,
      advisory: {},
      advisoryId: 1,
      advisoryDialog: false,
    };
  },
  mounted() {
    
    this.advisoryService.getById()
    this.advisoryService.getAll().then((response) => {
      this.advisoryes = response.data;
      this.advisory = response.data;

      console.log(this.advisoryes);
    });
  },
  methods: {
    getStorableAdvisory(advisory) {
      return {
        id: advisory.id,
        schedule: advisory.schedule,
        title: advisory.title,
        chanel: advisory.chanel,
        media: advisory.media,
      };
    },

    findIndexById(id) {
      return this.advisoryes.findIndex((advisory) => advisory.id === id);
    },

    editCoachAdvisory(advisory) {
      this.advisory = { ...advisory };
      this.advisoryDialog = true;
    },
    openNew() {
      this.advisory = {};
      this.submitted = false;
      this.advisoryDialog = true;
    },
    hideDialog() {
      this.advisoryDialog = false;
      this.submitted = false;
    },
    saveCoachAdvisory() {
      this.submitted = true;
      this.advisory = this.getStorableCoach(this.advisory);
      this.advisoryService
        .update(this.advisory.id, this.advisory)
        .then((response) => {
          this.profiles[this.findIndexById(response.data.id)] =
            this.response.data;
          this.$toast.add({
            severity: "success",
            summary: "Successful",
            detail: "Coach Profile Updated",
            life: 3000,
          });
          console.log(response);
        });
      this.coachDialog = false;
      this.coach = {};
    },
  },
};
</script>
<style>
.p-button-lg{
 background-color: #C4C4C4;
  display: block;
  width: 70%;
  height: 100px;
  border: none;
  padding: 200px 200px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  margin:auto;
}
.p-card{
  box-shadow: 0 4px 20px 20px rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  width: 70%;
  padding-left: 20px;
  margin:auto;
}


</style>