import Button from "components/Button/Button"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addQuestion } from "store/features/questionsSlice"
import { v4 as uuidv4 } from "uuid"

const ModifyQuestion: React.FC = () => {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [delay, setDelay] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useDispatch()

  const submit = () => {
    dispatch(
      addQuestion({
        answer,
        question,
        id: uuidv4(),
      })
    )
    setLoading(false)
    resetForm()
  }

  const handleSubmitForm = (
    _e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!question || !answer) {
      return
    }

    setLoading(true)
    if (delay) {
      setTimeout(() => {
        submit()
      }, 5000)
    } else {
      // setLoading(true)
      submit()
    }
  }

  const resetForm = () => {
    setQuestion("")
    setAnswer("")
    setDelay(false)
  }
  return (
    <form
      className="flex flex-col justify-start items-start px-3 w-full"
      onSubmit={(e) => handleSubmitForm(e)}
    >
      <h3 className="text-xl font-bold">Create a new question</h3>

      <div className="flex flex-col mt-5 w-full">
        <label htmlFor="question">Question</label>
        <input
          type="text"
          name="question"
          autoFocus
          required
          placeholder="write a new quesiton"
          className="py-3 px-3 mt-3 w-3/4 rounded-xl border outline-none"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        />
      </div>

      <div className="flex flex-col mt-5 w-full">
        <label htmlFor="answer">Answer</label>
        <input
          type="text"
          required
          name="answer"
          placeholder="write the answer"
          className="py-3 px-3 mt-3 w-3/4 rounded-xl border outline-none"
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
        />
      </div>

      <div className="flex gap-3 justify-start items-center mt-5 w-full">
        <label htmlFor="delay">Delay</label>
        <input
          type="checkbox"
          name="delay"
          onChange={(e) => setDelay(e.target.checked)}
          checked={delay}
        />
      </div>

      <Button
        className="my-5 bg-green-400 rounded-lg"
        text={loading ? "Loading..." : "Add question"}
        onClick={(e) => handleSubmitForm(e)}
        disabled={loading}
      />
    </form>
  )
}

export default ModifyQuestion
