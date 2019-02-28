<template>
  <section class="m-istyle">
    <dl>
      <dt>有格调</dt>
      <dd @mouseenter="enter" v-for="(item,idx) in title" :key="idx" :class="{active:kind===item.type}" :title="item.type">
        {{item.name}}
      </dd>
    </dl>
    <ul class="ibody">
      <li style="height: 315px;" v-for="(item,idx) in curdetail" :key="idx">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img 
            class="image"
            :src="item.img">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos">
              <span>{{ item.pos }}</span>
            </li>
            <li class="price">￥
              <em>{{ item.price }}</em>
              <span>/起</span>
            </li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
  </template>

<script>
export default {
  data() {
    return {
      kind: 'all',
      title:[{
        type:'all',
        name:'全部'
      },{
        type:'part',
        name:'约会聚餐'
      },{
        type:'spa',
        name:'丽人SPA'
      },{
        type:'movie',
        name:'电影演出'
      },{
        type:'travel',
        name:'品质出行'
      }],
      list: {
        all: [{
          img:'https://p0.meituan.net/msmerchant/1a8aaac8cfcf76fae83c2ecd6405bd4c1457315.jpg@368w_208h_1e_1c',
          title:'北京饭店',
          pos:'特价自助餐',
          price:'238',
          url:''
        },{
          img:'https://p0.meituan.net/msmerchant/1a8aaac8cfcf76fae83c2ecd6405bd4c1457315.jpg@368w_208h_1e_1c',
          title:'北京饭店',
          pos:'特价自助餐',
          price:'238',
          url:''
        },{
          img:'https://p0.meituan.net/msmerchant/1a8aaac8cfcf76fae83c2ecd6405bd4c1457315.jpg@368w_208h_1e_1c',
          title:'北京饭店',
          pos:'特价自助餐',
          price:'238',
          url:''
        },{
          img:'https://p0.meituan.net/msmerchant/1a8aaac8cfcf76fae83c2ecd6405bd4c1457315.jpg@368w_208h_1e_1c',
          title:'北京饭店',
          pos:'特价自助餐',
          price:'238',
          url:''
        }],
        part: [{
          img:'https://p0.meituan.net/msmerchant/ed959dc1ed655b6d71df3bbbf3c7e69f1313046.jpg@368w_208h_1e_1c',
          title:'好嗨哟',
          pos:'特价自助餐',
          price:'238',
          url:''
        },{
          img:'https://p0.meituan.net/msmerchant/ed959dc1ed655b6d71df3bbbf3c7e69f1313046.jpg@368w_208h_1e_1c',
          title:'好嗨哟',
          pos:'特价自助餐',
          price:'238',
          url:''
        },{
          img:'https://p0.meituan.net/msmerchant/ed959dc1ed655b6d71df3bbbf3c7e69f1313046.jpg@368w_208h_1e_1c',
          title:'好嗨哟',
          pos:'特价自助餐',
          price:'238',
          url:''
        },{
          img:'https://p0.meituan.net/msmerchant/ed959dc1ed655b6d71df3bbbf3c7e69f1313046.jpg@368w_208h_1e_1c',
          title:'好嗨哟',
          pos:'特价自助餐',
          price:'238',
          url:''
        }],
        spa: [{
          img:'https://p1.meituan.net/deal/b3386d5f861016c2d4ba15b52302164b69715.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C368w_208h_1e_1c',
          title:'北京饭店',
          pos:'特价自助餐',
          price:'238',
          url:''
        },],
        movie: [{
          img:'https://p0.meituan.net/poi/c2b482474377fc31a8311f46055f40b0442616.png@368w_208h_1e_1c',
          title:'北京饭店',
          pos:'特价自助餐',
          price:'238',
          url:''
        },],
        travel: [{
          img:'https://p1.meituan.net/tdchotel/4a55391b41bb44d53f90f9880d3f85aa3063529.jpg@368w_208h_1e_1c',
          title:'北京饭店',
          pos:'特价自助餐',
          price:'238',
          url:''
        },]
      }
    }

  },
  methods: {
    enter: function (e) {
      this.kind = e.target.title
      console.log(this.list[this.kind])
    }
  },
  computed: {
    curdetail:function () {
      return this.list[this.kind]
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/index/artistic.scss";
</style>