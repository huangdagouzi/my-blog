<template>
  <div class="index">
    <div class="swiper">
      <el-carousel height="400px">
        <el-carousel-item v-for="item in imageList" :key="item">
          <img :src="item.src" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="intro">
      <ul>
        <li>
          <img src="../assets/image/doudou.jpg" alt="" @click="$router.push('/blog')" />
          <span>Blog</span>
        </li>
        <li>
          <img src="../assets/image/gucci.jpg" alt="" @click="$router.push('/album')" />
          <span>Album</span>
        </li>
        <li>
          <img src="../assets/image/doudou.jpg" alt="" />
          <span>Contact</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import * as ajaxUrl from '../api/api';
import axios from 'axios';

export default {
  data() {
    return {
      imageList: []
    };
  },
  mounted() {
    this.getBanners();
  },
  methods: {
    getBanners () {
      ajaxUrl.getBanner().then(res => {
        this.imageList = res.data.data.map(v => {
          v.src = axios.defaults.baseURL + '/public/uploads/' + v.address;
          return v;
        })
      })
    }
  },
  components: {}
};
</script>

<style lang="less">
.index {
  .swiper {
    width: 1200px;
    height: 400px;
    margin-top: 30px;
    background: #000;
    .el-carousel {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .intro {
    width: 1200px;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        width: 32%;
        padding: 20px 0;
        text-align: center;
        img {
          width: 100%;
          height: 400px;
          margin-bottom: 10px;
          cursor: pointer;
          border: 1px solid #eee;
        }
        span {
          cursor: pointer;
          color: rgb(102, 102, 102);
          font-size: 14px;
        }
      }
    }
  }
}
</style>
