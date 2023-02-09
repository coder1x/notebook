// function setDataToCookies(data: string, key: string) {
//   const options = {
//     path: '/',
//     maxAge: 60 * 6 * 24,
//   };

//   if (data) {
//     setCookie(key, data, options);
//   } else {
//     deleteCookie(key);
//   }
// }

// const initialState = {
//   token: '',
//   projectId: '',
// };

// const reducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     case 'SET_MANAGER_TOKEN':
//       setDataToCookies(action.token, 'TodoToken');
//       return {
//         ...state,
//         token: action.token,
//       };

//     default:
//       return state;
//   }
// };

// export default reducer;
