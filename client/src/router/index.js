import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/views/Dashboard";
import Donate from "@/views/Donate";
import Error from "@/views/Error";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/page=:id",
      name: "Dashboard",
      component: Dashboard,
      props: true
    },
    {
      path: "/donate",
      name: "Donate",
      component: Donate
    },
    {
      path: "*",
      component: Error
    }
  ]
});
