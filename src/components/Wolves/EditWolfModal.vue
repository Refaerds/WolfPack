<template>
    <g-modal :showModal="showModal"
             title="Edit Wolf"
             okText="Save"
             :okDisabled="!hasInput"
             @close-click="onCloseClick"
             @ok-click="onOkClick"
    >
        <div>
            <p v-if="loading" class="text-center my-6">Loading...</p>
            <g-error-alert v-else-if="error" :message="error" class="my-6"></g-error-alert>
            <div v-else>
                <g-input id="name"
                         placeholder="Edit name"
                         label="Name:"
                         v-model="name"
                ></g-input>

                <g-input id="gender"
                         type="select"
                         :options="['male', 'female']"
                         placeholder="Edit gender"
                         label="Gender:"
                         v-model="gender"
                ></g-input>

                <g-input id="birthday"
                         placeholder="Edit birthday as YYYY-MM-DD"
                         label="Birthday:"
                         v-model="birthday"
                ></g-input>

                <p class="text-sm text-red-500">{{ validationError }}</p>

            </div>
        </div>
    </g-modal>
</template>

<script>
import { updateWolf } from '../../helpers/services';

const initialState = {
    loading: false,
    error: null,

    name: null,
    gender: null,
    birthday: null,
    validationError: null
}
export default {
    name: "EditWolfModal",
    emits: ['close-click'],
    props: {
        showModal: {
            type: Boolean,
            default: false
        },
        id: {
            type: Number,
            required: true
        },
        wolfData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            ...initialState
        }
    },
    computed: {
        hasInput() {
            return (this.name || this.gender || this.birthday) ? true : false;
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

                const payload = {
                    name: this.name ?? this.wolfData.name,
                    gender: this.gender ?? this.wolfData.gender,
                    birthday: this.birthday ?? this.wolfData.birthdate
                };

                updateWolf(this.id, payload)
                    .then(response => {
                        if (response.ok) this.onCloseClick(true);
                        else return response.json()
                    })
                    .then(error => this.error = error.message ?? 'Something went wrong, we could not update the wolf')
                    .catch(() => this.error = 'Something went wrong, we could not update the wolf')
                    .finally(() => this.loading = false)
            }
        },
        getValidationError() {
            let errorText = '';
            if (this.name?.length > 50) {
                errorText = 'The Wolf name is too long. ';
            }
            if (this.name && !this.name.match(/^[a-zA-Z]+$/)) {
                errorText += 'The Wolf name may only contain letters. ';
            }

            const date = new Date(this.birthday);
            if (this.birthday?.match(/^\d{4}-\d{2}-\d{2}$/) && isNaN(date.getDate())) {
                errorText += 'The birth date is not valid. ';
            }

            this.validationError = errorText;
            return errorText;
        }
    }
}
</script>

<style scoped>

</style>