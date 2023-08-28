<template>
  <v-menu
    transition="slide-x-transition"
    offset-y
    :close-on-content-click="closeOnContentClick"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn :disabled="allInvoices.length === 0" color="#7C5DFA" dark v-bind="attrs" v-on="on"
        >Filter<fa class="icon" :icon="['fa', 'caret-down']"
      /></v-btn>
    </template>
    <v-list nav>
      <v-checkbox
        :label="`Pending`"
        @change="toggleStatus('pending')"
      ></v-checkbox>
      <v-checkbox :label="`Paid`" @change="toggleStatus('paid')"></v-checkbox>
      <v-checkbox :label="`Draft`" @change="toggleStatus('draft')"></v-checkbox>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TheFilter',

  data: () => ({
    items: [{ title: 'Pending' }, { title: 'Paid' }, { title: 'Draft' }],
    closeOnContentClick: false,
  }),

  computed: {
    ...mapGetters('invoices', [
      'allInvoices',
      'filteredStatus',
      'filteredInvoices',
    ]),
  },

  async mounted() {
    await this.$store.dispatch('invoices/resetSelectedStatuses')
    await this.$store.dispatch('invoices/resetFilteredInvoices')
  },

  methods: {
    toggleStatus(status) {
      this.$store.dispatch('invoices/toggleStatus', status)
      this.$store.dispatch('invoices/filterInvoices')
    },
  },
}
</script>

<style lang="scss" scoped>
.icon {
  margin-left: 5px;
}
</style>
