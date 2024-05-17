import { createContext, useState } from "react";

interface StatusContextProps {
  showElement: boolean;
  setShowElement: (value: boolean) => void;
}

export const StatusContext = createContext<StatusContextProps>({
  showElement: false,
  setShowElement: () => {},
});

const StatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showElement, setShowElement] = useState<boolean>(false);

  return (
    <StatusContext.Provider
      value={{
        showElement,
        setShowElement,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};

export default StatusProvider;
