import axios from 'axios';
import API from '@/const/ApiConst';

axios.defaults.baseURL = API.BASE_URL;

async function getAllTasksByNameRequest(name){
  let url = API.GET.TASK + name;
  return axios.get(url);
}


async function addTaskRequest(owner, content){
  let url = API.POST.TASK;
  let data = {
    owner,
    content
  }
  return axios.post(url, data);
}

async function updateTaskStatusRequest(id, status){
  let url = API.PATCH.TASK_STATUS;
  let data = {
    id,
    status
  }
  return axios.patch(url, data);
}

async function updateTaskContentRequest(id, content){
  let url = API.PATCH.TASK_CONTENT;
  let data = {
    id,
    content
  }
  return axios.patch(url, data);
}

async function deleteTaskByIdRequest(id){
  var url = API.DELETE.TASK + id;
  return axios.delete(url);
}

async function deleteAllTaskByOwnerRequest(owner){
  var url = API.DELETE.TASK_ALL + owner;
  return axios.delete(url);
}

export{
  addTaskRequest,
  updateTaskStatusRequest,
  updateTaskContentRequest,
  deleteTaskByIdRequest,
  deleteAllTaskByOwnerRequest,
  getAllTasksByNameRequest
}
