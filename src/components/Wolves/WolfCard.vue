<template>
<div :id="id" class="w-72 pb-10 pt-16">
    <div class="w-full bg-white rounded-xl overflow-hidden shadow-md p-4">
        <img alt="Card Image" class="w-full rounded-lg shadow-lg" src="https://picsum.photos/300">
        <div class="pt-4">
            <h1 class="text-gray-900 text-xl leading-normal mt-0 mb-2">{{ name }}</h1>
            <div class="font-light capitalize">
                <p>Gender: {{ gender }}</p>
                <p>Birthday: {{ birthdate }}</p>
            </div>

            <div class="flex flex-nowrap justify-end">
                <button class="text-gray-400 hover:text-blue-500 mr-4" @click="onEditClick">
                    <font-awesome-icon icon="pen"></font-awesome-icon>
                </button>
                <button class="text-gray-400 hover:text-red-500" @click="onDeleteClick">
                    <font-awesome-icon icon="times"></font-awesome-icon>
                </button>

                <edit-wolf-modal :show-modal="showEditModal"
                                 :id="id"
                                 :wolf-data="{ name, gender, birthdate }"
                                 @close-click="onCloseEditModal"
                ></edit-wolf-modal>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import EditWolfModal from "./EditWolfModal";
import {mapActions, mapState} from "vuex";

export default {
    name: "WolfCard",
    components: { EditWolfModal },
    props: {
        id: {
            type: Number
        },
        name: {
            type: String
        },
        gender: {
            type: String
        },
        birthdate: {
            type: String
        }
    },
    data() {
        return {
            showEditModal: false,
            showDeleteModal: false
        }
    },
    computed: {
        ...mapState({
            packId: state => state.selectedPackData.id
        })
    },
    methods: {
        ...mapActions(['getSelectedPackData']),
        onEditClick() {
            this.showEditModal = true;
        },
        onDeleteClick() {
            this.showDeleteModal = true;
        },
        onCloseEditModal(performRefresh) {
            this.showEditModal = false;
            if (performRefresh) {
                this.getSelectedPackData(this.packId);
            }
        },
    }
}
</script>

<style scoped>

</style>