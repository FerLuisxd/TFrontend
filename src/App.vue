<template>
  <v-app id="app">
    <notifications position="top right" group="foo" />
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
        <template>
          <v-list-tile :to="{name:'home'}">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>
              Inicio
            </v-list-tile-title>
          </v-list-tile>
        </template>

        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-action>
              <v-icon>folder_open</v-icon>
            </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Tournament
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'tournament'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content color = "red">
                <v-list-tile-title>
                  Inicio
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'mode'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content color = "red">
                <v-list-tile-title>
                  Modes
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'match'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Matches
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  
                      <v-list-tile :to="{ name: 'statistics'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Statistics
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  
          </v-list-group>

        </template>

        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-action>
              <v-icon>folder_open</v-icon>
            </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Teams and Players
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'team'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Teams
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ name: 'player'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Players
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>  
          </v-list-group>
        </template>
        
       
        
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="blue darken-3"
      dark
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Tournament</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer dark height="auto">
      <v-layout justify-center>
        <v-flex text-xs-center>
          <v-card flat tile color="blue darken-3" class="white--text">
            <v-card-text class="white--text pt-0">
             KYAAA &copy;2019
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-footer>

  </v-app>
</template>


<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: true,
     }
  }
}
</script>
