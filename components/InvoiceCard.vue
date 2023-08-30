<template>
  <div class="invoiceCard">
    <div class="cardLeftSide">
      <p v-if="!isLoading" class="invoiceId">
        <span class="hash">#</span>{{ invoice._id.slice(-5).toUpperCase() }}
      </p>
      <v-skeleton-loader v-else type="chip"></v-skeleton-loader>
      <div v-if="!isLoading" class="totalDate">
        <p class="dueDate">{{ getDueDate() }}</p>
        <p class="total">£ {{ Number(invoice.total).toFixed(2) }}</p>
      </div>
      <v-skeleton-loader v-else type="chip"></v-skeleton-loader>
    </div>
    <div class="cardRightSide">
      <p v-if="!isLoading" class="clientName">{{ invoice.clientName }}</p>
      <v-skeleton-loader v-else type="chip"></v-skeleton-loader>
      <div
        v-if="!isLoading"
        class="status"
        :class="{
          green: invoice.status === 'paid',
          orange: invoice.status === 'pending',
          gray: invoice.status === 'draft',
        }"
      >
        <fa class="icon" :icon="['fa', 'circle']" />{{ invoice.status }}
      </div>
      <v-skeleton-loader v-else type="chip"></v-skeleton-loader>
      <fa class="arrowIcon" :icon="['fa', 'caret-right']" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'InvoiceCard',
  props: {
    invoice: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      paymentDue: this.invoice_id,
    }
  },
  computed: {
    ...mapGetters('invoices', ['isLoading']),
  },

  methods: {
    getDueDate() {
      const date = new Date(this.invoice.paymentDue).toDateString()
      const fullDate = date.split(' ')
      fullDate.splice(0, 1)
      return `Due ${fullDate.join(' ')}`
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';
@import '../assets/breakpoints.scss';
.invoiceCard {
  width: 20.4375rem;
  height: 8.375rem;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
  margin: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  animation: myAnim 1s ease 0s 1 normal forwards;
  @include md {
    justify-content: space-between;
    width: 42rem;
    height: 4.5rem;
  }
  @include xl {
    width: 45rem;
  }
  .cardLeftSide {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    @include md {
      flex-direction: row;
      align-items: center;
      width: 17rem;
      justify-content: space-between;
    }
    @include xl {
      width: 19rem;
    }

    .invoiceId {
      font-size: 15px;
      font-weight: 700;
      line-height: 15px;
      letter-spacing: -0.25px;
      @include md {
      }
      .hash {
        color: $purplegray;
      }
    }
    .totalDate {
      @include md {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
      }
      .dueDate {
        font-size: 13px;
        font-weight: 500;
        color: $gray;
      }
    }
    .total {
      font-size: 15px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: -0.25px;
    }
  }
  .cardRightSide {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    @include md {
      flex-direction: row;
      align-items: center;
      width: 15rem;
      justify-content: space-between;
    }
    @include xl {
      width: 16rem;
    }
    .green {
      background-color: #f5fdfa;
      color: #72da96;
    }
    .orange {
      background-color: #fdfaef;
      color: #e69a00;
    }
    .gray {
      background-color: #f4f4f6;
      color: #3b3756;
    }
    .clientName {
      font-size: 13px;
      font-weight: 500;
      line-height: 15px;
      letter-spacing: -0.10000000149011612px;
      text-align: right;
      color: #858bb2;
      word-break: break-word;
      max-width: 6rem;
      @include md {
        justify-self: flex-end;
        text-align: left;
        max-width: 4rem;
      }
    }
    .status {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 104px;
      height: 40px;
      border-radius: 0.375rem;

      .icon {
        font-size: 9px;
        margin-right: 4px;
      }
    }
    .arrowIcon {
      display: none;
      @include md {
        display: flex;
      }
    }
  }
}
.fade-out {
  animation: fadeOutAnim 1.3s ease-out both;
}

@keyframes fadeOutAnim {
  0% {
    opacity: 1;

  }

  100% {
    opacity: 0;

  }
}
@keyframes myAnim {
  0% {
    opacity: 0;
    transform: translateX(150px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
