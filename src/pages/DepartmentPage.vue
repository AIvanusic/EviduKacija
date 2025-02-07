<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Odjeli"
        :rows="departments"
        :columns="columns"
        row-key="id"
        flat
        selection="single"
        v-model:selected="department"
        @update:selected="onSelectionRow"
      >
        <template v-slot:top>
          <q-btn color="primary" label="Pročitaj" @click="onRead" />
          <q-space />

          <q-btn color="primary" label="Novi odjel" @click="onAddRow" />
          <q-btn
            v-if="department.length !== 0"
            class="q-ml-sm"
            color="primary"
            label="Izmijeni odjel"
            @click="onEditRow"
          />
          <q-btn
            v-if="department.length !== 0"
            class="q-ml-sm"
            color="red"
            label="Obriši odjel"
            @click="onDeleteRow"
          />
        </template>
      </q-table>
    </div>
    <!-- {{ department }} -->
    <div class="q-pa-md" v-if="showForm">
      <q-card flat bordered class="q-pa-sm">
        <q-card-section>
          <q-form @submit="onSave">
            <q-input
              filled
              v-model="editDepartment.name"
              label="Naziv odjela"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Unesite naziv odjela',
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
  name: "DepartmentPage",
});

const columns = [
  {
    name: "name",
    required: true,
    label: "Naziv",
    align: "left",
    field: "name",
    sortable: true,
  },
];
const departments = ref([]);
const department = ref([]);
const editDepartment = ref({});
const showForm = ref(false);

const onRead = async () => {
  try {
    const result = await api.get("/department");
    departments.value = result.data;
    department.value = [];
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
    const result = await api.delete("/department", {
      data: {
        id: department.value[0].id,
      },
    });
    onRead();
    department.value = [];
  } catch (error) {}
  // const indexToDelete = departments.value.findIndex(
  //   (element) => element.id === department.value[0].id
  // );

  // departments.value.splice(indexToDelete, 1);
};

const onAddRow = () => {
  department.value = [];
  editDepartment.value.id = null;
  editDepartment.value.name = null;
  showForm.value = true;
};

const onEditRow = () => {
  //editDepartment.value = JSON.parse(JSON.stringify(department.value[0]));
  editDepartment.value = Object.assign({}, department.value[0]);
  showForm.value = true;
};

const onClose = () => {
  editDepartment.value.id = null;
  editDepartment.value.name = null;
  showForm.value = false;
};
const onSelectionRow = () => {
  editDepartment.value = Object.assign({}, department.value[0]);
};
const onSave = async () => {
  try {
    if (editDepartment.value.id === null) {
      const result = await api.post("/department", editDepartment.value);
    } else {
      const result = await api.put("/department", editDepartment.value);
    }

    onRead();
  } catch (error) {}
};
onMounted(() => {
  onRead();
});
</script>
