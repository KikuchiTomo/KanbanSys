(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

        this.__addDataTop = function(boardID, content){
            self.kanbanData.forEach((data) => {
                if(data["BoardID"] == boardID){
                    console.log("add top", boardID)
                    data["Contents"].unshift(content)
                    return
                    //                    console.log("AT",data["Contents"])
                }
            })
        }

        this.__addDataBottom = function(boardID, content){
            self.kanbanData.forEach((data) => {
                if(data["BoardID"] == boardID){
                    console.log("add bottom", boardID)
                    data["Contents"].push(content)
                    return
                    //                    console.log("AB",data["Contents"])
                }
            })
        }

        this.__calcHeightPosition = function(elem){
            let y = elem.offsetTop
            let h = elem.clientHeight

            return (y + h / 2.0)
        }
        
        this.__calcAllHeightPostion = function(boardData){
            self.kanbanPosition = []
            for(let i=0; i<boardData.length; i++){
                let board = boardData[i]
                let content = board["Contents"]
                var cardPos = []
                for(let j=0; j<content.length; j++){
                    let card = document.getElementById(content[j].id)
                    let pos  = self.__calcHeightPosition(card)

                    cardPos.push({
                        "id": card.id,
                        "pos": pos
                    })                    
                }

                self.kanbanPosition.push({
                    "BoardID": board["BoardID"],
                    "ContentsPosition": cardPos
                })
            }
            return self.kanbanPosition
        }
        
        this.__calcInsertIndex = function(event, boardID){
            var nd = self.__getBoardData()
            console.log(nd)
            var pd = self.__calcAllHeightPostion(nd)
            var bpos = document.getElementById(self.config.kanbanId).offsetTop
            var ppos = bpos
            
            var insertTargetId = null
            var insertAfter = false
            
            for(let i=0; i<pd.length; i++){
                if(pd[i]["BoardID"] !== boardID) continue;
                let poss = pd[i]["ContentsPosition"]
                
                for(let j=0; j<poss.length; j++){
                    var id  = poss[j]["id"]
                    var pos = poss[j]["pos"]

                    var nowpos = event.clientY - self.y + self.h / 2.0

                    if(ppos < nowpos && pos > nowpos){
                        insertTargetId = poss[j]["id"]
                        insertAfter = false
                        break
                    }else{
                        insertTargetId = poss[j]["id"]
                        insertAfter = true                        
                    }

                    ppos = pos
                }                
            }

            
            console.log((insertAfter)? "after" : "before", insertTargetId)
            return {"boardID": boardID, "cardID" : insertTargetId, "isAfter": insertAfter}
        }

        this.__getBoardData = function(){
            var k0 = document.getElementById(self.config.kanbanId)
            if(k0 !== null && k0 !== undefined){
                var data = []
                var b0 = document.querySelectorAll("#" + self.config.kanbanId + " .kanbansys-event-board")
                // Board
                for(let i=0; i<b0.length; i++){
                    var c0 = document.querySelectorAll("#" + b0[i].id + "-board .kanbansys-event-card")
                    // Card
                    c0 = [].slice.call(c0); // Convert to Array
                    var cards = []
                    for(let j=0; j<c0.length; j++){
                        cards.push(JSON.parse(c0[j].dataset.data))
                    }
                    data.push({
                        "BoardID": b0[i].id,
                        "BoardName" : document.getElementById(b0[i].id + "-title").innerHTML,
                        "Contents" : cards
                    })
                }
                return data
                
            }
            return null
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

        this.__getBoardIDFromEvent = function(e){
            for(let i=0; i<e.path.length-2; i++){
                if(e.path[i].classList.contains("kanbansys-event-board")){
                    return e.path[i].id
                    break;
                }
            }
        }
        
        this.__addDataAfter = function(boardID, cardID, content){
            var idxs = self.__searchData(boardID, cardID)
            console.log("add after", idxs)
            self.kanbanData[idxs["boardIndex"]]["Contents"].splice(idxs.cardIndex + 1, 0, content) // Insert    
        }

        this.__addDataBefore = function(boardID, cardID, content){
            var idxs = self.__searchData(boardID, cardID)
            console.log("add before", idxs)
            self.kanbanData[idxs["boardIndex"]]["Contents"].splice(idxs.cardIndex, 0, content) // Insert   
        }

        this.__deleteData = function(boardID, cardID){
            var idxs = self.__searchData(boardID, cardID)
            console.log("delete", idxs)
            self.kanbanData[idxs["boardIndex"]]["Contents"].splice(idxs.cardIndex, 1) // Delete
        }        

        this.__dragFisrt = function(e) {
            e.dataTransfer.effectAllowed = "move";

            self.x = e.clientX - this.offsetLeft
            self.y = e.clientY - this.offsetTop
            self.h = this.clientHeight
            this.clientHeight = 0
            
            self.dragTargetElem  = this
            self.dragStartBoard = null

            // Get board
            for(let i=0; i<e.path.length-2; i++){
                if(e.path[i].classList.contains("kanbansys-event-board")){
                    self.dragStartBoard = e.path[i];
                    break;
                }
            }

            self.dragTargetElemClone = this.cloneNode(true)            
            self.dragTargetElemClone.id = "kanbansys-tmp00"
            self.dragTargetElemClone.classList.remove("kanbansys-event-board")
            self.dragTargetElemClone.classList.add("kanbansys-event-tmp-insert")
            self.dragTargetElem.classList.add("kanbansys-event-dragging")            
        }
        

        this.__dragOver = function(e) {
            e.preventDefault();
            e.stopPropagation();
            e.dataTransfer.dropEffect = "move";
            if(self.timerId != null) window.clearTimeout(self.timerId)
            
            self.timerId = window.setTimeout(function(){
                if( self.dragTargetElem.classList.contains("kanbansys-event-dragging")){
                    self.dragTargetElem.classList.remove("kanbansys-event-dragging")
                }

                let tmp = document.getElementById("kanbansys-tmp00")
                if(tmp !== undefined && tmp !== null){
                    tmp.remove()
                }
            }, 1000)

            // boardID = self.__getBoardIDFromEvent(e)
            //let target = self.__calcInsertIndex(e, boardID)

            console.log("From : ", self.dragTargetElem.id )
            // tmp Insert
            
            
        }

        this.__mouseUp = function(e) {
            
        }
        
        this.__dragEnd = function(e) {
            console.log("Drop")
            e.preventDefault();
            e.stopPropagation();

            boardID = self.__getBoardIDFromEvent(e)
            let target = self.__calcInsertIndex(e, boardID)
            
            cardID = target.cardID + "-card"
            content = JSON.parse(self.dragTargetElem.dataset.data);

            if(self.dragTargetElem !== undefined &&
               self.dragTargetElem !== null      &&
               self.dragStartBoard !== undefined &&
               self.dragStartBoard !== null) {
                self.__deleteData(self.dragStartBoard.id, self.dragTargetElem.id)
            }else{
                console.log("[ERROR] Failed to delete drag element from data.")
            }

            if(target.cardID !== null){
                if(target.isAfter){
                    self.__addDataAfter(target.boardID, cardID, content)
                }else{
                    self.__addDataBefore(target.boardID, cardID, content)
                }
            }else{
                self.__addDataTop(target.boardID, content)
            }
            
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
        self.kanbanPosition= []
        self.timerId       = null
        this.theme         = self.config.defaultUI.theme        
        this.init()
        console.log(self.__getBoardData())
    }    
})()

},{}]},{},[1]);
