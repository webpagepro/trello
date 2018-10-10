// Trello
const Trello = require("trello");
// brandonratzloff api keys
const key = "1b6241ff3ff159ba82c4d0c40a232eae";
const token =
  "07b0ed0cbbbf555f08ca82d9fcf847e7f45785f893534d78c7e3b3a0a1ce98ac";

const trello = new Trello(key, token);
const listId = "5b994ae7b554bc05083e889a";

// Date Picker
// TinyDatePicker = require("tiny-date-picker");
// const dateInputStart = document.querySelector("input#event-date-start");
// const dateInputEnd = document.querySelector("input#event-date-end");
// const datePickerStart = new TinyDatePicker(dateInputStart);
// const datePickerEnd = new TinyDatePicker(dateInputEnd);
// console.log(dateInputStart, dateInputEnd);

// Date range picker
const { DateRangePicker } = require("tiny-date-picker/dist/date-range-picker");
const dateRangePicker = document.querySelector("#event-date-range-picker");

const txtStart = dateRangePicker.querySelector("#event-date-start");
const txtEnd = dateRangePicker.querySelector("#event-date-end");
const container = dateRangePicker.querySelector(
  "#event-date-range-picker-container"
);
// Date range options
// DateRangePicker('.cls', {
//   startOpts: {}, // The options passed to the start date picker
//   endOpts: {}, // The options passed to the end date picker
// });

// Inject DateRangePicker into our container
DateRangePicker(container).on("statechange", function(_, rp) {
  // Update the inputs when the state changes
  var range = rp.state;
  txtStart.value = range.start ? range.start.toLocaleDateString("en-US") : "";
  txtEnd.value = range.end ? range.end.toLocaleDateString("en-US") : "";
  // console.log(range.end);
  range.end != undefined ? container.classList.add("is-hidden") : null;
});

// When the inputs gain focus, show the date range picker
txtStart.addEventListener("focus", showPicker);
txtEnd.addEventListener("focus", showPicker);

function showPicker() {
  container.classList.remove("is-hidden");
}

// If focus leaves the dateRangePicker element, it is not in the date
// picker or the inputs, so we should hide the date picker
// we do this in a setTimeout because redraws cause temporary
// loss of focus.
let previousTimeout;
dateRangePicker.addEventListener("focusout", function hidePicker() {
  clearTimeout(previousTimeout);
  previousTimeout = setTimeout(function() {
    if (!dateRangePicker.contains(document.activeElement)) {
      container.classList.add("is-hidden");
    }
  }, 10);
});

// Places Locator
Places = require("places.js");
const placesAutocomplete = new Places({
  container: document.querySelector("input#location")
});

// Choices
Choices = require("choices.js");
const choiceTopics = new Choices(document.querySelector(".choices-input"), {});
// See labels promise for label choices

// set status element
const status = document.getElementById("status");
// console.log(status);

// Get Lists on Board
// trello.getListsOnBoard("b3ZXOuj6").then(lists => {
//   console.log(lists);
// });

// Card Checklists Defaults
const genCardChecklist = [
  {
    name: "Theme Components",
    items: [
      "Upload Logo",
      "Upload favicon.ico",
      "Add color scheme",
      "Adjust blocks",
      "Add custom CSS"
    ]
  },
  {
    name: "Site Launch",
    items: [
      "Add to Personal Plan on Pantheon (My Dashboard/Live/Domains)",
      "Connect Domains on Live Environment",
      "Update DNS records in GoDaddy (or relevant registrar)",
      "Google Analytics Settings (/admin/config/system/google-analytics)"
    ]
  }
];
// const issueCardChecklist;

// Add checklist
const createCardChecklist = function(cardId, checklist) {
  checklist.forEach(list => {
    trello.addChecklistToCard(cardId, list.name).then(res => {
      // Add items
      list.items.forEach((e, i) => {
        trello.addItemToChecklist(res.id, e, i);
      });
    });
  });
};

// Add Card Form
const addCardForm = document.getElementById("addCardForm");
// console.log(addCardForm);

// Form Choice handler UX
const checkIssue = document.getElementById("check-issue");
const checkGen = document.getElementById("check-gen");

checkIssue.addEventListener("click", e => {
  if (e.target.checked === true) {
    document.getElementById("issue-queue").classList.remove("is-hidden");
    addCardForm.classList.add("animated", "fadeIn", "slow");
    document.getElementById("site-generate").classList.add("is-hidden");
    checkGen.checked = false;
    addCardForm.classList.remove("is-hidden");
  } else {
    document.getElementById("issue-queue").classList.add("is-hidden");
    addCardForm.classList.add("is-hidden");
  }
});

