import { defineStore } from "pinia";

export const useProductStore = defineStore("product-store", () => {
  const productInput = ref({ name: "", price: 0, color: "", categoryId: null });
  const edit = ref(false);
  function fetchProducts() {
    const { data, refresh: getProducts } = useFetch(
      "/api/admin/product/get",
      {
        headers: {
          Accept: "application/json",
          // Authorization:"Bearer"
        },
      }
    );

    return { data, getProducts };
  }

  return { productInput, edit, fetchProducts };
});
