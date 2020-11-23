class TableManager{
    constructor(queryTemplate,repository){
        this.queryTemplate=queryTemplate;
        this.repository=repository;
        this.currentPage=1;
        this.offset=20;
    }

    getCurrentPage(){
        return this.currentPage;
    }
    setCurrentPage(currentPage){
        if(currentPage>0){
            this.currentPage=currentPage;
            return true;
        }
        return false;
    }

    async getData(){
        let query=this.queryTemplate.
        replaceAll('$1',this.offset).
        replaceAll('$2',(this.currentPage-1)*this.offset);
        
        let result=await this.repository.getTables(query);
        return result;
    }

    renderTable(listElements,fields){
        let tableHTML='';
        listElements.forEach(element=>{
            tableHTML+=this.renderRow(element,fields);
        })
        return tableHTML;
    }

    renderRow(element,fields){
        let rowHTML='<tr class="winner__table">';
        fields.forEach(field => {
            rowHTML+=`<td>${element[field]}</td>`;
        });
        rowHTML+=`<td class="centrar">
            <img src="./imgs/edit.png" alt="">
            <img src="./imgs/delet.png" alt="">
        </td></tr>`;
        return rowHTML;
    }

    renderOption(element,fields){
        let optionHTML='';
        optionHTML+=`<option value="${element[fields.key]}">${element[fields.value]}</option>`;
        return optionHTML;
    }

    renderSelect(listElements,fields,elementHTML){
        let selectHTML='';
        listElements.forEach(element=>{
            selectHTML+=this.renderOption(element,fields);
        })
        elementHTML.innerHTML=selectHTML;
    }
}

module.exports=TableManager;
