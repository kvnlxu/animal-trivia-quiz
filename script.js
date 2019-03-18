const QUESTIONS = [
  {
    question: "Which bird has eyes larger than its brain?",
    choices: ['Chicken', 'Peacock', 'Ostrich', 'Owl'],
    correct: 2
  },
  {
    question: "What is the only animal born with horns?",
    choices: ['Bison', 'Eland', 'Rhino', 'Giraffe'],
    correct: 3
  },
  {
    question: "What is the largest rodent found in North America?",
    choices: ['Beaver', 'Kangaroo Rat', 'Muskrat', 'Prairie Dog'],
    correct: 0
  },
  {
    question: "Which bird is known to fly backwards?",
    choices: ['Raptor', 'Hummingbird', 'Parrot', 'Bald Eagle'],
    correct: 1
  },
  {
    question: "What is the fastest land snake?",
    choices: ['Indian Python', 'Green Anaconda', 'King Cobra', 'Black Mamba'],
    correct: 3
  },
  {
    question: "Which of the traditional senses do dolphins not possess?",
    choices: ['Smell', 'Hearing', 'Taste', 'Sight'],
    correct: 0
  },
  {
    question: "How many hearts are found in an octopus?",
    choices: ['1', '3', '8', '9'],
    correct: 1
  },
  {
    question: "Which animal is known for being the sleepiest animal, sleeping for up to 22 hours a day?",
    choices: ['Western Gorilla', 'Sloth', 'Koala', 'Giant Panda'],
    correct: 2
  },
  {
    question: "Which of the following mammal is known to lay eggs?",
    choices: ['Manatee', 'Whale', 'Bat', 'Platypus'],
    correct: 3
  },
  {
    question: "What is the largest species of lizards?",
    choices: ['Giant Tegu', 'Gila Monster', 'Komodo Dragon', 'Iguana'],
    correct: 2
  },
];

function generateQuestionsData(){
  const questions = [
    {
      question: "Any truers in the chat?",
      choices: ['True', 'Truer', 'Very true', 'Truest'],
      correct: 3
    },
    {
      question: "Some question",
      choices: ['1', '2', '3', '4'],
      correct: 2
    }
  ];
  return questions;
}

function renderQuestion(currentQuestionIndex){
  let $quizQuestion = $('.questionText');
  $quizQuestion.text(QUESTIONS[currentQuestionIndex].question);
}

function renderAnswerChoices(choices){
  let $quizAnswers = $('.quizAnswer');
  let choiceNum = 0;
  $quizAnswers.each(function(){
    $(this).text(choices[choiceNum]);
    choiceNum++;
  });
}

function renderQuestionForm(currentQuestionIndex){
  $('.quizForm').removeClass('hidden');
  let choices = QUESTIONS[currentQuestionIndex].choices;
  renderQuestion(currentQuestionIndex);
  renderAnswerChoices(choices);
  renderQuestionNumber(currentQuestionIndex);
  $('.firstOption').focus();
}

function renderScore(score){
  $('.scoreCounter').text(`Score: ${score}`);
}

function renderQuestionNumber(currentQuestionIndex){
  let questionNumber = currentQuestionIndex + 1;
  let totalQuestions = QUESTIONS.length;
  $('.questionNumber').text(
    `Question: ${questionNumber} / ${totalQuestions}`
  );
}

function checkAnswer(answerVal, currentQuestionIndex){
  return QUESTIONS[currentQuestionIndex].correct == answerVal;
}

function renderAnswerPage(isCorrect, currentQuestionIndex){
  if(isCorrect){
    $('.answerFormText').text('Correct!');
  } else{
    let correctIndex = QUESTIONS[currentQuestionIndex].correct;
    let correctAnswerText = QUESTIONS[currentQuestionIndex].choices[correctIndex];
    $('.answerFormText').text(
      `Incorrect. The correct answer is '${correctAnswerText}'.`
    );
  }
  $('.answerForm').removeClass('hidden');
  $('#nextQuestionButton').focus();
}

function renderEndPage(){
  $('.endResults').removeClass('hidden');
  $('#restartQuizButton').focus();
}

function initializeApp(){
  let currentQuestionIndex = 0;
  let score = 0;

  $('#startButton').click(function(event) {
    $('.initialPage').addClass('hidden');
    renderScore(score);
    renderQuestionForm(currentQuestionIndex);
  });

  $('.quizForm').submit(function(event) {
    event.preventDefault();
    let $userAnswer = $('input[name="quizOption"]:checked').val();
    let isCorrect = checkAnswer($userAnswer, currentQuestionIndex);
    if(isCorrect){
      score++;
      renderScore(score);
    }
    $('.quizForm').addClass('hidden');
    renderAnswerPage(isCorrect, currentQuestionIndex);
    $('input[name="quizOption"]').prop('checked', false);
  });

  $('.answerForm').submit(function(event) {
    event.preventDefault();
    currentQuestionIndex++;
    $('.answerForm').addClass('hidden');
    if(currentQuestionIndex < QUESTIONS.length){
      renderQuestionForm(currentQuestionIndex);
    } else{
      renderEndPage();
    }
  });

  $('#restartQuizButton').click(function(event) {
    event.preventDefault();
    $('.endResults').addClass('hidden');
    score = 0;
    currentQuestionIndex = 0;
    renderScore(score);
    renderQuestionForm(currentQuestionIndex);
  });
}

//const QUESTIONS = generateQuestionsData();
$(initializeApp);