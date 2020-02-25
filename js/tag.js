// Array from JSON file
var jsonData = [
    {
        "id": 1,
        "name": "WorldSkills",
        "color": "#9966ff"
    },
    {
        "id": 2,
        "name": "Web-Technologies",
        "color": "#3366ff"
    },
    {
        "id": 3,
        "name": "Development",
        "color": ""
    },
    {
        "id": 4,
        "name": "Design",
        "color": "#ff00ff"
    }
];

// Array store data parsed from JSON
var arrayData = [];
// Array store all selected tags 
var tags = [];

// Variable to store background color
// var colors = [];

var searchInput = document.getElementById('search-input');
var ul = document.getElementById('list');
var tagContainer = document.getElementById('tag-container');

function clickInput(){
    // When click input, show box shadow
    searchInput.addEventListener('click', function(){
        ul.style.display = 'block';
    })
}

function loadList(){
    // Convert from JSON into array
    arrayData = jsonData.map(function(item){  
        return Object.values(item)      
    })

    // Create a list
    arrayData.map(function(item){
        let li = document.createElement('li');
        let span = document.createElement('span');

        span.appendChild(document.createTextNode(item[1]));
        span.setAttribute('style','background:'+item[2])
        li.appendChild(span);
        ul.appendChild(li);
    })
}

function filterResult(){
    let filter = searchInput.value.toUpperCase();
    let li = ul.getElementsByTagName('li');

    for(var i = 0; i < li.length; i++)
    {
        var textValue = ul.getElementsByTagName('li')[i].innerText;
        if(textValue.toUpperCase().indexOf(filter) > -1)
        {
            li[i].style.display = "";
        }
        else
        {
            li[i].style.display = "none";
            // newTag();
        }
    }
}

function newTag(){
    let p = document.createElement('p');

    searchInput.onkeyup = function(){
        p.innerHTML = 'Create: ' + searchInput.value;
    }

    ul.appendChild(p);
    
}

function createTag(label){
    let div = document.createElement('div');
    div.setAttribute('class', 'tag');

    let span = document.createElement('span');
    span.innerHTML = label;

    let closeIcon = document.createElement('b');
    closeIcon.innerHTML = 'x';
    closeIcon.setAttribute('data-item', label);

    div.appendChild(span);
    span.appendChild(closeIcon);

    return div;
}

function addTag(){
    // Clear old tags
    document.querySelectorAll('.tag').forEach(tag => {
        tag.parentElement.removeChild(tag);
    });

    tags.slice().reverse().forEach(tag => {
        tagContainer.prepend(createTag(tag));
    });
}

function selectTag(){
    document.querySelectorAll('#list li').forEach(item => {
        item.addEventListener('click',(e)=>{
            tags.push(e.target.textContent);   
            // Add tag
            addTag();

            // currentColor = e.target.children[0].style.background;
            // var tagSpan = document.querySelectorAll('.tag');
            // tagSpan[tagSpan.length - 1].style.backgroundColor = currentColor;

        })
    });
}

function closeTag(){
    document.addEventListener('click', (e) => {
        if(e.target.tagName == 'B')
        {
            let label = e.target.getAttribute('data-item');
            let index = tags.indexOf(label);
            tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
            addTag();
        }
    });
}

function deleteTagByBackspace(){
    searchInput.addEventListener('keydown', function(e){
        let keyCode = e.keyCode;
        if(keyCode == 8)
        {
            tags.pop();
            var tag = document.querySelectorAll('.tag');
            tagContainer.removeChild(tag[tag.length - 1]);
        }
    })
}

clickInput();
loadList();
selectTag();
closeTag();
deleteTagByBackspace();