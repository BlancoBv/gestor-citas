<script setup lang="ts">
definePageMeta({ layout: "panel" })
const route = useRoute()
const { data } = useFetch("/api/estadisticas-cliente", { query: { id: route.params.id } })


onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    return {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                label: 'Sales',
                data: [540, 325, 702, 620],
                backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246 0.2)'],
                borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
                borderWidth: 1
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
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

    <Chart type="bar" :data="chartData" :options="chartOptions" />
</template>