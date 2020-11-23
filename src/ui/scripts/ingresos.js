const table=document.querySelector("#content-table"); 
const btnPrevPage=document.querySelector("#prev-page");
const btnCurrentPage=document.querySelector("#current-page");
const btnNextPage=document.querySelector("#next-page");

let user={id:2,user:'asd',rol:'tranajadpr'};

let tableManager = new TableManager(
    `select mov.id as id, ser.nombre as servicio,
    pac.nombres as paciente,
    mov.descuento,
    mov.monto_total,
    usu.nombre as usuario
    from movimientos mov
    left join servicios ser on mov.servicio_id=ser.id
    left join pacientes pac on mov.paciente_id=pac.id
    left join usuarios usu on mov.usuario_id=usu.id
    WHERE mov.created_at>DATE(SYSDATE())
    and mov.deleted_at is null order by created_at desc limit $1 offset $2;`,
    main.repository
)

updateTable();

function updateTable(){
    tableManager.getData().
    then((res)=>{
        if(!res.error){
            let tableHTML=tableManager.renderTable(res.result,['id','nombre','cantidad','monto','user','descuento','total'])
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

const inputCant=document.querySelector("#cant_ingreso");
const inputDate=document.querySelector("#date");
const inputDescuento=document.querySelector("#descuento");
const inputTotal=document.querySelector("#monto_total");
const inputPaciente=document.querySelector("#id_paciente");
const inputNameP=document.querySelector("#nombre_paciente");
const inputService=document.querySelector("#servicios_ingresos");
const inputCategory=document.querySelector("#concepto_ingreso");
const inputMonto=document.querySelector("#monto_ingreso");
let idPaciente='';

if(user.rol!="Administrador"){
    inputDescuento.disabled=true;
}

let fecha= new Date();
let formatDate=fecha.toLocaleString().split(' ')[0].split('/').reverse().join('-');

console.log(formatDate);
inputDate.value=formatDate;

let selectIngreso=new TableManager('select * from servicios where deleted_at is null and es_servicio=0 and es_ingreso=1 order by nombre asc;',main.repository);

selectIngreso.getData().
then((res)=>{
    if(!res.error){
        selectIngreso.renderSelect(res.result,{key:'id',value:'nombre'},inputService);
        renderSubCategoria(inputService.value);
    }
})

inputService.addEventListener('change',()=>{
    renderSubCategoria(inputService.value);
})

function renderSubCategoria(idCategoriaPrincipal){
    let selectCategoria=new TableManager('select * from servicios where deleted_at is null and es_servicio=1 and es_ingreso=1 and categoria_id='+idCategoriaPrincipal+' order by nombre asc;',main.repository);

    selectCategoria.getData().
    then((res)=>{
        if(!res.error){
            selectCategoria.renderSelect(res.result,{key:'id',value:'nombre'},inputCategory);
            renderMonto(inputCategory.value);
        }
    })
}

inputCategory.addEventListener('change',()=>{
    renderMonto(inputCategory.value);
})
function renderMonto(idMonto){
    let selectMonto=new TableManager('select * from servicios where deleted_at is null and id='+idMonto+'',main.repository);

    selectMonto.getData().
    then((res)=>{
        if(!res.error){
            inputMonto.value=res.result[0].costo;
            calculoTotal();
        }
    })
}
inputPaciente.addEventListener('change',()=>{
    verificarPaciente(inputPaciente.value);
})
function verificarPaciente(dni){
    let namePaciente = new TableManager('select * from pacientes where deleted_at is null and dni='+dni+'',main.repository);

    namePaciente.getData().
    then((res)=>{
        
        if(!res.error){
            idPaciente=res.result[0].id;
            inputNameP.value=res.result[0]?res.result[0].nombres:'Paciente no existe';
        }
        
    })
}
function calculoTotal(){
    inputTotal.value=Number(inputCant.value||1)*Number(inputMonto.value)-Number(inputDescuento.value||0);
}
inputCant.addEventListener('change',()=>{
    calculoTotal();
})
inputMonto.addEventListener('change',()=>{
    calculoTotal();f
})

const form=document.querySelector("#main-form");

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let cant=inputCant.value||1;
    let descuento=inputDescuento.value||0;
    let total=inputTotal.value;
    let usuario=user.id;
    let servicio=inputCategory.value;
    let paciente=idPaciente;
    
    let movimiento=new Movimiento(cant,descuento,total,usuario,servicio,paciente,main.repository);
    movimiento.save().
    then(res=>{
        console.log(res);
        if(!res.error){
            alert('Ingreso registrado correctamente');
            updateTable();
            form.reset();
        }
    })
})