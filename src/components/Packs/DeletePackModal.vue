<template>
    <g-modal :showModal="showModal"
             title="Delete Pack"
             okText="Delete"
             @close-click="onCloseClick"
             @ok-click="onOkClick"
    >
        <div>
            <p v-if="loading" class="text-center my-6">Loading...</p>
            <g-error-alert v-else-if="error" :message="error" class="my-6"></g-error-alert>
            <div v-else>
                <p>Are you sure you want to delete pack {{ packName }}?</p>
            </div>
        </div>
    </g-modal>
</template>

<script>
import { deletePack } from '../../helpers/services';

const initialState = {
    loading: false,
    error: null
}
export default {
    name: "DeletePackModal",
    emits: ['close-click'],
    props: {
        showModal: {
            type: Boolean,
            default: false
        },
        packId: {
            type: Number,
            required: true
        },
        packName: {
            type: String
        }
    },
    data() {
        return {
            ...initialState
        }
    },
    methods: {
        onCloseClick(performRefresh) {
            Object.assign(this.$data, initialState);
            this.$emit('close-click', performRefresh);
        },
        onOkClick() {
            this.loading = true;

            deletePack(this.packId)
                .then(response => {
                    if (response.ok) this.onCloseClick(true);
                    else return response.json()
                })
                .then(error => this.error = error.message ?? 'Something went wrong, we could not delete the pack')
                .catch(() => this.error = 'Something went wrong, we could not delete the pack')
                .finally(() => this.loading = false)
        }
    }
}
</script>

<style scoped>

</style>