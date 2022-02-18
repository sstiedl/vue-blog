<template>
  <div id="nav">
    <Navbar />
    
  </div>
  <router-view/>
</template>


<script>
import Navbar from '../src/components/Navbar.vue'

export default {
  components: { Navbar }

}

</script>


<style>

 body{
        background-color: #fee6e3
    }

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
  color: #2c3e50;
}

a{
  text-decoration: none;
}

@media screen {
  
}



</style>
