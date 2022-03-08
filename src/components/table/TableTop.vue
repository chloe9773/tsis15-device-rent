<!-- 테이블 상단에 위치판 셀렉트 + 인풋 분리 -->
<template>
  <div class="table-title mb-20 d-flex space-between">
    <slot name="table-top-select"></slot>
    <!-- <select name="" id="" class="p-5 w-20">
      <option value="search-keyword">부서명</option>
    </select> -->
    <slot name="table-top-search"></slot>
    <!-- <div class="input-wrap p-5 b-1 w-70">
      <input type="text" class="" />
      <button class="float-r mr-5 cancel-btn">검색</button>
    </div> -->
  </div>
</template>
