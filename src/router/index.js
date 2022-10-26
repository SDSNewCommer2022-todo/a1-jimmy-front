import Vue from 'vue';
import VueRouter from 'vue-router';
import NameView from '@/views/NameView';
import TodoView from '@/views/TodoView';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'name',
    component: NameView,
  },
  {
    path: '/todo',
    name: 'todo',

    component: TodoView
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
