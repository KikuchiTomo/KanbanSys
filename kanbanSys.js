/**
 *  KanbanSys
 *  A Simple kanban system on web browser
 *  
 *  @author Kikuchi Tomoo
 */

// Constructor
(function () {
    this.KanbanSys = function (config) {
        var self = this
        
        this.menus = []
        this.menus_num = 0
        this.x = 0
        this.y = 0
        this.h = 0
        
        this.config = config
        this.assembler = undefined

        this.__assemblerType0 = function(content){
            // Exmple
            var doms = []
            if(content === undefined || content === null || content.length === undefined) return doms
            
            content.forEach((data) => {
                var dom = document.createElement('div')
                //dom.dataset.data = JSON.stringify(data)
                dom.id = data["id"]
                var title = document.createElement('div')
                title.classList.add("title")
                title.innerHTML     = data['title']
                title.dataset.title = data['title']
                var person = document.createElement('div')
                person.innerHTML      = data['person']
                person.dataset.person = data['person']
                person.classList.add("person")
                
                dom.appendChild(title)
                dom.appendChild(person)
                doms.push(dom)
            })
            return doms
        }

        this.__assemblerType1 = function(){
            
        }

        this.__assemblerType2 = function(){
            
        }

        this.__assemblerType3 = function(){
            
        }      

        this.__createCard = function(id, dom, content){
            var div0 = document.createElement('div')
            div0.id = dom.id + "-card"
            div0.dataset.data = JSON.stringify(content)
            div0.classList.add("kanbansys-style-item", "kanbansys-style-" + self.config.structre.defaultAssemblerType, "kanbansys-event-card")            
            var div1 = document.createElement('div')
            div1.classList.add("kanbansys-user-style")
            div1.appendChild(dom)
            div0.appendChild(div1)
            return div0
        }

        this.__showNewCardForm = function(){
            
        }       
        
        this.__createAddButton = function(handler) {
            var button = document.createElement('div')
            button.classList.add("kanbansys-ui-add")

            var line0 = document.createElement('span')
            var line1 = document.createElement('span')
            line0.classList.add("kanbansys-ui-add-line0")
            line0.classList.add("kanbansys-ui-add-line")
            line1.classList.add("kanbansys-ui-add-line1")
            line1.classList.add("kanbansys-ui-add-line")
            button.appendChild(line0)
            button.appendChild(line1)
            button.addEventListener('click', handler)
            return button
        }
        
        this.__createMenu = function(content){
            var menu = document.createElement('div')
            menu.classList.add("kanbansys-ui-menu")
            menu.id = self.config.kanbanId + "-" + "menu-button" + self.menus_num         
            
            var dot0 = document.createElement('span')
            var dot1 = document.createElement('span')
            var dot2 = document.createElement('span')        

            dot0.classList.add("kanbansys-ui-menu-dot")
            dot1.classList.add("kanbansys-ui-menu-dot")
            dot2.classList.add("kanbansys-ui-menu-dot")
            dot0.classList.add("kanbansys-ui-menu-dot0")
            dot1.classList.add("kanbansys-ui-menu-dot1")
            dot2.classList.add("kanbansys-ui-menu-dot2")

            menu.appendChild(dot0)
            menu.appendChild(dot1)
            menu.appendChild(dot2)

            var menu_list = document.createElement('div')
            menu_list.classList.add("kanbansys-ui-menu-content")
            menu_list.classList.add("kanbansys-ui-display-none")
            var now_id = menu.id
            menu_list.id = now_id + "-content"
            
            menu.addEventListener('click', function(){
                id = now_id + "-content"
                let me = document.getElementById(id)
                if( me.classList.contains("kanbansys-ui-display-none") ) {
                    me.classList.remove("kanbansys-ui-display-none")
                }else{
                    me.classList.add("kanbansys-ui-display-none")
                }
            })
            
            let list = Object.keys(content)
            list.forEach(function(name){
                var title = document.createElement('div')
                title.innerHTML = name
                title.classList.add("kanbansys-ui-menu-title")
                menu_list.appendChild(title)
                
                Object.keys(content[name]).forEach(function(key){
                    var button = document.createElement('div')
                    button.classList.add("kanbansys-ui-menu-menus")
                    button.innerHTML = key
                    button.addEventListener(content[name][key]['Event'], content[name][key]['Handler'])
                    menu_list.appendChild(button)
                })
            })

            menu.appendChild(menu_list);
            self.menus.push(menu);
            self.menus_num = self.menus_num + 1;
            return menu
        }

        this.__assembleBoardHeader = function(id, text, num0){
            var header = document.createElement('div')
            header.classList.add("kanbansys-style-kanban-header")
            
            var title = document.createElement('div')
            title.classList.add("kanbansys-style-kanban-header-title")
            title.innerHTML = text
            title.id = id + "-" + "title"
            
            var num = document.createElement('div')
            num.classList.add("kanbansys-style-kanban-header-num")
            num.innerHTML = (num0 !== undefined) ? num0 : 0;
            num.id = id + "-" + "num"            
            
            var menu = self.__createMenu({
                "Basic":{
                    "Edit baord name": {
                        "Event": "click",
                        "Handler": function () {
                            self.redraw()
                        }
                    },
                    "Delete": {
                        "Event": "click",
                        "Handler": function () {
                            self.redraw()
                        }
                    }
                }
            })

            var add = self.__createAddButton(function () {
                self.__showNewCardForm(id)                
            })

            header.appendChild(title)
            header.appendChild(num)
            header.appendChild(menu)
            header.appendChild(add)

            return header
        }
        
        this.__updateBoardHeader = function(title, num){
            
        }

        this.__createBoard = function(content){

            // Create Header
            name = content["BoardName"]
            id   = content["BoardID"]
            con  = content["Contents"]

            num  = con.length
            
            var h = self.__assembleBoardHeader(id, name, num)
            
            // Create board
            var div0 = document.createElement('div')
            div0.id = id
            div0.classList.add("kanbansys-style-kanban")
            div0.appendChild(h)

            var body = document.createElement('div')
            body.classList.add("kanbansys-style-kanban-body")
            body.id = id + "-board"

            t = self.config.structre.defaultAssemblerType

            var doms = []
            // TODO : assembler 
            if(t == "simple"){
                doms = self.__assemblerType0(con)                
            }else if(t == "issue"){
                doms = self.__assemblerType1(con)     
            }else if(t == "image"){
                doms = self.__assemblerType2(con)     
            }else if(t == "simpleLink"){
                doms = self.__assemblerType3(con)     
            }else if(t == "issueLink"){
                doms = self.__assemblerType4(con)     
            }else if(t == "imageLink"){
                doms = self.__assemblerType5(con)     
            }else{
                if(originalAssembler !== null){
                    doms = self.originalAssembler(con)     
                }else{
                    console.log("[ERROR] originalAssembler was not seted.")
                }
            }

            var n0 = 0
            doms.forEach((dom) => {
                var card = self.__createCard(id, dom, con[n0])
                n0++ 
                body.appendChild(card)
            })

            div0.appendChild(body)
            return div0
        }
        
        this.__assembleKanban = function(){
            
        }

        this.updateFromServer = function(){
            
        }

        this.sendToServer = function(){
            
        }
        
        this.redraw = function(){
            if( self.config.server.autoUpload ) {
                self.sendToServer()
            }
            
            // re-draw
            let kanban = document.getElementById(self.config.kanbanId)
            kanban.remove()
            self.init()
        }

        this.generateMenuUI = function(content){
            return self.__createMenu(content)
        }

        this.removeCard = function(id){
            
        }

        this.removeBoard = function(id){
            
        }
        
        this.setTheme = function(themeName){
            self.theme = themeName
            self.redraw()
        }
        
        this.addCard = function(boardID, content){
            self.kanbanDataOld = self.kanbanData
            
            var ary = self.kanbanData
            len = self.kanbanData.length

            for(let i=0; i<len; i++){
                if(ary[i]["BoardID"] == boardID){
                    self.kanbanData[i]["Contents"].push(content)
                    self.redraw()
                    return
                }
            }            
        }

        this.addBoard = function(boardName, boardID, contents){
            self.kanbanDataOld = self.kanbanData
            
            self.kanbanData.push({
                BoardName: boardName,
                BoardID:   boardID,
                Contents: contents
            })
            
            self.redraw()
        }
        
        this.__dragFisrt = function(e) {
            self.x = e.clientX - this.offsetLeft
            self.y = e.clientY - this.offsetTop
            self.h = this.clientHeight
            self.src = e.target;
            self.src.classList.add("kanbansys-event-drag")
            e.dataTransfer.effectAllowed = "move";
            this.clientHeight = 0
            self.mec = this.cloneNode(true)
            self.me  = this
            self.board = null
            for(let i=0; i<e.path.length-2; i++){
                if(e.path[i].classList.contains("kanbansys-event-board")){
                    self.board = e.path[i];
                    break;
                }
            }
            self.mec.id = "tmp00-"  + self.me.id
            // e.dataTransfer.setData("text/plain", e.target.innerHTML);
        }

        this.__dragOver = function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.dataTransfer.dropEffect = "move";            
            let cnt = 0;
            for(let i=0; i<e.path.length-2; i++){
                cnt = i;
                if(e.path[i].classList.contains("kanbansys-event-card")){
                    let oy = e.path[i].offsetTop + e.path[i].clientHeight / 2.0;
                    let my = e.clientY - self.y + self.h / 2.0
                    if(oy > my){                        
                        if(self.me !== null && self.me !== undefined){
                            e.path[i].before(self.mec)
                            self.me.style.display = "none";

                            if(e.path[i].id.slice(0, 5) != "tmp00"){
                                self.before = e.path[i].id
                            }
                        }
                        
                    }else{
                        if(self.me !== null && self.me !== undefined){
                            e.path[i].after(self.mec)
                            self.me.style.display = "none";
                            if(e.path[i].id.slice(0, 5) != "tmp00"){
                                self.after = e.path[i].id
                                console.log(self.after)
                            }
                        }                       
                    }
                    break
                }
            }

            if(cnt == e.path.length-3){
                for(let i=0; i<e.path.length-2; i++){
                    if(e.path[i].classList.contains("kanbansys-event-board")){
                        let my = e.clientY - self.y + self.h / 2.0
                        let bd =  e.path[i].offsetTop + e.path[i].clientHeight / 2.0
                        if(bd > my){
                            if(self.me !== null && self.me !== undefined){
                                e.path[i].getElementsByClassName("kanbansys-style-kanban-body")[0].prepend(self.mec)
                                self.me.style.display = "none";
                            }     
                        }else{
                            if(self.me !== null && self.me !== undefined){
                                e.path[i].getElementsByClassName("kanbansys-style-kanban-body")[0].appendChild(self.mec)
                                self.me.style.display = "none";
                            }
                        }
                    }
                }
            }

            console.log(self.me.dataset.data)
            
        }

        this.__mouseUp = function(e) {
            if(self.src === null || self.src === undefined) return
            if(self.src.classList.contains("kanbansys-event-drag"))  self.src.classList.remove("kanbansys-event-drag")

            self.me.style.display = "block";
            
            let tmp = document.getElementById(self.mec.id)
            if(tmp !==undefined && tmp !== null) tmp.remove();
        }

        this.__addDataTop = function(boardID, content){
            self.kanbanData.forEach((data) => {
                if(data["BoardID"] == boardID){
                    data["Contents"].unshift(content)
                    //                    console.log("AT",data["Contents"])
                }
            })
        }

        this.__addDataBottom = function(boardID, content){
            self.kanbanData.forEach((data) => {
                if(data["BoardID"] == boardID){
                    data["Contents"].push(content)
                    //                    console.log("AB",data["Contents"])
                }
            })
        }

        this.__searchData = function(boardID, cardID){
            console.log(boardID, cardID)
            var b0 = 0
            var c0 = 0

            len0 = self.kanbanData.length
            for(let j=0; j<len0; j++){
                data = self.kanbanData[j]
                len = data["Contents"].length
                for(let i=0; i<len; i++){
                    if(cardID  == data["Contents"][i]["id"] + "-card"){
                        c0 = i
                        b0 = j
                        break;
                    }
                }
            }
            

            return {"boardIndex": b0, "cardIndex": c0}
        }
        
        this.__addDataAfter = function(boardID, cardID, content){
            var idxs = self.__searchData(boardID, cardID)
            console.log("add after", idxs)
            self.kanbanData[idxs["boardIndex"]]["Contents"].splice(idxs.cardIndex + 1, 0, content) // Insert    
        }

        this.__addDataBefore = function(boardID, cardID, content){
            var idxs = self.__searchData(boardID, cardID)
            console.log("add before", idxs)
            self.kanbanData[idxs["boardIndex"]]["Contents"].splice(idxs.cardIndex - 1, 0, content) // Insert   
        }

        this.__deleteData = function(boardID, cardID){
            var idxs = self.__searchData(boardID, cardID)
            console.log("delete", idxs)
            self.kanbanData[idxs["boardIndex"]]["Contents"].splice(idxs.cardIndex, 1) // Delete
        }        
        
        this.__dragEnd = function(e) {
            console.log("Drop")
            e.preventDefault();
            e.stopPropagation();
            
            var board = null
            console.log(e.path)
            for(let i=0; i<e.path.length-2; i++){
                if(e.path[i].classList.contains("kanbansys-event-board")){
                    board = e.path[i];
                    console.log(board, "now")
                    break;
                }
            }

            if(board === null || board === undefined){
                let tmp = document.getElementById(self.mec.id)
                if(tmp !==undefined && tmp !== null) tmp.remove();
                
                self.me.style.display = "block";                      
                self.src = null
                return
            }
            
            let cnt = 0;
            for(let i=0; i<e.path.length-2; i++){
                cnt = i;
                if(e.path[i].classList.contains("kanbansys-event-card")){
                    let oy = e.path[i].offsetTop + e.path[i].clientHeight / 2.0;
                    let my = e.clientY - self.y + self.h / 2.0
                    self.__deleteData(self.board.id, self.me.id)                    
                    if(oy > my){
                        //console.log(e.path[i].id , "より上")
                        console.log("add before", board.id, e.path[i].id, JSON.parse(self.me.dataset.data))
                        if(e.path[i].id.slice(0, 5) == "tmp00"){
                            self.__addDataBefore(board.id, self.before, JSON.parse(self.me.dataset.data))      
                        }else{
                            self.__addDataBefore(board.id, e.path[i].id, JSON.parse(self.me.dataset.data))                
                        }
                    }else{
                        //console.log(e.path[i].id + "より下")
                        console.log("add after", board.id, e.path[i].id, JSON.parse(self.me.dataset.data))
                        if(e.path[i].id.slice(0, 5) == "tmp00"){
                            self.__addDataBefore(board.id, self.after, JSON.parse(self.me.dataset.data))    
                        }else{
                            self.__addDataAfter(board.id, e.path[i].id, JSON.parse(self.me.dataset.data))
                        }
                        self.redraw()                                            
                        break
                    }
                }
            }

            
            if(cnt == e.path.length-3){
                let my = e.clientY - self.y + self.h / 2.0
                let bd = board.offsetTop + board.clientHeight / 2.0
                self.__deleteData(self.board.id, self.me.id)                    
                if(bd > my){
                    //console.log(board.id , "の一番上")
                    console.log("add top", board.id, JSON.parse(self.me.dataset.data))
                    self.__addDataTop(board.id, JSON.parse(self.me.dataset.data))
                }else{
                    // console.log(board.id + "の一番下")
                    console.log("add bottom", board.id, JSON.parse(self.me.dataset.data))
                    self.__addDataBottom(board.id, JSON.parse(self.me.dataset.data))
                }                
            }

            
            let tmp = document.getElementById(self.mec.id)
            if(tmp !==undefined && tmp !== null) tmp.remove();

            self.src = null
            //            console.log("result", self.kanbanData)
            self.redraw()   
        }
        
        this.__dndRegs = function(){
            
            var co = document.getElementsByClassName("kanbansys-style-item");
            //console.log(co)
            for(var i = 0; i < co.length; i++) {
                co[i].draggable="true"
                co[i].addEventListener('dragstart', self.__dragFisrt, false)                
            }          

            //kanbansys-style-kanban
            var es = document.getElementsByClassName("kanbansys-style-kanban-body");
            for(var i = 0; i < es.length; i++) {
                es[i].draggable="false"
                es[i].addEventListener('dragover',  self.__dragOver,  false)
                es[i].addEventListener('drop',      self.__dragEnd,   false)                
            }

            var es = document.getElementsByClassName("kanbansys-style-kanban");
            for(var i = 0; i < es.length; i++) {
                es[i].draggable="false"
                es[i].addEventListener('dragover',  self.__dragOver,  false)
                es[i].addEventListener('drop',      self.__dragEnd,   false)
            }

            document.getElementsByTagName('html')[0].addEventListener('dragover', function(e){
                e.preventDefault();
            })

            document.getElementsByTagName('html')[0].addEventListener('drop', function(e){
                e.preventDefault();
            })
            
            document.getElementsByTagName('html')[0].addEventListener('mouseup', self.__mouseUp, false)  

        }
        
        this.init = function(){
            var elem = document.getElementById(self.config.targetElementId)        
            if(elem !== undefined && elem !== null){
                var kanban = document.createElement('div')
                kanban.id = self.config.kanbanId
                if(self.theme == "dark"){
                    kanban.classList.add("kanbansys-theme-dark")
                }else{
                    kanban.classList.add("kanbansys-theme-light")
                }
                kanban.classList.add("kanbansys-style-kanban-area")

                let b_num = self.kanbanData.length
                for(let i=0; i<b_num; i++){
                    c = self.kanbanData
                    var board = self.__createBoard(c[i])
                    if(i<b_num-1){
                        board.classList.add("kanbansys-style-right-margin-10")                       
                    }
                   
                    board.classList.add("kanbansys-event-board")                       
                    kanban.appendChild(board)
                }
                
                elem.appendChild(kanban)
            }
            self.__dndRegs()
        }

        
        // init
        self.kanbanData    = self.config.content
        self.kanbanDataOld = self.config.content
        this.theme         = self.config.defaultUI.theme        
        this.init()
    }    
})()
