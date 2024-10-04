import * as SQLite from "expo-sqlite";

const db = await SQLite.openDatabaseAsync("student.db");

export const createTables = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS semesters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      date TEXT
    );
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      semester_id INTEGER,
      name TEXT,
      code TEXT,
      credits TEXT,
      full_marks TEXT,
      FOREIGN KEY (semester_id) REFERENCES semesters (id)
    );
    CREATE TABLE IF NOT EXISTS assessments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      course_id INTEGER,
      name TEXT,
      type TEXT,
      expected_marks TEXT,
      actual_marks TEXT,
      percentage TEXT,
      best_count TEXT,
      FOREIGN KEY (course_id) REFERENCES courses (id)
    );
  `);
};

export const addSemester = async (name: string, date = "") => {
  await db.runAsync("INSERT INTO semesters (name, date) VALUES (?, ?)", name, date);
};

export const getSemesters = async (): Promise<any[]>  => {
  try {
    return await db.getAllAsync("SELECT * FROM semesters")
  } catch (error) {
    console.error("Error fetching semesters:", error);
    return [];
  }
};

export const addCourse = async (
    semesterId: number,
    name: string,
    code: string,
    credits: string,
    fullMarks: string
) => {
  try {
    const result: any = await db.runAsync(
        "INSERT INTO courses (semester_id, name, code, credits, full_marks) VALUES (?, ?, ?, ?, ?)",
        semesterId,
        name,
        code,
        credits,
        fullMarks
    );
    console.log(result.lastInsertRowId, result.changes);
  } catch (error) {
    console.error("Error adding course:", error);
  }
};

export const getCourses = async (semesterId: number): Promise<any[]> => {
  try {
    return await db.getAllAsync("SELECT * FROM courses WHERE semester_id = ?", [semesterId]);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const addAssessment = async (
    courseId: number,
    name: string,
    type: string,
    expectedMarks: string,
    actualMarks: string,
    percentage: string,
    bestCount: string
) => {
  try {
    await db.runAsync(
        "INSERT INTO assessments (course_id, name, type, expected_marks, actual_marks, percentage, best_count) VALUES (?, ?, ?, ?, ?, ?, ?)",
        courseId,
        name,
        type,
        expectedMarks,
        actualMarks,
        percentage,
        bestCount
    );
  } catch (error) {
    console.error("Error adding assessment:", error);
  }
};

export const getAssessments = async (courseId: number): Promise<any[]> => {
  try {
    return await db.getAllAsync("SELECT * FROM assessments WHERE course_id = ?", [courseId]);
  } catch (error) {
    console.error("Error fetching assessments:", error);
    return [];
  }
};
