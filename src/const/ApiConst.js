const url = 'http://localhost:8080'

module.exports = {
  BASE_URL : url,
  GET      : {
    TASK : '/task/',
  },
  POST : {
    TASK : '/task/'
  },
  PATCH : {
    TASK_STATUS     : '/task/status',
    TASK_STATUS_ALL : '/task/status/all',
    TASK_CONTENT    : '/task/content',
  },
}
