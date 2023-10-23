import { defineStore } from "pinia";
import "@/store";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);

  const double = computed(() => {
    return count.value * 10;
  });

  function increment() {
    count.value++;
  }

  return { count, double, increment };
});
