function indexPage(){
    const indexButton = document.getElementById('index')
    const newButton = document.getElementById('newtab')
    var targetArea = document.querySelector('.targetArea')

    const createIndexPage = document.createElement('div')
    createIndexPage.className = 'targetArea'
    createIndexPage.id = 'targetArea'
//page layout
    const indexPageMain = document.getElementById('targetArea')
    
    indexPageMain.innerHTML = (
    `<div class = 'contactList' id = 'contactList'>
        Contact List
    </div>
    <div class = 'headings'>
        <span class = 'num'>#</span>
        <span class = 'Name'>Name</span>
        <span class = 'Email'>Email</span>
        <span class = 'Phone'>Phone</span>
    </div>`
    )
//start counter
    var idCounter = 1
    for(var i =0; i < localStorage.length; i++) {
        var targetData = JSON.parse(localStorage.getItem(localStorage.key(i)))

        var rowDiv = document.createElement('div')
        rowDiv.id = `rowDiv${idCounter}`
        rowDiv.className = 'rowDiv'

        //for row numbers
        var numSpan = document.createElement('span')
        numSpan.className = 'numSpan'
        numSpan.id = `numSpan${idCounter}`
        //for row names
        var nameSpan = document.createElement('span')
        nameSpan.className = 'nameSpan'
        //for row emails
        var emailSpan = document.createElement('span')
        emailSpan.className = 'emailSpan'
        //for row phone numbers
        var phoneSpan = document.createElement('span')
        phoneSpan.className = 'phoneSpan'

        //append local storage values to spans
        numSpan.append(targetData.indexNum)
        nameSpan.append(targetData.nameInfo)
        emailSpan.append(targetData.emailInfo)
        phoneSpan.append(targetData.phoneInfo)

        //create span for buttons
        var buttonSpan = document.createElement('div')
        buttonSpan.className = 'indexButtonSpan'

        //create details button
        var detailsButton = document.createElement('input')
        detailsButton.type = 'button'
        detailsButton.id = `detailsButton${idCounter}`
        detailsButton.className = 'detailsButton'
        detailsButton.value = 'DETAILS'

        //create edit button
        var editButton = document.createElement('input')
        editButton.type = 'button'
        editButton.id = 'editButton'
        editButton.className = 'editButton'
        editButton.value = 'EDIT'

        //create delete button
        var deleteButton = document.createElement('input')
        deleteButton.type = 'button'
        deleteButton.id = 'deleteButton'
        deleteButton.className = 'deleteButton'
        deleteButton.value = 'DELETE'

        //append to button span
        buttonSpan.append(detailsButton)
        buttonSpan.append(editButton)
        buttonSpan.append(deleteButton)
        rowDiv.append(numSpan)
        rowDiv.append(nameSpan)
        rowDiv.append(emailSpan)
        rowDiv.append(phoneSpan)
        rowDiv.append(buttonSpan)
        rowDiv.append(document.createElement('br'))
        //append one row to index table
        indexPageMain.append(rowDiv)
    
        var recordInfo = {
            indexNum : targetData.indexNum,
            nameInfo : targetData.nameInfo,
            emailInfo : targetData.emailInfo,
            phoneInfo : targetData.phoneInfo
        }
        detailsButton.addEventListener('click',function(e){
            var parentRow = e.target.parentNode.parentNode
            var targetIndex = parentRow.children[0].innerHTML
            detailsPage(findRecord(targetIndex))
        })
        editButton.addEventListener('click',function(e){
            var parentRow = e.target.parentNode.parentNode
            var targetIndex = parentRow.children[0].innerHTML
            editPage(findRecord(targetIndex))
        })
        deleteButton.addEventListener('click',function(e){
            var parentRow = e.target.parentNode.parentNode
            parentRow.style.backgroundColor = 'lightgray'
            var deleteButton = e.target
            deleteButton.style.backgroundColor = 'rgba(255, 33, 33, 0.692)'
            deleteButton.style.color = 'white'
            deleteButton.style.fontWeight = 'bold'
            const iNum = e.target.parentNode.parentNode.children[0].innerHTML
            setTimeout(function(){removeItem(iNum,parentRow,deleteButton)}, 10)  
        })
        idCounter++
    }
}
indexPage();

var highestIndexNum = 0
//declare top header buttons
const newButton = document.getElementById('newtab')
const indexButton = document.getElementById('index')
//declare node
content = document.getElementById('content')

