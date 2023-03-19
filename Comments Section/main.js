const commentForm = document.querySelector(".comments__form");
const commentsList = document.querySelector(".comments__list");
const commentMainInput = document.querySelector(".comments__form-text");
const nameInput = document.querySelector(".comments__form-name");
const dateInput = document.querySelector(".comments__form-date");
const textInput = document.querySelector(".comments__form-text");
let likeBtns = document.querySelectorAll(".comments__item-like");
let deleteBtns = document.querySelectorAll(".comments__item-delete");

let likeListenerFunc = function (e) {
  e.target.classList.toggle("comments__item-like--liked");
};

let deleteListenerFunc = function (e) {
  e.target.parentElement.parentElement.parentElement.remove();
};

function checkNameLength(name, maxLength) {
  if (name.length > maxLength)
    return `Максимальная длина имени ${maxLength} символов!`;
  if (name.length <= 0) return "Необходимо заполнить поле с именем!";
  return false;
}

function checkDateFormat(date) {
  if (
    /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(
      date
    ) != true &&
    date.length > 0
  ) {
    return "Дата должна быть записана в формате ДД.ММ.ГГГГ";
  }
  return false;
}

function checkCommentLength(comment) {
  if (comment.textLength == 0) {
    return "Поле с комментарием должно быть заполнено!";
  }
  return false;
}

function getDate(date) {
  let d = new Date(),
    h = (d.getHours() < 10 ? "0" : "") + d.getHours(),
    m = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes(),
    cDate = "",
    resString = "";
  if (date) {
    cDate = new Date(
      `${date[3]}${date[4]}/${date[0]}${date[1]}/${date.slice(6)}`
    );
  } else {
    return `сегодня, ${h}:${m}`;
  }
  let timeStamp = d.getTime() - cDate.getTime();
  if (timeStamp < 86400000 && timeStamp >= 0) resString = `сегодня, ${h}:${m}`;
  else if (timeStamp < 86400000 * 2 && timeStamp >= 0)
    resString = `вчера, ${h}:${m}`;
  else resString = `${date}, ${h}:${m}`;
  return resString;
}

function isFormInnerRight(name = null, date = null, comment = null) {
  let errors = false;
  let nameValid = name ? checkNameLength(name.value, 50) : null;
  let dateValid = date ? checkDateFormat(date.value) : null;
  let commentValid = comment ? checkCommentLength(comment) : null;
  if (nameValid) {
    name.classList.add("comments__form-input--err");
    let errMsg = document.querySelector("#inp_name-err");
    errMsg.innerText = nameValid;
    errors = true;
  } else if (nameValid != null) {
    name.classList.remove("comments__form-input--err");
    let errMsg = document.querySelector("#inp_name-err");
    errMsg.innerText = "";
  }
  if (dateValid) {
    date.classList.add("comments__form-input--err");
    let errMsg = document.querySelector("#inp_date-err");
    errMsg.innerText = dateValid;
    errors = true;
  } else if (dateValid != null) {
    date.classList.remove("comments__form-input--err");
    let errMsg = document.querySelector("#inp_date-err");
    errMsg.innerText = "";
  }
  if (commentValid) {
    comment.classList.add("comments__form-input--err");
    let errMsg = document.querySelector("#inp_comment-err");
    errMsg.innerText = commentValid;
    errors = true;
  } else if (commentValid != null) {
    comment.classList.remove("comments__form-input--err");
    let errMsg = document.querySelector("#inp_comment-err");
    errMsg.innerText = "";
  }
  return errors;
}

commentMainInput.addEventListener("input", (e) => {
  const length = document.querySelector(".comments__textarea-value");
  length.innerText = `${e.target.textLength}/1000`;
});

likeBtns.forEach((el) => {
  el.addEventListener("click", likeListenerFunc);
});

deleteBtns.forEach((el) => {
  el.addEventListener("click", deleteListenerFunc);
});

nameInput.addEventListener("keyup", () => {
  isFormInnerRight(nameInput);
});

dateInput.addEventListener("keyup", () => {
  isFormInnerRight(null, dateInput);
});

textInput.addEventListener("keypress", (e) => {
  if (e.which === 13 && !e.shiftKey) {
    if (!e.repeat) {
      const newEvent = new Event("submit", { cancelable: true });
      e.target.form.dispatchEvent(newEvent);
    }
    e.preventDefault();
  }
});

textInput.addEventListener("keyup", () => {
  isFormInnerRight(null, null, textInput);
});

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (isFormInnerRight(nameInput, dateInput, textInput)) return;
  const commentBox = document.createElement("div");
  commentBox.classList.add("comments__list-item");
  const name = document.createElement("span");
  name.classList.add("comments__item-name");
  const date = document.createElement("span");
  date.classList.add("comments__item-date");
  const text = document.createElement("p");
  text.classList.add("comments__item-text");
  name.innerText = nameInput.value;
  date.innerText = getDate(dateInput.value);

  text.innerText = textInput.value.replace(/\n/gm, " ");
  const commentBtm = document.createElement("div");
  commentBtm.classList.add("comments__item-btm");
  const likeElmnt = document.createElement("i");
  likeElmnt.classList.add("comments__item-like");
  const itemBox = document.createElement("div");
  itemBox.classList.add("comments__item-box");
  const deleteBtn = document.createElement("i");
  deleteBtn.classList.add("comments__item-delete");
  itemBox.append(date);
  itemBox.append(deleteBtn);
  commentBtm.append(likeElmnt);
  commentBtm.append(itemBox);
  commentBox.append(name);
  commentBox.append(text);
  commentBox.append(commentBtm);
  commentsList.append(commentBox);
  likeBtns = document.querySelectorAll(".comments__item-like");
  deleteBtns = document.querySelectorAll(".comments__item-delete");
  deleteBtns.forEach((el) => {
    el.removeEventListener("click", deleteListenerFunc);
    el.addEventListener("click", deleteListenerFunc);
  });
  likeBtns.forEach((el) => {
    el.removeEventListener("click", likeListenerFunc);
    el.addEventListener("click", likeListenerFunc);
  });
});
