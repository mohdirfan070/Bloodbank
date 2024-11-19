import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PersonalDetails from './PersonalDetails';
import AdditionalDetails from './AdditionalDetails';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const [selectData, setSelectData] = useState({
    gender: "male",
    healthHistory: "no",
  });

  const updateState = (name , value)=>{
    setSelectData({...selectData,name:value});
  }

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = (data) => {
    console.log({...data,...selectData});
    // Handle form submission


  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 shadow-lg rounded-lg bg-white">
      {step === 1 && <PersonalDetails register={register} errors={errors} nextStep={nextStep} />}
      {step === 2 && <AdditionalDetails register={register} errors={errors} prevStep={prevStep} selectDataProp={updateState} onSubmit={handleSubmit(onSubmit)} />}
    </div>
  );
};

export default MultiStepForm;
