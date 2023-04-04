$(document).ready(function () {
  let answers = {}

  function displayQuestions(sections) {
    let html = ''
    sections.forEach((section) => {
      html += `<h2>${section.section_name}</h2>`
      section.questions.forEach((question) => {
        html += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${question.question_text}</h5>`
        question.answer_options.forEach((option) => {
          html += `
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="${question.id}" id="${option.id}" value="${option.id}">
                        <label class="form-check-label" for="${option.id}">${option.text}</label>
                    </div>`
        })
        html += `</div></div>`
      })
    })
    $('#quiz').html(html)
  }

  function getQuiz() {
    $.ajax({
      url: 'https://super-awesome-quiz.vercel.app/questions',
      method: 'GET',
      success: function (data) {
        displayQuestions(data.sections)
      },
    })
  }

  function submitQuiz() {
    let answerArray = []
    for (const questionId in answers) {
      answerArray.push({ id: questionId, answer: answers[questionId] })
    }

    $.ajax({
      url: 'https://super-awesome-quiz.vercel.app/score',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ answers: answerArray }),
      success: function (data) {
        alert(`Your score is: ${data.score}`)
      },
    })
  }

  getQuiz()

  $(document).on('change', 'input[type=radio]', function () {
    answers[$(this).attr('name')] = $(this).val()
  })

  $('#submit').click(function () {
    submitQuiz()
  })
})
