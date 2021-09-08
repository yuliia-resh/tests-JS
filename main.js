const numberOfQuestion = document.getElementById("number-of-question"),
    numberOfAllQuesions = document.getElementById("number-of-all-questions");

const question = document.getElementById("question");

//answer options
const option1 = document.querySelector(".option1"),
    option2 = document.querySelector(".option2"),
    option3 = document.querySelector(".option3"),
    option4 = document.querySelector(".option4");

//answer options (HTML collection)
const optionElements = document.querySelectorAll(".option");

const btnNext = document.getElementById("btn-next");

const answersTracker = document.getElementById("answers-tracker");

const correctAnswer = document.getElementById("correct-answer"),
    numberOfAllQuesions2 = document.getElementById("number-of-all-questions-2"),
    btnTryAgain = document.getElementById("btn-try-again"); // in a modal window

let indexOfQuestion,
    indexOfPage = 0;

let score = 0;

const questions = [
    {
        question: "Что НЕЛЬЗЯ делать с котиками?",
        options: [
            "Гладить",
            "Обнимать",
            "Кормить",
            "Бить"
        ],
        rightAnswer: 3 //start counting from zero
    },
    {
        question: "Чем НЕЛЬЗЯ кормить котиков?",
        options: [
            "Мяско",
            "Корм",
            "Шоколад",
            "Борщ"
        ],
        rightAnswer: 2 //start counting from zero
    },
    {
        question: "Как зовут моего котика? (Ну тут отвечать только по интуиции)",
        options: [
            "Мурчик",
            "Валера",
            "Яша",
            "Швепс"
        ],
        rightAnswer: 2 //start counting from zero
    }
];

let completedAnswers = []; //an array for the questions asked

numberOfAllQuesions.innerHTML = questions.length;

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;

    //mapping answers
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
}

window.addEventListener("load", () => {
    randomQuestion();
    answerTracker();
})

const randomQuestion = () => { //change random question from the array
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; //check if this question has been asked

    //console.log(indexOfPage);
    //console.log(indexOfQuestion);

    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }

        if (completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }

    completedAnswers.push(indexOfQuestion);
};

const quizOver = () => {
    document.querySelector(".quiz-over-modal").classList.add("active");
    correctAnswer.innerHTML = score;
    numberOfAllQuesions2.innerHTML = questions.length;
    
}

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener("click", tryAgain);

const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add("correct");
        updateAnswerTracker("correct");
        score++;
    } else {
        el.target.classList.add("wrong");
        updateAnswerTracker("wrong");
    }
    disabledOptions();
}

for (option of optionElements) {
    option.addEventListener("click", e => checkAnswer(e))
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add("disabled");
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add("correct");
        }
    })
}

const validation = () => {
    if (!optionElements[0].classList.contains("disabled")) {
        alert("Вам нужно выбрать один из вариантов ответа!");
    } else {
        randomQuestion();
        enableOptions();
    }
}

btnNext.addEventListener("click", () => {
    validation();
});

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement("div");
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

//remove classes from all buttons
const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove("disabled", "correct", "wrong");
    })
}


