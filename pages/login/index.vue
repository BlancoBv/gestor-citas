<script setup lang="ts">
const body = reactive<{ user: string, password: string }>({ user: "", password: "" })

const { execute, status } = useFetch("/api/login", {
    method: "POST", immediate: false, body: body, watch: false, onResponse: async (res) => {

        if (res.response.status === 200) {
            await navigateTo("/panel", { replace: true })
        }
    }
})

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
    <div class="hero bg-base-200 min-h-screen">
        <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold">Login now!</h1>
                <p class="py-6">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                    quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
            </div>
            <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form class="card-body" @submit.prevent="login">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Usuario</span>
                        </label>
                        <input v-model="body.user" type="text" placeholder="invitado" class="input input-bordered" required />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input v-model="body.password" type="password" placeholder="password" class="input input-bordered" required />
                    </div>
                        <button type="submit" class="btn btn-primary" :disabled="status==='pending' ||status==='success'">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>