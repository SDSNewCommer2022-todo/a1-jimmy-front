<script setup>
</script>

<template>
  <div class="todo-input" >
    <input
      ref="textbox"
      autofocus
      type="text"
      :placeholder="isNamePage ? 'input your name' : 'Enter your task'"
      :class="[
          'todo-input__textbox',
          isNamePage ? 'border-bottom' : 'border-all']"
      @input ="inputChangeListener"
      @focus="inputFocusListener"
      @focusout="inputFocusOutListener">
    <button
      ref="inputClearButton"
      class="todo-input__clear"
      @click="clearBtnClickListener">
      <img ref="clearButtonImage" class="todo-input__clear__image" src="images/ic_delete.png" alt="">
    </button>
    <button
      type="button"
      class="todo-input__send"
      @click=sendBtnClickListener>
      <img ref="sendButtonImage" class="todo-input__send__image" src="images/ic_vector_grey.png" alt="">
    </button>
  </div>

</template>

<script>
export default {
  name: 'TodoInput',
  props:{
    isNamePage:{
      state: false
    }
  },
  methods: {
    inputFocusListener() {
      const textbox = this.$refs.textbox;
      textbox.style.borderBottomColor = "#2A82F0"
      textbox.placeholder = ""
    },
    inputFocusOutListener() {
      const textbox = this.$refs.textbox;
      if (textbox.value.length == 0) {
        textbox.style.borderBottomColor = "#CCCCCC"
        textbox.placeholder = "input your name"
      }
    },
    inputChangeListener() {
      const textbox = this.$refs.textbox;
      if (textbox.value.length == 0) {
        this.$refs.inputClearButton.style.display = "none";
        this.$refs.sendButtonImage.src = "images/ic_vector_grey.png"
        textbox.style.borderBottomColor = "#CCCCCC"
      } else {
        this.$refs.inputClearButton.style.display = "inline-block";
        this.$refs.sendButtonImage.src = "images/ic_vector_blue.png"
        textbox.style.borderBottomColor = "#2A82F0"
      }
    },
    clearBtnClickListener() {
      this.$refs.textbox.value = "";
      this.$refs.textbox.style.borderBottomColor = "#CCCCCC"
      this.$refs.inputClearButton.style.display = "none";
      this.$refs.sendButtonImage.src = "images/ic_vector_grey.png"
      this.$refs.textbox.placeholder = "input your name"
    },
    sendBtnClickListener() {

    }
  }
};

</script>

<style scoped lang="scss">
  .todo-input{

    &__textbox{
      width: 54%;

      outline: none;
      font-size: 16px;
    }

    &__clear{
      cursor:pointer;
      position: absolute;
      display: none;
      border: none;
      background: transparent;
      margin-top: 8px;
      margin-left: -33px;
      &__image{
        width: 20px;
        height: 20px;
      }
    }

    &__send{
      cursor: pointer;
      padding-top: 8px;
      border-left: 11px;
      border: none;
      background: transparent;

      &__image{
        width: 16px;
        height: 17px;
      }
    }
  }

  .border-bottom{
    border: 0px;
    border-bottom: 1px solid #CCCCCC;
    padding-bottom: 6.5px;
  }
  .border-all {
    border: 1px solid #CCCCCC;
    border-radius: 4px;
    gap: 8px;
    padding: 10px;
  }
</style>
