import fs from "fs/promises";
import path from "path";

export interface ApplicationInput {
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone?: string;
  portfolio?: string;
  github?: string;
  coverLetter?: string;
  resumeName: string;
  resumeSize: number;
}

export interface ApplicationRecord extends ApplicationInput {
  id: string;
  submittedAt: string;
}

const APPLICATIONS_FILE_PATH = path.join(process.cwd(), "data", "applications.json");

/**
 * Persists an application record to a local JSON file.
 * Creates the data folder and file if they do not exist.
 */
export async function saveApplication(input: ApplicationInput): Promise<ApplicationRecord> {
  const record: ApplicationRecord = {
    id: `app_${Math.random().toString(36).substring(2, 11)}`,
    ...input,
    submittedAt: new Date().toISOString(),
  };

  try {
    // Ensure the data directory exists
    const dirPath = path.dirname(APPLICATIONS_FILE_PATH);
    await fs.mkdir(dirPath, { recursive: true });

    let applications: ApplicationRecord[] = [];

    try {
      // Read existing records if the file exists
      const fileData = await fs.readFile(APPLICATIONS_FILE_PATH, "utf8");
      applications = JSON.parse(fileData);
      if (!Array.isArray(applications)) {
        applications = [];
      }
    } catch (readError: any) {
      // If file doesn't exist, ignore and use empty array
      if (readError.code !== "ENOENT") {
        console.error("Error reading applications file, resetting data:", readError);
      }
    }

    // Append new record
    applications.push(record);

    // Save back to JSON
    await fs.writeFile(APPLICATIONS_FILE_PATH, JSON.stringify(applications, null, 2), "utf8");
    return record;
  } catch (error) {
    console.error("Failed to save application to local storage:", error);
    throw new Error("Failed to save application on server.");
  }
}
