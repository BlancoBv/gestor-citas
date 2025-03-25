<script setup lang="ts">
definePageMeta({ layout: "panel" })
const route = useRoute()
const { data, status } = useFetch("/api/estadisticas-cliente", { query: { id: route.params.id } })

const chartData = computed(() => {
    let serviciosData = {}
    let horariosData = {}
    let recaudacionData = {}
    if (status.value === 'success') {
        serviciosData = {
            labels: Object.keys(data.value?.frecuenciaServicios ?? {}), datasets: [{
                data: Object.values(data.value?.frecuenciaServicios ?? {}),
                label: "Total"
            }]
        }

        horariosData = {
            labels: Object.keys(data.value?.frecuenciaHorarios ?? {}), datasets: [{
                data: Object.values(data.value?.frecuenciaHorarios ?? {}),
                label: "Total"
            }]
        }

        recaudacionData = {
            labels: Object.keys(data.value?.recaudacionServicios ?? {}),
            datasets: [{ data: Object.values(data.value?.recaudacionServicios ?? {}) }]
        }
    }
    return { serviciosData, horariosData, recaudacionData }
})
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
            <div class="stat-value">${{ data?.recaudacionTotal }}</div>
            <!--             <div class="stat-desc">↘︎ 90 (14%)</div>
 -->
        </div>
    </div>
    <h1>Resumen</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <template v-if="status !== 'pending' && status === 'success'">
            <PieChart :data="chartData.serviciosData" titulo="Servicios más usados" />
            <PieChart :data="chartData.recaudacionData" titulo="Recaudación por servicios en $" />
            <PieChart :data="chartData.horariosData" titulo="Frecuencia de horarios" :col-span="2" />

        </template>
        <template v-else>
            <div class="h-96 skeleton"></div>
            <div class="h-96 skeleton"></div>
            <div class="h-96 skeleton col-span-2"></div>
        </template>
    </div>
</template>