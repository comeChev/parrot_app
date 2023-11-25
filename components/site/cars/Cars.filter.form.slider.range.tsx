type CarsFilterFormSliderRangeProps = {
  value: number;
  defaultValues: { min: number; max: number };
  label: string;
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
  label,
}: CarsFilterFormSliderRangeProps) {
  function getDiffMinMax() {
    const diff = defaultValues.max - defaultValues.min;
    return Math.ceil(diff / 2);
  }
  return (
    <input
      type="range"
      aria-label={label}
      value={value}
      min={isFirst ? defaultValues.min : defaultValues.min + getDiffMinMax()}
      max={isFirst ? defaultValues.min + getDiffMinMax() - 1 : defaultValues.max}
      step={step ? step : 1}
      onChange={onChange}
      className="z-40 w-full h-1 bg-transparent appearance-none cursor-pointer range-min accent-red-500"
    />
  );
}
