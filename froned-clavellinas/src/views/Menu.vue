
<template >
 <div >

 <v-divider>

</v-divider>
      <v-main>
      <router-view /> 
      </v-main>

<template  v-if="this.$store.state.rol=='ADMIN_ROL'||this.$store.state.rol=='DOCENTE_ROL'">
      <v-navigation-drawer
        app
        permanent
        width="320"
        expand-on-hover
        navigation dark 
        class="teal accent-4"
       
       >
      
         <v-layout column align-center>
               <v-flex class="mt-10 mb-8"> 
                    <v-avatar >
                            <img src="escudo1.jpg">
                    <v-icon large></v-icon>
                    </v-avatar>
                    <br>
                    
                      <v-list-item-subtitle>{{this.$store.state.usuario}} </v-list-item-subtitle>
                       <v-list-item-subtitle>{{this.$store.state.rol}} </v-list-item-subtitle>
               </v-flex>
          </v-layout>

        <v-divider>

        </v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item :to="{ name:'Home'}">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>
      

          <v-list-group >
          <v-list-item slot="activator" >
            <v-list-item-icon >
              <v-icon>  fa-user-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Registros Para Estudiantes</v-list-item-title>
          </v-list-item>
         <v-list-item class="teal accent-3" :to="{ name:'Estudiantes'}">
            <v-list-item-icon>
              <v-icon>fa-users</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Estudiantes</v-list-item-title>
          </v-list-item>
          <v-list-item class="teal accent-3" :to="{ name:'Notas'}">
            <v-list-item-icon>
              <v-icon> fa-list-ol</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Notas</v-list-item-title>
          </v-list-item> 
             <v-list-item class="teal accent-3" :to="{ name:'Anocurso'}">
            <v-list-item-icon>
              <v-icon>fa-list-alt</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Año cursado</v-list-item-title>
          </v-list-item> 
        </v-list-group>

           <v-list-item  :to="{ name:'Acudientes'}">
            <v-list-item-icon>
              <v-icon> fa-users</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Acudientes</v-list-item-title>
          </v-list-item>
         <template v-if="this.$store.state.rol=='ADMIN_ROL'">
            <v-list-item :to="{ name:'Docentes'}">
            <v-list-item-icon>
              <v-icon> fa-user-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Docentes</v-list-item-title>
          </v-list-item>    
          </template >
          <template v-if="this.$store.state.rol=='ADMIN_ROL'">
            <v-list-group >
            <v-list-item slot="activator">
            <v-list-item-icon>
              <v-icon> fa-plus-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Registros Academicos </v-list-item-title>
          </v-list-item>
          <v-list-item class="teal accent-3"  :to="{ name:'Periodos'}">
            <v-list-item-icon>
              <v-icon>fa-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Periodos</v-list-item-title>
          </v-list-item>
                <v-list-item  class="teal accent-3" :to="{ name:'Sedes'}">
            <v-list-item-icon>
              <v-icon>mdi-home-city</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sedes</v-list-item-title>
          </v-list-item>

            <v-list-item class="teal accent-3"  :to="{ name:'Materias'}">
            <v-list-item-icon>
              <v-icon>mdi-book-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Materias</v-list-item-title>
          </v-list-item>
          <v-list-item class="teal accent-3"  :to="{ name:'Grados'}">
            <v-list-item-icon>
              <v-icon>fa-graduation-cap</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Grados</v-list-item-title>
          </v-list-item>
     </v-list-group>
      </template>
        </v-list>
     
   </v-navigation-drawer>   
 </template>

 
    
 
</div>

</template>

<script>
  export default {
    data() {
     
      return {
        usurio:this.$store.state.email,       
        estado:'',
      Nombre:this.$store.state.nombre
      }
    },
     created() {
            this.crearnombre()
        },
    methods: {
      crearnombre(){
this.Nombre=this.$store.state.nombre
this.usurio=this.$store.state.email
      },
 salir(){
       this.$store.dispatch("setToken",'');    
       this.$store.dispatch("Nombre",'');
       this.$store.dispatch("usuario",'');
       this.$store.dispatch("rol",'');
       this.$router.push("/login")
    },
  
    }
   
    //
  }
</script>