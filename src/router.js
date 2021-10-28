import { createRouter, createWebHistory } from 'vue-router';
import ThePacks from "./pages/ThePacks";
import TheWolves from "./pages/TheWolves";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/packs'
        },
        { path: '/packs', component: ThePacks },
        { path: '/pack/:id', component: TheWolves },
    ]
});

export default router;