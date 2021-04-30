///////VALIDAÇÃO EMAIL/////

function validateEmail(e){
    let field = e.target;
    let fieldValue = field.value;

    if (fieldValue.search('@') == -1) {
        displayError('Email não é válido', field);
    }else {
        clearError(field);
    }

    field.classList.remove('not-validated');
    checkEnableSubmit();
}

///////VALIDAÇÃO CAMPO VAZIO/////
function validateNotEmpty(e) {
    let field = e.target;
    let fieldValue = field.value;

    if (fieldValue == '') {
        displayError('Campo não pode ser vazio', field);
    }else {
        clearError(field);
    }

    field.classList.remove('not validated');
    checkEnableSubmit();
}

function displayError(message, field) {
    clearError(field);
    field.classList.add('is-invalid');
    let error = document.createElement('small');
    error.style.color ='red';
    error.classList.add('error-message');
    error.textContent = message;
    field.parentElement.appendChild(error);
}

function clearError(field) {
    let container = field.parentElement;
    let error = container.querySelector ('.error-message');
    if (error) {
        container.removeChild(error);
    }
    field.classList.remove ('is-invalid');
}

function checkEnableSubmit() {
    let form = document.querySelector('#form');
    let notValidated = form.querySelectorAll('.not-validated');
    let error = form.querySelectorAll('.is-valid');

    if (error.length == 0 && notValidated.length == 0){
        enableSubmit();
    }else {
        disableSubmit();
    }
}

function enableSubmit () {
    let form = document.querySelector('#form');
    let submit = form.querySelector('[type=submit');

    submit.disabled = false;
}
function disableSubmit () {
    let form = document.querySelector ('#form');
    let submit = form.querySelector('[type=submit]');
    submit.disabled = true;
}

document.querySelectorAll('input').forEach(el => el.classList.add ('no-validated'));
document.querySelectorAll ('input.email').forEach(el => el.addEventListener('keyup', validateEmail));
document.querySelectorAll ('input:required').forEach(el => el.addEventListener('keyup', validateNotEmpty));



///////VALIDAÇÃO CEP/////

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('uf').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('rua').value=(conteudo.logradouro);
    document.getElementById('bairro').value=(conteudo.bairro);
    document.getElementById('cidade').value=(conteudo.localidade);
    document.getElementById('uf').value=(conteudo.uf);
} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('rua').value="...";
        document.getElementById('bairro').value="...";
        document.getElementById('cidade').value="...";
        document.getElementById('uf').value="...";
    

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};


