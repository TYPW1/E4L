const initState = {
    sending: false,
    sendFulfilled: false,
    error: null
};

export default function contactReducer(state = initState, action) {
    switch (action.type) {
        case "SEND_MESSAGE_PENDING": {
            return Object.assign({}, state, {
                sending: true,
                sendFulfilled: false,
                error: null
            });
        }
        case "SEND_MESSAGE_REJECTED": {
            return Object.assign({}, state, {
                sending: false,
                sendFulfilled: false,
                error: action.payload
            });
        }
        case "SEND_MESSAGE_FULFILLED": {
            return Object.assign({}, state, {
                sending: false,
                sendFulfilled: true,
                error: null
            });
        }
    }
    return state;
}
