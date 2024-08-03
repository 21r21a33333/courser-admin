// import React from 'react';
// import { useLoaderData } from 'react-router-dom';

// export default function CoursePageLayout() {
//   return (
//     <div>
//       <p>afsdfasd</p>
//     </div>
//   );
// }

// export const FetchCourseDetailsLoader = async ({ params }) => {
//   const { courseid } = params;
//   const res = await fetch('http://localhost:8800/fetch/courses/' + courseid);
//   const data = await res.json();
//   return data;
// };



import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loadCurrentCourseData } from '../redux/CurrentCourse'
import { Outlet } from 'react-router-dom'
import ENV from '../env'


import Sidebar from '../components/currentCourse/Sidebar'


function CoursePageLayout() {
  const data = useLoaderData();
  const dispatch = useDispatch();
  dispatch(loadCurrentCourseData(data));

  const redux_store_data = useSelector((state) => state.CurrentCourse.currentCoursedata)
  // console.log(redux_store_data)/
  // console.log(data);
  return (
    <>
    <Sidebar></Sidebar>
    <Outlet/>
    </>
  )
}

export default CoursePageLayout
export const FetchCourseDetailsLoader = async ({ params }) => {
  const { courseid } = params;
  const res = await fetch(`${ENV.SERVER_URI}/fetch/course/` + courseid);
  const data = await res.json();
  return data;
};