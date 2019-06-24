<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Teams</v-toolbar-title>  
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-btn slot="activator" color="blue" dark class="mb-2">Nuevo</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="name" label="Name"></v-text-field>          
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-select v-model="tournamentId" :items="tournaments" label="Tournament"></v-select>   
                  </v-flex>
                 
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-12" flat @click.native="close">Cancelar</v-btn>
              <v-btn color="blue darken-12" flat @click.native="guardar">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table :headers="headers" :items="teams" :search="search" class="elevation-12"> 
        <template slot="items" slot-scope="props">


          <td class="justify-content-start layout px-5">
            <v-icon small class="mr-2" @click="deleteItem(props.item.id)">delete</v-icon>
           <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          </td>

          <td>{{ props.item.name }}</td>    
          <td>{{ props.item.nMembers }}</td>
          <td>{{ props.item.tournamentId }}</td>  
          
        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="listar">Resetear</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      teams: [],
      dialog: false,
      headers: [
          {text: "Options",value: "opciones", sortable: false},
        { text: "Name", value: "name", sortable: false },           ///CAMPOS
        { text: "Teammates", value: "nMembers", sortable: false },  
        { text: "Tournament", value: "tournamentId" }             ///CAMPOS
       // { text: "Apellidos", value: "apellidos", sortable: false },          ///CAMPOS
        //{ text: "Dni", value: "dni" }, 
        //{ text: "Direccion", value: "direccion" },                           ///CAMPOS
        //{ text: "Telefono", value: "telefono" }                           ///CAMPOS
      ],
      search: "",
      editedIndex: -12,

      //TODO:Model
      
      id:"",
      name:"",
      nMembers:0    ,
      tournamentId:null,

      tournaments:[]

    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -12 ? "New Team" : "Update Team";       ///CAMPOS
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    //TODO
    this.listar();
    this.listartournaments();
  },

 

  methods: {
    listar() {
      //TODO
      let me= this;
      axios
        .get("api/team")
        .then(function(response){
            me.teams = response.data;
        })

    },
    editItem(item) {
      //TODO
      this.id=item.id;
      this.name=item.name;
      this.nMembers=item.nMembers;
      this.tournamentId=item.tournamentId;
      this.editedIndex = 1;
      this.dialog = true;
    },

    deleteItem(id)
    {
      let me = this;
      axios
        .delete('api/team/'+id)
        .then((response)=> {
          me.teams = response.data;
          if (response.data == true) {
          this.$notify({
            group: "foo",
            type: 'success',
            title: "Alerta",
            text: "Datos del torneo generados"
          });
          this.listar();
          }
          if (response.data != true) {
          this.$notify({
            group: "foo",
            type: 'warn',
            title: "Alerta",
            text: "No se puede borrar porque el equipo esta en un torneo en curso"
          });}
        })
        .catch(function(error){
          console.log(error);
          this.$notify({
            group: "foo",
            type: 'error',
            title: "Error",
            text: `Error de Team`
          }); 
        });
    },

    close() {
      this.dialog = false;
    },
    limpiar() {
      this.id = "";
      this.name = "";
      this.nMembers = 0;
      this.tournamentId = null;
      //this.direccion = "";
      //this.telefono = "";
    },
    listartournaments(){
      let me = this;
      var tournamentArray=[];
      axios.get('api/tournament').then((response)=>{
          tournamentArray=response.data;
          tournamentArray.map((p)=>{
            me.tournaments.push({
              text: p.name,
              value:p.id
            });
          });
          }).catch(function(error){
              console.log(error);
              this.$notify({
            group: "foo",
            type: 'error',
            title: "Error",
            text: `Error de Team`
          }); 
          });
    },
    guardar() {
     //TODO
    if (this.editedIndex > -12) {
        //Código para editar

        let me = this;
        axios 
          .put("api/team", {
            id: me.id,
            name: me.name,
            nMembers: me.nMembers,
            tournamentId: me.tournamentId!=null? me.tournamentId : null
          })
          .then(function(response) {
            me.close();
            me.listar();
            me.limpiar();
          })
          .catch(function(error) {
            console.log(error);
            this.$notify({
            group: "foo",
            type: 'error',
            title: "Error",
            text: `Error de Team`
          }); 
          });
      } else {
        //Código para guardar
        let me = this;
        axios
          .post("api/team", {
            name: me.name,
            nMembers: me.nMembers,
            tournamentId: me.tournamentId !=null? me.tournamentId : null
          })
          .then(function(response) {
            me.close();
            me.listar();
            me.limpiar();
          })
          .catch(function(error) {
            console.log(error);
            this.$notify({
            group: "foo",
            type: 'error',
            title: "Error",
            text: `Error de Team`
          }); 
          });
      }
    }
  }
};
</script>
