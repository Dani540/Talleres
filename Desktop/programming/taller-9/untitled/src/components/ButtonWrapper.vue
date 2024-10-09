<script setup>

import Button from "./Button.vue"
import {animePopulation} from "@/script/ApiConsumeStrategies.ts";
import {ref} from "vue";

const apiCallback = (url, id) => {
  if (id){
    log.value = animePopulation(url);
  }else{
    fetch(url).then(r=>r.json()).then(json => log.value = json)
  }
}

const log = ref('')

</script>

<template>
  <div class="wrapper">
    <Button :click="apiCallback" api="https://countriesnow.space/api/v0.1/countries/population" id="1" label="Api Population"/>
    <Button :click="apiCallback" api="https://api.jikan.moe/v4/recommendations/anime" label="Api Recommendation Anime"/>
    <Button :click="apiCallback" api="https://api.jikan.moe/v4/random/anime" label="Api Random Anime"/>
    <Button :click="apiCallback" api="https://api.jikan.moe/v4/random/manga" label="Api Random Manga"/>
  </div>
  <div class="wrapper console">
    <p>
      {{log}}
    </p>
  </div>
</template>

<style scoped>
  .wrapper{
    display: flex;

    width: 100%;
  }

  .console{
    display: flex;
    background-color: #2c3e50;
    width: 100%;
    height: 50vh;

    line-height: 1em;
    overflow-x: hidden;
    overflow-y: scroll;

    padding: 1rem;
  }

</style>