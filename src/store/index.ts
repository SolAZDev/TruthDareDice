import Vue from "vue";
import Vuex from "vuex";
// import randomInt from "random-int";
import * as Utils from "../plugins/utils";
import { Player, GameSetup, TruthOrDareData } from "../types/types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    players: [] as Array<Player>,
    // turns: 0,
    maxTurns: 0,
    difficulty: 0,
    progressive: false,
    data: {} as TruthOrDareData,
  },
  getters: {
    getPlayer: (state) => (id: number) => {
      return state.players.filter((p) => p.id == id)[0];
    },
    getPlayerCount: (state) => {
      return state.players.length;
    },
    getRandomPlayer: (state) => {
      return state.players.filter(
        (p) => p.id == Utils.randomNumber(state.players.length)
      )[0];
    },
    getPlayers: (state) => {
      return state.players;
    },
    getTurns: (state) => {
      return state.maxTurns;
    },
    getDifficulty: (state) => {
      return state.difficulty;
    },
    getProgressive: (state) => {
      return state.progressive;
    },
    getRandom: (state) => (max: number) => {
      return Utils.randomNumber(max);
    },
    getTruthArray: (state) => {
      return state.data.truths;
    },
    getDare: (state) => (level: number) => {
      let dare = "";
      let dareArray = [] as Array<string>;
      switch (level) {
        case 0: //'safe'--at least for work
          dareArray = state.data.daresSafe;
          break;
        case 1: //"Sexy"
          dareArray = state.data.daresSexy;
          break;
        case 2: //Hot
        case 3:
          dareArray = state.data.daresHot;
          break;
      }
      const id = Utils.randomNumber(dareArray.length);
      console.log("Requesting Dare at Level: " + level + "ID: " + d);
      dare = dareArray[id];
      console.log(dare);

      return dare;
    },
    getDiceArea: (state) => {
      return state.data.dicePlace;
    },
    getDiceAct: (state) => {
      return state.data.diceAction;
    },
  },
  mutations: {
    setPlayers(state, players: Array<Player>) {
      state.players = players;
    },
    scoreUp(state, playerid) {
      state.players.filter((p) => p.id == playerid)[0].score++;
    },
    setTurns(state, turns: number) {
      state.maxTurns = turns;
    },
    setDifficulty(state, difficulty: number) {
      state.difficulty = difficulty;
      if (difficulty >= 3) {
        state.progressive = true;
      }
    },
    setNewDifficulty(state, difficulty: number) {
      state.difficulty = difficulty;
    },
    setData(state, data: TruthOrDareData) {
      state.data = data;
    },
    resetScores(state) {
      state.players.forEach((player) => {
        player.score = 0;
      });
    },
  },

  actions: {
    setupGame(context, data: GameSetup) {
      console.log("Setting up " + data);
      context.commit("setPlayers", data.players);
      context.commit("setTurns", data.turns);
      context.commit("setDifficulty", data.difficulty);
    },
    setDifficulty(context, difficulty: number) {
      context.commit("setNewDifficulty", difficulty);
    },
    scoreUp(context, playerid: number) {
      context.commit("scoreUp", playerid);
    },
    setGameData(context, data: TruthOrDareData) {
      context.commit("setData", data);
    },
    resetScores(context) {
      context.commit("resetScores");
    },
  },
  modules: {},
});
