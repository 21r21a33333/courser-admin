import React from "react";
import env from "../../env";
import { useLoaderData, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useState, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import JsonEditorComponent from "./../JsonEditorComponent";
import JsonUploadComponent from "./JsonUploadComponent";
import { useNavigate } from "react-router-dom";
import { loadCurrentCourseData } from "../../redux/CurrentCourse";
// import ENV from "../../env";
function EditProblem() {
  let { moduleid, LessonId } = useParams();
  let data = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courseid = useParams().courseid;
  // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  // console.log(data)
  // alert(JSON.stringify(data));
  let lesson_title1 = data.lesson_title;
  let lesson_points1 = data.lesson_points;
  let problem_title = data.problem_title;
  let problem_description1 = data.problem_id.problem_description;
  // console.log(problem_description1)
  // alert(problem_description1)
  let sample_test_cases1 = data.problem_id.sample_test_cases;
  let hidden_test_cases1 = data.problem_id.hidden_test_cases;
  // alert(JSON.stringify(hidden_test_cases1))

  const editor = useRef(null);
  const [content, setContent] = useState(problem_description1);
  // alert(content)
  const [lesson_title, setLesson_title] = useState(lesson_title1);
  const [problem_points, setProblem_points] = useState(lesson_points1);
  const [hidden_testcases, setHidden_testcases] = useState(hidden_test_cases1);
  // alert(JSON.stringify(hidden_testcases))
  const [sample_testcases, setSample_testcases] = useState(sample_test_cases1);

  function PostLesson() {
    let data = JSON.stringify({
      moduleid: moduleid,
      lessonid: LessonId,
      lesson_title: lesson_title,
      lesson_points: problem_points,
      problem_title: lesson_title,
      problem_description: content,
      sample_test_cases: sample_testcases,
      hidden_test_cases: hidden_testcases,
    });
    alert(data);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${env.SERVER_URI}/lesson/update/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert(JSON.stringify(response.data));
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div className="w-screen m-8">
      <div className="w-1/2 ">
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) => setLesson_title(e.target.value)}
              type="tel"
              name="floating_phone"
              id="floating_phone"
              class="block py-2.5 px-0 w-full text-sm text-black-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              defaultValue={lesson_title}
            />
            <label
              for="floating_phone"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Problem Title
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) => setProblem_points(e.target.value)}
              type="text"
              name="floating_company"
              id="floating_company"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              defaultValue={problem_points}
            />
            <label
              for="floating_company"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Problem Points
            </label>
          </div>
        </div>
        {/* <div class="relative z-0 w-full mb-5 group">
          
        </div> */}
        {/* editor componetn */}
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => {
            setContent(newContent);
            // console.log(content);
          }}
          className="mb-5"
        />
        <JsonEditorComponent
          type="SampleTestCases"
          data={sample_testcases}
          filename="SampleTestCases"
        />
        <label class="block mb-2 text-lm font-medium text-black-900">
          Hidden Test Cases
        </label>
        <JsonUploadComponent edit="true" setdamapledata={setSample_testcases} />

        <JsonEditorComponent
          type="HiddenTestcases"
          data={hidden_testcases}
          filename="HiddenTestcases"
        />
        <label class="block mb-2 text-lm font-medium text-black-900">
          Hidden Test Cases
        </label>
        <JsonUploadComponent edit="true" setdamapledata={setHidden_testcases} />

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            e.preventDefault();
            PostLesson();
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
          Submit
        </button>
      </div>
    </div>
  );
}
export const EditProblemLoader = async ({ params }) => {
  const { LessonId } = params;
  const res = await fetch(`${env.SERVER_URI}/lesson/preview/` + LessonId);
  const data = await res.json();
  // alert(data)
  return data;
};
export default EditProblem;
