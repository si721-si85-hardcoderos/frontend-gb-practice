<template>
  <nav-bar-student/>
  <div class="container">
    <br><br>
    <h1 style="text-align: center;color: white">AVAILABLE COACHES</h1>
    <div class="card container-2 body">
      <pv-card  style="width: 24.8rem; margin-bottom: 2em" v-for="coach of coaches">
        <template #title v-if="coach">
          {{coach.lastname}}
          {{coach.name}}
        </template>
        <template #subtitle v-if="coach">
          {{coach.nickname}}
        </template>
        <template #header v-if="coach">
          <pv-image v-bind:src="coach.urlToImage"
                    size= "large"
                    alt="image student"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    width="275"
                    height="200"
                    preview/>
        </template>
        <template #content v-if="coach">
          {{coach.bibliography}}
        </template>
        <template #footer v-if="coach">
          <h4>{{coach.tournaments}} | {{coach.selectedGame}}</h4>
          <div >
            <h5 class ="rate-sz">Rate {{coach.rate}}</h5>
            <pv-rating :modelValue= coach.rate :readonly="true" :stars="5" :cancel="false"/>
            <pv-button label="Choose" class="btn" />

          </div>
        </template>
      </pv-card>
    </div>
    <br><br>
  </div>

</template>

<script>

import StudentsService from "../../../coach/coach-student/services/students.service";
import CoachesService from '../../../coach/services/coaches.service.js'
import {ref} from "vue"
export default {

  name: "students",
  data: () => ({

    id:1,
    students: [],
    studentsCoach: [],
    coaches: [],
  }),
  setup() {
    const val1 = ref();

    return { val1}
  },
  mounted() {
    this.retrieveStudents();
  },
  methods:{

    retrieveStudents(){

      CoachesService.getAll().then((response)=>{
        this.coaches=response.data;
      })



    },
    getDisplayTutorial(tutorial) {
      return {
        id:tutorial.id,
        nickname:tutorial.nickname,
        name:tutorial.name,
        lastname:tutorial.lastname,
        tournaments:tutorial.tournaments,
        bibliography:tutorial.bibliography,
        studentsId:tutorial.studentsId
      };

    }

  }
}
</script>
<style>
.container{
  background-color: #2455A5;
  margin-left: 100px;
  margin-right: 100px;

}
.spacer{
  flex: 1 1 auto;
}
.container-2 {
  display: flex;
  justify-content: space-evenly;
  border-style: solid;
  border-width: 1px;
  border-color: blue;
  margin-left: 0px;
  margin-right: 0px;
  flex-direction: row;
  flex-wrap: wrap;
}

.card {
  border-style: solid;
  border-width: 0px;
  border-color: blue;
}

body {
  margin-left: 100px;
  margin-right: 100px;
}
.rate-sz{
  font-size: 1.2em;
  color: blue;
}
.btn{
}
</style>