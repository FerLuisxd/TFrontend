import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Teams from '@/components/Teams.vue'
import Tournament from '@/components/Tournament.vue'
import Players from '@/components/Players.vue'
import flushPromises from "flush-promises";
import moxios from 'moxios'


describe('Teams.vue', function() {
  this.timeout(30000)
  beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install()
  })

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall()
  })
  it('should load page',()=>{
    const wrapper = shallowMount(Teams)
    expect(wrapper.isVueInstance()).equal(true)
  })
  it('detects user input', ()=>{
    const wrapper = shallowMount(Teams)
    expect(wrapper.vm.$data.name).equal('')
    wrapper.setData({ name: 'New Team' })
    expect(wrapper.vm.$data.name).equal('New Team')
  })

  it('should make the request',async () => {
    moxios.stubRequest('api/team', {
      status: 200,
      responseText: [{
          "id": 1,
          "name": "none",
          "nMembers": 0,
          "tournamentId": 0,
          "tournamentName": null,
          "players": [{
            "id": 1,
            "name": "admin",
            "gamePreferences": "-",
            "teamId": 1,
            "team": {
              "id": 1,
              "name": "none",
              "nMembers": 0,
              "tournamentId": null,
              "tournament": null
            }
          }],
          "tournament": null
        }, {
          "id": 2,
          "name": "Team1",
          "nMembers": 4,
          "tournamentId": 1,
          "tournamentName": "Torneo1",
          "players": [{
            "id": 2,
            "name": "Jugador1",
            "gamePreferences": "League",
            "teamId": 2,
            "team": {
              "id": 2,
              "name": "Team1",
              "nMembers": 4,
              "tournamentId": 1,
              "tournament": {
                "id": 1,
                "name": "Torneo1",
                "game": "League",
                "date": "2019-09-29T00:00:00",
                "winner": "Team3",
                "playerId": 1,
                "player": {
                  "id": 1,
                  "name": "admin",
                  "gamePreferences": "-",
                  "teamId": 1,
                  "team": {
                    "id": 1,
                    "name": "none",
                    "nMembers": 0,
                    "tournamentId": null,
                    "players": [],
                    "tournament": null
                  }
                },
                "nTeams": 0,
                "modeId": 1,
                "mode": null,
                "teams": [{
                  "id": 3,
                  "name": "Team2",
                  "nMembers": 4,
                  "tournamentId": 1,
                  "players": [{
                    "id": 4,
                    "name": "Jugador3",
                    "gamePreferences": "League",
                    "teamId": 3
                  }, {
                    "id": 5,
                    "name": "Jugador4",
                    "gamePreferences": "League",
                    "teamId": 3
                  }]
                }, {
                  "id": 4,
                  "name": "Team3",
                  "nMembers": 4,
                  "tournamentId": 1,
                  "players": [{
                    "id": 6,
                    "name": "Jugador5",
                    "gamePreferences": "League",
                    "teamId": 4
                  }, {
                    "id": 7,
                    "name": "Jugador6",
                    "gamePreferences": "League",
                    "teamId": 4
                  }]
                }, {
                  "id": 5,
                  "name": "Team4",
                  "nMembers": 4,
                  "tournamentId": 1,
                  "players": [{
                    "id": 8,
                    "name": "Jugador7",
                    "gamePreferences": "League",
                    "teamId": 5
                  }, {
                    "id": 9,
                    "name": "Jugador8",
                    "gamePreferences": "League",
                    "teamId": 5
                  }]
                }]
              }
            }
          }, {
            "id": 3,
            "name": "Jugador2",
            "gamePreferences": "League",
            "teamId": 2,
            "team": {
              "id": 2,
              "name": "Team1",
              "nMembers": 4,
              "tournamentId": 1,
              "tournament": {
                "id": 1,
                "name": "Torneo1",
                "game": "League",
                "date": "2019-09-29T00:00:00",
                "winner": "Team3",
                "playerId": 1,
                "player": {
                  "id": 1,
                  "name": "admin",
                  "gamePreferences": "-",
                  "teamId": 1,
                  "team": {
                    "id": 1,
                    "name": "none",
                    "nMembers": 0,
                    "tournamentId": null,
                    "players": [],
                    "tournament": null
                  }
                },
                "nTeams": 0,
                "modeId": 1,
                "mode": null,
                "teams": [{
                  "id": 3,
                  "name": "Team2",
                  "nMembers": 4,
                  "tournamentId": 1,
                  "players": [{
                    "id": 4,
                    "name": "Jugador3",
                    "gamePreferences": "League",
                    "teamId": 3
                  }, {
                    "id": 5,
                    "name": "Jugador4",
                    "gamePreferences": "League",
                    "teamId": 3
                  }]
                }, {
                  "id": 4,
                  "name": "Team3",
                  "nMembers": 4,
                  "tournamentId": 1,
                  "players": [{
                    "id": 6,
                    "name": "Jugador5",
                    "gamePreferences": "League",
                    "teamId": 4
                  }, {
                    "id": 7,
                    "name": "Jugador6",
                    "gamePreferences": "League",
                    "teamId": 4
                  }]
                }, {
                  "id": 5,
                  "name": "Team4",
                  "nMembers": 4,
                  "tournamentId": 1,
                  "players": [{
                    "id": 8,
                    "name": "Jugador7",
                    "gamePreferences": "League",
                    "teamId": 5
                  }, {
                    "id": 9,
                    "name": "Jugador8",
                    "gamePreferences": "League",
                    "teamId": 5
                  }]
                }]
              }
            }
          }],
          "tournament": {
            "id": 1,
            "name": "Torneo1",
            "game": "League",
            "date": "2019-09-29T00:00:00",
            "winner": "Team3",
            "playerId": 1,
            "player": {
              "id": 1,
              "name": "admin",
              "gamePreferences": "-",
              "teamId": 1,
              "team": {
                "id": 1,
                "name": "none",
                "nMembers": 0,
                "tournamentId": null,
                "players": [],
                "tournament": null
              }
            },
            "nTeams": 0,
            "modeId": 1,
            "mode": null,
            "teams": [{
              "id": 2,
              "name": "Team1",
              "nMembers": 4,
              "tournamentId": 1,
              "players": [{
                "id": 2,
                "name": "Jugador1",
                "gamePreferences": "League",
                "teamId": 2
              }, {
                "id": 3,
                "name": "Jugador2",
                "gamePreferences": "League",
                "teamId": 2
              }]
            }, {
              "id": 3,
              "name": "Team2",
              "nMembers": 4,
              "tournamentId": 1,
              "players": [{
                "id": 4,
                "name": "Jugador3",
                "gamePreferences": "League",
                "teamId": 3
              }, {
                "id": 5,
                "name": "Jugador4",
                "gamePreferences": "League",
                "teamId": 3
              }]
            }, {
              "id": 4,
              "name": "Team3",
              "nMembers": 4,
              "tournamentId": 1,
              "players": [{
                "id": 6,
                "name": "Jugador5",
                "gamePreferences": "League",
                "teamId": 4
              }, {
                "id": 7,
                "name": "Jugador6",
                "gamePreferences": "League",
                "teamId": 4
              }]
            }, {
              "id": 5,
              "name": "Team4",
              "nMembers": 4,
              "tournamentId": 1,
              "players": [{
                "id": 8,
                "name": "Jugador7",
                "gamePreferences": "League",
                "teamId": 5
              }, {
                "id": 9,
                "name": "Jugador8",
                "gamePreferences": "League",
                "teamId": 5
              }]
            }]
          }
        }
      ]
    })
  
    const wrapper = shallowMount(Teams)
    
    expect(wrapper.vm.$data.teams).to.have.length(0)
    await flushPromises();
    await wrapper.vm.listar()
    expect(wrapper.vm.$data.teams).to.be.an('array')
    expect(wrapper.vm.$data.teams).to.have.length(2)
  })

})


