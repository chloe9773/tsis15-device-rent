<template>
  <div id="modal" class="modal d-none"></div>
  <div id="modal-body" class="modal-body d-none">
    <div class="top-wrap">
      <div class="close bg-gray white cursor" style="" v-on:click="toggleModal()">X</div>
    </div>
    <div class="clear"></div>
    <div class="modal-content d-flex space-between mb-20">
      <slot name="modal-content"></slot>
    </div>
  </div>
</template>

<style scoped>
  .close {
    width: 15px;
    padding: 2px;
    border-radius:s2px;
    float: right;
  }

  .clear {
    clear: both;
  }
</style>
<script>
  export default {
    methods: {
      toggleModal() {
        this.$toggleModal()
      }
    }
  }
</script>