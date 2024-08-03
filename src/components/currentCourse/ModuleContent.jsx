import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useState } from "react";
// import { Link } from 'react-router-dom';
import axios from "axios";
import env from "../../env";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadCurrentCourseData } from "../../redux/CurrentCourse";

import ContentForm from "./ContentForm";


function deleteModule(lessonid,moduleid){

  let data = JSON.stringify({
    "moduleid":moduleid,
    "lessonid":lessonid
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${env.SERVER_URI}/lesson/delete/`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    alert("Lesson Deleted Successfully")
  })
  .catch((error) => {
    console.log(error);
  });
}


function EditComponent(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courseid=useParams().courseid;
  let {lessonType,LessonId} = props;
  let { moduleid } = useParams();
  return (
    <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
      <Link 
        to={(lessonType==="text-material")?`EditLesson/${LessonId}`:`EditProblem/${LessonId}`}
      >
      <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        Edit
      </button>
      </Link>
      <Link to={(lessonType==="text-material")?`TextPreview/${LessonId}`:`ProblemPreview/${LessonId}`}>
      <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        View
      </button>
      </Link>
      

      <button className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-blue-500 shadow-sm focus:relative"
        onClick={()=>{
          deleteModule(LessonId,moduleid)
          async function fetchdata() {
            let config = {
              method: "get",
              maxBodyLength: Infinity,
              url: `${env.SERVER_URI}/fetch/course/${courseid}`,
              headers: {},
            };
            let response = await axios.request(config);
            dispatch(loadCurrentCourseData(response.data));
            // console.log(response.data)
            navigate(`/courses/${courseid}/${moduleid}`, { replace: true });
            window.location.reload();
            // setCourseData(response.data);
          }fetchdata();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        Delete
      </button>
    </div>
  );
}
function LessonCardListItem(props) {
  return (
    <li>
        <div className="relative pb-8">
          <span
            className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
            aria-hidden="true"
          />
          <div className="relative flex items-start space-x-3">
            <div>
              <div className="relative px-1">
                <div className="h-8 w-8 bg-blue-500 rounded-full ring-8 ring-white flex items-center justify-center">
                  <svg
                    className="text-white h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="min-w-0 flex-1 py-0">
              <div className="text-md text-gray-500">
                <div>
                  <Link
                    to={`${props.lesson._id}`}
                    className="font-medium text-gray-900 mr-2"
                  >
                    {props.lesson.lesson_title}
                  </Link>
                  <Link
                    to={`${props.lesson._id}`}
                    className="bg-green-200 my-0.5 relative inline-flex items-center bg-white rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                  >
                    <div className="absolute flex-shrink-0 flex items-center justify-center  ">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-green-500"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3.5 font-medium text-gray-900 ">
                      {props.lesson.contentype}
                    </div>
                  </Link>
                </div>
                <span className="whitespace-nowrap text-sm mt-1">
                  Lesson Points <b>{props.lesson.lesson_points}</b>{" "}
                </span>
              </div>
              <div className="mt-2 text-gray-700">
                <p>
                  -{" "}
                  {(props.lesson.lesson_title + "" + "Description").slice(
                    0,
                    25
                  ) + "..."}{" "}
                </p>
              </div>
              <EditComponent lessonType={props.lesson.contentype} LessonId={props.lesson._id} />
            </div>
          </div>
        </div>
    </li>
  );
}

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown} // Toggle dropdown on button click
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Dropdown button{" "}
        <svg
          className={`w-2.5 h-2.5 ms-3 transform transition-transform ${
            isOpen ? "rotate-180" : "" // Rotate arrow icon if dropdown is open
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {/* Dropdown menu */}
      <div
        id="dropdown"
        className={`z-10 ${
          isOpen ? "" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <Link
              to="addLesson"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Add Lesson
            </Link>
          </li>
          <li>
            <Link
              to="addProblem"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Add Problem
            </Link>
          </li>
          <li>
            <Link
              to="addAssignment"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Add Assignment
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

function ModuleContent() {
  let { moduleid } = useParams();
  let moduledata = useSelector(
    (state) => state.CurrentCourse.currentCoursedata.modules
  );
  let current_module = moduledata.find((module) => module._id === moduleid);
  // console.log("Current Module lessons are")
  let lessons = current_module.lessons;
  return (
    <div className="sticky">
      {/* <p>{moduleid}</p> */}
      <>
        {/* component */}
        <div className=" h-screen float-left bg-white  border-r-2 ">
          <div className="max-w-xl mx-auto p-8">
            <div className="flow-root">
              <h1 className="text-lg mb-4">Lessons</h1>
              <ul>
                <Dropdown></Dropdown>
              </ul>
              <ul className="mb-8 mt-8">
                {lessons.map((lesson) => {
                  return (
                    <LessonCardListItem key={lesson._id} lesson={lesson} />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="h-screen float-left bg-white   ">
          <div className="max-w-xl mx-auto p-8">
            <div className="flow-root ">
              {/* header */}
              <div className="flex ">
                <h1 className="mx-8">Update Content Here</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                  />
                </svg>
              </div>
              {/* <ContentForm></ContentForm> */}
              <Outlet />
              {/* editor component */}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default ModuleContent;
