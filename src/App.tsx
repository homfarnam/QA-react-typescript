import React from "react"
import { ModifyQuestion, QuestionsList } from "components"
import { useSelector } from "react-redux"
import { RootState } from "store/store"

const App: React.FC = () => {
  const allData = useSelector((state: RootState) => state)

  return (
    <div className="py-10 w-full h-full md:h-screen text-white bg-black">
      <div className="container flex justify-center mx-auto w-full">
        <h1 className="text-2xl">The awesome Q/A tool</h1>
      </div>
      <div className="flex items-center mx-auto w-11/12 md:w-1/2 h-auto text-black bg-white">
        <div className="flex flex-col justify-center items-center py-5 px-3 md:px-2 mx-auto w-full md:w-3/4 h-full">
          <QuestionsList data={allData.questions} />
          <hr className="my-5 w-full h-[3px] bg-black" />
          <ModifyQuestion selectedQuestion={allData.selectedQuestion} />
        </div>
      </div>
    </div>
  )
}

export default App
