<template>
  <div class="home">
    

    <div v-if="error">{{ error }}</div>
    <div v-if="posts.length" class="layout">
      <PostList :posts="posts" />
      <TagCloud :posts="posts" />
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import PostList from "../components/PostList.vue";
import TagCloud from "../components/TagCloud.vue";

import Spinner from "../components/Spinner.vue";

import { db } from "../firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default {
  name: "Home",
  components: { PostList, TagCloud, Spinner },
  setup() {
    const posts = ref([]);
    const error = ref('');
    const colRef = collection(db, "posts");
    const q = query(colRef, orderBy('createdAt','desc'))
    

    getDocs(q)
      .then((snapshot) => {
        let docs = [];
        snapshot.docs.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        posts.value = docs
        
      })
      .catch((err) => {
        error.value = err.message
      });



  


 
   
    return { posts, error };
  },
};
</script>
<style>
.home {
  width: 80%;
  margin: 0 auto;
  padding: 10px;
}
.layout {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
}

@media screen and (max-width: 1023px){
   .layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  } 
}


</style>

