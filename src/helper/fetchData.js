export default async function fetchdata() {
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