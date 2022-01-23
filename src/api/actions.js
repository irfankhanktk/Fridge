import urls from "./urls";
const getFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
};
const postData = async (url,data) => {
    console.log('url: ',url);

    const response = await client.post(url, data);
    return response;
  };

const postFormData = async (url,data) => {
    console.log('url: ',url);
    data =getFormData(data);
    const response = await client.post(url, data);
    return response;
  };
  const getData = async (url) => {
    console.log('url: ',url);
    const response = await client.get(url);
    return response;
  };
const FRIDGE_ACTIONS = {
    postData,
    getData,
    postFormData,
};

export default FRIDGE_ACTIONS;