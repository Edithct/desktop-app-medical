const menuForm = document.getElementById('menu');
const ingresoMenu = document.getElementById('ingresoMenu');
const egresoMenu = document.getElementById('egresoMenu');


loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    console.log(ingresoMenu.value)
    document.location.href = 'ingresos.html'
})

loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    console.log(egresoMenu.value)
    document.location.href = 'egresos.html'
})