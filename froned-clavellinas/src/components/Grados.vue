<template>
<div >
  <v-data-table
 
    :headers="headers"
    :items="cursos"
    sort-by="calories"
    class="elevation-1"
  >
   
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title >Cursos</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
       
        <v-spacer></v-spacer>
          
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
              Nuevo curso
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
                <v-row 
             
                >
                  <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      required
                      :rules="nombreSede1"
                      :counter="25"
                      v-model="nombreCurso"
                      label="NOMBRE CURSO"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                       riquered
                       :counter="5"
                       :rules="numeroSede1"
                      v-model="numeroCurso"
                      label="NUMERO CURSO"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      
                      :items="sedes"
                      required
                      :rules="ubicacion1"
                      v-model="nombreSede"
                      label="NOMBRE SEDE"
                    >
                    </v-select>
        
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
        <v-dialog v-model="dialogDelete" max-width="650px">
          <v-card>
            <v-card-title class="text-h5">ESTAS SEGURO DE QUE QUIERES ELIMINAR EL CURSO {{nombreCurso}}?</v-card-title>
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
      id:'',
      mensaje1:"",
      mensaje2:"",
      numeroSede:"",
      ubicacion:"",
      nombreCurso:'',
      numeroCurso:'',
      nombreSede:'',
      sedes:[],
      dialog: false,
      dialogDelete: false,
      cursos:[],
      components: {},
      headers: [
        {text: 'NOMBRE CURSO',align: 'nombreCurso',sortable: false,value: 'nombreCurso'},
        { text: 'NUMUERO CURSO', value: 'numeroCurso' },
        { text: 'NOMBRE SEDE', value: 'nombreSede.nombreSede' },
        { text: 'NUMERO SEDE', value: 'nombreSede.numeroSede' },
        { text: 'FECHA', value: 'createdAt' },
        { text: 'OPCIONES', value: 'actions', sortable: false },
       
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
        return this.editedIndex === -1 ? 'NUEVA SEDE' : 'EDITAR SEDE'

      },
      dessavilitar(){
        return this.nombreCurso.length===0 || this.numeroCurso.length=== 0 || this.nombreSede.length===0
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
      this.listarGrados()
      this.listarSedes()
    },

    methods: {
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
      listarGrados(){
         let header = {headers :{"token": this.$store.state.token}};
        axios.get("cursos",header)
        .then((reponse) => {
      
          this.cursos=reponse.data.cursos
        }).catch((error) => {
          console.log(error.msg)
        });
      },

      editItem (item) {
        this.id=item._id
        this.editedIndex = 0
        this.nombreCurso=item.nombreCurso,
        this.numeroCurso=item.numeroCurso,
        this.nombreSede=item.nombreSede._id
        this.dialog = true
      },

      deleteItem (item) {
        this.nombreCurso=item.nombreCurso
        this.dialogDelete = true
        this.id=item._id
        this.editedIndex = 0
       
        
      },

      deleteItemConfirm () {
        console.log(this.id)
        let me =this
         let header = {headers :{"token": this.$store.state.token}};
          axios.delete(`cursos/${this.id}`,header)
        .then(function() {
          me.listarGrados()
          me.closeDelete()
          me.corecto="SEDE ELIMINADO CORECTAMENTE"
          me.msjAlerta(me.corecto)
        }).catch((error) => {
          console.log(error)
        });
        
      },

      close () {
        this.dialog = false
        this.limpiar()
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
        this.nombreCurso=""
        this.numeroCurso=""
        this.nombreSede=""
        // this.sedes=""
        
      },

      save () {
        let me=this
        if (this.editedIndex === -1) {
         let header = {headers :{"token": this.$store.state.token}};
         axios.post("cursos",{
          nombreCurso:this.nombreCurso,
          numeroCurso:this.numeroCurso,
          nombreSede:this.nombreSede
         },header)
        .then(function() {
          console.log('Guardadndo')
          me.listarGrados()
          me.limpiar()
          me.close()
          me.corecto="GRADO GUARDADO CORECTAMENTE"
          me.msjAlerta(me.corecto)   
        }).catch((error) => {
          console.log(error.msg)
        });
        } else {
          let header = {headers :{"token": this.$store.state.token}};
          axios.put(`cursos/${this.id}`,{
          nombreSede:this.nombreSede,
          nombreCurso:this.nombreCurso,
          numeroCurso:this.numeroCurso
         },header)
        .then(function() {
          console.log('editando')
          me.listarGrados()
          me.limpiar()
          me.close()
          me.corecto="GRADO EDITADO CORECTAMENTE"
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