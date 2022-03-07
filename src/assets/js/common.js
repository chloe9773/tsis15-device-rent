const methods = {
  toggleModal(category, type) {
    $("#modal-body").toggleClass("d-none");
    $("#modal").toggleClass("d-none");
    
    if(category == 'approval' && type == 1) {
      $("#deviceUser").attr("readonly", false);
      $("#userDept").attr("readonly", false);
      $("#rentStartDate").attr("readonly", false);
      $("#memo").attr("readonly", false);

      $("#regular").removeClass("d-none");
      $("#extension").addClass("d-none");
      $("#approvalIdSelect").removeClass("d-none");
      $("#approvalId-before").addClass("d-none");

    } else if(category == 'approval' && type == 2) {
      $("#deviceUser").attr("readonly", true);
      $("#userDept").attr("readonly", true);
      $("#rentStartDate").attr("readonly", true);
      $("#memo").attr("readonly", true);

      $("#regular").addClass("d-none");
      $("#extension").removeClass("d-none");
      $("#approvalIdSelect").addClass("d-none");
      $("#approvalId-before").removeClass("d-none");
    }
  }
}

export default {
  install(Vue) {
    Vue.config.globalProperties.$toggleModal = methods.toggleModal;
  }
}