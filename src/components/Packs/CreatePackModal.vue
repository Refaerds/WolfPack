<template>
    <g-modal :showModal="showModal"
             title="Create a Pack"
             okText="Save"
             :okDisabled="!hasInput"
             @close-click="onCloseClick"
             @ok-click="onOkClick"
    >
        <div>
            <p v-if="loading" class="text-center my-6">Loading...</p>
            <g-error-alert v-else-if="error" :message="error" class="my-6"></g-error-alert>
            <div v-else>
                <g-input id="packName"
                         placeholder="Edit name"
                         label="Name:"
                         v-model="packName"
                ></g-input>

                <g-input id="packLat"
                         type="number"
                         placeholder="Edit latitude"
                         label="Latitude:"
                         v-model="packLat"
                ></g-input>

                <g-input id="packLng"
                         type="number"
                         placeholder="Edit longitude"
                         label="Longitude:"
                         v-model="packLng"
                ></g-input>

                <p class="text-sm text-red-500">{{ validationError }}</p>

            </div>
        </div>
    </g-modal>
</template>

<script>
import { createPack } from '../../helpers/services';

const initialState = {
    loading: false,
    error: null,

    packName: null,
    packLat: null,
    packLng: null,
    validationError: null
}
export default {
    name: "CreatePackModal",
    emits: ['close-click'],
    props: {
        showModal: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            ...initialState
        }
    },
    computed: {
        hasInput() {
            return (this.packName && this.packLat && this.packLng) ? true : false;
        }
    },
    methods: {
        onCloseClick(performRefresh) {
            Object.assign(this.$data, initialState);
            this.$emit('close-click', performRefresh);
        },
        onOkClick() {
            if (!this.getValidationError()) {
                this.loading = true;

                let payload = {
                    name: this.packName,
                    lat: parseFloat(this.packLat),
                    lng: parseFloat(this.packLng)
                };

                createPack(payload)
                    .then(response => {
                        if (response.ok) this.onCloseClick(true);
                        else return response.json()
                    })
                    .then(error => this.error = error.message ?? 'Something went wrong, we could not create the pack')
                    .catch(() => this.error = 'Something went wrong, we could not create the pack')
                    .finally(() => this.loading = false)
            }
        },
        getValidationError() {
            let errorText = '';
            if (this.packName?.length > 50) {
                errorText = 'The Pack name is too long. ';
            }
            if (!this.packName.match(/^[a-zA-Z]+$/)) {
                errorText = 'The Pack name may only contain letters. ';
            }
            const latNum = this.packLat ? parseFloat(this.packLat) : null;
            if (latNum && (latNum < -180 || latNum > 180 || isNaN(latNum))) {
                errorText += 'Latitude value is invalid. '
            }
            const lngNum = this.packLng ? parseFloat(this.packLng) : null;
            if (lngNum && (lngNum < -180 || lngNum > 180 || isNaN(lngNum))) {
                errorText += 'Longitude value is invalid. '
            }

            this.validationError = errorText;
            return errorText;
        }
    }
}
</script>

<style scoped>

</style>