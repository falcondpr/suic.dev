import { ActiveViewProps } from "../App";

interface ListMonthsProps {
  setActiveView: (value: ActiveViewProps) => void;
}

const ListMonths: React.FC<ListMonthsProps> = ({ setActiveView }) => {
  return (
    <div>
      <header>
        <button
          onClick={() => setActiveView("years")}
          className="hover:border-transparent py-1 px-3 hover:bg-gray-200/30 rounded-md text-lg font-medium text-gray-800"
        >
          2024
        </button>
      </header>

      <div className="grid grid-cols-3 gap-2 mt-2">
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <button
              onClick={() => setActiveView("calendar")}
              className="p-2 hover:bg-gray-300/40 bg-gray-200/40 font-medium text-gray-700 rounded-md"
              key={index}
            >
              JAN
            </button>
          ))}
      </div>
    </div>
  );
};

export default ListMonths;
