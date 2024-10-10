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

button{
  background-color: #69c57f;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  padding: 1rem 1rem 1.5rem;

  border-radius: 0.5rem;

  transition: background-color 0.3s;
}

button:hover{
  background-color: #82d790;
}

</style>