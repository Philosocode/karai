<template>
  <section>
    <h2>404 - Page Not Found</h2>
    <p>
      To go back home, 
      <router-link to="/">click here.</router-link>
    </p>
  </section>
</template>

<style lang="scss" scoped>
h2, p {
  color: $color-grey-lightest;
}

a {
  color: $color-green-light;
}
</style>