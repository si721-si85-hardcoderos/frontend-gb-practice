
<template >
  <nav-bar-cyber/>
  <div class="container">
    <br>
    <h1 style="text-align: center;color: white"> EVENTS </h1>
    <br>
    <pv-button
        class="p-button-lg"
        label="Create Event"
        icon="pi pi-plus"
        align="Center"
        @click="openNew"
    />
    <pv-divider/>
    <div class="cards">
      <pv-card class="p-card" v-for="event of events">
        <template #header>
          <div class="card-headboard">
            <h2>{{event.title }} </h2>
          </div>
          <div class="content">
            <div class="card-description">
              <h5>{{event.description}}</h5>
              <pv-image
                  v-bind:src="event.imageEvent"
                  alt="image announcement"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  width="275"
                  height="275"
                  preview
              />
              <br>
              <div class="pd-a">
                <a :href= event.urlPublication class="button">Read More</a>               
              </div>
                <br>
                <pv-button @click="cancelTournament(event.id)">Cancel</pv-button>
            </div>
          </div>
        </template>
      </pv-card>
      <pv-dialog
          v-model:visible="eventDialog"
          :style="{ width: '500px'}"
          header="Event Information"
          :modal="true"
          class="p-fluid"
      >
        <div class="field">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="title"
              v-model.trim="event.title"
              required="true"
              autofocus
              :class="{'p-invalid':submitted && !event.title}"
          />
          <label for="eventTitle">Title</label>
          <small class="p-error" v-if="submitted && !event.title"
          >Title is required</small>
        </span>
        </div>

        <div class="field">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="description"
              v-model.trim="event.description"
              required="true"
              autofocus
              :class="{'p-invalid':submitted && !event.description}"
          />
          <label for="eventTitle">Description</label>
          <small class="p-error" v-if="submitted && !event.description"
          >Cyber's description is required</small>
        </span>
        </div>

        <div class="field">
        <span class="p-float-label">
          <pv-textarea
              id="imagePublication"
              v-model="event.imageEvent"
              required="false"
              rows="2"
              cols="2"
          />
          <label for="imagePublication">Image Event</label>
        </span>
        </div>

        <div class="field">
        <span class="p-float-label">
          <pv-textarea
              id="urlPublication"
              v-model="event.urlPublication"
              required="false"
              rows="2"
              cols="2"
          />
          <label for="eventUrlPublication">Url Publication</label>
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
              @click="saveTournament"
          />
        </template>

      </pv-dialog>



    </div>
  </div>
</template>

<script>
import CyberEventsService from "../services/cyber-events.service";

export default {
  name: "cyber-events",
  data() {
    return {
      advisoryes: [],
      events: [],
      eventDialog: false,
      submitted: false,
      event: {},
      advisoryId: 1,
    };
  },
  mounted() {
    this.id=localStorage.getItem("id");
    this.retrieveData();
  },
  methods: {
    retrieveData(){
      CyberEventsService.getAll().then((response)=>{
        this.events=response.data;
      })
    },

    getStorableEvent(event) {
      return {
        id: event.id,
        title: event.title,
        description: event.description,
        imagePublication: event.imagePublication,
        urlPublication: event.urlPublication
      };
    },
    findIndexById(id) {
      return this.advisoryes.findIndex((advisory) => advisory.id === id);
    },

    editCoachAdvisory(advisory) {
      this.coach = { ...advisory };
      this.coachDialog = true;
    },

    saveCoachAdvisory() {
      this.submitted = true;
      this.event = this.getStorableCoach(this.event);
      this.coachDialog = false;
      this.coach = {};
    },
    openNew() {
      this.tournament = {};
      this.submitted = false;
      this.eventDialog = true;
    },
    hideDialog() {
      this.tournamentDialog = false;
      this.submitted = false;
    },
    saveTournament(){
      if(!this.event.imageEvent||!this.event.urlPublication||!this.event.title||!this.event.description) return;
      this.event.id=0;
      this.event.address="x";
      this.event.cyberId=this.id;
      CyberEventsService.create(this.event).then((response)=>{
        this.retrieveData();
        this.hideDialog();
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Cyber Profile Updated",
          life: 3000,
        });
        this.eventDialog = false;
      })
    },
    cancelTournament(id){
      console.log(id);
      CyberEventsService.delete(id).then((response)=>{
        this.retrieveData();
      })
    }

  },
};
</script>
<style>

.cards{
  margin-left: auto;
  margin-right:auto;
}
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
  margin-left: auto;
  margin-right:auto;
  margin-top: 25px;
  box-shadow: 0 4px 20px 20px rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  width: 600px;


}
.p-card-title{
  background-color: white;
}
.card-description {
  text-align: center;
  background-color: white;
}

.content{
  text-align: center;
  background-color: white;
  margin-left: 20px;
  margin-right: 20px;
}
.card-headboard img {
  margin-top: 25px;
  width:50px;
  height: 50px;
  border-radius: 50px;
}

.dv-color{
  background-color: #003c8f;
}
.pd-a{
  margin-top: 1rem;
}
.button {
  background-color: #0086c3;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.container{
  background-color: #2455A5;
  margin-left: 100px;
  margin-right: 100px;
}
</style>
<link rel="stylesheet" href="https://unpkg.com/primeflex@3.1.0/primeflex.css">
