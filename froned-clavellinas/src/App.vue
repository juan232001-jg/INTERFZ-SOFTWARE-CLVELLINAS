<template>

    <!-- :style="{background: $vuetify.theme.themes.light.background}" -->
    
  
    <v-app >
      <v-toolbar
      color="teal accent-4"
      ></v-toolbar>
  
    <Menu/>
      
  <v-toolbar
   color="teal accent-4"
  
  > <v-card-text class="py-0 white--text text-center">
  <strong>ARATOCA-SANTANDER</strong>--{{ new Date().getFullYear() }} 
  </v-card-text>
  </v-toolbar>
 <!-- <v-footer>
  <v-card
  class="flex" 
  flat 
  tile 
  style="margin:auto;"
  >
  <v-card-title class="teal accent-4"  >
  <v-card-text class="py-0 white--text text-center">
  <strong>ARATOCA-SANTANDER</strong>--{{ new Date().getFullYear() }} 
  </v-card-text>
  </v-card-title >
  </v-card>
  </v-footer>  -->
  </v-app>

  
</template>

<script>
import Menu from './views/Menu.vue'

export default {
  name: 'App',
  components:{
Menu,
},

  data: () => ({
    //
  }),
};
</script>
