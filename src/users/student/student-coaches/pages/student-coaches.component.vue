<template>
  <nav-bar-student/>
  <div class="container">
    <br><br>
    <h1 style="text-align: center;color: white">AVAILABLE COACHES</h1>
    <div class="card container-2 body">
      <pv-card  style="width: 24.8rem; margin-bottom: 2em" v-for="coach of coachesNotSelected">
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
            <pv-button label="Choose" class="btn" @click="chooseCoach(coach.id)" />

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
import CoachStudentsService from "../../student-selected-coaches/services/coach-students.service.js"
import {ref} from "vue"
export default {

  name: "student-coaches",
  data: () => ({

    id:1,
    students: [],
    studentsCoach: [],
    coaches: [],
    coachesNotSelected: [],
    coach_students: [],
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
      this.coachesNotSelected= [];

      CoachStudentsService.getByStudentId(this.id).then((response)=>{
        this.coach_students=response.data;
        CoachesService.getAll().then((response2)=>{
          this.coaches=response2.data;
          this.coachesNotSelected=this.coaches;
          for(let coach_student of this.coach_students){
            console.log(coach_student);
            this.coachesNotSelected=this.coachesNotSelected.filter(x=>(x.id!=coach_student.coachId));
          }
          console.log(this.coachesNotSelected);
        })
      })



    },
    chooseCoach(id){
      let coachStudentModel={};
      coachStudentModel.id=0;
      coachStudentModel.coachId=id;
      coachStudentModel.studentId=this.id;
      CoachStudentsService.create(coachStudentModel).then(()=>{
        this.retrieveStudents();
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