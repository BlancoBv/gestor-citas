<script setup lang="ts">

const { open: openSSE, close: closeSSE, status: sseStatus, data: sseData } =
    useEventSource("http://192.168.100.4:3000/api/sse")


const { data, refresh, status } = useFetch("/api/citas", { watch: [sseData] })
const mess = ref<string>("hola")


onMounted(() => {
    openSSE()    /*     event.onmessage = (event) => {
            console.log(event)
        }
        event.onerror = () => {
            console.error("Error en SSE");
            event.close();
        }; */
})

onBeforeUnmount(() => {
    closeSSE()
})

</script>

<template>
    <!--  <Connection /> -->
    {{ sseStatus }}
    {{ sseData }}
    <span v-if="status === 'pending'" class="loading loading-spinner loading-lg "></span>
    {{ data }}
</template>
