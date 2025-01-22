<script setup lang="ts">
import PageLayout from '@/components/layouts/PageLayout.vue';
import { useSessionStore } from '@/stores/session';

const sessionStore = useSessionStore();
</script>

<template>
    <PageLayout title="Профиль">
        <span>Name: {{ sessionStore.session.name }}</span>
        <span>Email: {{ sessionStore.session.email }}</span>
        <span>Is auth: {{ sessionStore.isAuth }}</span>
    </PageLayout>
</template>