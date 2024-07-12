<template>
  <v-app  >
      <v-container  >
    <v-layout row  class="ma-6" >

        <v-app class="rounded">
          <v-row>
            <v-col cols="4" md="5" class="ligne">
            <v-container>
              <v-row>

      <v-col cols="5" md="12">
   
          <v-card  class="ma-12 text-center mt-12" shaped elevation="10">
                <v-list-item three-line>
                  <v-list-item-content color="white">
                    <v-list-item-title class="headline mb-1">
                      <v-icon color="teal accent-4">fa-users</v-icon>
                    </v-list-item-title  >
                    <v-list-item-subtitle color="teal acent-4">Registros de estudiantes</v-list-item-subtitle>
                    <v-list-item-subtitle>Acesso directo</v-list-item-subtitle>

                  </v-list-item-content>
                    <v-btn
                      class="mx-1"
                      fab
                      color="teal acent-4"
                      small
                       :to="{ name:'Estudiantes'}"
                      >
                      <v-icon color="white"> fa-share</v-icon>     
                    </v-btn>
                 </v-list-item>
          </v-card>
          <v-card  class="ma-12 text-center mt-12" shaped elevation="10">
                <v-list-item three-line>
                  <v-list-item-content color="white">
                    <v-list-item-title class="headline mb-1">
                      <v-icon color="teal accent-4">fa-list-ol</v-icon>
                    </v-list-item-title  >
                    <v-list-item-subtitle color="teal acent-4">Registros de notas para estudiantes</v-list-item-subtitle>
                    <v-list-item-subtitle>Acesso directo</v-list-item-subtitle>

                  </v-list-item-content>
                    <v-btn
                      class="mx-1"
                      fab
                      color="teal acent-4"
                      small
                      :to="{ name:'Notas'}"
                      >
                      <v-icon color="white"> fa-share</v-icon>     
                    </v-btn>
                 </v-list-item>
          </v-card>
          <v-card  class="ma-12 text-center mt-12" shaped elevation="10">
                <v-list-item three-line>
                  <v-list-item-content color="white">
                    <v-list-item-title class="headline mb-1">
                      <v-icon color="teal accent-4">fa-users</v-icon>
                    </v-list-item-title  >
                    <v-list-item-subtitle color="teal acent-4">Registros de Acudientes</v-list-item-subtitle>
                    <v-list-item-subtitle>Acesso directo</v-list-item-subtitle>

                  </v-list-item-content>
                    <v-btn
                      class="mx-1"
                      fab
                      color="teal acent-4"
                      small
                      :to="{ name:'Acudientes'}"
                      >
                      <v-icon color="white"> fa-share</v-icon>     
                    </v-btn>
                 </v-list-item>
          </v-card>
          <v-card  class="ma-12 text-center mt-12" shaped elevation="10">
                <v-list-item three-line>
                  <v-list-item-content color="white">
                    <v-list-item-title class="headline mb-1">
                      <v-icon color="teal accent-4">fa-address-card</v-icon>
                    </v-list-item-title  >
                    <v-list-item-subtitle color="teal acent-4">Registros de años en curso de estudiantes</v-list-item-subtitle>
                    <v-list-item-subtitle>Acesso directo</v-list-item-subtitle>

                  </v-list-item-content>
                    <v-btn
                      class="mx-1"
                      fab
                      color="teal acent-4"
                      small
                      :to="{ name:'Anocurso'}"
                      >
                      <v-icon color="white" > fa-share</v-icon>     
                    </v-btn>
                 </v-list-item>
          </v-card>
       </v-col>
      <v-col cols="12" md="4">
       
                </v-col>
              </v-row>
               
           </v-container>
            </v-col>
            <v-col cols="12" md="7">
              
        
             <v-container  class="ma-14 text-center mt-3">
               <v-row  >   
                 <v-col cols="15" md="10">
                   <v-card class="layout justify-center" shaped elevation="10">
                <v-avatar class="mt-n7" size="60" elevation="10">
                  <img src="img1.png" />
                </v-avatar>
                <v-card-title class="layout justify-center" >{{this.$store.state.nombre}}</v-card-title>
                <v-card-subtitle class="layout justify-center">{{this.$store.state.apellido}}</v-card-subtitle>
                <v-card-subtitle class="layout justify-center">
                        <v-list-item-action >
                        <v-btn @click="salir" rounded color="teal accent-4" dark><v-icon>fas fa-sign-out-alt</v-icon>Salir</v-btn>
                        </v-list-item-action>
                </v-card-subtitle>
              </v-card>
                   <!-- <v-list-item>
                      <v-list-item-avatar>
            <v-img src="img1.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title >USUARIO</v-list-item-title>
            <br>
            <v-list-item-subtitle>{{this.$store.state.nombre}}{{this.$store.state.apellido}} </v-list-item-subtitle>
          </v-list-item-content>
          </v-list-item> -->
                    <v-list-item-subtitle></v-list-item-subtitle>
            
                   
                   
                 </v-col>
               
                  <v-col  >
                   <v-flex class="ml-16 layout justify-center">
                      <v-row >
                      <div>
                      <v-date-picker
                        color="teal accent-4"
                        v-model="date2"
                        :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
                        :events="functionEvents"
                      ></v-date-picker>
                      </div>
                      </v-row>
                    </v-flex>
                 </v-col>
               </v-row>
            </v-container>
            </v-col>
          </v-row>
         
    
     </v-app>
</v-layout>
      </v-container>   
  </v-app>
</template>

<script>

export default {
   data: () => ({
      counter:0,
      interval:null,
     date2: new Date().toISOString().substring(0, 10),
     colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
        ],
        
      chartOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2016-2019"
        }
      }
  }),
  name: 'App',
  components: {
   
  },
  methods: {
   

    salir(){
       this.$store.dispatch("Token",'')
        this.$store.dispatch("Nombre",'')
        this.$store.dispatch("Apellido",'')
        this.$store.dispatch("Email",'')
        this.$store.dispatch("Usuario",'')
        this.$store.dispatch("Rol",'')
        this.$router.push("/login")
    }
  },
  computed:{
     timerFormated(){
      return `${('0'+parseInt(this.counter/60, 10)).slice(-2)}:${('0'+this.counter % 60).slice(-2)}`;
    },
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
};
</script>
<style scoped>
.col{
  top: 20px;
}
/* .container{
    border-radius:60px;
    background: red;
} */
.container{
    border-radius:60px;
    /* background: red; */
  
}
.rounded{
    border-radius:0px;
    /* background: green; */
}
.ligne{
  /* border-right: solid 1px #95a5a6; */
}
</style>