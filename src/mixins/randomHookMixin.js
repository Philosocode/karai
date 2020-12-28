export default {
  methods: {
    getRandomHook() {
      const hooks = this.$store.getters.hooks;
      return hooks[Math.floor(Math.random() * hooks.length)];
    }
  }
}