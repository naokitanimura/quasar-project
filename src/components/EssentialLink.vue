<template>
  <q-item clickable tag="a" target="_blank" :href="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>

    <span>{{ counter }}</span>
    <q-btn class="button" @click="increment()"></q-btn>
  </q-item>
</template>

<script setup lang="ts">
import axios from 'axios'
import { defineProps, onMounted, ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Title'
  },

  caption: {
    type: String,
    default: ''
  },

  link: {
    type: String,
    default: '#'
  },

  icon: {
    type: String,
    default: ''
  }
})

const counter = ref(0)

function increment() {
  counter.value += 1
}

onMounted(() => {
  axios
    .get('/api/test')
    .then(resp => {
      if (resp.data.step) {
        counter.value += resp.data.step
      }
    })
})

</script>
