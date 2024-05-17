import { useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

import CalendarBody from "./components/CalendarBody";
import ListMonths from "./components/ListMonths";
import ListYears from "./components/ListYears";
import { viewStore } from "./store/view";
import { DateContext } from "./context/DateContext";
import { StatusContext } from "./context/StatusContext";

export type ActiveViewProps = "calendar" | "months" | "years";

const App: React.FC = () => {
  const { date } = useContext(DateContext);
  const { showElement, setShowElement } = useContext(StatusContext);

  const { setActiveView, activeView } = viewStore((state) => state);

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

        <AnimatePresence>
          {showElement && (
            <>
              <div
                className="cursor-pointer z-[450] fixed top-0 left-0 w-screen h-screen"
                onClick={() => setShowElement(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="max-h-[315px] overflow-y-auto z-[500] p-3 absolute shadow-sm top-[54px] left-0 w-64 h-max bg-white border border-gray-300 rounded-md"
              >
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {activeView === "calendar" ? (
                    <CalendarBody />
                  ) : activeView === "months" ? (
                    <ListMonths />
                  ) : (
                    <ListYears />
                  )}
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
