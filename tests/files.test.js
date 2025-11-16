import { expect, test } from "vitest";
import fs from "fs";
import path from "path";
import { load } from "js-yaml";

test(".vale.ini staat in Geensnor/", () => {
  const filePath = path.resolve(process.cwd(), "Geensnor", ".vale.ini");
  const exists = fs.existsSync(filePath);
  expect(exists).toBe(true);
});

test("0-Geensnor.ini staat niet in Geensnor/", () => {
  const filePath = path.resolve(process.cwd(), "Geensnor", "0-Geensnor.ini");
  const exists = fs.existsSync(filePath);
  expect(exists).toBe(false);
});

test("alle bestanden in Geensnor/styles/Geensnor eindigen op .yml", () => {
  const dirPath = path.resolve(process.cwd(), "Geensnor", "styles", "Geensnor");
  if (!fs.existsSync(dirPath)) {
    throw new Error(`${dirPath} bestaat niet`);
  }

  const entries = fs.readdirSync(dirPath);
  const files = entries.filter((f) => {
    const full = path.join(dirPath, f);
    return fs.statSync(full).isFile();
  });

  const nonYml = files.filter((f) => !f.toLowerCase().endsWith(".yml"));
  if (nonYml.length > 0) {
    throw new Error(
      "Onjuiste bestandsnamen gevonden (moeten eindigen op .yml):\n" +
        nonYml.join("\n")
    );
  }

  expect(nonYml.length).toBe(0);
});

test("alle .yml-bestanden in Geensnor/styles/Geensnor zijn geldige YAML", () => {
  const dirPath = path.resolve(process.cwd(), "Geensnor", "styles", "Geensnor");
  if (!fs.existsSync(dirPath)) {
    throw new Error(`${dirPath} bestaat niet`);
  }

  const entries = fs.readdirSync(dirPath);
  const ymlFiles = entries.filter((f) => {
    const full = path.join(dirPath, f);
    return fs.statSync(full).isFile() && f.toLowerCase().endsWith(".yml");
  });

  const invalid = [];
  ymlFiles.forEach((file) => {
    const full = path.join(dirPath, file);
    const content = fs.readFileSync(full, "utf8");
    try {
      load(content);
    } catch (err) {
      invalid.push({
        file,
        error: err && err.message ? err.message : String(err),
      });
    }
  });

  if (invalid.length > 0) {
    const msg = invalid.map((i) => `${i.file}: ${i.error}`).join("\n");
    throw new Error("Ongeldige YAML-bestanden gevonden:\n" + msg);
  }

  expect(invalid.length).toBe(0);
});
