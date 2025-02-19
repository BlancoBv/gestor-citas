<script setup lang="ts">
definePageMeta({ layout: "panel" })
const route = useRoute()
const { data } = useFetch("/api/citas-por-cliente", { query: { idCliente: route.params.id } })
</script>
<template>
    {{ route.params.id }}
    {{ data }}
</template>