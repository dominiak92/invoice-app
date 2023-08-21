<template>
  <v-dialog v-model="dialog" light width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        :style="{ color: '#7E88C3' }"
        light
        rounded
        color="#F9FAFE"
        large
        v-on="on"
      >
        edit</v-btn
      >
    </template>
    <v-card class="dialog">
      <div class="backBtn" @click="dialog = false">
        <fa class="icon" :icon="['fa', 'angle-left']" />
        <p>Go back</p>
      </div>

      <h2 class="title">Edit invoice</h2>
      <p class="smallTitle">Bill From</p>
      <v-form ref="form" v-model="valid" lazy-validation class="formWrapper">
        <v-text-field
          v-model="newInvoice.senderAddress.street"
          outlined
          :rules="rules('Street Address')"
          label="Street Address"
          required
        ></v-text-field>
        <div class="cityPostalCountry">
          <v-text-field
            v-model="newInvoice.senderAddress.city"
            outlined
            :rules="rules('City')"
            label="City"
            required
            class="city"
          ></v-text-field>

          <v-text-field
            v-model="newInvoice.senderAddress.postCode"
            outlined
            :rules="rules('Postal Code')"
            label="Post Code"
            required
            class="postal"
          ></v-text-field>
          <v-text-field
            v-model="newInvoice.senderAddress.country"
            outlined
            :rules="rules('Country')"
            label="Country"
            required
            class="country"
          ></v-text-field>
        </div>
        <p class="smallTitle">Bill To</p>
        <v-text-field
          v-model="newInvoice.clientName"
          outlined
          :rules="rules('Client`s Name')"
          label="Client`s Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="newInvoice.clientEmail"
          outlined
          :rules="rules('Client`s Email')"
          label="Client`s Email"
          required
        ></v-text-field>
        <v-text-field
          v-model="newInvoice.clientAddress.street"
          outlined
          :rules="rules('Client`s Street Address')"
          label="Street Address"
          required
        ></v-text-field>
        <div class="cityPostalCountry">
          <v-text-field
            v-model="newInvoice.clientAddress.city"
            outlined
            :rules="rules('City')"
            label="City"
            required
            class="city"
          ></v-text-field>

          <v-text-field
            v-model="newInvoice.clientAddress.postCode"
            outlined
            :rules="rules('Postal Code')"
            label="Post Code"
            required
            class="postal"
          ></v-text-field>
          <v-text-field
            v-model="newInvoice.clientAddress.country"
            outlined
            :rules="rules('Country')"
            label="Country"
            required
            class="country"
          ></v-text-field>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="newInvoice.paymentDue"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="newInvoice.paymentDue"
                outlined
                label="Invoice date"
                append-icon="mdi-calendar"
                readonly
                :rules="dateRules(newInvoice.paymentDue)"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="newInvoice.paymentDue" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(newInvoice.paymentDue)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <v-select
            v-model="newInvoice.paymentTerms"
            :items="terms"
            item-text="text"
            item-value="value"
            outlined
            :rules="rules('Payment Terms')"
            label="Payment Terms"
            required
          ></v-select>
        </div>
        <v-text-field
          v-model="newInvoice.description"
          outlined
          :rules="rules('Description')"
          label="Description"
          required
        ></v-text-field>
        <p class="smallTitle" :style="{ color: '#777F98' }">Item List</p>
        <div
          v-for="(item, index) in newInvoice.items"
          :key="index"
          class="itemForms"
        >
          <div class="itemFormHeader">
            <p class="itemNumber">{{ itemNumber(index) }}</p>
            <fa
              v-if="index > 0"
              :style="{ cursor: 'pointer' }"
              :icon="['fa', 'trash']"
              @click="removeForm(index)"
            />
          </div>
          <v-text-field
            v-model="newInvoice.items[index].name"
            outlined
            :rules="rules('Item Name')"
            label="Item Name"
            required
          ></v-text-field>
          <div class="qtyPriceTotal">
            <v-text-field
              v-model="newInvoice.items[index].quantity"
              outlined
              :rules="numRules('Quantity')"
              label="Qty."
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model="newInvoice.items[index].price"
              outlined
              :rules="numRules('Price')"
              label="Price"
              type="number"
              required
            ></v-text-field>
            <div class="totalForItem">
              <v-text-field
                :placeholder="`${newInvoice.items[index].total}`"
                width="10rem"
                outlined
                disabled
              ></v-text-field>
            </div>
          </div>
        </div>
        <v-btn
          class="addNewItem"
          v-bind="attrs"
          light
          width="80%"
          rounded
          color="#F9FAFE"
          v-on="on"
          @click="addForm"
        >
          <div class="plus"><fa :icon="['fa', 'plus']" /></div>
          Add New Item</v-btn
        >
      </v-form>
      <div class="actions">
        <v-btn
          v-bind="attrs"
          dark
          rounded
          color="#EC5757"
          @click="dialog = false"
          v-on="on"
        >
          cancel</v-btn
        >
        <v-btn
          v-bind="attrs"
          :disabled="!valid"
          light
          rounded
          :style="{ color: '#FFFFFF' }"
          color="#7C5DFA"
          v-on="on"
          @click="sendNewInvoice"
        >
          Save</v-btn
        >
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EditInvoice',
  props: {
    invoice: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      dialog: false,
      valid: true,
      menu: false,
      attrs: {},
      on: {},
      terms: [
        { text: 'Net 10 days', value: 10 },
        { text: 'Net 15 days', value: 15 },
        { text: 'Net 60 days', value: 60 },
        { text: 'Net 90 days', value: 90 },
      ],
      newInvoice: {
        paymentDue: '',
        createdAt: new Date(),
        description: '',
        paymentTerms: null,
        clientName: '',
        clientEmail: '',
        status: '',
        senderAddress: {
          street: '',
          city: '',
          postCode: '',
          country: '',
        },
        clientAddress: {
          street: '',
          city: '',
          postCode: '',
          country: '',
        },
        items: [
          {
            name: '',
            quantity: 0,
            price: 0,
            total: 0,
          },
        ],
        total: 4,
      },
    }
  },
  watch: {
    'newInvoice.items': {
      handler() {
        this.newInvoice.items.forEach((item, index) => {
          if (item) {
            const itemTotal = item.quantity * item.price
            this.$set(this.newInvoice.items[index], 'total', itemTotal)
          }
        })
        if (this.newInvoice.items && this.newInvoice.items.length) {
          const grandTotal = this.newInvoice.items.reduce((sum, item) => {
            return sum + item.quantity * item.price
          }, 0)
          this.newInvoice.total = grandTotal
        }
      },
      deep: true,
    },
    // invoice(newVal) {
    //   const dateObject = new Date(newVal.paymentDue)
    //   const year = dateObject.getFullYear()
    //   const month = String(dateObject.getMonth() + 1).padStart(2, '0')
    //   const day = String(dateObject.getDate()).padStart(2, '0')
    //   const formattedDate = `${year}-${month}-${day}`

    //   this.newInvoice.paymentDue = formattedDate
    //   this.newInvoice.description = newVal.description
    //   this.newInvoice.paymentTerms = newVal.paymentTerms
    //   this.newInvoice.clientName = newVal.clientName
    //   this.newInvoice.clientEmail = newVal.clientEmail
    //   this.newInvoice.status = newVal.status
    //   this.newInvoice.senderAddress = newVal.senderAddress
    //   this.newInvoice.clientAddress = newVal.clientAddress
    //   this.newInvoice.items = newVal.items
    //   this.newInvoice.total = newVal.total
    // },
  },
  methods: {
    rules(value) {
      const baseRules = [(v) => !!v || `${value} is required`]
      return baseRules
    },
    numRules(value) {
      const baseRules = [(v) => (!!v && v > -1) || `${value} is not correct`]
      return baseRules
    },
    dateRules(value) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const selectedDate = new Date(value)

      const baseRules = [
        (v) => !!v || `Date is required`,
        (v) =>
          (!!v && selectedDate >= today) ||
          `Selected date is earlier than today's date`,
      ]
      return baseRules
    },
    itemNumber(number) {
      return `Product #${number + 1}`
    },
    removeForm(index) {
      if (index !== 0) {
        this.newInvoice.items.splice(index, 1)
        this.$refs.form.validate()
      }
    },
    addForm() {
      this.newInvoice.items.push({
        name: '',
        quantity: 0,
        price: 0,
        total: 0,
      })
      this.$refs.form.resetValidation()
    },

    async sendNewInvoice() {
      if (this.$refs.form.validate()) {
        this.newInvoice.status = 'pending'
        // await console.log(this.newInvoice)
        await this.$store.dispatch(
          'invoices/postInvoices',
          JSON.stringify(this.newInvoice)
        )
        this.dialog = false
        // await console.log(JSON.stringify(this.newInvoice))
      }
    },

    async sendNewDraftInvoice() {
      if (this.$refs.form.validate()) {
        this.newInvoice.status = 'draft'
        await this.$store.dispatch(
          'invoices/postInvoices',
          JSON.stringify(this.newInvoice)
        )
        this.dialog = false
      }
    },

    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog {
  padding: 1.2rem;
  .title {
    font-family: $font;
    font-weight: 700;
    font-size: 1.5rem;
    padding-top: 1.62rem;
  }
  .smallTitle {
    color: $violet;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    font-size: 0.9375rem;
    font-weight: 700;
    line-height: 0.9375rem; /* 100% */
    letter-spacing: -0.01563rem;
  }
  .formWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .itemForms {
      .itemFormHeader {
        display: flex;
        .itemNumber {
          color: #7e88c3;
          margin-bottom: 0.7rem;
          margin-right: 1rem;
        }
      }
    }
    .addNewItem {
      align-self: center;
      margin-bottom: 2rem;
    }
  }
  .actions {
    display: flex;
    justify-content: space-between;
    gap: 0.5 rem;
  }
  .cityPostalCountry {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 1rem;
    grid-row-gap: 0.2rem;
    .city {
      grid-area: 1 / 1 / 2 / 2;
    }
    .postal {
      grid-area: 1 / 2 / 2 / 3;
    }
    .country {
      grid-area: 2 / 1 / 3 / 3;
    }
  }
  .qtyPriceTotal {
    display: flex;
    justify-content: center;
    gap: 1rem;
    .totalForItem {
      display: flex;
      width: 10rem;
    }
  }
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

.plus {
  background-color: white;
  color: black;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  margin-left: -10px;
}
</style>
