<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input 
      v-model="searchQuery"
      @input="getSearchResult"
      type="text" placeholder="Search for City or State"
      class="
      py-2 
      px-1 
      w-full 
      bg-transparent 
      border-b 
      focus:border-weather-secondary 
      focus:outline-none 
      focus:shadow-[0px_1px_0_0_#004E71]
    ">
      <ul v-if="mapboxSearchResult"
      class="absolute bg-weather-secondary text-white
      w-full shadow-md py-2 px-1 top-[66px]">

      <p v-if="searchError">Sorry Something is wrong here</p>
      <p v-if="!serverError && mapboxSearchResult.length === 0">No results</p>
        <li
        @click="previewCity(searchResult)"
         v-for="searchResult in mapboxSearchResult" :key="searchResult.id"  class="py-2 cursor-pointer">
            {{ searchResult.place_name }}
        </li>

      </ul>
    </div>
    <div class="flex flex-col gap-4">
        <Suspense>
            <CityList/>
            <template #fallback>
                <CityCardSkeleton/>
            </template>
        </Suspense>
    </div>
  </main>
</template>

<script setup>
import CityList from "../components/CityList.vue"
import CityCardSkeleton from "../components/CityCardSkeleton.vue"
import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from "vue-router"

const router = useRouter()

const previewCity = (searchResult)=>{
  console.log(searchResult)
  const [city, state] = searchResult.place_name.split(",")
  console.log(city, state)
  router.push({
    name:'cityView',
    params:{state: state.replaceAll(" ",""), city:city},
    query:{
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview:true
    }
  })
}

const mapboxAPIKey = "pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q";
const searchQuery = ref("")
const queryTimeout = ref(null)
const mapboxSearchResult =ref(null)
const searchError = ref(null)

const getSearchResult = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== ""){
      try{
        const result = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
      );
      mapboxSearchResult.value = result.data.features;
      }catch{
        searchError.value = true
      }
      return;
    }
    mapboxSearchResult.value = null;
  }, 300);
};

</script>
