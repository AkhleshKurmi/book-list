class Book
{

    constructor(title,author,isbn){
    this.title= title;
    this.author= author;
    this.isbn= isbn;


    }
}

// const JS= new Book('xyz','abc','1234')
// console.log(JS)
class UI{
    static addBookToList(book){
        const list= document.querySelector("#book-list");
        const row= document.createElement(`tr`)
        row.innerHTML=`
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
        
         <td>
        <a href ="#" class="btn btn-danger btn-sm delete">X</a>
        </td>`
        
        list.appendChild(row);
      
    }
 static clearAllfields(){

    document.getElementById("title").value="";
    document.getElementById("author").value="";
    document.getElementById("isbn").value=""
 }

 static showalert(msg,className){
     const div= document.createElement("div")
     div.className= `alert alert-${className}`;
     div.appendChild(document.createTextNode(msg));
     const container = document.querySelector(".container")
     const form = document.querySelector("#book-form")
     container.insertBefore(div,form)
 setTimeout(()=>{
         document.querySelector(".alert").remove()
     },3000)

 }

static deleteBook(el){
    if(el.classList.contains("delete"))
    {
        if(confirm("Are you Sure to delete this Book")){
            el.parentElement.parentElement.remove()
        }
    }

 }
static displayBooks(){
//     const storeBook = [

//         {

//             title: "book one",
//             author: "akk",
//             isbn: "11223"
//         },
//         {
//         title: "Book two",
//         author: "gdgffd",
//         isbn: "1445"
//         },
//         {

//             title: "book third",
//             author: "aadd",
//             isbn: "112255"
//         }
//     ]
    const storeBook =store.getBooks()
     
    storeBook.forEach((book) =>{
        UI.addBookToList(book)
    })
}
}

document.addEventListener("DOMContentLoaded",UI.displayBooks)

class store{

  static getBooks(){
      let books;
      if(localStorage.getItem("books") == null){
          books=[];
      }
      else {
          books = JSON.parse(localStorage.getItem("books"))
      }
       return books;
    }

    static addBooks(book){
        const books= store.getBooks();
        books.push(book)
        localStorage.setItem("books",JSON.stringify(books));
   


}
static removeBook(isbn){
   const books = store.getBooks();
   books.forEach(function(book,index){
      if(book.isbn==isbn){
          books.splice(index,1)
      }
      localStorage.setItem("books",JSON.stringify(books))
   })

}
}
document.querySelector("#book-form").addEventListener("submit",(e)=>{
   
e.preventDefault();
const title = document.getElementById("title").value;
const author = document.querySelector("#author").value;
const isbn = document.querySelector("#isbn").value;
if(author==""||title==""||isbn==""){
    UI.showalert("Please fill all the fields","danger")
}
else{

 const book = new Book(title,author,isbn)
//  console.log(book)


// console.log(title,author,isbn)
// const ui= new UI();
// ui.addBookToList(book)
UI.addBookToList(book)
store.addBooks(book)
UI.clearAllfields()
UI.showalert("Book added successfully","success")

}
})

document.querySelector("#book-list").addEventListener("click",(em) =>{  
      UI.deleteBook(em.target)
  store.removeBook(em.target.parentElement.previousElementSibling.textContent)
  UI.showalert("Book removed successfully","success")

})


