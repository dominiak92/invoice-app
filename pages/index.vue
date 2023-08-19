<template>
  <div v-if="$auth.loggedIn" class="mainWrapper" >
    <IndexHeader />
    <div v-for="invoice in allInvoices" :key="invoice._id">
      <nuxt-link :style="{ color: 'inherit', textDecoration: 'none' }" :invoice="invoice" :to="`/invoice/${invoice._id}`"><InvoiceCard :invoice="invoice" /></nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InvoiceCard from '../components/InvoiceCard.vue'
import IndexHeader from '~/components/UI/IndexHeader.vue'
export default {
  name: 'IndexPage',
  components: { InvoiceCard, IndexHeader },
  

  computed: {
    ...mapGetters('invoices', ['allInvoices']),
  },

  async mounted() {
    await this.$store.dispatch('invoices/fetchInvoices')
  },
  
}
</script>
<style lang="scss" scoped>
.mainWrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