checkGen.addEventListener("click", e => {
  if (e.target.checked === true) {
    document.getElementById("site-generate").classList.remove("is-hidden");
    addCardForm.classList.add("animated", "fadeIn", "slow");
    document.getElementById("issue-queue").classList.add("is-hidden");
    checkIssue.checked = false;
    addCardForm.classList.remove("is-hidden");
  } else {
    document.getElementById("site-generate").classList.add("is-hidden");
    addCardForm.classList.add("is-hidden");
  }
});

// Filepond library
const FilePond = require("filepond");
const FilePondPluginImagePreview = require("filepond-plugin-image-preview");

// FilePond plugins
FilePond.registerPlugin(
  FilePondPluginImagePreview
  // FilePondPluginImageExifOrientation,
  // FilePondPluginFileValidateSize
);
const filePond = FilePond.create(document.querySelector("input.filepond"));

filePond.labelIdle =
  'Drag & Drop or <span class="filepond--label-action"> Browse </span> or Paste from clipboard';

// console.log("File Input:", filePond);

// document.getElementById("attachment").appendChild(filePond.element);
filePond.element.addEventListener("FilePond:addfile", e => {
  // console.log("File added", e.detail.pond);
  // var files = filePond.getFiles();
  // console.log(files[0].file);
});

function testFormData(file) {
  formData = new FormData();
  formData.append("file", file);
  // formData.append("mimeType", "image/png");
  // formData.append("name", "My Awesome File");
  // formData.append("mimeType", "image/png"); // Optionally, set mimeType if needed.
  console.log("FormData:", formData);
}

// Helper function to build an XMLHttpRequest object that prints to console.log
// when a response is received.

// File Pond
// FilePond.setOptions({
//   server: `https://api.trello.com/1/cards/${cardId}/attachments/`
// });

// Custom request to Trello
const createRequest = function(cardId) {
  var request = new XMLHttpRequest();
  request.responseType = "json";
  request.onreadystatechange = function() {
    // When we have a response back from the server we want to share it!
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response
    if (request.readyState === 4) {
      console.log(`Successfully uploaded at: ${request.response.date}`);
    }
  };
  request.open("POST", `https://api.trello.com/1/cards/${cardId}/attachments/`);
  return request;
};

const createAndSendForm = function(cardId, file) {
  // let [key, token, cardId] = getKeyTokenCardId();
  var formData = new FormData();
  formData.append("key", key);
  formData.append("token", token);
  formData.append("file", file);
  // formData.append("name", "My Awesome File");
  // formData.append("mimeType", "image/png"); // Optionally, set mimeType if needed.
  var request = createRequest(cardId);
  request.send(formData);
};

// Form Submit handler
addCardForm.addEventListener("submit", e => {
  e.preventDefault();
  // console.log(e.target);

  // Get form inputs
  const formInputNodeList = document.querySelectorAll(
    "#addCardForm .form-item"
  );

  // Convert Nodelist into Array example
  // const formInputArr = [];
  // for (let i = 0; i < formInputNodeList.length; i++) {
  //   let object = {};
  //   // formInputArr[i] = formInputNodeList[i];
  //   // formInputArr.push(formInputNodeList[i]);
  //   object[formInputNodeList[i].name] = formInputNodeList[i].value;
  //   formInputArr.push(object);
  // }

  // Convert Nodelist into Array of Objects
  const formInputArr = Array.from(formInputNodeList);
  const inputs = {};
  let descData = "";

  formInputArr.forEach(input => {
    inputs[input.name] = input.value;
    if (input.value) {
      descData += `\n**${input.name}**: ${input.value} \n`;
    }
  });

  // for (const key in inputs) {
  //   if (inputs.hasOwnProperty(key)) {
  //     descData += inputs[key];
  //   }
  // }
  // console.log(descData);
  // inputs.forEach(e => {
  //   descData += Object.key(e);
  // });
  // descData = `${inputs.descInput} \n **ACONYM:** ${inputs.acronymInput}`;
  console.log("Inputs:", inputs);
  // console.log("Desc:", descData);
  let cardName = "";

  if (checkIssue.checked === true) {
    if (inputs.feature) {
      cardName = `[${inputs.acronym}] [${inputs.feature}]: ${
        inputs.shortTitle
      }`;
    } else {
      cardName = `[${inputs.acronym}]: ${inputs.shortTitle}`;
    }
  } else if (checkGen.checked === true) {
    cardName = `[${inputs.acronym}]: Generate Site`;
  } else {
    cardName = "NO FORM CHOSEN";
  }

  // console.log(cardName);

  trello.addCard(cardName, descData, listId).then(result => {
    // console.log(result);

    // Add Labels
    // if (checkIssue.checked === true) {
    //   trello.addLabelToCard(result.id, inputs.cardLabel).then(labelResult => {
    //     // console.log(labelResult);
    //   });
    // }
    // Attach link
    trello.addAttachmentToCard(result.id, inputs.url);

    // Collect file upload and send to Trello Card
    const fileUpload = filePond.getFiles();

    // Trello attachment
    if (fileUpload.length > 0) {
      createAndSendForm(result.id, fileUpload[0].file);
    } else {
      console.log("No screenshot added.");
    }

    // Add checklists
    if (checkGen.checked === true) {
      createCardChecklist(result.id, genCardChecklist);
    }

    // Notify Success
    notifElm = document.createElement("div");
    notifElm.innerHTML = `<button class="delete"></button>Created Card: <a href=${
      result.shortUrl
    } target="_blank" autofocus>${result.name} (${result.id})</a>`;
    status.appendChild(notifElm);
    status.classList.remove("is-hidden");
    notifElm.classList.add("notification", "is-success", "animated", "fadeIn");
    status.scrollIntoView(); // scroll to notif

    // Reset Form
    addCardForm.reset(); // reset form values
  });
  // TODO: Add theme components checklist
  // TODO: Add launch site checklist
});

