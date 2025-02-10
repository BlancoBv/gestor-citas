<template>
    <NuxtLoadingIndicator />
    <div class="drawer">
        <input id="drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content w-screen h-screen">
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
                <div class="mx-2 flex-1 px-2">Nombre de la marca</div>
                <div class="hidden flex-none lg:block">
                    <ul class="menu menu-horizontal">
                        <li>
                            <NuxtLink to="/horarios">Horarios</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
            <slot />
        </div>
        <div class="drawer-side z-50">
            <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-base-200 min-h-full w-80 p-4">
                <!-- Sidebar content here -->
                <li>
                    <NuxtLink to="/horarios">Horarios</NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>
<style>
main {
    @apply p-4
}
</style>