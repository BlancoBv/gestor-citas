<script setup lang="ts">
definePageMeta({ layout: "panel" })
const route = useRoute()
const { data } = useFetch("/api/estadisticas-cliente", { query: { id: route.params.id } })

const serviciosData = {
    labels: Object.keys(data.value?.frecuenciaServicios ?? {}), datasets: [{
        data: Object.values(data.value?.frecuenciaServicios ?? {}),
        label: "Total"
    }]
}

const horariosData = {
    labels: Object.keys(data.value?.frecuenciaHorarios ?? {}), datasets: [{
        data: Object.values(data.value?.frecuenciaHorarios ?? {}),
        label: "Total"
    }]
}
</script>
<template>
    <div class="stats stats-vertical lg:stats-horizontal shadow">
        <div class="stat">
            <div class="stat-title">Cliente</div>
            <div class="stat-value">{{ data?.cliente.nombreCompleto }}</div>
            <!--             <div class="stat-desc">Jan 1st - Feb 1st</div>
 -->
        </div>

        <div class="stat">
            <div class="stat-title">Citas totales</div>
            <div class="stat-value">{{ data?.citasTotales }}</div>
            <!--             <div class="stat-desc">↗︎ 400 (22%)</div>
 -->
        </div>

        <div class="stat">
            <div class="stat-title">Recaudación</div>
            <div class="stat-value">1,200</div>
            <!--             <div class="stat-desc">↘︎ 90 (14%)</div>
 -->
        </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PieChart :data="serviciosData" titulo="Servicios más usados" />
        <PieChart :data="horariosData" titulo="Frecuencia de horarios" />
        <PieChart :data="serviciosData" titulo="Recaudación por servicios" class="col-span-2" />
    </div>
</template>