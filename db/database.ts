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

export const deleteSemester = (id: number) => {
  db.transaction((tx: any) => {
    tx.executeSql("DELETE FROM semesters WHERE id = ?", [id], (_: any, resultSet: any) => {
      console.log("Deleted semester with id: " + id);
    });
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

export const deleteCourse = (id: number) => {
  db.transaction((tx: any) => {
    tx.executeSql("DELETE FROM courses WHERE id = ?", [id], (_: any, resultSet: any) => {
      console.log("Deleted course with id: " + id);
    });
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

export const deleteAssessment = (id: number) => {
  db.transaction((tx: any) => {
    tx.executeSql("DELETE FROM assessments WHERE id = ?", [id], (_: any, resultSet: any) => {
      console.log("Deleted assessment with id: " + id);
    });
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

export const fetchCourseContributions = (semester_id: number, callback: (data: any) => void) => {
  db.transaction((tx) => {
    tx.executeSql(
        `SELECT name, credits FROM courses WHERE semester_id = ?`,
        [semester_id],
        (_, { rows }) => {
          const courses = rows._array;
          const totalCredits = courses.reduce((sum, course) => sum + parseFloat(course.credits), 0);

          const contributions = courses.map((course) => ({
            name: course.name,
            percentage: Number(((course.credits) / totalCredits) * 100)
          }));

          callback(contributions);
        }
    );
  });
};
