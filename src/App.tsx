import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

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
                className="z-[500] p-3 absolute shadow-sm top-[54px] left-0 w-64 h-max bg-white border border-gray-300 rounded-md"
              >
                <header className="flex items-center justify-between">
                  <button className="text-gray-800 flex items-center gap-x-2">
                    <span className="font-bold">May 2024</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-x-1">
                    <button className="relative w-8 h-8 hover:bg-gray-200/70 rounded-lg grid place-items-center">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="relative w-8 h-8 hover:bg-gray-200/70 rounded-lg grid place-items-center">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </header>

                <main>
                  <div className="grid mt-2 grid-cols-7 justify-items-center gap-x-1">
                    <p className="text-sm text-gray-400">S</p>
                    <p className="text-sm text-gray-400">M</p>
                    <p className="text-sm text-gray-400">T</p>
                    <p className="text-sm text-gray-400">W</p>
                    <p className="text-sm text-gray-400">T</p>
                    <p className="text-sm text-gray-400">F</p>
                    <p className="text-sm text-gray-400">S</p>
                  </div>

                  <div className="grid mt-2 grid-cols-7 justify-items-center gap-0.5">
                    {Array(31)
                      .fill(0)
                      .map((_, index) => (
                        <button
                          key={index}
                          className="hover:bg-gray-200 p-2 rounded-lg text-sm text-gray-900"
                        >
                          {index + 1}
                        </button>
                      ))}
                  </div>
                </main>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
