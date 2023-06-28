const correctAnswers = ['B', 'A', 'C', 'A']
const finalScoreContainer = document.querySelector('.final-score-container')
const scoreContent = finalScoreContainer.querySelector('.score')
const form = document.querySelector('.quiz-form')

let score = null

const getUserAnswers = () => {
  const userAnswers = []

  correctAnswers.forEach((_, index) => {
    const userAnswer = form[`inputQuestion${index + 1}`].value
    userAnswers.push(userAnswer)
  })

  return userAnswers
}

const calculateUserScore = userAnswers => {
  score = 0
  userAnswers.forEach((userAnswer, index) => {
    const isUserAnswerCorrect = userAnswer === correctAnswers[index]

    if (isUserAnswerCorrect) {
      score += 25
    }
  })
}

const showFinalScore = () => {
  scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })

  finalScoreContainer.classList.remove('d-none')
}

const animateFinalScore = () => {
  let counter = 0

  const timer = setInterval(() => {
    if (counter === score) {
      clearInterval(timer)
    }

    changeScoreStyle(counter)

    scoreContent.textContent = `${counter++}%`
  }, 20);
}

const changeScoreStyle = (counter) => {
  if (counter <= 33) {
    addBgDangerSubtleClass()
  } else if (counter <= 75) {
    removeBgDangerSubtleClass()
    addBgWarningSubtleClass()
  } else {
    removeBgDangerSubtleClass()
    removeBgWarningSubtleClass()
    addBgSuccessSubtleClass()
  }
}

const addBgDangerSubtleClass = () => {
  finalScoreContainer.classList.add('bg-danger-subtle')
  scoreContent.classList.add('text-danger')
}

const removeBgDangerSubtleClass = () => {
  finalScoreContainer.classList.remove('bg-danger-subtle')
  scoreContent.classList.remove('text-danger')
}

const addBgWarningSubtleClass = () => {
  finalScoreContainer.classList.add('bg-warning-subtle')
  scoreContent.classList.add('text-warning')
}

const removeBgWarningSubtleClass = () => {
  finalScoreContainer.classList.remove('bg-warning-subtle')
  scoreContent.classList.remove('text-warning')
}

const addBgSuccessSubtleClass = () => {
  finalScoreContainer.classList.add('bg-success-subtle')
  scoreContent.classList.add('text-success')
}

form.addEventListener('submit', event => {
  event.preventDefault()

  const userAnswers = getUserAnswers()

  calculateUserScore(userAnswers)
  showFinalScore()
  animateFinalScore()
})
