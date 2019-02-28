<template>
  <div>
    <div class="m-menu">
      <dl class="nav" @mouseleave="leave">
        <dt>全部分类</dt>
        <dd v-for="(item,idx) in $store.state.home.menu" :key="idx" @mouseenter="enter">
          <i :class="item.type"/>
          {{ item.name }}
          <span class="arrow"/>
        </dd>
      </dl>
      <div class="detail" v-if="kind" @mouseenter="sover" @mouseleave="sout">
        <template v-for="(item,idx) in curdetail">
          <h4 :key="idx">{{ item.title }}</h4>
          <span v-for="v in item.child" :key="v">{{ v }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: '',
      menu: [{
        type: 'food',
        name: '美食',
        child: [{
          title: '美食',
          child: ['代金券', '甜品', '自助餐', '火锅']
        }]
      }, {
        type: 'takeout',
        name: '外卖',
        child: [{
          title: '外卖',
          child: ['美团外卖']
        }]
      }, {
        type: 'hotel',
        name: '酒店',
        child: [{
          title: '酒店',
          child: ['经济', '豪华']
        },{
          title: '酒店',
          child: ['经济', '豪华']
        }]
      }]
    }
  },
  methods: {
    leave: function () {
      this._timer = setTimeout(() => {
        this.kind = ''
      }, 150);
    },
    enter: function (e) {
      this.kind = e.target.querySelector('i').className
    },
    sover:function () {
      clearTimeout(this._timer)
    },
    sout:function () {
      this.kind = ''
    }
  },
  computed: {
    curdetail: function () {
      return this.$store.state.home.menu.filter((item) => item.type === this.kind)[0].child
    }
  }
}
</script>

<style scoped>
</style>