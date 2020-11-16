import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from "../views/Main.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue")
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: "/collections",
        name: "Collections",
        component: () => import("../views/Collections.vue")
    },
    {
        path: "/edituniverse",
        name: "EditUniverse",
        component: () => import("../components/display/UniverseDisplay.vue")
    },
    {
        path: "/editworld",
        name: "EditWorld",
        component: () => import("../components/display/WorldDisplay.vue")
    }
];


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/register', '/', '/about'];
    const authRequired = !publicPages.includes(to.path);
    if (authRequired && !store.getters.isAuthenticated) {
        return next('/login');
    }
    next();
});
export default router;
