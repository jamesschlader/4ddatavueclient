import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Main from "../views/Main.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Main
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue")
    },
    {
        path: "/collections",
        name: "Collections",
        children: [
            {
                path: "/getuseruniverses",
                name: "GetUniverses",
                component: () => import("../components/getData/GetUniverses.vue")
            },
            {
                path: "/edituniverse",
                name: "BuildDataCollection",
                component: () => import("../components/display/UniverseDisplay.vue")
            },
            {
                path: "/editworld",
                name: "DisplayWorld",
                component: () => import("../components/display/WorldDisplay.vue")
            }
        ],
        component: () => import("../views/Collections.vue")
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
