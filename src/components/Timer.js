import { useEffect } from "react";

// we're placing the timer in one of the components because it has to start when any of the components mount when the game starts
function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        //   console.log("tick");
        dispatch({ type: "tick" });
      }, 1000);

      //   every setInterval timer returns its id, which is now used to clear the timer when the component unmounts: otherwise the timer method would pile up and the timer would run faster on after every mount
      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
