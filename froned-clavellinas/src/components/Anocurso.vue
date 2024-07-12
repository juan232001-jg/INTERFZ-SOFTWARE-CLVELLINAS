<template>
<div >
  <v-data-table
    :search="search"
    :headers="headers"
    :items="anocurso"
    sort-by="calories"
    class="elevation-1"
  >
   
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title >AÑOS EN CURSO</v-toolbar-title>
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
              v-model="sortBy1"
              color="white"
              background-color="teal accent-4"
              flat
              solo-inverted
              hide-details
              :items="headers1"
              prepend-inner-icon="mdi-magnify"
              label="Modo de Busqueda "
            ></v-select>
          </template>
        <v-spacer></v-spacer>
          <v-row justify="center">
    <v-dialog
      v-model="dialog1"
      width="1500px"
      max-width="1000px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Selecione un Estudiante?</span>
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
              :items="headers2"
              prepend-inner-icon="mdi-magnify"
              label="Modo de Busqueda "
            ></v-select>
           
        
          </template>
        </v-card-title>
     
              <v-data-table
                :search="search1"
                v-model="selected"
                :headers="headers2"
                :items="estudiantes"
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
          max-width="800px"
         
         
        >
       <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="teal accent-4"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nevo año
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
                <v-row >
                  <!-- estudiante -->
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                   <v-btn
                        color="blue-grey"
                        class="ma-2 white--text"
                        @click="dialog1=true"
                      >
                        SELECIONE ESTUDIANTE
                      
                      </v-btn>
                  </v-col>
                 
                  <!-- nombre curso -->
                  <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                <v-select
                      
                      :items="cursos"
                      required
                      :rules="ubicacion1"
                      v-model="curso"
                      label="NOMBRE DE CURSO "
                    >
                    </v-select>
                  </v-col>
                  
                  <!-- sede -->
                   <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      
                      :items="sedes"
                      required
                      :rules="ubicacion1"
                      v-model="sede"
                      label="NOMBRE SEDE"
                    >
                    </v-select>
        
                  </v-col>
                   <!-- ano -->
                  <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      required
                      :rules="nombreSede1"
                      :counter="25"
                      v-model="ano"
                      label="AÑO"
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
        <v-dialog v-model="dialogDelete" max-width="600px">
          <v-card>
            <v-card-title class="text-h5">ESTAS SEGURO DE QUE QUIERES ELIMINAR EL REGITRO DEL AÑO CURSADO DEL ESTUDIANTE {{nombreEtudiante}} {{apellido}}?</v-card-title>
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
    <template v-slot:[`item.actions`]="{ item }">
        
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
      sortBy1: 'name',
      corecto:"",
      mensaje1:"",
      id:'',
      nombreSede:"",
      numeroSede:"",
      ubicacion:"",
      anocurso:[],
      apellido:'',
      sedes1:[],
      estudiantes:[],
      curso:'',
      cursos:[],
      sede:'',
      ano:'',
      nombreEtudiante:'',
      dialog: false,
      dialog1: false,
      dialogDelete: false,
      sedes:[],
      selected: [],
      components: {},
      
      headers: [
        {text: 'CURSO',align: 'curso',sortable: false,value: 'curso.nombreCurso'},
        { text: 'NOMBRE ESTUDIANTE', value: 'nombreEtudiante.nombre' },
        { text: 'APELLIDOS ESTUDIANTE', value: 'nombreEtudiante.apellidos' },
        { text: 'NUMERO DE DOCUMENTO', value: 'nombreEtudiante.numeroDocuemnto' },
        { text: 'SEDE', value: 'sede.nombreSede' },
        { text: 'AÑO', value: 'ano' },
        { text: 'FECHA', value: 'createdAt' },
        { text: 'OPCIONES', value: 'actions', sortable: false },
       
      ],
      headers2: [
        {text: 'NOMBRE',align: 'nombre',sortable: false,value: 'nombre'},
        { text: 'APELLIDOS', value: 'apellidos' },
        { text: 'NUMERO DE DOCUMENTO', value: 'numeroDocuemnto' },
        { text: 'TIPO DE DOCUMENTO', value: 'tipoDocuemneto' },
      ],
        headers1: [
        {text: 'CURSO',align: 'curso',sortable: false,value: 'curso.nombreCurso'},
        { text: 'NOMBRE ESTUDIANTE', value: 'nombreEtudiante.nombre' },
        { text: 'APELLIDOS ESTUDIANTE', value: 'nombreEtudiante.apellidos' },
        { text: 'NUMERO DE DOCUMENTO', value: 'nombreEtudiante.numeroDocuemnto' },
        { text: 'SEDE', value: 'sede.nombreSede' },
        { text: 'AÑO', value: 'ano' },
      ],
      editedIndex: -1,
       nombreSede1: [
        v => !!v || 'EL NOMBRE DE LA SEDE ES REQUERIDO',
        v => v.length <= 25 || 'EL NOMBRE DE LA SEDE DEBE TENER MENOS DE 25 CARACTERES',
      ],
       numeroSede1: [
        v => !!v || 'EL NUMERO DE LA SEDE ES REQUERIDO',
        v => v.length <= 5 || 'EL NUMERO DE LA SEDE DEBE TENER MENOS DE 5 CARACTERES',
      ],
        ubicacion1: [
        v => !!v || 'LA UBICACION DE LA SEDE ES REQUERIDO',
        v => v.length <= 50 || 'LA UBICACION DE LA SEDE DEBE TENER MENOS DE 50 CARACTERES',
      ],

    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'NUEVO GRADO PARA ESTUDIANT' : 'EDITAR GRADO DE ESTUDIANTE '

      },
      dessavilitar(){
        return this.curso.length===0 || this.ano.length=== 0 || this.sede.length===0
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
      this.listarAnocurso()
      this.listarSedes()
      this.listarGrados()
      this.listarEstudiantes()
    },

    methods: {
       listarGrados(){
         let me =this
         let gradoarray=[]
         let header = {headers :{"token": this.$store.state.token}};
        axios.get("cursos",header)
        .then((reponse) => {
          gradoarray=reponse.data.cursos
          gradoarray.map(function(x){
          me.cursos.push({text:x.nombreCurso,value:x._id});
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
        }).catch((error)=>{
          console.log(error)
        });
      },
      listarSedes(){
        let me=this;
        let sedesArray=[];
         let header = {headers :{"token": this.$store.state.token}};
        axios.get("sedes",header)
        .then((reponse) => {
        //   console.log(reponse.data.sedes)
          sedesArray=reponse.data.sedes
          sedesArray.map(function(x){
          me.sedes.push({text:x.nombreSede,value:x._id});
          })
          return console.log(this.sedes)
        }).catch((error) => {
          console.log(error.msg)
        });
      }, 
      error:function(texto){
 
      Swal.fire({
        icon: 'error',
        title: 'NOMBRE DE SEDE',
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
      listarAnocurso(){
         let header = {headers :{"token": this.$store.state.token}};
        axios.get("anocurso",header)
        .then((reponse) => {
          this.anocurso=reponse.data.anosNuevo
        }).catch((error) => {
          console.log(error.msg)
        });
      },

      editItem (item) {
        this.id=item._id
        this.editedIndex = 0
        this.curso=item.curso._id
        this.sede=item.sede._id
        this.ano=item.ano
        this.selected[0]=item.nombreEtudiante
        this.dialog = true
      },

      deleteItem (item) {
        this.nombreEtudiante=item.nombreEtudiante.nombre
        this.apellido=item.nombreEtudiante.apellidos
        this.dialogDelete = true
        this.id=item._id
        this.editedIndex = 0
       
        
      },

      deleteItemConfirm () {
        console.log(this.id)
        let me =this
         let header = {headers :{"token": this.$store.state.token}};
          axios.delete(`anocurso/${this.id}`,header)
        .then(function() {
          me.listarAnocurso()
          me.closeDelete()
          me.corecto="GRADO DE ESTUDIANTE ELIMINADO CORECTAMENTE"
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
         this.dialog1=false
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
        this.curso=''
        this.sede=''
        this.ano=''
        this.selected=[]
      },

      save () {
        
        let me=this
        if (this.editedIndex === -1) {
         let header = {headers :{"token": this.$store.state.token}};
         axios.post("anocurso",{
            sede:this.sede,
            ano:this.ano,
            nombreEtudiante:this.selected[0]._id,
            curso:this.curso
         },header)
        .then(function() {
          console.log('Guardadndo')
          me.listarAnocurso()
          me.limpiar()
          me.close()
          me.corecto="GRADO DE ESTUDIANTE GUARDADO CORECTAMENTE"
          me.msjAlerta(me.corecto)
        }).catch((error) => {
          console.log(error.msg)
        });
        } else {
       
          let header = {headers :{"token": this.$store.state.token}};
          axios.put(`anocurso/${this.id}`,{
            sede:this.sede,
            ano:this.ano,
            nombreEtudiante:this.selected[0]._id,
            curso:this.curso
         },header)
        .then(function() {
          console.log('editando')
          me.listarAnocurso()
          me.limpiar()
          me.close()
          me.corecto="GRADO DE ESTUDIANTE EDITADO CORECTAMENTE"
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