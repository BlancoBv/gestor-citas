<script setup lang="ts">
const { data, error } = await useFetch("/api/citas?estatus=todas")
</script>
<template>
    <h1>Aña</h1>{{ data }}

    {{ error?.message }}
    <!-- <p v-for="cita in data">
        {{ cita.idCita }}

    </p> -->
</template>