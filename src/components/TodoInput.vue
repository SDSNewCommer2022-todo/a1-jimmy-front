<script setup>
  //var input_placeholder = "input your name";
</script>

<template>
  <div class="todo-input" >
    <input
ref="textbox" type="text" placeholder="input your name" class="todo-input__textbox"
           @change="inputChangeListner" @focus="inputFocusListner" @focusout="inputFocusOutListner">
    <button ref="inputClearButton" class="todo-input__clear" @click="clearBtnClickListner">
      <img ref="clearButtonImage" class="todo-input__clear__image" src="images/ic_delete.png" alt="">
    </button>
    <button type="button" class="todo-input__send">
      <img ref="sendButtonImage" class="todo-input__send__image" src="images/ic_vector_grey.png" alt="">
    </button>
  </div>

</template>

<script>
export default {
  name: 'TodoInput',
  placeholder: "",
  methods: {
    inputFocusListner(){
      const textbox = this.$refs.textbox;
      textbox.style.borderBottomColor = "#2A82F0"
    },
    inputFocusOutListner(){
      const textbox = this.$refs.textbox;
      if(textbox.value.length == 0) {
        textbox.style.borderBottomColor = "#CCCCCC"
      }
    },
    inputChangeListner(){
      const textbox = this.$refs.textbox;
      if(textbox.value.length == 0){
        this.$refs.inputClearButton.style.display = "none";
        this.$refs.sendButtonImage.src = "images/ic_vector_grey.png"
        textbox.style.borderBottomColor = "#CCCCCC"
      }
      else{
        this.$refs.inputClearButton.style.display = "inline-block";
        this.$refs.sendButtonImage.src = "images/ic_vector_blue.png"
        textbox.style.borderBottomColor = "#2A82F0"
      }
    },
    clearBtnClickListner(){
      this.$refs.textbox.value = "";
      this.$refs.textbox.style.borderBottomColor = "#CCCCCC"
      this.$refs.inputClearButton.style.display = "none";
      this.$refs.sendButtonImage.src = "images/ic_vector_grey.png"
    }
  }
};

</script>

<style scoped lang="scss">
  .todo-input{

    &__textbox{
      width: 54%;
      border: 0px;
      border-bottom: 1px solid #CCCCCC;
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
</style>
