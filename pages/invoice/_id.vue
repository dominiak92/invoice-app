<template>
  <div class="invoiceWrapper">
    <div class="btnWrapper">
      <NuxtLink :style="{ color: 'inherit', textDecoration: 'none' }" to="/">
        <div class="backBtn" @click="dialog = false">
          <fa class="icon" :icon="['fa', 'angle-left']" />
          <p>Go back</p>
        </div>
      </NuxtLink>
    </div>
    <div class="statusWrapper">
      <p class="description">Status</p>
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
    </div>
    <div class="dataWrapper">
      <div class="idDescription">
        <p class="bold">#{{ $route.params.id.slice(-5).toUpperCase() }}</p>
        <p class="description">{{ invoice.description }}</p>
      </div>

      <div v-if="invoice.senderAddress" class="senderAddress">
        <p class="description">{{ invoice.senderAddress.street }}</p>
        <p class="description">{{ invoice.senderAddress.city }}</p>
        <p class="description">{{ invoice.senderAddress.postCode }}</p>
        <p class="description">{{ invoice.senderAddress.country }}</p>
      </div>
      <div class="gridWrapper">
        <div class="invoiceDate">
          <p class="description">Invoice Date</p>
          <p v-if="invoice.createdAt" class="bold">
            {{
              new Date(invoice.createdAt)
                .toDateString()
                .split(' ')
                .splice(1, 3)
                .join(' ')
            }}
          </p>
        </div>
        <div class="paymentDue">
          <p class="description">Payment Due</p>
          <p v-if="invoice.paymentDue" class="bold">
            {{
              new Date(invoice.paymentDue)
                .toDateString()
                .split(' ')
                .splice(1, 3)
                .join(' ')
            }}
          </p>
        </div>
        <div v-if="invoice.clientName" class="billTo">
          <p class="description">Bill to</p>
          <div class="fullAddress">
            <p class="bold">{{ invoice.clientName }}</p>
            <div v-if="invoice.clientAddress" class="senderAddress">
              <p class="description">{{ invoice.clientAddress.street }}</p>
              <p class="description">{{ invoice.clientAddress.city }}</p>
              <p class="description">{{ invoice.clientAddress.postCode }}</p>
              <p class="description">{{ invoice.clientAddress.country }}</p>
            </div>
          </div>
        </div>
        <div class="email">
          <p class="description">Sent to</p>
          <p v-if="invoice.clientEmail" class="bold">
            {{ invoice.clientEmail }}
          </p>
        </div>
      </div>
      <div v-if="invoice" class="totalWrapper">
        <div
          v-for="invoice in invoice.items"
          :key="invoice._id"
          class="priceDetails"
        >
          <div class="totalLeftSide">
            <p class="bold">{{ invoice.name }}</p>
            <p class="boldGray">
              {{ invoice.quantity }} x £{{ invoice.price.toFixed(2) }}
            </p>
          </div>
          <p v-if="invoice.total" class="bold">
            £{{ invoice.total.toFixed(2) }}
          </p>
        </div>
      </div>
      <div class="grandTotal">
        <p class="totalTitle">Grand Total</p>
        <p v-if="invoice.total" class="totalPrice">
          £ {{ invoice.total.toFixed(2) }}
        </p>
      </div>
    </div>
    <div class="invoiceFooter">
      <EditInvoice :invoice="invoice" />
      <DeleteBtn :invoice="invoice" />

      <v-btn
        v-bind="attrs"
        light
        rounded
        :style="{ color: '#FFFFFF' }"
        color="#7C5DFA"
        large
        :disabled="invoice.status === 'paid'"
        v-on="on"
        @click="updateInvoice"
      >
        mark as paid</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditInvoice from '~/components/EditInvoice.vue'
import DeleteBtn from '~/components/UI/DeleteBtn.vue'
export default {
  components: { DeleteBtn, EditInvoice },
  data() {
    return {
      attrs: {},
      on: {},
    }
  },

  computed: {
    ...mapGetters('invoices', ['invoice', 'isLoading']),
    updateInvoiceAsPaid() {
      return {
        id: this.$route.params.id,
        status: 'paid',
      }
    },
  },

  async created() {
    await this.$store.dispatch('invoices/getInvoice', this.$route.params.id)
  },
  methods: {
    async updateInvoice() {
      await this.$store.dispatch(
        'invoices/updateInvoice',
        this.$route.params.id
      )
      await this.$store.dispatch('invoices/getInvoice', this.$route.params.id)
    },
  },
}
</script>
<style lang="scss" scoped>
.invoiceWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .btnWrapper {
    width: 100%;
    padding: 1rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    .backBtn {
      width: 5rem;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 0.6rem;
      font-size: 0.9375rem;
      font-style: normal;
      font-weight: 700;
      line-height: 0.9375rem; /* 100% */
      letter-spacing: -0.01563rem;
      cursor: pointer;
      .icon {
        font-size: 0.8rem;
        color: $violet;
      }
    }
  }
  .statusWrapper {
    width: 20.4375rem;
    height: 5.6875rem;
    border-radius: 0.5rem;
    background: #fff;
    display: flex;
    justify-content: space-around;
    gap: 6rem;
    align-items: center;
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
  }
  .description {
    color: #858bb2;
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.125rem;
  }
  .dataWrapper {
    margin-top: 1rem;
    width: 20.4375rem;
    border-radius: 0.5rem;
    background: #fff;
    padding: 1.5rem;
    .bold {
      color: $purpleblack;
      font-size: 0.9375rem;
      font-style: normal;
      font-weight: 700;
    }
    .idDescription {
      display: flex;
      flex-direction: column;
    }
    .senderAddress {
      margin-top: 1rem;
    }
    .gridWrapper {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      grid-column-gap: 0px;
      grid-row-gap: 0px;
      margin-top: 1.7rem;
      .invoiceDate {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        grid-area: 1 / 1 / 2 / 2;
      }
      .paymentDue {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        grid-area: 2 / 1 / 3 / 2;
      }
      .billTo {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        grid-area: 1 / 2 / 3 / 3;
        .fullAddress {
          display: flex;
          flex-direction: column;
        }
      }
      .email {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        grid-area: 3 / 1 / 4 / 2;
      }
    }
    .totalWrapper {
      width: 17.4375rem;
      border-radius: 0.5rem 0.5rem 0rem 0rem;
      background: #f9fafe;
      padding: 1rem;
      display: flex;
      flex-direction: column;

      .priceDetails {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;

        .boldGray {
          font-size: 0.9375rem;
          font-style: normal;
          font-weight: 700;
          line-height: 0.9375rem; /* 100% */
          letter-spacing: -0.01563rem;
          color: #7e88c3;
          margin-top: 0.2rem;
        }
      }
    }
  }
}
.grandTotal {
  width: 100%;
  background-color: $headerbackground;
  color: white;
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  .totalTitle {
    font-size: 0.8125rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.125rem; /* 138.462% */
    letter-spacing: -0.00625rem;
  }
  .totalPrice {
    color: #fff;
    text-align: right;
    font-family: League Spartan;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 2rem; /* 133.333% */
    letter-spacing: -0.03125rem;
  }
}
.invoiceFooter {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 5.6875rem;
  margin-top: 3rem;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
}
</style>
