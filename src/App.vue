<template>
<div class="bg-gray-100 min-h-screen text-gray-700">
    <the-header></the-header>
    <main class="container mx-auto flex">
        <router-view></router-view>
    </main>
</div>
</template>

<script>
import TheHeader from "./components/TheHeader";

export default {
    components: { TheHeader }
};
</script>

<style></style>