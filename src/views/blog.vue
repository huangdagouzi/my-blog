<template>
  <div class="blog">
    <div class="banner"></div>
    <div class="blog-content">
      <div class="article-list">
        <div
          class="article-item"
          v-for="(item, index) in dataList"
          :key="index"
        >
          <div class="title">{{item.title}}</div>
          <div class="subtitle">
            <span>发布日期：{{item.publishTime}}</span>
            <span>分类：{{item.type}}</span>
          </div>
          <div class="article-content">
            <p>
              {{item.content}}
            </p>
          </div>
        </div>
        <el-pagination
          small
          layout="prev, pager, next"
          :total="page.total"
          :page-size="page.pageSize"
          :current-page.sync="page.pageNum"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <div class="type-nav">
        <ul>
          <li>
            <span @click="getData('1')">生活</span>
          </li>
          <li>
            <span @click="getData('2')">技术</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import * as ajaxUrl from "../api/api";
import common from "../assets/js/common";

export default {
  data() {
    return {
      dataList: [],
      page: {
        pageNum: 1,
        pageSize: 5,
        total: 0
      }
    };
  },
  watch: {
    "page.pageNum"() {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getData();
    },
    getData(type) {
      let url = ""
      if (type) {
        url = `pageSize=${this.page.pageSize}&currentPage=${this.page.pageNum}&type=${type}`;
      } else {
        url = `pageSize=${this.page.pageSize}&currentPage=${this.page.pageNum}`;
      }
      
      ajaxUrl
        .getBlogsList(url)
        .then(res => {
          // console.log(res);
          this.dataList = res.data.data.map(v => {
            v.publishTime = v.publishTime ? common.fullTime(v.publishTime) : "";
            v.type = this.handleType(v.type);
            return v;
          });
          this.page.total = res.data.total;
        });
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
    },
    handleType(v) {
      if (v == '1') {
        return "生活"
      } else {
        return "技术"
      }
    }
  },
  components: {}
};
</script>

<style lang="less">
.blog {
  width: 1200px;
  .banner {
    // width: 1200px;
    background: #eee;
    height: 300px;
    margin-top: 30px;
  }
  .blog-content {
    margin-top: 30px;
    .article-list {
      width: 80%;
      float: left;
      border-right: 1px dashed rgba(198, 198, 198, 1);
      box-sizing: border-box;
      .article-item {
        border-bottom: 1px dotted #e5e5e5;
        margin: 10px 20px;
        .title {
          color: #333333;
          font-size: 14px;
          cursor: pointer;
        }
        .subtitle {
          color: #bababa;
          font-size: 12px;
          margin-top: 7px;
          span {
            margin-right: 15px;
          }
        }
        .article-content {
          p {
            margin: 15px 0;
            color: #999999;
            font-size: 13px;
            width: 95%;
          }
        }
        &:last-of-type {
          border-bottom: none;
        }
      }
      .el-pagination {
        clear: both;
        text-align: right;
        margin-right: 50px;
        .el-pager li.active {
          color: #c0c4cc;
        }
        .el-pager li:hover {
          color: #c0c4cc;
        }
      }
    }
    .type-nav {
      float: left;
      width: 20%;
      ul {
        li {
          text-align: center;
          padding: 0 40% 15px 20%;
          span {
            color: #5e5e5e;
            cursor: pointer;
            &:hover {
              color: #7f7f7f;
            }
          }
        }
      }
      // height: 600px;
    }
  }
}
</style>
