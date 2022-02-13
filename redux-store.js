//  live example -> 
// 1. visiting booking center  
// 2. form new booking/ cancel ticket 
// 3. submit form 
// 4. ticket counter 1, ticket counter 2, ticket counter 3
// 5. ticket avaialbility, cancelled tickets, trains status 
// 6. notification to mobile operator
// 7. message for forwarded user  

//  redux example -> 
//  1. action creators
//  2. action ( { type: 'booking', payload: 'info'}) 
//  3. dispatch 
//  4. reducers 1, reducers 2, reducers 3 
//  5. central store 
//  6. subscription 
//  7. pass state as props, mapStateToProps()

// action creator -> action -> dispatch -> reducers -> store
// you -> booking form -> submit form -> ticket counters -> railway central  store

//Action creators
// person who is submitting the form

// action -> it consists of two fills, 1) type, 2)payload

const newBooking = (name, amount) => {
  return {
    type: "NEW_BOOKING",
    payload: {
      name,
      amount,
    },
  };
};

const cancelBooking = (name, refundAmount) => {
  return {
    type: "CANCEL_BOOKING",
    payload: {
      name,
      refundAmount,
    },
  };
};

//Reducers
//history of booking

const reservationHistory = (oldReservationList = [], action) => {
  if (action.type === "NEW_BOOKING") {
    return [...oldReservationList, action.payload];
  } else if (action.type === "CANCEL_BOOKING") {
    return oldReservationList.filter((record) => {
      return record !== action.payload.name;
    });
  }
  return oldReservationList;
};

const cancellationHistory = (oldcancellationList = [], action) => {
    if (action.type === "CANCEL_BOOKING") {
      return [...oldcancellationList, action.payload];
    }
    return oldcancellationList;
  };

const accounting = (totalMoney=100, action) => {
    if(action.type === "NEW_BOOKING"){
        return totalMoney + action.payload.amount;
    } else if(action.type === "CANCEL_BOOKING"){
        return totalMoney - action.payload.refundAmount
    } return totalMoney;
}

//Redux store

console.log(Redux);
const {createStore, combineReducers} = Redux;

const railwayCentralStore = combineReducers({
  accounting : accounting,
  reservationHistory: reservationHistory,
  cancellationHistory: cancellationHistory
})

const store = createStore(railwayCentralStore);

const action = newBooking("rohan", 20);

store.dispatch(action);
store.dispatch(cancelBooking('rohan', 10));
console.log(store.getState());

