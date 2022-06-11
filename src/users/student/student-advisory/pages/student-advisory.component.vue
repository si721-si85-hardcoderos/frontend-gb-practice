<script >
import CoachesService from '../../../coach/services/coaches.service.js';
import AdvisoriesService from '../../../coach/coach-advisory/services/advisories.service.js'
import {ref} from "vue";

const advisories = [
  {
    id: 1,
    title: "Support Itemization",
    description: "How to build to help your team",
    date: "21-07-2022",
    hour: "9:30pm",
    studentName: "Carlos Choquehuanca",
    discordServer: "Quasimodo",
    cyberImage: "https://d37b96571lewzk.cloudfront.net/assets/image/92/5fbd041a0c9c6/top_games_for_cyber_cafe_o.jpg",
    urlToImage: "https://staticg.sportskeeda.com/editor/2021/04/45716-16195438439457-800.jpg",
    coachId: 1
  },
  {
    id: 2,
    title: "Learn from the pros",
    description: "Meet a pro-gamer to improve your skills",
    date: "29-08-2022",
    hour: "10:00pm",
    studentName: "Oscar de la Cruz",
    discordServer: "AS - WILD",
    cyberImage: "https://d37b96571lewzk.cloudfront.net/assets/image/92/5fbd041a0c9c6/top_games_for_cyber_cafe_o.jpg",
    urlToImage: "https://dota2freaks.com/wp-content/uploads/sites/10/2020/02/dota-2-recommended-items.jpg",
    coachId: 1
  },
  {
    id: 3,
    title: "Learn from the pros",
    description: "Meet a pro-gamer to improve your skills",
    date: "29-08-2022",
    hour: "11:30pm",
    studentName: "Juan Rodrigo Solis",
    discordServer: "AS - WILD",
    cyberImage: "https://d37b96571lewzk.cloudfront.net/assets/image/92/5fbd041a0c9c6/top_games_for_cyber_cafe_o.jpg",
    urlToImage: "http://clutchround.com/wp-content/uploads/2015/08/csgo_corners_and_angles_dust2_T_CT.png",
    coachId: 1
  },
];
const selection = ref([]);

export default {
  name: "student-advisories",
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

<template>
  <nav-bar-student/>
  <div class="container">
    <pv-button
        class="p-button-lg"
        label="New Advisory"
        icon="pi pi-plus"
        align="Center"
        @click="openNew"
    />
    <pv-button
        label="Delete"
        icon="pi pi-trash"
        align="Center"
        class="p-button-danger"
    />
    <pv-divider/>

    <pv-data-table ref="dt" v-model:selection="selection" :value="advisories">
      <pv-column selection-mode="multiple" :exportable="false" />
      <pv-column field="id" header="ID" sortable="true"/>
      <pv-column field="title" header="Title" sortable="true" />
      <pv-column field="description" header="Description" sortable="true"/>
      <pv-column field="date" header="Date" sortable="true"/>
      <pv-column field="hour" header="Hour" sortable="true"/>
      <pv-column field="studentName" header="Student Name" sortable="true"/>
      <pv-column field="discordServer" header="Discord Server" sortable="true"/>
      <pv-column class="shortened" field="cyberImage" header="Cyber Place" sortable="true" />
      <pv-column class="shortened" field="urlToImage" header="Thumbnail" sortable="true"/>
      <pv-column field="coachId" header="Coach ID" sortable="true"/>
      <pv-column :exportable="false">
        <template #body="slotProps">
          <pv-button icon="pi pi-trash"/>
        </template>
      </pv-column>

    </pv-data-table>

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

    <br>
  </div>


</template>


<style>
.pv column{
  background-color: white;
}
.shortened{
  max-width: 100px;
  overflow-wrap: anywhere;
}
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