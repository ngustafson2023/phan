<template>
  <div class="modal-overlay">
    <div class="modal">
      <button class="closebtn">x</button>
      <FoodItemComponent :foodItem="foodItem" />
      <button>{{ buttonText }}</button>
    </div>
    <div class="close" @click="$emit('close-modal')"></div>
  </div>
</template>

<script>
import FoodItemComponent from "@/components/FoodItem/SingleFoodItem.vue";

export default {
  name: "Modal",
  props: {
    foodItem: { type: Object, required: true },
    buttonText: { type: String, default: "submit" },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  height: fit-content;
  width: fit-content;
  margin: 30% auto;
  padding: 8px;
  border-radius: 20px;
}
.close {
  margin: 10% 0 0 16px;

  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  background-color: #ac003e;
  float: right;
  margin: 6px;
  color: white;
  font-size: 14px;
  border-radius: 6px;
}
</style>
