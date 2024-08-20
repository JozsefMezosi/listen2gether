import { Control, FieldPath, FieldValues } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "./form";
import { BaseInput, BaseInputProps } from "./base-input";

interface InputProps<T extends FieldValues> extends BaseInputProps {
  control: Control<T>;
  label?: string;
  name: FieldPath<T>;
  placeholder?: string;
}
export const Input = <T extends FieldValues>({ control, label, name, ...restProps }: InputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel className=" pl-1">{label}</FormLabel>}
          <div className="relative !mt-0">
            <FormControl>
              <BaseInput className="pr-8" {...restProps} {...field} />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
