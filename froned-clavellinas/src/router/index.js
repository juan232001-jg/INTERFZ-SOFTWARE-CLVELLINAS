import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [{
        path: '/',
        name: 'login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/homes',
        name: 'Home',
        component: () =>
            import ('../views/Home.vue')
    },
    {
        path: '/estudiantes',
        name: 'Estudiantes',
        component: () =>
            import ('../components/Estudientes.vue')
    },
    {
        path: '/acudientes',
        name: 'Acudientes',
        component: () =>
            import ('../components/Acudientes.vue')
    },
    {
        path: '/anocurso',
        name: 'Anocurso',
        component: () =>
            import ('../components/Anocurso.vue')
    },
    {
        path: '/docentes',
        name: 'Docentes',
        component: () =>
            import ('../components/Docentes.vue')
    },
    {
        path: '/grados',
        name: 'Grados',
        component: () =>
            import ('../components/Grados.vue')
    },
    {
        path: '/materias',
        name: 'Materias',
        component: () =>
            import ('../components/Materias.vue')
    },
    {
        path: '/notas',
        name: 'Notas',
        component: () =>
            import ('../components/Notas.vue')
    },
    {
        path: '/periodos',
        name: 'Periodos',
        component: () =>
            import ('../components/Periodos.vue')
    },
    {
        path: '/sedes',
        name: 'Sedes',
        component: () =>
            import ('../components/Sedes.vue')
    },
    {
        path: '/practica',
        name: 'practica',

        component: () =>
            import ('../components/pratic.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router