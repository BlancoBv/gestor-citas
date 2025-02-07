<script setup lang="ts">
definePageMeta({ layout: "panel" })
const DATE = new Date(Date.now())
const estatusCita = ref<string>("todas")
const body = reactive<{ mes: string, year: string, periodo: string }>({ mes: "", year: moment(DATE, "YYYY"), periodo: "" })
const { data, status, refresh } = useFetch("/api/citas", { query: { estatus: estatusCita }, watch: false })

const filtrarCita = () => {
    refresh()
}


</script>
<template>
    <form>
        Generar citas abiertas
        <div class="flex gap-4">
            <label class="form-control w-full max-w-xs">
                <div class="label">
                    <span class="label-text">Mes</span>
                </div>
                <select class="select select-bordered" v-model="body.mes" required>
                    <option disabled selected value="">Selecciona un mes</option>
                    <option v-for="mes in meses" :value="mes.id">{{ mes.nombre }}</option>
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
        </div>

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
        <Column header="Hora de la cita" field="horarioCita">
            <template #body="{ data, field }">{{ data[field].horaInicio }} a {{ data[field].horaTermino }}</template>
        </Column>
        <Column header="Cliente" field="cliente">
            <template #body="{ data, field }">
                <template v-if="data[field]">{{ data[field] }}</template>
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