import { Fragment } from "react";
import { Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: "Shipping Details",
      icon: <LocalShippingIcon className="text-xl" />,
    },
    {
      label: "Confirm Order",
      icon: <LibraryAddCheckIcon className="text-xl" />,
    },
    {
      label: "Payment",
      icon: <AccountBalanceIcon className="text-xl" />,
    },
  ];

  return (
    <Fragment>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        className="flex justify-center w-full py-4 font-[sans-serif]  bg-white"
      >
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index}
            completed={activeStep >= index}
            className="flex flex-col items-center"
          >
            <StepLabel
              className={`${
                activeStep >= index ? "text-blue-500" : "text-black/70"
              } flex flex-col items-center`}
              icon={item.icon}
            >
              <span className="mt-2 text-sm font-medium">{item.label}</span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
