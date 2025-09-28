
<script setup>
definePageMeta({
    layout:'auth'
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-sm bg-white p-8 rounded-xl shadow">
      <!-- Title -->
      <h2 class="text-center text-2xl font-bold text-gray-900">Sign In</h2>

      <!-- Form -->
      <form  class="mt-6 space-y-4">
        <!-- Email -->
        <div>
          <input
            type="email"
            placeholder="info@gmail.com"
            class="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <input
            type="password"
            placeholder="Password"
            class="w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
        >
         Sign in
        </button>
      </form>

      <!-- Link -->
      <p class="mt-4 text-center text-sm text-gray-500">
        Don’t have an account?
        <NuxtLink to="/auth/signup" class="text-indigo-600 hover:underline">
          Sign up
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
