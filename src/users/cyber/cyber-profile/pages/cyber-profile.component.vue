<template>
<div>
  <nav-bar-cyber/>

  <div class="container">
    <br>
    <h1 style="text-align: center;color: white"> PROFILE </h1>
    <br>
    <pv-card class="p-card" style="text-align: center">
      <template #header>
        <pv-image
            class="pv-image-holder"
            imageClass="pv-image-circle"
            v-bind:src="coach.cyberImage"
            alt="Image Coach"
            width="275"
            height="275"
            preview
        />
      </template>
      <template #content>
        <i class="pi pi-user"></i>
        <p class="pv-p">First Name:</p>
        <pv-input-text   v-model="coach.firstName"/>
        <pv-divider></pv-divider>

        <i class="pi pi-user"></i>
        <p class="pv-p">Cyber Name:</p>
        <pv-input-text  v-model="coach.cyberName"/>
        <pv-divider></pv-divider>

        <i class="pi pi-user"></i>
        <p class="pv-p">Last Name:</p>
        <pv-input-text  v-model="coach.lastName"/>
        <pv-divider></pv-divider>

        <i class="pi pi-briefcase"></i>
        <p class="pv-p">Bibliography:</p>
        <pv-input-text  v-model="coach.bibliography"/>
        <pv-divider></pv-divider>

        <i class="pi pi-briefcase"></i>
        <p class="pv-p">Cyber Image:</p>
        <pv-input-text  v-model="coach.cyberImage"/>
        <pv-divider></pv-divider>

        <pv-button label="Update Profile" @click="update"/>
      </template>
    </pv-card>
  </div>
</div>
</template>

<script>
import CybersService from '../../services/cybers.service.js'

export default {
  name: "cyber-profile",
  data() {
    return {
      profiles: [],
      coachDialog: false,
      submitted: false,
      coachService: null,
      coaches: [],
      coach:{},
      coachId: 1,
    };
  },

  mounted() {
    this.coachId=localStorage.getItem("id");
    CybersService.getAll().then((response)=>{
      this.coaches=response.data;
      this.coach=this.coaches.find(x=>(x.id==this.coachId));
    });
    /*
    this.coachService = new coachProfileService();
    this.coachService.getAll().then((response) => {
      this.profiles = response.data;
      this.coach = response.data;

      console.log(this.profiles);
    });*/

  },
  methods: {
    update(){
      CybersService.update(this.coachId,this.coach).then((response)=>{
        //Agregar Notificacion
      })
    },
    getStorableCoach(coach) {
      return {
        id: coach.id,
        nickname: coach.nickname,
        name: coach.name,
        lastname: coach.lastname,
        role: coach.role,
        heroes: coach.heroes,
        tournaments: coach.tournaments,
        bibliography: coach.bibliography,
      };
    },
    findIndexById(id) {
      return this.profiles.findIndex((coach) => coach.id === id);
    },
    editCoachProfile(coach) {
      this.coach = { ...coach };
      this.coachDialog = true;
    },
    saveCoachProfile() {
      this.submitted = true;
      this.coach = this.getStorableCoach(this.coach);
      CybersService.update(this.coach.id, this.coach).then((response) => {
        this.profiles[this.findIndexById(response.data.id)] =
            this.response.data;
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Cyber Profile Updated",
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

.pv-image-circle{
  border-radius: 30%;
  margin-left: auto;

}

.pv-p{
  font-family: Roboto;
  font-size: x-large;
  size: 100px;
  font-weight: bold;
}
.p-card{
  box-shadow: 0 4px 20px 20px rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  width: 70%;
  padding-left: 20px;
  padding-top: 20px;
  margin:auto;
  margin-top:20px;
}
.container{
  background-color: #2455A5;
  margin-left: 100px;
  margin-right: 100px;
}

</style>