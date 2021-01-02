import { combineReducers, createStore } from 'redux'

const STARTING_BANK_ROLL = 1000
var accountName = ''
var moneyAmount = 0.0

//actions

// action, someone dropping off a new create claim form
const createClaim = (policyAccountHolder, amountOfMoneyToCollect) => {
  return {
    // this is a form
    type: 'CREATE_CLAIM',
    payload: {
      name: policyAccountHolder,
      amountOfMoneyToCollect: amountOfMoneyToCollect,
    },
  }
}

// action, someone dropping off a new create policy form
const createPolicy = (policyAccountHolder, policyAmount) => {
  return {
    // this is a form
    type: 'CREATE_POLICY',
    payload: {
      name: policyAccountHolder,
      amount: policyAmount,
    },
  }
}

// someone dropped off a delete policy for -- action
const deletePolicy = (nameOnPolicy) => {
  return {
    // this is the form data
    type: 'DELETE_POLICY',
    payload: {
      name: nameOnPolicy,
    },
  }
}

//reducers

const claims = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    console.log('* claims reducer fired')
    return [...oldListOfClaims, action.payload]  //add a new claim to the current list of claims
  }
  return oldListOfClaims
}

const accounting = (bagOMoney = STARTING_BANK_ROLL, action) => {
  if (action.type === 'CREATE_CLAIM') {
    console.log('* accounting reducer fired')
    return bagOMoney - action.payload.amountOfMoneyToCollect //current bakroll gets a little smaller, byu the claim amount to be precise
  } else if (action.type === 'CREATE_POLICY') {
    console.log('* accounting reducer fired')
    return bagOMoney + action.payload.amount // add to our coffers
  }
  return bagOMoney
}

const policies = (listOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    console.log('* policies reducer fired');
    return [...listOfPolicies, action.payload] // add the new policy (aka payload) to the current list of policies
  } else if (action.type === 'DELETE_POLICY') {
    console.log('* policies reducer fired');
    return listOfPolicies.filter((policy) => policy.name != action.payload.name) // remove the new mentioned (aka payload) from the current list of policies
  }

  return listOfPolicies
}

//
// company setup
const ourDepartments = combineReducers({
  currentClaims: claims,
  companyMoney: accounting,
  currentPolicies: policies,
})

const logStore = () => {
  console.log('-----------------------')
  console.log('--- current redux store')
  console.log(store.getState())
  console.log('---')
  console.log('-----------------------')
}

console.log(`creating store, starting bank roll: ${STARTING_BANK_ROLL} `)
const store = createStore(ourDepartments)

accountName = 'Phil'
moneyAmount = 101.0
console.log(
  `creating policy for ${accountName} with an amount of: ${moneyAmount} `
)
store.dispatch(createPolicy(accountName, moneyAmount))
logStore()

accountName = 'Bob'
moneyAmount = 25000.0
console.log(
  `creating policy for ${accountName} with an amount of: ${moneyAmount} `
)
store.dispatch(createPolicy(accountName, moneyAmount))
logStore()

accountName = 'Mary'
moneyAmount = 0.69
console.log(
  `creating policy for ${accountName} with an amount of: ${moneyAmount} `
)
store.dispatch(createPolicy(accountName, moneyAmount))
logStore()

accountName = 'Bob'
moneyAmount = 0.69
console.log(`deleting policy for ${accountName}`)
store.dispatch(deletePolicy(accountName))
logStore()

accountName = 'Mary'
moneyAmount = 575000.0
console.log(
  `claiming cash payout in the amount of: ${moneyAmount}  for ${accountName}`
)
store.dispatch(createClaim(accountName, moneyAmount))
logStore()
