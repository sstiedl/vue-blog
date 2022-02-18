import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'


const getPost = (id) =>{
    const post = ref(null)
    const error = ref(null)

    const load = async () => {
      try {

        let res = await projectFirestore.collection('posts').doc(id).get()
       // console.log(res.data())

       if(!res.exists){
         throw Error('That post doe not eixst')
       }

        post.value = { ...res.data(), id: res.id }
      
        /* 
        let data = await fetch("http://localhost:3000/posts/" + id)
        if (!data.ok) {
          throw Error("no data available");
        }
        post.value = await data.json(); */
      } catch (err) {
        error.value = err.message;
      }
    }
    return{post, error, load}

}

export default getPost



