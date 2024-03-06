const listExam = document.getElementById('list-exam');
const optionsElement = document.getElementById('options');
const questionContainer = document.getElementById('question-container');

document.addEventListener("DOMContentLoaded", function () {
    const data = getLocalStorageData();
    console.log(data);
    displayQuestions(data.questions, data.data);
    const totalCorrectAnswerCount = checkCorrectAnswer(data.data);
    const resultTableBody = document.getElementById("resultTableBody");

    // Hiển thị thông tin sinh viên
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${data.formData.full_name}</td>
        <td>${data.formData.cccd}</td>
        <td>${data.formData.date}</td>
        <td>${data.formData.phone_number}</td>
        <td>${data.formData.address}</td>
        <td>${data.questions.length}</td>
        <td>${totalCorrectAnswerCount}</td>
    `;
    resultTableBody.appendChild(row);
});


// check số câu trả lời đúng
function checkCorrectAnswer(data) {
    let totalCorrectAnswerCount = 0;
    for (let i = 0; i < data.length; i++) {
        if(data[i].userAnswer === null) continue;
        if (data[i].correctAnswer === data[i].userAnswer) {
            totalCorrectAnswerCount++;
        }
    }
    return totalCorrectAnswerCount;
}


// Lấy dư liệu từ localStorage
function getLocalStorageData() {
    if(!localStorage.getItem('userAnswers') || !localStorage.getItem('formData')) return null;
    const data = JSON.parse(localStorage.getItem('userAnswers'));
    const formData = JSON.parse(localStorage.getItem('formData'));
    const questions = JSON.parse(localStorage.getItem('questions'));
    // localStorage.removeItem('userAnswers');
    return {data: data, formData: formData, questions: questions};
}

function displayQuestions(questions, data) {
    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        if (question.type === "Lựa chọn đúng/sai") {
            let ans = '';
            if(data[index].userAnswer === data[index].correctAnswer){
                ans = 'ansChosen';
            }
            questionDiv.innerHTML = `
                <p class="m-0"><strong>Câu ${index + 1}:</strong> ${question.question}</p>
                <p><em>Loại: ${question.type}</em></p>
                <div class="d-flex flex-column">
                <label>
                    <p class="${data[index].userAnswer == true ? 'ansChosen' : ''} p-1">Đúng</p>
                </label>
                <label>
                    <p class="${data[index].userAnswer == false ? 'ansChosen' : ''} p-1">Sai</p>
                </label>
                ${data[index].userAnswer === null ? `<p class="p-1 fw-bold">Chưa chọn</p>` : ''}
                ${data[index].userAnswer == data[index].correctAnswer ? `<div class="d-flex flex-row align-items-center"><i class="fa-solid fa-check mx-3" style="color: green;"></i><p class="p-1 fw-bold m-0">Đúng</p></div>` : ''}
                ${data[index].userAnswer != data[index].correctAnswer && data[index].userAnswer !== null ? `<div class="d-flex flex-row align-items-center"><i class="fa-solid fa-xmark mx-3" style="color: #e56a54"></i><p class="p-1 fw-bold m-0">Sai</p></div>` : ''}
                </div>
            `;
        } else if (question.type === "Chọn 1 trong 4 đáp án") {
            questionDiv.innerHTML = `
                <p class="m-0"><strong>Câu ${index + 1}:</strong> ${question.question}</p>
                <p><em>Loại: ${question.type}</em></p>
                <ul style="list-style-type:none;">
                    ${question.options.map((option, idx) => `
                        <li>
                            <label>
                                <input type="radio" name="question${index}" value="${idx}"> ${String.fromCharCode(65 + idx)}. ${option}
                            </label>
                        </li>`).join('')}
                </ul>
            `;
        } else if (question.type === "Chọn nhiều đáp án") {
            questionDiv.innerHTML = `
                <p class="m-0"><strong>Câu ${index + 1}:</strong> ${question.question}</p>
                <p><em>Loại: ${question.type}</em></p>
                <ul style="list-style-type:none;">
                    ${question.options.map((option, idx) => `
                        <li>
                            <label>
                                <input type="checkbox" name="question${index}" value="${idx}"> ${String.fromCharCode(65 + idx)}. ${option}
                            </label>
                        </li>`).join('')}
                </ul>
            `;
        } else if (question.type === "Trả lời tự luận") {
            questionDiv.innerHTML = `
                <p class="m-0"><strong>Câu ${index + 1}:</strong> ${question.question}</p>
                <p><em>Loại: ${question.type}</em></p>
                <textarea rows="4" cols="50" name="question${index}" placeholder="${data[index].userAnswer}" disabled></textarea>
            `;
        }
        questionContainer.appendChild(questionDiv);
    });
}