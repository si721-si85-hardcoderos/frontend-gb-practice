<template>
  <nav-bar-cyber/>

  <div class="container">
    <br>
    <h1 style="text-align: center;color: white"> TOURNAMENTS </h1>
    <br>

    <pv-button
        class="p-button-lg"
        label="Create Tournament"
        icon="pi pi-plus"
        align="Center"
        @click="openNew"
    />
    <pv-divider/>

    <pv-card v-for="tournament of tournamentsCreated" style="width: 395px">
      <template #header>
        <pv-image v-bind:src="tournament.cyber.cyberImage"
                  size= "xlarge"
                  alt="image tournaments"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  width="275"
                  height="200"
                  preview/>
      </template>
      <template #title>
        {{ tournament.title }}
      </template>
      <template #subtitle>
        {{  tournament.description }}
      </template>
      <template #content>
        <h4>Schedule: {{tournament.date}}</h4>
        <h4>Location: {{tournament.addres}}</h4>
        <h4>Capacity: {{tournament.capacity}}</h4>
      </template>
      <template #footer>
        <pv-button @click="cancelTournament(tournament.id)">Cancel</pv-button>
      </template>

    </pv-card>

    <pv-dialog
        v-model:visible="tournamentDialog"
        :style="{ width: '500px'}"
        header="Tournament Information"
        :modal="true"
        class="p-fluid"
    >
      <div class="field">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="title"
              v-model.trim="tournament.title"
              required="true"
              autofocus
              :class="{'p-invalid':submitted && !tournament.title}"
          />
          <label for="tournamentTitle">Title</label>
          <small class="p-error" v-if="submitted && !tournament.title"
          >Title is required</small>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="description"
              v-model.trim="tournament.description"
              required="true"
              autofocus
              :class="{'p-invalid':submitted && !tournament.description}"
          />
          <label for="tournamentTitle">Cyber's Description</label>
          <small class="p-error" v-if="submitted && !tournament.name"
          >Cyber's name is required</small>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-textarea
              id="date"
              v-model="tournament.date"
              required="false"
              rows="2"
              cols="2"
          />
          <label for="tournamentdate">Date</label>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-textarea
              id="addres"
              v-model="tournament.addres"
              required="false"
              rows="2"
              cols="2"
          />
          <label for="tournamentaddres">Address</label>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-input-text
              id="capacity"
              v-model="tournament.capacity"
              required="true"
          />
          <label for="tournamentcapacity">Capacity</label>
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

    <br><br>
  </div>
</template>

<script>
import TournamentsService from "../../../coach/coach-tournament/services/tournaments.service";
export default {
  name: "cyber-tournament",
  data() {
    return  {
      tournaments: [],
      tournamentsCreated: [],
      students:[],
      tournament: {},
      id:1,
      coachTournaments:[],
      coachId:1,
      tournamentTitle:'',
      tournamentDate:'',
      tournamentAttacches:'',
      tournamentNew:{},


      coachDialog: false,
      submitted:false,
      tournamentService:null,
      tournamentId:1,
      tournamentDialog:false,
    };
  },
  mounted(){
    this.id=localStorage.getItem("id");
    this.retrieveTournaments();
  },
  methods:{
    retrieveTournaments(){
      this.tournamentsCreated = [];

      TournamentsService.getAll().then((response)=>{
        this.tournaments=response.data;
        this.tournamentsCreated=(this.tournaments.filter(x=>(x.cyber.id==this.id)));
      });
    },
    getStorableAdvisory(tournament){
      return {
        id: tournament.id,
        name: tournament.name,
        title: tournament.title,
        schedule:tournament.date,
        location: tournament.location,
        urlToImage: tournament.urlToImage
      };
    },
    openNew() {
      this.tournament = {};
      this.submitted = false;
      this.tournamentDialog = true;
    },
    hideDialog() {
      this.tournamentDialog = false;
      this.submitted = false;
    },
    saveTournament(){
      if(!this.tournament.title||!this.tournament.description
          ||!this.tournament.date||!this.tournament.addres||!this.tournament.capacity) return;
      this.tournament.id=0;
      this.tournament.cyberId=this.id;
      TournamentsService.create(this.tournament).then((response)=>{
        this.retrieveTournaments();
        this.hideDialog();
      })
    },
    cancelTournament(id){
      console.log(id);
      TournamentsService.delete(id).then((response)=>{
        console.log(response.data);
        this.retrieveTournaments();
      })
    }

  }
};
</script>

<style scoped>

</style>