<template>
  <div>
    <main class="md:ml-12">
      <section class="mt-16 relative block py-24 lg:pt-0">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap justify-center">
            <div class="w-full">
              <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200"
              >
                <div class="flex-auto p-5 lg:p-10">
                  <h4 class="text-2xl font-semibold">상품 등록</h4>

                  <div class="flex flex-wrap">
                    <div class="relative mb-3 mt-8 w-full lg:w-6/12 pr-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="상품명"
                      >
                        상품명
                      </label>
                      <input
                        type="text"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="상품명"
                        v-model="product.product_name"
                      />
                    </div>

                    <div class="relative mb-3 mt-8 w-full lg:w-6/12 pr-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="모델명"
                      >
                        모델명
                      </label>
                      <input
                        type="text"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="모델명"
                        v-model="product.product_mnum"
                      />
                    </div>

                    <div class="relative mb-3 mt-8 w-full lg:w-6/12 pr-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="브랜드명"
                      >
                        브랜드명
                      </label>

                      <select
                        id="brand"
                        class="w-full px-3 py-3 shadow"
                        @change="secondClassCate($event)"
                        v-model="product.product_brand"
                      >
                        <option
                          v-for="(brand, idx) in product.product_get_brand"
                          :key="idx"
                          :value="brand['CATEGORY_NAME']"
                        >
                          {{ brand['CATEGORY_DESC'] }}
                        </option>
                      </select>
                    </div>

                    <div class="relative mb-3 mt-8 w-full lg:w-6/12 pr-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="카테고리"
                      >
                        카테고리
                      </label>
                      <select
                        id="category"
                        class="w-full px-3 py-3 shadow"
                        v-model="product.product_cate"
                        disabled
                      >
                        <option
                          v-for="(cate, idx) in product.product_get_cate"
                          :key="idx"
                          :value="cate['CATEGORY_KEY']"
                        >
                          {{ cate['CATEGORY_DESC'] }}
                        </option>
                      </select>
                    </div>

                    <div class="relative mb-3 mt-8 w-full lg:w-6/12 pr-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="출시일"
                      >
                        출시일
                      </label>
                      <input
                        type="date"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="출시일"
                        v-model="product.product_ldate"
                      />
                    </div>

                    <div class="relative mb-3 mt-8 w-full lg:w-6/12 pr-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="상품원가"
                      >
                        상품원가(발매가)
                      </label>
                      <input
                        type="text"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="상품원가"
                        v-model="product.product_oriprice"
                        @input="
                          (e) =>
                            (product.product_oriprice = changeNum(
                              e.target.value
                            ))
                        "
                      />
                    </div>

                    <div class="relative mb-3 mt-8 w-full lg:w-6/12 pr-3">
                      <form>
                        <label
                          class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="상품사진경로"
                        >
                          사진
                          <small class="text-red-500">
                            **최대 세 장, 첫 번째 사진이 메인사진입니다.</small
                          >
                        </label>
                        <input
                          type="file"
                          id="uploadImg"
                          name="image"
                          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="사진경로"
                          multiple
                          @change="handleImage"
                        />
                      </form>
                    </div>

                    <div class="relative w-full mb-3">
                      <label
                        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="상품 설명"
                      >
                        상품 설명
                      </label>
                      <textarea
                        rows="15"
                        cols="80"
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="상품 설명"
                        style="background: #fff !important"
                        v-model="product.product_desc"
                      />
                    </div>
                    <div class="text-center mt-6">
                      <button
                        class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        @click="formSubmit()"
                      >
                        작성하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: {
        product_name: '',
        product_mnum: '',
        product_ldate: '',
        product_pic1: '',
        product_pic2: '',
        product_pic3: '',
        product_oriprice: '',
        product_desc: '',
        product_wdate: '',
        product_brand: '',
        product_get_brand: '',
        product_cate: '',
        product_get_cate: '',
        default: '0'
      },
      uploadServerImg: '',
      uploadServerImgArray: []
    };
  },

  components: {},

  //돔이 그려지기 시작하면 대분류 카테고리 가져오기
  created() {
    let that = this;
    this.$axios
      .get(`${this.$store.getters.ServerUrl}/category`)
      .then(function (res) {
        that.product.product_get_brand = res.data;
      })
      .catch(function (err) {
        console.log(err);
      });
  },

  methods: {
    handleImage(e) {
      this.uploadServerImg = e.target.files;
      this.uploadServerImgArray = Array.prototype.slice.call(
        this.uploadServerImg
      );

      let that = this;
      if (this.uploadServerImg.length <= 3) {
        that.product.product_pic1 = this.uploadServerImgArray[0].name;
        that.product.product_pic2 = this.uploadServerImgArray[1].name;
        that.product.product_pic3 = this.uploadServerImgArray[2].name;
      } else if (this.uploadServerImgArray.length > 3) {
        alert('사진은 세 장만 등록할 수 있습니다.');
        document.querySelector('#uploadImg').value = '';
      } else {
        that.product.imgsrc = 'icon_question';
      }
    },
    formSubmit() {
      const curr = new Date();
      const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
      const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
      const kr_curr = new Date(utc + KR_TIME_DIFF);

      this.$axios
        .post(`${this.$store.getters.ServerUrl}/admin/addproduct`, {
          product_brand: this.product.product_brand,
          product_name: this.product.product_name,
          product_mnum: this.product.product_mnum,
          product_ldate: this.product.product_ldate,
          product_pic: this.product.product_pic1,
          product_pic2: this.product.product_pic2,
          product_pic3: this.product.product_pic3,
          product_desc: this.product.product_desc,
          product_oriprice: this.product.product_oriprice.replace(',', ''),
          product_wdate: kr_curr,
          product_cate: this.product.product_cate
        })
        .then(() => {
          alert('상품이 등록되었습니다.');
          this.$router.push('/admin');
        })
        .catch((error) => {
          console.log(error);
        });

      let that = this;

      // let files = that.uploadServerImg;
      // console.log("file", files)
      // console.log("file", typeof that.uploadServerImgArray)
      const formData = new FormData();
      [].forEach.call(that.uploadServerImg, (files) => {
        formData.append('image', files);
      });

      this.$axios
        .post(`${this.$store.getters.ServerUrl}/uploadImage`, formData, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(function (res) {
          console.log(res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    //중분류 가져오기
    secondClassCate(event) {
      //console.log(event.target.value);
      let that = this;
      this.$axios
        .post(`${this.$store.getters.ServerUrl}/category/second`, {
          product_brand: event.target.value
        })
        .then(function (res) {
          that.product.product_get_cate = res.data;
          document.querySelector('#category').disabled = false;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    changeNum: function (value) {
      return (value = this.comma(this.uncomma(value)));
    },
    comma(str) {
      str = String(str);
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },
    uncomma(str) {
      str = String(str);
      return str.replace(/[^\d]+/g, '');
    }
  },
  filters: {
    inputNumberFormat(val) {
      return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
};
</script>
