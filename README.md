# Simple UI Components

<div style="text-align: center;">
  <img src="https://res.cloudinary.com/da6b7skw8/image/upload/v1718857054/ghyfo1zi0ouh9cr1sf5u.png" alt="Descripción de la imagen">
</div>

## Description

This project is a component library designed to provide reusable and customizable UI components for React applications. Currently, the library includes a Calendar component with more components to be added in the future.

## Installation

To install the component library, use the following npm command:

```bash
npm i suic.dev
```

## Usage

To use the Calendar component in your React application, follow these steps:

1. Import the required styles in your main file (`main.tsx` or equivalent):

```typescript
import "suic.dev/style.css";
```

2. Import and use the Calendar component in your React component:

```tsx
import { useState } from "react";
import { Calendar } from "suic.dev";

const App: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div style={{ padding: 20 }}>
      <Calendar
        show={show}
        setShow={setShow}
        date={date}
        setDate={setDate}
      />
    </div>
  );
};

export default App;
```

### Props

The `Calendar` component accepts the following props:

- `show` (boolean): Controls the visibility of the calendar.
- `setShow` (function): Function to update the visibility state.
- `date` (Date): The currently selected date.
- `setDate` (function): Function to update the selected date.

## Contributing

We welcome contributions to expand and improve this library. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request to the main repository.

## Contributors

We would like to thank the following people for their contributions to the project:

- [Martin Medina](https://github.com/macrohex): QA.
- [Fernando Villalba](https://github.com/fervillalbag): Dev

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

For any questions or issues, please contact [via X](https://twitter.com/fervillalbag).

---

Thank you for using our component library! We hope it helps you build beautiful and efficient applications.
