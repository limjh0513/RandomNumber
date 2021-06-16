<template>
  <div class="helpView">
    <div class="helpView_title">
      도움말
      <div class="helpView_title_image">
        <img
          src="../../public/image/information.png"
          width="60px"
          height="60px"
          alt="도움말 로고"
        />
      </div>
      <div class="helpView_title_guide">
        Chrome 1920/1080<br />
        100%에 최적화 되어있습니다.
      </div>
    </div>
    <div class="helpView_contents">
      <div class="helpView_contents_oneStudent">
        <div class="helpView_contents_oneStudent_title">
          1명씩
        </div>
        <div class="helpView_contents_oneStudent_contents">
          학생 수 만큼 숫자를 입력하고 시작 버튼을<br />
          누르면 랜덤으로 번호가 생성되어<br />
          번호 1개가 보여집니다.
        </div>
      </div>
      <div class="helpView_contents_severalStudents">
        <div class="helpView_contents_severalStudents_title">
          N명씩
        </div>
        <div class="helpView_contents_severalStudents_contents">
          학생 수 만큼 숫자를 입력하고 발표할 학생 수를<br />
          입력한 후 시작 버튼을 누르면 랜덤으로 번호가<br />
          생성되어 발표할 학생 수 만큼 번호가 보여집니다.<br />
          너무 큰 숫자를 입력하면 많은 시간이 소요되기 때문에<br />
          최대 10000까지의 숫자를 뽑을 수 있습니다.<br />
          번호가 중복되게 하고 싶을 때에는<br />중복 부분에 체크를 해주세요
        </div>
        <div class="helpView_contents_severalStudents_down">밑으로⬇</div>
      </div>
      <div class="helpView_contents_number">
        <div class="helpView_contents_number_title">
          번호뽑기
        </div>
        <div class="helpView_contents_number_contents">
          1명씩, n명씩 번호뽑기는 모두 3초 후 번호를 보여줍니다.<br />
          파란색으로 글자가 3, 2, 1이 보인 후<br />빨간색 글자로 뽑은 번호를
          보여줍니다.
        </div>
      </div>
      <div class="helpView_contents_saveNumber">
        <div class="helpView_contents_saveNumber_title">저장</div>
        <div class="helpView_contents_saveNumber_contents">
          번호를 뽑은 후 저장 버튼을 클릭하면<br />
          뽑은 번호를 저장을 할 수 있습니다.<br />
          저장은 현재 브라우저의 로컬 스토리지라는 곳에<br />저장이 됩니다. 사용
          중이던 브라우저를<br />삭제하거나 초기화하면 저장된 데이터는<br />
          모두 삭제됩니다. 또, 다른 브라우저를<br />
          사용하면 저장했던 데이터가 보이지 않습니다.<br />
          맨 밑에 모두 삭제 버튼을 클릭하면<br />
          모든 데이터가 삭제됩니다.
        </div>
      </div>
    </div>
    <div class="helpView_contact">
      <div class="helpView_contact_descriptionOne">
        사용 중 불편사항 또는<br />건의사항이 있을 때
      </div>
      <a
        class="helpView_contact_github"
        href="https://github.com/limjh0513/RandomNumber"
        target="_blank"
        ><img
          src="../../public/image/github.png"
          width="80px"
          height="80px"
          alt="깃허브 이미지"
      /></a>
      <a
        class="helpView_contact_mail"
        href="mailto:ljh040513@naver.com"
        target="_blank"
        ><img
          src="../../public/image/gmail.png"
          width="80px"
          height="80px"
          alt="이메일 이미지"
      /></a>

      <a
        class="helpView_contact_facebook"
        href="https://www.facebook.com/profile.php?id=100016279240376"
        target="_blank"
        ><img
          src="../../public/image/messenger.png"
          width="80px"
          height="80px"
          alt="페이스북 메신저 이미지"
      /></a>

      <div class="helpView_contact_descriptionTwo">
        으로 연락해주세요
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Sunflower:wght@500&display=swap"); //font-family: "Sunflower", sans-serif;
@import url("https://fonts.googleapis.com/css2?family=Jua&display=swap");

.helpView {
  &_title {
    display: flex;
    font-size: 64px;
    font-family: "Jua", sans-serif;
    color: #000000;
    letter-spacing: 0.3rem;
    margin: 40px 0px 70px 50px;
    align-items: center;
    &_image {
      padding-top: 15px;
      margin-left: 5px;
    }
    &_guide {
      font-size: 24px;
      text-align: center;
      margin-left: 30px;
    }
  }
  &_contents {
    &_oneStudent {
      display: flex;
      align-items: center;
      margin-bottom: 100px;
      &_title {
        font-size: 64px;
        font-family: "Jua", sans-serif;
        color: #70d9cc;
        margin-right: 260px;
        margin-left: 300px;
      }
      &_contents {
        font-size: 36px;
        font-family: "Jua", sans-serif;
        color: #000000;
      }
    }
    &_severalStudents {
      display: flex;
      align-items: center;
      margin-bottom: 90px;
      &_title {
        font-size: 64px;
        font-family: "Jua", sans-serif;
        color: #aab9e3;
        margin-right: 190px;
        margin-left: 290px;
      }
      &_contents {
        font-size: 36px;
        font-family: "Jua", sans-serif;
        color: #000000;
      }
      &_down {
        font-size: 36px;
        font-family: "Jua", sans-serif;
        color: #f6b93b;
        margin-left: 250px;
      }
    }
    &_number {
      display: flex;
      align-items: center;
      margin-bottom: 100px;
      &_title {
        font-size: 64px;
        font-family: "Jua", sans-serif;
        color: #ffe695;
        margin-right: 160px;
        margin-left: 255px;
      }
      &_contents {
        font-size: 36px;
        font-family: "Jua", sans-serif;
        color: #000000;
      }
    }
    &_saveNumber {
      display: flex;
      align-items: center;
      margin-bottom: 124px;
      &_title {
        font-size: 64px;
        font-family: "Jua", sans-serif;
        color: #78e08f;
        margin-right: 260px;
        margin-left: 310px;
      }
      &_contents {
        font-size: 36px;
        font-family: "Jua", sans-serif;
        color: #000000;
      }
    }
  }

  &_contact {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    &_descriptionOne {
      font-size: 36px;
      color: #5bc8d3;
      font-family: "Jua", sans-serif;
    }
    &_github {
      margin-left: 80px;
    }
    &_mail {
      margin-left: 80px;
    }
    &_facebook {
      margin-left: 80px;
    }

    &_descriptionTwo {
      margin-left: 50px;
      font-size: 36px;
      color: #000000;
      font-family: "Jua", sans-serif;
      margin-right: 30px;
    }
  }
}
</style>
