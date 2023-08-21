export const state = () => ({
  items: [],
  invoice: {},
})

export const mutations = {
  SET_INVOICES(state, data) {
    state.items = data
  },
  GET_INVOICE(state, data) {
    state.invoice = data
  },
  REMOVE_INVOICE(state, id) {
    state.items = state.items.filter((invoice) => invoice.id !== id)
  },
}

export const actions = {
  // fetch ALL invoices
  async fetchInvoices({ commit }) {
    try {
      const response = await this.$axios.$get('/invoices')
      commit('SET_INVOICES', response)
    } catch (error) {
      console.error('Błąd podczas pobierania faktur:', error)
    }
  },
  // post NEW invoice
  async postInvoices({ dispatch }, newInvoice) {
    try {
      await this.$axios.$post('/invoices', newInvoice, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      dispatch('fetchInvoices')
    } catch (error) {
      console.error('Błąd podczas wysyłania faktur:', error)
    }
  },

// GET invoice by ID
  async getInvoice({ commit }, id) {
    try {
      const response = await this.$axios.$get(`/invoices/${id}`)
      commit('GET_INVOICE', response)
    } catch (error) {
      console.error('Błąd podczas pobierania faktur:', error)
    }
  },

  // PUT (update status) invoice by ID
  async updateInvoice({ dispatch }, updatedInvoice) {
    try {
      // await console.log(updatedInvoice)
      await this.$axios.$put(`/invoices/${updatedInvoice}`, {
        status: 'paid'
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error('Błąd podczas aktualizacji faktury:', error)
    }
  },

  // DELETE invoice by id
  async deleteInvoice({ commit }, id) {
    try {
      await this.$axios.$delete(`/invoices/${id}`)
      commit('REMOVE_INVOICE', id)
    } catch (error) {
      console.error('Błąd podczas pobierania faktur:', error)
    }
  },
}

export const getters = {
  allInvoices: (state) => state.items,
  invoice: (state) => state.invoice,
}
