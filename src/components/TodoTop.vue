<script setup>
const WEEKDAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var date = new Date();
var today_str = date.getMonth() + 1 + "/" + date.getDate() +' ' + WEEKDAY[date.getDay()];;
</script>

<template>
  <div class="topbar">
    <img class="topbar__logo" src="images/ic_topbar_menu.png">
    <span class="topbar__title">Jimmy-ToDo</span>
    <span class="topbar__date">{{ today_str }}</span>
  </div>
</template>


<script>
export default {
  name: 'TodoTop',
}
</script>

<style lang="scss">
.topbar{
  position: fixed;
  top: 0;
  width: 100%;
  height: 48px;
  left: 0px;
  background-color: #6C77A7;
  display: table-cell;
  vertical-align: middle;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #FFFFFF;


  &__logo{
    position: relative;
    top: 12px;
    margin-left: 15px;
  }

  &__title{
    width: 92px;
    height: 28px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    color: #FFFFFF;
    position: relative;
    top: 8px;
    margin-left: 13px;
  }


  &__date{



    height: 20px;
    position: relative;
    float: right;
    margin-right: 16px;

    top: 14px;
  }
}
</style>
