<template>
  <div class="account-container">
    <template v-if="user">
      <h2>Account</h2>
      <p>Email: {{ user.email }}</p>
      <p>First name: {{ user.firstName }}</p>
      <p>Last name: {{ user.lastName }}</p>
      <p>Role: {{ user.role }}</p>

      <div v-if="user.role === 'beneficiary'">
        <p>Token balance: {{ balance }}</p>
        <button @click="addTokens">Add 10 Tokens</button>
      </div>
    </template>

    <template v-else>
      <p>Please log in to view your account.</p>
    </template>
  </div>
</template>


<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const user = ref(null);
    const balance = ref(0);

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const payload = JSON.parse(atob(token.split(".")[1]));
        user.value = payload;

        const res = await fetch(`http://localhost:7011/api/user/${payload.id}`, {
          headers: { "Authorization": `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        balance.value = data.tokens;
      } catch (err) {
        console.error(err);
      }
    };

    const addTokens = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:7011/api/user/add-tokens`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: 10 }),
        });
        if (!res.ok) throw new Error("Failed to add tokens");
        const data = await res.json();
        balance.value = data.tokens;
      } catch (err) {
        console.error(err);
      }
    };

    onMounted(() => {
      fetchUser();
    });

    return { user, balance, addTokens };
  },
};
</script>

<style scoped>
.account-container {
  padding: 1rem;
}
</style>
