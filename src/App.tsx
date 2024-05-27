import { useContext, useState } from "react";

import { Calendar } from "./";
import { StatusContext } from "./context/StatusContext";

export type ActiveViewProps = "calendar" | "months" | "years";

const App: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const { showElement, setShowElement } = useContext(StatusContext);

  return (
    <div className="p-4">
      <div className="container mx-auto">
        <Calendar
          show={showElement}
          setShow={setShowElement}
          date={date}
          setDate={setDate}
        />
      </div>
    </div>
  );
};

export default App;
