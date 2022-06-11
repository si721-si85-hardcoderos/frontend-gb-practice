<template>

<div>
<nav-bar-cyber/>
<pv-divider></pv-divider>
<pv-card class="p-card">
  <template #header>
    <pv-image
        class="pv-image-holder"
        imageClass="pv-image-circle"
        src="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/04/26/15562666815994.jpg"
        alt="Image Coach"
        width="275"
        height="275"
        preview
    />
  </template>


  <template #content>
    <i class="pi pi-user"></i>
    <p class="pv-p">First Name:</p>
    <pv-input-text   v-model="coach.name"/>
    <pv-divider></pv-divider>

    <i class="pi pi-user"></i>
    <p class="pv-p">Nickname:</p>
    <pv-input-text  v-model="coach.nickname"/>
    <pv-divider></pv-divider>

    <i class="pi pi-user"></i>
    <p class="pv-p">Last Name:</p>
    <pv-input-text  v-model="coach.lastname"/>
    <pv-divider></pv-divider>
    <i class="pi pi-tag"></i>
    <p class="pv-p">Role:</p>
    <pv-input-text  v-model="coach.role"/>
    <pv-divider></pv-divider>
    <i class="pi pi-star"></i>
    <p class="pv-p">Heroes:</p>
    <pv-input-text  v-model="coach.heroes"/>
    <pv-divider></pv-divider>

    <i class="pi pi-ticket"></i>
    <p class="pv-p">Tournaments:</p>
    <pv-input-text  v-model="coach.tournaments"/>
    <pv-divider></pv-divider>

    <i class="pi pi-briefcase"></i>
    <p class="pv-p">Bibliography:</p>
    <pv-input-text  v-model="coach.bibliography"/>
    <pv-divider></pv-divider>

    <pv-button label="Update Profile" @click="update"/>
  </template>

</pv-card>

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


</style>