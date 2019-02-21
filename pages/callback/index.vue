<template>
    <a-row type="flex" justify="center" align="middle" class="full-height">
        <a-spin size="large" />
    </a-row>
</template>

<script>

export default {
    created () {
      this.$store.dispatch('auth/handleAuth')
      .then(res => {
          this.$router.replace('dashboard')
      })
      
    }
}
</script>
