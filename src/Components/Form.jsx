/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import {
  Bs1CircleFill,
  Bs2CircleFill,
  Bs3CircleFill,
} from "react-icons/bs";
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

function Form2() {
  const [isStartButtonPressed, setIsStartButtonPressed] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);
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
  const stepNumberIcons = [
    Bs1CircleFill,
    Bs2CircleFill,
    Bs3CircleFill,
  ];

  const { currentStep, Form } = useSelector((state) => state.form);
  const dispatch = useDispatch();

  // get current step from Redux Form
  const formStep = Form.find((item) => item.id === currentStep);

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ name, value }));
    if (!value.trim() || !value) {
      return setErrors((prev) => ({ ...prev, [name]: `Field is required` }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = () => {
    let valid = true;
    formStep.fields.forEach((field) => {
      if (!field.value || field.value.trim() === "") {
        valid = false;
        setErrors((prev) => ({
          ...prev,
          [field.name]: `Field is required`,
        }));
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
    <div className="bg-[#fafafa] p-6 h-9/10 w-8/10 rounded-xl flex flex-col items-center justify-start relative transition-all duration-500 ease-in-out">
      <div
        className={`w-9/10 relative items-center  flex flex-col h-full ${
          isStartButtonPressed ? "gap-2.5" : "gap-20"
        } transition-all duration-500 ease-in-out`}
      >
        <div className="w-full relative items-center justify-between flex flex-col">
          <div className=" absolute h-1 w-full bg-gray-300 top-1/2" />

          <motion.div
            key="progress-bar"
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: (currentStep - 1) / (stepNumberIcons.length - 1),
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute top-1/2 left-0 h-1 bg-[#4B7EF1] origin-left z-5 w-full"
          />

          <div
            id="stepNumbers"
            className="flex items-center justify-between z-10 text-5xl w-full transition-transform duration-500 ease-in-out"
          >
            {stepNumberIcons.map((Icon, index) => (
              <Icon
                key={index}
                className={`rounded-full ${
                  currentStep > index ? "text-[#4B7EF1]" : "text-gray-300"
                } bg-white`}
              />
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          {!isStartButtonPressed ? (
            <motion.div
              key="content"
              animate={{ scaleX: 1, scaleY: 1, opacity: 1 }}
              exit={{ scaleX: 0, scaleY: 0.01, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center gap-12 
                 origin-top-left overflow-hidden w-full"
            >
              <h1 className="font-bold text-8xl text-[#4B7EF1]">3 Step Form</h1>
              <p className="text-xl text-center text-[#074FB0] font-light">
                Fill all Fields to Finish the Form
              </p>
            </motion.div>
          ) : (
            <motion.main
              key="border"
              initial={{ scaleX: 0, opacity: 0, scaleY: 0.01 }}
              animate={{ scaleX: 1, opacity: 1, scaleY: 1 }}
              exit={{ scaleX: 0, opacity: 0, scaleY: 0 }}
              transition={{
                scaleX: { duration: 0.7, ease: "easeInOut" },
                scaleY: { duration: 0.5, ease: "easeInOut", delay: 1 },
              }}
              className="min-h-[90%] border-2 border-[#4B7EF1]  bg-[#4B7EF1] origin-top-left w-full rounded-xl flex-1 overflow-hidden "
            >
              {isFormSubmitted === false ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col items-center justify-between w-full relative h-full p-5"
                >
                  <RiResetRightFill
                    onClick={() => handleReset()}
                    className="text-lg text-[#fafafa] absolute top-5 left-5 cursor-pointer z-50"
                    title="Reset Form"
                  />
                  <motion.div
                    className="flex w-full max-w-4xl h-full" // flex row holding all steps
                    animate={{ x: `-${(currentStep - 1) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {Form.map((step) => (
                      <div
                        key={step.id}
                        className="w-full h-full flex-shrink-0 flex flex-col items-center justify-around text-white rounded-2xl"
                      >
                        <h2 className=" text-center text-6xl border-b-2 border-white">
                          {step.categoryName}
                        </h2>

                        <div className="grid grid-cols-2 gap-10 w-full p-8">
                          {step.fields.map((field) => (
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              transition={{
                                duration: 0.5,
                                ease: "easeInOut",
                              }}
                              key={field.id}
                              className="flex flex-col relative"
                            >
                              <div
                                className={`absolute right-2.5 bottom-2.5 opacity-70 text-[#fafafa] ${
                                  errors[field.name] ? "text-red-200" : ""
                                }`}
                              >
                                {formIcons[field.name]}
                              </div>
                              <label
                                htmlFor={field.name}
                                className={`text-sm font-semibold text-[#fafafa] ${
                                  errors[field.name] ? "text-red-200" : ""
                                }`}
                              >
                                {field.label}*
                              </label>
                              <input
                                className={`border-b border-[#fafafa] outline-none p-1 focus:bg-none ${
                                  errors[field.name] ? "border-red-300" : ""
                                }`}
                                type={field.type}
                                name={field.name}
                                value={field.value || ""}
                                placeholder={field.placeholder}
                                onChange={handleChange}
                              />
                              {errors[field.name] && (
                                <span className="text-red-200 text-sm absolute top-14">
                                  {errors[field.name]}
                                </span>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                  <div
                    className={`${
                      currentStep > 1 ? "justify-between" : "justify-end"
                    } flex items-center w-6/10`}
                  >
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setDirection(-1), dispatch(prevStep());
                        }}
                        className="flex items-center gap-2 hover:text-[#4B7EF1] hover:bg-[#fafafa] text-[#fafafa] font-semibold cursor-pointer transition-colors duration-300 ease-in-out rounded-sm px-2 py-1"
                      >
                        <HiArrowLeft />
                        <span className="text-lg">Back</span>
                      </button>
                    )}
                    {currentStep === stepNumberIcons.length ? (
                      <button
                        type="button"
                        onClick={() => {
                          setIsFormSubmitted(true);
                        }}
                        className="flex items-center gap-2 hover:text-[#4B7EF1] hover:bg-[#fafafa] text-[#fafafa] font-semibold cursor-pointer transition-colors duration-300 ease-in-out rounded-sm px-2 py-1"
                      >
                        <span className="text-lg">Submit</span>
                        <HiArrowRight />
                      </button>
                    ) : (
                      <button
                        className="flex items-center gap-2 hover:text-[#4B7EF1] hover:bg-[#fafafa] text-[#fafafa] font-semibold cursor-pointer transition-colors duration-300 ease-in-out rounded-sm px-2 py-1"
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
              ) : (
                <div className="flex items-center justify-around flex-col p-10 h-[25rem] rounded-2xl">
                  <h3 className="text-[#fafafa] text-4xl">Form Submitted</h3>
                  <button
                    onClick={() => {
                      setIsFormSubmitted(false);
                    }}
                    type="button"
                    className="text-2xl border-white border-4 hover:text-[#4B7EF1] hover:bg-[#fafafa] text-[#fafafa] font-semibold cursor-pointer transition-colors duration-300 ease-in-out rounded-sm px-2 py-1"
                  >
                    Go Back
                  </button>
                </div>
              )}
            </motion.main>
          )}
        </AnimatePresence>
        <button
          className={` ${
            isStartButtonPressed
              ? "invisible size-0"
              : "text-2xl border-2 rounded-xl bg-gray-300 text-white hover:border-[#165FDE] hover:bg-[#165FDE] font-semibold black p-3 transition-colors duration-300 ease-in-out"
          }`}
          onClick={() => {
            setIsStartButtonPressed(true);
          }}
        >
          START
        </button>
      </div>
    </div>
  );
}

export default Form2;
