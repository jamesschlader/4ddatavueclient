<template>
  <div>
    <input type="text" v-model="editedField">
    <button v-on:click.prevent="saveField">Save</button>
  </div>
</template>

<script>
    export default {
        name: "EditTextField",
        props: ["field", "fieldName"],
        data() {
            return {
                editedField: ""
            };
        },
        methods: {
            saveField() {
                this.$emit("save-field", this.fieldName, this.editedField);
            }
        },
        created() {
            this.editedField = this.field;
        }
    };
</script>

<style scoped>

</style>