describe('Tournament.vue', function() {
  this.timeout(30000)
  beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install()
  })

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall()
  })
  it('should load page',()=>{
    const wrapper = shallowMount(Tournament)
    expect(wrapper.isVueInstance()).equal(true)
  })
  it('detects user input', ()=>{
    const wrapper = shallowMount(Teams)
    expect(wrapper.vm.$data.name).equal('')
    wrapper.setData({ name: 'New Tournament' })
    expect(wrapper.vm.$data.name).equal('New Tournament')
  })
  it('should make the request',async () => {
    moxios.stubRequest('api/tournament', {
      status: 200,
      responseText: [{"id":1,"name":"Torneo1","game":"League","date":"2019-09-29T00:00:00","winner":"Team3","playerId":1,"playerName":"admin","nTeams":0,"modeId":1,"modeFormat":"Simple","teams":[{"id":2,"name":"Team1","nMembers":4,"tournamentId":1,"players":null,"tournament":{"id":1,"name":"Torneo1","game":"League","date":"2019-09-29T00:00:00","winner":"Team3","playerId":1,"player":{"id":1,"name":"admin","gamePreferences":"-","teamId":1,"team":null},"nTeams":0,"modeId":1,"mode":{"id":1,"format":"Simple"}}},{"id":3,"name":"Team2","nMembers":4,"tournamentId":1,"players":null,"tournament":{"id":1,"name":"Torneo1","game":"League","date":"2019-09-29T00:00:00","winner":"Team3","playerId":1,"player":{"id":1,"name":"admin","gamePreferences":"-","teamId":1,"team":null},"nTeams":0,"modeId":1,"mode":{"id":1,"format":"Simple"}}},{"id":4,"name":"Team3","nMembers":4,"tournamentId":1,"players":null,"tournament":{"id":1,"name":"Torneo1","game":"League","date":"2019-09-29T00:00:00","winner":"Team3","playerId":1,"player":{"id":1,"name":"admin","gamePreferences":"-","teamId":1,"team":null},"nTeams":0,"modeId":1,"mode":{"id":1,"format":"Simple"}}},{"id":5,"name":"Team4","nMembers":4,"tournamentId":1,"players":null,"tournament":{"id":1,"name":"Torneo1","game":"League","date":"2019-09-29T00:00:00","winner":"Team3","playerId":1,"player":{"id":1,"name":"admin","gamePreferences":"-","teamId":1,"team":null},"nTeams":0,"modeId":1,"mode":{"id":1,"format":"Simple"}}}]}]
    })
  
    const wrapper = shallowMount(Tournament)
    
    expect(wrapper.vm.$data.tournaments).to.have.length(0)
    await flushPromises();
     await wrapper.vm.listar2()
    expect(wrapper.vm.$data.tournaments).to.be.an('array')
    expect(wrapper.vm.$data.tournaments).to.have.length(1)

  })

})

