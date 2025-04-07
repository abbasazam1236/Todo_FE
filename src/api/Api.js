export const Api = {
  USER: {
    SIGN_UP: "http://localhost:3000/user/signUp", // Use backend URL
    FIND_ALL: "http://localhost:3000/user",
    DELETE_USER:"http://localhost:3000/user/:id"
  },
  TODO: {
    FIND_NOT_COMPLETED: "http://localhost:3000/todo/not-completed/:userId",
    SAVE_TODO: "http://localhost:3000/todo/:userId",
    DELETE_TODO: "http://localhost:3000/todo/:id",
    MARK_TODO_COMPLETED: "http://localhost:3000/todo/:id",
    FIND_COMPLETED: "http://localhost:3000/todo/completed/:userId",
  },
  LOGIN: "http://localhost:3000/auth/login",
};
