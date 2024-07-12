<template >
  <v-app id="inspire">
    <v-main >
      <v-container  class="fill-height" fluid>
        <v-row align="center" justify="center" >
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8" >
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text--accent-3"
                        >LOGIN</h1>
                        <div class="text-center mt-4">
                          <v-avatar>
                            <img src="escudo1.jpg">
                          </v-avatar>
                        </div>
                        <h2 class="text-center mt-4 ">INGRESE SUS CREDENCIALES</h2>
                        <v-alert 
                               v-if="errorM==true"  
                               dense 
                               outlined 
                               type="error">
                               El nombre de usuario o password son incorrectos
                              </v-alert>
                        <v-form>
                          <v-text-field
                            label="Usuario"
                            v-model="user"
                            :rules="namerules"
                            name="Usuario"
                            prepend-icon="mdi-account-circle"
                            type="text"
                            color="teal accent-3"
                          />
                             <v-text-field
                              required
                              v-model="pass"
                              color="teal accent-3"
                              :rules="password"
                              label="Password" 
                              :type="showpasword ?'text' : 'password'" 
                              prepend-icon="mdi-lock" 
                              :append-icon="showpasword ? 'mdi-eye' : 'mdi-eye-off'" 
                              @click:append="showpasword =!showpasword"/>
  
                          
                        </v-form>
                               
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn 
                        rounded 
                        class="ma-2"
                        color="teal accent-3" 
                        :disabled="dessavilitar"
                        @click="ingresar"
                       
                        >Ingresar</v-btn>
                      </div>
  
                    </v-col>
                    <br>
                    <v-col cols="6" md="4" class="teal accent-4">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">INSTITUCIÓN EDUCATIVA</h1>
                        <h1 class="text-center display-1">CLAVELLINAS</h1>
                        
                      </v-card-text>
                        <v-container fluid>
                        <v-row justify="space-around">
                          <v-col cols="12">
                            <v-img
                              src="escudo1.jpg"
                              aspect-ratio="1.0"
                            ></v-img>
                          </v-col>
                        </v-row>
                        </v-container>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
     
    </v-main>

 
  </v-app>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'
export default {
data ()  {
return {
  alerta:'',
  errorM:'',  
  user:'',
  pass:'',
  namerules:[v=> !!v ||'Usuario es requerido' ],
  password:[v=> !!v ||'El password es obligatorio'],
  showpasword:false,
  step: 1,
  props: {
  source: String
  }}
 },
 
    computed: {
    
      dessavilitar(){
        return this.pass.length===0 || this.user.length===0
      }
    },
   methods: {
    msjAlerta:function(tata){
       Swal.fire({
          position: 'top',
          icon: 'success',
          title: tata,
          showConfirmButton: false,
          timer: 3000})
      },
    
    error:function(texto){
 
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: texto,
    })

    },
 
    ingresar(){
      axios.post("docentes/login",{usuario:this.user,password:this.pass})
      .then(response=>{
        this.$store.dispatch("Token",response.data.token)
        this.$store.dispatch("Nombre",response.data.docente.nombres)
        this.$store.dispatch("Apellido",response.data.docente.apellidos)
        this.$store.dispatch("Email",response.data.docente.email)
        this.$store.dispatch("Usuario",response.data.docente.usuario)
        this.$store.dispatch("Rol",response.data.docente.rol)
        sessionStorage.setItem("Aceso",response.data.token)
        this.$router.push("/homes")
        this.alerta=`Bienvenido al sistemas señor usuario `
        this.msjAlerta(this.alerta)
        // return console.log(response.data.token), console.log(response.data.docente.rol)
      })
      .catch((error)=>{
        console.log(error)
         if (error.response.status==400) {
        this.errorM='Usuario o Pasword incorectos por favor verificalos ' 
        this.error(this.errorM)

        }else{
         return this.errorM='usted no puedo ingresar al sistema por problemas en el servidor '

        }
      })

    }
  },
};
</script>