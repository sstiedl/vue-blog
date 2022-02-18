<template>
 <!--  <div v-if="error">
    {{ error }}
  </div> -->
  <div v-if="post" class="post">
    <h3>
      {{ post.title }}
    </h3>
    <p class="pre">
      {{ post.body }}
    </p>
    <span v-for="tag in post.tags" :key="tag">
      <router-link :to="{ name: 'Tag', params: { tag: tag } }" class="pill">
        #{{ tag }}
      </router-link></span
    >
    <br /><button @click="handleDelete" v-if="user">Delete post</button>
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import Spinner from "../components/Spinner.vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "../firebase/config";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import TagCloud from "../components/TagCloud.vue";
import { useStore } from 'vuex'

export default {
  props: ["id"],
  components: { Spinner, TagCloud },
  setup(props) {
    const post = ref(null);
    const error = ref("");
    const route = useRoute();
    const router = useRouter();
    const docRef = doc(db, "posts", route.params.id);
    const store = useStore()

  


    getDoc(docRef).then(doc =>{
     post.value = doc.data()
   }).catch((err) => {
        error.value = err.message
      });
  




    const handleDelete = () => {
      deleteDoc(docRef)
      router.push({ name: "Home"})
    };

    return { post, error, handleDelete, user:computed(()=> store.state.user) };
  },
};

</script>

<style scoped>
.tags a {
  margin-right: 10px;
}
.post {
  width: 80%;
  margin: auto;
}

.post h3 {
  display: flex;
  align-items: center;
  position: relative;
  font-size: 1rem;
  color: black;
  height: 30px;
  margin: 10px;
  max-width: 400px;
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

.post p {
  color: #444;
  line-height: 1.5em;
  margin-top: 40px;
  font-size: 1rem;
  width: 100%;
}
.pre {
  white-space: pre-wrap;
  width: 80vh;
}

.pill {
  position: relative;
  display: inline-block;
  margin: 10px 10px 0 0;
  color: white;
  background: teal;
  padding: 8px;
  border-radius: 20px;
  border: 2px solid #111;
  font-size: 0.9rem;
  height: 15px;
}

.pill::after {
  background-color: #111;
  content: "";
  display: block;
  height: 100%;
  left: 0;
  width: 100%;
  position: absolute;
  top: -2px;
  z-index: -1;
  transition: 0.3s;
  border-radius: 20px;
}

.pill:hover:after {
  transform: translate(8px, 8px);
  transition: 0.3s;
}

button {
  margin-top: 5px;
  align-items: center;
  background-color: #ff5a51;
  border: 2px solid #111;
  box-sizing: border-box;
  color: white;
  display: flex;
  font-size: 0.9rem;
  height: 35px;
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
  height: 35px;
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

@media screen and (max-width: 767px) {
  .layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>