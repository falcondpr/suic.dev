import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { ActiveViewProps } from "../App";

interface CalendarBodyProps {
  setActiveView: (value: ActiveViewProps) => void;
}

const CalendarBody: React.FC<CalendarBodyProps> = ({
  setActiveView,
}) => {
  return (
    <div>
      <header className="flex items-center justify-between">
        <button
          className="text-gray-800 flex items-center gap-x-2"
          onClick={() => setActiveView("months")}
        >
          <span className="font-medium">May 2024</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-x-1">
          <button className="relative w-8 h-8 hover:bg-gray-200/50/70 rounded-lg grid place-items-center">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="relative w-8 h-8 hover:bg-gray-200/50/70 rounded-lg grid place-items-center">
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
                className="hover:bg-gray-200/50 p-2 rounded-lg text-sm text-gray-900"
              >
                {index + 1}
              </button>
            ))}
        </div>
      </main>
    </div>
  );
};

export default CalendarBody;
