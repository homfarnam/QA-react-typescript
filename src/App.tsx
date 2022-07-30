import React from "react"
import { ModifyQuestion, QuestionsList } from "components"
import { useSelector } from "react-redux"
import { RootState } from "store/store"

const App: React.FC = () => {
  const allData = useSelector((state: RootState) => state.questions)

  return (
    <div className="py-10 w-full h-screen text-white bg-black">
      <div className="container flex justify-center mx-auto w-full">
        <h1 className="text-2xl">The awesome Q/A tool</h1>
      </div>
      <div className="flex justify-between mx-auto w-1/2 h-auto text-black bg-white">
        <div className="flex flex-col justify-center items-center w-1/4 border-r-2">
          2
        </div>
        <div className="flex flex-col justify-start items-center py-5 w-3/4">
          <QuestionsList data={allData} />
          <hr className="my-5 w-full h-[3px] bg-black" />
          <ModifyQuestion />
        </div>
      </div>
    </div>
  )
}

export default App
