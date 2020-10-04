import { MdCollectionsBookmark, MdAccountCircle, MdHome, MdList, MdMessage } from 'react-icons/md'

export default {
  links: [
    { location: '/', title: 'Главная', icon: MdHome },
    { location: '/courses', title: 'Список курсов', icon: MdCollectionsBookmark },
    { location: '/homeworks', title: 'Домашние задания', icon: MdList },
    { location: '/messages', title: 'Мои сообщения', icon: MdMessage },
    { location: '/profile', title: 'Мой профиль', icon: MdAccountCircle }
  ]
}