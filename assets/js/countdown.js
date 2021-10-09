const countdown = () => {
  const halloweenDate = new Date("Oct 31, 2021 00:00:00").getTime();
  const currentDate = new Date().getTime();
  const differenceDate = halloweenDate - currentDate;
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const remainingDay = Math.floor(differenceDate / day);
  const remainingHour = Math.floor((differenceDate % day) / hour);
  const remainingMinute = Math.floor((differenceDate % hour) / minute);
  const remainingSecond = Math.floor((differenceDate % minute) / second);

  document.querySelector(".day").innerText = remainingDay;
  document.querySelector(".hour").innerText = remainingHour;
  document.querySelector(".minute").innerText = remainingMinute;
  document.querySelector(".second").innerText = remainingSecond;

  console.log(remainingDay);
  console.log(remainingHour);
  console.log(remainingMinute);
  console.log(remainingSecond);
};
setInterval(countdown, 1000);

countdown();

/*  console.log(halloweenDate);
  console.log(currentDate);
  console.log(differenceDate);*/
