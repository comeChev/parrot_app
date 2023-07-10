type CarsFilterFormSliderRangeProps = {
  value: number;
  defaultValues: { min: number; max: number };
  isFirst?: boolean;
  step: number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CarsFilterFormSliderRange({
  value,
  defaultValues,
  isFirst = true,
  step,
  onChange,
}: CarsFilterFormSliderRangeProps) {
  function getDiffMinMax() {
    const diff = defaultValues.max - defaultValues.min;
    return Math.ceil(diff / 2);
  }
  return (
    <input
      type="range"
      value={value}
      min={isFirst ? defaultValues.min : defaultValues.min + getDiffMinMax()}
      max={
        isFirst ? defaultValues.min + getDiffMinMax() - 1 : defaultValues.max
      }
      step={step ? step : 1}
      onChange={onChange}
      className="range-min  w-full bg-transparent h-1 z-40 appearance-none accent-red-500 cursor-pointer"
    />
  );
}
