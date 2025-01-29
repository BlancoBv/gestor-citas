<script setup lang="ts">
import { NuxtLoadingIndicator } from '#components';

const body = reactive<{ user: string, password: string }>({ user: "", password: "" })
const isPending = ref<boolean>(false)
const error = ref<string>()

const { execute, status } = useFetch("/api/login", { method: "POST", immediate: false, body: body, watch: false })

const login = async () => {
    execute()
    /*   isPending.value = true
      await $fetch("/api/login", { method: "POST", body })
          .then(async () => {
              await navigateTo("/panel")
          })
          .catch((err) => { error.value = err })
          .finally(() => { isPending.value = false })
  
   */


}
</script>
<template>
    <NuxtLoadingIndicator></NuxtLoadingIndicator>
    <form @submit.prevent="login">
        usuario
        <input type="text" v-model="body.user" required>
        contraseña
        <input type="text" v-model="body.password" required>
        <button class="btn btn-primary" type="submit" :disabled="status === 'pending' || status === 'success'">iniciar
            sesion</button>
    </form>
    {{ isPending }}{{ error }}
</template>