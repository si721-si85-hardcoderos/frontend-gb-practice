<script>

import NavBarStudent from './users/student/navbar/views/Nav-bar.vue';
import NavBarCyber from './users/cyber/navbar/views/Nav-bar.vue';
import NavBarCoach from './users/coach/navbar/views/Nav-bar.vue';
export default {
  components: { NavBarStudent,NavBarCoach,NavBarCyber },

};
</script>

<template>

  <RouterView />

</template>

<style scoped>

</style>
