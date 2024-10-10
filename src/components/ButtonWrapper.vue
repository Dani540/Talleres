<script setup lang="ts">

import Button from "./Button.vue"
import {
  Strategy,
  CountryPopulationStrategy,
  AnimeRecommendationStrategy,
  AnimeRandomStrategy, MangaRandomStrategy
} from "@/script/ApiConsumerStrategiesV2.ts";
import {ref} from "vue";

function getStrategy(id) : Strategy {
  const strategy = null;
  switch (id){
    case Api.countryPopulation: return new CountryPopulationStrategy()
    case Api.recommendation_anime: return new AnimeRecommendationStrategy();
    case Api.random_anime: return new AnimeRandomStrategy()
    case Api.random_manga: return new MangaRandomStrategy()
  }
  return strategy;
}

enum Api{
  countryPopulation = 0,
  recommendation_anime=1,
  random_anime=2,
  random_manga=3
}
const apiCallback = async (url, id) => {
  if (id!==null){
    log.value = "Cargando datoosss"
    log.value = await getStrategy(id).fetchData(url);
  }else{
    fetch(url).then(r=>r.json()).then(json => log.value = json)
  }
}

const log = ref('')

</script>

<template>
  <div class="wrapper">
    <Button :click="apiCallback" api="https://countriesnow.space/api/v0.1/countries/population" :id="Api.countryPopulation" label="Api Population"/>
    <Button :click="apiCallback" api="https://api.jikan.moe/v4/recommendations/anime" :id="Api.recommendation_anime" label="Api Recommendation Anime"/>
    <Button :click="apiCallback" api="https://api.jikan.moe/v4/random/anime" :id="Api.random_anime" label="Api Random Anime"/>
    <Button :click="apiCallback" api="https://api.jikan.moe/v4/random/manga" :id="Api.random_manga" label="Api Random Manga"/>
  </div>
  <div class="wrapper console">
    <span id="log" v-html="log" />
  </div>
</template>

<style scoped>
  .wrapper{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    background-color: #152534;
  }

  .console{
    display: flex;
    text-align: center;
    background-color: #2c3e50;

    width: 100%;
    height: 85vh;

    line-height: 1rem;

    overflow-x: hidden;
    overflow-y: scroll;

    padding: 1rem;
  }

</style>