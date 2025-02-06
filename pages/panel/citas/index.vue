<script setup lang="ts">

definePageMeta({ layout: "panel" })

const { data, status, refresh } = useFetch("/api/citas")


</script>
<template>

    <DataTable :value="data" paginator :rows="5">
        <Column header="Fecha de la cita" field="fechaCita" />
        <Column header="Cliente" field="cliente" />
        <template #empty>
            <p class=" font-bold">Sin datos.</p>
        </template>

    </DataTable>

</template>