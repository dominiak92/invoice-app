export const state = () => ({
  items: [],
  filteredItems: [],
  invoice: {},
  selectedStatuses: [],
})

export const mutations = {
  SET_INVOICES(state, data) {
    state.items = data
  },
  GET_INVOICE(state, data) {
    state.invoice = data
  },
  FILTERED_INVOICES(state, data) {
    state.filteredItems = data
  },
  REMOVE_INVOICE(state, id) {
    state.items = state.items.filter((invoice) => invoice.id !== id)
  },
  PUT_INVOICE(state, data) {
    state.invoice = data
  },
  SET_SELECTED_STATUSES(state, statuses) {
    state.selectedStatuses = statuses
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
  async postInvoices({ dispatch, commit, state }, newInvoice) {
    try {
      await this.$axios.$post('/invoices', newInvoice, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      await dispatch('fetchInvoices') // Pobierz najnowsze faktury
      await dispatch('filterInvoices', state.items) // Zaktualizuj filteredItems na podstawie najnowszych faktur
    } catch (error) {
      console.error('Błąd podczas wysyłania faktur:', error)
    }
  },

  // update whole invoice by ID
  async editInvoice({ commit, dispatch }, payload) {
    try {
      const { id, newInvoice } = payload
      const response = await this.$axios.$put(
        `/invoices/${id}`,
        JSON.stringify(newInvoice),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      commit('PUT_INVOICE', response)
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
      await this.$axios.$put(
        `/invoices/${updatedInvoice}`,
        {
          status: 'paid',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
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

  // FILTER invoices by status
  async filterInvoices({ commit, dispatch }, payload) {
    try {
      console.log(payload)
      await commit('FILTERED_INVOICES', payload)
      // await commit('SET_INVOICES', payload.length === 0 ? state.items : payload) // Ustawienie items na payload lub pierwotne items, jeśli payload jest pusty
    } catch (error) {
      console.log(error)
    }
  },
}

export const getters = {
  allInvoices: (state) => state.items,
  filteredInvoices: (state) => state.filteredItems,
  invoice: (state) => state.invoice,
}
