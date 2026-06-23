import { defineStore } from "pinia";
import { ref, computed } from "vue";
import request from "../api/request";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(JSON.parse(localStorage.getItem("user") || "null"));
  const isLoggedIn = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.role === "admin");

  async function login(username, password) {
    const res = await request.post("/api/auth/login", { username, password });
    const data = res.data;
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("role", data.data.role);
    user.value = data.data;
    localStorage.setItem("user", JSON.stringify(data.data));
    return data.data;
  }

  async function register(form) {
    const res = await request.post("/api/auth/register", form);
    return res.data;
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    user.value = null;
  }

  return { user, isLoggedIn, isAdmin, login, register, logout };
});