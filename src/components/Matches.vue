<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Matches</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
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
                    <v-text-field v-model="winnerId" label="Winner"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                     <v-text-field v-model="fase" label="Fase"></v-text-field>
                  </v-flex>
                <v-flex xs12 sm12 md12>
                     <v-select v-model="team1Id" :items="teams" label="Team 1"></v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-select v-model="team2Id" :items="teams" label="Team 2"></v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-select v-model="tournamentId" :items="tournaments" label="Tournament"></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click.native="guardar">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table :headers="headers" :items="matches" :search="search" class="elevation-1">
        <template slot="items" slot-scope="props">

          <td class="justify-content-start layout px-5">
           <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
           <v-btn color="gray" @click="toStatistics(props.item.id)" >Check Statistics</v-btn>

          </td>          
          <td>{{ props.item.winnerName }}</td>
          <td>{{ props.item.fase }}</td>
          <td>{{ props.item.team1Name }}</td>
          <td>{{ props.item.team2Name }}</td>
          <td>{{ props.item.tournamentName }}</td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
export default {
  data: vm => {      
    return {
      matches: [],      
      dialog: false,
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Winner", value: "winnerName", sortable: false },
        { text: "Fase", value: "fase", sortable: true },
        { text: "Team #1", value: "team1Name",sortable: false },
        { text: "Team #2", value: "team2Name",sortable: false },
        { text: "Tournament", value: "tournamentName",sortable: false }
      ],
      search: "",
      editedIndex: -1,

      //Model
      id: "",
      winnerId: "",
      fase: "",
      team1Id: "",
      team2Id: "",
      tournamentId: "",

      //Arreglos
      teams: [],
      tournaments: []
    };
  },
  computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    formTitle() {
      return this.editedIndex === -1 ? "New Match" : "Update Matches";
    }
  },

  watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.listar();
    this.listarteams();
    this.listartournaments();
  },
  methods: {
    toStatistics(id)
    {
        this.$router.push(`/statistics/match/${id}`)

    },
       formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${year}-${month}-${day}`
      },
    listar() {
      let me = this;
      axios
        .get("api/match")
        .then(function(response) {
          console.log(response);          
          me.matches = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },



    
    editItem(item) {
      this.id = item.id;
      this.winnerId = item.winnerId;
      this.fase = item.fase;
      this.team1Id  = item.team1Id;
      this.team2Id  = item.team2Id;
      this.tournamentId = item.team1Id;

      this.editedIndex = 1;
      this.dialog = true;
    },

  

    close() {
      this.dialog = false;
    },
    

    listarteams() {
            let me = this;
            var teamsArray = [];
            axios.get('api/team').then( (response) =>{
                // console.log(response.data);
                teamsArray = response.data;
                teamsArray.map((p) => {
                    me.teams.push({
                        text: p.name,
                        value: p.id
                    });
                });
            }).catch(function (error) {
                console.log(error);
            });
        },
    listartournaments() {
    let me = this;
    var tournamentsArray = [];
    axios.get('api/tournament').then( (response) =>{
        // console.log(response.data);
        tournamentsArray = response.data;
        tournamentsArray.map((p) => {
            me.tournaments.push({
                text: p.name,
                value: p.id
            });
        });
    }).catch(function (error) {
        console.log(error);
    });
    },
    
    guardar() {
      if (this.editedIndex > -1) {
        //Código para editar

        let me = this;
        axios 
          .put("api/match", {
            id:           me.id,
            fase      :        me.fase,
            team1Id      :        me.team1Id,
            team2Id      :    me.team2Id,
            tournamentId   :   me.tournamentId,
            winnerId      :     me.winnerId
          })
          .then(function(response) {
              console.log(response);
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
          .post("api/match", {
            fase      :        me.fase,
            team1Id      :        me.team1Id,
            team2Id      :    me.team2Id,
            tournamentId   :   me.tournamentId,
            winnerId      :     me.winnerId
          })
          .then(function(response) {
              console.log(response);
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
