<template>
    <div class="coach-home.component.vue"></div>
</template>

<link rel="stylesheet" href="https://unpkg.com/primeflex@3.1.0/primeflex.css">

<template>

  <h1>Anuncios</h1>
<br>

  <div class="cards">

    <pv-card class="p-card">

      <template #header>
        <div class="card-headboard">

          <img
              src="https://i.pinimg.com/originals/0a/60/bc/0a60bc05b97180bf77a29d734d655223.jpg"
              alt="image user"
          />Jose Domingo

        </div>
        <div class="content">
          <div class="p-card-title">
            <h3>Dota 2 cancela la primera Major del 2022 debido a los contagios de COVID-19 </h3>
          </div>
          <div class="card-description">
            <h5>La variante Ómicron es mucho más contagiosa que otras.Por este motivo, han regresado las medidas sanitarias en los eventos presenciales.
              Cuando inició la pandemia del coronavirus en 2020, Valve canceló el Circuito Profesional de Dota 2 debido a que no había garantías para los pro-players, los espectadores y organizadores.
              Pese a esto, en 2021 sí lograron organizar el Mundial The International 10.
              Lamentablemente, se comienza a repetir la situación con la llegada de la variante Ómicron. Recientemente,
              se reportó la cancelación del inicio del circuito de 2022. La primera Major no podrá realizarse por las restricciones de vuelos.</h5>
            <pv-image
                src="https://depor.com/resizer/Lkt-JPjl9HxH5GZ_X4bSKmrmpxY=/1200x1200/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/Z4ACFMKYZVFZHPPR7PQE74TB2E.jpg"
                alt="image announcement"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                width="275"
                height="275"
                preview
            />
            <br>
            <a href="https://depor.com/depor-play/esports/dota-2-cancela-la-primera-major-del-2022-debido-a-los-contagios-de-covid-19-esports-videojuegos-valve-noticia/">Leer Màs</a>

          </div>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<script>
import {coachHomeService} from "../services/coach-home.service";

export default {
  name: "coach-home",
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
    this.advisoryService = new coachHomeService();
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

  background-color: dodgerblue;
:auto;
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


</style>
