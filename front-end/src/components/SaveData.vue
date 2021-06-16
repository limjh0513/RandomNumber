<template>
  <div class="save">
    <div v-if="itemNotExist" class="save_noneItem">
      저장한 데이터가<br />존재하지 않습니다.
    </div>
    <ul v-else class="save_list">
      <li class="save_list_item" v-for="(saveItem, i) in saveItems" :key="i">
        <div class="save_list_item_contents">
          <div class="save_list_item_contents_title">
            {{ saveItem[2] }}
          </div>
          <div class="save_list_item_contents_time">
            {{ saveItem[0] }}
          </div>
          <div class="save_list_item_contents_mode">{{ saveItem[3] }}</div>
        </div>
        <div class="save_list_item_students">
          {{ saveItem[1] }}
        </div>
        <button
          class="save_list_item_deleteButton"
          @click="deleteData(saveItem, i)"
        >
          삭제
        </button>
      </li>
      <li class="save_list_deleteAll">
        <button class="save_list_deleteAll_button" @click="deleteAll()">
          모두 삭제
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
import Swal from "sweetalert2";

export default {
  name: "",
  data() {
    return {
      saveItems: [],
      itemNotExist: true,
    };
  },
  created() {
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).startsWith("save-")) {
          var data = JSON.parse(localStorage.getItem(localStorage.key(i)));
          data[4] = localStorage.key(i);
          this.saveItems.push(data);
        }
      }
      this.bubbleSortData();
    }
    this.saveItemExist();
  },
  methods: {
    deleteData(saveItem, index) {
      localStorage.removeItem(saveItem[4]);
      this.saveItems.splice(index, 1);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "삭제를 완료했습니다...",
        showConfirmButton: false,
        timer: 1000,
      });

      this.saveItemExist();
    },

    deleteAll() {
      for (let key of this.saveItems) {
        localStorage.removeItem(key[4]);
      }

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "모든 데이터 삭제를 완료했습니다...",
        showConfirmButton: false,
        timer: 1000,
      });
      this.saveItemExist();
    },

    bubbleSortData() {
      for (let i = 0; i < this.saveItems.length - 1; i++) {
        for (let j = 1; j < this.saveItems.length - i; j++) {
          if (this.saveItems[j - 1][0] > this.saveItems[j][0]) {
            let step = this.saveItems[j - 1];
            this.saveItems[j - 1] = this.saveItems[j];
            this.saveItems[j] = step;
          }
        }
      }
    },

    saveItemExist() {
      let cnt = 0;
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).startsWith("save-")) {
          cnt++;
        }
      }

      if (cnt > 0) {
        this.itemNotExist = false;
      } else {
        this.itemNotExist = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Bitter:wght@800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Jua&display=swap");

.save {
  margin-top: 50px;
  &_noneItem {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 72px;
    color: #00d2d3;
    text-align: center;

    font-family: "Jua", sans-serif;
  }

  &_list {
    margin: 0 auto;

    &_deleteAll {
      list-style: none;
      &_button {
        cursor: pointer;
        width: 60%;
        height: 75px;
        background: #ff7675;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0px auto;
        margin-bottom: 30px;
        border-radius: 30px;
        font-family: "Jua", sans-serif;
        font-size: 54px;
        padding: 10px;
        color: #fefefe;
        border: none;
      }
    }

    &_item {
      margin-left: 70px;
      background: #f9f9f9;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 10px;
      display: flex;
      align-items: center;
      width: 90%;
      height: 220px;
      margin-bottom: 60px;
      &_contents {
        width: 175px;
        margin: 50px 100px 50px 80px;
        align-items: center;
        &_title {
          font-family: Yu Gothic UI;
          font-style: normal;
          font-weight: 600;
          font-size: 24px;
          line-height: 32px;
          text-align: center;
          padding-bottom: 15px;

          color: #000000;
        }
        &_time {
          font-family: Yu Gothic UI;
          font-style: normal;
          font-weight: 600;
          font-size: 24px;
          line-height: 32px;
          /* identical to box height */

          padding-bottom: 15px;

          color: #575757;
        }
        &_mode {
          font-family: Yu Gothic UI;
          font-style: normal;
          font-weight: 600;
          font-size: 24px;
          line-height: 32px;

          color: #007fff;
        }
      }
      &_students {
        width: 1100px;
        font-family: Tomorrow;
        font-style: normal;
        font-weight: 600;
        font-size: 64px;
        line-height: 120px;
        text-align: start;
        font-family: "Bitter", serif;
        color: #70d6ff;
        overflow-y: scroll;
        height: 180px;
        margin-right: 50px;
        word-spacing: 1em;
      }
      &_deleteButton {
        width: 135px;
        height: 75px;
        border: none;
        background: #ff595e;
        cursor: pointer;
        border-radius: 20px;

        font-family: Tomorrow;
        font-style: normal;
        font-weight: 600;
        font-size: 36px;
        line-height: 43px;
        text-align: center;

        color: #ffffff;
      }
    }
  }
}
</style>
