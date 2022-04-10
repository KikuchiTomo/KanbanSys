# KanbanSys

KanbanSys is a simple board system library on JavaScript.  
this version is beta (developing..).  
Try this version! [Demo](https://tomodev.work/github/demo/kanbanSys)

## How to install
Please clone this repo and copy `include` dir into your workspace.  

You have to include next files in header tag.

```html
<-- in header -->
<link rel="stylesheet" href="include/kanbanSys.min.css">
<script src="include/kanbanSys.js"></script>

```

## Usage
You need to add the following code to be executed after all elements have finished loading.

```javascript
var kanban = new KanbanSys(options);
```

Option example.
```javascript
 var kanban = new KanbanSys({
     kanbanId: "kanban", // Unique id
     targetElementId: "main", // Boards is added to the element with this id
     structre: {
         /*
             If allowOriginalAssembler is set to true, you can define the data structure of items at your disposal.
             However, the originalAssembler must be set to a function that receives data and composes the DOM. 
             If you are not comfortable creating functions, you can use the default data format.
             In that case, allowOriginalAssembler must be false.  
         */         
         allowOriginalAssembler: false, 
         originalAssembler: null,
         defaultAssemblerType: "simple" 
    },          
    server: {
        /*
            If autoUpload is set to true, the contents are sent as JSON to the host to be configured whenever there is a change in the Board.
            (Not implemented)
        */
        autoUpload: true,
        host: "https://www.exmple.com",
        get:  "/kanban_download",
        post: "/kanban_upload"
    },
    defaultUI: {
        /*
            You can set main theme, light or dark.
        */
        heme: "dark"
    },
    
    content: [] // Your data
});
```

These are the basic data structures that KanbanSys supports.  
The data structure of Board cannot be modified. However, the structure of Contents can be changed. As a constraint, 
Contents must be an array and have an id field for each data.

```javascript
  var kanbanContent = [
            {
                BoardName: "Idea",
                BoardID:   "board0",
                Contents: [ // You can define your data structure.
                    {
                        id: "id0",
                        title: "bug fix #1",
                        person: "Jhone"                      
                    },
                    {
                        id: "id2",
                        title: "bug fix #2",
                        person: "Mike"
                    }
                ]              
            }]

```
