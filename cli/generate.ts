import { Command } from "commander";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";

const program = new Command();

program
  .name("generate")
  .description("Generate a form component from JSON schema")
  .argument("<model>", "Path to the JSON model")
  .action((modelPath) => {
    const model = JSON.parse(fs.readFileSync(modelPath, "utf8"));

    const templatePath = path.join(__dirname, "templates", "formComponent.tsx.hbs");
    const template = handlebars.compile(fs.readFileSync(templatePath, "utf8"));

    const output = template(model);

    const outputDir = path.join(__dirname, "..", "src", "components", "organisms");
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const filePath = path.join(outputDir, `${model.name}Form.tsx`);
    fs.writeFileSync(filePath, output);

    console.log(`✅ Generated: ${filePath}`);
  });

program.parse();
