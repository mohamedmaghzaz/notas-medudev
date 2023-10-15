import axios from 'axios';

const createNote = ({title, body, useId}) => {
  return  axios.post('https://jsonplaceholder.typicode.com/posts', {title, body, useId})
  .then(response=>{
    const {data}= response;
    return data;
  });
}

export default createNote