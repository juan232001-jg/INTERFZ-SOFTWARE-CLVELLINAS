<template>
<div >
  <v-data-table
 
    :headers="headers"
    :items="materias"
    sort-by="calories"
    class="elevation-1"
  >
   
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title >MATERIAS</v-toolbar-title>
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
              Nueva materia
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
                      :counter="15"
                      v-model="nombre"
                      label="NOMBRE DE LA MATERIA"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                       riquered
                       :counter="100"
                       :rules="numeroSede1"
                      v-model="descripcion"
                      label="DESCRIPCION"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  
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
        <v-dialog v-model="dialogDelete" max-width="700px">
          <v-card>
            <v-card-title color='green' class="text-h5">ESTAS SEGURO DE QUE QUIERES ELIMINAR LA MATERIA {{nombre}}?</v-card-title>
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
      nombre:'',
      descripcion:'',
      corecto:"",
      mensaje1:"",
      dialog: false,
      dialogDelete: false,
      materias:[],
      components: {},
      headers: [
        {text: 'NOMBRE DE LA MATERIA',align: 'nombre',sortable: false,value: 'nombre'},
        { text: 'DESCRIPCION', value: 'descripcion' },
        { text: 'FECHA', value: 'createdAt' },
        { text: 'OPCIONES', value: 'actions', sortable: false },
       
      ],
      editedIndex: -1,
       nombreSede1: [
        v => !!v || 'EL NOMBRE DE LA MATERIA ES REQUERIDO',
        v => v.length <= 15 || 'EL NOMBRE DE LA MATERIA DEBE TENER MENOS DE 15 CARACTERES',
      ],
       numeroSede1: [
        v => !!v || 'EL NUMERO DE LA SEDE ES REQUERIDO',
        v => v.length <= 100 || 'EL NUMERO DE LA SEDE DEBE TENER MENOS DE 100 CARACTERES',
      ],
  
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'NUEVA MATERIA' : 'EDITAR MATERIA'

      },
      dessavilitar(){
        return this.nombre.length===0 || this.descripcion.length=== 0 
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
      this.listarMaterias()
    },

    methods: {
      error:function(texto){
 
      Swal.fire({
        icon: 'error',
        title: 'NOMBRE DE MATERIA',
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
      listarMaterias(){
         let header = {headers :{"token": this.$store.state.token}};
        axios.get("materias",header)
        .then((reponse) => {
          console.log(reponse.data.materias)
          this.materias=reponse.data.materias
        }).catch((error) => {
          console.log(error.msg)
        });
      },

      editItem (item) {
        this.id=item._id
        this.editedIndex = 0
        this.nombre=item.nombre
        this.descripcion=item.descripcion
        this.dialog = true
      },

      deleteItem (item) {
        this.nombre=item.nombre
        this.dialogDelete = true
        this.id=item._id
        this.editedIndex = 0
       
        
      },

      deleteItemConfirm () {
        console.log(this.id)
        let me =this
         let header = {headers :{"token": this.$store.state.token}};
          axios.delete(`materias/${this.id}`,header)
        .then(function() {
          me.listarMaterias()
          me.closeDelete()
          me.corecto="MATERIA ELIMINADA CORECTAMENTE"
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
        this.nombre=""
        this.descripcion=""
        this.ubicacion=""
      },
      save () {
        
        let me=this
        if (this.editedIndex === -1) {
         let header = {headers :{"token": this.$store.state.token}};
         axios.post("materias",{
          nombre:this.nombre,
          descripcion:this.descripcion
         },header)
        .then(function() {
          console.log('Guardadndo')
          me.listarMaterias()
          me.limpiar()
          me.close()
          me.corecto="MATERIA GUARDADA CORECTAMENTE"
          me.msjAlerta(me.corecto)   
        }).catch((error) => {
          console.log(error.msg)
          this.mensaje1=error.response.data.errors[0].msg
          this.error(this.mensaje1)
        });
        } else {
       
          let header = {headers :{"token": this.$store.state.token}};
          axios.put(`materias/${this.id}`,{
          nombre:this.nombre,
          descripcion:this.descripcion
         },header)
        .then(function() {
          console.log('editando')
          me.listarMaterias()
          me.limpiar()
          me.close()
          me.corecto="MATERIA EDITADA CORECTAMENTE"
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