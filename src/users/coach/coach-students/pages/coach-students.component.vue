<template>
<nav-bar/>
  <div class="container">
    <br><br>
      <h1 style="text-align: center;color: white"> STUDENTS</h1>
    <div class="container-2">
      <pv-card style="width: 24.8rem; margin-bottom: 2em" v-for="student of studentsCoach">
        <template #title v-if="student">
          {{student.lastname}}
          {{student.name}}
        </template>
        <template #subtitle v-if="student">
          {{student.nickname}}
        </template>
        <template #header v-if="student">
          <pv-image v-bind:src="student.urlToImage"
                    size= "large"
                    alt="image student"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    width="275"
                    height="200"
                    preview/>
        </template>
        <template #content v-if="student">
          {{student.bibliography}}
        </template>
        <template #footer v-if="student">
          <h4>{{student.tournaments}} | {{student.heroes}} | {{student.role}}</h4>

        </template>
      </pv-card>
    </div>
      <br><br>
  </div>

</template>

<script>

import StudentsService from '../../coach-student/services/students.service.js'
import CoachesService from '../../../coach/services/coaches.service.js'

export default {
    name: "students",
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
        
        StudentsService.getAll().then((response)=>{
          this.students=response.data;
        })
        CoachesService.getAll().then((response)=>{
          this.coaches=response.data;
          console.log(this.coaches);
          for(let studentId of this.coaches.find(x=>(x.id==this.id)).studentsId){
            console.log(studentId);
            this.studentsCoach.push(this.students.find(x=>(x.id==studentId)));
            /*StudentsService.getById(studentId).then((response2)=>{
              this.students.push(response2.data.map(this.getDisplayTutorial));
            })*/
          }
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