import Button from "components/Button/Button"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import {
  clearAllQuestions,
  deleteQuestion,
  sortQuestions,
  selectQuestion,
} from "store/features/questionsSlice"
import { BiTrash, BiEdit } from "react-icons/bi"
import type {
  QuestionsListProps,
  QuestionsProps,
  QuestionType,
} from "types/types"

const Question = ({ data, onEdit }: QuestionsProps) => {
  const [visible, setVisible] = useState<boolean>(false)
  const dispatch = useDispatch()

  const makeVisible = () => {
    setVisible((prev) => !prev)
  }

  return (
    <div className="questionslist__questionBox">
      <div className="questionslist__questionBox__main">
        <div className="questionslist__questionBox__main--question">
          <p onClick={makeVisible} className="cursor-pointer">
            {data.question}
          </p>
          {visible && <p>{data.answer}</p>}
        </div>

        <div className="questionslist__questionBox__main--icons">
          <BiEdit
            size={20}
            onClick={() => onEdit(data)}
            className="cursor-pointer"
          />

          <BiTrash
            size={20}
            className="questionslist__questionBox__main--icons--trash"
            onClick={() => dispatch(deleteQuestion(data))}
          />
        </div>
      </div>
    </div>
  )
}

const QuestionsList: React.FC<QuestionsListProps> = ({ data }) => {
  const dispatch = useDispatch()

  const handleEdit = (data: QuestionType) => {
    dispatch(selectQuestion(data))
  }

  return (
    <div className="questionslist">
      <h3 className="questionslist--title">Created question</h3>
      {data.length > 0 ? (
        data?.map((question) => {
          return (
            <React.Fragment key={question.id}>
              <Question data={question} onEdit={handleEdit} />
            </React.Fragment>
          )
        })
      ) : (
        <div className="questionslist--empty">
          <p className="text-red-800">No questions yet {":("}</p>
        </div>
      )}

      <div className="questionslist__buttons">
        <Button
          className="bg-blue-400 w-full"
          text="Sort question"
          onClick={() => {
            dispatch(sortQuestions())
          }}
        />

        <Button
          className="bg-red-400 w-full"
          text=" Remove questions"
          onClick={() => dispatch(clearAllQuestions())}
        />
      </div>
    </div>
  )
}

export default QuestionsList
