<template>
    <div class="form-container">
        <h2>Register a New Service</h2>
        <form @submit.prevent="onSubmit">
            <div class="form-row">
                <label>Service name</label>
                <input type="text" v-model="name" required />
            </div>
            <div class="form-row">
                <label>Description</label>
                <textarea rows="5" type="text" v-model="description" required></textarea>
            </div>
            <!-- <div class="form-row">
                <label>Image (Not yet implemented)</label>
                <button disabled>Choose</button>
            </div> -->
            <div class="multi-row">
                <div class="form-col">
                    <label>Type</label>
                    <select v-model="type">
                        <option value="Food">Food</option>
                        <option value="Shelter">Shelter</option>
                    </select>
                </div>
                <div class="form-col">
                    <label>Token Cost</label>
                    <input type="number" v-model="tokenCost" required/>
                </div>
            </div>
            <br /><br />
            <button class="highlight-button" type="submit">Register Service</button>
        </form>
        <p v-if="error" style="color: red">{{ error }}</p>
    </div>
</template>

<script>
    import auth from "../store/auth"
    export default {
        setup() {},
        data() {
            return {
                name: '',
                description: '',
                type: 'Food',
                tokenCost: 0,
                error: null,
                loading: false
            }
        },
        methods: {
            async onSubmit() {
                this.error = null
                this.loading = true
                try {
                    if (isNaN(this.tokenCost)) throw new Error ("Token cost must be a number")
                    const res = await fetch('http://localhost:7011/api/service', {
                        method: "POST",
                        headers: { 
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${auth.token}`
                        },
                        body: JSON.stringify({
                            name: this.name,
                            description: this.description,
                            image: "",
                            tokenCost: this.tokenCost,
                            registeredBy: auth.user?.id,
                            type: this.type
                        })
                    })
                    const data = await res.json()
                    if (!res.ok) throw new Error (data.error || 'Failed to register service')
                    alert("New service registered")
                } catch (err) {
                    this.error = err.message
                } finally {
                    this.loading = false
                }
            }
        }
    }
</script>

<style>
.form-container {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 20px;
  }

  .form-container form {
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

  .multi-row {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    width: 300px;
  }

  .form-col {
    display: flex;
    flex-flow: column nowrap;
    width: 125px;
  }

</style>