//add new contact 
newButton.addEventListener('click', function(e){
    const indexButton = document.getElementById('index')
    indexButton.style.backgroundColor = 'rgb(0, 152, 253)'
    indexButton.style.color = 'lightgray'
    indexButton.style.borderColor = 'lightgray'
    const newButton = document.getElementById('newtab')
    newButton.style.color = 'white'
    newButton.style.borderColor = 'white'
    newButton.style.backgroundColor = 'rgb(0, 173, 253)'

    const oldDiv = document.querySelector('.targetArea')
   
    const NewContactDiv = document.createElement('div')
    NewContactDiv.className = 'newContact'
    const NewContactText = document.createTextNode('New Contact')
    NewContactDiv.append(NewContactText)
//name form
    var nameForm = document.createElement('input')
    nameForm.id = 'nameForm'
    nameForm.type = 'text'
    const nameLabel = document.createElement('div')
    nameLabel.className = 'formLabels'
    nameLabel.innerHTML = 'Name:'
//email form
    const emailForm = document.createElement('input')
    emailForm.id = 'emailForm'
    emailForm.type = 'text'
    const emailLabel = document.createElement('div')    
    emailLabel.className = 'formLabels'
    emailLabel.innerHTML = 'Email:'
//phone form
    const phoneForm = document.createElement('input')
    phoneForm.id = 'phoneForm'
    phoneForm.type = 'text'
    const phoneLabel = document.createElement('div')
    phoneLabel.className = 'formLabels'
    phoneLabel.innerHTML = 'Phone:'
//submit button
    const submitButton = document.createElement('input')
    submitButton.type = 'button'
    submitButton.value = 'Submit'
    submitButton.id = 'submitButton'

    const forms = document.createElement('div')
    forms.className = 'forms'

    const mainDiv = document.createElement('div')
        mainDiv.id = 'targetArea'
        mainDiv.className = 'targetArea'

    content.replaceChild(mainDiv, oldDiv)
    mainDiv.append(NewContactDiv)
    forms.append(nameLabel)
    forms.append(nameForm)
    forms.append(emailLabel)
    forms.append(emailForm)
    forms.append(phoneLabel)
    forms.append(phoneForm)
    forms.append(document.createElement('br'))
    forms.append(submitButton)   
    mainDiv.append(forms)

    //insert submit button
    const name = document.getElementById('nameForm')
    const email = document.getElementById('emailForm')
    const phone = document.getElementById('phoneForm')

    submitButton.onclick = function(){
        const nameVal = name.value
        const emailVal = email.value
        const phoneVal = phone.value
    //name pattern check
        const nameRegEx = /^./
        const nameTest = nameRegEx.test(nameVal)
        var nameError = ''
    //email pattern check
        const emailRegEx = /.+@.+\..+/
        const emailTest = emailRegEx.test(emailVal)
        var emailError = ''
    //phone pattern check
        const phoneRegEx = /^[2-9][0-9]{9}$/
        const phoneTest = phoneRegEx.test(phoneVal)
        var phoneError = ''

        const userInfo = {
            indexNum : 0,
            nameInfo : nameVal,
            emailInfo : emailVal,
            phoneInfo : phoneVal
        }
        if (nameTest === false){
            var nameError = 'Invalid name. '
        }
        if (emailTest === false){
            var emailError = 'Invalid email address. '
        }
        if (phoneTest === false){
            var phoneError = 'Invalid phone number. '
        }
        var errorMsg = nameError + emailError + phoneError
        if (errorMsg === ''){
            if (localStorage.length = 0){
                DBindexKey = 1
                userInfo.indexNum = 1
            }
            else{
                for(var i =0; i < localStorage.length; i++){  
                    var targetData = JSON.parse(localStorage.getItem(localStorage.key(i)))
                    if (targetData.indexNum > highestIndexNum){highestIndexNum = targetData.indexNum}
                    
                }
                DBindexKey = Number(highestIndexNum) + 1
                userInfo.indexNum = Number(highestIndexNum) + 1
            }
            localStorage.setItem(DBindexKey, JSON.stringify(userInfo))
            detailsPage(userInfo);
        }
        else{
            alert(errorMsg)
        }
    }
})
// view details of contact
function detailsPage(userInfo){ 
    const indexButton = document.getElementById('index')
    indexButton.style.backgroundColor = 'rgb(0, 152, 253)'
    indexButton.style.color = 'lightgray'
    indexButton.style.borderColor = 'lightgray'
    const newButton = document.getElementById('newtab')
    newButton.style.backgroundColor = 'rgb(0, 152, 253)'
    newButton.style.color = 'lightgray'
    newButton.style.borderColor = 'lightgray'
    var replaceDiv = document.querySelector('.targetArea')
    const displayInfoDiv = document.createElement('div')
    displayInfoDiv.id = 'targetArea'
    displayInfoDiv.className = 'targetArea'
    content.replaceChild(displayInfoDiv, replaceDiv)
    //create contact heading
    const contactHeading = document.createElement('div')
    contactHeading.id = 'contactHeadingDiv'
    const contactText = document.createTextNode('Contact #')
    contactHeading.append(contactText) 
    const cIndexNum = userInfo.indexNum
    contactHeading.append(cIndexNum)

    //create name div
    const cName = document.createElement('div')
    cName.className = 'labels'
    const cNameText = document.createTextNode('Name: ')
    cName.append(cNameText)
    const dNameSpan = document.createElement('span')
    dNameSpan.className = 'values'
    dNameSpan.append(userInfo.nameInfo)
    cName.append(dNameSpan)
    //create email div
    const cEmail = document.createElement('div')
    cEmail.className = 'labels'
    const cEmailText = document.createTextNode('Email: ')
    cEmail.append(cEmailText)
    const dEmailSpan = document.createElement('span')
    dEmailSpan.className = 'values'
    dEmailSpan.append(userInfo.emailInfo)
    cEmail.append(dEmailSpan)
    //create phone div
    const cPhone = document.createElement('div')
    cPhone.className = 'labels'
    const cPhoneText = document.createTextNode('Phone: ')
    cPhone.append(cPhoneText)
    const dPhoneSpan = document.createElement('span')
    dPhoneSpan.className = 'values'
    dPhoneSpan.append(userInfo.phoneInfo)
    cPhone.append(dPhoneSpan)
    //create edit button
    const detailEditButton = document.createElement('input')
    detailEditButton.type = 'button'
    detailEditButton.value = 'EDIT'
    detailEditButton.className = 'detailEditButton'
    detailEditButton.id = 'detailEditButton'
    //create delete button
    const detailDeleteButton = document.createElement('input')
    detailDeleteButton.type = 'button'
    detailDeleteButton.value = 'DELETE'
    detailDeleteButton.className = 'deleteButton'
    detailDeleteButton.id = 'detailDeleteButton'
    const detailsContent = document.createElement('div')
    detailsContent.className = 'detailsContent'
    displayInfoDiv.append(contactHeading)
    detailsContent.append(cName)
    detailsContent.append(cEmail)
    detailsContent.append(cPhone)
    displayInfoDiv.append(detailsContent)

    const detailsButton = document.createElement('div')
    detailsButton.className = 'detailsButton'
    detailsButton.append(detailEditButton)
    detailsButton.append(detailDeleteButton)
    displayInfoDiv.append(detailsButton)
    detailEditButton.addEventListener('click', function(e){
        const iNum = document.getElementById('contactHeadingDiv').childNodes[1].nodeValue
        const subUserInfo = {
            indexNum : iNum,
            nameInfo : userInfo.nameInfo,
            emailInfo : userInfo.emailInfo,
            phoneInfo : userInfo.phoneInfo }
        editPage(subUserInfo)
    })
    detailDeleteButton.addEventListener('click', function(e){
        const iNum = document.getElementById('contactHeadingDiv').childNodes[1].nodeValue
        const deleteButton = e.target
        deleteButton.style.backgroundColor = 'rgba(255, 33, 33, 0.692)'
        deleteButton.style.color = 'white'
        deleteButton.style.fontWeight = 'bold'
        setTimeout(function(){removeItem(iNum,undefined,deleteButton)},10)
    })
}
//edit contact 
function editPage(userInfo){
    const indexButton = document.getElementById('index')
    indexButton.style.backgroundColor = 'rgb(0, 152, 253)'
    indexButton.style.color = 'lightgray'
    indexButton.style.borderColor = 'lightgray'
    const newButton = document.getElementById('newtab')
    newButton.style.backgroundColor = 'rgb(0, 152, 253)'
    newButton.style.color = 'lightgray'
    newButton.style.borderColor = 'lightgray'

    var replaceDiv = document.querySelector('.targetArea')
    const displayInfoDiv = document.createElement('div')
    displayInfoDiv.id = 'targetArea'
    displayInfoDiv.className = 'targetArea'
    content.replaceChild(displayInfoDiv, replaceDiv)
    //create contact heading
    const contactHeading = document.createElement('div')
    contactHeading.id = 'contactHeadingDiv'
    const contactText = document.createTextNode('Edit Contact #')
    contactHeading.append(contactText)

    const cIndexNum = userInfo.indexNum
    contactHeading.append(cIndexNum)

    const editContent = document.createElement('div')
    editContent.className = 'editContent'
    //create name div
    const cName = document.createElement('div')
    cName.className = 'labels'
    const cNameText = document.createTextNode('Name: ')
    cName.append(cNameText)

    const cNameInputField = document.createElement('input')
    cNameInputField.value = userInfo.nameInfo
    cNameInputField.id = 'cNameInputField'
    cNameInputField.className = 'cNameInputField'
    //email div
    const cEmail = document.createElement('div')
    cEmail.className = 'labels'
    const cEmailText = document.createTextNode('Email: ')
    cEmail.append(cEmailText)

    const cEmailInputField = document.createElement('input')
    cEmailInputField.value = userInfo.emailInfo
    cEmailInputField.id = 'cEmailInputField'
    cEmailInputField.className = 'cEmailInputField'
    //create phone div
    const cPhone = document.createElement('div')
    cPhone.className = 'labels'
    const cPhoneText = document.createTextNode('Phone: ')
    cPhone.append(cPhoneText)

    const cPhoneInputField = document.createElement('input')
    cPhoneInputField.value = userInfo.phoneInfo
    cPhoneInputField.id = 'cPhoneInputField'
    cPhoneInputField.className = 'cPhoneInputField'
    //create submit button
    const editSubmitButton = document.createElement('input')
    editSubmitButton.type = 'button'
    editSubmitButton.value = 'Submit'
    editSubmitButton.className = 'editSubmitButton'
    editSubmitButton.id = 'editSubmitButton'

    displayInfoDiv.append(contactHeading)

    editContent.append(cName)
    editContent.append(cNameInputField)
    editContent.append(cEmail)
    editContent.append(cEmailInputField)
    editContent.append(cPhone)
    editContent.append(cPhoneInputField)
    editContent.append(document.createElement('br'))
    editContent.append(editSubmitButton)
    displayInfoDiv.append(editContent)

    //event listener
    editSubmitButton.addEventListener('click',function(e){
        const iNum = document.getElementById('contactHeadingDiv').childNodes[1].nodeValue
        const nameVal = cNameInputField.value
        //check name
        const nameRegEx = /^./
        const nameTest = nameRegEx.test(nameVal)
        var nameError = ''
        //check email
        const emailRegEx = /.+@.+\..+/
        const emailTest = emailRegEx.test(cEmailInputField.value)
        var emailError = ''
        //check phone 
        const phoneRegEx = /^[2-9][0-9]{9}$/
        const phoneTest = phoneRegEx.test(cPhoneInputField.value)
        var phoneError = ''
        const subUserInfo = {
            indexNum : iNum,
            nameInfo : nameVal,
            emailInfo : cEmailInputField.value,
            phoneInfo : cPhoneInputField.value }
        //display errors
        if (nameTest === false) {var nameError = 'Invalid name. '}
        if (emailTest === false) {var emailError = 'Invalid email address. '}
        if (phoneTest === false){var phoneError = 'Invalid phone number. '}

        var errorMsg = nameError + emailError + phoneError
        if (errorMsg === ''){
            localStorage.setItem(iNum, JSON.stringify(subUserInfo))
            detailsPage(subUserInfo) 
        }
        else{
            alert(errorMsg)
        }
    })
}

indexButton.addEventListener('click', function(e){
    var target = document.querySelector('.targetArea')
    indexPage(target);
})
//find records of contact
function findRecord(indexNumber){
    for(var i =0; i < localStorage.length; i++){
        //declare variables
        var targetData = JSON.parse(localStorage.getItem(localStorage.key(i)))
        var storageKeyNum = localStorage.key(i)
        matchedRecord = localStorage.getItem(storageKeyNum)
       
        if (indexNumber == storageKeyNum){
            ParsedMatchedRecord = JSON.parse(matchedRecord)
             return ParsedMatchedRecord
        }
        else{
            console.log('no match @ i = '+ i)
        }
    }
}
// delte contact 
function removeItem(indexNumber, parentRow, deleteButton){
    var confirmed = confirm('Are you sure?')
    if (confirmed){
        localStorage.removeItem(indexNumber)
        const target = document.querySelector('.targetArea')
        indexPage(target)
    }
    else {
        if(parentRow != undefined){
            parentRow.style.backgroundColor = 'white'
        }
        if(deleteButton != undefined){
            deleteButton.style.backgroundColor = 'white'
            deleteButton.style.fontWeight = 'normal'
            deleteButton.style.color = 'rgba(255, 33, 33, 0.692)'
        }
    }

}