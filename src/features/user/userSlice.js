import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  activeQuestion: 0,
  allQuestionData: [],
  numberOfCorrectAnswer: 0,
  numberOfIncorrectAnswer: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateActiveQuestion: (state, action) => {
      state.activeQuestion = action.payload;
    },
    getAllQuestionData: (state, action) => {
      state.allQuestionData = action.payload;
    },
    updateCorrectAnswer: (state, action) => {
      state.numberOfCorrectAnswer = action.payload;
    },
    updateIncorrectAnswer: (state, action) => {
      state.numberOfIncorrectAnswer = action.payload;
    },
    endTest: (state) => {
      state.email = "";
      state.activeQuestion = 0;
      state.allQuestionData = [];
      state.numberOfCorrectAnswer = 0;
      state.numberOfIncorrectAnswer = 0;
    },
  },
});

export const {
  updateEmail,
  updateActiveQuestion,
  getAllQuestionData,
  updateCorrectAnswer,
  updateIncorrectAnswer,
  endTest
} = userSlice.actions;

export default userSlice.reducer;
