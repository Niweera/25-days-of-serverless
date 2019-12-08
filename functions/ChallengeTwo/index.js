const sendMsg = require("./sendMsg");
const Title = "Hello Lucy";

exports.taskOneHandler = context => {
  sendMsg(Title, "It is time to start the coffee, set out 4 cups.")
    .then(() => {
      return null;
    })
    .catch(err => {
      console.log(err.message);
      return null;
    });
};

exports.taskTwoHandler = context => {
  sendMsg(Title, "It is time to start pouring two cups.")
    .then(() => {
      return null;
    })
    .catch(err => {
      console.log(err.message);
      return null;
    });
};

exports.taskThreeHandler = context => {
  sendMsg(Title, "It is time to start lighting the candles.")
    .then(() => {
      return null;
    })
    .catch(err => {
      console.log(err.message);
      return null;
    });
};

exports.taskFourHandler = context => {
  sendMsg(Title, "It is time to start delivering the coffee to Mom and Dad.")
    .then(() => {
      return null;
    })
    .catch(err => {
      console.log(err.message);
      return null;
    });
};

exports.taskFiveHandler = context => {
  sendMsg(Title, "It is time to return to kitchen, fill two more cups.")
    .then(() => {
      return null;
    })
    .catch(err => {
      console.log(err.message);
      return null;
    });
};

exports.taskSixHandler = context => {
  sendMsg(Title, "It is time to relight the candles.")
    .then(() => {
      return null;
    })
    .catch(err => {
      console.log(err.message);
      return null;
    });
};

exports.taskSevenHandler = context => {
  sendMsg(Title, "It is time to deliver the coffee to Sister and Brother.")
    .then(() => {
      return null;
    })
    .catch(err => {
      console.log(err.message);
      return null;
    });
};

exports.taskEightHandler = context => {
  sendMsg(Title, "It is time to return to kitchen, take a break!.")
    .then(() => {
      return null;
    })
    .catch(err => {
      console.log(err.message);
      return null;
    });
};
