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
            let tableHTML=tableManager.renderTable(res.result,['categoria','nombre','detalle','costo'])
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

const inputName=document.querySelector("#name_servicios");
const inputPrice=document.querySelector("#price");
const inputDetalle=document.querySelector("#detalle_servicio");
const inputCategoria=document.querySelector("#categoria");


let selectCategory=new TableManager('select * from servicios where deleted_at is null and es_servicio=0 order by nombre asc;',main.repository);

selectCategory.getData().
then((res)=>{
    if(!res.error){
        selectCategory.renderSelect(res.result,{key:'id',value:'nombre'},inputCategoria);
        let optionEmpty=document.createElement('option');
        optionEmpty.value=0;
        optionEmpty.innerHTML='Nueva Categoría';
        inputCategoria.append(optionEmpty);
    }
})


const form=document.querySelector("#main-form");

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let name=inputName.value;
    let price=inputPrice.value;
    let detalle=inputDetalle.value;
    let es_servicio=inputCategoria.value=="0"?0:1;
    let es_ingreso=1;
    let categoria=inputCategoria.value;

    let servicio=new Servicio(name,price,detalle,es_servicio,es_ingreso,categoria,main.repository);
    servicio.save().
    then(res=>{
        if(!res.error){
            alert('Servicio registrado correctamente');
            updateTable();
            form.reset();
        }
    })
})