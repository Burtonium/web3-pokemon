import { useState } from "react";

interface UseInputProps {
  initialValue?: string;
}

const useInput = ({ initialValue = "" }: UseInputProps = {}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    value,
    onChange: handleChange,
    reset,
  };
};

export default useInput;
