<script setup lang="ts">
definePageMeta({ layout: "panel" })

interface Body { mes: string, year: string, periodo: string, horarios: number[] }

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

const estatusCita = ref<string>("todas")
const body = reactive<Body>({ mes: "", year: moment(DATE, "YYYY"), periodo: "", horarios: [] })

const { data, status, refresh } = useFetch("/api/citas", { query: { estatus: estatusCita }, watch: false })
const { execute } = useFetch("/api/citas", {
    method: "post", body, watch: false, immediate: false, onResponse(res) {
        if (res.response.status == 200) refresh()
    }
})
const { data: dataHorarios, status: statusHorarios } = useFetch("/api/horarios")

const horariosOptions = computed(() => {
    if (statusHorarios.value === "success") {
        return dataHorarios.value?.map(el => ({ value: el.idHorario, label: `${el.horaInicio}-${el.horaTermino}` }))
    }
    return []
})

const filtrarCita = () => {
    refresh()
}

const crearCita = () => {
    execute()
}


</script>
<template>
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
    <DataTable :value="data" paginator :rows="5" :loading="status === 'pending'">
        <Column header="Fecha de la cita" field="fechaCita" />
        <Column header="Horario de la cita" field="horarioCita">
            <template #body="{ data, field }">{{ data[field].horaInicio }} a {{ data[field].horaTermino }}</template>
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