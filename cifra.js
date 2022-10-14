var radioCodificar = document.getElementById('codificar');
var radioDecodificar = document.getElementById('decodificar');
var botaoAcao = document.getElementById('botao');
var selectCriptografia = document.getElementById('criptografia');

var inputEscrever = document.getElementById('escrever');
var inputResultado = document.getElementById('resultado');
var inputIncremento = document.getElementById('ocultarIncremento');

var alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function trocarTextoBotao(texto) {
    botaoAcao.innerText = texto;
}

function isLowerCase(str) {
    return str == str.toLowerCase() && str != str.toUpperCase();
}

function rotacionaCifraDeCesar(incremento) {
    var texto = inputEscrever.value;
    var cifrado = '';

    for (var i = 0; i < texto.length; i++) {
        var letra = texto[i];
        var indexLetra = alfabeto.indexOf(letra.toUpperCase());
        if(indexLetra >= 0) {
            var indexLetraCifra = indexLetra + incremento;
            if (indexLetraCifra >= alfabeto.length) {
                indexLetraCifra = indexLetraCifra - alfabeto.length;
            } else if (indexLetraCifra < 0) {
                indexLetraCifra = alfabeto.length + indexLetraCifra;
            }
            cifrado += isLowerCase(letra) ? 
                alfabeto[indexLetraCifra].toLowerCase() : 
                alfabeto[indexLetraCifra];
        } else {
            cifrado += letra;
        }
    }

    return cifrado;
}

function codificaCifraDeCesar() {
    var incremento = parseInt(inputIncremento.value);
    return rotacionaCifraDeCesar(incremento);
}

function decodificaCifraDeCesar() {
    var incremento = 0 - parseInt(inputIncremento.value);
    return rotacionaCifraDeCesar(incremento);
}

function codificaBase64() {
    var texto = inputEscrever.value;
    return window.btoa(texto);
}

function decodificaBase64() {
    var texto = inputEscrever.value;
    return window.atob(texto);
}

function codificar() {
    var criptografia = selectCriptografia.value;
    if(criptografia === 'cesar') {
        return codificaCifraDeCesar();
    } else if(criptografia === 'base64') {
        return codificaBase64();
    }
}

function decodificar() {
    var criptografia = selectCriptografia.value;
    if(criptografia === 'cesar') {
        return decodificaCifraDeCesar();
    } else if(criptografia === 'base64') {
        return decodificaBase64();
    }
}

radioCodificar.addEventListener('change', function() {
    trocarTextoBotao('Codificar Mensagem!');
});

radioDecodificar.addEventListener('change', function() {
    trocarTextoBotao('Decodificar Mensagem!');
});

selectCriptografia.addEventListener('change', function() {
    var criptografia = selectCriptografia.value;
    inputIncremento.style.display = criptografia === 'cesar' ? 'block' : 'none';
    inputIncremento.value = "";
});

botaoAcao.addEventListener('click', function() {
    inputResultado.value = radioCodificar.checked ? 
        codificar() : 
        decodificar();
});