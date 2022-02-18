<template>
  <div class="post">
    <router-link :to="{ name: 'Details', params: { id: post.id } }">
      <h3>
        {{ post.title }}
      </h3>
    </router-link>

    <p>
      {{ snippet }}
    </p>
    <span v-for="tag in post.tags" :key="tag">
      <router-link :to="{ name: 'Tag', params:{tag: tag}}" class="pill"> #{{ tag }} </router-link></span>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: ["post"],
  setup(props) {
    const snippet = computed(() => {
      return props.post.body.substring(0, 100) + "...";
    });
    return { snippet };
  },
};
</script>

<style scoped>
.post {
  margin: 0 40px 30px;
  padding-bottom: 30px;
  border-bottom: 1px dashed #e7e7e7;
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
  padding: 0 25px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
}


.post h3::after {
  background-color: #111;
  content: "";
  display: block;
  height: 30px;
  left: 0;
  width: 100%;
  position: absolute;
  top: -2px;
  transition-duration: 0.5s;
  z-index: -1;
  color: black;
}

.post h3:hover:after {
  transform: translate(8px, 8px);
  transition-duration: 0.5s;
}

  .post p {
    color: #444;
    line-height: 1.5em;
    margin-top: 40px;
    font-size:1rem;
    width: 100%
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
  height: 15px
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


</style>

