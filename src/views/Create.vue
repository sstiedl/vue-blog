<template>
  <div class="create">
    <form @submit.prevent="handleSubmit">
      <label>Title:</label>
      <input v-model="title" type="text" required />
      <label>Content:</label>
      <textarea required v-model="body"></textarea>
      <label>Tags:(hit enter to add a tag)</label>
      <input type="text" v-model="tag" @keydown.enter.prevent="handleKeydown" />
      <div v-for="tag in tags" :key="tag" class="pill">#{{ tag }}</div>
      <button>Add Post</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { db } from '../firebase/config';
import { addDoc, collection, serverTimestamp} from 'firebase/firestore'

export default {
  setup() {
    const title = ref("");
    const body = ref("");
    const tag = ref("");
    const tags = ref([]);

    const router = useRouter();

    const handleKeydown = () => {
      if (!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/\s/, ""); // removes all whitespace
        tags.value.push(tag.value);
      }
      tag.value = "";
    };

     const handleSubmit = async () => {
     let post = {
        title: title.value,
        body: body.value,
        tags: tags.value,
        createdAt: serverTimestamp()
       

      }
    const colRef = collection(db,'posts')
      await addDoc(colRef, post)

      /* await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
 */
     router.push({ name: "Home" });
    };

    return { title, body, tag, tags, handleKeydown, handleSubmit };
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

.pill {
  display: inline-block;
  margin: 10px 10px 0 0;
  color: white;
  background: teal;
  padding: 8px;
  border-radius: 20px;
  border: 2px solid #111;
  font-size: 14px;
}
</style>



}
