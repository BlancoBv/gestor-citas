<script setup lang="ts">
const body = reactive<{ msg: "" }>({ msg: "" })
const { data, execute } = useFetch("/api/citas",
    { method: "post", watch: false, immediate: false, body })

const send = () => {
    execute()
}
</script>
<template>
    <button class="btn btn-primary" @click="send">evento de servidor</button>
</template>