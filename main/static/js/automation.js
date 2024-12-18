function getCSRFToken() {
    const csrfMetaTag = document.querySelector('meta[name="csrf-token"]');
    return csrfMetaTag ? csrfMetaTag.getAttribute('content') : null;
}

const index_container = document.querySelector('#index_container')

function on_get_by_selected(this_){
    console.log(this_.value)
    if (this_.value === 'Class Name'){
        index_container.classList.remove('hidden')
    }else{
        index_container.classList.add('hidden')
    }
}


const type = document.querySelector('#type')

function on_action_selected(this_){
    if (this_.value === 'click'){
        type.classList.add('hidden')
    }else{
        type.classList.remove('hidden')
    }
}

const tag_type = document.querySelector('#tag')
const tag_name = document.querySelector('#tag_name') 
const index_input = document.querySelector('#index_input')
async function test_step(){
    const csrf_token = getCSRFToken()
    const response = await fetch('/api/test', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : csrf_token
        },
        body : JSON.stringify({
            tag_name : tag_name.value,
            tag_type : tag_type.value,
            type : type.value,
            index : index_input.value
        })
    })
}