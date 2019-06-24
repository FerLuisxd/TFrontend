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
        <v-btn color="primary" @click="redirect" >Check all</v-btn>
        

        <v-spacer></v-spacer>
      </v-toolbar>
      <v-data-table :headers="headers" :items="statistics" :search="search" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.matchId }}</td>
          <td>{{ props.item.playerName }}</td>
          <td>{{ props.item.kills }}</td>
          <td>{{ props.item.deaths }}</td>
          <td>{{ props.item.assists }}</td>
          <td>{{ props.item.damage}}</td>
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

      //Arreglos
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
    
  },
  methods: {
    listar() {
      let me = this;
      axios
        .get("api/statistics/player/"+this.$route.params.id)
        .then(function(response) {
          console.log(response);
          me.statistics = response.data;
        })
        .catch(function(error) {
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
    
    guardar() {
    },
    redirect(){
        this.$router.push(`Tournament/`)
    }
  }
};
</script>