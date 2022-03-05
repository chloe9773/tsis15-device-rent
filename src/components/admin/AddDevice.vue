<!-- 어드민 서브 메뉴 - 새디바이스 추가 화면 -->
<template>
    <div class="right-content b-1 p-35 w-50 border-radius-2">
        <div class="right-content-title mb-20">
            <p class="font-700 t-center">단말기 등록</p>
        </div>
        <div class="right-content-wrap w-70 m-auto">
            <div class="device-related-wrap d-flex mb-30">
                <div class="left-wrap w-50">
                    <div class="img-wrap w-80 t-center b-1">
                        <img src="@/assets/img/no-image-ico.png" alt="" width="90%" height="250px" class="mb-10">
                        <input type="file" class="img-upload w-80 mb-10">
                    </div>
                </div>
                <div class="right-wrap mb-20 f-14 w-50">
                    <div class="item-wrap b-1 p-5 border-radius-2 mb-5 w-90">
                        <span class="item-title">시리얼 번호 :</span>
                        <input type="text" id="serial" name="serial" tabindex="1" autofocus>
                    </div>
                    <div class="item-wrap b-1 p-5 border-radius-2 mb-5 w-90">
                        <span class="item-title">종류 :</span>
                        <input type="text" id="kind" name="kind" tabindex="2">
                    </div>
                    <div class="item-wrap b-1 p-5 border-radius-2 mb-5 w-90">
                        <span class="item-title">브랜드 :</span>
                        <input type="text" id="brand" name="brand" tabindex="3">
                    </div>
                    <div class="item-wrap b-1 p-5 border-radius-2 mb-5 w-90">
                        <span class="item-title">단말기명 :</span>
                        <input type="text" id="model" name="model" tabindex="4">
                    </div>
                    <div class="item-wrap b-1 p-5 border-radius-2 mb-5 w-90">
                        <span class="item-title">상태 :</span>
                        <input type="text" id="status" name="status" tabindex="5">
                    </div>
                    <div class="item-wrap b-1 p-5 border-radius-2 mb-5 w-90">
                        <span class="item-title">메모 :</span>
                        <textarea id="memo" name="memo"  class="v-top" tabindex="6"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-grp t-center">
            <button type="submit" class="active-btn mr-5">등록</button>
            <button type="button" class="cancel-btn">취소</button>
        </div>
    </div>
</template>
