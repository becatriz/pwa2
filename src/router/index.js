import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import firebase from 'firebase'
import Login from '@/components/Login'
import Home from '@/components/Home'
import CreatePost from '@/components/CreatePost'

Vue.use(Router)



const router = new Router({
  routes: [

  	{
  		path: '*',
  		redirect: '/post'
  	}

    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      
    },

     {
      path: '/post',
      name: 'CreatePost',
      component: CreatePost,
      meta:  {
      	requiresAuth: true,
      },
      
    },

    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta:  {
      	requiresAuth: true,
      },

    },

  ]
})

router.beforeEach((to, from, next) => {
	const auth = firebase.auth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAutenticated = auth.currentUser;
  if (requiresAuth && !isAutenticated) {
    next('/login');
  } else if (!requiresAuth && isAutenticated) {
    next('/home');
  } else {
    next();
  }
});

export default router;
