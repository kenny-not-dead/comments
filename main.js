
const form = document.forms.comment;
      nameForm = form.name;
      commentForm = form.comment;
      dateForm = form.date;

const commentlist = document.querySelector('.comments');
      wrongName = document.querySelector('.wrongName');
      wrongText = document.querySelector('.wrongText');

let deleteIcons;
let likeIcon;


let commentsData = [
    {id: 1, name: 'Роман', comment: 'Мой комментарий и ничего лишнего', date: '2023-03-04', time: '10:00', like: true},
    {id: 2, name: 'Роман', comment: 'Мой второй коммент и ничего лишнего', date: '2023-03-05', time: '10:00', like: false},
    {id: 3, name: 'Роман', comment: 'Мой второй коммент и ничего лишнего', date: '2023-03-01', time: '10:00', like: false}
]

let setDates = (date, step) => {
        
    if(typeof step == 'undefined')
        {step = 0}

    let month = date.getUTCMonth() + 1; 
        day = date.getUTCDate() - step;
        year = date.getUTCFullYear();

        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;  

    return year + "-" + month + "-" + day;   
}

let getId = () => {
    return Math.floor(Math.random() * 9999999999999)
}


let loadData = () => {
    
    let date = new Date ()
        today = setDates(date)
    let yesterday = setDates(date, 1)

    commentlist.innerHTML = commentsData.map(i =>
    `<li class="comment">
        <div class="nameinfo">
            <p> ${i.name} </p>
            <span class="delete" id=${i.id}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                </svg>
            </span>
        </div>
        <p class="textcomment">${i.comment}</p>
        <div class="dateinfo">
            <p>${i.date == today ? 'сегодня' : i.date == yesterday ? 'вчера' : i.date }, ${i.time}</p>
            <span class="like" id=${i.id}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill=${i.like ? 'red' : 'currentColor'} class="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                  </svg>
            </span>
        </div>
    </li>`).join("");  
   
    deleteIcons = document.querySelectorAll('.delete')
    likeIcon = document.querySelectorAll('.like')


    deleteIcons.forEach( el => {
        el.addEventListener('click', 
            function (e) {
            e.preventDefault();
            commentsData = commentsData.filter(i => { return i.id != el.id})
            loadData()
            }
        )
    })
    
    likeIcon.forEach( el => {
        el.addEventListener('click', 
            function (e) {
            e.preventDefault();
            let index = commentsData.findIndex(e => 
                e.id == el.id 
            )
            commentsData[index].like ? commentsData[index].like = false : commentsData[index].like = true
            loadData()
            }
        )   
    })


}

loadData()


nameForm.addEventListener('keydown', () => {
    wrongName.innerHTML = ''
})

commentForm.addEventListener('keydown', () => {
    wrongText.innerHTML = ''
})



form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (nameForm.value.length == 0) {
        wrongName.innerHTML = 'Имя не может быть пустым'
    } else if (commentForm.value.length == 0) {
        wrongText.innerHTML = 'Комментарий не может быть пустым'
    } else {
    let date = new Date()

    let hours = date.getHours()
    let minuts = date.getMinutes()
    let time = hours + ':' + minuts
        
    
    if(dateForm.value == '') {
        dateForm.value = setDates(date)
    }
    
    let id = getId()
    

    commentsData.push({
        id: id, 
        name: nameForm.value,
        comment: commentForm.value,
        date: dateForm.value,
        time: time,
        like: false
    })

    nameForm.value = ''
    commentForm.value = ''
    dateForm.value = ''


    loadData()
    }
})




