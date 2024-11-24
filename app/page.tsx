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

  const addStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && age && grade && rollNo) {
      const newStudent = {
        name,
        age: Number(age),
        grade,
        rollNo,
      };

      setStudent([...student, newStudent]);
      setName(""), setAge(undefined), setGrade(""), setRollNo("");
    } else {
      alert("Please fill all fields!");
    }
  };

  const deleteStudent = (indexToDelete: number) => {
    setStudent(student.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="min-h-lvh bg-white ">
      <div className=" flex flex-col p-4 gap-4
      lg:flex lg:flex-row md:space-x-2 lg:justify-around ">
        <form
          onSubmit={addStudent}
          className=" border-2 border-blue-400 bg-sky-200 p-4 flex flex-col items-center pt-10
            lg:w-1/2"
        >
          <div className="border-2 border-blue-400 flex flex-col space-y-4 p-4 bg-sky-100 rounded-xl pb-8 w-11/12  ">
            <h1 className="text-center text-black font-bold text-xl">
              Students Details
            </h1>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pt-2 pb-2 pl-4 rounded-full "
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
              placeholder="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="pt-2 pb-2 pl-4 rounded-full"
            />

            <input
              type="text"
              placeholder="Roll Number"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="pt-2 pb-2 pl-4 rounded-full "
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-sky-100 m-4 flex w-36 h-12 items-center justify-center border-2 border-blue-400 p-3"
          >
            <h1 className=" text-black font-bold text-lg justify-center">
              Done
            </h1>
          </button>
        </form>

        <div className="min-h-lvh flex
        lg:w-1/3">
          <div className="bg-sky-200 flex-col w-[100%] h-min p-2 border-2 border-blue-400 ">
            <h1 className="text-2xl font-bold m-2 mx-auto text-center">
              Students Record
            </h1>

            <div className="flex flex-wrap justify-around gap-6  w-[100%]">
              {student.map((student, index) => (
                <div
                  key={index}
                  className="w-[370px] h-52 blue-300 border-2 border-blue-400 rounded-xl flex flex-col p-4 "
                >
                  <h1 className="font-bol text-lg capitalize">Name : {student.name}</h1>
                  <p>Age : {student.age}</p>
                  <p>Grade : {student.grade}</p>
                  <p className='uppercase'>Roll No : {student.rollNo}</p>
                  <button
                    onClick={() => deleteStudent(index)}
                    className="mt-6 p-2 bg-red-500 text-white rounded-full w-32 self-center"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
