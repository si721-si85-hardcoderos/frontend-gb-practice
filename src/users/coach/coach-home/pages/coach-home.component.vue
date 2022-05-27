<link rel="stylesheet" href="https://unpkg.com/primeflex@3.1.0/primeflex.css">

<template >
  <nav-bar/>
  <div class="dv-color">

    <h1 style="font-size:40px" >Anuncios</h1>
    <br>
    <div class="cards">

      <pv-card class="p-card" v-for="publication of publications">

        <template #header>
          <div class="card-headboard">

            <img
                v-bind:src="publication.imageAvatar"
                alt="image user"
            />{{publication.title}}

          </div>
          <div class="content">
            <div class="p-card-title">
              <h3>{{ publication.bibliography }} </h3>
            </div>
            <div class="card-description">
              <h5>{{publication.description}}</h5>
              <pv-image
                  v-bind:src="publication.imagePublication"
                  alt="image announcement"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  width="275"
                  height="275"
                  preview
              />
              <br>
              <div class="pd-a">
                <a :href= publication.urlPublication class="button">Read More</a>
              </div>
            </div>
          </div>
        </template>
      </pv-card>
    </div>

    <h1 style="font-size:40px" >Enventos</h1>
    <div class="cards">
      <pv-card>

        <template #header>
          <div class="card-headboard">
            <h2>Perú Gaming Show: la feria</h2>
          </div>
          <div class="content">

            <div class="card-description">
              <h5>Perú Gaming Show es un evento imperdible para los propietarios y responsables de los casinos, bingos y centros recreativos de Perú y la Región Andina.Hasta allí se desplazan las principales firmas proveedoras de máquinas expendedoras y tragamonedas, sistemas de seguridad o soluciones tecnológicas para estos negocios, entre otros muchos productos y servicios, para presentar sus novedades y generar nuevos contactos comerciales.</h5>
              <pv-image
                  src="https://assets.gamingintelligence.com/wp-content/uploads/sites/4/2022/05/16113943/Nota-de-prensa.jpg"
                  alt="image event"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  width="275"
                  height="275"
                  preview
              />
              <br>
              <div class="pd-a">
                <a href= "https://www.nferias.com/peru-gaming-show/" class="button">Read More</a>
              </div>
            </div>
          </div>
        </template>
      </pv-card>
      <pv-card>

        <template #header>
          <div class="card-headboard">
            <h2>Mobile Legends: Bang Bang organiza su primer campeonato oficial en el Perú</h2>
          </div>
          <div class="content">

            <div class="card-description">
              <h5>Los ganadores tendrán premios de hasta 25,000 diamantes del videojuego y la posibilidad de enfrentarse a los campeones de la MLBB Copa Challenger Perú</h5>
              <pv-image
                  src="https://i.ytimg.com/vi/W5KOaJ8tS1A/maxresdefault.jpg"
                  alt="image event"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  width="275"
                  height="275"
                  preview
              />
              <br>
              <div class="pd-a">
                <a href= "https://www.karlosperu.com/mobile-legends-bang-bang-organiza-su-primer-campeonato-oficial-en-el-peru/" class="button">Read More</a>
              </div>
            </div>
          </div>
        </template>
      </pv-card>
    </div>
  </div>
</template>

<script>
import CoachHomeService from "../services/coach-home.service";
import CoachEventsService from "../services/coach-events.service";
export default {
  name: "coach-home",
  data() {
    return {
      advisoryes: [],
      publications: [],
      coachDialog: false,
      submitted: false,
      advisory: {},
      advisoryId: 1,
      /*events: [],
      advisoryesEvents: [],
      coachDialogEvents: false,
      submittedEvents: false,
      advisoryEvents: {},
      advisoryIdEvents: 1,*/

    };
  },
  mounted() {
    this.retrieveData();
    // this.retrieveDataEvents()
  },
  methods: {
    retrieveData(){
      CoachHomeService.getAll().then((response)=>{
        this.publications=response.data.map(this.getStorableAdvisory);
      })
    },
    /*retrieveDataEvents(){
      CoachEventsService.getAllEvents().then((response)=>{
        this.events=response.data.map(this.getStorableAdvisoryEvents);
      })
    },*/
    getStorableAdvisory(advisory) {
      return {
        id: advisory.id,
        nickname: advisory.nickname,
        userId:advisory.userId,
        title: advisory.title,
        description: advisory.description,
        image: advisory.image,
        imagePublication: advisory.imagePublication,
        imageAvatar: advisory.imageAvatar,
        urlPublication: advisory.urlPublication
      };
    },

    /*   getStorableAdvisoryEvents(advisoryEvents) {
         return {
           eventsId: advisoryEvents.eventsId,
           eventsImagePublication: advisoryEvents. eventsImagePublication,
           eventsUrlPublication: advisoryEvents.eventsUrlPublication,
           eventsTitle: advisoryEvents.eventsTitle,
           eventsDescription: advisoryEvents.eventsDescription
         };
       },*/

    findIndexById(id) {
      return this.advisoryes.findIndex((advisory) => advisory.id === id);
    },

    /* findIndexByIdEvents(id) {
       return this.advisoryesEvents.findIndex((advisoryEvents) => advisoryEvents.eventsId === id);
     },*/

    editCoachAdvisory(advisory) {
      this.coach = { ...advisory };
      this.coachDialog = true;
    },

    saveCoachAdvisory() {
      this.submitted = true;
      this.advisory = this.getStorableCoach(this.advisory);
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
</style>
