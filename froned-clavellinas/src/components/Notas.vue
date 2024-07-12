<template>
<div >
  <v-data-table
    :search="search"
    :headers="headers"
    :items="notas"
    sort-by="calories"
    class="elevation-1"
  >
  
   

    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title >NOTAS</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
       
        <v-spacer></v-spacer>
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
              :items="headers4"
              prepend-inner-icon="mdi-magnify"
              label="Modo de Busqueda "
            ></v-select>
           
        
          </template>


       <!-- dioalogo para los estudiantes -->
                <v-row justify="center">
            <v-dialog
              v-model="dialog1"
              persistent
              max-width="auto"
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
                :headers="headers1"
                :items="estudoiates"
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
            @click="dialog1=false"
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
          <!--dialogo de formulario -->
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
              Nueva nota
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
             
                >  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                   <v-btn
                        color="teal accent-4"
                        class="ma-2 white--text"
                        @click="dialog1=true"
                      >
                        SELECIONE ESTUDIANTE
                      
                      </v-btn>
                  </v-col>
                  <v-col
                    cols="20"
                    sm="6"
                    md="4"
                  >
                   <v-select
                      
                      :items="todasMaterias"
                      required
                      :rules="materia1"
                       v-model="materia"
                      label="MATERIA"
                    >
                    </v-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                       <v-select
                      
                      :items="valores"
                      required
                      :rules="nota1"
                       v-model="nota"
                      label="SELECIONE LA NOTA"
                    >
                    </v-select>
                  </v-col>
                  
                   <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                       <v-select
                      
                      :items="periodos"
                      required
                      :rules="periodo1"
                       v-model="periodo"
                      label="SELECIONE EL PERIODO"
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
        <v-col cols="auto">
      <v-dialog
      v-model="dialog2"
        transition="dialog-bottom-transition"
        max-width="600"
      >
       
      
          <v-card>
            <v-toolbar
              color="teal accent-4"
              dark
            >REGISTRO DE TODAS LAS NOTAS REGISTRADAS DE  {{nombre}} {{apellidos}} </v-toolbar>
            
              
    <v-data-table
 
    :headers="headers3"
    :items="notasEstudiantes"
    hide-default-header
    hide-default-footer
    class="elevation-1"
  ></v-data-table>

            <v-card-actions class="justify-end">
              <v-btn
                color="teal accent-4"
                @click="dialog2 = false"
              >Cerrar</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>
    </v-col>

        <!-- dilago ´para eliminar nota -->
        <v-dialog v-model="dialogDelete" max-width="auto">
          <v-card>
            <v-card-title class="text-h5">ESTAS SEGURO DE QUE QUIERES ELIMINAR LA NOTA DE ETUDIANTE {{nombreSede}} DE LA MATERIA {{materia}} ?</v-card-title>
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
    <!-- para eliminar y modificar -->
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
      <template v-slot:[`item.opcion`]="{ item }">
        
       <v-btn
      class="mx-1"
      fab
      small
      color="teal accent-4"
      @click="notasEstudiante(item)"
    >
      <v-icon color="white">fa-bars</v-icon>
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
      nombre:'',
      apellidos:'',
      nombreSede:"",
      numeroSede:"",
      ubicacion:"",
      materia:"", 
      anoCurso:"", 
      periodo:"", 
      nota:"", 
      profesor:"",
      dialog: false,
      dialog1:false,
      dialog2:false,
      estudoiates:[],
      dialogDelete: false,
      selected:[],
      notas:[],
      notasEstudiantes:[],
      periodos:[],
      valores:['1.0','1.2','1.3','1.4','1.5','1.6','1.7','1.8','1.9','2.0','2.1','2.2','2.3','2.4','2.5','2.6','2.7','2.8','2.9','3.0','3.1','3.2','3.3','3.5','3.5','3.6','3.7','3.8','3.9','4.0','4.1','4.2','4.3','4.4','4.5','4.6','4.7','4.8','4.9','5.0'],
      components: {},
      todasMaterias:[],
      headers: [
        { text: 'REGISTRO NOTAS', value: 'opcion', sortable: false },
        {text: 'MATERIA',align: '',sortable: false,value: 'materia.nombre'},
        { text: 'NOMBRE ESTUDISNTE', value: 'anoCurso.nombreEtudiante.nombre' },
        { text: 'APELLIDOS', value: 'anoCurso.nombreEtudiante.apellidos' },
        { text: 'NUMEROO DE DUCUMENTO', value: 'anoCurso.nombreEtudiante.numeroDocuemnto' },
        { text: 'PERIODO', value: 'periodo.nombrePeriodo' },
        { text: 'NOTA', value: 'nota' },
        { text: 'FECHA', value: 'createdAt' },
        { text: 'OPCIONES', value: 'actions', sortable: false },
       
      ],
         headers4: [
        { text: 'NOMBRE ESTUDISNTE', value: 'anoCurso.nombreEtudiante.nombre' },
        { text: 'APELLIDOS', value: 'anoCurso.nombreEtudiante.apellidos' },
        { text: 'NUMEROO DE DUCUMENTO', value: 'anoCurso.nombreEtudiante.numeroDocuemnto' },
      ],

      headers3: [
        { text: 'PERIODO', value: 'periodo.nombrePeriodo' },
        {text: 'MATERIA',align: '',sortable: false,value: 'materia.nombre'},
        { text: 'NOTA', value: 'nota' },
        { text: 'FECHA', value: 'createdAt' }
      ],
        headers1: [
        {text: 'CURSO',align: 'curso',sortable: false,value: 'curso.nombreCurso'},
        { text: 'NOMBRE ESTUDIANTE', value: 'nombreEtudiante.nombre' },
        { text: 'APELLIDOS ESTUDIANTE', value: 'nombreEtudiante.apellidos' },
        { text: 'NUMERO DE DOCUMENTO', value: 'nombreEtudiante.numeroDocuemnto' },
        { text: 'SEDE', value: 'sede.nombreSede' },
        { text: 'AÑO', value: 'ano' },       
      ],
      headers2: [
        {text: 'CURSO',align: 'curso',sortable: false,value: 'curso.nombreCurso'},
        { text: 'NOMBRE ESTUDIANTE', value: 'nombreEtudiante.nombre' },
        { text: 'NUMERO DE DOCUMENTO', value: 'nombreEtudiante.numeroDocuemnto' },
        { text: 'SEDE', value: 'sede.nombreSede' },
        { text: 'AÑO', value: 'ano' },       
      ],
      editedIndex: -1,
       materia1: [
        v => !!v || 'LA MATERIA ES REQUERIDA',
        
      ],
       periodo1: [
        v => !!v || 'EL PERIODO ES REQUERIDO',
     
    
      ],
        nota1: [
        v => !!v || 'LA NOTA ES REQUERIDA',
        
      ],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'NUEVA NOTA?' : 'EDITAR NOTA'

      },
      dessavilitar(){
        return this.nota.length===0 || this.materia.length=== 0 || this.periodo.length===0 || this.selected===[]
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
      this.listarNotas()
      this.listarMaterias()
      this.listarAnocurso()
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
      notasEstudiante(item){
        this.nombre=item.anoCurso.nombreEtudiante.nombre
        this.apellidos=item.anoCurso.nombreEtudiante.apellidos
        this.dialog2=true
        let id=item.anoCurso._id
        console.log(id)
        let header = {headers :{"token": this.$store.state.token}};
        axios.get(`notas?value=${id}`,header)
        .then((reponse) => {
          console.log(reponse.data)
          this.notasEstudiantes=reponse.data.notas
          console.log(this.notasEstudiantes)
   }).catch((error) => {
          console.log(error.msg)
        });

      },
      listarperiodos(){
          let array=[]
         let me=this
         let header = {headers :{"token": this.$store.state.token}};
        axios.get("periodos",header)
        .then((reponse) => {
           array=reponse.data.periodos
          array.map(function(x){
            me.periodos.push({text:x.nombrePeriodo,value:x._id})
          })
        }).catch((error) => {
          console.log(error.msg)
        });
      
      },
      listarAnocurso(){
        
         let header = {headers :{"token": this.$store.state.token}};
        axios.get("anocurso",header)
        .then((reponse) => {
          this.estudoiates=reponse.data.anosNuevo
       
        }).catch((error) => {
          console.log(error.msg)
        });
      },
      listarMaterias(){
         let array=[]
         let me=this
         let header = {headers :{"token": this.$store.state.token}};
        axios.get("materias",header)
          .then((reponse) => {
          array=reponse.data.materias
          array.map(function(x){
            me.todasMaterias.push({text:x.nombre,value:x._id})
          })
          
        }).catch((error) => {
          console.log(error.msg)
        });
      },
      listarNotas(){
         let header = {headers :{"token": this.$store.state.token}};
        axios.get("notas",header)
        .then((reponse) => {
          console.log(reponse.data)
          this.notas=reponse.data.datos
        }).catch((error) => {
          console.log(error.msg)
        });
      },

      editItem(item) {
        this.id=item._id
        this.editedIndex = 0
        this.materia=item.materia._id
        this.periodo=item.periodo._id
        this.nota=item.nota
        this.selected[0]=item.anoCurso
        this.dialog = true
      },

      deleteItem (item) {
        this.nombreSede=item.anoCurso.nombreEtudiante.nombre
        this.materia=item.materia.nombre
        this.dialogDelete = true
        this.id=item._id
        this.editedIndex = 0
       
        
      },

      deleteItemConfirm () {
        console.log(this.id)
        let me =this
         let header = {headers :{"token": this.$store.state.token}};
          axios.delete(`notas/${this.id}`,header)
        .then(function() {
          me.listarNotas()
          me.closeDelete()
          me.corecto="NOTA ELIMINADA CORECTAMENTE"
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
       this.nota='',
       this.materia='',
       this.selected=[]
       this.periodo=''
      },

      save () {
        
        let me=this
        if (this.editedIndex === -1) {
         let header = {headers :{"token": this.$store.state.token}};
         axios.post("notas",{
          nota:this.nota,
          materia:this.materia,
          periodo:this.periodo,
          anoCurso:this.selected[0]._id
         },header)
        .then(function() {
          console.log('Guardadndo')
          me.listarNotas()
          me.limpiar()
          me.close()
          me.corecto="NOTA GUARDADA CORECTAMENTE"
          me.msjAlerta(me.corecto)
        }).catch((error) => {
          console.log(error.msg)
        });
        } else {
       
          let header = {headers :{"token": this.$store.state.token}};
          axios.put(`notas/${this.id}`,{
          nota:this.nota,
          materia:this.materia,
          periodo:this.periodo,
          anoCurso:this.selected[0]._id
         },header)
        .then(function() {
          console.log('editando')
          me.listarNotas()
          me.limpiar()
          me.close()
          me.corecto="NOTA EDITADA CORECTAMENTE"
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