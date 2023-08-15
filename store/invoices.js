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
    }
  };
  
  export const getters = {
    allInvoices: state => state.items
  };