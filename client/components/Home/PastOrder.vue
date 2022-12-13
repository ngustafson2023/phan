<!-- Reusable component representing a single order and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <article class="order">
    <h2 class="topItem">{{ order.slotId.foodBankId.name }}</h2>
    <h5 class="item">Time: {{ this.startTime }}</h5>
    <h5 class="item">Location: {{ order.slotId.foodBankId.address }}</h5>
    <button>{{ "View Order" }}</button>
  </article>
</template>

<script>
export default {
  name: "PastOrderComponent",
  props: {
    // Data from the stored freet
    order: {
      type: Object,
      required: true,
    },
  },
  created() {
    function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    }
    const start = new Date(this.order.slotId.startTime);
    // const end = new Date(this.order.slotId.endTime);
    this.startTime = `${start.getMonth() + 1}/${start.getDate() + 1}/${
      start.getFullYear() + 1
    } at ${formatAMPM(end)}`;
    // this.endTime = `${end.getMonth() + 1}/${end.getDate() + 1}/${
    //   end.getFullYear() + 1
    // } at ${formatAMPM(end)}`;
  },
  methods: {
    viewOrder() {
      // Pass into a past order modal
    },
  },
};
</script>

<style scoped>
.order {
  border: 1px solid #111;
  padding: 20px;
  position: relative;
  margin-bottom: 20px;
  border-radius: 15px;
  background-color: whitesmoke;
  border-style: none;
  display: flex;
  flex-direction: column;
}

button {
  padding: 10px;
  border-radius: 10px;
  background-color: lightgreen;
  border-style: none;
  font-family: inherit;
  font-size: 16px;
}

button:hover {
  cursor: pointer;
}

.item {
  margin: 10px 0px;
}

.topItem {
  margin-top: 0px;
  margin-bottom: 5px;
}

.editArea {
  border-style: none;
  border-radius: 10px;
  background-color: white;
  width: 400px;
  padding: 5px;
}

.editButton {
  margin-right: 10px;
  padding: 10px 30px;
  border: none;
  border-radius: 10px;
  background-color: cornflowerblue;
}

.editButton:hover {
  cursor: pointer;
}

.actions {
  margin-top: 10px;
}
</style>
