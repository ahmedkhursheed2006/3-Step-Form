/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { RiResetRightFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import {
  updateField,
  nextStep,
  prevStep,
  resetForm,
} from "../Stores/formSlice.js";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone, FaUser, FaDigitalTachograph } from "react-icons/fa";
import {
  MdContactPhone,
  MdAccountBalanceWallet,
  MdSubtitles,
} from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { HiIdentification } from "react-icons/hi2";
import { BsBank2 } from "react-icons/bs";
import { IoRestaurant } from "react-icons/io5";
function FormComponent() {
  const formHeader = ["Restaurant Details", "Owner Details", "Bank Details"];
  const formIcons = {
    restaurantName: <IoRestaurant />,
    restaurantAddress: <FaLocationDot />,
    restaurantPhoneNumber: <FaPhone />,
    ownerName: <FaUser />,
    ownerContactNumber: <MdContactPhone />,
    ownerContactEmail: <IoMdMail />,
    governmentID: <HiIdentification />,
    bankName: <BsBank2 />,
    accountNumber: <MdAccountBalanceWallet />,
    accountTitle: <MdSubtitles />,
    ibanNumber: <FaDigitalTachograph />,
  };

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const { currentStep, Form } = useSelector((state) => state.form);
  const dispatch = useDispatch();

  // get current step from Redux Form
  const formStep = Form.find((item) => item.id === currentStep);

  const [errors, setErrors] = useState({});

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 200 : -200, // from right if next, from left if back
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -200 : 200, // to left if next, to right if back
      opacity: 0,
    }),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ name, value }));
    if (!value.trim()) {
      return setErrors((prev) => ({ ...prev, [name]: `Field is required` }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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

  const handleReset = () => {
    dispatch(resetForm());
    setErrors({});
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <header className="text-center text-6xl text-[#F8F2FF] p-8 michroma-regular">
        <span className="michroma-regular">3 Step Form</span>
      </header>
      <main className="flex items-center justify-center w-full overflow-hidden">
        {formSubmitted === false ? (
          <div className="flex flex-col items-center justify-between bg-[#ecefff] rounded-2xl w-7/10 overflow-hidden">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col h-[25rem] items-center justify-around w-full mt-5 relative"
            >
              <RiResetRightFill
                onClick={() => handleReset()}
                className="text-lg text-[#1C09A1] absolute top-0 left-5 cursor-pointer z-10"
                title="Reset Form"
              />
              <span className="text-sm font-semibold absolute top-0 right-5 text-[#1C09A1] z-10">
                {currentStep}/{formHeader.length}
              </span>
              <motion.div
                className="flex w-full max-w-4xl" // flex row holding all steps
                animate={{ x: `-${(currentStep - 1) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {Form.map((step) => (
                  <div
                    key={step.id}
                    className="w-full flex-shrink-0 flex flex-col items-center justify-around bg-[#ecefff] rounded-2xl p-8"
                  >
                    <h2 className="text-[#1C09A1] text-center text-4xl border-b-2 border-[#1C09A1] pb-2">
                      {step.categoryName}
                    </h2>

                    <div className="grid grid-cols-2 gap-10 w-full p-8">
                      {step.fields.map((field) => (
                        <div key={field.id} className="flex flex-col relative">
                          <label
                            htmlFor={field.name}
                            className="text-sm font-semibold text-[#1C09A1]"
                          >
                            {field.label}*
                          </label>
                          <input
                            className="border-b border-[#1C09A1] outline-none p-1"
                            type={field.type}
                            name={field.name}
                            value={field.value || ""}
                            placeholder={field.placeholder}
                            onChange={handleChange}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
              <div
                className={`${
                  currentStep > 1 ? "justify-between" : "justify-end"
                } flex items-center w-6/10 mb-5`}
              >
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setDirection(-1), dispatch(prevStep());
                    }}
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
                    type="button"
                    onClick={() => {
                      if (validateStep()) {
                        setDirection(1); // forward
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
          <motion.div
            key="submitted"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white flex items-center justify-around w-6/10 flex-col p-10 h-[25rem] rounded-2xl michroma-regular"
          >
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
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default FormComponent;
