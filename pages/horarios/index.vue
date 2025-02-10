<script setup lang="ts">
import { DatePicker } from 'v-calendar';
import { onWatcherCleanup } from 'vue';

const actualDate = ref(new Date(Date.now()))
const date = formatDate(actualDate.value, "YYYY-MM-DD")

const dateComputed = computed(() => {
    return formatDate(actualDate.value, "YYYY-MM-DD")
})
const { data, status, refresh, clear } = useFetch("/api/citas-abiertas", {
    query: {
        fecha: dateComputed
    }
})
const { data: SSEData, close, event, open } = useEventSource("/api/sse", ["citaActualizada"] as const)

const disabledDates = ref([{ start: null, end: date }])

watch(SSEData, () => {
    refresh()
    onWatcherCleanup(() => {
        clear()
    })
})

onMounted(() => {
    open()
})

onBeforeUnmount(() => {
    close()
});

/* const attrs = ref([
    {
        key: 'today',
        highlight: {
            color: 'green',
            fillMode: 'solid'
        },
        dates: new Date()
    }
]) */
</script>
<template>
    {{ SSEData }}
    {{ event }}

    <div class="prose max-w-full p-4 h-full flex flex-col">
        <h1>Citas disponibles</h1>
        <p class="not-prose">Selecciona una fecha del calendario para observar las citas que quedan disponibles.</p>
        <div
            class="not-prose grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center md:place-items-start flex-grow">
            <DatePicker v-model="actualDate" mode="date" title-position="left" class="lg:col-span-2"
                :disabled-dates="disabledDates" transparent borderless expanded />

            <div class="grid grid-cols-1 items-center overflow-y-auto">
                <p>{{ formatDate(actualDate, "DD MMMM YYYY") }}</p>
                <p v-if="status === 'success' && data!.length < 1">No hay citas abiertas para este día. Intenta con otro
                </p>

                <template v-else>
                    <ul class="timeline timeline-vertical">
                        <li v-for="cita, index in data">
                            <div class="timeline-box" :class="{
                                'timeline-end': index % 2 === 0,
                                'timeline-start': index % 2 !== 0,
                                'bg-success': cita.estatus === 'abierta',
                                'bg-error': cita.estatus === 'por_llegar',
                                'skeleton': status === 'pending'
                            }">
                                <div class=" flex items-center gap-4">
                                    <Icon name="mdi:clock" size="2em" />
                                    <p class="text-sm">{{ cita.horarioCita.horaInicio }} - {{
                                        cita.horarioCita.horaTermino
                                        }}</p>
                                </div>
                            </div>
                            <div class="timeline-middle">
                                <Icon name="mdi:check-circle" />
                            </div>
                            <!-- <div class="timeline-end ">First Macintosh computer</div> -->
                            <hr />
                        </li>

                    </ul>
                </template>
            </div>
        </div>
        <!-- <DatePicker v-model="date" :attributes="attrs" /> -->

    </div>
</template>