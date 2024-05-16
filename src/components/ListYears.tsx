import { ActiveViewProps } from "../App";

interface ListYearsProps {
  setActiveView: (value: ActiveViewProps) => void;
}

const ListYears: React.FC<ListYearsProps> = ({ setActiveView }) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <button
              onClick={() => setActiveView("calendar")}
              className="p-2 hover:bg-gray-100 text-gray-600 rounded-md"
              key={index}
            >
              2020
            </button>
          ))}
      </div>
    </div>
  );
};

export default ListYears;
