function mostrarErro(campo, mensagem) {
  const input = document.getElementById(campo);
  const spanErro = document.querySelector('[data-erro="' + campo + '"]');
  if (input) {
    input.classList.add('campo-erro');
  }
  if (spanErro) {
    spanErro.textContent = mensagem;
  }
}

function limparErros() {
  document.querySelectorAll('.campo-erro').forEach(el => {
    el.classList.remove('campo-erro');
  });
  document.querySelectorAll('.erro').forEach(el => {
    el.textContent = '';
  });
}

function validarCadastro(dados) {
  const erros = {};

  if (!dados.nome || dados.nome.trim().length < 3) {
    erros.nome = 'Informe um nome com pelo menos 3 caracteres.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!dados.email || !emailRegex.test(dados.email)) {
    erros.email = 'Informe um e-mail válido (ex: nome@dominio.com).';
  }

  const telRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  if (!dados.telefone || !telRegex.test(dados.telefone)) {
    erros.telefone = 'Informe um telefone válido com DDD (ex: 11 99999-8888).';
  }

  if (!dados.disponibilidade) {
    erros.disponibilidade = 'Selecione uma opção de disponibilidade.';
  }

  if (!dados.mensagem || dados.mensagem.trim().length < 10) {
    erros.mensagem = 'Escreva pelo menos 10 caracteres na mensagem.';
  }

  return erros;
}

function initCadastroForm() {
  const form = document.getElementById('form-cadastro');
  const msgSucesso = document.getElementById('mensagem-sucesso');

  // Pre-carrega dados salvos (localStorage)
  const dadosSalvos = localStorage.getItem('cadastroVoluntario');
  if (dadosSalvos) {
    try {
      const dados = JSON.parse(dadosSalvos);
      if (dados.nome) document.getElementById('nome').value = dados.nome;
      if (dados.email) document.getElementById('email').value = dados.email;
      if (dados.telefone) document.getElementById('telefone').value = dados.telefone;
      if (dados.disponibilidade) document.getElementById('disponibilidade').value = dados.disponibilidade;
      if (dados.mensagem) document.getElementById('mensagem').value = dados.mensagem;
    } catch (e) {
      console.warn('Erro ao ler dados do localStorage', e);
    }
  }

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    limparErros();
    if (msgSucesso) msgSucesso.style.display = 'none';

    const dados = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      telefone: document.getElementById('telefone').value,
      disponibilidade: document.getElementById('disponibilidade').value,
      mensagem: document.getElementById('mensagem').value
    };

    const erros = validarCadastro(dados);

    if (Object.keys(erros).length > 0) {
      Object.keys(erros).forEach(campo => {
        mostrarErro(campo, erros[campo]);
      });
      alert('Existem erros no formulário. Verifique os campos destacados.');
      return;
    }

    // Salva no localStorage (simulação de backend)
    localStorage.setItem('cadastroVoluntario', JSON.stringify(dados));

    if (msgSucesso) {
      msgSucesso.style.display = 'block';
    }

    form.reset();
  });
}
