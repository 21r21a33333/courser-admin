import React from "react";
import { useSelector } from "react-redux";
import { Link ,useParams} from "react-router-dom";
import "./sidebar.css";
import env from "../../env";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loadCurrentCourseData } from "../../redux/CurrentCourse";
import fetchdata from "../../helper/fetchData";
import { useNavigate } from "react-router-dom";
function deleteModule(id){
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${env.SERVER_URI}/module/delete/${id}`,
    headers: {}
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    alert("module deleted");
    
  })
  .catch((error) => {
    console.log(error);
    alert(error);
  });
}

function NavItemslist(props) {
  let { courseid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <li>
      <Link
        to={`${props.prop._id}`}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        <svg
          className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="flex-1 ms-3 whitespace-nowrap">
          {props.prop.module_title}
        </span>
        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
          {props.prop.lessons.length}
        </span>
        <div className="mx-3" onClick={()=>{
          deleteModule(props.prop._id)
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
            navigate(`/courses/${courseid}`, { replace: true });
            window.location.reload();
            // setCourseData(response.data);
          }fetchdata();
        
        
        }
          
          }>
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
        </div>
      </Link>
    </li>
  );
}
function addModule(course_id) {
  console.log("Add Module");
  let module_title = prompt("Enter Module Title");
  let data = JSON.stringify({
    course_id: course_id,
    module_title: module_title,
  });
  // alert(data);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${env.SERVER_URI}/add/module`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    alert("Module Added Successfully");
  })
  .catch((error) => {
    console.log(error);
    alert(error);
  });
}
function Sidebar() {
  let { courseid } = useParams();
  let Modulesdata = useSelector(
    (state) => state.CurrentCourse.currentCoursedata.modules
  );
  let courseData = useSelector((state) => state.CurrentCourse.currentCoursedata);
  const dispatch = useDispatch();
  // console.log("Moduless data ")
  // console.log(Modulesdata)
  return (
    <div>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <aside
        id="logo-sidebar"
        className="  float-left top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0 "
        aria-label="Sidebar"
      >
        <div className="sidebar h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <Link to="/" className="flex items-center ps-2.5 mb-5">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 me-3 sm:h-7"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Modules
            </span>
          </Link>
          <ul className="space-y-2 font-medium">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={()=>{addModule(courseid);
                async function fetchdata() {
                  let config = {
                    method: "get",
                    maxBodyLength: Infinity,
                    url: `${env.SERVER_URI}/fetch/course/${courseid}`,
                    headers: {},
                  };
                  let response = await axios.request(config);
                  dispatch(loadCurrentCourseData(response.data));
                  window.location.reload();
                  // setCourseData(response.data);
                }
                fetchdata();
              }
            }
            >
              Add Module
            </button>
          </ul>
          <ul className="space-y-2 font-medium">
            {Modulesdata.map((mod) => {
              return <NavItemslist key={mod._id} prop={mod} />;
            })}
          </ul>
        </div>
      </aside>
      {/* <div >
   Course content
  </div> */}
    </div>
  );
}

export default Sidebar;
