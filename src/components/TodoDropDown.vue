<template>
  <div class="todo-dropdown">
    <div
         v-click-outside="onClickOutside"
         class="todo-dropdown__menu"
         @click="isContentView = !isContentView"
    >
      <div class="todo-dropdown__menu__selected">
        {{ selected }}
        <img
          class="todo-dropdown__menu__selected__arrow"
          :src="isContentView ? dropdownArrowUp : dropdownArrowDown"
          alt=""
        />
      </div>
      <div :class="isContentView ? 'todo-dropdown__menu__contents' : 'display-none'">
        <div
          v-for="(content, index) in dropdownContents"
          :key="index"
          :class="selected==content ? 'todo-dropdown__menu__contents__box-selected' : 'todo-dropdown__menu__contents__box' "
          @click="selected = content"
        >
          {{ content }}
        </div>
      </div>
    </div>
    <div class="todo-dropdown-content"></div>
  </div>
</template>

<script>
import IC_ARROW_DOWN from '@/assets/ic_arrow_down.png'
import IC_ARROW_UP from '@/assets/ic_arrow_up.png'
import vClickOutside from 'v-click-outside'

export default {
  name       : 'TodoDropDown',
  directives : {
    clickOutside : vClickOutside.directive
  },
  props : {
    dropdownContents : {
      state : false
    }
  },
  data(){
    return {
      selected          : 'default',
      isContentView     : false,
      dropdownArrowUp   : IC_ARROW_UP,
      dropdownArrowDown : IC_ARROW_DOWN
    }
  },
  mounted() {
    if(this.dropdownContents.length > 0)
      this.selected = this.dropdownContents[0];
  },
  methods : {
    onClickOutside(){
      this.isContentView = false;
    }
  }
};
</script>

<style scoped lang="scss">
.todo-dropdown {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  position: absolute;
  &__menu {
    background: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    width: 120px;
    //height: 40px;

    &__selected {
      line-height: 40px;
      padding-left: 12px;

      &__arrow {
        float: right;
        display: inline;
        width: 10px;
        height: 8px;
        padding-top: 16px;
        padding-right: 15px;
      }
    }

    &__contents {
      width: 120px;
      &__box {
        height: 40px;
        background: #ffffff;
        line-height: 40px;
        padding-left: 12px;
        //padding-left: 12px;
      }

      &__box-selected {
        height: 40px;
        background-color: #2a82f010;
        color: #2a82f0;
        line-height: 40px;
        padding-left: 12px;
        //padding-left: 12px;
      }
      &__box:hover {
        background-color: #2a82f010;
        color: #2a82f0;
      }
    }
  }
  .display-none {
    display: none;
  }

  .content-mouse-hover {
    background: #2a82f0;
    color: #2a82f0;
  }
}
</style>
