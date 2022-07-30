import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { QuestionType, State } from "types/types"

const initialState: State = {
  questions: [],
}

export const qaSlice = createSlice({
  name: "QA",
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<QuestionType>) => {
      const { questions } = state as State

      return {
        ...state,
        questions: [...questions, action.payload],
      }
    },
    selectQuestion: (state, action: PayloadAction<QuestionType>) => {
      const { questions } = state as State
      return {
        ...state,
        selectedQuestion: questions.find(
          (question) => question.id === action.payload.id
        ),
      }
    },
    removeSelectedQuestion: (state) => {
      return {
        ...state,
        selectedQuestion: null,
      }
    },
    deleteQuestion: (state, action: PayloadAction<QuestionType>) => {
      const { questions } = state as State

      return {
        ...state,
        questions: questions.filter(
          (question) => question.id !== action.payload.id
        ),
      }
    },
    editQuestion: (state, action: PayloadAction<QuestionType>) => {
      const { questions } = state as State

      return {
        ...state,
        questions: questions.map((question) => {
          if (question.id === action.payload.id) {
            return action.payload
          }

          return question
        }),
      }
    },
    clearAllQuestions: () => {
      return initialState
    },
    sortQuestions: (state) => {
      const { questions } = state as State

      return {
        questions: questions
          .slice()
          .sort((a, b) => a.question.localeCompare(b.question)),
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  addQuestion,
  deleteQuestion,
  editQuestion,
  clearAllQuestions,
  sortQuestions,
  selectQuestion,
  removeSelectedQuestion,
} = qaSlice.actions

export default qaSlice.reducer
