export const state = () => ({
    items: []
  });
  
  export const mutations = {
    SET_INVOICES(state, data) {
      state.items = data;
    }
  };
  
  export const actions = {
    async fetchInvoices({ commit }) {
      try {
        const response = await this.$axios.$get('/invoices');
        commit('SET_INVOICES', response);
      } catch (error) {
        console.error('Błąd podczas pobierania faktur:', error);
      }
    },
    async postInvoices({ dispatch }, newInvoice) {
      try {
        await this.$axios.$post('/invoices', newInvoice, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        dispatch('fetchInvoices')
      } catch (error) {
        console.error('Błąd podczas wysyłania faktur:', error);
      }
    }

  };
  
  export const getters = {
    allInvoices: state => state.items
  };