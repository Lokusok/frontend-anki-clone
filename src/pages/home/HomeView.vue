<script setup lang="ts">
import PageLayout from '../../components/layouts/PageLayout.vue';

const collections = [
  {
    name: 'Frozen Yogurt',
    calories: '1/3',
  },
  {
    name: 'Ice cream sandwich',
    calories: '10/12',
  },
  {
    name: 'Eclair',
    calories: '262/60',
  },
  {
    name: 'Cupcake',
    calories: '30/1',
  },
  {
    name: 'Gingerbread',
    calories: '0/53',
  },
  {
    name: 'Frozen Yogurt',
    calories: '1/3',
  },
  {
    name: 'Ice cream sandwich',
    calories: '10/12',
  },
  {
    name: 'Eclair',
    calories: '262/60',
  },
  {
    name: 'Cupcake',
    calories: '30/1',
  },
  {
    name: 'Gingerbread',
    calories: '0/53',
  },
];
</script>

<template>
  <PageLayout title="Ваши коллекции">
    <v-sheet
    elevation="10"
    class="my-3 w-75 mx-auto rounded-lg"
    :style="{ 'max-width': '1024px' }"
  >
    <v-table fixed-header height="500px">
      <thead>
        <tr>
          <th class="text-center font-weight-bold">Название</th>
          <th class="text-center font-weight-bold">Пора/Не пора</th>
          <th class="text-center font-weight-bold">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in collections" :key="item.name">
          <td class="text-center">{{ item.name }}</td>
          <td class="text-center">{{ item.calories }}</td>
          <td class="d-flex justify-center">
            <div class="d-flex ga-2 py-2">
              <v-btn
                color="primary"
                icon="mdi-eye-circle-outline"
                size="x-small"
              ></v-btn>
              <v-btn color="secondary" icon="mdi-pen" size="x-small"></v-btn>
              <v-btn color="red" icon="mdi-trash-can" size="x-small"></v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-sheet>
  </PageLayout>
</template>
