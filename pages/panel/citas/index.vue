<script setup lang="ts">

definePageMeta({ layout: "panel" })

const { data, status, refresh } = useFetch("/api/citas")
</script>
<template>
    {{ data }}

    <DataTable :value="data" paginator :rows="5">
        <Column header="Fecha de la cita" field="fechaCita" />
        <Column header="Cliente" field="cliente" />


    </DataTable>

</template>