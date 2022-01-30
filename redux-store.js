// action creator -> action -> dispatch -> reducers -> store

//Action creators
// person who is submitting the form

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
