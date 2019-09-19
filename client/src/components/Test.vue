
<template>
  <div v-if="!posts.length">
    <span>{{msg}}</span>
    <br>
    <span>Post length: {{posts.length}}</span>
  </div>
  <div v-else>
    <p v-for="post in posts">
      <span>{{post.title}}</span>
      <span>{{post.description}}</span>
    </p>
  </div>
</template>

<script>
  import PostsService from '@/services/PostsService'

  export default {
    name: 'Posts',

    data () {
      return {
        msg: 'Welcome to Test Page',
        posts: []
      }
    },

    methods: {
      async getPosts () {
        const {data} = await PostsService.fetchPosts()
        console.log('data', data);
        this.posts = data
      }
    },

    mounted () {
      this.getPosts()
    }
  }
</script>

