<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Studijski programi"
        :rows="studyPrograms"
        :columns="columns"
        row-key="id"
        flat
        selection="single"
        v-model:selected="studyProgram"
        @update:selected="onSelectionRow"
      >
        <template v-slot:top>
          <q-btn color="primary" label="Pročitaj" @click="onRead" />
          <q-space />

          <q-btn color="primary" label="Novi odjel" @click="onAddRow" />
          <q-btn
            v-if="studyProgram.length !== 0"
            class="q-ml-sm"
            color="primary"
            label="Izmijeni odjel"
            @click="onEditRow"
          />
          <q-btn
            v-if="studyProgram.length !== 0"
            class="q-ml-sm"
            color="red"
            label="Obriši odjel"
            @click="onDeleteRow"
          />
        </template>
      </q-table>
    </div>

    <div class="q-pa-md" v-if="showForm">
      <q-card flat bordered class="q-pa-sm">
        <q-card-section>
          <q-form @submit="onSave">
            <q-select
              class="q-pb-lg"
              filled
              v-model="editStudyProgram.id_department"
              :options="departments"
              option-value="id"
              option-label="name"
              emit-value
              map-options
              label="Naziv odjela"
            />

            <!-- <q-input
              filled
              v-model="editStudyProgram.id_department"
              label="Naziv odjela"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Unesite naziv odjela',
              ]"
            /> -->
            <q-input
              filled
              v-model="editStudyProgram.name"
              label="Naziv studijskog programa"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Unesite naziv studijskog programa',
              ]"
            />
            <q-input
              filled
              v-model="editStudyProgram.code"
              label="Kratica studijskog programa"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Unesite kraticu studijskog programa',
              ]"
            />
            <q-select
              class="q-pb-lg"
              filled
              v-model="editStudyProgram.level"
              :options="studyProgamLevels"
              label="Razina studijskog programa"
            />
            <q-select
              class="q-pb-lg"
              filled
              v-model="editStudyProgram.type"
              :options="studyProgamTypes"
              label="Vrsta studijskog programa"
            />

            <q-input
              class="q-pb-lg"
              filled
              v-model="editStudyProgram.semester_num"
              label="Broj semestara studijskog programa"
              type="number"
            />
            <q-input
              filled
              v-model="editStudyProgram.academic_year"
              label="Akademska godina studijskog programa"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Unesite akademsku godinu studijskog programa',
              ]"
            />
            <div>
              <q-btn label="Spremi" type="submit" color="primary" />
              <q-btn
                label="Zatvori"
                color="primary"
                @click="onClose"
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { api } from "boot/axios";

defineOptions({
  name: "StudyProgramPage",
});

const studyProgamTypes = ["redovni", "izvanredni"];
const studyProgamLevels = ["prijediplomski", "diplomski"];
const columns = [
  {
    name: "department_name",
    required: true,
    label: "Odjel",
    align: "left",
    field: "department_name",
    sortable: true,
  },
  {
    name: "name",
    required: true,
    label: "Naziv",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "code",
    required: true,
    label: "Kratica",
    align: "left",
    field: "code",
    sortable: true,
  },
  {
    name: "level",
    required: true,
    label: "Razina",
    align: "left",
    field: "level",
    sortable: true,
  },
  {
    name: "type",
    required: true,
    label: "Vrsta",
    align: "left",
    field: "type",
    sortable: true,
  },
  {
    name: "semester_num",
    required: true,
    label: "Broj semestara",
    align: "right",
    field: "semester_num",
    sortable: true,
  },
  {
    name: "academic_year",
    required: true,
    label: "Akademska godina",
    align: "right",
    field: "academic_year",
    sortable: true,
  },
];
const studyPrograms = ref([]);
const studyProgram = ref([]);
const editStudyProgram = ref({});
const showForm = ref(false);
const departments = ref([]);

const onRead = async () => {
  try {
    const result = await api.get("/studyProgram");
    studyPrograms.value = result.data;
    const resultDepartment = await api.get("/department");
    departments.value = resultDepartment.data;
    studyProgram.value = [];
    showForm.value = false;
  } catch (error) {}
  // departments.value = [
  //   { id: 1, name: "Odjel za informacijske i komunikacijske tehnologije" },
  //   { id: 2, name: "Poslovni odjel" },
  //   { id: 3, name: "Prometni odjel" },
  //   { id: 4, name: "Poljoprivredni odjel" },
  //   { id: 5, name: "Odjel sigurnosti" },
  //   { id: 6, name: "Elektrotehnički odjel" },
  // ];
};

const onDeleteRow = async () => {
  try {
    const result = await api.delete("/studyProgram", {
      data: {
        id: studyProgram.value[0].id,
      },
    });
    onRead();
    studyProgram.value = [];
  } catch (error) {}
  // const indexToDelete = departments.value.findIndex(
  //   (element) => element.id === department.value[0].id
  // );

  // departments.value.splice(indexToDelete, 1);
};

const onAddRow = () => {
  studyProgram.value = [];
  editStudyProgram.value.id = null;
  editStudyProgram.value.id_department = null;
  editStudyProgram.value.id = null;
  editStudyProgram.value.name = null;
  editStudyProgram.value.code = null;
  editStudyProgram.value.type = null;
  editStudyProgram.value.semester_num = null;
  editStudyProgram.value.academic_year = null;

  showForm.value = true;
};

const onEditRow = () => {
  //editDepartment.value = JSON.parse(JSON.stringify(department.value[0]));
  editStudyProgram.value = Object.assign({}, studyProgram.value[0]);
  showForm.value = true;
};

const onClose = () => {
  editStudyProgram.value.id = null;
  editStudyProgram.value.id_department = null;
  editStudyProgram.value.id = null;
  editStudyProgram.value.name = null;
  editStudyProgram.value.code = null;
  editStudyProgram.value.type = null;
  editStudyProgram.value.semester_num = null;
  editStudyProgram.value.academic_year = null;
  showForm.value = false;
};
const onSelectionRow = () => {
  editStudyProgram.value = Object.assign({}, studyProgram.value[0]);
};
const onSave = async () => {
  try {
    if (editStudyProgram.value.id === null) {
      const result = await api.post("/studyProgram", editStudyProgram.value);
    } else {
      const result = await api.put("/studyProgram", editStudyProgram.value);
    }

    onRead();
  } catch (error) {}
};
onMounted(() => {
  onRead();
});
</script>
