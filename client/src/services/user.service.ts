import Cookies from 'js-cookie'

const getUser = () => {
  return Cookies.getJSON('user')
}

export {
  getUser
}