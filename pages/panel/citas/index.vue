<script setup lang="ts">
import Dialog from 'primevue/dialog';

definePageMeta({ layout: "panel" })

interface Body { mes: string, year: string, periodo: string, horarios: number[] }
interface Cita { idCita?: number, fechaCita: string, horarioCita?: { horaTermino: string, horaInicio: string }, estatus: "abierta" | "por_llegar" | "sala_espera" }

const DATE = new Date(Date.now())
const MESES = [
    { id: 1, nombre: "Enero" },
    { id: 2, nombre: "Febrero" },
    { id: 3, nombre: "Marzo" },
    { id: 4, nombre: "Abril" },
    { id: 5, nombre: "Mayo" },
    { id: 6, nombre: "Junio" },
    { id: 7, nombre: "Julio" },
    { id: 8, nombre: "Agosto" },
    { id: 9, nombre: "Septiembre" },
    { id: 10, nombre: "Octubre" },
    { id: 11, nombre: "Noviembre" },
    { id: 12, nombre: "Diciembre" },
];
const cm = useTemplateRef("cm");
const modalR = useTemplateRef("modal");
const selectedItem = ref<Cita | null>(null);
const estatusCita = ref<string>("todas")
const visible = ref<boolean>(false)
const body = reactive<Body>({ mes: "", year: formatDate(DATE, "YYYY"), periodo: "", horarios: [] })
const bodyAgendar = reactive<{ cliente: string | null | number, idServicio: number | null }>({ cliente: null, idServicio: null })

const { data, status, refresh } = useFetch("/api/citas", { query: { estatus: estatusCita }, watch: false })
const { execute } = useFetch("/api/citas", {
    method: "post", body, watch: false, immediate: false, onResponse(res) {
        if (res.response.status == 200) { refresh() }
    }
})
const { data: dataClientes, status: statusClientes } = useFetch("/api/clientes")

const { data: dataHorarios, status: statusHorarios } = useFetch("/api/horarios")

const horariosOptions = computed(() => {
    if (statusHorarios.value === "success") {
        return dataHorarios.value?.map(el => ({ value: el.idHorario, label: `${el.horaInicio}-${el.horaTermino}` }))
    }
    return []
})
const clientesOptions = computed(() => {
    if (statusClientes.value === "success") {
        return dataClientes.value?.map(el => ({ label: el.nombreCompleto, value: el.idCliente }))
    }
    return []
})


const { execute: executeAgendar } = await useAsyncData("agendarCita", () => {
    return $fetch("/api/agendar-cita", {
        method: "post", query: { idCita: selectedItem.value?.idCita },
        body: { cliente: bodyAgendar.cliente, idServicio: bodyAgendar.idServicio },
        onResponse(res) {
            if (res.response.status === 200) {
                visible.value = false
                refresh()
            }
        }
    })
}, { immediate: false })

const cmItems = computed(() => {
    if (selectedItem.value?.estatus === "por_llegar" || selectedItem.value?.estatus === "sala_espera") {
        return [{
            label: "Sin opciones", icon: "mdi:emoticon-sad"
        }]
    }

    return [{
        label: "Agendar cita", icon: "mdi:plus", command() {
            visible.value = true
        }
    }]
})

const filtrarCita = () => {
    refresh()
}
const crearCita = () => {
    execute()
}
const agendarCita = () => {
    executeAgendar()
}
const onRowContextMenu = (event: { originalEvent: Event }) => {
    cm.value?.show(event.originalEvent);
};

