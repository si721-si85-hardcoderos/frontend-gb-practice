<template>
  <nav-bar-student />
  <div class="container">
    <br>
    <h1 style="text-align: center;color: white"> ADVISORIES</h1>
    <br>
    <div class="add-advisory-btn">
      <pv-button class="p-button-secondary p-button-sm">New Advisory</pv-button>
    </div>
    <div class="container-2">
      <pv-card style="width: 24.8rem; margin-bottom: 2em" v-for="advisory of advisories">
        <template #title v-if="advisory">
          {{advisory.title}}
          <br>
          {{advisory.description}}
        </template>
        <template #subtitle v-if="advisory">
          Date: {{advisory.date}}
          <br>
          Hour: {{advisory.hour}}


        </template>
        <template #header v-if="advisory">
          <pv-image v-bind:src="advisory.advisoryImage" size="large" alt="image advisory"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" width="275" height="200" preview />
        </template>
        <template #content v-if="advisory">
          Coach Name: {{advisory.coach.nickName}}
        </template>
        <template #footer v-if="advisory">
          <h4>Discord Server: {{advisory.discorServer}} </h4>


        </template>
      </pv-card>
    </div>
    <br><br>
  </div>

</template>

<script>

import AdvisoriesService from '../../../coach/coach-advisory/services/advisories.service.js'
import CoachesService from '../../services/coaches.service.js';
export default {
  name: "students",
  data: () => ({

    id: 1,
    students: [],
    studentsCoach: [],
    coaches: [],
    advisories: [],
  }),
  mounted() {
    this.id = localStorage.getItem("id");
    this.retrieveAdvisories();
  },
  methods: {

    retrieveAdvisories() {
      AdvisoriesService.getAll().then((response) => {
        this.advisories = response.data;
        this.advisories = this.advisories.filter(x => x.student.id == this.id);
        console.log(this.advisories);
        for (let advisory of this.advisories) {
          CoachesService.getAll().then((response2) => {
            console.log(response2.data.find(x => x.id == advisory.coach.id));
            advisory.coachNickname = (response2.data[0].nickName);
          })
        }
      })


    },
    getDisplayTutorial(tutorial) {
      return {
        id: tutorial.id,
        nickname: tutorial.nickname,
        name: tutorial.name,
        lastname: tutorial.lastname,
        role: tutorial.role,
        heroes: tutorial.heroes,
        tournaments: tutorial.tournaments,
        bibliography: tutorial.bibliography,
        studentsId: tutorial.studentsId
      };

    }

  }
}
</script>
<style>
.container {
  background-color: #2455A5;
  margin-left: 100px;
  margin-right: 100px;
}

.spacer {
  flex: 1 1 auto;
}

.container-2 {}

.add-advisory-btn {
  display: flex;
  justify-content: center;
}
</style>