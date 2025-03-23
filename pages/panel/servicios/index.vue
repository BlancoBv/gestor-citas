<script setup lang="ts">
definePageMeta({ layout: "panel" })
const { data } = useFetch("/api/servicios")
</script>
<template>
    <div class="grid grid-cols-3 gap-4">
        <div v-for="servicio in data" class="card bg-base-100 card-md shadow-sm">
            <div class="card-body">
                <h2 class="card-title">{{ servicio.nombre }}</h2>
                <p>{{ servicio.descripcion }}</p>
                <p>${{ servicio.idPrecio }}</p>
                <div class="justify-end card-actions">
                    <button type="button" class="btn btn-primary">Editar</button>
                </div>
            </div>
        </div>
    </div>

</template>