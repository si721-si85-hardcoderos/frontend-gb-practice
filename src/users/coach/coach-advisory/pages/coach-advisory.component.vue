<template>
  <div class="container">
    <br><br>
    <pv-button
        class="p-button-lg"
        label="New Advisory"
        icon="pi pi-plus"
        align="Center"
        @click="openNew"
    />
    <pv-divider/>

    <pv-card style="width: 43em; margin-bottom: 2em; height: 25em" v-for="advisory of coachAdvisories">

      <template #header>
        <div style="width: 20%; float:right">
          <pv-avatar image="https://www.infobae.com/new-resizer/MNHmV03_B5YfGxHUoWdlomoS2JQ=/992x558/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/08/09153344/Oxaciano.jpg"
                     size= "xlarge" />
        </div>
        <div style="width: 80%; float:left">
          <h3>Coach name {{coachName}}</h3>
        </div>
      </template>
      <template #title>
        <br><br>
        {{advisory.title}}
      </template>
      <template #subtitle>
        {{advisory.description}}
      </template>
      <template #content>
        <div style="width: 50%; float:left">
          <pv-image
              v-bind:src="advisory.urlToImage"
              alt="image advisory"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              width="290"
              height="200"
              preview
          />
        </div>
        <div style="width: 50%; float:right">
          <h3>Schedule: {{advisory.date}} | {{advisory.hour}}</h3>
          <h3>Student: {{advisory.studentName}}</h3>
          <h3>Chanel: {{advisory.discordServer}}</h3>
        </div>

        <h3></h3>

      </template>
      <template #footer>
        <pv-button label="Delete Advisory" @click="deleteAdvisory(advisory.id)"/>
      </template>

    </pv-card>


    <pv-dialog
        v-model:visible="advisoryDialog"
        :style="{ width: '500px'}"
        header="Advisory Information"
        :modal="true"
        class="p-fluid"
    >
      <div class="field">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="title"
              v-model.trim="advisory.title"
              required="true"
              autofocus
              :class="{'p-invalid':submitted && !advisory.title}"
          />
          <label for="advisoryTitle">Title</label>
          <samll class="p-error" v-if="submitted && !advisory.title"
          >Title is required</samll>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-textarea
              id="description"
              v-model="advisory.description"
              required="false"
              rows="2"
              cols="2"
          />
          <label for="advisoryAttaches">Description</label>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-input-text
              id="multiple"
              v-model="advisory.date"
              selectionMode="multiple"
              required="true"
              :manualInput="false"
          />
          <label for="advisoryDate">Date</label>
          <samll class="p-error" v-if="submitted && !advisory.date"
          >Date is required</samll>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-input-text
              id="multiple"
              v-model="advisory.hour"
              selectionMode="multiple"
              required="true"
              :manualInput="false"
          />
          <label for="advisoryDate">Hour</label>
          <samll class="p-error" v-if="submitted && !advisory.hour"
          >Hour is required</samll>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-input-text
              id="multiple"
              v-model="advisory.urlToImage"
              selectionMode="multiple"
              required="true"
              :manualInput="false"
          />
          <label for="advisoryUrlToImage">Url to Image</label>
          <samll class="p-error" v-if="submitted && !advisory.urlToImage"
          >Url is required</samll>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="title"
              v-model.trim="advisory.studentName"
              required="true"
              autofocus
              :class="{'p-invalid':submitted && !advisory.studentName}"
          />
          <label for="advisoryDiscordServer">StudentName</label>
          <samll class="p-error" v-if="submitted && !advisory.studentName"
          >DiscordServer is required</samll>
        </span>
      </div>

      <div class="field">
        <span class="p-float-label">
          <pv-input-text
              type="text"
              id="title"
              v-model.trim="advisory.discordServer"
              required="true"
              autofocus
              :class="{'p-invalid':submitted && !advisory.discordServer}"
          />
          <label for="advisoryDiscordServer">Channel</label>
          <samll class="p-error" v-if="submitted && !advisory.discordServer"
          >DiscordServer is required</samll>
        </span>
      </div>


      <template #footer>
        <pv-button
            label="Cancel"
            icon="pi pi-times"
            class="p-button-text"
            @click="hideDialog"
        />
        <pv-button
            label="Save"
            icon="pi pi-check"
            class="p-button-text"
            @click="saveCoachAdvisory"
        />
      </template>

    </pv-dialog>

    <br><br>
  </div>


