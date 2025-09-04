import { createSlice } from "@reduxjs/toolkit";
import { Form } from "../Forms/kitchenForm.js";
const getInitialState = {
  currentStep: 1,
  Form,
};
const formSlice = createSlice({
  name: "form",
  initialState: getInitialState,
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      // loop through steps until you find the field
      for (let step of state.Form) {
        const field = step.fields.find((f) => f.name === name);
        if (field) {
          field.value = value; // add/update the value
          break; // stop once found
        }
      }
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
    resetForm: (state) => {
      for (let step of state.Form) {
        for (let field of step.fields) {
          field.value = ""; // mutate the state, not the imported Form
        }
      }
      state.currentStep = 1; // reset step
    },
  },
});

export const { updateField, nextStep, prevStep, resetForm } = formSlice.actions;
export default formSlice.reducer;
