<template>
  <div class="selectOne">
    <div class="selectOne_title">
      발표 할 번호는?
      <button class="selectOne_title_saveButton" @click="saveOnClick">
        저장
      </button>
    </div>
    <div class="selectOne_show">
      <div v-if="showWaitTime" class="selectOne_show_wait">
        {{ currentWaitTime }}
      </div>
      <div v-else class="selectOne_show_students">
        {{ selected }}
      </div>
    </div>
    <div class="selectOne_input">
      <div class="selectOne_input_inputBox">
        <div class="selectOne_input_inputBox_title">
          학생 수
        </div>
        <div class="selectOne_input_inputBox_action">
          <input
            class="selectOne_input_inputBox_action_studentInput"
            v-model="studentCount"
            type="number"
          />
          <Button
            class="selectOne_input_inputBox_action_button"
            @click="selectOnClick"
            >시작</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { DateTime } from "luxon";
import Swal from "sweetalert2";
export default {
  name: "",
  data() {
    return {
      selected: "",
      studentCount: 0,
      showWaitTime: false,
      currentWaitTime: "",
    };
  },
  methods: {
    startTimer(sec) {
      if (sec == 0) {
        this.showWaitTime = false;
      } else {
        this.currentWaitTime = sec;
        setTimeout(() => {
          this.startTimer(--sec);
        }, 1000);
      }
    },
    selectOnClick() {
      if (this.studentCount > 0) {
        this.selected = parseInt(Math.random() * this.studentCount) + 1; //랜덤으로 번호 뽑기
        this.showWaitTime = true; //기다리는 시간 보여주기
        this.startTimer(3);
      } else {
        Swal.fire(
          "학생 수가 0보다 커야 해요",
          "학생 수가 0보다 커야 유효한 값을 뽑을 수 있습니다.",
          "error"
        );
      }
    },
    async saveOnClick() {
      if (this.selected === "") {
        Swal.fire({
          title: "Error!",
          text: "저장 할 값이 존재하지 않습니다.",
          icon: "error",
          confirmButtonText: "알겠습니다.",
        });
      } else {
        var saveTitle;
        const { value: title } = await Swal.fire({
          title: "저장 할 제목을 입력해주세요" + "<br/>" + "(총 14 글자까지)",
          input: "text",
          inputLabel: "저장한 이유를 알기 쉽도록 제목을 정해주세요",
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return "제목을 입력해주세요!";
            }
          },
        });

        if (title) {
          if (title.length > 14) {
            Swal.fire(
              "저장 실패",
              "입력한 제목이 14글자가" +
                "<br/>" +
                "넘어가 저장하지 못했습니다.",
              "error"
            );
          } else {
            saveTitle = title;

            var saveId = localStorage.length + 1;

            var currentTime = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");
            var saveData = [];
            saveData[0] = currentTime;
            saveData[1] = this.selected;
            saveData[2] = saveTitle;
            saveData[3] = "한명씩";

            localStorage.setItem(saveId, JSON.stringify(saveData));

            Swal.fire("저장 완료", "저장을 완료했습니다!", "success");
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Jua&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Sunflower:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Bitter:wght@800&display=swap");

.selectOne {
  &_title {
    font-family: "Sunflower", sans-serif;
    letter-spacing: 0.1em;
    font-style: normal;
    font-weight: 600;
    font-size: 64px;
    line-height: 77px;
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 24px 0 24px 215px;

    color: #000000;

    &_saveButton {
      width: 135px;
      height: 75px;
      background: #6ede8a;
      border-radius: 20px;
      border: none;

      cursor: pointer;
      letter-spacing: 0.1em;
      font-weight: 400;
      font-size: 36px;
      line-height: 43px;
      text-align: center;

      font-family: "Jua", sans-serif;

      margin-left: 80px;

      color: #ffffff;
    }
  }
  &_show {
    height: 360px;
    margin: 24px;

    font-family: "Bitter", serif;
    font-style: normal;
    font-size: 304px;
    line-height: 346px;
    text-align: center;

    &_wait {
      color: #70d6ff;
    }
    &_students {
      color: #eb4d4b;
    }
  }

  &_input {
    display: flex;
    align-items: center;

    margin: 20px;
    &_inputBox {
      &_title {
        margin-right: 710px;
        font-family: "Sunflower", sans-serif;
        font-style: normal;
        font-weight: 550;
        font-size: 48px;
        line-height: 58px;
        text-align: center;
        margin-bottom: 30px;
        color: #000000;
      }

      &_action {
        &_studentInput {
          width: 370px;
          height: 115px;

          font-size: 56px;
          text-align: center;

          background: #ffffff;
          border: 1px solid #8d8d8d;
          box-sizing: border-box;
          border-radius: 20px;
          margin-left: 240px;
        }
        &_button {
          width: 250px;
          height: 100px;
          border: none;
          background: #ff7979;
          border-radius: 15px;

          cursor: pointer;

          font-family: "Jua", sans-serif;
          letter-spacing: 0.15em;
          font-style: normal;
          font-weight: 300;
          font-size: 48px;
          line-height: 58px;
          text-align: center;

          color: #000000;

          margin-left: 700px;
        }
      }
    }
  }
}
</style>
