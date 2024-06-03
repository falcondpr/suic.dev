import fs from "fs";
import path from "path";

// Ruta del archivo tailwind.config.js en el proyecto del usuario
const tailwindConfigPath = path.resolve(
  // eslint-disable-next-line
  process.cwd(),
  "tailwind.config.js"
);

// Nueva entrada para agregar a la configuración de Tailwind CSS
const newContentEntry =
  "./node_modules/suic.dev/**/*.{js,ts,jsx,tsx}";

console.log("Trying to update Tailwind CSS configuration...");

// Verificar si el archivo tailwind.config.js existe en el proyecto
if (fs.existsSync(tailwindConfigPath)) {
  console.log("Found tailwind.config.js in the project.");

  try {
    // Leer el contenido del archivo tailwind.config.js
    let configContent = fs.readFileSync(tailwindConfigPath, "utf-8");

    // Buscar la sección "content" en el archivo tailwind.config.js
    const contentRegex = /content\s*:\s*\[(.*?)\]/s;
    const match = contentRegex.exec(configContent);

    // Si se encuentra la sección "content", agregar la nueva entrada si aún no está presente
    if (match) {
      console.log('Found "content" section in tailwind.config.js.');

      if (!match[1].includes(newContentEntry)) {
        console.log(
          "Adding new content entry to tailwind.config.js..."
        );

        const updatedContent = match[1].trim()
          ? `${match[1].trim()}, '${newContentEntry}'`
          : `'${newContentEntry}'`;
        configContent = configContent.replace(
          contentRegex,
          `content: [${updatedContent}]`
        );

        // Escribir la configuración actualizada en el archivo tailwind.config.js
        fs.writeFileSync(tailwindConfigPath, configContent);
        console.log(
          "Tailwind CSS configuration updated to include suic.dev package."
        );
      } else {
        console.log(
          "Tailwind CSS configuration already includes suic.dev package."
        );
      }
    } else {
      console.error(
        'Failed to find the "content" section in tailwind.config.js.'
      );
    }
  } catch (error) {
    console.error(
      "An error occurred while reading or writing the tailwind.config.js file:",
      error
    );
  }
} else {
  console.error(
    "tailwind.config.js not found. Please ensure you have Tailwind CSS configured in your project."
  );
}