</script>
<template>
    <Dialog v-model:visible="visible" ref="modal" modal @hide="() => {
        bodyAgendar.cliente = null
        bodyAgendar.idServicio = null
    }">
        <template #container="{ closeCallback }">

            <div class="modal modal-open">
                <div class="modal-box">

                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        @click="closeCallback">✕</button>

                    <h3 class="text-lg font-bold">Hello!</h3>
                    <form class="grid grid-cols-1 place-items-center gap-4" @submit.prevent="agendarCita">
                        <label class="form-control w-full max-w-xs">
                            <div class="label">
                                <span class="label-text">Cliente</span>
                            </div>
                            <Select v-model="bodyAgendar.cliente"
                                placeholder="Ingresa o selecciona el nombre un cliente" :options="clientesOptions"
                                editable option-value="value" option-label="label" />

                        </label>
                        <label class="form-control w-full max-w-xs">
                            <div class="label">
                                <span class="label-text">Cliente</span>
                            </div>
                            <Select v-model="bodyAgendar.idServicio" filter placeholder="Selecciona un servicio"
                                :options="clientesOptions" option-value="value" option-label="label" />

                        </label>
                        <div class="flex justify-end gap-2 w-full">
                            <button class="btn btn-primary" type="submit"
                                :disabled="bodyAgendar.cliente === null || bodyAgendar.idServicio === null">Enviar</button>
                        </div>

                    </form>
                </div>
            </div>

        </template>
    </Dialog>
    <form @submit.prevent="crearCita">
        Generar citas abiertas
        <div class="flex gap-4">
            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text">Mes</span>
                </div>
                <select class="select select-bordered" v-model="body.mes" required>
                    <option disabled selected value="">Selecciona un mes</option>
                    <option v-for="mes in MESES" :value="mes.id">{{ mes.nombre }}</option>
                </select>
            </label>

            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text">Año</span>
                </div>
                <select class="select select-bordered" v-model="body.year" required>
                    <option disabled selected value="">Selecciona un año</option>
                    <option :value="body.year">{{ body.year }}</option>
                </select>
            </label>
            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text">Rango de tiempo</span>
                </div>
                <select class="select select-bordered" v-model="body.periodo" required>
                    <option disabled selected value="">Selecciona un periodo</option>
                    <option value="semana">Semana (7 días)</option>
                    <option value="quincena">Quincena (15 días)</option>
                    <option value="mes">Mes (30 días)</option>
                </select>
            </label>
            <div class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text">Rango de tiempo</span>
                </div>
                <MultiSelect v-model="body.horarios" :options="horariosOptions" option-label="label"
                    option-value="value" :maxSelectedLabels="3" display="chip" placeholder="Seleccione los horarios" />
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Crear citas</button>

    </form>
    <div class="divider"></div>
    <form @submit.prevent="filtrarCita" class="flex gap-4 items-end justify-end">
        <label class="form-control w-full max-w-xs">
            <div class="label">
                <span class="label-text">Estatus de la citas</span>
            </div>
            <select class="select select-bordered" v-model="estatusCita">
                <option disabled selected value="">Selecciona un estatus</option>
                <option value="todas">Todas las citas</option>
                <option value="abierta">Abiertas</option>
                <option value="por_llegar">Por llegar</option>
                <option value="sala_espera">En sala de espera</option>
            </select>
        </label>
        <button class="btn btn-primary">Filtrar</button>
    </form>

    <ContextMenu ref="cm" :model="cmItems">
        <template #itemicon="{ item }">
            <Icon :name="item.icon ?? ''" />
        </template>
    </ContextMenu>
    {{ estatusCita }}
    <DataTable v-model:contextMenuSelection="selectedItem" :value="data" paginator :rows="5"
        :loading="status === 'pending'" @row-contextmenu="onRowContextMenu" context-menu>
        <Column header="Fecha de la cita" field="fechaCita" sortable />
        <Column header="Horario de la cita" field="horarioCita">
            <template #body="{ data, field }">{{ data[field].horaInicio }} a {{ data[field].horaTermino
            }}</template>
        </Column>
        <Column header="Cliente" field="nombreCliente">
            <template #body="{ data, field }">
                <template v-if="data.estatus === 'abierta'">Sin asignar.</template>
                <template v-else-if="data[field] && !data.clienteCita">{{ data[field] }}</template>
                <template v-else> {{ data.clienteCita.nombreCompleto }}</template>
            </template>
        </Column>
        <Column header="Estatus" field="estatus">
            <template #body="{ data, field }">
                <template v-if="data[field] === 'abierta'">Abierta</template>
                <template v-if="data[field] === 'por_llegar'">Por llegar</template>
                <template v-if="data[field] === 'sala_espera'">En sala de espera</template>
            </template>
        </Column>
        <template #empty>
            <p class=" font-bold">Sin datos.</p>
        </template>

    </DataTable>

</template>
