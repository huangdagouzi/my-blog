<template>
  <div class="home">
    <my-header></my-header>
    <div class="my-content">
      <transition name="el-fade-in-linear" mode="out-in">
        <keep-alive :include="[]">
          <router-view :key="$route.fullPath"></router-view>
        </keep-alive>
      </transition>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import header from "../components/header";
import footer from "../components/footer";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    myHeader: header,
    myFooter: footer
  }
};
</script>

<style lang="less">
.home {
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  .my-content {
    display: flex;
    justify-content: center;
    padding-bottom: 120px;
  }
  .footer {
    // position: fixed;
    // bottom: 0;
    height: 60px;
    line-height: 60px;
    background: #eee;
    width: 100%;
  }
}
</style>
