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
          <h1> HOLAAAAAAAAAAAAAAA </h1>




        </template>
      </pv-toolbar>


      <pv-data-table
        ref="dt"
        :value="profiles"
        dataKey="id"
        :paginator="true"
        :rows="10"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 15]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tutorials"
        responsiveLayout="scroll"
      >
        <template #header>
          <div
            class="table-header flex flex-column md:flex-row md:justify-content-between"
          >
            <h5 class="mb-2 md:m-0 p-as-md-center text-xl">Manage Profiles1</h5>
          </div>
        </template>
        <pv-column
          selectionMode="multiple"
          style="width: 3rem"
          :exportable="false"
        ></pv-column>
        <pv-column
          field="id"
          header="Id"
          :sortable="true"
          style="min-width: 12rem"
        ></pv-column>
        <pv-column
          field="nickname"
          header="nickname"
          :sortable="true"
          style="min-width: 16rem"
        ></pv-column>
      </pv-data-table>

    </div>
  </div>
</template>

<script>
import { coachProfileService } from "../services/coach-profile.service";

export default {
  name: "coach-profile",
  data() {
    return {
      profiles: [],
      coachDialog: false,
      submitted: false,
      coachService: null,
      coach: {},
      coachId: 1,
    };
  },

  created() {
    this.coachService = new coachProfileService();
    this.coachService.getAll().then((response) => {
      this.profiles = response.data;
      this.coach = response.data;

      console.log(this.profiles);
    });

  },
  methods: {
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
