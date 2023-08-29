<template>
  <div class="indexHeader">
    <div class="invoices">
      <div class="titleWrapper"></div>
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
@import '../../assets/breakpoints.scss';
@import '../../assets/mixins.scss';
.indexHeader {
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-width: 100vw;
  padding-top: 30px;
  padding-bottom: 30px;
  @include md {
    width: 62rem;
    justify-content: space-around;
  }
  .invoices {
    .title {
      font-size: 24px;
      font-weight: 700;
      animation: myAnim 0.9s cubic-bezier(0.76, 0, 0.24, 1) 0s 1 normal forwards;
      
      @include md {
        font-size: 2.25rem;
      }
    }
    .invNumber {
      font-weight: 500;
      color: $gray;
      @include md {
        font-size: 0.9rem;
      }
    }
  }
  .filter {
    margin-right: auto;
    margin-left: 0;
  }
  .filterNewBtn {
    @include md {
      width: 13rem;
      display: flex;
      justify-content: space-between;
    }
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
@keyframes myAnim {
	0% {
		opacity: 0;
		transform: translateX(-150px);
	}

	100% {
		opacity: 1;
		transform: translateX(0);
	}
}
</style>
