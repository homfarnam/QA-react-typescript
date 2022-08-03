interface QuestionsProps {
  data: QuestionType
  onEdit: (data: QuestionType) => void
  selectedQuestion: QuestionType
}

interface QuestionsListProps {
  data: QuestionType[]
  selected: QuestionType
}

interface QuestionType {
  id: string
  question: string
  answer: string
}

interface State {
  questions: QuestionType[]
  selectedQuestion?: QuestionType
}

interface ModifyQuestionProps {
  selectedQuestion: QuestionType
}

export {
  QuestionsProps,
  QuestionsListProps,
  QuestionType,
  State,
  ModifyQuestionProps,
}
