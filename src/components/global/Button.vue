<template>
<button :class="classList" :disabled="disabled">
    {{ text }}
</button>
</template>

<script>
export default {
    name: "Button",
    props: {
        text: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        classes: {
            type: String,
            default: ''
        }
    },
    computed: {
        classList() {
            return 'flex items-center justify-center gap-1 font-bold outline-none uppercase tracking-wider focus:outline-none focus:shadow-none transition-all duration-300 rounded-lg py-2.5 px-6 text-xs leading-normal disabled:opacity-50 disabled:shadow-none '
                    + this.classes;
        }
    }
}
</script>

<style scoped>

</style>