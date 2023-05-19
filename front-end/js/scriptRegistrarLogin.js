
document.querySelector('#login').addEventListener(
  'submit', (e) => {
    e.preventDefault();
    const user = document.querySelector('#usuario').value;
    const senha = document.querySelector('#senha').value;

    if (user && senha) {

      registraLogin(user, senha);

      const element = document.getElementById('form');
      element.remove();

      setTimeout(() => window.location.href = "../index.html", 1500);
    }

  }
);