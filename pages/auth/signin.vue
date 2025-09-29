<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useRouter } from "vue-router";

const router = useRouter();
const registerInput = ref({
  email: "",
  password: "",
});

const userCookie = useCookie("user", {
  maxAge: 60 * 60 * 24 * 7,
});

definePageMeta({
  layout: "auth",
});

const rules = {
  email: { required, email }, // Matches state.firstName
  password: { required }, // Matches state.lastName
};

const loading = ref(false);
const v$ = useVuelidate(rules, registerInput);
async function submitInput() {
  const isValid = v$.value.$validate();
  if (!isValid) {
    return;
  }

  loading.value = true;
  try {
    const res = await $fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(registerInput.value),
    });

    loading.value = false;
    userCookie.value=res
    router.push('/admin/dashboard')
    successMsg(res.message.message);

    // router.push("/auth/email-verification");
  } catch (err) {
    loading.value = false;
    showLoginOrSignupError(err);
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-sm bg-white p-8 rounded-xl shadow">
      <!-- Title -->
      <h2 class="text-center text-2xl font-bold text-gray-900">Sign In</h2>
      <!-- Form -->
      <form class="mt-6 space-y-4">
        <!-- Email -->
        <FormError :errors="v$.email.$errors">
          <BaseInput
            v-model="registerInput.email"
            :type="'text'"
            :placeholder="'Enter user name '"
          />
        </FormError>
        <!-- Password -->
        <FormError :errors="v$.password.$errors">
          <BaseInput
            v-model="registerInput.password"
            :type="'password'"
            :placeholder="'Enter password '"
          />
        </FormError>
        <!-- Button -->
        <BaseBtn :loading="loading" :label="'Signin'" @click="submitInput" />
      </form>

      <!-- Link -->
      <p class="mt-4 text-center text-sm text-gray-500">
        Don't have an account?
        <NuxtLink to="/auth/signup" class="text-indigo-600 hover:underline">
          Sign up
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
