<script setup lang="ts">
const { data } = useFetch("/api/servicios")
</script>
<template>
    <main class="prose max-w-full p-0">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:h-[500px]">
            <div class="h-96 flex flex-col items-center justify-center">
                <div class="p-4">
                    <h1>Bienvenido a nombre de la marca</h1>
                    <p>Nombre de la marca se especializa en Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vivamus
                        elementum nisl egestas, fermentum
                        diam
                    </p>
                </div>
                <NuxtLink to="/horarios" class="not-prose btn btn-primary btn-block">Revisar horarios disponibles
                </NuxtLink>
            </div>
            <div class="col-span-2">
                <img src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                    class="not-prose size-full" />
            </div>
        </div>
        <div class="bg-base-200 text-secondary-content p-4">
            <h1>Te ofrecemos:</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center not-prose text-base-content">
                <div v-for="servicio, index in data"
                    v-animateonscroll="{ enterClass: index % 2 === 0 ? 'animate-fade-right' : 'animate-fade-left animate-delay-200' }"
                    class="card bg-base-100 w-full shadow-xl ">
                    <figure>
                        <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">
                            {{ servicio.nombre }}
                            <!-- <div class="badge badge-secondary">NEW</div> -->
                        </h2>
                        <p>{{ servicio.descripcion }}</p>
                        <!--                         <div class="card-actions justify-end">
                            <div class="badge badge-outline">Fashion</div>
                            <div class="badge badge-outline">Products</div>
                        </div> -->
                    </div>
                </div>
                <div v-animateonscroll="{ enterClass: 'animate-fade-right' }"
                    class="card bg-base-100 w-full shadow-xl ">
                    <figure>
                        <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">
                            Shoes!
                            <!-- <div class="badge badge-secondary">NEW</div> -->
                        </h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <!--                         <div class="card-actions justify-end">
                            <div class="badge badge-outline">Fashion</div>
                            <div class="badge badge-outline">Products</div>
                        </div> -->
                    </div>
                </div>
                <div v-animateonscroll="{ enterClass: 'animate-fade-left animate-delay-200' }"
                    class="card bg-base-100 w-full shadow-xl ">
                    <figure>
                        <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">
                            Shoes!
                            <!-- <div class="badge badge-secondary">NEW</div> -->
                        </h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <!--                         <div class="card-actions justify-end">
                            <div class="badge badge-outline">Fashion</div>
                            <div class="badge badge-outline">Products</div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>

    </main>
</template>
