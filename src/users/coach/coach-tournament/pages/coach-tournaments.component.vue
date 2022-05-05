<template>
  <div>
    <pv-button
        class="p-button-lg"
        label="New Tournament"
        icon="pi pi-plus"
        align="Center"
        @click="openNew"
    />
    <pv-divider/>


        <div>
          <pv-image src="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/04/26/15562666815994.jpg"
                     size= "xlarge"
                    alt="image advisory"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    width="275"
                    height="275"
                    preview/>
        </div>
        <div>
          <h2>Coach name</h2>
        </div>
    <h3>Title: </h3>
    <h3>Schedule: </h3>
    <h3>Chanel: </h3>
    <h3>Media: </h3>
    <pv-dialog
        v-model:visible="advisoryDialog"
        :style="{ width: '500px'}"
        header="Advisory Information"
        :modal="true"
        class="p-fluid"
    >
    </pv-dialog>


  </div>
</template>

<script>
import {TournamentsService} from "../services/tournaments.service";
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
      tournament:{},


      coachDialog: false,
      submitted:false,
      tournamentService:null,
      tournamentId:1,
      tournamentDialog:false,
    };
  }
};

</script>

<style >
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