<link rel="stylesheet" href="https://unpkg.com/primeflex@3.1.0/primeflex.css">

<template>

      <h1>Asesorías</h1>
  <pv-button class="p-button-lg" label="+Programar Asesoría"  align="Center" />
  <pv-divider/>
  <pv-card class="p-card">

    <template #header>

      <pv-avatar image="https://www.infobae.com/new-resizer/MNHmV03_B5YfGxHUoWdlomoS2JQ=/992x558/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/08/09153344/Oxaciano.jpg"
       size= "xlarge" />  <p>Coach name</p>

      <h3>Titulo:</h3>
      <h3>Horario:</h3>
      <h3>Servidor De discord:</h3>
      <h3>Adjuntos:</h3>
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
    };
  },
  created() {
    this.advisoryService = new coachAdvisoryService();
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
        nickname: advisory.nickname,
        name: advisory.name,
        description: advisory.description,
        coach: advisory.coach,
        tournaments: advisory.tournaments,
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