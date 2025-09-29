<script setup>
import { ref } from "vue";
import VOtpInput from "vue3-otp-input";
import { useRouter } from "vue-router";
import { useSignUpStore } from "~/stores/signup-store";
import { storeToRefs } from "pinia";

const otpInput = ref(null);
const otp = ref("");
const loading = ref(false);
const router = useRouter();
const signUpStore = useSignUpStore();
const {registerInput}= storeToRefs(signUpStore)


const handleOnComplete = (value) => {
  console.log("OTP completed: ", value);
  otp.value = value;
  // Add your submission logic here
};

const handleOnChange = (value) => {
  console.log("OTP changed: ", value);
  otp.value = value;
};

const clearInput = () => {
  otpInput.value?.clearInput();
  otp.value = "";
};

const focusInput = () => {
  otpInput.value?.focusInput(0);
};

const submitOtp = async () => {
  if (otp.value.length === 6) {
    console.log("Submitting OTP:", otp.value);
    loading.value = true;
    try {
      const res = await $fetch("/api/auth/email-verification", {
        method: "POST",
        body: JSON.stringify({
          email: registerInput?.value?.email,
          otpCode: otp.value,
        }),
      });
      loading.value = false;
      successMsg(res.message);
      router.push("/auth/signin");
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
};
</script>

<template>
  <div class="flex flex-col items-center w-full max-w-sm mx-auto space-y-8 p-6">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">
        Enter Verification Code
      </h2>
      <p class="text-gray-600">We've sent a 4-digit code to your device</p>
    </div>

    <div class="w-full">
      <VOtpInput
        ref="otpInput"
        input-classes="otp-input"
        separator="-"
        :num-inputs="6"
        :should-auto-focus="true"
        :is-input-num="true"
        :placeholder="['*', '*', '*', '*', '*', '*']"
        @on-change="handleOnChange"
        @on-complete="handleOnComplete"
      />
    </div>

    <div class="flex flex-col w-full space-y-4">
      <button
        type="button"
        class="w-full px-4 py-3 text-base font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
        @click="submitOtp"
        :disabled="otp.length !== 6"
      >
        Verify Code
      </button>

      <div class="flex gap-3">
        <button
          type="button"
          class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          @click="clearInput"
        >
          Clear
        </button>
        <button
          type="button"
          class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          @click="focusInput"
        >
          Refocus
        </button>
      </div>
    </div>

    <div class="text-center">
      <button
        class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
      >
        Didn't receive code? Resend
      </button>
    </div>
  </div>
</template>

<style>
.otp-input {
  @apply w-14 h-14 mx-2 text-xl font-semibold text-center border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200 bg-white shadow-sm;
}

.otp-input.is-complete {
  @apply bg-blue-50 border-blue-500 shadow-md;
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.otp-input::placeholder {
  @apply text-lg font-semibold text-gray-400;
}
</style>
