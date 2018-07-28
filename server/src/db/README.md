## Record Schema

```js

const record = {
    _id: ID, 
    title: String,
    thumbnail: String,
    datePublished: Date,
    documents: [Document] ,    
    documentType: DocumentType,  

}

const Document = {
    _id: ID,   
    url: String,
    recordId: ID,
    title: String,
    format: String,
    geometry: JSON,
    source: String,
    publisher: Publisher,
    publishedDate: Date,
    documentType : DocumentType  
}

const DocumentTye = {
    _id: ID, 
    category: String,
    subcategory: String,
}

const DocumentTye = {
    _id: ID, 
    user: ID,
    records: [Record],
}

 const User = {
    _id: ID, 
    name: String,
    email: String,
    username: [Record],
    organization: ID,
    lastname: String,
}