<template>
  <div class="invoiceCard">
    <div class="cardLeftSide">
      <p class="invoiceId">
        <span class="hash">#</span>{{ invoice._id.slice(-5).toUpperCase() }}
      </p>
      <div class="totalDate">
        <p class="dueDate">{{ getDueDate() }}</p>
        <p class="total">£ {{ Number(invoice.total).toFixed(2) }}</p>
      </div>
    </div>
    <div class="cardRightSide">
      <p class="clientName">{{ invoice.clientName }}</p>
      <div
        class="status"
        :class="{
          green: invoice.status === 'paid',
          orange: invoice.status === 'pending',
          gray: invoice.status === 'draft',
        }"
      >
        <fa class="icon" :icon="['fa', 'circle']" />{{ invoice.status }}
      </div>
    </div>
  </div>
</template>

<script>
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
  .cardLeftSide {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .invoiceId {
      font-size: 15px;
      font-weight: 700;
      line-height: 15px;
      letter-spacing: -0.25px;
      .hash {
        color: $purplegray;
      }
    }
    .totalDate {
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
  }
}
</style>
