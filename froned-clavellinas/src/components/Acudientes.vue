<template>
<div >
  <v-data-table
    :search="search"
    :headers="headers"
    :items="acudientes"
    sort-by="calories"
    class="elevation-1"
  >
   
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title >ACUDIENTES</v-toolbar-title>
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
              Nuevo ACUDIENTE
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
                      :rules="nombreComplecto1"
                      :counter="50"
                      v-model="nombreComplecto"
                      label="NOMBRE COMPLETO"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                       riquered
                       type="number"
                       :rules=" numeroDocuemnto1"
                      v-model="numeroDocuemnto"
                      label="NUMERO DE DOCUMENTO"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                       riquered
                       :counter="30"
                       :rules="tipoDocuemneto1"
                      v-model="tipoDocuemneto"
                      label="TIPO DE DOCUMENTO"
                    ></v-text-field>
                  </v-col>   
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                       riquered
                       :counter="30"
                       :rules="dirrecion1"
                      v-model="dirrecion"
                      label="DIRRECION"
                    ></v-text-field>
                  </v-col>    
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                       riquered
                       :counter="30"
                       :rules="email1"
                      v-model="email"
                      label="EMAIL"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      require
                      type="number"
                      :rules="telefono1"
                      v-model="telefono"
                      label="TELEFONO"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      required
                      type='number'
                      :rules="telefonoalterno1"
                      v-model="telefonoalterno"
                      label="TELEFONO ALTERNO"
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
            <v-card-title class="text-h5">ESTAS SEGURO DE QUE QUIERES ELIMINAR EL ACUDIENTE {{nombreComplecto}} CON NUEMRO DE DOCUEMENTO {{numeroDocuemnto}}?</v-card-title>
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
      id:'',
      corecto:"",
      mensaje1:"",
      nombreComplecto:'',
      numeroDocuemnto:'',
      dirrecion:'',
      telefono:'',
      tipoDocuemneto:'',
      telefonoalterno:'',
      email:'',
      dialog: false,
      dialogDelete: false,
      acudientes:[],
      components: {},
      headers: [
        {text: 'NOMBRE COMPLETO',align: 'nombreComplecto',sortable: false,value: 'nombreComplecto'},
        { text: 'NUMERO DE DOCUMENTO', value: 'numeroDocuemnto' },
        { text: 'DIRECION', value: 'dirrecion' },
        { text: 'TIPO DE DOCUMENTO', value: 'tipoDocuemneto' },
        { text: 'TELEFONO', value: 'telefono' },
        { text: 'EMAIL', value: 'email' },
        { text: 'TELEFONO ALTERNO', value: 'telefonoalterno' },
        { text: 'FECHA', value: 'createdAt' },
        { text: 'OPCIONES', value: 'actions', sortable: false },
       
      ],   
      headers1: [
        {text: 'NOMBRE COMPLETO',align: 'nombreComplecto',sortable: false,value: 'nombreComplecto'},
        { text: 'NUMERO DE DOCUMENTO', value: 'numeroDocuemnto' },
      ],
      editedIndex: -1,
       nombreComplecto1: [
        v => !!v || 'EL NOMBRE DEL ACUDIENTE ES REQUERIDO',
        v => v.length <= 50 || 'EL NOMBRE DEL ACUDIENTE DEBE TENER MENOS DE 50 CARACTERES',
      ],
        numeroDocuemnto1: [
        v => !!v || 'EL NUMERO DE DOCUMENTO ES REQUERIDO',
        
      ],
        dirrecion1: [
        v => !!v || 'LA DIRRCION DEL ACUDIENTE ES REQUERIDO',
        v => v.length <= 30 || 'LA DIRRECION DEL ACUDEINTE DEBE TENER MENOS DE 30 CARACTERES',
      ],
      tipoDocuemneto1:[
        v => !!v || 'EL TIPO DE DOCUEMNTO  ES REQUERIDO',
        v => v.length <= 30 || 'EL TIPO DE DOCUMENTO DEBE TENER MENOS DE 30 CARACTERES',
      ],
      telefonoalterno1:[
        v => !!v || 'EL TELEFONO  ALTERNO  ES REQUERIDO',
        
      ],
      email1:[
        v => !!v || 'EL EMAIL DEL ACUDEINTE   ES REQUERIDO',
        v => v.length <= 30 || 'EL EMAIL DEL ACUDEINTE TENER MENOS DE 30 CARACTERES',
      ],
      telefono1:[
        v => !!v || 'EL TELEFONO DEL ACUDIENTE  ES REQUERIDO',
        
      ]


    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'NUEVA SEDE' : 'EDITAR SEDE'

      },
      dessavilitar(){
        return this.nombreComplecto.length===0 || this.numeroDocuemnto.length=== 0 || this.dirrecion.length===0 || this.tipoDocuemneto.length===0 || this.telefonoalterno.length===0 ||this.email.length===0 || this.telefono.length===0
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
      this.listarAcudiente()
    },

    methods: {
      error:function(texto){
 
      Swal.fire({
        icon: 'error',
        title: 'NUEMERO DE DOCUMENTO',
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
      listarAcudiente(){
         let header = {headers :{"token": this.$store.state.token}};
        axios.get("acudientes",header)
        .then((reponse) => {
          this.acudientes=reponse.data.acudientes
        }).catch((error) => {
          console.log(error.msg)
        });
      },

      editItem (item) {
        this.id=item._id
        this.editedIndex = 0
        this.nombreComplecto=item.nombreComplecto
        this.dirrecion=item.dirrecion
        this.numeroDocuemnto=item.numeroDocuemnto
        this.dirrecion=item.dirrecion
        this.tipoDocuemneto=item.tipoDocuemneto
        this.telefono=item.telefono
        this.telefonoalterno=item.telefonoalterno
        this.email=item.email
        this.dialog = true
      },

      deleteItem (item) {
        this.nombreComplecto=item.nombreComplecto
        this.numeroDocuemnto=item.numeroDocuemnto
        this.dialogDelete = true
        this.id=item._id
        this.editedIndex = 0
       
        
      },

      deleteItemConfirm () {
        console.log(this.id)
        let me =this
         let header = {headers :{"token": this.$store.state.token}};
          axios.delete(`acudientes/${this.id}`,header)
        .then(function() {
          me.listarAcudiente()
          me.closeDelete()
          me.corecto="ACUDIENTE ELIMINADO CORECTAMENTE"
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
      this.nombreComplecto=''
      this.numeroDocuemnto=''
      this.dirrecion=''
      this.telefono=''
      this.tipoDocuemneto=''
      this.telefonoalterno=''
      this.email=''
      },

      save () {
        
        let me=this
        if (this.editedIndex === -1) {
         let header = {headers :{"token": this.$store.state.token}};
         axios.post("acudientes",{
            nombreComplecto:this.nombreComplecto,
            numeroDocuemnto:this.numeroDocuemnto,
            dirrecion:this.dirrecion,
            telefono:this.telefono,
            tipoDocuemneto:this.tipoDocuemneto,
            telefonoalterno:this.telefonoalterno,
            email:this.email
         },header)
        .then(function() {
          console.log('Guardadndo')
          me.listarAcudiente()
          me.limpiar()
          me.close()
          me.corecto="ACUDIENTE GUARDADO CORECTAMENTE"
          me.msjAlerta(me.corecto)
        }).catch((error) => {
          this.mensaje1=error.response.data.errors[0].msg
          this.error(this.mensaje1)
        });
        } else {
       
          let header = {headers :{"token": this.$store.state.token}};
          axios.put(`acudientes/${this.id}`,{
            nombreComplecto:this.nombreComplecto,
            numeroDocuemnto:this.numeroDocuemnto,
            dirrecion:this.dirrecion,
            telefono:this.telefono,
            tipoDocuemneto:this.tipoDocuemneto,
            telefonoalterno:this.telefonoalterno,
            email:this.email
         },header)
        .then(function() {
          console.log('editando')
          me.listarAcudiente()
          me.limpiar()
          me.close()
          me.corecto="ACUDIENTE EDITADO CORECTAMENTE"
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