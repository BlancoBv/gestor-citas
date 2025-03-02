<template>
    <NuxtLoadingIndicator />
    <div class="drawer lg:drawer-open">
        <input id="drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col">
            <div class="navbar bg-base-300 w-full">
                <div class="flex-none lg:hidden">
                    <label for="drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block h-6 w-6 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>
                </div>
                <div class="mx-2 flex-1 px-2">Panel de administracion</div>
                <!-- <div class="hidden flex-none lg:block">
                    <ul class="menu menu-horizontal">
                        <li><a>Horarios</a></li>
                    </ul>
                </div> -->
            </div>
            <!-- Page content here -->
            <slot />
        </div>
        <div class="drawer-side">
            <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-base-200 min-h-full w-80 p-4">
                <!-- Sidebar content here -->
                <li>
                    <NuxtLink to="/panel">Inicio</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/panel/citas">Citas</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/panel/en-espera">En espera</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/panel/estadisticas-clientes">Estadisticas de clientes</NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>
<style>
@reference "../assets/app.css";

th[data-pc-section="headercell"] div {
    display: flex;
    gap: 1rem;
}

th[data-p-sortable-column="true"]:hover {

    @apply bg-base-content/10 text-base-content/60 duration-200 ease-in cursor-pointer
}

th[data-p-sorted="true"] {

    @apply bg-secondary text-secondary-content duration-200 ease-in cursor-pointer
}
</style>