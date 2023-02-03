const fs=require('fs')
const csv=require('csv-parser')


const bookcsv='./data/Books.csv'
const authorcsv='./data/Authors.csv'
const magazinecsv='./data/Magazines.csv'

  let books = [];
  let magazines=[];
  let authors=[]

  // Read data from csv file

 function readData(file){
  fs.createReadStream(file)
    .pipe(csv())
    .on('data', (data) => {
          if(file===bookcsv)
       { books.push(data);}
       if(file===magazinecsv)
       { magazines.push(data);}
       if(file===authorcsv)
       { authors.push(data);}

    })
    .on('end', () => {
        if(file===bookcsv)
        {    books.forEach( (data)=>{
                console.log(data)
            });}
        if(file===magazinecsv)
        { magazines.forEach(data=>{
            console.log(data)
        });}
        if(file===authorcsv)
        { authors.forEach(data=>{
            console.log(data)
        });}
      
    });
  
}
    


//Print all books and magazines
readData(bookcsv);
readData(magazinecsv);
//readData(authorcsv);  


              // Find a book or magazine by its ISBN.
setTimeout(()=>{
            let  findByIsbn=(isbn)=>{
            let result =  books.find((ele)=>ele.isbn==isbn);
            if(!result){
            result =  magazines.find((ele)=>ele.isbn==isbn);
            }
            console.log('####################################')
            console.log('####################################')
            console.log('####################################')

            console.log("Result for find By Isbn :\n ",result)
            }
  findByIsbn('2365-8745-7854')
},1000)


               //Find all books and magazines by their authors email.
setTimeout(()=>{
 let findBookAndMaz=(email)=>{
      let result1=books.filter((ele)=>ele.authors==email)
      let result2=magazines.filter(ele=>ele.authors==email)
      console.log('####################################')
      console.log('####################################')
      console.log('####################################')
      console.log("Books and magazines according to author email  are :\n",result1.concat(result2))
 }
 findBookAndMaz('walter@echocat.org')
},1000)

                  //Sorted books and magazines
setTimeout(()=>{
    let sortBookMagzine=()=>{
        let result =books.concat(magazines)
        console.log('####################################')
        console.log('####################################')
        console.log('####################################')
        console.log("Sorted books and magazines: - \n",result.sort((a,b)=>a.title.localeCompare(b.title)))
    }
    sortBookMagzine();
   },1000)

                    
                  // Adding data to book and Magazine and creating new csv file
setTimeout(()=>{
     let addBookMagazine=()=>{
        let obj1={
            title: 'Kotlin',
            isbn: '1111-1111-1111',
            authors: 'abc@gmail.com',
            description: 'Its all about Kotlin'
        }
        books.push(obj1)
      
        let obj2={
            title: 'web developer',
            isbn: '7777-7777-7777',
            authors: 'abc22@gmail.com',
            publishedAt: '02.02.2023'
        }
        magazines.push(obj2)

        let result=[obj1,obj2]
        let csvData="title,isbn,authors,description,publishedAt\n"
        
        result.forEach(data=>{
            if(data.description==undefined){
                data.description="####"
            }
            if(data.publishedAt==undefined){
                data.publishedAt="####"
            }
           csvData+=`${data.title},${data.isbn},${data.authors},${data.description},${data.publishedAt}\n`
        })
        console.log('####################################')
        console.log('####################################')
        console.log('####################################')
        console.log(csvData)
      fs.writeFile('new.csv',csvData,(err)=>{
              if(err) throw err;
              console.log('new.csv created')
      })
     }
     addBookMagazine()
   },1000)




