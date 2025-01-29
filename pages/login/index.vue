<script setup lang="ts">
const body = reactive<{ user: string, password: string }>({ user: "", password: "" })

const isPending = ref<boolean>(false)
const login = async () => {
    isPending.value = true
    return await $fetch("/api/login", { method: "POST", body }).then(() => {
        isPending.value = false
    })


}
</script>
<template>
    <form @submit.prevent="login">
        usuario
        <input type="text" v-model="body.user" required>
        contraseña
        <input type="text" v-model="body.password" required>
        <button class="btn btn-primary" type="submit" :disabled="isPending">iniciar sesion</button>
    </form>
</template>