<template>
  <div>
    <main class="profile-page">
      <section
        class="relative py-16 bg-blueGray-200 mt-24"
        style="min-height: 80vh"
      >
        <div class="container mx-auto px-4">
          <div
            class="p-8 relative flex flex-col min-w-0 break-words pd-8 bg-white w-full mb-6 rounded-lg"
          >
            <div class="px-6">
              <h1
                class="text-2xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2 text-center m-3"
              >
                판매 하기
              </h1>
            </div>
            <div>
              <div class="flex flex-wrap items-center mt-5 mb-5 px-6">
                <div
                  style="
                    padding-top: 0px;
                    padding-right: 16px;
                    padding-bottom: 20px;
                    padding-left: 16px;
                  "
                >
                  <div class="flex items-center" style="width:100% color:#fff">
                    <div
                      class=""
                      style="
                        width: 80px;
                        height: 80px;
                        flex-shrink: 0;
                        border-radius: 10px;
                        background-clolr: rgb(244, 244, 244);
                        overflow: hidden;
                        position: relative;
                      "
                    >
                      <img
                        :src="imageUrl + item.PRODUCT_PIC"
                        alt="아이템 사진"
                        crossorigin
                      />
                    </div>
                    <div
                      style="
                        overflow: hidden;
                        -webkit-box-flex: 1;
                        -ms-flex: 1;
                        flex: 1;
                        padding-left: 16px;
                      "
                    >
                      <strong
                        style="
                          display: block;
                          line-height: 17px;
                          font-size: 14px;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                        "
                        >{{ item.PRODUCT_BRAND }}</strong
                      >
                      <p
                        style="
                          overflow: hidden;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                          line-height: 17px;
                          margin-top: 1px;
                          font-size: 14px;
                        "
                      >
                        {{ item.PRODUCT_NAME }}
                      </p>
                      <p
                        style="
                          line-height: 16px;
                          font-size: 13px;
                          letter-spacing: -0.07px;
                        "
                      >
                        {{ item.PRODUCT_DESC }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="p-5" style="border-top: 8px; background-color: #fff">
              <section
                class="p-5 m-3 border-bottom: 2px solid rgb(235, 235, 235);"
              >
                <div class="p-4 mx-auto border xl:w-3/12 rounded text-center">
                  <span class="block text-sm">{{ item.PRODUCT_BRAND }}</span>
                  <span
                    class="block text-xs"
                    style="color: green"
                    v-if="hasMinPrice === 0"
                    >-</span
                  >
                  <span class="block text-xs" style="color: green" v-else
                    >{{ buy[0].buy_price }}원</span
                  >
                  <!-- <div  v-else style="margin:auto; max-width:90px;">
                             <span class="block text-sm" style="margin-top:-3px;">ONE SIZE</span>
                             <span class="block text-s" style="color:red">구매 입찰</span>
                           </div>   -->
                </div>
              </section>
            </div>

            <div
              class="text-center mt-6 p-4 xl:w-3/12 bg-black mx-auto rounded-lg"
            >
              <button
                @click="clicked"
                id="change-button"
                style="color: #fafafa !important"
              >
                판매하기
              </button>
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
      hasMinPrice: 0,
      imageUrl: this.$store.getters.ServerUrl + '/getImage?imageName=',
      tab: null,
      text: '판매 희망가',
      month: 0,
      buy: {
        product_key: '',
        buy_price: 0,
        buy_sdate: '',
        buy_edate: '',
        buy_status: '',
        buy_buyer_key:0,
        buy_seller_key:0,
        default: '0'
      },

      item: {
        PRODUCT_KEY: 0,
        PRODUCT_PIC: '',
        PRODUCT_NAME: '',
        PRODUCT_BRAND: '',
        PRODUCT_CATE: 0,
        PRODUCT_ORIPRICE: ''
      }
    };
  },
  methods: {
    clicked() {
      console.log("클릭드 시작");
      if(this.buy[0].buy_buyer_key == JSON.parse(localStorage.getItem('userKey')))
      {
        alert("자신의 상품을 구매할수 없습니다.");
        this.$router.push("/shop");
        return;
      }
      this.$router.push({
        path: './sel',
        name: 'Sell',
        params: {
          PRODUCT_KEY: this.item.PRODUCT_KEY
        }
      });
    }
  },

  mounted() {
    let that = this;
    window.scrollTo(0, 0);
    this.item.PRODUCT_KEY = this.$route.params.PRODUCT_KEY;
    this.$axios
      .get(`${this.$store.getters.ServerUrl}/sell/${this.item.PRODUCT_KEY}`)
      .then(function (res) {
        console.log(res);
        that.item = res.data;
        console.log(that.item);
      })
      .catch(function (err) {
        console.log(err);
      });

    this.$axios
      .post(`${this.$store.getters.ServerUrl}/buy/comp`, {
        productkey: this.$route.params.PRODUCT_KEY
      })
      .then(function (res) {
        that.buy = res.data;
        console.log(that.buy);
        if (
          that.buy === null ||
          that.buy.length == 0 ||
          that.buy[0].buy_price === null
        ) {
          that.hasMinPrice = 0;
        } else {
          that.hasMinPrice = 1;
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }
};
</script>
