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
      <div class="descriptionIcon">
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
      <div class="statusBtns">
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

    <div class="dataWrapper">
      <div class="idAddress">
        <div v-if="!isLoading" class="idDescription">
          <p class="bold">#{{ $route.params.id.slice(-5).toUpperCase() }}</p>
          <p class="description">{{ invoice.description }}</p>
        </div>
        <v-skeleton-loader v-else type="chip"></v-skeleton-loader>

        <div v-if="invoice.senderAddress && !isLoading" class="senderAddress">
          <p class="description">{{ invoice.senderAddress.street }}</p>
          <p class="description">{{ invoice.senderAddress.city }}</p>
          <p class="description">{{ invoice.senderAddress.postCode }}</p>
          <p class="description">{{ invoice.senderAddress.country }}</p>
        </div>
        <v-skeleton-loader
          v-else
          width="6rem"
          type="list-item-three-line"
        ></v-skeleton-loader>
      </div>
      <div v-if="!isLoading" class="gridWrapper">
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
      <v-skeleton-loader
        v-else
        type="table-heading, list-item-three-line, list-item-three-line"
      ></v-skeleton-loader>
      <div v-if="!isLoading" class="totalCard">
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
        <div v-if="invoice" class="totalWrapperDesktop">
          <div class="totalDescriptions">
            <div class="itemName desc">Item Name</div>
            <div class="qty desc">QTY.</div>
            <div class="price desc">Price</div>
            <div class="total desc">Total</div>
          </div>
          <div
            v-for="invoice in invoice.items"
            :key="invoice._id"
            class="itemsWrapper"
          >
            <div class="priceDetails">
              <div class="itemsName">{{ invoice.name }}</div>
              <div class="itemsQty">{{ invoice.quantity }}</div>
              <div class="itemsPrice">£{{ invoice.price.toFixed(2) }}</div>
              <div class="itemsTotal">£{{ invoice.total.toFixed(2) }}</div>
            </div>
          </div>
        </div>
        <div class="grandTotal">
          <p class="totalTitle">Grand Total</p>
          <p v-if="invoice.total" class="totalPrice">
            £ {{ invoice.total.toFixed(2) }}
          </p>
        </div>
      </div>
      <v-skeleton-loader v-else type="image"></v-skeleton-loader>
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
@import '../../assets/breakpoints.scss';
@import '../../assets/mixins.scss';
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
      @include md {
        margin-left: 3rem;
      }
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
    box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
    .descriptionIcon {
      display: flex;
      justify-content: space-around;
      gap: 8rem;
      align-items: center;
      @include md {
        justify-content: space-between;
        gap: 1rem;
      }
    }
    @include md {
      width: 43rem;
    }
    .statusBtns {
      display: none;
      @include md {
        display: flex;
        gap: 1rem;
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
    overflow-wrap: break-word;
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
    box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
    .idAddress {
      @include md {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .idDescription {
        @include md {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
      }
      .senderAddress {
        @include md {
          text-align: right;
          margin: 0;
          line-height: 1.125rem;
        }
      }
    }
    @include md {
      width: 43rem;
    }

    .bold {
      max-width: 10rem;
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
      @include md {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
      }
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
        max-width: 10rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        grid-area: 1 / 2 / 3 / 3;
        word-break: break-word;

        .fullAddress {
          display: flex;
          flex-direction: column;
        }
      }
      .email {
        max-width: 10rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        grid-area: 3 / 1 / 4 / 2;
        overflow-wrap: break-word;
        @include md {
          grid-area: 1 / 3 / 2 / 4;
        }
      }
    }
    .totalWrapper {
      border-radius: 0.5rem 0.5rem 0rem 0rem;
      background: #f9fafe;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      word-break: break-word;
      width: 100%;
      @include md {
        display: none;
      }

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
    .totalWrapperDesktop {
      border-radius: 0.5rem 0.5rem 0rem 0rem;
      background: #f9fafe;
      padding: 2rem;
      margin-top: 3rem;
      width: 100%;
      display: none;
      @include md {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .totalDescriptions {
        display: grid;
        width: 100%;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        .desc {
          font-size: 0.8125rem;
          font-style: normal;
          font-weight: 500;
          color: #7e88c3;
        }

        .itemName {
          text-align: left;
          grid-area: 1 / 1 / 2 / 2;
        }
        .qty {
          text-align: right;
          grid-area: 1 / 2 / 2 / 3;
        }
        .price {
          text-align: right;
          grid-area: 1 / 3 / 2 / 4;
        }
        .total {
          text-align: right;
          grid-area: 1 / 4 / 2 / 5;
        }
      }
      .itemsWrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        .priceDetails {
          display: grid;
          width: 100%;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: 1fr;
          grid-column-gap: 0px;
          grid-row-gap: 0px;
          .itemsName {
            font-size: 0.9375rem;
            font-style: normal;
            font-weight: 700;
            grid-area: 1 / 1 / 2 / 2;
          }
          .itemsQty {
            color: #7E88C3;
            text-align: right;
            grid-area: 1 / 2 / 2 / 3;
          }
          .itemsPrice {
            color: #7E88C3;
            text-align: right;
            grid-area: 1 / 3 / 2 / 4;
          }
          .itemsTotal {
            font-size: 0.9375rem;
            font-style: normal;
            font-weight: 700;
            text-align: right;
            grid-area: 1 / 4 / 2 / 5;
          }
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
  @include md {
    display: none;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
