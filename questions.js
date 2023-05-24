const quizContainer = document.querySelector(".quiz_container");
const submitButton = document.querySelector(".quiz_submit-all-btn");

const getQuestions = async () => {
  let url = "https://lhri.az/api/questions";
  let res = await fetch(url);
  let data = await res.json();
  return data;
};

let currentQuizCardIndex = 0;
let currentQuizCardIndexVariant = 0;
const createQuestion = (index, value, questions) => {
  const quizCard = document.createElement("div");
  quizCard.classList.add("quiz_card");

  quizCard.innerHTML = `
  <div class="w-100 position-relative">
    <div role="button" onclick="prevCard()" class="prev-btn-card">
      Previous Card
    </div>
    <div class="h6 font-weight-bold d-flex">
    
      <div class="mr-3">Question </div>
      <h6
      role="button"
      onclick="prevPage()"
      class="text-danger  font-weight-bold cursor-pointer"
    >
      Previous Page
    </h6> 

    </div>
    <div class="mb-5 h4 font-weight-bold text-danger">${index + 1}/${
    questions.length
  }</div>
    <h6>
      ${value.question_name}
    </h6>
    <hr class="mt-5 hr bg-secondary" />
    <div class="d-flex flex-column align-items-start">
      <div class="mt-3 w-100">
        <label class="w-100 radioBtn-label">
          <input class="mr-4" type="radio" name="q${value.id}" value="true" />
          True
        </label>
      </div>
      <div class="w-100">
        <label class="w-100 radioBtn-label">
          <input class="mr-4" type="radio" name="q${value.id}" value="false" />
          False
        </label>
      </div>
    </div>
  </div>
  <button type="button" class="quiz_submit-btn">İrəli</button>
`;

  quizContainer.appendChild(quizCard);
};

const prevCard = () => {
  const quizCards = document.querySelectorAll(".quiz_card");

   
  let currentCard;
  for (let i = 0; i < quizCards.length; i++) {
    if (quizCards[i].style.display === "block") {
      currentCard = quizCards[i];
      break;
    }
  }

  if (currentCard) {
    currentCard.style.display = "none";

    
    let currentIndex = Array.from(quizCards).indexOf(currentCard);
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
      
      newIndex = 0;
    }

    currentQuizCardIndex = newIndex;
    quizCards[currentQuizCardIndex].style.display = "block";
  }
};


function prevCardVariant() {
  currentQuizCardIndexVariant--;

  if (currentQuizCardIndexVariant < 0) {
    currentQuizCardIndexVariant = 0;
  }

  showQuizCardVariant(currentQuizCardIndexVariant);
}

