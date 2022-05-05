<template>
  <div>
    <div class="card">
      <pv-toolbar class="mb-auto">
        <template #start>
          <pv-image
            src="https://www.infobae.com/new-resizer/MNHmV03_B5YfGxHUoWdlomoS2JQ=/992x558/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/08/09153344/Oxaciano.jpg"
            alt="Image Coach"
            width="275"
            height="275"
            preview
          />
          <pv-button
            label="New"
            icon="pi pi-plus"
            class="p-button-success mr-2"
            @click="openNew"
          />
          <h1>Hola </h1>
          
          


        </template>
        
      </pv-toolbar>
          <input v-if="coach" v-model="coach.name"/>
          <input v-if="coach" v-model="coach.nickname"/>
          <input v-if="coach" v-model="coach.lastname"/>
          <input v-if="coach" v-model="coach.role"/>
          <input v-if="coach" v-model="coach.heroes"/>
          <input v-if="coach" v-model="coach.tournaments"/>
          <input v-if="coach" v-model="coach.bibliography"/>
          
          <pv-button label="Update Profile" @click="update"/>      

    </div>
  </div>
</template>

<script>
import CoachesService from '../../services/coaches.service.js'

export default {
  name: "coach-profile",
  data() {
    return {
      profiles: [],
      coachDialog: false,
      submitted: false,
      coachService: null,
      coaches: [],
      coach:{},
      coachId: 2,
    };
  },

  mounted() {
    CoachesService.getAll().then((response)=>{
      this.coaches=response.data.map(this.getStorableCoach);
      this.coach=this.coaches.find(x=>(x.id==this.coachId));
      console.log(this.coach);
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
      CoachesService.update(this.coachId,this.coach).then((response)=>{
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
      this.coachService.update(this.coach.id, this.coach).then((response) => {
        this.profiles[this.findIndexById(response.data.id)] =
          this.response.data;
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Coach Profile Updated",
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
