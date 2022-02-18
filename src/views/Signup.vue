<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>

    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required />

    <label for="email">Password:</label>
    <input type="password" name="password" v-model="password" required />

    <button>Sign up</button>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router'

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref(null)

    const store = useStore();
    const router = useRouter()

    const handleSubmit = async () => {
      try {
        await store.dispatch("singup", {
          email: email.value,
          password: password.value,
        })
        router.push('/')
      } catch (err) {
        error.value = err.message
      }
    };

    return { handleSubmit, email, password, error };
  },
};
</script>

<style scoped>
body {
  background-color: gray;
}
form {
  max-width: 480px;
  margin: 0 auto;
  text-align: left;
}
input,
textarea {
  display: block;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid rgb(204, 204, 204);
}
textarea {
  height: 20vh;
}
label {
  margin: 10px;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 261rem;
  font-weight: bold;
  color: black;
  height: 30px;
  margin-bottom: 10px;
  max-width: 300px;
  background-color: #fdfd96;
  border: 2px solid #111;
  box-sizing: border-box;
  font-size: 16px;
  padding: 0 25px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
}

button {
  margin-top: 5px;
  align-items: center;
  background-color: teal;
  border: 2px solid #111;
  box-sizing: border-box;
  color: white;
  display: flex;
  font-size: 0.9rem;
  height: 48px;
  justify-content: center;
  line-height: 24px;
  max-width: 100%;
  padding: 0 25px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
}

button::after {
  background-color: #111;
  content: "";
  display: block;
  height: 48px;
  left: 0;
  width: 100%;
  position: absolute;
  top: -2px;
  z-index: -1;
  transition: 0.3s;
}

button:hover:after {
  transform: translate(8px, 8px);
  transition: 0.3s;
}
</style>