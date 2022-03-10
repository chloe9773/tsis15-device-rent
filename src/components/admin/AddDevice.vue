<!-- 어드민 서브 메뉴 - 새디바이스 추가 화면 -->
<template>
    <div class="right-content b-1 p-35 w-50 border-radius-2">
        <div class="right-content-title mb-20">
            <p class="font-700 t-center">단말기 등록</p>
        </div>
        <hr class="mb-20"/>
        <div class="right-content-wrap w-70 m-auto">
            <div class="device-related-wrap mb-30">
                <!-- <div class="left-wrap w-50">
                    <div class="img-wrap w-80 t-center b-1">
                        <img src="@/assets/img/no-image-ico.png" alt="" width="90%" height="250px" class="mb-10">
                        <input type="file" class="img-upload w-80 mb-10">
                    </div>
                </div> -->
                <div class="mb-20 f-14 w-100">
                    <form id="device-info">
                        <div class="item-wrap p-5 border-radius-2 mb-5 w-100 d-flex m-auto">
                            <span class="item-title mr-5 w-30 pt-7">시리얼 번호 :</span>
                            <div class="b-1 p-5">
                                <input type="text" id="serialnum" name="serialnum" v-model="serialnum" tabindex="1" autofocus>
                            </div>
                        </div>
                        <div class="item-wrap p-5 border-radius-2 mb-5 w-100 d-flex m-auto">
                            <span class="item-title mr-5 w-30 pt-7">종류 :</span>
                            <div class="b-1 p-5">
                                <input type="text" id="category" name="category" v-model="category" tabindex="2" autofocus>
                            </div>
                        </div>
                        <div class="item-wrap p-5 border-radius-2 mb-5 w-100 d-flex m-auto">
                            <span class="item-title mr-5 w-30 pt-7">브랜드 :</span>
                            <div class="b-1 p-5">
                                <input type="text" id="brand" name="brand" v-model="brand" tabindex="3" autofocus>
                            </div>
                        </div>
                        <div class="item-wrap p-5 border-radius-2 mb-5 w-100 d-flex m-auto">
                            <span class="item-title mr-5 w-30 pt-7">OS :</span>
                            <div class="b-1 p-5">
                                <input type="text" id="os" name="os" v-model="os" tabindex="4" autofocus>
                            </div>
                        </div>
                        <div class="item-wrap p-5 border-radius-2 mb-5 w-100 d-flex m-auto">
                            <span class="item-title mr-5 w-30 pt-7">단말기명 :</span>
                            <div class="b-1 p-5">
                                <input type="text" id="name" name="name" v-model="name" tabindex="5" autofocus>
                            </div>
                        </div>
                        <div class="item-wrap p-5 border-radius-2 mb-5 w-100 d-flex m-auto">
                            <span class="item-title mr-5 w-30 pt-7">가격 :</span>
                            <div class="b-1 p-5">
                                <input type="text" id="price" name="price" v-model="price" tabindex="6" autofocus>
                            </div>
                        </div>
                        <div class="item-wrap p-5 border-radius-2 mb-5 w-100 d-flex m-auto">
                            <span class="item-title mr-5 w-30 pt-7">상태 : </span>
                            <div class="b-1 p-5">
                                <input type="text" id="status" name="status" v-model="status" tabindex="7" autofocus>
                            </div>
                        </div>
                        <div class="item-wrap p-5 border-radius-2 mb-5 w-100 d-flex m-auto">
                            <span class="item-title mr-5 w-30 pt-7">구매처 : </span>
                            <div class="b-1 p-5">
                                <input type="text" id="line" name="line" v-model="line" tabindex="8" autofocus>
                            </div>
                        </div>
                        <div class="item-wrap p-5 border-radius-2 mb-5 w-100 d-flex m-auto">
                            <span class="item-title mr-5 w-30 pt-7">메모 : </span>
                            <div class="b-1 p-5">
                                <textarea type="text" id="memo" name="memo" v-model="memo" tabindex="9" autofocus></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <!-- <div class="right-wrap mb-20 f-14 w-50">
                    <form id="device-info">
                        <div class="item-wrap b-1 p-5 border-radius-2 mb-5 w-90">
                            <span class="item-title mr-5">시리얼 번호 :</span>
                            <textarea type="text" id="serialnum" name="serialnum" v-model="serialnum" tabindex="1" autofocus>
                        </div>
                        <div class="item-wrap b-1 p-5 border-radius-2 mb-5 w-90">
                            <span class="item-title mr-5">종류 :</span>
                            <input type="text" id="category" name="category" v-model="category" class="w-70" tabindex="2">
                        </div>
                        <div class="item-wrap b-1 p-5 border-radius-2 mb-5 w-90">
                            <span class="item-title mr-5">브랜드 :</span>
                            <input type="text" id="brand" name="brand" v-model="brand" class="w-70" tabindex="3">
                        </div>
                        <div class="item-wrap b-1 p-5 border-radius-2 mb-5 w-90">
                            <span class="item-title mr-5">OS :</span>
                            <input type="text" id="os" name="os" v-model="os" class="w-80" tabindex="4">
                        </div>
                        <div class="item-wrap b-1 p-5 border-radius-2 mb-5 w-90">
                            <span class="item-title mr-5">단말기명 :</span>
                            <input type="text" id="name" name="name" v-model="name" class="w-70" tabindex="5">
                        </div>
                        <div class="item-wrap b-1 p-5 border-radius-2 mb-5 w-90">
                            <span class="item-title mr-5">가격 :</span>
                            <input type="text" id="price" name="price" v-model="price" class="w-70" tabindex="6">
                        </div>
                        <div class="item-wrap b-1 p-5 border-radius-2 mb-5 w-90">
                            <span class="item-title mr-5">상태 :</span>
                            <input type="text" id="status" name="status" v-model="status" class="w-70" tabindex="7">
                        </div>
                        <div class="item-wrap b-1 p-5 border-radius-2 mb-5 w-90">
                            <span class="item-title mr-5">구매처 :</span>
                            <input type="text" id="link" name="link" v-model="link" class="w-70" tabindex="8">
                        </div>
                        <div class="item-wrap b-1 p-5 border-radius-2 mb-5 w-90">
                            <span class="item-title mr-5">메모 :</span>
                            <textarea id="memo" name="memo" v-model="memo" class="v-top w-80" tabindex="9"></textarea>
                        </div>
                    </form>
                </div> -->
            </div>
        </div>
        <div class="btn-grp t-center">
            <button type="submit" class="active-btn mr-5" v-on:click="addDevice()">등록</button>
            <button type="button" class="cancel-btn" v-on:click="reset()">취소</button>
        </div>
    </div>
</template>

<script>
export default {
  name: 'AddDevice',
  data() {
      return {
          serialnum:"",
          category:"",
          brand:"",
          os:"",
          name:"",
          price:"",
          memo:"",
          link:"",
          status:""
      }
  },
  methods: {
    addDevice () {
        let device = {}
        device.serialnum = this.serialnum
        device.category = this.category
        device.brand = this.brand
        device.os = this.os
        device.name = this.name
        device.price = this.price
        device.status = this.status
        device.link = this.link
        device.memo = this.memo

        if(this.price != undefined && !$.isNumeric(this.price)) {
            alert("가격은 숫자만 입력해주세요.");
        } 
        if(this.serialnum == undefined || this.category == undefined || this.brand == undefined
        || this.os == undefined || this.name == undefined || this.price == undefined || this.memo == undefined) {
            alert("공백칸을 채워주세요.")
        }
        else {
            this.axios
            .post('/item', device)
            .then((res) => {
                alert("단말기가 등록되었습니다.")
            })
            .catch((error) => {
                alert("단말기 등록에 실패했습니다. 잠시 후 다시 시도해주세요.")
            })
        }
    },
    reset() {
        this.$router.go()
    }
  }, 
}
</script>