const cardNameInput = document.getElementById("name");
const acronymInput = document.getElementById("acronym");

// Autolabel "Name" field
acronymInput.addEventListener("input", e => {
  // console.log(e);
  if (e.data === null) {
    cardNameInput.value = "";
  } else {
    cardNameInput.value += e.data;
  }
});

const output = document.getElementById("output");

// Trello Board
const boardId = "b3ZXOuj6";

// Board Labels
let labelIds = [];
async function setLabels() {
  labelIds = await trello.getLabelsForBoard(boardId).then(res => {
    // console.table(res);
    return res;
  });
  // Sort labels alphabetically
  labelIds.sort(dynamicSort("name"));
  labelChoices = labelIds.map(label => {
    return {
      value: label.id,
      label: label.name,
      customProperties: { color: label.color }
    };
  });
  // console.log(labelChoices);
  const choiceLabel = new Choices(document.getElementById("board-labels"), {
    choices: labelChoices,
    itemSelectText: "Select Severity Label",
    itemSelectText: "Press to select",
    searchFields: ["label"],
    searchPlaceholderValue: "Type for choice",
    // classNames: {
    //   item: `choices__item ${labelChoices.customProperties.color}`
    // },
    callbackOnCreateTemplates: function(template) {
      // console.log("this", this);
      // console.log(this.config.classNames);
      let classNames = this.config.classNames;
      return {
        choice: data => {
          // console.log("data", data);
          return template(`
            <div style="background-color: ${
              data.customProperties.color
            }; color: #FFFFFF; font-weight: bold" class="${classNames.item} ${
            classNames.itemChoice
          } ${
            data.disabled ? classNames.itemDisabled : classNames.itemSelectable
          }" data-select-text="${this.config.itemSelectText}" data-choice ${
            data.disabled
              ? 'data-choice-disabled aria-disabled="true"'
              : "data-choice-selectable"
          } data-id="${data.id}" data-value="${data.value}" ${
            data.groupId > 0 ? 'role="treeitem"' : 'role="option"'
          }>
              ${data.label}
            </div>
        `);
        }
      };
      // return (this.config.classNames.itemChoice = `choices__item--choice`);
    }
  });
}
setLabels();

// Dynamic sort helper
function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function(a, b) {
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

const getCardsButton = document.createElement("button");
getCardsButton.textContent = "Get list of Cards on Board: " + boardId;
getCardsButton.classList = "button";
output.appendChild(getCardsButton);

getCardsButton.addEventListener(
  "click",
  e => {
    // this should connect using the issue queue board id specifically
    trello.getCardsOnBoard(boardId).then(cards => {
      for (const key in cards) {
        if (cards.hasOwnProperty(key)) {
          const card = cards[key];
          // console.log(card.id);
          let elm = document.createElement("li");
          // console.log(elm);
          elm.innerHTML = `<a href=${card.shortUrl} target="_blank">${
            card.name
          }: ${card.id}`;
          output.appendChild(elm);
        }
      }
    });
  },
  false
);

// console.log(output);
