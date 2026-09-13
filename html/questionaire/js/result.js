const params = new URLSearchParams(window.location.search)
const score = params.get('score')

const number = document.querySelector('.number')
number.innerText = score

const again = document.querySelector('.footer')
again.addEventListener('click', () => {
    location.href = '../index.html';
})

