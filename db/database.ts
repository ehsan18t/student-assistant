import * as SQLite from "expo-sqlite/legacy";

const db = SQLite.openDatabase("student.db");

export const createTables = () => {
  db.transaction((tx: any) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS semesters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        date TEXT
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        semester_id INTEGER,
        name TEXT,
        code TEXT,
        credits TEXT,
        full_marks TEXT,
        FOREIGN KEY (semester_id) REFERENCES semesters (id)
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS assessments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id INTEGER,
        name TEXT,
        type TEXT,
        expected_marks TEXT,
        actual_marks TEXT,
        percentage TEXT,
        best_count TEXT,
        FOREIGN KEY (course_id) REFERENCES courses (id)
      );`
    );
  });
};

export const addSemester = (name: string, date?: string) => {
  db.transaction((tx: any) => {
    tx.executeSql("INSERT INTO semesters (name, date) VALUES (?, ?)", [
      name,
      date,
    ]);
  });
};

export const getSemesters = (callback: (semesters: any[]) => void) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      "SELECT * FROM semesters",
      [],
      (_: any, { rows: { _array } }: any) => {
        callback(_array);
      }
    );
  });
};

// Define similar functions for adding and retrieving courses and assessments
export const addCourse = (
  semesterId: number,
  name: string,
  code: string,
  credits: string,
  fullMarks: string
) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      "INSERT INTO courses (semester_id, name, code, credits, full_marks) VALUES (?, ?, ?, ?, ?)",
      [semesterId, name, code, credits, fullMarks]
    );
  });
};

export const getCourses = (
  semesterId: number,
  callback: (courses: any[]) => void
) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      "SELECT * FROM courses WHERE semester_id = ?",
      [semesterId],
      (_: any, { rows: { _array } }: any) => {
        callback(_array);
      }
    );
  });
};

export const addAssessment = (
  courseId: number,
  name: string,
  type: string,
  expectedMarks: string,
  actualMarks: string,
  percentage: string,
  bestCount: string
) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      "INSERT INTO assessments (course_id, name, type, expected_marks, actual_marks, percentage, best_count) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [courseId, name, type, expectedMarks, actualMarks, percentage, bestCount]
    );
  });
};

export const getAssessments = (
  courseId: number,
  callback: (assessments: any[]) => void
) => {
  db.transaction((tx: any) => {
    tx.executeSql(
      "SELECT * FROM assessments WHERE course_id = ?",
      [courseId],
      (_: any, { rows: { _array } }: any) => {
        callback(_array);
      }
    );
  });
};
