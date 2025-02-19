<script setup lang="ts">
definePageMeta({ layout: "panel" })

const { data } = useFetch("/api/clientes")
</script>
<template>

    <main class="grid grid-cols-3 gap-4">
        <NuxtLink v-for="cliente in data" :to="`estadisticas-clientes/${cliente.idCliente}`"
            class="card bg-base-100 size-96 shadow-xl group overflow-clip">
            <div class="card-body z-10">
                <h2 class="card-title">{{ cliente.nombreCompleto }}</h2>
                <p>Registrado el {{ formatDate(cliente.createdAt.toString(), "DD-MM-YYYY") }}</p>
            </div>
            <figure
                class="group-hover:scale-[2] group-hover:text-slate-300 -z-0 transition-all ease-in-out duration-100 ">
                <Icon name="mdi:user" size="20em" />
            </figure>
        </NuxtLink>

    </main>
</template>