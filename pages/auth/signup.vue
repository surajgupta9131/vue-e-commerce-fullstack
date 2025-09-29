<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useRouter } from 'vue-router';
import {useSignUpStore} from "./../../stores/signup-store"

const router = useRouter();
const signUpStore = useSignUpStore();
const{registerInput}= storeToRefs(signUpStore)

definePageMeta({
  layout: "auth",
});

const rules = {
  name:{required},
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
    const res = await $fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(registerInput.value),
    });

    loading.value = false;
    successMsg(res.message.message);
    router.push("/auth/email-verification");
  } catch (err) {
    loading.value = false;
    const errorMessage =
      err?.data?.message || // custom error message from backend
      err?.statusMessage || // status text like "Bad Request"
      err?.message || // general error message
      "An unknown error occurred."; // fallback

    console.error("Error:", errorMessage);
    showError(errorMessage);
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-sm bg-white p-8 rounded-xl shadow">
      <!-- Title -->
      <h2 class="text-center text-2xl font-bold text-gray-900">Sign up</h2>
      <!-- Form -->
      <form class="mt-6 space-y-4">
         <!-- Name -->
        <FormError :errors="v$.name.$errors">
          <BaseInput
            v-model="registerInput.name"
            :type="'text'"
            :placeholder="''"
          />
        </FormError>
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
        <BaseBtn :loading="loading" :label="'Signup'" @click="submitInput" />
      </form>

      <!-- Link -->
      <p class="mt-4 text-center text-sm text-gray-500">
        Already have an account?
        <NuxtLink to="/auth/signin" class="text-indigo-600 hover:underline">
          Sign in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
