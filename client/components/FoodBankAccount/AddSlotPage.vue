<template>
	<div class="container">
		<section>
			<h2 class="no-padding">Add New Pickup Slot</h2>
			<!-- <h3 class="no-padding">Filters</h3> -->
				<!-- <div class="filter-section"> -->
        <div class="fields">
          <div> 
            <label class="no-padding">Date:</label>
            <input
              id="textarea"
              v-model="date"
              type='date'
            ></input>
          </div>
          <div> 
            <label class="no-padding">Start:</label>
            <input
              id="textarea"
              v-model="startTime"
              type='time'
            ></input>
          </div>
          <div> 
            <label class="no-padding">End:</label>
            <input
              id="textarea"
              v-model="endTime"
              type='time'
            ></input>
          </div>
          <div> 
            <label class="no-padding">Quantity:</label>
            <input
              id="textarea"
              v-model="quantity"
              placeholder="0"
              min="0"
              type='number'
            ></input>
          </div>
          <button @click="addSlots">Add Slots</button>
        </div>
				<!-- <div class="filter-section">
					<h4 class="no-padding">Dietary Restrictions:</h4>
					<ClickablePill v-for="r in RESTRICTIONS" :title="r" :callback="editRestrictions" />
				</div> -->
		</section>
	</div>
</template>

<script>
import ClickablePill from "@/components/common/ClickablePill.vue";
import TextPill from "@/components/common/TextPill.vue";

export default {
  name: 'AddSlotPage',
	components: { TextPill },
  data() {
    /**
     * Options for submitting this form.
     */
    return {
      // url: '', // Url to submit form to
      // method: 'GET', // Form request method
      // hasBody: false, // Whether or not form request has a body
      // setUsername: false, // Whether or not stored username should be updated after form submission
      alerts: {}, // Displays success/error messages encountered during form submission
      // date:new Date().toISOString().substr(0, 10),
      date: new Date(),
      startTime:'',
      endTime:'',
      quantity:0
    };
  },
  methods: {
    async addSlots(){
      // console.log(new Date(this.date) );
      // console.log(new Date(this.date + "T"+this.startTime));
      // const dateDate = new Date(this.date)
      const options = {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({  
          foodBankId: this.$store.state.user._id,
          startTime: new Date(this.date + "T"+this.startTime),
          endTime: new Date(this.date +"T"+this.endTime),
          quantity: this.quantity
        })
      }
      try {
        const r = await fetch('/api/foodbanks/', options);
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
    ,async submit() {
      /**
        * Submits a form with the specified options from data().
        */
      const options = {
        method: this.method,
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin' // Sends express-session credentials with request
      };
      if (this.hasBody) {
        options.body = JSON.stringify(Object.fromEntries(
          this.fields.map(field => {
            const {id, value} = field;
            field.value = '';
            return [id, value];
          })
        ));
      }

      try {
        const r = await fetch(this.url, options);
        if (!r.ok) {
          // If response is not okay, we throw an error and enter the catch block
          const res = await r.json();
          throw new Error(res.error);
        }

        if (this.setUsername) {
          const text = await r.text();
          const res = text ? JSON.parse(text) : {user: null};
          this.$store.commit('setUsername', res.user ? res.user.username : null);
        }

        if (this.callback) {
          this.callback();
        }
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>
form {
  border: 1px solid #111;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 14px;
  position: relative;
}

article > div {
  display: flex;
  flex-direction: column;
}

form > article p {
  margin: 0;
}

form h3,
form > * {
  margin: 0.3em 0;
}

form h3 {
  margin-top: 0;
}

textarea {
   font-family: inherit;
   font-size: inherit;
}

.fields {
	flex-direction: column;
	display: flex;
	padding: 20px;
	border-radius: 20px;
	background-color: whitesmoke;
}

button {
	padding: 10px;
	border-radius: 10px;
	background-color: grey;
	border-style: none;
	font-family: inherit;
	font-size: 16px;
}

button:hover {
	cursor: pointer;
}
</style>
