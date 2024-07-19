import inquirer from "inquirer";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

async function mergeIconAndTitle() {
  // Get user input for the title
  const { title } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the title to add to the icon:",
    },
  ]);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const iconPath = path.join(__dirname, "icon.png");
  const outputPath = path.join(__dirname, "icon-title.png");

  try {
    // Read the original icon
    const icon = sharp(iconPath);
    const metadata = await icon.metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error("Unable to read image dimensions");
    }

    const textWidth = title.length * 305; // Estimate text width
    const newWidth = metadata.width + textWidth + 20; // Add padding
    const newHeight = Math.max(metadata.height, 50); // Ensure minimum height for text

    // Create a new image with the icon and title
    const svgImage = `
      <svg width="${newWidth}" height="${newHeight}">
        <image href="data:image/png;base64,${(await icon.toBuffer()).toString(
          "base64"
        )}" x="0" y="0" height="${metadata.height}" width="${metadata.width}" />
        <text x="${metadata.width + 10}" y="${
      newHeight / 2
    }" font-family="Arial" font-size="96" fill="white" dominant-baseline="middle">${title}</text>
      </svg>
    `;

    // Generate the final image
    await sharp(Buffer.from(svgImage)).png().toFile(outputPath);

    console.log(`Image with title created successfully: ${outputPath}`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

mergeIconAndTitle();
