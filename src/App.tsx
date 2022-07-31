import React from "react"
import { ModifyQuestion, QuestionsList } from "components"
import { useSelector } from "react-redux"
import { RootState } from "store/store"

const App: React.FC = () => {
  const allData = useSelector((state: RootState) => state)

  return (
    <main className="home">
      <div className="home__container">
        <div className="home__container--title">
          <h1>The awesome Q/A tool</h1>
        </div>
        <div className="home__container--box">
          <div className="home__container--box__details">
            <QuestionsList data={allData.questions} />
            <hr />
            <ModifyQuestion selectedQuestion={allData.selectedQuestion} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
