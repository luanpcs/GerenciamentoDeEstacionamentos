document.querySelector('#login').addEventListener(
    'submit', (e) => {
        var loginAceito = 0;
        e.preventDefault();
        const user = document.querySelector('#usuario').value;
        const senha = document.querySelector('#senha').value;

        buscaLogin()
        .then
        (dados => {
            for (let i = 0; i < dados.length; i++) {
                const registro = dados[i];
                if (registro.user === user && registro.senha === senha) {
                    console.log('Usuário e senha correspondem!');
                    aceitarLogin();
                    loginAceito = 1
                    break;
                }
            }
            if(loginAceito == 0)
                recusar()
        });
    }
);