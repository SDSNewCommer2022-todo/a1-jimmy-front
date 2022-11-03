<template>
  <div class="topbar">
    <img class="topbar__logo" :src="TOPBAR_LOGO_IMAGE">
    <span class="topbar__title">Jimmy-ToDo</span>
    <span class="topbar__date">{{ WEEKDAY }}</span>
  </div>
</template>


<script>
import IC_TOPBAR_MENU from '@/assets/ic_topbar_menu.png'

export default {
  name : 'TodoTop',
  data(){
    return {
      TOPBAR_LOGO_IMAGE : IC_TOPBAR_MENU,
      WEEKDAY           : this.getWeekDay()
    }
  },
  methods : {
    getWeekDay() {
      const WEEKDAY = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      var date = new Date();
      var weekday = date.getMonth() + 1 + "/" + date.getDate() +' ' + WEEKDAY[date.getDay()];;
      return weekday;
    }
  }
}
</script>

<style lang="scss">

.topbar{
  width: 100vw;
  height: 48px;
  background-color: #6C77A7;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #FFFFFF;


  &__logo{
    position: relative;
    margin-left: 15px;
    margin-top: 12px;
    width: 24px;
    height: 24px;
  }

  &__title{
    position: relative;
    width: 92px;
    font-size: 24px;
    line-height: 28px;
    color: #FFFFFF;
    margin-left: 13px;
    top: -3px;
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
