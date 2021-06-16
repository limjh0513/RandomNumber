<template>
  <div class="header">
    <div class="header_logo">
      <router-link to="/"
        ><img src="../../public/image/headerLogo.png" alt="오늘 발표는? 로고"
      /></router-link>
    </div>
    <div class="header_nav">
      <div class="header_nav_onStudent">
        <router-link to="/oneStudent">1명씩</router-link>
      </div>
      <div class="header_nav_severalStudents">
        <router-link to="/severalStudents">N명씩</router-link>
      </div>
      <div class="header_nav_save">
        <router-link to="/save">저장</router-link>
      </div>
      <div class="header_nav_help">
        <router-link to="/help">도움말</router-link>
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
@import url("https://fonts.googleapis.com/css2?family=Jua&display=swap");
.header {
  width: 100%;
  left: 0px;
  top: 0px;
  height: 160px;
  display: flex;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &_logo {
    margin: 10px 65px 10px 65px;
  }

  &_nav {
    color: #303030;
    display: flex;
    font-size: 48px;
    font-family: "Jua", sans-serif;
    align-items: center;
    div {
      margin-left: 120px;
    }
  }
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
