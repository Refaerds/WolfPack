<template>
<div :class="[showModal ? 'grid' : 'hidden','opacity-100 pointer-events-auto place-items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-all duration-500']">
    <div class="transform opacity-100 translate-y-0 w-auto my-6 mx-auto max-w-3xl transition-all duration-500">
        <div class="border-0 p-6 rounded-lg shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none">
            <div class="flex items-center justify-between mb-6">
                <h5 class="text-xl mt-0 mb-0">{{ title }}</h5>
                <button class="p-1 text-gray-400 hover:text-gray-600 outline-none focus:outline-none"
                        @click="onCloseClick"
                >
                    <font-awesome-icon icon="times"></font-awesome-icon>
                </button>
            </div>
            <div class="relative flex-auto mb-6">
                <slot></slot>
            </div>
            <div v-if="showFooter" class="flex items-center justify-end gap-4">
                <g-button text="Close"
                          classes="bg-transparent text-red-500 hover:bg-red-50 hover:text-red-700 hover:bg-red-50 active:bg-red-100"
                          @click="onCloseClick"
                ></g-button>

                <g-button :text="okText"
                          :disabled="okDisabled"
                          classes="text-white bg-green-500 hover:bg-green-700 focus:bg-green-400 active:bg-green-800 shadow-md-green hover:shadow-lg-green"
                          @click="onOkClick"
                ></g-button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "Modal",
    emits: ['close-click', 'ok-click'],
    props: {
        showModal: {
            type: Boolean,
            default: false
        },
        showFooter: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: "Modal"
        },
        okText: {
            type: String,
            default: "Ok"
        },
        okDisabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onCloseClick() {
            this.$emit('close-click');
        },
        onOkClick() {
            this.$emit('ok-click');
        }
    }
}
</script>

<style scoped>

</style>