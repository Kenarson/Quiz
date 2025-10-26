let question_field = document.querySelector('.question')
let answer_buttons = document.querySelectorAll('.answer')
let container_h3 = document.querySelector('.container_h3')
let container_start_h3 = document.querySelector('.container_h3')
let container_main = document.querySelector('.main')
let container_start = document.querySelector('.start')
let start_button = document.querySelector('.start-btn')

function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min)
} 

let signs = ['+', '-', '*']
function getRandomSign() {
    return signs[randint(0, 2)]
}

let cookie = false
let cookies = document.cookie.split('; ')
for (let i = 0; i < cookies.length; i += 1) {
    if (cookies[i].split('=')[0] == 'numbers_high_score'){
        cookie = cookies[i].split('=')[1]
        break
    }
}

if (cookie) {
    let data = cookie.split('/');
    container_start_h3.innerHTML = `<h3>Last time you gave ${data[1]} correct answers out of ${data[0]}. Accuracy is ${Math.round(data[1] * 100 / data[0])}%.</h3>`;
}   
start_button.addEventListener('click', function() {
    container_start.style.display = 'none';
    container_main.style.display = 'flex';
    current_question = new Question();
    current_question.display();

    correct_answers_given = 0;
    total_answers_given = 0;

    setTimeout(function() {
        let new_cookie = `numbers_high_score=${total_answers_given}/${correct_answers_given}; max-age=31536000;`;
        document.cookie = new_cookie;

        container_main.style.display = 'none';
        container_start.style.display = 'flex';
        container_start_h3.innerHTML = `<h3>You have given ${correct_answers_given} correct answers out of ${total_answers_given}. Accuracy is ${Math.round(correct_answers_given * 100 / total_answers_given)}%.</h3>`;
    }, 10000);
});

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}


class Question {
    constructor() {
        let a = randint(1, 30)
        let b = randint(1, 30)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`
        if (sign == '+') { this.correct = a + b }
        else if (sign == '-') { this.correct = a - b }
        else if (sign == '*') { this.correct = a * b }
        // else if (sign == '/') { this.correct = a / b }
        this.answers = [
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct - 15, this.correct - 1),
            this.correct,
            randint(this.correct + 1, this.correct + 15),
            randint(this.correct + 1, this.correct + 15),
        ]
        shuffle(this.answers)
    }


    display () {
        question_field.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i += 1) {
            answer_buttons[i].innerHTML = this.answers[i]
        }
    }
}

let correct_answers_given = 0
let total_answers_given = 0
let current_question
current_question = new Question()
current_question.display()




for (let i = 0; i < answer_buttons.length; i += 1) {
    answer_buttons[i].addEventListener('click', function() {
        if (answer_buttons[i].innerHTML == current_question.correct) {
            correct_answers_given += 1
            answer_buttons[i].style.background = '#00FF00'
            anime({
                targets: answer_buttons[i],
                background: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        } else {
            answer_buttons[i].style.background = '#FF0000'
            anime({
                targets: answer_buttons[i],
                background: '#FFFFFF',
                duration: 500,
                delay: 100,
                easing: 'linear'
            })
        }
        total_answers_given += 1


        current_question = new Question()
        current_question.display()
    })
}
