const methods = {
  toggleModal(category, type) {
    $("#modal-body").toggleClass("d-none");
    $("#modal").toggleClass("d-none");
    
    if(category == 'approval' && type == 1) {
      // 대여가능 form
      $("#deviceUser").attr("readonly", false);
      $("#userDept").attr("readonly", false);
      $("#rentStartDate").attr("readonly", false);
      $("#memo").attr("readonly", true);

      $("#regular").removeClass("d-none");
      $("#extension").addClass("d-none");
      $("#approvalIdSelect").removeClass("d-none");
      $("#approvalId-before").addClass("d-none");

    } else if(category == 'approval' && type == 2) {
      // 연장가능 form
      $("#deviceUser").attr("readonly", true);
      $("#userDept").attr("readonly", true);
      $("#rentStartDate").attr("readonly", true);
      $("#memo").attr("readonly", true);

      $("#regular").addClass("d-none");
      $("#extension").removeClass("d-none");
      $("#approvalIdSelect").addClass("d-none");
      $("#approvalId-before").removeClass("d-none");
    } else if(category == 'approval' && type == 3) {
      // 예약가능 form
      $("#deviceUser").attr("readonly", false);
      $("#userDept").attr("readonly", false);
      $("#rentStartDate").attr("readonly", false);
      $("#memo").attr("readonly", false);

      $("#regular").removeClass("d-none");
      $("#extension").addClass("d-none");
      $("#approvalIdSelect").removeClass("d-none");
      $("#approvalId-before").addClass("d-none");
    } else if(category == 'approval' && type == 4) {
      // 대여,예약 불가능 form
      $("#deviceUser").attr("readonly", true);
      $("#userDept").attr("readonly", true);
      $("#rentStartDate").attr("readonly", true);
      $("#memo").attr("readonly", true);

      $("#regular").addClass("d-none");
      $("#extension").addClass("d-none");
      $("#rentStartDate").attr("readonly", true);
      $("#memo").attr("readonly", true);
    }
  }
}

export default {
  install(Vue) {
    Vue.config.globalProperties.$toggleModal = methods.toggleModal;
  }
}