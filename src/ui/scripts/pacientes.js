console.log(main.repository);
const table=document.querySelector("#content-table"); 
const btnPrevPage=document.querySelector("#prev-page");
const btnCurrentPage=document.querySelector("#current-page");
const btnNextPage=document.querySelector("#next-page");

let tableManager = new TableManager(
    'select pc.*, TIMESTAMPDIFF(YEAR, nacimiento, now()) as edad from pacientes as pc where pc.deleted_at is null order by pc.nombres asc limit $1 offset $2;',
    main.repository
)
updateTable();

function updateTable(){
tableManager.getData().
then((res)=>{
    if(!res.error){
        let tableHTML=tableManager.renderTable(res.result,['dni','nombres','edad','sexo','ocupacion_empresa','celular','direccion'])
        table.innerHTML=tableHTML;
        btnCurrentPage.innerHTML='Página '+tableManager.getCurrentPage();
    }
    console.log(res);
})
}

function updatePage(numberPage){
    let isCorrect=tableManager.setCurrentPage(tableManager.getCurrentPage()+numberPage);
    if(isCorrect){
        updateTable();
    }
}

const inputDni=document.querySelector("#dni");
const inputName=document.querySelector("#name");
const inputOptionM=document.querySelector("#option-m");
const inputOptionF=document.querySelector("#option-f");
const inputBirthDate=document.querySelector("#birth-date");
const inputPhone=document.querySelector("#phone");
const inputAddress=document.querySelector("#address");
const inputBussines=document.querySelector("#bussines");

const form=document.querySelector("#main-form");

inputDni.addEventListener('change',()=>{
    verificarDni(inputDni.value);
})

function verificarDni(idPaciente){
    let dni = new TableManager('select * from pacientes where deleted_at is null and dni='+idPaciente+'',main.repository);

    dni.getData().
    then((res)=>{
        if(!res.error){
            alert('Ya exite un usuario registrado con ese DNI');
        }
    })
}

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
    let birthdate=inputBirthDate.value;
    let phone=inputPhone.value;
    let address=inputAddress.value;
    let bussines=inputBussines.value;

    let paciente=new Paciente(dni,name,birthdate,sex,address,phone,bussines,main.repository);
    paciente.save().
    then(res=>{
        if(!res.error){
            alert('Paciente registrado correctamente');
            updateTable();
            form.reset();
        }
    })
})
