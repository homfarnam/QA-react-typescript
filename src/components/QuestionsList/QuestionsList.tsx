import Button from "components/Button/Button"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import {
  clearAllQuestions,
  deleteQuestion,
  QuestionType,
  sortQuestions,
  selectQuestion,
} from "store/features/questionsSlice"
import { BiTrash, BiEdit } from "react-icons/bi"

interface QuestionsProps {
  data: QuestionType
  onEdit: (data: QuestionType) => void
}

interface QuestionsListProps {
  data: QuestionType[]
}

const Question = ({ data, onEdit }: QuestionsProps) => {
  const [visible, setVisible] = useState<boolean>(false)
  const dispatch = useDispatch()

  const makeVisible = () => {
    setVisible((prev) => !prev)
  }

  return (
    <div className="flex flex-row py-3 px-3 my-3 w-full rounded-xl border">
      <div className="w-1/2">
        <p onClick={makeVisible} className="cursor-pointer">
          {data.question}
        </p>
        {visible && <p>{data.answer}</p>}
      </div>

      <div className="flex gap-10 justify-end items-center w-1/2">
        <BiEdit size={20} onClick={() => onEdit(data)} />

        <BiTrash
          size={20}
          className="flex justify-center items-center cursor-pointer"
          onClick={() => dispatch(deleteQuestion(data))}
        />
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
    <div className="flex flex-col justify-start items-start px-3 w-full">
      <h3 className="text-xl font-bold">Created question</h3>
      {data?.map((question) => {
        return (
          <React.Fragment key={question.id}>
            <div className="flex relative justify-between w-full">
              <Question data={question} onEdit={handleEdit} />
            </div>
          </React.Fragment>
        )
      })}

      <div className="flex gap-10 justify-start items-center w-full">
        <Button
          className="bg-blue-400 rounded-lg"
          text="Sort question"
          onClick={() => {
            dispatch(sortQuestions())
          }}
        />

        <Button
          className="bg-red-400 rounded-lg"
          text=" Remove questions"
          onClick={() => dispatch(clearAllQuestions())}
        />
      </div>
    </div>
  )
}

export default QuestionsList
