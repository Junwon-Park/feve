<template>
    <div class="flex flex-wrap" >
      <div class="w-full lg:w-4/12 md:w-4/12 px-4 my-5"
          style="margin-bottom: 15vh;"
          v-for="(item, i) in items" :key="i"
          @click="onSlotClicked(i)"
          type="button"
      >
          
        <div style="width: 200px; height: 200px; border-radius: 8px;">
          <img
            :src= "imageUrl + item.PRODUCT_PIC"
            style="object-fit: cover; width: 100%; height: 100%;"
            crossorigin
          >
        </div>

        <h5 class="font-bold underline mt-2">
          {{ item.PRODUCT_BRAND }}
        </h5>
        <h5>
        {{ item.PRODUCT_NAME }}
        </h5>
        <h5 class="font-bold mt-1">
          {{ item.MIN_PRICE }}
        </h5>
        <h5 class="text-gray-400" style="font-size: 0.7rem; line-height: 0.75rem; margin-top:-0.2rem">
          즉시 구매가
        </h5>
      </div>
    </div>
</template>

<script>
export default {
  props:{
    state:Number,
    items:Array,
  },
  data() {
    return {
      imageUrl : this.$store.getters.ServerUrl + '/getImage?imageName=',
      // minPrices:[],
    }
  },
  // created() {
  //   console.log("created : this.items.length: ", this.items.length);
  //   // this.minPrices.push();
  //   // this.items.push();
  // },
  // mounted() {
  //   console.log("mounted : this.items.length: ", this.items.length);
  // },
  // updated() {
  //   console.log("updated : this.items.length: ", this.items.length);
  //   //this.setMinPrices();
  // },
  methods:{
    onSlotClicked(idx){
      // console.log("onSlotClicked.idx: ", idx);
      // console.log("onSlotClicked.key: ", this.items[idx].PRODUCT_KEY);
      this.$router.push({path:'./shopview',
        name:'Shopview',
        params:{
          PRODUCT_KEY:this.items[idx].PRODUCT_KEY
        }
      });
    },
    
    // setMinPrices()
    // {
    //   this.minPrices.length = this.items.length;
    //   console.log("this.items.length: ", this.items.length);
    //   let i = 0;
    //   for(let item of this.items)
    //   {
    //     console.log("item.MIN_PRICE: ", item.MIN_PRICE);
    //     console.log("this.minPrices[i]: ", this.minPrices[i]);
        
    //     //this.minPrices[i] = (item.MIN_PRICE == null) ? '-' : item.MIN_PRICE.toLocaleString('ko-KR') + "원";
    //     //this.$set(this.minPrices, i, (item.MIN_PRICE == null) ? '-' : item.MIN_PRICE.toLocaleString('ko-KR') + "원");
    //     // item.MIN_PRICE = (item.MIN_PRICE == null) ? '-' : item.MIN_PRICE.toLocaleString('ko-KR') + "원";
    //     i++;
    //   }
    // }

  }
};
</script>
