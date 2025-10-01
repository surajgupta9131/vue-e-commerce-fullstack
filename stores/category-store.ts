import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category-store", () => {
  const categoryInput = ref({ id: null, name: "" });
  const edit = ref(false);

  function fetchCategories() {
    console.log("hello")
    const { data, refresh: getCategories } = useFetch(
      "/api/admin/category/get-categories",
      {
        headers: {
          Accept: "application/json",
          // Authorization:"Bearer"
        },
      }
    );

    return { data, getCategories };
  }

  return { categoryInput, edit, fetchCategories };
});
