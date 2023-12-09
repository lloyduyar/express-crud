window.onload = fetchDatabaseEntries();

const submitButton = document.querySelector(".submitBTN");
/* setInterval(() => {
    fetchDatabaseEntries();
  }, 100)*/
async function fetchDatabaseEntries() {
  const response = await fetch("/getEntries", { method: "GET" });
  const data = await response.json();
  let dataLength = JSON.stringify(data.length);
  console.log(data);
  let databaseDiv = document.getElementsByClassName("databaseDiv")[0];
  databaseDiv.innerHTML = "";

  if (dataLength != 0) {
    for (i = 0; i < dataLength; i++) {
      let newEntry = document.createElement("div");
      let br = document.createElement("br");
      let databaseDiv = document.getElementsByClassName("databaseDiv")[0];
      newEntry.classList.add("entries");
      let newusernameChild = document.createElement("span");
      newusernameChild.classList.add("usernames");
      newusernameChild.innerText = data[i].username;
      newusernameChild.contentEditable = true;

      let newmessageChild = document.createElement("span");
      newmessageChild.classList.add("messages");
      newmessageChild.innerText = data[i].message;
      newmessageChild.contentEditable = true;

      let hr1 = document.createElement("hr");

      let hr2 = document.createElement("hr");

      let hr3 = document.createElement("hr");

      let br2 = document.createElement("br");
      let idChild = document.createElement("span");
      idChild.classList.add("username");
      idChild.id = "ID";
      idChild.innerText = data[i]._id;

      let submitBTN = document.createElement("button");
      submitBTN.classList.add("submitBTN");
      submitBTN.innerText = "Submit";
      submitBTN.addEventListener("click", (e) => submitAction());

      let deleteBTN = document.createElement("button");
      deleteBTN.classList.add("submitBTN");
      deleteBTN.innerText = "Delete";
      deleteBTN.addEventListener("click", () => {
        removeIndividual();
      });

      newEntry.append(newusernameChild);
      newEntry.append(hr1);
      newEntry.append(newmessageChild);
      newEntry.append(br);
      newEntry.append(hr2);
      newEntry.append(idChild);
      newEntry.append(br);
      newEntry.append(hr3);
      newEntry.append(submitBTN);
      newEntry.append(br2);
      newEntry.append(deleteBTN);
      databaseDiv.append(newEntry);
    }
  } else {
    databaseDiv.innerHTML = "";
  }
  return databaseDiv;
}

async function removeIndividual() {
  const clickedElement = event.target;
  const idSpan = clickedElement.closest(".entries").querySelector("#ID");
  const idValue = idSpan.textContent;
  let userIDPOST = {
    _id: idValue,
  };
  const response = await fetch("/removeIndividual", {
    method: "DELETE",
    credentials: "same-origin",
    mode: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userIDPOST),
  });
  location.reload(true);
}

async function submitAction() {
  const clickedElement = event.target;
  const usernamesSpan = clickedElement
    .closest(".entries")
    .querySelector(".usernames");
  const usernamesValue = usernamesSpan.textContent;

  const messagesSpan = clickedElement
    .closest(".entries")
    .querySelector(".messages");
  const messagesValue = messagesSpan.textContent;
  // console.log("Clicked HTML:", clickedElement.outerHTML);

  const idSpan = clickedElement.closest(".entries").querySelector("#ID");
  const idValue = idSpan.textContent;

  let dataTosend = {
    username: usernamesValue,
    message: messagesValue,
    exist: true,
    _id: idValue,
  };

  const response = await fetch("/update", {
    method: "POST",
    credentials: "same-origin",
    mode: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataTosend),
  });
  const data = await response.text();
  location.reload(true);
}

let clearDatabaseBtn = document.getElementById("deleteAll");
clearDatabaseBtn.addEventListener("click", () => {
  async function clearDatabase() {
    const response = await fetch("/deleteAll", {
      method: "DELETE",
    });
  }
  clearDatabase();
  location.reload(true);
});
