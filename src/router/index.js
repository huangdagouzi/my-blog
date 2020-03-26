import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/home.vue";
const Index = () => import("@/views/index");
const Blog = () => import("@/views/blog");
const Album = () => import("@/views/album");

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      children: [{ path: "/", name: "Index", component: Index },{ path: "/blog", name: "Blog", component: Blog },{ path: "/album", name: "Album", component: Album }]
    }
  ]
});
