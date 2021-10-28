<template>
<div class="flex flex-nowrap w-full mb-3">
    <label v-if="label" html-for="id" class="mr-3 w-1/3">{{ label }}</label>
    <select v-if="type === 'select'"
            :id="id"
            :placeholder="placeholder"
            :value="modelValue"
            :required="required"
            class="w-72 shadow-none outline-none focus:outline-none focus:ring-0 px-0 mt-input bg-transparent border border-t-0 border-l-0 border-r-0 border-b-1 border-gray-300"
            @input="updateValue($event.target.value)"
    >
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
    </select>
    <input v-else
           :type="type"
           :id="id"
           :placeholder="placeholder"
           :value="modelValue"
           :required="required"
           maxlength="50"
           class="w-72 shadow-none outline-none focus:outline-none focus:ring-0 px-0 mt-input bg-transparent border border-t-0 border-l-0 border-r-0 border-b-1 border-gray-300"
           @input="updateValue($event.target.value)"
    />
</div>
</template>

<script>
export default {
    name: "Input",
    emits: ['update:modelValue'],
    props: {
        id: {
            type: String
        },
        label: {
            type: String
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        },
        modelValue: {
            type: String
        },
        required: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array,
            default() { return [] }
        }
    },
    methods: {
        updateValue (value) {
            this.$emit('update:modelValue', value.trim());
        }
    }
}
</script>

<style scoped>

</style>