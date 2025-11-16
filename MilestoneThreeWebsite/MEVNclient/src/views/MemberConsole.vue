<template>
<div class="console-container">
    <h2>NDR Member Portal</h2>
    <p>Welcome to the NDR member portal.  From here you can register new services and accept pending transactions for beneficiaries</p>
    <div class="buttons">
        <router-link to="register-service"><button class="highlight-button">Register a new service</button></router-link>
        <router-link to="service-purchase"><button class="highlight-button">Manage transactions</button></router-link>
    </div>
    
</div>
</template>

<script>
import { onMounted } from "vue";
import auth from "../store/auth";

export default {
    setup() {
        onMounted(() => {
            if (!auth.isLoggedIn()) {
                alert("Access denied: Members only");
                router.push("/")
                return;
            }

            if (!auth.isMember()) {
                alert("Access denied: Members only");
                router.push("/")
                return;
            }
        });
    }
}

</script>

<style>
    .console-container {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        gap: 50px;
        width: 100%;
        margin: auto;
    }

    .buttons {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        gap: 50px;
        background-color: #2b2b2b;
        width: 100%;
        padding: 50px;
    }

    .buttons button {
        width: 200px;
    }

</style>