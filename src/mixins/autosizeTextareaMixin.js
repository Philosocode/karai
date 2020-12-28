export default {
  methods: {
    autosizeTextarea(event) {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    },
    collapseTextarea(event) {
      event.target.style.height = "auto";
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (typeof this.$el.setAttribute === "function") {
        this.$el.setAttribute("style", "height", `${this.$el.scrollHeight}px`);
      }
    });
  }
};