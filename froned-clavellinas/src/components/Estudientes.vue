<template>
<div >
  <v-data-table
    :search="search"
    :headers="headers"
    :items="estudiantes"
    sort-by="calories"
    class="elevation-1"
  
  >
   
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title >ESTUDINATES</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
         <v-text-field
            v-model="search"
            flat
            color="white"
            solo-inverted
            hide-details
            background-color="teal accent-4"
            prepend-inner-icon="mdi-magnify"
            label="Busqueda"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            
            <v-select
              v-model="sortBy"
              color="white"
              background-color="teal accent-4"
              flat
              solo-inverted
              hide-details
              :items="headers3"
              prepend-inner-icon="mdi-magnify"
              label="Modo de Busqueda "
            ></v-select>
           
        
          </template>
          
        <v-spacer></v-spacer>
       
  <v-col cols="auto">
      <v-dialog
       v-model="dialog3"
        transition="dialog-bottom-transition"
        max-width="auto"
      >
       
       <v-toolbar
              color="teal accent-4"
              dark
            >MAS INFORMACION {{nombre}} {{apellidos}}</v-toolbar>
          <v-card>
           
              <!-- <div class="text-h2 pa-12">Hello world!</div> -->
                <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            GRUPO SANGUINIO
          </th>
          <th class="text-left">
            EMAIL
          </th>
           <th class="text-left">
            TIPO DE SEGURO
          </th> 
          <th class="text-left">
            NOMBRE EPS
          </th>
          <th class="text-left">
            ENFERMEDADES
          </th>
          <th class="text-left">
            CUIDADOS ESPECIALES
          </th> 
          <th class="text-left">
           OPERCIONES
          </th>
          <th class="text-left">
           ALERGIAS
          </th> 
          <th class="text-left">
           CONTACTO EMERGENCIA
          </th>  
          <th class="text-left">
           TELEFONO EMEGENCIA
          </th>
           <th class="text-left">
           DIRECCION EMERGENCIA
          </th> 
       
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{tipoSangre }}</td>
          <td>{{ email}}</td>
          <td>{{ tipoSeguro}}</td>
          <td>{{ nombreEps}}</td>
          <td>{{enfermedades }}</td>
          <td>{{ cuidadosEspeciales}}</td>
          <td>{{aperaciones}}</td>
          <td>{{ alergias }}</td>
          <td>{{nombreEm}}</td>
          <td>{{telefonoEm}}</td>
          <td>{{dirrecionEm}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
         
            <v-card-actions class="justify-end">
              <v-btn
               color="teal accent-4"
               dark
               class="mb-2"
                @click="cerrarInformacion()"
              >Cerrar</v-btn>
            </v-card-actions>
          </v-card>
        
      </v-dialog>
  </v-col>

      
  <v-row justify="center">
    <v-dialog
      v-model="dialog1"
      width="1500px"
      max-width="1000px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Selecione un Acudiente?</span>
          <v-spacer></v-spacer>
           <v-text-field
            v-model="search1"
            flat
            color="white"
            solo-inverted
            hide-details
            background-color="teal accent-4"
            prepend-inner-icon="mdi-magnify"
            label="Busqueda"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            
            <v-select
              v-model="sortBy1"
              color="white"
              background-color="teal accent-4"
              flat
              solo-inverted
              hide-details
              :items="headers4"
              prepend-inner-icon="mdi-magnify"
              label="Modo de Busqueda "
            ></v-select>
           
        
          </template>
        </v-card-title>
     
              <v-data-table
                :search="search1"
                v-model="selected"
                :headers="headers1"
                :items="acudientes"
                :single-select="singleSelect=true"
                item-key="_id"
                show-select
                class="elevation-1"
              >
                <template v-slot:top>
                 
                </template>
              </v-data-table>
    
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-2"
            color="teal accent-4"
            @click="close1"
          >
            Cancelar
          </v-btn>
          <v-btn
            class="ma-2"
            color="teal accent-4"
            @click="dialog1=false"
            :disabled="dessavilitar1"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>

          
        <v-dialog
          v-model="dialog"
          max-width="800px">
       <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="teal accent-4"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nueva estuadiante
            </v-btn>
          </template>
        
          <v-card 
          elevation="50"
         >
          <v-card-title>
            
              <span   
              
              dark 
              >{{ formTitle }}</span>
            </v-card-title>

       
                
            <v-card-text>
              <v-container >
                <v-row>
                <!-- nombre -->
                  <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      required
                      :rules="nombre1"
                      :counter="30"
                      v-model="nombre"
                      label="NOMBRES"
                    ></v-text-field>
                  </v-col>
                  <!-- apellido -->
                   <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      required
                      :rules="apellidos1"
                      :counter="30"
                      v-model="apellidos"
                      label="APELLIDOS"
                    ></v-text-field>
                  </v-col>
                  <!-- numero docuemnto -->
                   <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      required
                      :rules="numeroDocuemnto1"
                      :counter="11"
                      v-model="numeroDocuemnto"
                      label="NUMERO DE DOCUMENTO"
                    ></v-text-field>
                  </v-col>
                  <!-- tipo de dumento -->
                   <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                  <v-select
                      
                      :items="documento"
                      required
                      :rules="tipoDocuemneto1"
                     v-model="tipoDocuemneto"
                      label="TIPO DE DOCUMENTO"
                    >
                    </v-select>
                    
                  </v-col>
                  <!-- genero -->
                   <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      
                      :items="generos"
                      required
                      :rules="genero1"
                      v-model="genero"
                      label="GENERO"
                    >
                    </v-select>
                   
                  </v-col>
                  <!-- fecha de nacimiento -->
                   <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      required
                      :rules="nombreSede1"
                      :counter="25"
                      v-model="fachaNacimiento"
                      label="FECHA DE NACIMINTO"
                    ></v-text-field>
                  
                  </v-col>
                  <!-- tipo de sangre -->
                   <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                   <v-select
                      
                      :items="sangre"
                      required
                      :rules="tipoSangre1"
                      v-model="tipoSangre"
                      label="GRUPO SANGINIO"
                    >
                    </v-select>
                   
                  </v-col>
                  <!-- nombre acudeinte -->
                   <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                   <!-- <v-select
                      
                      :items="acudientes1"
                      required
                      :rules="ubicacion1"
                      v-model="nombreAcudiente"
                      label="NOMBRE ACUDEINTE"
                    >
                    </v-select> -->
                  
              
                    <v-btn
                        color="blue-grey"
                        class="ma-2 white--text"
                        @click="dialog1=true"
                      >
                        SELECIONE ACUDIENETE
                      
                      </v-btn>
                  </v-col>
                  <!-- dirrecion -->
                   <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      required
                      :rules="dirrecion1"
                      :counter="30"
                      v-model="dirrecion"
                      label="DIRRECION"
                    ></v-text-field>
                  </v-col>
                  <!-- telefono -->
                   <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      required
                      :rules="telefono1"
                      :counter="10"
                      v-model="telefono"
                      label="TELEFONO"
                    ></v-text-field>
                  </v-col>
                  <!-- email -->
                   <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                  
                    <v-text-field
                      required
                      :rules="email1"
                      :counter="30"
                      v-model="email"
                      label="EMAIL"
                    ></v-text-field>
                  </v-col>    
                  <!-- tipo de seguro -->
                   <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      :items="regimen"
                      required
                      :rules="tipoSeguro1"
                      v-model="tipoSeguro"
                      label="TIPO DE SEGURO"
                    >
                    </v-select>
                  </v-col>
                  <!-- nombre eps  -->
                   <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                   <v-select
                      :items="eps"
                       required
                      :rules="nombreEm1"
                      v-model="nombreEps"
                      label="NOMBRE EPS"
                    >
                    </v-select>
                    
                  </v-col>
                  <!-- enfermedades -->
                   <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      required
                      :rules="enfermedades1"
                      :counter="225"
                      v-model="enfermedades"
                      label="ENFERMEDADES"
                    ></v-text-field>
                  </v-col>
                  <!-- cuidados epeciales -->
                    <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      required
                      :rules="cuidadosEspeciale1"
                      :counter="25"
                      v-model="cuidadosEspeciales"
                      label="CUIIDADOS ESPECIALES"
                    ></v-text-field>
                  </v-col>
                  <!--operciones -->
                    <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      required
                      :rules="aperaciones1"
                      :counter="30"
                      v-model="aperaciones"
                      label="OPERACIONES"
                    ></v-text-field>
                  </v-col>
                  <!-- alergias -->
                    <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      required
                      :rules="nombreSede1"
                      :counter="25"
                      v-model="alergias"
                      label="ALERGIAS"
                    ></v-text-field>
                  </v-col>
                  <!-- NOMBRE EM -->
                    <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      required
                      :rules="nombreSede1"
                      :counter="25"
                      v-model="nombreEm"
                      label="NOMBRE EMERGENCIA"
                    ></v-text-field>
                  </v-col>
                  <!-- Telefono em -->
                  <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      required
                      :rules="nombreSede1"
                      :counter="25"
                      v-model="telefonoEm"
                      label="TELEFONO EMRGENCIA"
                    ></v-text-field>
                  </v-col>
                  <!-- dirrecion em -->
                  <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      required
                      :rules="nombreSede1"
                      :counter="25"
                      v-model="dirrecionEm"
                      label="DIRRECION EMERGENCIA"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                 class="ma-2"   
                color="teal accent-4"
                @click="close"
              >
                Cancel
              </v-btn>
              <template >
              <v-btn 
                class="ma-2"
                color="teal accent-4"
               :disabled="dessavilitar"
                @click="save"
              >
                Guardar
              </v-btn>
              </template>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="715px">
          <v-card>
            <v-card-title class="text-h5">ESTAS SEGURO DE QUE QUIERES ELIMINAR EL ESTUDIANTE {{nombre}} {{apellidos}} CON EL NUMERO DE DOCUMENTO {{numeroDocuemnto}} TENER EN CUENTA QUE EL RELIZAR ESTA ACCION  HARA CAMBIOS EN TODO EL SISTEMA?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
             <v-btn color="red" elevation="2" @click="closeDelete">Cancel</v-btn>
              <v-btn  color="green" elvation="2" @click="deleteItemConfirm">Eliminar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      
    </template>
    <template v-slot:[`item.actions`]="{ item }" v-if="this.$store.state.rol=='ADMIN_ROL'">
        
       <v-btn
      class="mx-1"
      fab
      small
      color="teal accent-4"
      @click="editItem(item)"
    >
      <v-icon color="white">mdi-pencil</v-icon>
       </v-btn>
       <v-btn
        class="mx-1"
        fab
        color="red"
        small
        @click="deleteItem(item)">

      <v-icon color="white">mdi-delete</v-icon>     
    </v-btn>

      
    </template>
      <template v-slot:[`item.opciones`]="{ item }">
    
       <v-btn
      class="mx-1"
      fab
      small
      color="teal accent-4"
      @click="editItem1(item)"
    >
      <v-icon color="white">fa-plus</v-icon>
    </v-btn>
    </template>

    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>

    </template>
    
  </v-data-table>
  
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'
  export default {
    data: () => ({
      search: '',
      search1: '',
      sortBy: 'name',
      corecto:"",
      mensaje1:"",
      sortBy1: 'name',
      id:'',
       apellidos:"", nombre:"", numeroDocuemnto:"", tipoDocuemneto:"", 
       nombreAcudiente:"",fachaNacimiento:"", tipoSangre:"", dirrecion:"", 
       telefono:"", email:"", tipoSeguro:"", nombreEps:"", enfermedades:"", 
       cuidadosEspeciales:"", aperaciones:"", alergias:"", genero:"",
      nombreEm:"", telefonoEm:"", dirrecionEm:"",
      nombreSede:"",
      numeroSede:"",
      ubicacion:"",
      dialog: false,
      dialog1: false,
      dialog3:false,
      dialogDelete: false,
      estudiantes:[],
      acudientes:[],
      acudientes1:[],
      sangre:['O-','O+','A-','A+','B-','B+','AB-','AB+'],
      documento:['T.I','C.C',],
      generos:['MASCULINO','FEMENINO'],
      regimen:[' (RS)','(RC)'],
      eps:['Salud Colmena','Salud Total','Codsalud','saludvida'],
      singleSelect: false,
      selected: [],
      components: {},
      headers: [
        { text: 'DETALLES', value: 'opciones', sortable: false },
        {text: 'NOMBRE',align: 'nombre',sortable: false,value: 'nombre'},
        { text: 'APELLIDOS', value: 'apellidos' },
        { text: 'NUMERO DE DOCUMENTO', value: 'numeroDocuemnto' },
        { text: 'TIPO DE DOCUMENTO', value: 'tipoDocuemneto' },
        { text: 'ACUDIENTE', value: 'nombreAcudiente.nombreComplecto' },
        { text: 'DIRRECION', value: 'dirrecion' },
        { text: 'TELEFONO', value: 'telefono' },
        { text: 'FECHA DE NACIMIENTO', value: 'fachaNacimiento' },
        { text: 'GENERO', value: 'genero' },
        { text: 'OPCIONES', value: 'actions', sortable: false },
       
      ],
       headers3: [
        {text: 'NOMBRE',align: 'nombre',sortable: false,value: 'nombre'},
        { text: 'APELLIDOS', value: 'apellidos' },
        { text: 'NUMERO DE DOCUMENTO', value: 'numeroDocuemnto' },
        { text: 'ACUDIENTE', value: 'nombreAcudiente.nombreComplecto' },
      
      ],
        headers4: [
        {text: 'NOMBRE COMPLETO',align: 'nombreComplecto',sortable: false,value: 'nombreComplecto'},
        { text: 'NUMERO DE DOCUMENTO', value: 'numeroDocuemnto' },
      ],
         headers1: [
        {text: 'NOMBRE COMPLETO',align: 'nombreComplecto',sortable: false,value: 'nombreComplecto'},
        { text: 'NUMERO DE DOCUMENTO', value: 'numeroDocuemnto' },
        { text: 'DIRECION', value: 'dirrecion' },
        { text: 'TIPO DE DOCUMENTO', value: 'tipoDocuemneto' },
        { text: 'TELEFONO', value: 'telefono' },
        { text: 'EMAIL', value: 'email' },
        { text: 'TELEFONO ALTERNO', value: 'telefonoalterno' }
      ],
      editedIndex: -1,
      apellidos1: [
        v => !!v || 'EL APELLIDOS DEL ESTUDIANTE ES REQUERIDO',
        v => v.length <= 30 || 'LOA APELLIDOS DE ESTUDINATES DEBEN TENER MENOS DE 30 CARACTERES',
      ],
       nombre1: [
        v => !!v || 'EL NOMBRE DEL ESTUDIANTE ES REQUERIDO',
        v => v.length <= 30 || 'EL NOMBRE DE ESTUDINTE DEBE TENER MENOS DE 30 CARACTERES',
      ],
        numeroDocuemnto1: [
        v => !!v || 'EL NUMERO DE DOCUMENTO DE ESTUDIANTE ES  REQUERIDO',
        v => v.length <= 11 || 'EL  NUMERO DE DOCUMENTO DEL ESTUDIANTE DEBE TENER MMENOS DE 11 NUMEROS',
      ],   
      tipoDocuemneto1: [
        v => !!v || 'EL TIPO DE DOCUEMNTO DEL ESTUDIANTE ES REQUERIDO',
      ],   
      // tipoDocuemneto1: [
      //   v => !!v || 'LA UBICACION DE LA SEDE ES REQUERIDO',
      //   v => v.length <= 50 || 'LA UBICACION DE LA SEDE DEBE TENER MENOS DE 50 CARACTERES',
      // ],
      fachaNacimiento1: [
        v => !!v || 'LA UBICACION DE LA SEDE ES REQUERIDO',
        v => v.length <= 50 || 'LA UBICACION DE LA SEDE DEBE TENER MENOS DE 50 CARACTERES',
      ],
      tipoSangre1: [
        v => !!v || 'EL TIPO DE  SANGRE  ES REQUERIDO',
        
      ],   
      dirrecion1: [
        v => !!v || 'LA DIRRCION DEL ESTUDIANTE ES REQUERIDA',
        v => v.length <= 30 || 'LA UBICACION DE LA SEDE DEBE TENER MENOS DE 50 CARACTERES',
      ],   
      telefono1: [
        v => !!v || 'EL TELEFONO  ES REQUERIDO',
        v => v.length <= 10 || 'EL TELEFONO NO PUEDE TENER MAS 10 NUMEROS',
      ],
      email1: [
        v => !!v || 'EL EMAIL ES  REQUERIDO',
        v => v.length <= 30 || 'EL EMAIL NO PUEDE TENER MAS DE  30 CARACTERES',
      ],
      tipoSeguro1: [
        v => !!v || 'TIPO DE SEGURO ES REQUERIDO ES REQUERIDO',
      ],
      nombreEps1: [
        v => !!v || 'EL NOMBRE DE LA EPS ES REQUEIDA ',
      ],
      enfermedades1: [
        v => !!v || 'SI NO CUENTA CON TIENE NINGUNA EFERMEDAD POR FAVOR INGRSE NINGNA YA QUE ESTE CAMPO ES REQUERIDO',
        v => v.length <= 225 || 'LAS ENEFEMEDADES NO PUEDEN TENER MAS 225 CARACTERES',
      ],
      cuidadosEspeciale1: [
        v => !!v || 'SI NO CUENTA CON NINGUN CUIDADO ESPECIAL  POR FAVOR DIGITE NINGUNO YA QUE ESTE CAMPO NO PUEDE ESTAR VACIO ',
        v => v.length <= 225 || 'LOS  CUIEDADOS EESPCIALES NO PUEDEN TENER MAS DE 225 CARATARES',
      ],
      nombreEm1: [
        v => !!v || 'LA UBICACION DE LA SEDE ES REQUERIDO',
        v => v.length <= 50 || 'LA UBICACION DE LA SEDE DEBE TENER MENOS DE 50 CARACTERES',
      ],
      aperaciones1: [
        v => !!v || 'SI NO CUENTA CON NINGUNA AOPERCION POR  FAVOR INGRESE NINGUNA OPERACION',
        v => v.length <= 30 || 'EL CAMPO DE OPERRACIONES NO PUEDE TENER 30 CARATARES',
      ],
      alergias1: [
        v => !!v || 'SI NO CUENTA CON NINGUNA ALERGIA POR FAVOR INGRESE NINGUNA ALERGIA YA QUE ESTE CAMPO ES REQUERIDO',
        v => v.length <= 50 || 'ESTE CAMPO NO PUEDE SUPERAR LOS 30 CARATERES',
      ],
      genero1: [
        v => !!v || 'EL GENERO DEL ESTIDIANTES  ES REQUERIDO',
      ],
        telefonoEm1: [
        v => !!v || 'EL TELEFONO  ES REQUERIDO',
        v => v.length <= 10 || 'EL TELEFONO NO PUEDE TENER MAS 10 NUMEROS',
      ],
      dirrecionEm1: [
        v => !!v || 'LA UBICACION DE LA SEDE ES REQUERIDO',
        v => v.length <= 50 || 'LA UBICACION DE LA SEDE DEBE TENER MENOS DE 50 CARACTERES',
      ],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'NUEVO ESTUDIANTE' : 'EDITAR ESTUDIANTE'

      },
      dessavilitar(){
        return this.apellidos.length===0, this.nombre.length===0, this.numeroDocuemnto.length===0, this.tipoDocuemneto.length===0,this.fachaNacimiento.length===0, this.tipoSangre.length===0, this.dirrecion.length===0,this.telefono.length===0, this.email.length===0, this.tipoSeguro.length===0, this.nombreEps.length===0, this.enfermedades.length===0, this.cuidadosEspeciales.length===0, this.aperaciones.length===0, this.alergias.length===0, this.genero.length===0, this.nombreEm.length===0, this.telefonoEm.length===0, this.dirrecionEm.length===0
      },
      dessavilitar1(){
        return this.selected.length ===[]
      }
    },
 

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.listarEstudiantes()
      this.listarAcudiente()
    },

    methods: {
       error:function(texto){
 
      Swal.fire({
        icon: 'error',
        title: 'NUMERO DE DOCUMENTO',
        text: texto,
    })

    },
        msjAlerta:function(text){
          Swal.fire({
          position: 'top',
          icon: 'success',
          title:text ,
          showConfirmButton: false,
          timer: 3000})
      },
      cerrarInformacion(){
        this.dialog3=false
        this.limpiar()
      },
        listarAcudiente(){
          let me=this 
          let array=[]        
          let header = {headers :{"token": this.$store.state.token}};
        axios.get("acudientes",header)
        .then((reponse) => {
          
          this.acudientes=reponse.data.acudientes
          array=reponse.data.acudientes
          array.map(function(x){
            me.acudientes1.push({text:x.nombreComplecto,value:x._id})
          })
          
        }).catch((error) => {
          console.log(error.msg)
        });
      },
      listarEstudiantes(){
         let header = {headers :{"token": this.$store.state.token}};
        axios.get("estudiantes",header)
        .then((reponse) => {
          this.estudiantes=reponse.data.estudiante
          // console.log(error.msg)
        }).catch((error)=>{
          console.log(error)
        });
      },

      editItem (item) {
          this.id=item._id
          this.editedIndex = 0
          this.apellidos=item.apellidos, 
          this.nombre=item.nombre, 
          this.numeroDocuemnto=item.numeroDocuemnto, 
          this.tipoDocuemneto=item.tipoDocuemneto, 
          this.selected[0]=item.nombreAcudiente,
          this.fachaNacimiento=item.fachaNacimiento, 
          this.tipoSangre=item.tipoSangre, 
          this.dirrecion=item.dirrecion, 
          this.telefono=item.telefono, 
          this.email=item.email, 
          this.tipoSeguro=item.tipoSeguro, 
          this.nombreEps=item.nombreEps, 
          this.enfermedades=item.enfermedades, 
          this.cuidadosEspeciales=item.cuidadosEspeciales, 
          this.aperaciones=item.aperaciones, 
          this.alergias=item.alergias, 
          this.genero=item.genero,
          this.nombreEm=item.nombreEm,
          this.telefonoEm=item.telefonoEm, 
          this.dirrecionEm=item.dirrecionEm, 
          this.dialog = true
      },
          editItem1 (item) {
          this.id=item._id
           this.apellidos=item.apellidos, 
          this.nombre=item.nombre, 
          this.tipoSangre=item.tipoSangre, 
          this.email=item.email, 
          this.tipoSeguro=item.tipoSeguro, 
          this.nombreEps=item.nombreEps, 
          this.enfermedades=item.enfermedades, 
          this.cuidadosEspeciales=item.cuidadosEspeciales, 
          this.aperaciones=item.aperaciones, 
          this.alergias=item.alergias, 
          this.nombreEm=item.nombreEm,
          this.telefonoEm=item.telefonoEm, 
          this.dirrecionEm=item.dirrecionEm, 
          this.dialog3 = true
      },
      deleteItem (item) {
        this.nombre=item.nombre
        this.apellidos=item.apellidos
        this.numeroDocuemnto=item.numeroDocuemnto
        this.dialogDelete = true
        this.id=item._id
        this.editedIndex = 0
       
        
      },

      deleteItemConfirm () {
        console.log(this.id)
        let me =this
         let header = {headers :{"token": this.$store.state.token}};
          axios.delete(`estudiantes/${this.id}`,header)
        .then(function() {
          me.listarEstudiantes()
          me.closeDelete()
          me.corecto="ESTUDIANTE ELIMINADO CORECTAMENTE"
          me.msjAlerta(me.corecto)
        }).catch((error) => {
          console.log(error)
        });
        
      },

      close () {
        this.dialog = false
        this.limpiar()
      },
        close1 () {
        this.dialog1 = false
        this.selected=[]
      },

      closeDelete () {
        this.dialogDelete = false
        this.id=''
        this.limpiar()
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      limpiar(){
      //  this.selected=[]
       this.apellidos="", 
       this.nombre="", 
       this.numeroDocuemnto="", 
       this.tipoDocuemneto="", 
       this.nombreAcudiente="",
       this.fachaNacimiento="", 
       this.tipoSangre="", 
       this.dirrecion="", 
       this.telefono="", 
       this.email="", 
       this.tipoSeguro="", 
       this.nombreEps="", 
       this.enfermedades="", 
       this.cuidadosEspeciales="", 
       this.aperaciones="", 
       this.alergias="", 
       this.genero="",
       this.nombreEm="",
       this.telefonoEm="", 
       this.dirrecionEm=""
      },

      save () {
         console.log(this.selected[0]._id)
        let me=this
        if (this.editedIndex === -1) {
         
         let header = {headers :{"token": this.$store.state.token}};
         axios.post("estudiantes",{
          apellidos:this.apellidos, 
          nombre:this.nombre, 
          numeroDocuemnto:this.numeroDocuemnto, 
          tipoDocuemneto:this.tipoDocuemneto, 
          nombreAcudiente:this.selected[0]._id,
          fachaNacimiento:this.fachaNacimiento, 
          tipoSangre:this.tipoSangre, 
          dirrecion:this.dirrecion, 
          telefono:this.telefono, 
          email:this.email, 
          tipoSeguro:this.tipoSeguro, 
          nombreEps:this.nombreEps, 
          enfermedades:this.enfermedades, 
          cuidadosEspeciales:this.cuidadosEspeciales, 
          aperaciones:this.aperaciones, 
          alergias:this.alergias, 
          genero:this.genero,
          nombreEm:this.nombreEm,
          telefonoEm:this.telefonoEm, 
          dirrecionEm:this.dirrecionEm, 
         },header)
        .then(function() {
          console.log('Guardadndo')
          me.listarEstudiantes()
          me.limpiar()
          me.close()
          me.close1()
          me.corecto="ESTUDIANTE GUARDADO CORECTAMENTE"
          me.msjAlerta(me.corecto)
        }).catch((error) => {
          console.log(error.msg)
          this.mensaje1=error.response.data.errors[0].msg
          this.error(this.mensaje1)
        });
        } else {
       
          let header = {headers :{"token": this.$store.state.token}};
          axios.put(`estudiantes/${this.id}`,{
          apellidos:this.apellidos, 
          nombre:this.nombre, 
          numeroDocuemnto:this.numeroDocuemnto, 
          tipoDocuemneto:this.tipoDocuemneto, 
          nombreAcudiente:this.selected[0]._id,
          fachaNacimiento:this.fachaNacimiento, 
          tipoSangre:this.tipoSangre, 
          dirrecion:this.dirrecion, 
          telefono:this.telefono, 
          email:this.email, 
          tipoSeguro:this.tipoSeguro, 
          nombreEps:this.nombreEps, 
          enfermedades:this.enfermedades, 
          cuidadosEspeciales:this.cuidadosEspeciales, 
          aperaciones:this.aperaciones, 
          alergias:this.alergias, 
          genero:this.genero,
          nombreEm:this.nombreEm,
          telefonoEm:this.telefonoEm, 
          dirrecionEm:this.dirrecionEm, 
         },header)
        .then(function() {
          console.log('editando')
          me.listarEstudiantes()
          me.limpiar()
          me.close()
          me.corecto="ESTUDIANTE EDITADO CORECTAMENTE"
          me.msjAlerta(me.corecto)
        }).catch((error) => {
          console.log(error.msg)
        });
        }
        this.close()
      },
    },
  }
</script>
<style>
  /* table {
   width: 100%;
   border: 1px solid #000;
} */
/* th, td {
   width: %;
   text-align: left;
   vertical-align: top;
   border: 1px solid rgba(47, 163, 134, 0.856);
} */

th {
   background:#40E0D0;
}
</style>