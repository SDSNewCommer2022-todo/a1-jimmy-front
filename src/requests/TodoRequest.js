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

async function updateAllTaskStatusRequestByOwner(owner, status){
  let url = API.PATCH.TASK_STATUS_ALL;
  let data = {
    owner,
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

export{
  addTaskRequest,
  updateTaskStatusRequest,
  updateAllTaskStatusRequestByOwner,
  updateTaskContentRequest,
  getAllTasksByNameRequest
}
