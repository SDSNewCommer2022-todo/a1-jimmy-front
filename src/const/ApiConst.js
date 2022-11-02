const url = 'http://localhost:8080'

export default {
  GET  : {

  },
  POST : {
    TASK_STATUS : url + '/task/status',
    GET_TASK    : url + '/task/get-all-task',
    TASK_SAVE   : url + '/task/save'
  }
}
