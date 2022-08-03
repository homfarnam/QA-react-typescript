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

const Question = ({ data, onEdit, selectedQuestion }: QuestionsProps) => {
  const [visible, setVisible] = useState<boolean>(false)
  const dispatch = useDispatch()

  const makeVisible = () => {
    setVisible((prev) => !prev)
  }

  return (
    <div className="questionslist__questionBox">
      <div
        className={`questionslist__questionBox__main ${
          selectedQuestion?.id === data.id && "edited"
        }`}
      >
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

const QuestionsList: React.FC<QuestionsListProps> = ({ data, selected }) => {
  const dispatch = useDispatch()
  const [isShown, setIsShown] = useState<boolean>(false)

  const handleEdit = (data: QuestionType) => {
    dispatch(selectQuestion(data))
  }

  return (
    <div className="questionslist">
      <div className="questionslist--title">
        <h3
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          Created question
        </h3>

        {isShown && (
          <div className="tooltip">
            <p>Here you can find the created questions and their answers</p>
          </div>
        )}
      </div>
      {data.length > 0 ? (
        data?.map((question) => {
          return (
            <React.Fragment key={question.id}>
              <Question
                data={question}
                onEdit={handleEdit}
                selectedQuestion={selected}
              />
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
          className="w-full bg-blue-400"
          text="Sort question"
          onClick={() => dispatch(sortQuestions())}
        />

        <Button
          className="w-full bg-red-400"
          text="Remove questions"
          onClick={() => dispatch(clearAllQuestions())}
        />
      </div>
    </div>
  )
}

export default QuestionsList
