import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";

import Calendar from "./components/Calendar";
import { viewStore } from "./store/view";
import { StatusContext } from "./context/StatusContext";

export type ActiveViewProps = "calendar" | "months" | "years";

const App: React.FC = () => {
  const [date, setDate] = useState(new Date());

  const { showElement, setShowElement } = useContext(StatusContext);
  const { setActiveView } = viewStore((state) => state);

  useEffect(() => {
    setActiveView("calendar");
  }, [showElement, setActiveView]);

  return (
    <div className="p-4">
      <div className="relative">
        <button
          onClick={() =>
            showElement ? setShowElement(false) : setShowElement(true)
          }
          className="shadow-sm text-slate-800 relative z-[500] bg-white border border-gray-300 py-2 px-3 rounded-md"
        >
          {format(date, "yyyy/MM/dd")}
        </button>

        <Calendar
          show={showElement}
          date={date}
          setDate={setDate}
          setShow={setShowElement}
        />
      </div>
    </div>
  );
};

export default App;
