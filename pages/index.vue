<template>
  <div class="mainWrapper">
    <WelcomePage v-if="!$auth.loggedIn" />
    <div v-if="$auth.loggedIn" class="wrapper">
      <IndexHeader />
      <TheInformation v-if="allInvoices.length === 0 && !isLoading" />
      <div v-for="invoice in invoicesToDisplay" :key="invoice._id">
        <nuxt-link
          :style="{ color: 'inherit', textDecoration: 'none' }"
          :invoice="invoice"
          :to="`/invoice/${invoice._id}`"
          >
            <InvoiceCard :invoice="invoice" />
        </nuxt-link>
      </div>
      <v-card>
        <v-snackbar
          v-model="showSnackbar"
          :timeout="2000"
          centered
          text
          color="rgba(255, 0, 0, 0.5)"
        >
          <p class="error">
            There are no invoices for the given
            {{ filteredStatus.join(', ').toString() }} status.
          </p>
        </v-snackbar>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import InvoiceCard from '../components/InvoiceCard.vue'
import IndexHeader from '~/components/UI/IndexHeader.vue'
import WelcomePage from '~/components/WelcomePage.vue'
import TheInformation from '~/components/UI/TheInformation.vue'
export default {
  name: 'IndexPage',

  components: { InvoiceCard, IndexHeader, WelcomePage, TheInformation },
  data() {
    return {
      showSnackbar: false,
    }
  },
  computed: {
    ...mapGetters('invoices', [
      'allInvoices',
      'filteredInvoices',
      'filteredStatus',
      'isLoading',
    ]),
    invoicesToDisplay() {
      return this.filteredInvoices.length > 0
        ? this.filteredInvoices
        : this.allInvoices
    },
  },

  watch: {
    filteredInvoices(newVal) {
      this.showSnackbar = newVal.length === 0 && this.filteredStatus.length > 0
    },
    filteredStatus(newVal) {
      this.showSnackbar =
        this.filteredInvoices.length === 0 && newVal.length > 0
    },
  },

  async mounted() {
    await this.$store.dispatch('invoices/filterInvoices', this.allInvoices)
    await this.$store.dispatch('invoices/fetchInvoices')
  },
}
</script>
<style lang="scss" scoped>
.mainWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2 ease;
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .error {
      text-align: center;
    }
  }
}
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
</style>
