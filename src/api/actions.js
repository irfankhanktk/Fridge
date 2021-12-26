import urls from "./urls";

const postData = async (url,data) => {
    console.log('url: ',url);

    const response = await client.post(url, data);
    return response;
  };
  const getData = async (url) => {
    console.log('url: ',url);
    const response = await client.get(url);
    return response;
  };
const ADMIN_ACTIONS = {
    postData,
    getData,
};

export default ADMIN_ACTIONS;