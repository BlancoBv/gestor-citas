<script setup lang="ts">

const { data, execute } = useFetch("/api/citas?estatus=sala_espera")

</script>
<template>
    <div class="grid grid-cols-3 h-full">
        <div class="flex flex-col items-center col-span-2 p-4">
            <div v-for="cita in data" class="stats shadow w-full">
                <div class="stat place-items-center">
                    <div class="stat-title">Paciente</div>
                    <div class="stat-value">{{ cita.clienteCita.nombreCompleto }}</div>
                    <div class="stat-desc text-secondary">Hora: {{ cita.horarioCita.horaInicio }}</div>
                </div>
                <!--                 <div class="stat place-items-center">
                    <div class="stat-title">Horario</div>
                    <div class="stat-value text-secondary">{{ cita.horarioCita.horaInicio }}</div>
                    <div class="stat-desc text-secondary">↗︎ 40 (2%)</div>
                </div> -->

                <div class="stat place-items-center">
                    <div class="stat-title">Estatus</div>
                    <div class="stat-value">
                        <p v-if="cita.estatus === 'por_llegar'" class="text-warning">Por arribar</p>
                        <p v-else class="text-success">En sala de espera</p>
                    </div>
                    <!-- <div class="stat-desc">↘︎ 90 (14%)</div> -->
                </div>
            </div>

        </div>
        <div class="p-4">
            <div class="stats stats-vertical shadow w-full h-full">
                <div class="stat">
                    <div class="stat-title">Downloads</div>
                    <div class="stat-value">31K</div>
                    <div class="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div class="stat">
                    <div class="stat-title">New Users</div>
                    <div class="stat-value">4,200</div>
                    <div class="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div class="stat">
                    <div class="stat-title">New Registers</div>
                    <div class="stat-value">1,200</div>
                    <div class="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>
        </div>


    </div>

</template>