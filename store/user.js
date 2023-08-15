export const state = () => ({
})

export const mutations = {}

export const actions = {

  
  logout() {
    try {
      this.$router.push('/login')
      this.$auth.logout()
    } catch (error) {
      throw new Error('error')
    }
  },
}
