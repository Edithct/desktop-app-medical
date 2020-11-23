const table=document.querySelector("#content-table"); 
const btnPrevPage=document.querySelector("#prev-page");
const btnCurrentPage=document.querySelector("#current-page");
const btnNextPage=document.querySelector("#next-page");

let tableManager = new TableManager(
    'SELECT cat.nombre as categoria ,se.* FROM `servicios` se left join servicios cat on se.categoria_id=cat.id WHERE se.es_servicio=1 and se.deleted_at is null and cat.deleted_at is null order by cat.nombre asc, se.nombre asc limit $1 offset $2;',
    main.repository
)

updateTable();

function updateTable(){
    tableManager.getData().
    then((res)=>{
        if(!res.error){
            let tableHTML=tableManager.renderTable(res.result,['nombre','cantidad','costo','usuario','descuento','monto_total'])
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

const inputCant=document.querySelector("#cant_egreso");
const inputTotal=document.querySelector("#monto_total");
const inputService=document.querySelector("#servicios_egresos");
const inputCategory=document.querySelector("#concepto_egreso");
const inputMonto=document.querySelector("#monto_egreso");


let selectEgreso=new TableManager('select * from servicios where deleted_at is null and es_servicio=0 and es_ingreso=0  order by nombre asc;',main.repository);

selectEgreso.getData().
then((res)=>{
    if(!res.error){
        selectEgreso.renderSelect(res.result,{key:'id',value:'nombre'},inputService);
    }
})



let selectCategoria=new TableManager('select * from servicios where deleted_at is null and es_servicio=1 and es_ingreso=1 and categoria_id= order by nombre asc;',main.repository);

selectCategoria.getData().
then((res)=>{
    if(!res.error){
        selectCategoria.renderSelect(res.result,{key:'id',value:'nombre'},inputCategory);
    }
})

let selectMonto=new TableManager('select * from servicios where deleted_at is null and nombre=;',main.repository);

selectMonto.getData().
then((res)=>{
    if(!res.error){
        selectMonto.renderSelect(res.result,{key:'id',value:'costo'},inputMonto);
    }
})

const form=document.querySelector("#main-form");

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let cant=inputCant.value;
    let date=inputDate.value;
    let descuento=inputDesceunto.value;
    let total=inputTotal.value;
    let paciente=inputPaciente.value;
    let servicio=inputService.value;
    let usuario=inputUsuario.value;
    

    let movimiento=new Movimiento(cant,date,descuento,total,usuario,paciente,servicio,main.repository);
    movimiento.save().
    then(res=>{
        if(!res.error){
            alert('Egreso registrado correctamente');
            updateTable();
            form.reset();
        }
    })
})