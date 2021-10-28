import { createStore } from 'vuex';
import { getPacks, getPack } from '../helpers/services';

const store = createStore({
    state() {
        return {
            packsData: null,
            packsLoading: false,
            packsError: null,

            selectedPackData: null,
            selectedPackLoading: false,
            selectedPackError: null
        };
    },
    mutations: {
        setPacksData: (state, data) => state.packsData = data,
        setPacksLoading: (state, data) => state.packsLoading = data,
        setPacksError: (state, data) => state.packsError = data,

        setSelectedPackData: (state, data) => state.selectedPackData = data,
        setSelectedPackLoading: (state, data) => state.selectedPackLoading = data,
        setSelectedPackError: (state, data) => state.selectedPackError = data
    },
    actions: {
        getPacksData({ commit }) {
            commit("setPacksLoading", true);
            getPacks()
                .then(response => {
                    if (response.ok) return response.json();
                    else throw new Error();
                })
                .then(data => commit("setPacksData", data))
                .catch(() => commit("setPacksError", 'Unable to load packs, please try again later'))
                .finally(() => commit("setPacksLoading", false))
        },
        getSelectedPackData({ commit }, id) {
            commit("setSelectedPackLoading", true);
            getPack(id)
                .then(response => {
                    if (response.ok) return response.json();
                    else if (response.status === 404) commit("setSelectedPackError", "The pack does not exist");
                    else throw new Error();
                })
                .then(data => commit("setSelectedPackData", data))
                .catch(() => commit("setSelectedPackError", 'Unable to load the pack, please try again later'))
                .finally(() => commit("setSelectedPackLoading", false))
        }
    }
});

export default store;