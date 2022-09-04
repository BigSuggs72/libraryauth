const deleteBtn = document.querySelectorAll('.del')
const bookItem = document.querySelectorAll('span.checkedIn')
const bookComplete = document.querySelectorAll('span.checkedOut')
const extendedSection = document.querySelectorAll('.extend')
const minimizedSection = document.querySelectorAll('.minimize')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteBook)
})

Array.from(bookItem).forEach((el)=>{
    el.addEventListener('click', markCheckedOut)
})

Array.from(bookComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

Array.from(extendedSection).forEach((el)=>{
    el.addEventListener('click', extendSection)
})

Array.from(minimizedSection).forEach((el)=>{
    el.addEventListener('click', minimizeSection)
})

async function deleteBook(){
    const bookId = this.parentNode.dataset.id
    try{
        const response = await fetch('books/deleteBook', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'bookIdFromJSFile': bookId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markCheckedOut(){
    const bookId = this.parentNode.dataset.id
    try{
        const response = await fetch('books/markCheckedOut', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'bookIdFromJSFile': bookId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const bookId = this.parentNode.dataset.id
    try{
        const response = await fetch('books/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'bookIdFromJSFile': bookId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

function extendSection(){
    const bookId = this.parentNode.querySelector('.extended-view')
    try{
        bookId.classList.remove("hidden");
        // location.reload()
    }catch(err){
        console.log(err)
    }
}

function minimizeSection(){
    const bookId = this.parentNode.parentNode.parentNode.querySelector('.extended-view')
    try{
        bookId.classList.add("hidden");
        // location.reload()
    }catch(err){
        console.log(err)
    }
}
