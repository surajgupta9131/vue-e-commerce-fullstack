import { defineStore } from "pinia"

export const useSignUpStore = defineStore('signup-store', () => {
 const registerInput = ref({
  name:'',
  email: "",
  password: "",
});

  return {registerInput }
})