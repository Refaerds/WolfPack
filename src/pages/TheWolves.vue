<template>
<g-layout>
    <p v-if="selectedPackLoading" class="w-full text-center my-12">Loading...</p>
    <g-error-alert v-else-if="selectedPackError" :message="selectedPackError" class="my-12"></g-error-alert>
    <div v-else class="w-full">
        <p v-if="!selectedPackData.wolves.length" class="my-6 text-center text-xl">
            There are no wolves in this pack yet
        </p>
        <h1 v-else class="my-6 text-center text-2xl">Behold the Wolves from {{ selectedPackData.name }} pack!</h1>
        <div class="flex flex-wrap justify-between">
            <wolf-card v-for="wolf in selectedPackData.wolves"
                       :key="getWolfKey(wolf.id)"
                       :id="wolf.id"
                       :name="wolf.name"
                       :gender="wolf.gender"
                       :birthdate="wolf.birthday"
            ></wolf-card>
        </div>

        <g-button text="Create a new wolf"
                  classes="text-white bg-green-200 hover:bg-green-400 focus:bg-green-300 active:bg-green-500 shadow-md-green hover:shadow-lg-green"
                  @click="onCreateWolfClick"
        ></g-button>
    </div>
</g-layout>
</template>

<script>
import {mapActions, mapState} from "vuex";
import WolfCard from "../components/Wolves/WolfCard";

export default {
    name: "TheWolves",
    components: { WolfCard },
    created() {
        this.getSelectedPackData(this.$route.params.id);
    },
    computed: {
        ...mapState({
            selectedPackData: state => state.selectedPackData,
            selectedPackLoading: state => state.selectedPackLoading,
            selectedPackError: state => state.selectedPackError
        })
    },
    methods: {
        ...mapActions(['getSelectedPackData']),
        onCreateWolfClick() {

        },
        getWolfKey(id) {
            return 'wolf-' + id;
        }
    }
}
</script>

<style scoped>

</style>