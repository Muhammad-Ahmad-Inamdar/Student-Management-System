"use client";
import { useState } from "react";

type StudentRecord = {
  name: string;
  age: number;
  grade: string;
  rollNo: string;
};

export default function Home() {
  const [student, setStudent] = useState<StudentRecord[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState<number>();
  const [grade, setGrade] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && age && grade && rollNo) {
      const newStudent = { name, age: Number(age), grade, rollNo };

      if (editingIndex !== null) {
        // Update the existing student
        const updatedStudents = [...student];
        updatedStudents[editingIndex] = newStudent;
        setStudent(updatedStudents);
        setEditingIndex(null); // Reset editing state
      } else {
        // Add a new student
        setStudent([...student, newStudent]);
      }

      // Clear the form fields
      setName("");
      setAge(undefined);
      setGrade("");
      setRollNo("");
    } else {
      alert("Please fill all fields!");
    }
  };

  const editStudent = (index: number) => {
    const studentToEdit = student[index];
    setName(studentToEdit.name);
    setAge(studentToEdit.age);
    setGrade(studentToEdit.grade);
    setRollNo(studentToEdit.rollNo);
    setEditingIndex(index); // Set the index being edited
  };

  const deleteStudent = (indexToDelete: number) => {
    setStudent(student.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="min-h-lvh bg-white ">
      <div className="flex flex-col p-4 gap-4 lg:flex lg:flex-row md:space-x-2 lg:justify-around">
        <form
          onSubmit={addStudent}
          className="border-2 border-blue-400 bg-sky-200 p-4 flex flex-col items-center pt-10 lg:w-1/2"
        >
          <div className="border-2 border-blue-400 flex flex-col space-y-4 p-4 bg-sky-100 rounded-xl pb-8 w-11/12">
            <h1 className="text-center text-black font-bold text-xl">
              {editingIndex !== null ? "Edit Student" : "Add Student"}
            </h1>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pt-2 pb-2 pl-4 rounded-full"
            />

            <input
              type="number"
              placeholder="Age"
              value={age || ""}
              onChange={(e) => setAge(Number(e.target.value))}
              className="pt-2 pb-2 pl-4 rounded-full"
            />

            <input
              type="text"
              placeholder="Grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="pt-2 pb-2 pl-4 rounded-full"
            />

            <input
              type="text"
              placeholder="Roll Number"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="pt-2 pb-2 pl-4 rounded-full"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-sky-100 m-4 flex w-36 h-12 items-center justify-center border-2 border-blue-400 p-3"
          >
            <h1 className="text-black font-bold text-lg justify-center">
              {editingIndex !== null ? "Update" : "Add"}
            </h1>
          </button>
        </form>

        <div className="min-h-lvh flex lg:w-1/3">
          <div className="bg-sky-200 flex-col w-[100%] h-min p-2 border-2 border-blue-400">
            <h1 className="text-2xl font-bold m-2 mx-auto text-center">
              Students Record
            </h1>

            <div className="flex flex-wrap justify-around gap-6 w-[100%]">
              {student.map((student, index) => (
                <div
                  key={index}
                  className="w-[370px] h-52 blue-300 border-2 border-blue-400 rounded-xl flex flex-col p-4"
                >
                  <h1 className="font-bold text-lg capitalize">
                    Name: {student.name}
                  </h1>
                  <p>Age: {student.age}</p>
                  <p>Grade: {student.grade}</p>
                  <p className="uppercase">Roll No: {student.rollNo}</p>
                  <div className="flex gap-2 mt-4 justify-center">
                    <button
                      onClick={() => editStudent(index)}
                      className="p-2 bg-yellow-500 text-white rounded-full w-24"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteStudent(index)}
                      className="p-2 bg-red-500 text-white rounded-full w-24"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
