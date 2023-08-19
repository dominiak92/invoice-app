<template>
  <v-menu
    transition="slide-x-transition"
    offset-y
    :close-on-content-click="closeOnContentClick"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="#7C5DFA" dark v-bind="attrs" v-on="on"
        >Filter<fa class="icon" :icon="['fa', 'caret-down']"
      /></v-btn>
    </template>
    <v-list nav>
      <v-checkbox :label="`Pending`"></v-checkbox>
      <v-checkbox :label="`Paid`"></v-checkbox>
      <v-checkbox :label="`Draft`"></v-checkbox>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'TheFilter',

  data: () => ({
    items: [{ title: 'Pending' }, { title: 'Paid' }, { title: 'Draft' }],
    closeOnContentClick: false,
  }),
}
</script>

<style lang="scss" scoped>
.icon {
  margin-left: 5px;
}
</style>
