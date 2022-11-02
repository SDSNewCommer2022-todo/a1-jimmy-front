import axios from 'axios';
import API from '@/const/ApiConst';


 function updateTaskStatus(id, status){
  axios.patch(API.POST.TASK_STATUS,{
    id,
    status
  }).then(()=>{

  }).finally(

  )
}

function findTasksByName(name){
  return axios.post(API.POST.GET_TASK,{
    name : name
  }).then( response => response.data);
}

export {
  updateTaskStatus,
  findTasksByName
}
