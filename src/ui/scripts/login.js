const loginForm = document.getElementById('login-form');

const usuarioForm = document.getElementById('usuario');
const contraseñaForm = document.getElementById('contraseña');


loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    console.log(usuarioForm.value)
    console.log(contraseñaForm.value)
    document.location.href = 'ingresos.html'
})


