import inquirer from "inquirer";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const FINAL_WIDTH = 604;
const FINAL_HEIGHT = 241;
const PADDING = 20;
const FONT_SIZE = 48;

async function mergeIconAndTitle() {
  const { title } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the title to add to the icon:",
    },
  ]);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const iconPath = path.join(__dirname, "icon.png");
  const outputPath = path.join(__dirname, "icon-title.png");

  try {
    // Read and resize the original icon
    const icon = sharp(iconPath);
    const metadata = await icon.metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error("Unable to read image dimensions");
    }

    const aspectRatio = metadata.width / metadata.height;
    const newIconHeight = FINAL_HEIGHT - PADDING * 2;
    const newIconWidth = Math.min(newIconHeight * aspectRatio, FINAL_WIDTH / 2);

    const resizedIcon = await icon
      .resize(Math.round(newIconWidth), Math.round(newIconHeight), {
        fit: "contain",
      })
      .toBuffer();

    // Calculate text position
    const iconWidth = Math.round(newIconWidth);
    const textX = iconWidth + PADDING * 2;

    // Create SVG with icon and text
    const svgImage = `
      <svg width="${FINAL_WIDTH}" height="${FINAL_HEIGHT}">
        <rect width="100%" height="100%" fill="black"/>
        <image href="data:image/png;base64,${resizedIcon.toString(
          "base64"
        )}" x="${PADDING}" y="${
      (FINAL_HEIGHT - newIconHeight) / 2
    }" width="${iconWidth}" height="${newIconHeight}" />
        <text x="${textX}" y="${
      FINAL_HEIGHT / 2
    }" font-family="Arial" font-size="${FONT_SIZE}" fill="white" dominant-baseline="middle" text-anchor="start">
          ${fitTextToWidth(title)}
        </text>
      </svg>
    `;

    // Generate the final image
    await sharp(Buffer.from(svgImage)).png().toFile(outputPath);

    console.log(`Image with title created successfully: ${outputPath}`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function fitTextToWidth(text) {
  if (text.length <= 17) {
    return text;
  }

  // Truncate with ellipsis if too long
  throw new Error("Text too long, 17 characters max");
}

mergeIconAndTitle();
