<template>
    <div class="full-height">
        <h1>Hello {{ profile.name }}</h1>
        <p>You can see this page because you're logged in...</p>
    </div>
</template>

<script>

export default {
    layout: 'dashboard',
    computed: {
        profile() {
            return this.$store.getters['auth/getProfile']
        },
    },
}
</script>

