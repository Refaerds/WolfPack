<template>
<g-layout>
    <p v-if="packsLoading" class="w-full text-center my-12">Loading...</p>
    <g-error-alert v-else-if="packsError" :message="packsError" class="my-12"></g-error-alert>
    <div v-else class="w-full">
        <h1 class="my-6 text-center text-2xl">Behold the Packs!</h1>
        <pack-card v-for="pack in packsData"
                   :key="getPackKey(pack.id)"
                   :id="pack.id"
                   :name="pack.name"
                   :lat="pack.lat"
                   :lng="pack.lng"
        ></pack-card>

        <g-button text="Create a new pack"
                  classes="text-white bg-green-200 hover:bg-green-400 focus:bg-green-300 active:bg-green-500 shadow-md-green hover:shadow-lg-green"
                  @click="onCreatePackClick"
        ></g-button>

        <create-pack-modal :show-modal="showCreateModal"
                           @close-click="onCloseCreateModal"
        ></create-pack-modal>
    </div>
</g-layout>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PackCard from "../components/Packs/PackCard";
import CreatePackModal from "../components/Packs/CreatePackModal";

export default {
    name: "ThePacks",
    components: { PackCard, CreatePackModal },
    data() {
        return {
            showCreateModal: false
        }
    },
    mounted() {
        this.getPacksData();
    },
    computed: {
        ...mapState({
            packsLoading: state => state.packsLoading,
            packsError: state => state.packsError,
            packsData: state => state.packsData
        })
    },
    methods: {
        ...mapActions(['getPacksData']),
        getPackKey(id) {
            return 'pack-' + id;
        },
        onCreatePackClick() {
            this.showCreateModal = true;
        },
        onCloseCreateModal(performRefresh) {
            this.showCreateModal = false;
            if (performRefresh) {
                this.getPacksData();
            }
        }
    }
}
</script>

<style scoped>

</style>