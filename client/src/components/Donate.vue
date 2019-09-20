<template>
  <div>
    <div class="Donating__header">
      <div class="container">
        <div class="row Donating__row-of-header">
          <div class="col-2">
            <router-link to="/page=1" class="Donating__link">
              Dashboard
            </router-link>
          </div>
          <div class="col-2">
            <router-link to="/donate" class="Donating__link">
              Donate {{name}}
            </router-link>
          </div>
        </div>
      </div>
    </div> 
    <div class="container">
      <div class="row Donating__main-row justify-content-center align-items-center">
        <div class="col-6">
          <h1 class="Donating__headline-of-page">Donate</h1>
          <form class="Donating__form">
            <label>
              Name
              <input v-model="name" name="name" type="text" class="Donating__input-name" required>
            </label>
            <label>
              Email
              <input v-model="email" name="email" type="email" class="Donating__input-email" pattern=".+@globex.com" required>
            </label>
            <label>
              Amount
              <input v-model="amount" name="amount" type="text" class="Donating__input-amount" required>
            </label>
            <label>
              Message
              <input v-model="message" name="message" type="text" class="Donating__input-message">
            </label>
            <button @click="postData()" to="/page=1" class="Donating__input-btn">DONATE</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import PostsService from '@/services/PostsService'

  export default {
    data () {
      return {
        name:'',
        email:'',
        amount:'',
        message:''
      }
    },
    methods: {
      postData () {
        const strData = JSON.stringify({ 
          name: this.name,
          email: this.email,
          amount: this.amount,
          message: this.message
        });
        PostsService.postData(strData);
        this.$router.push("/page=1");
      }
    }
  }
</script>

<style scoped>

.Donating__header {
  padding: 10px;
  background-color: #ee6e73;
}

.Donating__row-of-header {
  justify-content: flex-end;
}

.Donating__main-row {
  min-height: calc(100vh - 64px);
}

.Donating__link {
  display: block;
  text-align: center;
  padding: 10px;
  color: white;
}
.Donating__link:hover {
  opacity: .5;
  color: white;
  text-decoration: none;
}

.Donating__headline-of-page {
  font-size: 66px;
  margin-bottom: 28px;
  text-align: center;
}

.Donating__form {
  display: flex;
  flex-direction: column;
}
.Donating__form label {
  font-size: 15px;
  color: gray;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
.Donating__form label input {
  font-size: 18px;
  padding: 10px 0;
  border: none;
  outline: none;
  border-bottom: 1px solid black;
}

.Donating__input-btn {
  border: 0;
  background-color: #2bbbad;
  color: white;
  width: 98px;
  padding: 10px 0;
  border-radius: 6px;
  align-self: center;
  transition: opacity .3s ease;
}
.Donating__input-btn:hover {
  opacity: .7;
}

</style>
