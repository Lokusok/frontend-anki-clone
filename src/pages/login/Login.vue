<script setup lang="ts">
import PageLayout from '../../components/layouts/PageLayout.vue';

const loginUser = () => {

};
</script>

<template>
    <PageLayout title="Войти в аккаунт">
        <v-sheet
            :style="{ 'max-width': '1024px', 'margin': '0 auto' }"
            elevation="10"
            class="pa-3 rounded-lg"
        >
            <form @submit.prevent="loginUser">
                <v-text-field label="Почта" />
                <v-text-field label="Пароль" />

                <div class="d-flex justify-space-between align-center">
                    <v-btn type="submit" color="primary">Войти</v-btn>
                    <router-link :to="{ name: 'register' }">Нет аккуанта?</router-link>
                </div>
            </form>
        </v-sheet>
    </PageLayout>
</template>