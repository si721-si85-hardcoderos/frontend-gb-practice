<template>
  <div class="container">
    <br><br>
    <pv-button
        class="p-button-lg"
        label="New Tournament"
        icon="pi pi-plus"
        align="Center"
        @click="openNew"
    />
    <pv-divider/>

    <pv-card v-for="tournament of tournaments" style="width: 395px">
      <template #header>
        <pv-image src="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/04/26/15562666815994.jpg"
                  size= "xlarge"
                  alt="image tournaments"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  width="275"
                  height="200"
                  preview/>
      </template>
      <template #title>
        Road to Major
      </template>
      <template #subtitle>
        Cyber: G2-House
      </template>
      <template #content>
        <h4 style="font-type: bold">{{tournament.title}}</h4>
        <h4>Schedule: {{tournament.schedule}}</h4>
        <h4>Chanel: {{tournament.chanel}}</h4>
        <h4>Media: {{tournament.media}}</h4>
      </template>
      <template #footer>
        <pv-button>Cancel</pv-button>
      </template>

    </pv-card>

    <pv-dialog
        v-model:visible="advisoryDialog"
        :style="{ width: '500px'}"
        header="Advisory Information"
        :modal="true"
        class="p-fluid"
    >
    </pv-dialog>

    <br><br>
  </div>
</template>

<script>
import TournamentsService from "../services/tournaments.service";
export default {
  name: "coach-tournament",
  data() {
    return  {
      tournaments: [],
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
    TournamentsService.getAll().then((response)=>{
      this.tournaments=response.data.map(this.getStorableAdvisory);
    });
  },
  methods:{
    getStorableAdvisory(advisory){
      return {
        id: advisory.id,
        title: advisory.title,
        schedule:advisory.schedule,
        chanel: advisory.chanel,
        media: advisory.media
      };
    }
  }
};

</script>

<style >
.p-button-lg{
  background-color: #C4C4C4;
  display: block;
  width: 40%;
  height: 100px;
  border: none;
  padding: 200px 200px;
  font-size: 50px;
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