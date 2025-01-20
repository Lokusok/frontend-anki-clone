<script setup lang="ts">
import PageLayout from '../../components/layouts/PageLayout.vue';

const registerUser = () => {

};
</script>

<template>
    <PageLayout title="Регистрация">
        <v-sheet
            :style="{ 'max-width': '1024px', 'margin': '0 auto' }"
            elevation="10"
            class="pa-3 rounded-lg"
        >
            <form @submit.prevent="registerUser">
                <v-text-field label="Логин" />
                <v-text-field label="Почта" />
                <v-text-field label="Пароль" />
                <v-text-field label="Подтвердите пароль" />

                <div class="d-flex justify-space-between align-center">
                    <v-btn type="submit" color="primary">Создать аккаунт</v-btn>
                    <router-link :to="{ name: 'login' }">Уже есть аккаунт?</router-link>
                </div>
            </form>
        </v-sheet>
    </PageLayout>
</template>