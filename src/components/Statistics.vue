<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="gray">
        <v-toolbar-title>Statistics</v-toolbar-title>
        
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
        <v-btn slot="activator" color="blue" dark class="mb-2">Filtrar</v-btn>
        
         <v-card>
             <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="xkills" label="Kills"></v-text-field>
                    <v-text-field v-model="xdeaths" label="Deaths"></v-text-field>
                    <v-text-field v-model="xassists" label="Assists"></v-text-field>
                    <v-text-field v-model="xdamage" label="Damage"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

             <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="filtrar(xkills, xdeaths, xassists, xdamage)">Filtrar</v-btn>
              <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            </v-card-actions>

         </v-card>
        </v-dialog>


      </v-toolbar>
      <v-data-table :headers="headers" :items="statistics" :search="search" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.matchId }}</td>
          <td>{{ props.item.playerName }}</td>
          <td>{{ props.item.kills }}</td>
          <td>{{ props.item.deaths }}</td>
          <td>{{ props.item.assists }}</td>
          <td>{{ props.item.damage }}</td>
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
  data(){      
    return { 
      statistics: [],      
      dialog: false,
      headers: [
        { text: "Match", value: "matchId", sortable: true },
        { text: "Player", value: "playerName", sortable: true },
        { text: "Kills", value: "kills", sortable: false },
        { text: "Deaths", value: "deaths" , sortable: false},
        { text: "Assists", value: "assists", sortable: false },
        { text: "Damage", value: "damage", sortable: false },
      ],
      search: "",
      editedIndex: -1,

      //Model
      id: "",
      matchid: "",
      playerId: "",
      kills: "",
      deaths: "",
      assists: "",
      damage: "", 
      xkills:"",
      xdeaths:"",
      xassists:"",
      xdamage:"",

      //Arreglos
      players: []
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Tournament" : "Update Tournament";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.listar();
    this.listarplayers();
  },
  methods: {
    listar() {
      let me = this;
      axios
        .get("api/statistics")
        .then(function(response) {
          console.log(response);
          me.statistics = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    filtrar(xkills, xdeaths, xassits, xdamage) {
  
        let me = this;
        let obj = {}
        obj.kills = xkills ? xkills :0 
        obj.deaths = xdeaths ? xdeaths : 0
        obj.asssists = xassits ? xassits :0
        obj.damage = xdamage ? xdamage :0
        console.log(obj)
      axios
        .post('api/statistics/params',obj)
        .then((response)=> {
                console.log(response)
                me.statistics = response.data;
        })
        .catch(function(error){
            console.log(error);
        });
    },

    editItem(item) {
      
    },

  

    close() {
      this.dialog = false;
    },
    limpiar() {
      this.id =         "";
      this.matchid =       "";
      this.playerId =       "";
      this.kills  =    "";
      this.deaths  =  "";
      this.assists =     "";
      this.damage  =    "";
    },

    listarplayers() {
            let me = this;
            var playersArray = [];
            axios.get('api/player').then( (response) =>{
                // console.log(response.data);
                playersArray = response.data;
                playersArray.map((p) => {
                    me.players.push({
                        text: p.name,
                        value: p.id
                    });
                });
            }).catch(function (error) {
                console.log(error);
            });
        },
    
    guardar() {
    }
  }
};
</script>