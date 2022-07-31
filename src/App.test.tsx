import React from "react"
import App from "./App"
import { act, cleanup, render, waitFor, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { store as ReduxStore } from "store/store"
import type { State } from "./types/types"

import {
  addQuestion,
  clearAllQuestions,
  deleteQuestion,
  editQuestion,
  sortQuestions,
} from "store/features/questionsSlice"

const initialState: State = {
  questions: [],
}

const first = {
  question: "What is the meaning of life?",
  answer: "42",
  id: "1",
}

const second = {
  question: "How are you?",
  answer: "Farnam Homayounfard",
  id: "2",
}

const third = {
  question: "Best Javascript Frontend Framework?",
  answer: "React",
  id: "3",
}

describe("CRUD test", () => {
  it("Component renders", async () => {
    const { container } = render(
      <Provider store={ReduxStore}>
        <App />
      </Provider>
    )

    expect(container.innerHTML).not.toBeNull()
  })

  it("Add new question and answer", async () => {
    render(
      <Provider store={ReduxStore}>
        <App />
      </Provider>
    )

    // Add new question using redux dispatch and reducer

    await act(() => {
      ReduxStore.dispatch(clearAllQuestions())
    })

    await act(() => {
      ReduxStore.dispatch(addQuestion(first))
    })

    // expect new question to be added in redux store
    expect(ReduxStore.getState().questions).toEqual([first])
  })

  it("Delete question", async () => {
    render(
      <Provider store={ReduxStore}>
        <App />
      </Provider>
    )

    await act(() => {
      ReduxStore.dispatch(clearAllQuestions())

      ReduxStore.dispatch(addQuestion(first))
      ReduxStore.dispatch(addQuestion(second))
    })

    await act(() => {
      ReduxStore.dispatch(deleteQuestion(first))
    })

    // expect new question to be added in redux store
    expect(ReduxStore.getState().questions).toEqual([second])
  })

  it("Edit question", async () => {
    render(
      <Provider store={ReduxStore}>
        <App />
      </Provider>
    )

    await act(() => {
      ReduxStore.dispatch(clearAllQuestions())

      ReduxStore.dispatch(addQuestion(first))
      ReduxStore.dispatch(addQuestion(second))
      ReduxStore.dispatch(addQuestion(third))
    })

    // Change second question and answer using redux dispatch and reducer
    await act(() => {
      ReduxStore.dispatch(
        editQuestion({
          id: first.id,
          question: "What is the meaning of life?",
          answer: "25",
        })
      )
    })

    // expect data to be changed in redux store
    expect(ReduxStore.getState().questions).toEqual([
      {
        id: first.id,
        question: "What is the meaning of life?",
        answer: "25",
      },
      second,
      third,
    ])
  })

  it("Sort questions", async () => {
    const { container, rerender } = render(
      <Provider store={ReduxStore}>
        <App />
      </Provider>
    )

    await act(() => {
      ReduxStore.dispatch(clearAllQuestions())

      ReduxStore.dispatch(addQuestion(first))
      ReduxStore.dispatch(addQuestion(second))
      ReduxStore.dispatch(addQuestion(third))

      ReduxStore.dispatch(sortQuestions())
    })

    // expect data to be sorted in redux store
    expect(ReduxStore.getState().questions).toEqual([third, second, first])
  })

  afterEach(cleanup)
})
