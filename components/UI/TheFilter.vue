<template>
  <v-menu
    transition="slide-x-transition"
    offset-y
    :close-on-content-click="closeOnContentClick"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="#7C5DFA" dark v-bind="attrs" v-on="on"
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
    selectedStatuses: [],
  }),

  computed: {
    ...mapGetters('invoices', ['allInvoices']),
  },

  async mounted() {
    await this.$store.dispatch('invoices/fetchInvoices')
    await this.$store.dispatch('invoices/filterInvoices', this.allInvoices);
  },
  
  methods: {
    toggleStatus(status) {
      const index = this.selectedStatuses.indexOf(status)
      if (!this.selectedStatuses.includes(status)) {
        this.selectedStatuses.push(status)
      } else {
        this.selectedStatuses.splice(index, 1)
      }
      this.$store.dispatch('invoices/setSelectedStatuses', this.selectedStatuses); // Aktualizacja wybranych statusów w magazynie
    this.$store.dispatch('invoices/filterInvoices');
    },
    async filterInvoices() {
    if (this.selectedStatuses.length === 0) {

      await this.$store.dispatch('invoices/filterInvoices', this.allInvoices);

    } else {
      const filtered = this.allInvoices.filter((invoice) =>
        this.selectedStatuses.includes(invoice.status)
      );
      await this.$store.dispatch(
        'invoices/filterInvoices',
        filtered.length === 0 ? this.allInvoices : filtered
      );
    }
  },
  },
}
</script>

<style lang="scss" scoped>
.icon {
  margin-left: 5px;
}
</style>
