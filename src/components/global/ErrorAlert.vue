<template>
    <div class="w-full flex items-center gap-3 text-white p-4 pr-12 border-0 rounded-lg relative mb-4 bg-red-500 transition-all duration-300">
        <span class="font-medium uppercase">Error!</span>
        {{ message }}
    </div>
</template>

<script>
export default {
    name: "ErrorAlert",
    props: {
        message: {
            type: String
        }
    }
}
</script>

<style scoped>

</style>