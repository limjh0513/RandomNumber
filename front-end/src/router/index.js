import Vue from "vue";
import VueRouter from "vue-router";
import SeveralStudents from "../views/SeveralStudents.vue";
import OneStudent from "../views/OneStudent.vue";
import Help from "../views/Help.vue";
import Main from "../views/Main.vue";
import Save from "../views/Save.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/severalStudents",
    name: "SeveralStudents",
    component: SeveralStudents,
  },
  {
    path: "/oneStudent",
    name: "OneStudent",
    component: OneStudent,
  },
  {
    path: "/help",
    name: "Help",
    component: Help,
  },
  {
    path: "/save",
    name: "Save",
    component: Save,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
