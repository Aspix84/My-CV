//SELECTORS
const calculatorForm = document.querySelector('#calculator-form-id');

const technologiesSelect = document.querySelector(
  '#calculator-form-technologies',
);

//MULTISELECT OBJ
const technologiesMultiSelect = new Choices(technologiesSelect, {
  allowSearch: false,
  silent: false,
  renderChoiceLimit: -1,
  maxItemCount: -1,
  removeItems: true,
  removeItemButton: true,
  editItems: false,
  duplicateItemsAllowed: false,
  delimiter: ',',
  paste: true,
  searchEnabled: false,
  searchChoices: true,
  searchResultLimit: -1,
  position: 'auto',
  resetScrollPosition: true,
  shouldSort: true,
  shouldSortItems: false,
  placeholder: true,
  noChoicesText: 'No available options',
  itemSelectText: 'Click to select',
  classNames: {
    containerInner: 'choices__inner tech-input-container',
    input: 'choices__input',
  },
});

calcProjectPrice();

calculatorForm.addEventListener('submit', function (event) {
  event.preventDefault();
  calcProjectPrice();
});

function extractPriceFromValue(str) {
  const price = str.match(/:\d+/);

  if (price) {
    return Number(price[0].slice(1)) || 0;
  }

  return 0;
}

function getTechnologiesCostSumm(technologiesArr) {
  let totalSumm = 0;

  technologiesArr.forEach(function (tech) {
    totalSumm += extractPriceFromValue(tech.value);
  });

  return totalSumm;
}

function convertCartOptionToPrice(option) {
  if (option === 'yes') {
    return 500;
  } else {
    return 0;
  }
}

function convertReceptionToPrice(option) {
  if (option === 'yes') {
    return 300;
  } else {
    return 0;
  }
}

function renderSumm(summ) {
  const costEl = document.querySelector('.calculator-form-total-cost');

  costEl.textContent = 'Calculating ... ';

  setTimeout(function () {
    costEl.textContent = summ + '$';
  }, 2000);
}

function calcProjectPrice() {
  //SELECTORS
  const websiteTypeSelect = document.querySelector(
    '#calculator-form-website-type',
  );

  // SELECTOR's VALUES
  const websiteTypeValue = websiteTypeSelect.value;
  const technologiesMultiSelectValue = technologiesMultiSelect.getValue();
  const websiteCartValue = document.querySelector(
    '#shopping-cart-ID input:checked',
  ).value;

  const websiteRerequestsReceptionValue = document.querySelector(
    '#requests-reception-ID input:checked',
  ).value;

  const websiteTypeCostValue = extractPriceFromValue(websiteTypeValue);
  const technologiesCostValue = getTechnologiesCostSumm(
    technologiesMultiSelectValue,
  );
  const websiteCartPriceValue = convertCartOptionToPrice(websiteCartValue);
  const websiteReceptionPriceValue = convertReceptionToPrice(
    websiteRerequestsReceptionValue,
  );

  const projectPrice =
    websiteTypeCostValue +
    technologiesCostValue +
    websiteCartPriceValue +
    websiteReceptionPriceValue;

  renderSumm(projectPrice);
}
