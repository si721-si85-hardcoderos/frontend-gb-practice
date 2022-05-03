<script>
export default {
  data() {
    return {
      items: [
        { label: "Profile", to: "/profiles" }
      ],
    };
  },
};
</script>

<template>
  <pv-toast></pv-toast>
  <header>
    <pv-toolbar class="toolbar bg-primary">
      <template #start>
        <img
          alt="Getting Better logo"
          class="logo"
          src="@/assets/logo-gb.png"
          width="160"
          height="125"
        />
      </template>
      <template #end>
        <div class="flex-column">
          <router-link
            v-for="item in items"
            :to="item.to"
            custom
            v-slot="{ navigate, href }"
            :key="item.label"
          >
            <pv-button
              class="p-button-text text-white"
              :href="href"
              @clcik="navigate"
              >{{ item.label }}</pv-button
            >
          </router-link>
        </div>
      </template>
    </pv-toolbar>
  </header>
  <RouterView />
</template>

<style scoped>
.toolbar{
  background-color: #ffffff;
}
</style>