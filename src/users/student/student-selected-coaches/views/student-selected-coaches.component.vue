<template>
  <nav-bar/>
  <div class="container">
    <br><br>
    <h1 style="text-align: center;color: white"> STUDENTS</h1>
    <div class="container-2">
      <pv-card style="width: 24.8rem; margin-bottom: 2em" v-for="coach of coaches">
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
          <h4>{{coach.tournaments}} | {{coach.heroes}} | {{coach.role}}</h4>

        </template>
      </pv-card>
    </div>
    <br><br>
  </div>

</template>

<script>

import StudentsService from "../../../coach/coach-student/services/students.service";
import CoachesService from "../../services/coaches.service";

export default {
  name: "student-selected-coaches",
  data: () => ({

    id:1,
    students: [],
    studentsCoach: [],
    coaches: [],
  }),
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
        role:tutorial.role,
        heroes:tutorial.heroes,
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
.container-2{

}


</style>