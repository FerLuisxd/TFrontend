<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Tournaments</v-toolbar-title>
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
                    <v-text-field v-model="name" label="Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-date-picker v-model="date" label="Date"></v-date-picker>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="winner" label="Winner"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-select v-model="playerId" :items="players" label="Creator"></v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="nTeams" label="Teams Number"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-select v-model="modeId" :items="modes" label="Mode"></v-select>
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
      <v-data-table :headers="headers" :items="tournaments" :search="search" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-content-start layout px-5">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small class="mr-2" @click="generar(props.item.id)">gavel</v-icon>
            <v-btn @click="toMatch(props.item.id)">Matches</v-btn>
          </td>

          <td>{{ props.item.name }}</td>
          <td>{{ props.item.date }}</td>
          <td>{{ props.item.winner }}</td>
          <td>{{ props.item.playerName }}</td>
          <td>{{ props.item.nTeams }}</td>
          <td>{{ props.item.modeFormat }}</td>
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
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      tournaments: [],
      dialog: false,
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Name", value: "name", sortable: false },
        { text: "Date", value: "date", sortable: false },
        { text: "Winner", value: "winner" },
        { text: "Creador", value: "playerName" },
        { text: "Teams Number", value: "nTeams" },
        { text: "Mode", value: "modeFormat" }
      ],
      search: "",
      editedIndex: -1,

      //Model
      id: "",
      name: "",
      date: "",
      winner: "",
      playerId: "",
      nTeams: "",
      modeId: "",
      modeFormat: "",

      //Arreglos
      modes: [],
      players: [],

      alert: true
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Tournament" : "Update Tournament";
    }
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.listar();
    this.listarplayers();
    this.listarmodes();
  },

  methods: {
        toMatch(id){
          this.$router.push(`/match/tournament/${id}`)
        },
       formatDate (date) {
        if (!date) return null

      const [year, month, day] = date.split("-");
      return `${year}-${month}-${day}`;
    },
    listar() {
      let me = this;
      axios
        .get("api/tournament")
        .then(function(response) {
          console.log(response);
          me.tournaments = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    editItem(item) {
      this.id = item.id;
      this.name = item.name;
      this.dateFormatted = item.date;
      this.winner = item.winner;
      this.playerId = item.playerId;
      this.nTeams = item.nTeams;
      this.modeId = item.modeId;

      this.editedIndex = 1;
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    limpiar() {
      this.id = "";
      this.name = "";
      this.date = "";
      this.winner = "";
      this.playerId = "";
      this.nTeams = "";
      this.modeId = "";
    },

    listarplayers() {
      let me = this;
      var playersArray = [];
      axios
        .get("api/player")
        .then(response => {
          // console.log(response.data);
          playersArray = response.data;
          playersArray.map(p => {
            me.players.push({
              text: p.name,
              value: p.id
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    listarmodes() {
      let me = this;
      var modesArray = [];
      axios
        .get("api/mode")
        .then(response => {
          // console.log(response.data);
          modesArray = response.data;
          modesArray.map(p => {
            me.modes.push({
              text: p.format,
              value: p.id
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    generar(id) {
      console.log(id);
      axios.put(`api/tournament/${id}`).then(response => {
        console.log("response", response.data);
        if (response.data == false) {
          this.$notify({
            group: "foo",
            type: 'warn',
            title: "Alerta",
            text: "No se puede generar data de torneo"
          });
        }
      });
    },
    guardar() {
      if (this.editedIndex > -1) {
        //Código para editar

        let me = this;
        axios
          .put("api/tournament", {
            id: me.id,
            name: me.name,
            date: me.dateFormatted,
            winner: me.winner,
            playerId: me.playerId,
            nTeams: me.nTeams,
            modeId: me.modeId
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
          .post("api/tournament", {
            name: me.name,
            date: me.dateFormatted,
            winner: me.winner,
            playerId: me.playerId,
            nTeams: me.nTeams,
            modeId: me.modeId
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
