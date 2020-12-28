module.exports = {
  publicPath: "/",
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/scss/_colours.scss";
          @import "~@/scss/_fonts.scss";
          @import "~@/scss/_gradients.scss";
          @import "~@/scss/_respond.scss";
          @import "~@/scss/_spacing.scss";
        `
      }
    }
  }
}
