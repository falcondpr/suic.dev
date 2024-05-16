import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const App: React.FC = () => {
  const [showElement, setShowElement] = useState<boolean>(false);

  return (
    <div className="p-4">
      <div className="relative">
        <button
          onClick={() =>
            showElement ? setShowElement(false) : setShowElement(true)
          }
          className="shadow-sm text-slate-800 relative z-[500] bg-white border border-gray-300 py-2 px-3 rounded-md"
        >
          2024/04/04
        </button>

        <AnimatePresence>
          {showElement && (
            <>
              <div
                className="cursor-pointer z-[450] fixed top-0 left-0 w-screen h-screen"
                onClick={() => setShowElement(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="z-[500] absolute shadow-sm top-[54px] left-0 w-48 h-40 bg-white border border-gray-300 rounded-md"
              ></motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
