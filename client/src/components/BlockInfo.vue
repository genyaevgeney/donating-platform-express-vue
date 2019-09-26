<template>
  <div class="container">
    <div class="row Donating__information-section">
      <div v-for="arr in data" class="col-4">
        <div class="Donating__information-block first-block">
          <p class="Donating__block-headline">{{arr[0]}}</p>
          <p class="Donating__block-price">$ {{arr[1]}}</p>
          <p v-if="arr[2]" class="Donating__block-person">{{arr[2]}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['data'],
  }
</script>
