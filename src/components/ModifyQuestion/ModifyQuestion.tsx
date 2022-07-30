import Button from "components/Button/Button"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {
  addQuestion,
  removeSelectedQuestion,
  editQuestion,
} from "store/features/questionsSlice"
import type { ModifyQuestionProps, QuestionType } from "types/types"
import { v4 as uuidv4 } from "uuid"

const initialState = {
  id: "",
  question: "",
  answer: "",
}

const ModifyQuestion: React.FC<ModifyQuestionProps> = ({
  selectedQuestion,
}) => {
  const [qaData, setQaData] = useState<QuestionType>(initialState)

  const [delay, setDelay] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (selectedQuestion) {
      setQaData(selectedQuestion)
    }
  }, [selectedQuestion])

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    dispatch(editQuestion(qaData))

    resetForm()
  }

  const submit = () => {
    dispatch(
      addQuestion({
        answer: qaData.answer,
        question: qaData.question,
        id: uuidv4(),
      })
    )
    setLoading(false)
    resetForm()
  }

  const handleSubmitForm = () => {
    if (!qaData.question || !qaData.answer) {
      return
    }

    setLoading(true)
    if (delay) {
      setTimeout(() => {
        submit()
      }, 5000)
    } else {
      submit()
    }
  }

  const resetForm = () => {
    setQaData(initialState)
    setDelay(false)
  }
  return (
    <form className="mainform" onSubmit={(_e) => handleSubmitForm()}>
      <h3 className="mainform--title">Create a new question</h3>

      <div className="mainform--qa">
        <label htmlFor="question">Question</label>
        <input
          type="text"
          name="question"
          autoFocus
          required
          placeholder="write a new quesiton"
          onChange={(e) => {
            setQaData({ ...qaData, question: e.target.value })
          }}
          value={qaData.question}
        />
      </div>

      <div className="mainform--qa">
        <label htmlFor="answer">Answer</label>
        <input
          type="text"
          required
          name="answer"
          placeholder="write the answer"
          onChange={(e) => {
            setQaData({ ...qaData, answer: e.target.value })
          }}
          value={qaData.answer}
        />
      </div>

      <div className="mainform--check">
        <label htmlFor="delay">Delay</label>
        <input
          type="checkbox"
          name="delay"
          onChange={(e) => setDelay(e.target.checked)}
          checked={delay}
        />
      </div>

      <div className="mainform--buttons">
        <Button
          className="mainform--buttons__add"
          text={loading ? "Loading..." : "Add question"}
          onClick={(_e) => handleSubmitForm()}
          disabled={loading || selectedQuestion ? true : false}
        />

        <Button
          className="mainform--buttons__edit"
          text="Edit question"
          onClick={(e) => handleEdit(e)}
          disabled={!selectedQuestion}
        />
      </div>
    </form>
  )
}

export default ModifyQuestion
