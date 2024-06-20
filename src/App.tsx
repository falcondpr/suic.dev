import { useContext, useState } from "react";

import { Calendar } from "./";
import { StatusContext } from "./context/StatusContext";

export type ActiveViewProps = "calendar" | "months" | "years";

const App: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const { showElement, setShowElement } = useContext(StatusContext);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: 12,
        margin: "-100px auto 0 auto",
        width: "100%",
        height: "100dvh",
        alignItems: "center",
      }}
    >
      <div>
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
