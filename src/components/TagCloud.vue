<template>
  <div class="tag-cloud">
    <h3>Tags</h3>
    <div v-for="tag in tags" :key="tag">
      <router-link :to="{ name: 'Tag', params: { tag: tag } }" class="pill"
        >#{{ tag }}</router-link
      >
    </div>
  </div>
</template>

<script>
import useTags from "../composables/useTags";

export default {
  props: ["posts"],
  setup(props) {
    const { tags } = useTags(props.posts);

    return { tags };
  },
};
</script>

<style scoped>
.tag-cloud {
  padding: 10px;
}

.tag-cloud div {
  display: inline-block;
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
  font-size: 14px;
  height: 15px;
}

.pill::after {
  background-color: #111;
  content: "";
  display: inline-block;
  height: 100%;
  left: 0;
  width: 100%;
  position: absolute;
  top: -2px;
  z-index: -1;
  color: black;
  transition: 0.3s;
  border-radius: 20px;
}

.pill:hover:after {
  transform: translate(8px, 8px);
  transition: 0.3s;
}
.tag-cloud a.router-link-active {
  background-color: #ffb347;
  font-weight: bold;
}
</style>