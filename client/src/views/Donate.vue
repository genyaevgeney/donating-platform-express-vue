<template>
  <div>
    <dashboardHeader></dashboardHeader>
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
import PostsService from "@/services/PostsService";

export default {
  components: {
    dashboardHeader: () => import("@/components/Header.vue")
  },

  data() {
    return {
      name: "",
      email: "",
      amount: "",
      message: ""
    };
  },

  methods: {
    postData() {
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
};
</script>
