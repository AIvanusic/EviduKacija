<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Izvedbeni plan </q-toolbar-title>

        <div>v{{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Glavni izbornik </q-item-label>

        <EssentialLink
          v-for="route in routesList"
          :key="route.title"
          v-bind="route"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const version = "1.0";

defineOptions({
  name: "MainLayout",
});

const routesList = [
  {
    title: "Odjeli",
    caption: "Odjeli Veleučilišta",
    icon: "groups",
    route: "/department",
    link: "https://quasar.dev",
  },
  {
    title: "Studijski program",
    caption: "Studijski programi odjela",
    icon: "school",
    route: "/studyProgram",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Kolegij",
    caption: "Kolegiji studijskog programa",
    icon: "library_books",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Nastavnik",
    caption: "Nastavnici na Veleučilištu",
    icon: "person",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Izvedba nastave",
    caption: "Plan izvedbe nastave prema ak. godini",
    icon: "work",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Koeficijenti i pragovi",
    caption: "Koeficijenti kontakt sati i pragovi radnih sati",
    icon: "pin",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Izvještaj",
    caption: "Izvještaj o nastavnom i radnom opterećenju",
    icon: "summarize",
    link: "https://awesome.quasar.dev",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
