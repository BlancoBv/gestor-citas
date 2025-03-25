<script setup lang="ts">
const props = defineProps<{ data: any; titulo?: string; colSpan?: number }>()
const chartOptions = ref();
const chartData = ref()
const colSpan = ref<number | undefined>(props.colSpan)

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--color-base-content');
    const textColorSecondary = documentStyle.getPropertyValue('--color-neutral');
    const surfaceBorder = documentStyle.getPropertyValue('--color-neutral');

    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            },
            title: { text: props.titulo ?? "Título de ejemplo", display: true, font: { size: 20 } }
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

const classList = computed(() => {
    if (colSpan.value !== undefined) {
        return `h-96 col-span-${colSpan.value}`
    }
    return "h-96"
})
onMounted(() => {
    chartData.value = props.data
    chartOptions.value = setChartOptions()
});
</script>
<template>
    <Chart ref="chart" type="pie" :data="chartData" :options="chartOptions" :class="classList" />
</template>
<!-- <script setup lang="ts">
import { Chart as ChartJS } from "chart.js";

const props = defineProps<{ data: any; titulo?: string }>();
const chartOptions = ref();
const chart = ref<ChartJS | null>(null); // Referencia al gráfico

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--color-base-content");
    const textColorSecondary = documentStyle.getPropertyValue("--color-neutral");
    const surfaceBorder = documentStyle.getPropertyValue("--color-neutral");

    return {
        responsive: true,
        maintainAspectRatio: false, // ¡Ojo! estaba mal escrito como "mantainAspectRatio"
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                },
            },
            title: {
                text: props.titulo ?? "Título de ejemplo",
                display: true,
                font: { size: 20 },
            },
        },
        scales: {
            x: {
                ticks: { color: textColorSecondary },
                grid: { color: surfaceBorder },
            },
            y: {
                beginAtZero: true,
                ticks: { color: textColorSecondary },
                grid: { color: surfaceBorder },
            },
        },
    };
};

const resizeChartForPrint = () => {
    if (chart.value?.chart) {
        chart.value.chart.resize(600, 600);
    }
};

const restoreChartSize = () => {
    if (chart.value?.chart) {
        chart.value.chart.resize();
    }
};

onMounted(() => {
    chartOptions.value = setChartOptions();

    window.addEventListener("beforeprint", resizeChartForPrint);
    window.addEventListener("afterprint", restoreChartSize);
});

onUnmounted(() => {
    window.removeEventListener("beforeprint", resizeChartForPrint);
    window.removeEventListener("afterprint", restoreChartSize);
});
</script>

<template>
    <Chart ref="chart" type="pie" :data="props.data" :options="chartOptions" />
</template> -->
