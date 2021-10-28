<template>
<div :id="id" class="w-full my-2">
    <div class="flex flex-nowrap w-full bg-white rounded-xl overflow-hdden shadow-md p-4">
        <img alt="Card image" class="w-20 md:w-40 rounded-lg shadow-lg" src="https://picsum.photos/300">
        <div class="pl-4 flex-grow">
            <div class="flex flex-nowrap justify-between">
                <router-link :to="'/pack/' + id">
                    <h1 class="text-xl leading-normal mt-0 mb-2">{{ name }}</h1>
                </router-link>
                <div>
                    <button class="text-gray-400 hover:text-blue-500 mr-4" @click="onEditClick">
                        <font-awesome-icon icon="pen"></font-awesome-icon>
                    </button>
                    <button class="text-gray-400 hover:text-red-500" @click="onDeleteClick">
                        <font-awesome-icon icon="times"></font-awesome-icon>
                    </button>
                </div>
            </div>
            <div class="font-light">
                <h1>Location:</h1>
                <ul class="text-sm ml-3">
                    <li>Latitude: {{ lat }}</li>
                    <li>Longitude: {{ lng }}</li>
                </ul>
            </div>
        </div>
    </div>

    <edit-pack-modal :show-modal="showEditModal"
                     :pack-id="id"
                     :pack-data="{ name, lat, lng }"
                     @close-click="onCloseEditModal"
    ></edit-pack-modal>

    <delete-pack-modal :show-modal="showDeleteModal"
                       :pack-id="id"
                       :pack-name="name"
                       @close-click="onCloseDeleteModal"
    ></delete-pack-modal>
</div>
</template>

<script>
import EditPackModal from "./EditPackModal";
import DeletePackModal from "./DeletePackModal";
import {mapActions} from "vuex";

export default {
    name: "PackCard",
    components: { EditPackModal, DeletePackModal },
    props: {
        id: {
            type: Number
        },
        name: {
            type: String
        },
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    },
    data() {
        return {
            showEditModal: false,
            showDeleteModal: false
        }
    },
    methods: {
        ...mapActions(['getPacksData']),
        onEditClick() {
            this.showEditModal = true;
        },
        onDeleteClick() {
            this.showDeleteModal = true;
        },
        onCloseEditModal(performRefresh) {
            this.showEditModal = false;
            if (performRefresh) {
                this.getPacksData();
            }
        },
        onCloseDeleteModal(performRefresh) {
            this.showDeleteModal = false;
            if (performRefresh) {
                this.getPacksData();
            }
        }
    }
}
</script>

<style scoped>

</style>