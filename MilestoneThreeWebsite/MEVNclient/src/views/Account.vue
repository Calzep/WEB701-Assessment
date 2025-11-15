<template>
  <div class="account-container">
    <template v-if="user">
      <h2>Your Account Details</h2>
      <div class="form-row">
        <p>Email: {{ user.email }}</p>
      </div>
      <div class="form-row">
        <p>Role: {{ user.role }}</p>
      </div>
      <br />
      <form @submit.prevent="onSubmit">
        <div class="form-row">
          <label>First name</label>
          <input type="text" v-model="firstName" required />
        </div>
        <div class="form-row">
          <label>Last name</label>
          <input type="text" v-model="lastName" required />
        </div>
        <div class="form-row">
          <label>Password (Leave blank to retain current)</label>
          <input type="password" v-model="password" required />
        </div>
        <div class="form-buttons">
          <button class="default-button">Close</button>
          <button class="highlight-button">Update</button>
        </div>
      </form>
      
      <div class="token-balance-container" v-if="user.role === 'beneficiary'">
        <h3>Token Balance</h3>
        <div class="token-balance-row">
          <p>Your tokens: {{ balance }}</p>
          <button class="highlight-button" @click="addTokens">Add 10 Tokens</button>
        </div>
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
    const firstName = ref("");
    const lastName = ref("");
    const password = ref("");

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const payload = JSON.parse(atob(token.split(".")[1]));

        const res = await fetch(`http://localhost:7011/api/user/${payload.id}`, {
          headers: { "Authorization": `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        user.value = data;
        firstName.value = data.firstName;
        lastName.value = data.lastName;
        password.value = "";
        balance.value = data.tokens;
      } catch (err) {
        console.error(err);
      }
    };

    const onSubmit = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:7011/api/user/${user.value.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              firstName: firstName.value,
              lastName: lastName.value,
              password: password.value,
            }),
          }
        );

        if (!res.ok) {
          const msg = await res.json();
          throw new Error(msg.error || "Failed to update user");
        }

        alert("Account details updated!");

      } catch (err) {
        console.error(err);
        alert("Could not update account.");
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

    return { user, balance, firstName, lastName, password, onSubmit, addTokens };
  },
};
</script>

<style scoped>
  .account-container {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  .account-container form {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 20px;
  }

  .form-row {
    display: flex;
    flex-flow: column nowrap;
    width: 300px;
  }

  .form-buttons {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    width: 300px;
    margin: 20px 0;
  }

  .token-balance-container {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    width: 300px;
  }

  .token-balance-row {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;

  }

</style>
