console.log(main.repository);

const inputDni=document.querySelector("#dni");
const inputName=document.querySelector("#name");
const inputOptionM=document.querySelector("#option-m");
const inputOptionF=document.querySelector("#option-f");
const inputBirthDate=document.querySelector("#birth-date");
const inputPhone=document.querySelector("#phone");
const inputAddress=document.querySelector("#address");
const inputBussines=document.querySelector("#bussines");

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
    let birthdate=inputBirthDate.value;
    let phone=inputPhone.value;
    let address=inputAddress.value;
    let bussines=inputBussines.value;

    let paciente=new Paciente(dni,name,birthdate,sex,address,phone,bussines,main.repository);
    paciente.save().
    then(res=>{
        if(!res.error){
            alert('Usuario registrado correctamente');
        }
    })
    //console.log(`${dni}-${name}-${optionF}-${optionM}-${birthdate}-${phone}-${address}-${bussines}`);
})
