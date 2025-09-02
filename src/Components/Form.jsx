import React, { useState } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { RiResetRightFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import {
  updateField,
  nextStep,
  prevStep,
  resetForm,
} from "../Stores/formSlice.js";

function FormComponent() {
  const formHeader = ["Restaurant Details", "Owner Details", "Bank Details"];
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { currentStep, Form } = useSelector((state) => state.form);
  const dispatch = useDispatch();

  // get current step from Redux Form
  const formStep = Form.find((item) => item.id === currentStep);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ name, value }));
  };

  const validateStep = () => {
    let valid = true;
    formStep.fields.forEach((field) => {
      if (!field.value || field.value.trim() === "") {
        console.error(`${field.label} is required`);
        valid = false;
      }
    });
    return valid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log("Form Data:", Form);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <header className="text-center text-6xl text-[#F8F2FF] p-8 michroma-regular">
        <span className="michroma-regular">3 Step Form</span>
      </header>
      <main className="flex items-center justify-center w-full">
        {formSubmitted === false ? (
          <div className="flex flex-col items-center justify-between bg-[#ecefff] rounded-2xl w-7/10">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col h-[25rem] items-center justify-around w-full mt-5 relative"
            >
              <RiResetRightFill
                onClick={() => dispatch(resetForm())}
                className="text-lg text-[#1C09A1] absolute top-0 left-5 cursor-pointer"
                title="Reset Form"
              />
              <span className="text-sm font-semibold absolute top-0 right-5 text-[#1C09A1]">
                {currentStep}/{formHeader.length}
              </span>
              <h2 className="text-[#1C09A1] text-center text-4xl border-b-2 border-[#1C09A1] pb-2">
                {formStep.categoryName}
              </h2>
              <div className="grid grid-cols-2 justify-start p-8 w-full gap-10">
                {formStep.fields.map((field) => (
                  <div key={field.id} className="flex flex-col">
                    <label
                      htmlFor={field.name}
                      className="text-sm text-[#1C09A1] font-semibold"
                    >
                      {field.label}*
                    </label>

                    <input
                      className="border-[#1C09A1] border-b-[1px] active:border-none outline-none active:rounded-sm  p-1"
                      type={field.type}
                      name={field.name}
                      id={field.id}
                      value={field.value || ""}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                    />
                  </div>
                ))}
              </div>
              <div
                className={`${
                  currentStep > 1 ? "justify-between" : "justify-end"
                } flex items-center w-6/10 mb-5`}
              >
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => dispatch(prevStep())}
                    className="flex items-center gap-2 text-[#1C09A1] font-semibold cursor-pointer"
                  >
                    <HiArrowLeft />
                    <span className="text-lg">Back</span>
                  </button>
                )}
                {currentStep === formHeader.length ? (
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(true);
                    }}
                    className="flex items-center gap-2 text-[#1C09A1] font-semibold cursor-pointer"
                  >
                    <span className="text-lg">Submit</span>
                    <HiArrowRight />
                  </button>
                ) : (
                  <button
                    className="flex items-center gap-2 text-[#1C09A1] font-semibold cursor-pointer"
                    type="submit"
                    onClick={() => {
                      if (validateStep()) {
                        dispatch(nextStep());
                      }
                    }}
                  >
                    <span className="text-lg">Next</span>
                    <HiArrowRight className="p-0" />
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white flex items-center justify-around w-6/10 text-white flex-col p-10 h-[25rem] rounded-2xl michroma-regular">
            <h3 className="text-[#1C09A1] text-4xl">Form Submitted</h3>
            <button
              onClick={() => {
                setFormSubmitted(false);
              }}
              type="button"
              className="border-[#1C09A1] p-3 text-2xl text-[#1C09A1] border-2 rounded-2xl cursor-pointer"
            >
              Go Back
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default FormComponent;
