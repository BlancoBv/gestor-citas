<script setup lang="ts">
const { data } = await useFetch("/api/citas")

</script>
<template>
    <h1>Aña</h1>{{ data }}
    <!-- <p v-for="cita in data">
        {{ cita.idCita }}

    </p> -->
</template>