function showQuizCardVariant(index) {
  const quizCardsVariant = document.querySelectorAll(".quiz_variant_card");

  quizCardsVariant.forEach((card, i) => {
    if (i === index) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

 
showQuizCardVariant(currentQuizCardIndexVariant);

let answersVariant = {};
let answers = {};
let lastanswerval = {};

const updateLastAnswerVal = () => {
  lastanswerval = { ...answersVariant, ...answers };
};

const initializeQuizCards = () => {
  const quizCards = document.querySelectorAll(".quiz_card");
  for (let i = 1; i < quizCards.length; i++) {
    quizCards[i].style.display = "none";
  }

  quizCards.forEach((quizCard, index) => {
    const radioButtons = quizCard.querySelectorAll('input[type="radio"]');
    const submitButton = quizCard.querySelector(".quiz_submit-btn");

    function checkInputs() {
      let checked = false;
      radioButtons.forEach((radioButton) => {
        if (radioButton.checked) {
          checked = true;

          const questionAnswer = questions[index].question_answer.toLowerCase();
          const userAnswer = radioButton.value.toLowerCase();
          answers[`q${index + 1}`] = userAnswer;
          const questionAnswers = Object.values(answers);
          updateLastAnswerVal();  

          const label = radioButton.parentElement;

           
          label.style.backgroundColor = "";

        
          if (userAnswer === questionAnswer) {
            label.style.backgroundColor = "rgb(216, 255, 232)";
          } else {
            label.style.backgroundColor = "rgb(255, 237, 236)";
          }
        }
      });

      submitButton.disabled = !checked;
      if (submitButton.disabled) {
        submitButton.classList.add("disabled");
      } else {
        submitButton.classList.remove("disabled");
      }
    }

    radioButtons.forEach((radioButton) => {
      radioButton.addEventListener("change", checkInputs);
    });

    checkInputs();

    submitButton.addEventListener("click", () => {
      quizCard.style.display = "none";

      const nextIndex = index + 1;
      if (nextIndex < quizCards.length) {
        quizCards[nextIndex].style.display = "block";
      } else {
        nextPage();
      }
    });
  });
};

(async () => {
  const { questions, questionsForVariants } = await getQuestions();

  for (const [index, value] of questions.entries()) {
    createQuestion(index, value, questions);
  }

  const quizCards = document.querySelectorAll(".quiz_card");

  for (let i = 1; i < quizCards.length; i++) {
    quizCards[i].style.display = "none";
  }

  quizCards.forEach((quizCard, index) => {
    const radioButtons = quizCard.querySelectorAll('input[type="radio"]');
    const submitButton = quizCard.querySelector(".quiz_submit-btn");

    function checkInputs() {
      let checked = false;
      radioButtons.forEach((radioButton) => {
        if (radioButton.checked) {
          checked = true;

          const questionAnswer = questions[index].question_answer.toLowerCase();
          const userAnswer = radioButton.value.toLowerCase();
          answers[`q${index + 1}`] = userAnswer;
          const questionAnswers = Object.values(answers);
          updateLastAnswerVal();  

          const label = radioButton.parentElement;

           
          label.style.backgroundColor = "";

           
          if (userAnswer === questionAnswer) {
            label.style.backgroundColor = "rgb(216, 255, 232)";
          } else {
            label.style.backgroundColor = "rgb(255, 237, 236)";
          }
        }
      });

      submitButton.disabled = !checked;
      if (submitButton.disabled) {
        submitButton.classList.add("disabled");
      } else {
        submitButton.classList.remove("disabled");
      }
    }

    radioButtons.forEach((radioButton) => {
      radioButton.addEventListener("change", checkInputs);
    });

    checkInputs();

    let nextPageExecuted = false; 

    submitButton.addEventListener("click", () => {
      quizCards[currentQuizCardIndex].style.display = "none";
      console.log(
        "quizCards[currentQuizCardIndex]",
        quizCards[currentQuizCardIndex]
      );
      currentQuizCardIndex++;

      if (currentQuizCardIndex == quizCards.length) {
        submitButton.addEventListener("click", () => {
          nextPage();
        });
        if (!nextPageExecuted) {
          nextPage();
          nextPageExecuted = true;
        }

        quizCards[currentQuizCardIndex - 1].style.display = "block";
        submitButton.classList.remove("disabled");
        submitButton.disabled = false;
      }

      if (currentQuizCardIndex > quizCards.length) {
        submitButton.disabled = true;
        nextPage();
      } else {
        quizCards[currentQuizCardIndex].style.display = "block";
      }
    });
  });

  const quizContainerVariant = document.querySelector(
    ".quiz_variant_container"
  );
  const submitButtonVariant = document.querySelector(".quiz_submit-all-btn");

  const createQuestionVariant = (index, value) => {
    const quizCard = document.createElement("div");
    quizCard.classList.add("quiz_variant_card");

    let variantsHtml = "";

    variantsHtml += `
      <div class="mt-3 w-100">
        <label class="w-100 radioBtn-label">
          <input class="mr-4" type="radio" name="q${value.id}" value="a" />
          ${value.variant_a}
        </label>
        <label class="w-100 radioBtn-label">
          <input class="mr-4" type="radio" name="q${value.id}" value="b" />
          ${value.variant_b}
        </label>
        <label class="w-100 radioBtn-label">
          <input class="mr-4" type="radio" name="q${value.id}" value="c" />
          ${value.variant_c}
        </label>
        ${
          value.variant_d
            ? `<label class="w-100 radioBtn-label">
             <input class="mr-4" type="radio" name="q${value.id}" value="d" />
             ${value.variant_d}
           </label>`
            : ""
        }
       
      </div>
    `;

    quizCard.innerHTML = `
      <div class="w-100 position-relative">
      <div role="button" onclick="prevCardVariant()" class="prev-btn-card">
      Previous Card
     </div>
        <div class="h6 font-weight-bold d-flex">
        <div class="mr-3">Question </div>
      <h6
      role="button"
      onclick="prevPage()"
      class="text-danger  font-weight-bold cursor-pointer"
    >
      Previous Page
    </h6> 
        </div>
        <div class="mb-5 h4 font-weight-bold text-danger">${index + 1}/${
      questionsForVariants.length
    }</div>
        <h6>
          ${value.questions_name}
        </h6>
        <hr class="mt-5 hr bg-secondary" />
        <div class="d-flex flex-column align-items-start">
          ${variantsHtml}
        </div>
      </div>
      <button type="button" class="quiz_submit-btn">İrəli</button>
    `;

    quizContainerVariant.appendChild(quizCard);
  };

  

  for (const [index, value] of questionsForVariants.entries()) {
    createQuestionVariant(index, value);
  }

  const quizCardsVariant = document.querySelectorAll(".quiz_variant_card");
  
  for (let i = 1; i < quizCardsVariant.length; i++) {
    quizCardsVariant[i].style.display = "none";
  }

  quizCardsVariant.forEach((quizCard, index) => {
    const radioButtons = quizCard.querySelectorAll('input[type="radio"]');
    const submitButtonVariant = quizCard.querySelector(".quiz_submit-btn");

    function checkInputsVariant() {
      let checked = false;
      radioButtons.forEach((radioButton) => {
        if (radioButton.checked) {
          checked = true;
          answersVariant[`${index + 1}`] = radioButton.value;
          const variantAnswers = Object.values(answersVariant);
          updateLastAnswerVal();  
        }
      });
      submitButtonVariant.disabled = !checked;
      if (submitButtonVariant.disabled) {
        submitButtonVariant.classList.add("disabled");
      } else {
        submitButtonVariant.classList.remove("disabled");
      }
    }

    radioButtons.forEach((radioButton) => {
      radioButton.addEventListener("change", checkInputsVariant);
    });

    checkInputsVariant();

    submitButtonVariant.addEventListener("click", () => {
      quizCardsVariant[currentQuizCardIndexVariant].style.display = "none";
      currentQuizCardIndexVariant++;
      if (currentQuizCardIndexVariant >= quizCardsVariant.length) {
        submitButtonVariant.disabled = true;
        submitForm();
      } else {
        quizCardsVariant[currentQuizCardIndexVariant].style.display = "block";
      }
    });
  });

  updateLastAnswerVal(); 

  const form = document.querySelector(".form-signin");
  const submitBtn = document.getElementById("submitBtn");

  function submitForm() {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const payload = {
      exam_id: questions[0].exam_id,
      question_id: questions.map((question) => question.id),
      question_answer: Object.values(lastanswerval),
      person_name: name,
      person_surname: surname,
      person_email: email,
      person_phone: phone,
    };
    fetch("https://lhri.az/api/question-answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())

      .then((data) => {
        const message = data?.message;  
        const h1Tag = document.querySelector("#page14 h1");
        h1Tag.textContent = message ? message : "Form submitted successfully";
      })
      .then(async () => {
        await nextPage();
      })
      .catch((error) => {
         
        console.error(error);
      });
  }
 
})();

function homePageUrl() {
  window.location.href = "https://lhri.az/az";
}
 
  window.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("myForm");
    let continueButton = document.getElementById("continueButton");

    form.addEventListener("input", function () {
      let name = document.getElementById("name").value;
      let surname = document.getElementById("surname").value;
      let email = document.getElementById("email").value;
      let phone = document.getElementById("phone").value;
      continueButton.style.backgroundColor = "#ef9787";
      if (name === "" || surname === "" || email === "" || phone === "") {
        continueButton.disabled = true;
        continueButton.style.backgroundColor = "#ef9787";
      } else {
        continueButton.disabled = false;
        continueButton.style.backgroundColor = "#c73d24"
      }
    });

    
  });

   