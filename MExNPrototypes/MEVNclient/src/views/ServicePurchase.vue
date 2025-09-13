<template>
  <div class="service-purchase-container">
    <h2>Service Purchases</h2>

    <div v-if="purchases.length === 0">
      <p>No purchases available.</p>
    </div>

    <table v-else class="service-purchase-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Service</th>
          <th>Token Cost</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in purchases" :key="p._id">
          <td>{{ p.user.email }}</td>
          <td>{{ p.service.name }}</td>
          <td>{{ p.temporalTokenCost }}</td>
          <td>{{ p.status }}</td>
          <td>
            <button v-if="p.status !== 'approved'" @click="approvePurchase(p._id)">
              Approve
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const purchases = ref([]);

    const fetchPurchases = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:7011/api/service-purchases", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch purchases");
        purchases.value = await res.json();
      } catch (err) {
        console.error(err);
      }
    };

    const approvePurchase = async (id) => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:7011/api/service-purchase/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "approved" }),
        });
        if (!res.ok) throw new Error("Failed to approve purchase");
        await fetchPurchases(); // refresh the list
      } catch (err) {
        console.error(err);
      }
    };

    onMounted(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Access denied: Members only");
        window.location.href = "/";
        return;
      }

      // Decode token to check role
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role !== "member") {
        alert("Access denied: Members only");
        window.location.href = "/";
        return;
      }

      fetchPurchases();
    });

    return { purchases, approvePurchase };
  },
};
</script>

<style scoped>
.service-purchase-table {
  border-collapse: collapse;
  width: 100%;
}
.service-purchase-table th,
.service-purchase-table td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}
</style>
