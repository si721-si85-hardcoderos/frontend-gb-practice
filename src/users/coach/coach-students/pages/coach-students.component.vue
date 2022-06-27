<template>
  <nav-bar-coach/>
  <div class="container">
    <br>
    <h1 style="text-align: center;color: white"> STUDENTS</h1>
    <br>    
    <div class="container-2">
      <pv-card style="width: 24.8rem; margin-bottom: 2em" v-for="student of studentsSelected">
        <template #title v-if="student">
          a{{student.firstName}}
          {{student.lastName}}
        </template>
        <template #subtitle v-if="student">
          {{student.nickName}}
        </template>
        <template #header v-if="student">
          <pv-image v-bind:src="student.userImage"
                    size= "large"
                    alt="image student"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    width="275"
                    height="200"
                    preview/>
        </template>
        <template #content v-if="student">
          {{student.email}}
        </template>

      </pv-card>
    </div>
      <br><br>
  </div>

</template>

<script>

import StudentsService from '../../coach-student/services/students.service.js'
import CoachesService from '../../../coach/services/coaches.service.js'
import CoachStudentsService from '../../../student/student-selected-coaches/services/coach-students.service.js';

export default {
    name: "students",
    data: () => ({

      id:1,
      students: [],
      studentsSelected: [],
      studentsCoach: [],
      coaches: [],
      coach_students: [],
    }),
    mounted() {
      this.id = localStorage.getItem("id");
      this.retrieveStudents();
    }, 
    methods:{
      retrieveStudents(){
        this.studentsSelected = [];
        CoachStudentsService.getAll().then((response)=>{
          this.coach_students=response.data.filter(x=>(x.coach.id==this.id));
          StudentsService.getAll().then((response2)=>{
            this.students=response2.data;
            for(let coach_student of this.coach_students){
              this.studentsSelected.push(this.students.find(x=>(x.id==coach_student.student.id)));
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