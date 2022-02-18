<template>
  <div class="tag">
    <div v-if="error">{{ error }}</div>
    <div v-if="posts.length" class="layout">
      <PostList :posts="postsWithTag" />
      <TagCloud :posts="posts" />
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>



<script>
import PostList from "../components/PostList.vue";
import TagCloud from "../components/TagCloud.vue";
import getPosts from "../composables/getPosts";
import Spinner from "../components/Spinner.vue";
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";

export default {
  components: { Spinner, PostList, TagCloud },
  setup() {
    const route = useRoute();

    const { posts, error, load } = getPosts();

    load();

    const postsWithTag = computed(() => {
      return posts.value.filter(p => p.tags.includes(route.params.tag))
      })

    return { posts, error, postsWithTag, route }
  },
};
</script>




<style scoped>

.tag {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
  }

.pill {
  display: inline-block;
  margin: 10px 10px 0 0;
  color: teal;
  font-style: italic;
  padding: 8px;
 
}

  .layout {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 20px;
  }

   @media screen and (max-width: 767px) {
    .layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
   }
</style>