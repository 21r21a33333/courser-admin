import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
// import Navbar from './components/Navbar'
import NotFound from "./layouts/NotFound";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./components/Home";
import About from "./components/About";
import CourseCardsLayout from "./components/courses/CourseCardsLayout";
import CoursePageLayout from "./layouts/CoursePageLayout";
import ModuleContent from "./components/currentCourse/ModuleContent";
import ContentForm from "./components/currentCourse/ContentForm";
import ProblemForm from "./components/currentCourse/ProblemForm";
import Displaylesson from "./components/currentCourse/Displaylesson";
import DisplayProblem from "./components/currentCourse/DisplayProblem";
import {FetchProblemLoader} from "./components/currentCourse/DisplayProblem";
import {FetchLessonLoader} from "./components/currentCourse/Displaylesson";
import JsonEditorComponent from "./components/JsonEditorComponent";
import {EditLessonLoader} from "./components/currentCourse/EditLesson"
import EditLesson from "./components/currentCourse/EditLesson";
import EditProblem from "./components/currentCourse/EditProblem";
import {EditProblemLoader} from "./components/currentCourse/EditProblem";

//loaders
import { coursesLoader } from "./components/courses/CourseCardsLayout";
import { FetchCourseDetailsLoader } from "./layouts/CoursePageLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="courses">
            <Route index loader={coursesLoader} element={<CourseCardsLayout />} />
            <Route
              path=":courseid"
              loader={FetchCourseDetailsLoader}
              element={<CoursePageLayout />}
            >
              <Route
                index
                element={
                  <>
                    <p>Course DashBoard</p>
                  </>
                }
              />
              <Route path=":moduleid" element={<ModuleContent />}>
                <Route
                  index
                  element={
                    <>
                      <h1 className="flex items-center">EDITOR AREA</h1>
                      {/* <JsonEditorComponent /> */}
                    </>
                  }
                />
                <Route path="addLesson" element={<ContentForm />} />
                <Route path="addProblem" element={<ProblemForm />} />
                <Route
                  path="TextPreview/:LessonId"
                  loader={FetchLessonLoader}
                  element={<Displaylesson />}
                />
                <Route
                  path="ProblemPreview/:LessonId"
                  loader={FetchProblemLoader}
                  element={<DisplayProblem />}
                />
                <Route
                  path="EditLesson/:LessonId"
                  loader={EditLessonLoader}
                  element={<EditLesson />}
                />
                <Route
                  path="EditProblem/:LessonId"
                  loader={EditProblemLoader}
                  element={<EditProblem />}
                />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}


// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route element={<ProtectedRoute />}>
//         <Route path="/" element={<HomeLayout />}>
//           <Route index element={<Home />} />
//           <Route path="about" element={<About />} />
//           <Route path="courses">
//             <Route index loader={coursesLoader} element={<CourseCardsLayout />} />
//             <Route
//               path=":courseid"
//               loader={FetchCourseDetailsLoader}
//               element={<CoursePageLayout />}
//             >
//               <Route
//                 index
//                 element={
//                   <>
//                     <p>Course DashBoard</p>
//                   </>
//                 }
//               ></Route>
//               <Route path=":moduleid" element={<ModuleContent />}>
//                 <Route
//                   index
//                   element={
//                     <>
//                       <h1 className="flex items-center">EDITOR AREA</h1>
//                       {/* < JsonEditorComponent /> */}
//                     </>
//                   }
//                 />
//                 <Route path="addLesson" element={<ContentForm />} />
//                 <Route path="addProblem" element={<ProblemForm />} />
//                 <Route
//                   path="TextPreview/:LessonId"
//                   loader={FetchLessonLoader}
//                   element={<Displaylesson />}
//                 />
//                 <Route
//                   path="ProblemPreview/:LessonId"
//                   loader={FetchProblemLoader}
//                   element={<DisplayProblem />}
//                 />
//                 <Route
//                   path="EditLesson/:LessonId"
//                   element={<EditLesson />}
//                   loader={EditLessonLoader}
//                 />
//                 <Route
//                   path="EditProblem/:LessonId"
//                   loader={EditProblemLoader}
//                   element={<EditProblem />}
//                 />
//               </Route>
//             </Route>
//           </Route>
//           <Route path="*" element={<NotFound />} />
//         </Route>
//       </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

export default App;
