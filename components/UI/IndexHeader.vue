<template>
  <div class="indexHeader">
    <div class="invoices">
      <h2 class="title">Invoices</h2>
      <p class="invNumber">{{ allInvoices.length }} invoices</p>
    </div>
    <div class="filterNewBtn"><TheFilter /> <NewInvoice /></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NewInvoice from '../NewInvoice.vue'
import TheFilter from './TheFilter.vue'

export default {
  name: 'IndexHeader',
  components: { TheFilter, NewInvoice },

  data() {
    return {}
  },

  computed: {
    ...mapGetters('invoices', ['allInvoices']),
  },
}
</script>

<style lang="scss" scoped>
.indexHeader {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
  .invoices {
    .title {
      font-size: 24px;
      font-weight: 700;
    }
    .invNumber {
      font-weight: 500;
      color: $gray;
    }
  }
  .filter {
    margin-right: auto;
    margin-left: 0;
  }
}
.plus {
  background-color: white;
  color: black;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  margin-left: -8px;
}
</style>
