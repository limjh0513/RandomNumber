<template>
  <div class="selectSeveral">
    <div class="selectSeveral_title">
      발표 할 번호는?
      <button class="selectSeveral_title_saveButton" @click="saveOnClick">
        저장
      </button>
    </div>
    <div class="selectSeveral_show">
      <div v-if="showWaitTime" class="selectSeveral_show_wait">
        {{ currentWaitTime }}
      </div>
      <div v-else class="selectSeveral_show_student">
        {{ selected }}
      </div>
    </div>
    <div class="selectSeveral_input">
      <div class="selectSeveral_input_inputBox">
        <div class="selectSeveral_input_inputBox_contents">
          <div class="selectSeveral_input_inputBox_contents_studentCount">
            학생 수
          </div>
          <div class="selectSeveral_input_inputBox_contents_announStudents">
            발표 할 학생 수
          </div>
          <div class="selectSeveral_input_inputBox_contents_overlap">
            중복
          </div>
        </div>
        <div class="selectSeveral_input_inputBox_action">
          <input
            class="selectSeveral_input_inputBox_action_studentInput"
            v-model.number="studentCount"
            type="number"
            max="10000"
          />
          <input
            class="selectSeveral_input_inputBox_action_selectCountInput"
            v-model.number="announStudents"
            type="number"
            max="10000"
          />
          <input
            class="selectSeveral_input_inputBox_action_overlapInput"
            v-model="overlapChecked"
            type="checkbox"
          />
          <Button
            class="selectSeveral_input_inputBox_action_button"
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
      announStudents: 0,
      overlapChecked: false,
      showWaitTime: false,
      currentWaitTime: "",
    };
  },
  methods: {
    startTimer(sec) {
      if (sec == 0) {
        this.showWaitTime = false;
        this.currentWaitTime = "";
      } else {
        this.currentWaitTime = sec;
        setTimeout(() => {
          this.startTimer(--sec);
        }, 1000);
      }
    },
    selectOnClick() {
      if (this.studentCount > 0) {
        if (this.studentCount > 10000) {
          Swal.fire(
            "뽑을 학생 수가 너무 많아요",
            "너무 많은 학생 수를 뽑게 되면 너무 많은 시간이 걸리게 됩니다... 10000 이하의 수까지 입력해주세요",
            "error"
          );
        } else {
          if (this.currentWaitTime === "") {
            this.selected = "";
            var selectServeral = []; //값을 넣을 변수
            var index = 0; //현재 배열에 값이 몇개 들어가 있는 지 확인
            var check = true; // 배열 내에 같은 값이 있는 지 확인
            this.studentCount = Math.round(this.studentCount);
            this.showWaitTime = true;
            if (!this.overlapChecked) {
              if (this.studentCount < this.announStudents) {
                Swal.fire(
                  "이 창이 떴나요?",
                  "발표할 학생 수가 전체 학생 수보다 작을 때, 번호를 뽑지 못합니다. 발표할 학생 수가 전체 학생 수보다 작게 입력해주세요.",
                  "question"
                );
              } else {
                while (index < this.announStudents) {
                  //발표 시킬 학생 수 만큼
                  var num1 = parseInt(Math.random() * this.studentCount) + 1; //랜덤으로 1 ~ 번호까지
                  check = true;

                  for (var i = 0; i < index; i++) {
                    if (selectServeral[i] == num1) {
                      check = false; //같은 값이 들어가 있기 때문에 배열에 추가하지 않기 위해 false
                      break;
                    }
                  }
                  if (check) {
                    // 확인 후 같은 값이 없다면 배열에 추가
                    selectServeral[index] = num1;
                    index++;
                  }
                }
              }
            } else {
              while (index < this.announStudents) {
                //발표 시킬 학생 수 만큼
                var num2 = parseInt(Math.random() * this.studentCount) + 1; //랜덤으로 1 ~ 번호까지
                selectServeral[index] = num2;
                index++;
              }
            }
            this.startTimer(3);

            for (var k = 0; k < index; k++) {
              this.selected += selectServeral[k] + " ";
            }
          }
        }
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

            var saveId = "save-" + (localStorage.length + 1);

            var currentTime = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");
            var saveData = [];
            saveData[0] = currentTime;
            saveData[1] = this.selected;
            saveData[2] = saveTitle;
            saveData[3] = "N명씩";
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

.selectSeveral {
  &_title {
    font-family: "Sunflower", sans-serif;
    letter-spacing: 0.1em;
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
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
    height: 160px;
    margin: 24px;
    padding: 15px;

    font-family: "Bitter", serif;
    font-style: normal;

    line-height: 130px;
    text-align: center;

    word-spacing: 5rem;

    overflow: scroll;
    overflow-x: hidden;
    &_student {
      color: #eb4d4b;
      font-size: 80px;
    }
    &_wait {
      color: #70d6ff;
      font-size: 180px;
    }
  }

  &_input {
    display: flex;
    align-items: center;

    margin: 20px;
    &_inputBox {
      &_contents {
        display: flex;

        &_studentCount {
          font-family: "Sunflower", sans-serif;
          font-style: normal;
          font-weight: 550;
          font-size: 24px;
          text-align: center;
          margin-bottom: 30px;
          color: #000000;
          margin-left: 100px;
        }

        &_announStudents {
          font-family: "Sunflower", sans-serif;
          font-style: normal;
          font-weight: 550;
          font-size: 24px;
          text-align: center;
          margin-bottom: 30px;
          color: #000000;
          margin-left: 140px;
        }

        &_overlap {
          font-family: "Sunflower", sans-serif;
          font-style: normal;
          font-weight: 550;
          font-size: 24px;
          text-align: center;
          margin-bottom: 30px;
          color: #000000;
          margin-left: 140px;
          letter-spacing: 0.05em;
        }
      }

      &_action {
        display: flex;
        align-items: center;

        &_studentInput {
          width: 120px;
          height: 80px;

          font-size: 20px;
          text-align: center;

          background: #ffffff;
          border: 1px solid #8d8d8d;
          box-sizing: border-box;
          border-radius: 20px;
          margin-left: 70px;
        }

        &_selectCountInput {
          width: 120px;
          height: 80px;

          font-size: 20px;
          text-align: center;

          background: #ffffff;
          border: 1px solid #8d8d8d;
          box-sizing: border-box;
          border-radius: 20px;
          margin-left: 130px;
        }

        &_overlapInput {
          width: 50px;
          height: 50px;
          margin-left: 153px;
        }

        &_button {
          width: 120px;
          height: 80px;
          border: none;
          background: #ff7979;
          border-radius: 15px;

          cursor: pointer;

          font-family: "Jua", sans-serif;
          letter-spacing: 0.15em;
          font-style: normal;
          font-weight: 300;
          font-size: 32px;
          line-height: 58px;
          text-align: center;

          color: #ffffff;

          margin-left: 190px;
        }
      }
    }
  }
}

@media (min-width: 1200px) {
  .selectSeveral {
    &_title {
      font-family: "Sunflower", sans-serif;
      letter-spacing: 0.1em;
      font-style: normal;
      font-weight: 600;
      font-size: 48px;
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
      height: 160px;
      margin: 24px;
      padding: 15px;

      font-family: "Bitter", serif;
      font-style: normal;

      line-height: 130px;
      text-align: center;

      word-spacing: 5rem;

      overflow: scroll;
      overflow-x: hidden;
      &_student {
        color: #eb4d4b;
        font-size: 80px;
      }
      &_wait {
        color: #70d6ff;
        font-size: 180px;
      }
    }

    &_input {
      display: flex;
      align-items: center;

      margin: 20px;
      &_inputBox {
        &_contents {
          display: flex;

          &_studentCount {
            font-family: "Sunflower", sans-serif;
            font-style: normal;
            font-weight: 550;
            font-size: 32px;
            text-align: center;
            margin-bottom: 30px;
            color: #000000;
            margin-left: 120px;
          }

          &_announStudents {
            font-family: "Sunflower", sans-serif;
            font-style: normal;
            font-weight: 550;
            font-size: 32px;
            text-align: center;
            margin-bottom: 30px;
            color: #000000;
            margin-left: 160px;
          }

          &_overlap {
            font-family: "Sunflower", sans-serif;
            font-style: normal;
            font-weight: 550;
            font-size: 32px;
            text-align: center;
            margin-bottom: 30px;
            color: #000000;
            margin-left: 160px;
            letter-spacing: 0.05em;
          }
        }

        &_action {
          display: flex;
          align-items: center;

          &_studentInput {
            width: 160px;
            height: 80px;

            font-size: 28px;
            text-align: center;

            background: #ffffff;
            border: 1px solid #8d8d8d;
            box-sizing: border-box;
            border-radius: 20px;
            margin-left: 80px;
          }

          &_selectCountInput {
            width: 160px;
            height: 80px;

            font-size: 28px;
            text-align: center;

            background: #ffffff;
            border: 1px solid #8d8d8d;
            box-sizing: border-box;
            border-radius: 20px;
            margin-left: 150px;
          }

          &_overlapInput {
            width: 50px;
            height: 50px;
            margin-left: 180px;
          }

          &_button {
            width: 140px;
            height: 80px;
            border: none;
            background: #ff7979;
            border-radius: 15px;

            cursor: pointer;

            font-family: "Jua", sans-serif;
            letter-spacing: 0.15em;
            font-style: normal;
            font-weight: 300;
            font-size: 32px;
            line-height: 58px;
            text-align: center;

            color: #ffffff;

            margin-left: 190px;
          }
        }
      }
    }
  }
}

@media (min-width: 1500px) {
  .selectSeveral {
    &_title {
      font-family: "Sunflower", sans-serif;
      letter-spacing: 0.1em;
      font-style: normal;
      font-weight: 600;
      font-size: 48px;
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
      height: 180px;
      margin: 24px;
      padding: 15px;

      font-family: "Bitter", serif;
      font-style: normal;

      line-height: 130px;
      text-align: center;

      word-spacing: 5rem;

      overflow: scroll;
      overflow-x: hidden;
      &_student {
        color: #eb4d4b;
        font-size: 80px;
      }
      &_wait {
        color: #70d6ff;
        font-size: 180px;
      }
    }

    &_input {
      display: flex;
      align-items: center;

      margin: 20px;
      &_inputBox {
        &_contents {
          display: flex;

          &_studentCount {
            font-family: "Sunflower", sans-serif;
            font-style: normal;
            font-weight: 550;
            font-size: 36px;
            text-align: center;
            margin-bottom: 30px;
            color: #000000;
            margin-left: 140px;
          }

          &_announStudents {
            font-family: "Sunflower", sans-serif;
            font-style: normal;
            font-weight: 550;
            font-size: 36px;
            text-align: center;
            margin-bottom: 30px;
            color: #000000;
            margin-left: 240px;
          }

          &_overlap {
            font-family: "Sunflower", sans-serif;
            font-style: normal;
            font-weight: 550;
            font-size: 36px;
            text-align: center;
            margin-bottom: 30px;
            color: #000000;
            margin-left: 200px;
            letter-spacing: 0.05em;
          }
        }

        &_action {
          display: flex;
          align-items: center;

          &_studentInput {
            width: 220px;
            height: 115px;

            font-size: 48px;
            text-align: center;

            background: #ffffff;
            border: 1px solid #8d8d8d;
            box-sizing: border-box;
            border-radius: 20px;
            margin-left: 80px;
          }

          &_selectCountInput {
            width: 220px;
            height: 115px;

            font-size: 48px;
            text-align: center;

            background: #ffffff;
            border: 1px solid #8d8d8d;
            box-sizing: border-box;
            border-radius: 20px;
            margin-left: 180px;
          }

          &_overlapInput {
            width: 60px;
            height: 60px;
            margin-left: 205px;
          }

          &_button {
            width: 180px;
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

            color: #ffffff;

            margin-left: 210px;
          }
        }
      }
    }
  }
}

@media (min-width: 1700px) {
  .selectSeveral {
    &_title {
      font-family: "Sunflower", sans-serif;
      letter-spacing: 0.1em;
      font-style: normal;
      font-weight: 600;
      font-size: 48px;
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
      height: 270px;
      margin: 24px;
      padding: 15px;

      font-family: "Bitter", serif;
      font-style: normal;

      line-height: 130px;
      text-align: center;

      word-spacing: 5rem;

      overflow: scroll;
      overflow-x: hidden;
      &_student {
        color: #eb4d4b;
        font-size: 80px;
      }
      &_wait {
        color: #70d6ff;
        font-size: 180px;
      }
    }

    &_input {
      display: flex;
      align-items: center;

      margin: 20px;
      &_inputBox {
        &_contents {
          display: flex;

          &_studentCount {
            font-family: "Sunflower", sans-serif;
            font-style: normal;
            font-weight: 550;
            font-size: 48px;
            text-align: center;
            margin-bottom: 30px;
            color: #000000;
            margin-left: 150px;
          }

          &_announStudents {
            font-family: "Sunflower", sans-serif;
            font-style: normal;
            font-weight: 550;
            font-size: 48px;
            text-align: center;
            margin-bottom: 30px;
            color: #000000;
            margin-left: 240px;
          }

          &_overlap {
            font-family: "Sunflower", sans-serif;
            font-style: normal;
            font-weight: 550;
            font-size: 48px;
            text-align: center;
            margin-bottom: 30px;
            color: #000000;
            margin-left: 200px;
            letter-spacing: 0.05em;
          }
        }

        &_action {
          display: flex;
          align-items: center;

          &_studentInput {
            width: 260px;
            height: 115px;

            font-size: 48px;
            text-align: center;

            background: #ffffff;
            border: 1px solid #8d8d8d;
            box-sizing: border-box;
            border-radius: 20px;
            margin-left: 80px;
          }

          &_selectCountInput {
            width: 260px;
            height: 115px;

            font-size: 48px;
            text-align: center;

            background: #ffffff;
            border: 1px solid #8d8d8d;
            box-sizing: border-box;
            border-radius: 20px;
            margin-left: 210px;
          }

          &_overlapInput {
            width: 80px;
            height: 80px;
            margin-left: 215px;
          }

          &_button {
            width: 200px;
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

            color: #ffffff;

            margin-left: 230px;
          }
        }
      }
    }
  }
}

@media (min-width: 1900px) {
  .selectSeveral {
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
      padding: 15px;

      font-family: "Bitter", serif;
      font-style: normal;

      line-height: 150px;
      text-align: center;

      word-spacing: 5rem;

      overflow: scroll;
      overflow-x: hidden;
      &_student {
        color: #eb4d4b;
        font-size: 80px;
      }
      &_wait {
        color: #70d6ff;
        font-size: 200px;
      }
    }

    &_input {
      display: flex;
      align-items: center;

      margin: 20px;
      &_inputBox {
        &_contents {
          display: flex;

          &_studentCount {
            font-family: "Sunflower", sans-serif;
            font-style: normal;
            font-weight: 550;
            font-size: 48px;
            line-height: 58px;
            text-align: center;
            margin-bottom: 30px;
            color: #000000;
            margin-left: 200px;
          }

          &_announStudents {
            font-family: "Sunflower", sans-serif;
            font-style: normal;
            font-weight: 550;
            font-size: 48px;
            line-height: 58px;
            text-align: center;
            margin-bottom: 30px;
            color: #000000;
            margin-left: 350px;
          }

          &_overlap {
            font-family: "Sunflower", sans-serif;
            font-style: normal;
            font-weight: 550;
            font-size: 48px;
            line-height: 58px;
            text-align: center;
            margin-bottom: 30px;
            color: #000000;
            margin-left: 250px;
            letter-spacing: 0.05em;
          }
        }

        &_action {
          display: flex;
          align-items: center;

          &_studentInput {
            width: 370px;
            height: 115px;

            font-size: 56px;
            text-align: center;

            background: #ffffff;
            border: 1px solid #8d8d8d;
            box-sizing: border-box;
            border-radius: 20px;
            margin-left: 80px;
          }

          &_selectCountInput {
            width: 370px;
            height: 115px;

            font-size: 56px;
            text-align: center;

            background: #ffffff;
            border: 1px solid #8d8d8d;
            box-sizing: border-box;
            border-radius: 20px;
            margin-left: 190px;
          }

          &_overlapInput {
            width: 100px;
            height: 100px;
            margin-left: 210px;
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

            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
