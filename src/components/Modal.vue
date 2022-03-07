<template>
  <div id="modal" class="modal d-none"></div>
  <div id="modal-body" class="modal-body d-none" style="height:75%; overflow:auto">
    <div class="top-wrap">
      <div class="close bg-gray white cursor" v-on:click="toggleModal('approval',0)">X</div>
    </div>
    <div class="clear mb-20"></div>
    <div class="modal-content mb-20">
      <div class="form-wrap">
        <slot name="modal-content-top" class="d-flex space-between"></slot>
        <slot name="modal-content-bottom"></slot>  
      </div>  
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
    name: 'Modal',
    methods: {
      toggleModal(category, type) {
        this.$toggleModal(category, type)
      }
    }
  }
</script>