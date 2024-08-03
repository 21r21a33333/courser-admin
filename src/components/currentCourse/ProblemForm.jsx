import React from "react";
import JoditEditor from "jodit-react";
import { useState, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import JsonUploadComponent from "./JsonUploadComponent";
import ENV from "../../env";
import { useNavigate } from "react-router-dom";
import { loadCurrentCourseData } from "../../redux/CurrentCourse";
// import { useParams } from "react-router-dom";

function ProblemForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courseid = useParams().courseid;
  let completeCourse = useSelector(
    (state) => state.CurrentCourse.currentCoursedata
  );
  // let courseid=completeCourse.courseid;
  let { moduleid } = useParams();
  // console.log("data from params");
  // console.log(moduleid);

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [lesson_title, setLesson_title] = useState("");
  const [problem_points, setProblem_points] = useState("");
  const [hidden_testcases, setHidden_testcases] = useState([]);
  const [sample_testcases, setSample_testcases] = useState([]);

  function PostLesson(sample_testcases_data,hidden_testcases_data) {
    console.log("sample testcase");
    let sampletest=(sample_testcases_data);
    console.log(sampletest);
    // console.log("hidden testcase");
    let hiddentest=(hidden_testcases_data);
    // console.log(hiddentest);
    console.log("lesson title", lesson_title);
    console.log("problem  title", problem_points);
    let data = JSON.stringify({
      module_id: `${moduleid}`,
      problem_title: `${lesson_title}`,
      problem_points:problem_points,
      problem_description: content,
      sample_test_cases: sampletest,
      hidden_test_cases: hiddentest,
    });
    // console.log("data is :");
    // alert(data);
    alert(data)

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${ENV.SERVER_URI}/add/problem`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      confirm("Problem Added Successfully");
    })
    .catch((error) => {
      console.log(error);
      confirm(error);

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
            />
            <label
              for="floating_company"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Problem Points
            </label>
          </div>
        </div>
        <div class="relative z-0 w-full mb-5 group">
        <label class="block mb-2 text-lm font-medium text-black-900 " >Sample Test Cases</label>
        <JsonUploadComponent setdamapledata={setSample_testcases}/>
        </div>
        <div class="relative z-0 w-full mb-5 group">
        <label class="block mb-2 text-lm font-medium text-black-900" >Hidden Test Cases</label>
        <JsonUploadComponent  setdamapledata={setHidden_testcases}/>
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
        
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e)=>{
            e.preventDefault();
            PostLesson(sample_testcases,hidden_testcases)
            async function fetchdata() {
              let config = {
                method: "get",
                maxBodyLength: Infinity,
                url: `${ENV.SERVER_URI}/fetch/course/${courseid}`,
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

export default ProblemForm;
