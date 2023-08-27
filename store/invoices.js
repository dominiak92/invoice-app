export const state = () => ({
  items: [],
  filteredItems: [],
  invoice: {},
  selectedStatuses: [],
  isLoading: false,
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
  RESET_SELECTED_STATUSES(state) {
    state.selectedStatuses = []
  },
  RESET_FILTERED_INVOICES(state) {
    state.filteredItems = []
  },
  TOGGLE_STATUS(state, status) {
    const index = state.selectedStatuses.indexOf(status)
    if (index === -1) {
      state.selectedStatuses.push(status)
    } else {
      state.selectedStatuses.splice(index, 1)
    }
  },
  SET_LOADING(state, value) {
    state.isLoading = value
  },
}

export const actions = {
  // fetch ALL invoices
  async fetchInvoices({ commit }) {
    commit('SET_LOADING', true)
    try {
      const response = await this.$axios.$get('/invoices')
      commit('SET_INVOICES', response)
    } catch (error) {
      console.error('Błąd podczas pobierania faktur:', error)
    }
    commit('SET_LOADING', false)
  },
  // post NEW invoice
  async postInvoices({ dispatch, commit, state }, newInvoice) {
    try {
      await this.$axios.$post('/invoices', newInvoice, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      await dispatch('fetchInvoices')
      await dispatch('filterInvoices', state.items)
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
    commit('SET_LOADING', true)
    try {
      const response = await this.$axios.$get(`/invoices/${id}`)
      commit('GET_INVOICE', response)
    } catch (error) {
      console.error('Błąd podczas pobierania faktur:', error)
    }
    commit('SET_LOADING', false)
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
  filterInvoices({ commit, state }) {
    try {
      const filteredItems = state.items.filter((invoice) =>
        state.selectedStatuses.includes(invoice.status)
      )
      console.log(state.selectedStatuses)
      commit('FILTERED_INVOICES', filteredItems)
    } catch (error) {
      console.log(error)
    }
  },
  // TOGGLE status from filter
  toggleStatus({ commit }, status) {
    commit('TOGGLE_STATUS', status)
  },

  // RESET all filtered invoices
  resetFilteredInvoices({ commit }) {
    commit('RESET_FILTERED_INVOICES')
  },

  resetSelectedStatuses({ commit }) {
    commit('RESET_SELECTED_STATUSES')
  },
}

export const getters = {
  allInvoices: (state) => state.items,
  filteredInvoices: (state) => state.filteredItems,
  filteredStatus: (state) => state.selectedStatuses,
  invoice: (state) => state.invoice,
  isLoading: (state) => state.isLoading
}
