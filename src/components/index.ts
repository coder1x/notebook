import { lazy } from 'react';

import Footer from './footer/Footer';
import Header from './header/Header';

import ChangeCustom from './changeCustom/ChangeCustom';
import TextField from './textField/TextField';
import Button from './button/Button';
import Captcha from './captcha/Captcha';
import MessageForm from './messageForm/MessageForm';
import Editor from './editor/Editor';
import Menu from './menu/Menu';
import TodoItem from './todoItem/TodoItem';
import Loading from './loading/Loading';
import Placeholder from './placeholder/Placeholder';
import ProjectsList from './projectsList/ProjectsList';

const SignUp = lazy(() => import('./signUp/SignUp'));
const SignIn = lazy(() => import('./signIn/SignIn'));

export {
  Footer,
  Header,
  SignUp,
  SignIn,
  ChangeCustom,
  TextField,
  Button,
  Captcha,
  MessageForm,
  Editor,
  Menu,
  TodoItem,
  Loading,
  ProjectsList,
  Placeholder,
};
