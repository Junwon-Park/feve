<template>
    <v-tabs>
      <v-tab
          v-for="(tapName, i) in tapNames" :key="i"  color="black"
          @click="onTapChanged(i)"
          class="p-4 black--text text-center flex-col"
          style="flex: 1 !important;"
          >
        <h6 class="text-h6 font-bold" >{{counts[i]}}</h6>
        <h6 class="pb-4">{{tapName}}</h6>
      </v-tab>
    </v-tabs>    
</template>

<script>
export default {
    props:{
        counts:Array,
        tapNames:Array
    },
    data () {
      return {}
    },
    methods: {
      onTapChanged(idx)
      {
        this.$emit("onTapChanged", idx);
      },
    },
}
</script>

<style>
div.v-tabs-slider {
  background-color: #000 !important;
  margin-top: 1px;
}
.v-tab {
  max-width: 33.333% !important;
}
</style>