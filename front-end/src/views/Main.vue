<template>
  <div class="main">
    <div class="main_image">
      <img src="../../public/image/mainImage.png" alt="메인 화면 이미지" />
    </div>
    <div class="main_contents">
      <div class="main_contents_content">
        어떻게 발표시킬지<br />고민 일때...
      </div>
      <div class="main_contents_title">
        <img src="../../public/image/contentLogo.png" alt="메인 화면 로고" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
};
</script>
<style lang="scss" scoped>
.main {
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  .main_image {
    margin-right: 100px;
  }

  .main_contents {
    margin-right: 140px;
    margin-left: 160px;

    .main_contents_content {
      font-family: Tomorrow;
      font-style: normal;
      font-weight: 600;
      font-size: 72px;
      line-height: 86px;
      text-align: center;

      color: #22a6b3;

      margin-bottom: 50px;
    }
  }
}
</style>
