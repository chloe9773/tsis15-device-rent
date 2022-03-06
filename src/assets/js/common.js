const methods = {
  toggleModal() {
    $("#modal-body").toggleClass("d-none");
    $("#modal").toggleClass("d-none");
  }
}

export default {
  install(Vue) {
    Vue.config.globalProperties.$toggleModal = methods.toggleModal;
  }
}