const formulario = document.getElementById('form')
const camposFomulario = document.querySelectorAll('[required]')

formulario.addEventListener('submit', async (e) => {
    e.preventDefault()

    const dados = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    const resposta = await fetch('http://localhost:3000/enviar', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(dados)
    })

    if (resposta.ok) {
        alert('Formulário enviado!')
        formulario.reset()
    } else {
        alert('Erro ao enviar formulário.')
    }
})

camposFomulario.forEach((campo) => {
    campo.addEventListener('blur', () => verificaCampo(campo))
    campo.addEventListener('invalid', evento => evento.preventDefault())
})

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    name: {
        valueMissing: 'O campo de nome não pode estar vazio.',
        patternMismatch: 'Por favor, preencha um nome válido.',
        tooShort: 'Por favor, preencha um nome válido.'
    },
    email: {
        valueMissing: 'O campo de email não pode estar vazio.',
        typeMismatch: 'Por favor, preencha um email válido.',
        tooShort: 'Por favor, preencha um email válido.'
    },
    subject: {
        valueMissing: 'O campo de assunto não pode estar vazio.',
        patternMismatch: 'Por favor, preencha um assunto válido.',
        tooShort: 'Por favor, preencha um assunto válido.'
    },
    message: {
        valueMissing: 'O campo de mensagem não pode estar vazio.',
        patternMismatch: 'Por favor, preencha uma mensagem válida.',
        tooShort: 'Por favor, preencha uma mensagem válida.'
    }
}

function verificaCampo(campo) {
    let mensagem = ""
    campo.setCustomValidity('')

    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro]
            console.log(mensagem)
        }
    })
    const mensagemErro = campo.parentNode.querySelector('.error')
    const validadorDeInput = campo.checkValidity()

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem
    } else {
        mensagemErro.textContent = ""
    }
}