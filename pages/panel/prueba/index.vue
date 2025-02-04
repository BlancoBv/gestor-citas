<script setup lang="ts">

const { data, refresh, status } = useFetch("/api/citas")
const mess = ref<string>("hola")
const sse = useEventSource("http://localhost:3000/api/sse")


onMounted(() => {
    sse.open()
    const event = new EventSource("/api/sse")
    /*     event.onmessage = (event) => {
            console.log(event)
        }
        event.onerror = () => {
            console.error("Error en SSE");
            event.close();
        }; */
})


</script>

<template>
    <!--  <Connection /> -->
    {{ sse.status.value }}
    {{ sse.data.value }}
    <span v-if="status === 'pending'" class="loading loading-spinner loading-lg "></span>
</template>