</template>

<script>
import CoachesService from '../../services/coaches.service.js';
import AdvisoriesService from '../services/advisories.service.js'
export default {
  name: "coach-advisory",
  data() {
    return {
      advisories: [],
      coachAdvisories: [],
      coachId:1,
      advisoryTitle: '',
      advisoryDescription: '',
      advisoryDate: '',
      advisoryHour:'',
      advisoryDiscordServer: '',
      advisoryNew: {},
      advisory: {},
      coach: {},
      coaches:[],
      coachName: '',

      coachDialog: false,
      submitted: false,
      advisoryService: null,
      advisoryId: 1,
      advisoryDialog: false,
    };
  },
  mounted() {
    this.retrieveAdvisories();
    CoachesService.getById(this.coachId).then((response)=>{

      this.coaches=response.data.map(this.getStorableCoach);
      this.coachName=this.coaches[0].name;
    })

    /*
    this.advisoryService.getById()
    this.advisoryService.getAll().then((response) => {
      this.advisoryes = response.data;
      this.advisory = response.data;

      console.log(this.advisoryes);
    });*/
  },
  methods: {
    retrieveAdvisories(){
      AdvisoriesService.getAll().then((response)=>{
        this.advisories=response.data;
        this.coachAdvisories=[];
        for(let Advisory of this.advisories){
          if(Advisory.coachId==this.coachId){
            this.coachAdvisories.push(Advisory);
          }
        }
      })
    },
    deleteAdvisory(advisoryId){
      AdvisoriesService.delete((advisoryId)).then(()=>{
        this.retrieveAdvisories();
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
    getStorableAdvisory(advisory) {
      return {
        id: advisory.id,
        title: advisory.title,
        description: advisory.description,
        date: advisory.date,
        hour: advisory.hour,
        studentName: advisory.studentName,
        discordServer: advisory.discordServer,
        cyberImage: advisory.cyberImage,
        coachId: advisory.coachId,
      };
    },

    findIndexById(id) {
      return this.advisories.findIndex((advisory) => advisory.id === id);
    },

    editCoachAdvisory(advisory) {
      this.advisory = { ...advisory };
      this.advisoryDialog = true;
    },
    openNew() {
      this.advisory = {};
      this.submitted = false;
      this.advisoryDialog = true;
    },
    hideDialog() {
      this.advisoryDialog = false;
      this.submitted = false;
    },
    saveCoachAdvisory() {
      this.advisory.id=0;
      this.advisory.cyberimage="https://d37b96571lewzk.cloudfront.net/assets/image/92/5fbd041a0c9c6/top_games_for_cyber_cafe_o.jpg";
      this.advisory.coachId=this.coachId;
      this.advisory=this.getStorableAdvisory(this.advisory);
        AdvisoriesService.create(this.advisory).then((response)=>{
          this.hideDialog();
        this.retrieveAdvisories();
      })
      /*this.submitted = true;
      this.advisoryNew={
        id:0,
        title: this.advisoryTitle,
        date: this.advisoryDate,
        discordServer: this.advisoryDiscordServer,
        attaches: this.advisoryAtacches,
        cyberimage: "https://d37b96571lewzk.cloudfront.net/assets/image/92/5fbd041a0c9c6/top_games_for_cyber_cafe_o.jpg",
        coachId: this.coachId
      }
      this.advisoryNew = this.getStorableCoach(this.advisoryNew);
      AdvisoriesService.create(this.advisoryNew).then((response)=>{
        this.retrieveAdvisories();
      })
      
      this.coachDialog = false;*/
    },
  },
};
</script>
<style>
.p-button-lg{
  background-color: #C4C4C4;
  display: block;
  max-width: 40%;
  height: 90px;
  border: none;
  padding: 200px 200px;
  font-size: 50px;
  cursor: pointer;
  text-align: center;
  margin:auto;
}
.p-card{
  /* box-shadow: 0 4px 10px 10px rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners
  max-width: 50em;
  max-height: 60em;
  padding-left: 20px;
  margin-bottom: 4em; */
}

.container{
  background-color: #2455A5;
  margin-left: 100px;
  margin-right: 100px;
}

</style>