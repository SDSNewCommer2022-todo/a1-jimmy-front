const url = 'http://localhost:8080'

module.exports = {
  BASE_URL : url,
  GET      : {
    TASK : '/task/get-all-task',
  },
  POST : {
    TASK : '/task/save'
  },
  PATCH : {
    TASK_STATUS : '/task/status',
  }
}
