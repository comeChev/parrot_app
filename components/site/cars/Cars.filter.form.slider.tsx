"use client";

import { useEffect, useState } from "react";

import CarsFilterFormSliderRange from "./Cars.filter.form.slider.range";

type CarFilterFormSliderProps = {
  name: string;
  label: string;
  values: { min: number; max: number };
  setValue: (value: number, min: boolean) => void;
  step?: number;
  handleResetCars: () => void;

  typeData: "kilometers" | "currency" | "year";
};

export default function CarsFilterFormSlider({
  name,
  label,
  values,
  setValue,
  handleResetCars,
  step,
  typeData,
}: CarFilterFormSliderProps) {
  const [defaultValues, setDefaultValues] = useState({ min: 0, max: 0 });

  function getSubLabelText() {
    switch (typeData) {
      case "kilometers":
        return `entre ${new Intl.NumberFormat("fr-FR", {
          unit: "kilometer",
          style: "unit",
        }).format(values.min)}s et ${new Intl.NumberFormat("fr-FR", {
          unit: "kilometer",
          style: "unit",
        }).format(values.max)}`;
      case "currency":
        return `entre ${new Intl.NumberFormat("fr-FR", {
          currency: "EUR",
          style: "currency",
        }).format(values.min)} et ${new Intl.NumberFormat("fr-FR", {
          currency: "EUR",
          style: "currency",
        }).format(values.max)}`;
      case "year":
        return `entre ${values.min} et ${values.max}`;
    }
  }

  function getPercentageDiff(
    currentMin: number,
    defaultValues: { min: number; max: number },
    direction: "right" | "left"
  ) {
    const baseDiff = defaultValues.max - defaultValues.min;
    const currentDiff = defaultValues.max - currentMin;
    const diff = baseDiff - currentDiff;
    const percentage = (currentDiff / baseDiff) * 100;
    return direction === "left" ? `${100 - percentage}%` : `${percentage}%`;
  }

  useEffect(() => {
    setDefaultValues({ min: values.min, max: values.max });
  }, []);

  return (
    <div className="max-w-96 flex flex-col px-4 mb-5">
      {/* text */}
      <div className="flex flex-col text-neutral-100 mb-3">
        <label htmlFor={name} className="text-base font-semibold">
          {label}
        </label>
        <span className="text-sm font-light">{getSubLabelText()}</span>
      </div>
      {/* slider */}
      <div className="py-4 bg-neutral-100 rounded-md px-6">
        <div className="range-input flex relative">
          {/* background style */}
          <div className="bg-neutral-400 h-1 w-full absolute top-0 rounded-full" />

          {/* input min value */}
          <CarsFilterFormSliderRange
            value={values.min}
            defaultValues={defaultValues}
            onChange={(e) => {
              handleResetCars();
              setValue(e.target.valueAsNumber, true);
            }}
            step={step || null}
          />
          {/* input max value */}
          <CarsFilterFormSliderRange
            value={values.max}
            defaultValues={defaultValues}
            onChange={(e) => {
              handleResetCars();
              setValue(e.target.valueAsNumber, false);
            }}
            isFirst={false}
            step={step || null}
          />

          {/* range value */}
          <div
            className="absolute top-0 h-1 bg-red-800"
            style={{
              left: `${getPercentageDiff(values.min, defaultValues, "left")}`,
              right: `${getPercentageDiff(values.max, defaultValues, "right")}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
