<template>
  <div class="text-center">
    <v-dialog v-model="dialog" light width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" dark rounded color="#EC5757" large v-on="on">
          delete</v-btn
        >
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Confirm Deletion
        </v-card-title>

        <v-card-text v-if="invoice._id">
          Are you sure you want to delete invoice #{{
            invoice._id.slice(-5).toUpperCase()
          }}? This action cannot be undone.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-progress-circular
            v-if="isLoading"
            :size="40"
            :width="5"
            :style="{ marginRight: '1.2rem' }"
            color="#7C5DFA"
            indeterminate
          ></v-progress-circular>

          <v-btn
            v-bind="attrs"
            :style="{ color: '#7E88C3', marginRight: '1rem' }"
            light
            rounded
            color="#F9FAFE"
            large
            v-on="on"
            @click="dialog = false"
          >
            cancel</v-btn
          >
          <v-btn
            v-bind="attrs"
            dark
            rounded
            color="#EC5757"
            large
            @click="deleteInvoice(invoice._id)"
            v-on="on"
          >
            delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DeleteBtn',
  props: {
    invoice: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      attrs: {},
      on: {},
    }
  },
  computed: {
    ...mapGetters('invoices', ['allInvoices', 'filteredInvoices', 'isLoading']),
  },
  methods: {
    async deleteInvoice(id) {
      await this.$store.dispatch('invoices/deleteInvoice', id)
      await this.$store.dispatch(
        'invoices/filterInvoices',
        this.filteredInvoices
      )
      this.$router.push('/')
    },
  },
}
</script>
