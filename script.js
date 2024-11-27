
const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const timerElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const scoreContainer = document.getElementById('score-container');
const questionImage = document.getElementById('question-image');

let questions = [
    {
        question: "Qual caminhonete mais vendida de 2023 no Brasil?",
        image: "https://cdn.autopapo.com.br/box/uploads/2023/06/26140259/rampage-fiat-toro-portal-1.jpg", // Substitua pela URL da sua imagem
        options: ["Dodge Ram", "Hilux Toyota", "Ford Ranger", "Fiat Toro"],
        answer: "Hilux Toyota"
    },
    {
        question: "Qual é o primeiro carro do mundo?",
        image: "https://th.bing.com/th/id/R.415668387c5a282178574d2d0408bd7e?rik=mqEx8bhl84038g&pid=ImgRaw&r=0", // Substitua pela URL da sua imagem
        options: ["Benz-Patent Motorwagen (1886)", "Honda Civic (1885)", "kombi", "Fusca"],
        answer: "Benz-Patent Motorwagen (1886)"
    },
    {
        question: " Qual é o carro mais rápido do mundo?",
        image: "https://thumbs.dreamstime.com/b/movimenta%C3%A7%C3%A3o-da-velocidade-5438953.jpg", // Substitua pela URL da sua imagem
        options: ["Koenigsegg Agera RS", "SSC Ultimate Aero", "Bugatti Veyron", "McLaren P1"],
        answer: "Koenigsegg Agera RS"
    },
    {
        question: " Qual é o carro mais caro da atualidade? (2024)",
        image: "https://ogimg.infoglobo.com.br/economia/22091628-7d8-ff1/FT1086A/652/x34932043_SX-Rio-de-Janeiro-RJ-06-06-2012-Tio-Patinhas-FotoReproducao.jpg.pagespeed.ic.FQCSGKMXNC.jpg", // Substitua pela URL da sua imagem
        options: ["Bugatti Divo", "Gol g10", "Rolls-Royce Boat Tail", "Chevrolet Corvette stingray Conversível "],
        answer: "Rolls-Royce Boat Tail"
    },
    {
        question: "Qual desses carros não é da Chevrolet?",
        image: "https://th.bing.com/th/id/OIP.SpizfPXduPVJvt2ntNwyCwHaFj?rs=1&pid=ImgDetMain", // Substitua pela URL da sua imagem
        options: ["Chevette", "Celta", "Santana", "Agile"],
        answer: "Santana"
    },
    {
        question: "Qual desses carros pertence á marca Porsche?",
        image: "https://th.bing.com/th/id/R.89c4a2998239a314368887299b324b5c?rik=DO7MAiSJ0Oe7Rw&riu=http%3a%2f%2fwww.logo-decals.com%2flogo%2fporsche-logo.jpg&ehk=js6uWP9BXt7tg8tLyY1IDSXGrBFWayl0x78B35cX%2bfI%3d&risl=&pid=ImgRaw&r=0", // Substitua pela URL da sua imagem
        options: ["Carrera GT", "XF", "Freelander", "Korando"],
        answer: "Carrera GT"
    },
    {
        question: "Qual desses carros não pertece a marca Toyota",
        image: "https://assets.turbologo.com/blog/en/2021/07/07071922/1920_bvi-16x9-kv.jpg", // Substitua pela URL da sua imagem
        options: ["Corolla", "supra", "Civic", "Hilux"],
        answer: "Civic"
    },
    {
        question: "Qual a marca do carro Diplomata?",
        image: "https://motortudo.com/wp-content/uploads/2024/01/GM-Chevrolet-Diplomata-1992-rebaixado-3-800x590.webp", // Substitua pela URL da sua imagem
        options: ["Toyota", "Chevrolet", "Honda", "Peugeot"],
        answer: "Chevrolet"
    },
    {
        question: "Qual desses carro pertence a marca Mitsubishi",
        image: "https://th.bing.com/th/id/OIP.NwasgR0MU-wtMTkebewKAwHaE7?rs=1&pid=ImgDetMain", // Substitua pela URL da sua imagem
        options: ["Lancer", "GTR34", "Civic", "caravan"],
        answer: "Lancer"
    },
    {
        question: "Qual o último lançamento da Ferrari",
        image: "http://speedhunters-wp-production.s3.amazonaws.com/wp-content/uploads/2018/07/05183441/f80_vision_ttwg_oct8n_03-1200x800.jpg", // Substitua pela URL da sua imagem
        options: ["12cilindri", "Romaspider", "Purosangue", "F80"],
        answer: "F80"
    },
    {
        question: "Quais carros compõem a santíssima trindade dos carros",
        image: "https://e0.pxfuel.com/wallpapers/136/529/desktop-wallpaper-holy-trinity-of-cars-new-for-my-computer-thumbnail.jpg", // Substitua pela URL da sua imagem
        options: ["Brabus 800, Lamborguini aventador e Bugatti veyron", "Porsche 911, URUS e GTR35", "La ferrari, 918 spider e McLaren P1", "Porsche Cayene, BMW X4 e Porsche CARRERA GT"],
        answer: "La ferrari, 918 spider e McLaren P1"
    }

];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 60;

startButton.addEventListener('click', startGame);

function startGame() {
    const username = document.getElementById('username').value;
    if (username) {
        document.getElementById('start-container').classList.add('hidden');
        quizContainer.classList.remove('hidden');
        score = 0;
        currentQuestionIndex = 0;
        scoreElement.textContent = score;
        startTimer();
        showQuestion(questions[currentQuestionIndex]);
    } else {
        alert("Por favor, insira seu nome.");
    }
}

function startTimer() {
    timeLeft = 60;
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showScore();
        }
    }, 1000);
}

function showQuestion(question) {
    questionContainer.textContent = question.question;
    questionImage.src = question.image;
    questionImage.classList.remove('hidden');
    
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(option, question.answer));
        optionsContainer.appendChild(button);
    });
}

function selectOption(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        score++;
        scoreElement.textContent = score;
    }
    clearInterval(timer);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        startTimer();
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showScore();
    }
}

function showScore() {
    clearInterval(timer);
    quizContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    scoreContainer.innerHTML = `Você finalizou esse quizz e conquistou ${score} pontos.`;
}