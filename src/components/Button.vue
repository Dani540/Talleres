<script setup>
  const props = defineProps({
    click: Function,
    api: String,
    id: Number,
    label: String
  })
</script>

<template>
  <div class="wrapper">
    <button type="button" @click="click(props.api, id)">
      {{props.label}}
    </button>
  </div>
</template>

<style scoped>

.wrapper{
  display: flex;

  background-color: #2c3e50;
}

.wrapper > *{
  width: auto;
  height: 3rem;

  margin: 1rem;

  border: 2px solid #222222;
}

</style>