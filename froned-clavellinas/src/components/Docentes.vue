<template>
<div >
  <v-data-table
    :search="search"
    :headers="headers"
    :items="docentes"
    sort-by="calories"
    item-key="_id"
    class="elevation-1"
    :single-expand="singleExpand =true"
    show-expand
  >
   
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title >DOCENTES</v-toolbar-title>
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
         <template>
 

</template>
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
              Nuevo docente
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
                      :rules="nombres1"
                      :counter="30"
                      v-model="nombres"
                      label="NOMBRES"
                    ></v-text-field>
                  </v-col>
                   <v-col
                    cols="12"
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
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <v-text-field
                       riquered
                       type='number'
                       :rules="numeroDocumento1"
                      v-model="numeroDocumento"
                      label="NUMERO DE DOCUMENTO"
                    ></v-text-field>
                  </v-col>
                 
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                     <v-select
                     required
                      v-model="rol"
                      :items="roles"
                      label="ROL">
                      
                     </v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      required
                      :rules="fachaNacimiento1"
                      :counter="30"
                      v-model="fachaNacimiento"
                      label="FECHA DE NACIMIENTO"
                    ></v-text-field>
                    
                  </v-col>
                  <v-col
                    cols="12"
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
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      required
                      :rules="lugarRecidencia1"
                      :counter="30"
                      v-model="lugarRecidencia"
                      label="LUGAR DE RECIDENCIA"
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
                      :rules="usuario1"
                      v-model="usuario"
                      label="USUARIO"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      required
                      :rules="password1"
                      v-model="password"
                      :type="showpasword ?'text' : 'password'" 
                      :append-icon="showpasword ? 'mdi-eye' : 'mdi-eye-off'" 
                      @click:append="showpasword =!showpasword"
                      label="CONTASEÑA"
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
            <v-card-title class="text-h5">ESTAS SEGURO DE QUE QUIERES ELIMINAR ELIMINAR EL USUARIO {{nombres}} {{apellidos}}?</v-card-title>
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
          <template v-if="item.estado">
            <v-btn
            color="red"
            fab
            small 
            @click="activarDesactivarMostrar(1, item)"
            ><v-icon color="white">
             mdi-block-helper
            </v-icon>
            </v-btn>
            
          </template>
          <template v-else>
            <v-btn
            color="teal accent-4"
            fab
            small 
            @click="activarDesactivarMostrar(2, item)">
            <v-icon > mdi-check</v-icon>
            </v-btn>
          </template>
          
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
      <template v-slot:[`item.estado`]="{ item }">
          <div v-if="item.estado===1">
            <span class="teal--text">Activo</span>
          </div>
          <div v-if="item.estado===0">
            <span class="red--text">Inactivo</span>
          </div>
        </template>

    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>

    </template>
      <template style=" border: 2px solid teal"  v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.rol">
        <span  style="color:teal ">ROL</span>
         {{ item.rol }} 
      </td>
      <td  style="" :colspan="headers.usuario">
        <span style="color:teal ">USUARIO</span>
        {{ item.usuario }}
      </td>
      <td  style="" >
         <span style="color:teal ">TELEFONO</span>
          {{ item.telefono }}
      </td>
      <td  style="" >
         <span style="color:teal ">FECHA DE CREACION</span>
          {{ item.createdAt }}
      </td>
    </template>

    
  </v-data-table>
  
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2'

  export default {
    data: () => ({
     
      singleExpand: false,
      showpasword:false,
      dialog3:false,
      id:'',
      valor:'',
      corecto:"",
      mensaje1:"",
      nombreSede:"",
      numeroSede:"",
      ubicacion:"",
      nombres:'', 
      rol:'', 
      roles:['ADMIN_ROL','DOCENTE_ROL'],
      apellidos:'', 
      numeroDocumento:'', 
      telefono:'', 
      fachaNacimiento:'', 
      email:'', 
      lugarRecidencia:'', 
      genero:'', 
      usuario:'', 
      password:'',
      dialog: false,
      dialog1: false,
      dialogDelete: false,
      docentes:[],
      components: {},
       search: '',
      search1: '',
      sortBy: 'name',
      sortBy1: 'name',
      headers: [
        // { text: 'DETALLES'},
        {text: 'NOMBRES',align: 'nombres',sortable: false,value: 'nombres'},
        { text: 'APELLIDOS',align: 'apellidos',sortable: false, value: 'apellidos' },
        { text: 'NUMERO DE DOCUMENTO', value: 'numeroDocumento'},
        { text: 'FECHA NACIMIENTO', value: 'fachaNacimiento'},
        { text: 'EMAIL', value: 'email'},
        { text: 'LUGAR DE RECIDENCIA', value: 'lugarRecidencia'},
        { text: 'ESTADO', value: 'estado'},
        
        { text: 'OPCIONES', value: 'actions', sortable: false },
       
      ],
      headers1: [
        // { text: 'DETALLES'},
        {text: 'NOMBRES',align: 'nombres',sortable: false,value: 'nombres'},
        { text: 'APELLIDOS',align: 'apellidos',sortable: false, value: 'apellidos' },
        { text: 'NUMERO DE DOCUMENTO', value: 'numeroDocumento'},
      ],
      editedIndex: -1,
       nombres1: [
        v => !!v || 'LOS NOMBRES SON REQUERIDOS',
        v => v.length <= 30 || 'LOS NOMBRES DEBE TENER MENOS DE 30 CARACTERES',
      ],
       numeroDocumento1: [
        v => !!v || 'EL NUMERO DEL DOCUMENTO ES REQUERIDO',
      ],
        apellidos1: [
        v => !!v || 'LOS APELLIDOS SON REQUERIDOS',
        v => v.length <= 30 || 'LOS APELLIDOS DEBEN TENER MENOS DE 30 CARACTERES',
      ],
    fachaNacimiento1:[
        v => !!v || 'LA FECHA DE NACIMIENTO ES  REQUERIDA',
        v => v.length <= 30 || 'LA FECHA DE NACIMIENTO DEBEN TENER MENOS DE 30 CARACTERES',
      ],
      email1:[
        v => !!v || 'EL EMAIL ES  REQUERIDO',
        v => v.length <= 30 || 'EL EMAIL DEBEN TENER MENOS DE 30 CARACTERES',
      ],
      lugarRecidencia1:[
        v => !!v || 'EL LUGAR DE RECIDENCIA  ES  REQUERIDA',
        v => v.length <= 30 || 'EL LUGAR DE RECIDENCIA DEBEN TENER MENOS DE 30 CARACTERES',
      ],
      telefono1:[
        v => !!v || 'EL TELEFONO ES REQUERIDO',   
      ],
      usuario1:[
        v => !!v || 'EL USUARIO ES REQUERIDO',   
      ],
      password1:[
          v => !!v || 'LA CONTASEÑA ES REQUERIDO'
      ]

    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'NUEVO DOCENTE' : 'EDITAR DOCENTE'

      },
      dessavilitar(){
        return this.nombres.lengt===0 ||  this.rol.length===0 || this.apellidos.length===0 || this.numeroDocumento.length===0 || this.telefono.length===0 || this.fachaNacimiento.length===0 || this.email.length===0 || this.lugarRecidencia.length===0 ||  this.usuario.length===0 || this.password.length===0
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
      this.listarDocentes()
    },

    methods: {
       error:function(texto){
 
      Swal.fire({
        icon: 'error',
        title: 'NUMERO DE DOCUMENTO',
        text: texto,
    })

    },
         error1:function(texto){
 
      Swal.fire({
        icon: 'error',
        title: 'USUARIO',
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
      listarDocentes(){
         let header = {headers :{"token": this.$store.state.token}};
        axios.get("docentes",header)
        .then((reponse) => {
          // console.log(reponse.data.docente)
          this.docentes=reponse.data.docente
        }).catch((error) => {
          console.log('errosr')
          console.log(error)
        });
      },

      editItem (item) {
        this.id=item._id
        this.editedIndex = 0
       this.nombres=item.nombres, 
            this.rol=item.rol, 
            this.apellidos=item.apellidos, 
            this.numeroDocumento=item.numeroDocumento, 
            this.telefono=item.telefono, 
            this.fachaNacimiento=item.fachaNacimiento, 
            this.email=item.email, 
            this.lugarRecidencia=item.lugarRecidencia, 
            this.usuario=item.usuario, 
        this.dialog = true
      },

      deleteItem (item) {
        this.nombres=item.nombres
        this.apellidos=item.apellidos
        this.dialogDelete = true
        this.id=item._id
        this.editedIndex = 0
       
        
      },

      deleteItemConfirm () {
        console.log(this.id)
        let me =this
         let header = {headers :{"token": this.$store.state.token}};
          axios.delete(`docentes/${this.id}`,header)
        .then(function() {
          me.listarDocentes()
          me.closeDelete()
          me.corecto="DOCENTE ELIMINADO CORECTAMENTE"
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
      this.nombres='', 
      this.rol='', 
      this.apellidos='', 
      this.numeroDocumento='', 
      this.telefono='', 
      this.fachaNacimiento='', 
      this.email='', 
      this.lugarRecidencia='', 
      this.genero='', 
      this.usuario='', 
      this.password=''
      },

      save () {
        
        let me=this
        if (this.editedIndex === -1) {
            console.log('Guardadndo')
         let header = {headers :{"token": this.$store.state.token}};
         axios.post("docentes",{
            nombres:this.nombres, 
            rol:this.rol, 
            apellidos:this.apellidos, 
            numeroDocumento:this.numeroDocumento, 
            telefono:this.telefono, 
            fachaNacimiento:this.fachaNacimiento, 
            email:this.email, 
            lugarRecidencia:this.lugarRecidencia, 
            usuario:this.usuario, 
            password:this.password,
         },header)
        .then(function() {
          console.log('error')
          me.listarDocentes()
          me.limpiar()
          me.close()
          me.corecto="DOCENTE GUARDADO CORECTAMENTE"
          me.msjAlerta(me.corecto)
        }).catch((error) => {
          this.valor=error.response.data.errors[0].param
          if (this.valor==='numeroDocumento') {
          this.mensaje1=error.response.data.errors[0].msg
          this.error(this.mensaje1)  
          }
          else{
          this.mensaje1=error.response.data.errors[0].msg
          this.error1(this.mensaje1)
          }
           
        });
        } else {
       
          let header = {headers :{"token": this.$store.state.token}};
          axios.put(`docentes/${this.id}`,{
           nombres:this.nombres, 
            rol:this.rol, 
            apellidos:this.apellidos, 
            numeroDocumento:this.numeroDocumento, 
            telefono:this.telefono, 
            fachaNacimiento:this.fachaNacimiento, 
            email:this.email, 
            lugarRecidencia:this.lugarRecidencia, 
            usuario:this.usuario, 
            password:this.password,
         },header)
        .then(function() {
          console.log('editando')
          me.listarDocentes()
          me.limpiar()
          me.close()
          me.corecto="DOCENTE EDITADO CORECTAMENTE"
          me.msjAlerta(me.corecto)
        }).catch((error) => {
          console.log(error.msg)
        });
        }
        this.close()
      },
      activarDesactivarMostrar(accion,item) {
                let id=item._id
                console.log(id)
                if (accion==1) {
                  let me=this
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.put(`docentes/desactivar/${id}`,{estado:0},header) 
                  .then(function() {
                    me.listarDocentes();
                    me.limpiar()
                    me.corecto="DOCENTE FUE INACTIVADO CORECTAMENTE"
          me.msjAlerta(me.corecto)
                  }) 
                  .catch(function (error){
                    console.log(error)
                  })
                }else if (accion==2) {
                  let me=this
                  let header = {headers :{"token": this.$store.state.token}};
                  axios.put(`docentes/activar/${id}`,{estado:1},header) 
                  .then(function() {
                    me.listarDocentes();
                    me.listarDocentes()
                    me.corecto="DOCENTE FUE ACTIVADO CORECTAMENTE"
                    me.msjAlerta(me.corecto)
                  }) 
                  .catch(function (error){
                    console.log(error)
                  })
                }
              },
    },
  }
</script>
<style>

    th { font-weight: bold; color:chartreuse }
    

  /* td { */

  /* table-layout: fixed; */
  /* width: 100%; */
  /* border-collapse: collapse;
  border: 2px solid teal ;
} */
</style>