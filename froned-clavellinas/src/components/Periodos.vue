<template>
  <v-data-table
    :headers="headers"
    :items="periodos"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>PERIODOS</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="700px"
   
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="teal accent-4"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nuevo Periodo
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>

                  <v-col
                    cols="12"
                    sm="10"
                    md="4"
                  >
                    <v-text-field
                      :rules="nombrePeriodo1"
                      :counter="20"
                      v-model="nombrePeriodo"
                      label="NOMBRE PERIODO"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                    :rules="nuemeroPeriodo1"
                    :counter="3"
                      v-model="nuemeroPeriodo"
                      label="NUMERO PERIODO"
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
              <v-btn
                class="ma-2"
                color="teal accent-4"
               :disabled="dessavilitar"
                @click="save"
              >
               Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">ESTA SEGURO DE QUE QUIERE ELIMINAR {{nombrePeriodo}}?</v-card-title>
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
</template>
<script>

import axios from 'axios'
import Swal from 'sweetalert2'

  export default {
    data: () => ({
      id:'',
      dialog: false,
      corecto:"",
      nombrePeriodo:'',
      mensaje1:"",
      valor:"",
      nuemeroPeriodo:'',
      periodos:[],
      dialogDelete: false,
      headers: [
        {text: 'NOMBRE',align: 'start',sortable: false,value: 'nombrePeriodo'},
        { text: 'NUMERO', value: 'nuemeroPeriodo' },
        { text: 'FECHA', value: 'createdAt' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      nombrePeriodo1:[
         v => !!v || 'EL NOMBRE DEL PERIODO ES REQUERIDO',
        v => v.length <= 20 || 'EL NOMBRE DEL PERIODO DEBE TENER MENOS DE 20 CARACTERES',
      ],
      nuemeroPeriodo1:[
        v => !!v || 'EL NUMERO DEL PERIODO ES REQUERIDO',
        v => v.length <= 3 || 'EL NUMERO DEL PERIODO DEBE TENER MENOS DE 3 CARACTERES',
      ],
      
      editedIndex: -1,
     
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'NUEVO PERIODO' : 'EDITAR PERIODO'
      },
      dessavilitar(){
        return this.nombrePeriodo.length===0 || this.nuemeroPeriodo.length=== 0
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
      this.listarperiodos()
    },

    methods: {
    error:function(texto){
        Swal.fire({
        icon: 'error',
        title: 'NOMBRE DE PERIODO',
        text: texto,
    })

    },
        error1:function(texto){
        Swal.fire({
        icon: 'error',
        title: 'NUMERO DE PERIODO',
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
      listarperiodos(){
         let header = {headers :{"token": this.$store.state.token}};
        axios.get("periodos",header)
        .then((reponse) => {
          console.log(reponse.data.periodos)
          this.periodos=reponse.data.periodos
        }).catch((error) => {
          console.log(error.msg)
        });
      
      },
   

      editItem (item) {
        this.id=item._id
        this.editedIndex=0
        this.nombrePeriodo=item.nombrePeriodo,
        this.nuemeroPeriodo=item.nuemeroPeriodo
        this.dialog = true
      },

      deleteItem (item) {
        this.nombrePeriodo=item.nombrePeriodo
        this.editedIndex = 0
        this.id =item._id 
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        let me =this
        let header = {headers :{"token": this.$store.state.token}};
          axios.delete(`periodos/${this.id}`,header)
        .then(function() {
          me.listarperiodos()
          me.close()
          me.corecto="PERIODO ELIMINADO CORECTAMENTE"
          me.msjAlerta(me.corecto)
          }).catch((error) => {
          console.log(error.msg)
        });
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.limpiar()
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.limpiar()
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      limpiar(){
        this.id=''
        this.nombrePeriodo=''
        this.nuemeroPeriodo=''
      },

      save () {
        let me =this
        if (this.editedIndex === -1) {
          let header = {headers :{"token": this.$store.state.token}};
          axios.post("periodos",{
          nombrePeriodo:this.nombrePeriodo,
          nuemeroPeriodo:this.nuemeroPeriodo 
         },header)
        .then(function() {
          me.listarperiodos()
          me.close()
          me.limpiar()
          me.corecto="PERIODO GUARDADO CORECTAMENTE"
          me.msjAlerta(me.corecto)
          }).catch((error) => {
          // console.log(error.msg)
          this.valor=error.response.data.errors[0].param   
          console.log(this.valor)     
          if (this.valor=="nuemeroPeriodo") {
          this.mensaje1=error.response.data.errors[0].msg
          this.error1(this.mensaje1)
          }else{
          this.mensaje1=error.response.data.errors[0].msg
          this.error(this.mensaje1)
          }
          
        });
        } else {
        let header = {headers :{"token": this.$store.state.token}};
          axios.put(`periodos/${this.id}`,{
          nombrePeriodo:this.nombrePeriodo,
          nuemeroPeriodo:this.nuemeroPeriodo 
         },header)
        .then(function() {
          console.log('editanmdo')
          me.listarperiodos()
          me.close()
          me.corecto="PERIODO EDITADO CORECTAMENTE"
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