describe('Players.vue', function() {
  this.timeout(30000)
  beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install()
  })

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall()
  })
  it('should load page',()=>{
    const wrapper = shallowMount(Players)
    expect(wrapper.isVueInstance()).equal(true)
  })
  it('detects user input', ()=>{
    const wrapper = shallowMount(Players)
    expect(wrapper.vm.$data.name).equal('')
    wrapper.setData({ name: 'New Team' })
    expect(wrapper.vm.$data.name).equal('New Team')
  })
  it('should make the request',async () => {
    moxios.stubRequest('api/player', {
      status: 200,
      responseText: [{"id":1,"name":"admin","gamePreferences":"-","teamId":1,"teamName":"none","team":{"id":1,"name":"none","nMembers":0,"tournamentId":null,"players":[{"id":1,"name":"admin","gamePreferences":"-","teamId":1}],"tournament":null}},{"id":2,"name":"Jugador1","gamePreferences":"League","teamId":2,"teamName":"Team1","team":{"id":2,"name":"Team1","nMembers":4,"tournamentId":1,"players":[{"id":2,"name":"Jugador1","gamePreferences":"League","teamId":2},{"id":3,"name":"Jugador2","gamePreferences":"League","teamId":2}],"tournament":null}},{"id":3,"name":"Jugador2","gamePreferences":"League","teamId":2,"teamName":"Team1","team":{"id":2,"name":"Team1","nMembers":4,"tournamentId":1,"players":[{"id":2,"name":"Jugador1","gamePreferences":"League","teamId":2},{"id":3,"name":"Jugador2","gamePreferences":"League","teamId":2}],"tournament":null}},{"id":4,"name":"Jugador3","gamePreferences":"League","teamId":3,"teamName":"Team2","team":{"id":3,"name":"Team2","nMembers":4,"tournamentId":1,"players":[{"id":4,"name":"Jugador3","gamePreferences":"League","teamId":3},{"id":5,"name":"Jugador4","gamePreferences":"League","teamId":3}],"tournament":null}},{"id":5,"name":"Jugador4","gamePreferences":"League","teamId":3,"teamName":"Team2","team":{"id":3,"name":"Team2","nMembers":4,"tournamentId":1,"players":[{"id":4,"name":"Jugador3","gamePreferences":"League","teamId":3},{"id":5,"name":"Jugador4","gamePreferences":"League","teamId":3}],"tournament":null}},{"id":6,"name":"Jugador5","gamePreferences":"League","teamId":4,"teamName":"Team3","team":{"id":4,"name":"Team3","nMembers":4,"tournamentId":1,"players":[{"id":6,"name":"Jugador5","gamePreferences":"League","teamId":4},{"id":7,"name":"Jugador6","gamePreferences":"League","teamId":4}],"tournament":null}},{"id":7,"name":"Jugador6","gamePreferences":"League","teamId":4,"teamName":"Team3","team":{"id":4,"name":"Team3","nMembers":4,"tournamentId":1,"players":[{"id":6,"name":"Jugador5","gamePreferences":"League","teamId":4},{"id":7,"name":"Jugador6","gamePreferences":"League","teamId":4}],"tournament":null}},{"id":8,"name":"Jugador7","gamePreferences":"League","teamId":5,"teamName":"Team4","team":{"id":5,"name":"Team4","nMembers":4,"tournamentId":1,"players":[{"id":8,"name":"Jugador7","gamePreferences":"League","teamId":5},{"id":9,"name":"Jugador8","gamePreferences":"League","teamId":5}],"tournament":null}},{"id":9,"name":"Jugador8","gamePreferences":"League","teamId":5,"teamName":"Team4","team":{"id":5,"name":"Team4","nMembers":4,"tournamentId":1,"players":[{"id":8,"name":"Jugador7","gamePreferences":"League","teamId":5},{"id":9,"name":"Jugador8","gamePreferences":"League","teamId":5}],"tournament":null}}]
    })
  
    const wrapper = shallowMount(Players)
    
    expect(wrapper.vm.$data.players).to.have.length(0)
    await flushPromises();
    wrapper.vm.listar2()
    expect(wrapper.vm.$data.players).to.be.an('array')
    expect(wrapper.vm.$data.players).to.have.length(9)
  })

})