
console.log(main.repository);
const table=document.querySelector("#content-table"); 
const btnPrevPage=document.querySelector("#prev-page");
const btnCurrentPage=document.querySelector("#current-page");
const btnNextPage=document.querySelector("#next-page");


let tableManager = new TableManager(
    'select us.*,rl.nombre as rol from usuarios us left join roles rl on us.rol_id=rl.id where us.deleted_at is null and rl.deleted_at is null order by us.nombre asc limit $1 offset $2;',
    main.repository
)

updateTable();

function updateTable(){
tableManager.getData().
then((res)=>{
    if(!res.error){
        let tableHTML=tableManager.renderTable(res.result,['dni','nombre','username','telefono','profesion','rol'])
        table.innerHTML=tableHTML;
        btnCurrentPage.innerHTML='Página '+tableManager.getCurrentPage();
    }
    console.log(res);
})
}function updatePage(numberPage){
    let isCorrect=tableManager.setCurrentPage(tableManager.getCurrentPage()+numberPage);
    if(isCorrect){
        updateTable();
    }
}


const inputDni=document.querySelector("#dni");
const inputName=document.querySelector("#name");
const inputOptionM=document.querySelector("#option-m");
const inputOptionF=document.querySelector("#option-f");
const inputDate=document.querySelector("#date");
const inputPhone=document.querySelector("#phone");
const inputAddress=document.querySelector("#address");
const inputBussines=document.querySelector("#bussines");
const inputUsername=document.querySelector("#username");
const inputPassword=document.querySelector("#password");
const inputRol=document.querySelector("#rol");


let selectRol=new TableManager('select * from roles where deleted_at is null order by nombre asc;',main.repository);

selectRol.getData().
then((res)=>{
    if(!res.error){
        selectRol.renderSelect(res.result,{key:'id',value:'nombre'},inputRol);
    }
})





const form=document.querySelector("#main-form");

function handleSex(radio1,radio2){
    if(radio1.checked){
        radio2.checked=false;
    }
}

inputOptionF.addEventListener('change',()=>{
    handleSex(inputOptionF,inputOptionM);
})

inputOptionM.addEventListener('change',()=>{
    handleSex(inputOptionM,inputOptionF);
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let dni=inputDni.value;
    let name=inputName.value;
    let optionM=inputOptionM.checked;
    let sex=optionM?'M':'F';
    let date=inputDate.value;
    let phone=inputPhone.value;
    let address=inputAddress.value;
    let bussines=inputBussines.value;
    let username=inputUsername.value;
    let passsword=inputPassword.value;
    let rol=inputRol.value;

    let usuario=new Usuario(name,date,sex,bussines,address,passsword,username,dni,phone,rol,main.repository);
    console.log(usuario);
    usuario.save().
    then(res=>{
        if(!res.error){
            alert('Usuario registrado correctamente');
            updateTable();
            form.reset();
        }
    })
})
