<template>
  <div class="my-header">
    <div class="container">
      <div class="title">小黄同学的日常</div>
      <div class="nav-bar">
        <ul>
          <li @click="$router.push('/')">首页</li>
          <!-- <li @click="$router.push('/intro')">简介</li> -->
          <li @click="$router.push('/blog')">博客</li>
          <li @click="$router.push('/album')">相册</li>
          <li>联系</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  components: {}
};
</script>

<style lang="less">
.my-header {
  display: flex;
  justify-content: center;
  .container {
    .title {
      color: rgb(128, 128, 128);
      font-size: 28px;
      letter-spacing: 10px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .nav-bar {
      display: flex;
      justify-content: center;
      border-top: 1px solid #bababa;
      border-bottom: 1px solid #bababa;
      min-width: 1200px;
      color: #6b6b6b;
      font-size: 14px;
      ul {
        display: flex;
        flex-direction: row;
        li {
          cursor: pointer;
          padding: 8px 10px;
          margin: 0 20px;
          transition: color 0.2s ease;
          &:hover {
            color: #000;
          }
        }
      }
    }
  }
}
</style>
