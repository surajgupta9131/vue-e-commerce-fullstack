import { defineStore } from "pinia"

export const useSignUpStore = defineStore('signup-store', () => {
 const registerInput = ref({
  email: "",
  password: "",
});

  return {registerInput }
})