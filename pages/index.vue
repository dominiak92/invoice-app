<template>
  <div v-if="$auth.loggedIn">
    <h2>Invoices</h2>
    <p>There are {{ allInvoices.length }} total invoices</p>
    <div v-for="invoice in allInvoices" :key="invoice.id" class="invoices">
      {{ invoice._id }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'IndexPage',
  computed: {
    ...mapGetters('invoices', ['allInvoices']),
  },
  async mounted() {
    await this.$store.dispatch('invoices/fetchInvoices')
  },
}
</script>
<style lang="scss" scoped>

</style>
