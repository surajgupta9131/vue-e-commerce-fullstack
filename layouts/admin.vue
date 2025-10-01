<script setup lang="ts">
import {
  LayoutDashboard,
  Boxes,
  Package,
  CreditCard,
  Users,
  Menu,
  X,
  LogOut,
} from 'lucide-vue-next'
import { userCookieSettings } from '~/utils/user.cookie.settings'

const userCookie = useCookie('user',userCookieSettings)



const drawerOpen = ref(true)
const showMenu = ref(false)

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value
}

const links = ref([
  {
    menu: 'Dashboard',
    icon: LayoutDashboard,
    link: '/admin/dashboard',
  },
  {
    menu: 'Categories',
    icon: Boxes,
    link: '/admin/categories',
  },
  {
    menu: 'Products',
    icon: Package,
    link: '/admin/products',
  },
  {
    menu: 'Payments',
    icon: CreditCard,
    link: '/admin/payments',
  },
  {
    menu: 'Users',
    icon: Users,
    link: '/admin/users',
  },
])

const { $logout } = useNuxtApp()
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar Drawer -->
    <aside
      :class="[
        'bg-white shadow-lg h-full transition-all duration-300 flex flex-col',
        drawerOpen ? 'w-60' : 'w-16',
      ]"
    >
      <div class="flex items-center justify-between px-4 py-3 border-b">
        <span v-if="drawerOpen" class="text-xl font-bold">Dashboard2</span>
        <button
          @click="toggleDrawer"
          class="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring"
        >
          <component :is="drawerOpen ? X : Menu" class="w-6 h-6" />
        </button>
      </div>

      <nav class="flex-1 mt-4 space-y-2">
        <NuxtLink
          v-for="menu in links"
          :key="menu.menu"
          :to="menu.link"
          class="flex items-center gap-4 px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          <component :is="menu.icon" class="w-5 h-5" />
          <span v-if="drawerOpen">{{ menu.menu }}</span>
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <header
        class="bg-white shadow px-6 py-3 flex items-center justify-between"
      >
        <h1 class="text-lg font-semibold">Welcome Back!</h1>
        <div class="relative" @click="showMenu = !showMenu">
          <img
            class="w-10 h-10 rounded-full cursor-pointer ring-2 ring-gray-300"
            src="https://i.pravatar.cc/150?img=3"
            alt="avatar"
          />
          <transition name="fade">
            <div
              v-if="showMenu"
              class="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50"
            >
              <div class="p-4 border-b">
                <p class="font-semibold">
                  {{ userCookie?.data?.user?.name || "Admin User" }}
                  
                </p>
                <p class="text-sm text-gray-600">
                  {{ userCookie?.data?.user?.email || "admin@example.com" }}
                </p>
              </div>
              <ul>
                <li 
                

                
                >
                  <a
                    href="#"
                    class="flex items-center gap-2 text-red-500 px-4 py-2 hover:bg-gray-100"
                  >
                    <LogOut class="w-4 h-4" />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-6">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.router-link-exact-active {
  background-color: rgb(59 130 246); /* Tailwind blue-500 */
  color: white;
  font-weight: 600;
  padding: 0.5rem;
  border-radius: 0.375rem;
}
.router-link-exact-active:hover {
  background-color: rgb(37 99 235); /* Tailwind blue-600 */
}
</style>
