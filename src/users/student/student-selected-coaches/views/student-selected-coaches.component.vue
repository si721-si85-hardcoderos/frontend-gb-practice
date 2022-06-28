<template>
  <nav-bar-student/>
  <div class="container">
    <br>
    <h1 style="text-align: center;color: white"> MY COACHES </h1>
    <br>
    
    <div class="container-2">
      <pv-card style="width: 24.8rem; margin-bottom: 2em" v-for="coach of coachesSelected">
        <template #title v-if="coach">
          {{coach.firstName}}
          {{coach.lastName}}
        </template>
        <template #subtitle v-if="coach">
          {{coach.nickName}}
        </template>
        <template #header v-if="coach">
          <pv-image v-bind:src="coach.userImage"
                    size= "large"
                    alt="image coach"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    width="275"
                    height="200"
                    preview/>
        </template>
        <template #content v-if="coach">
          {{coach.bibliography}}
        </template>
        <template #footer v-if="coach">
          <h4>{{coach.selectedGame}}</h4>
          <pv-button label="Unsubscribe" class="btn" @click="unsubscribe(coach.id)" />
        </template>

      </pv-card>
    </div>
    <br><br>
  </div>

</template>

<script>

import StudentsService from "../../../coach/coach-student/services/students.service";
import CoachesService from "../../services/coaches.service";
import CoachStudentsService from "../services/coach-students.service"

export default {
  name: "student-selected-coaches",
  data: () => ({

    id:1,
    students: [],
    studentsCoach: [],
    coaches: [],
    coachesSelected: [],
    coach_students: [],
  }),
  mounted() {
    this.id=localStorage.getItem("id");
    this.retrieveCoaches();
  },
  methods:{
    unsubscribe(id){
      CoachStudentsService.getAll().then((response)=>{
        let coachStudentAux={};
        coachStudentAux=response.data.filter(x=>x.student.id==this.id&&x.coach.id==id);
        console.log(coachStudentAux[0].id);
        console.log(coachStudentAux.length,"length");
        CoachStudentsService.delete(coachStudentAux[0].id).then((response2)=>{
          console.log('a');
          this.retrieveCoaches();
        });
      })
    },

    retrieveCoaches(){
      this.coachesSelected = [];

      CoachStudentsService.getAll().then((response)=>{
        this.coach_students=response.data.filter(x=>x.student.id==this.id);
        CoachesService.getAll().then((response2)=>{
          this.coaches=response2.data;
          for(let coach_student of this.coach_students){
            this.coachesSelected.push(this.coaches.find(x=>(x.id==coach_student.coach.id)));
          }
        })
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