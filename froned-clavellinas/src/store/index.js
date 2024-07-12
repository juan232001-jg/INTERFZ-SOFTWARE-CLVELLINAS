import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: "",
        nombre: "",
        apellido: "",
        email: "",
        usuario: "",
        rol: "",
        aceso: ""
    },
    mutations: {
        Token(state, value) {
            state.token = value
        },
        Nombre(state, value) {
            state.nombre = value
        },
        Apellido(state, value) {
            state.apellido = value
        },
        Email(state, value) {
            state.email = value
        },
        Usuario(state, value) {
            state.usuario = value
        },
        Rol(state, value) {
            state.rol = value
        },
        Aceso(state, value) {
            state.aceso = value
        },
    },
    actions: {
        Token(context, value) {
            context.commit("Token", value)
        },
        Nombre(context, value) {
            context.commit("Nombre", value)
        },
        Apellido(context, value) {
            context.commit("Apellido", value)
        },
        Email(context, value) {
            context.commit("Email", value)
        },
        Usuario(context, value) {
            context.commit("Usuario", value)
        },
        Rol(context, value) {
            context.commit("Rol", value)
        },
        Aceso(context, value) {
            context.commit("Aceso", value)
        },
    },
    modules: {}
})