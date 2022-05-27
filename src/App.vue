<script>

export default {
  data() {
    return {

      items: [
        { label: "home", to: "/home" },
        { label: "Profile", to: "/profiles" },
        { label: "advisory", to: "/advisories" },
        { label: "students", to: "/students"},
        { label: "tournaments", to: "/tournaments"}
      ],
    };
  }
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
          width="150"
          height="85"
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
              class="p-button"
              :href="href"
              @click="navigate"
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
  background-color: #000000;
}
.p-button{
  color: #ffffff;
  background-color: #000000;
}
</style>
