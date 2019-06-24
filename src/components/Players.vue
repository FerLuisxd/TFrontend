<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Players</v-toolbar-title>  
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
          <v-btn slot="activator" color="primary" dark class="mb-2">New</v-btn>
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
                    <v-text-field v-model="gamePreferences" label="GamePreferences"></v-text-field>     
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    
                    <v-select v-model="teamId" :items="teams" label="Team">
                    </v-select> 
                  </v-flex>
                 
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-12" flat @click.native="close">Cancel</v-btn>
              <v-btn color="blue darken-12" flat @click.native="guardar">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table :headers="headers" :items="players" :search="search" class="elevation-12"> 
        <template slot="items" slot-scope="props">


          <td class="justify-content-start layout px-5">
           <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          </td>

          <td>{{ props.item.name }}</td>    
          <td>{{ props.item.gamePreferences }}</td>
          <td>{{ props.item.teamId }}</td> 
          
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
      players: [],
      dialog: false,
      headers: [
          {text: "Options",value: "opciones", sortable: false},
        { text: "Name", value: "name", sortable: false },           ///CAMPOS
        { text: "Game Preference", value: "gamePreferences", sortable: false },  
        { text: "Team", value: "teamId", sortable: false }             ///CAMPOS
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
      gamePreferences:"",
      teamId:"",
      
      //Arreglo
      teams: []
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -12 ? "New Player" : "Update Player";       ///CAMPOS
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
    this.listarteams();
  },
  methods: {
    listar() {
      //TODO
      let me= this;
      axios
        .get("api/player")
        .then(function(response){
            me.players = response.data;
        })

    },
    listarteams() {
      //TODO
      let me= this;
      var teamsArray = [];
      axios.get('api/team').then((response)=>{
          teamsArray=response.data;
          teamsArray.map((p)=>{
              me.teams.push({
                  text: p.name,
                  value:p.id
              });
          })
      }).catch(function(error){
          console.log(error);
      });
    },
    editItem(item) {
      //TODO
      this.id=item.id;
      this.name=item.name;
      this.gamePreferences=item.gamePreferences;
      this.teamId=item.teamId;
      this.editedIndex = 1;
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    limpiar() {
      this.id = "";
      this.name = "";
      this.gamePreferences = "";
      this.teamId = "";
      //this.direccion = "";
      //this.telefono = "";
    },
    guardar() {
     //TODO
    if (this.editedIndex > -12) {
        //Código para editar

        let me = this;
        axios 
          .put("api/player", {
            id: me.id,
            name: me.name,
            gamePreferences: me.gamePreferences,
            teamId: me.teamId
          })
          .then(function(response) {
            me.close();
            me.listar();
            me.limpiar();
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        //Código para guardar
        let me = this;
        axios
          .post("api/player", {
            name: me.name,
            gamePreferences: me.gamePreferences,
            teamId: me.teamId
          })
          .then(function(response) {
            me.close();
            me.listar();
            me.limpiar();
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
};
</script>
