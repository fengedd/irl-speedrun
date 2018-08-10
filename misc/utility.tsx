
export const secondsToDisplayedTime = (secs: number, isTotal: boolean = false): any => {
  let hours = Math.floor(Math.abs(secs / (60 * 60)));
  let divisorForMinutes = secs % (60 * 60);
  let minutes = Math.floor(Math.abs(divisorForMinutes / 60));
  let divisorForSeconds = divisorForMinutes % 60;
  let seconds = Math.ceil(Math.abs(divisorForSeconds));
  let isNegative = secs < 0 ? true : false;
  let displayedTime: any = {
    hours: isTotal ? hours.toString() : (isNegative ? '-' + hours.toString() : '+' + hours.toString()),
    minutes: minutes < 10 ? '0' + minutes : minutes.toString(),
    seconds: seconds < 10 ? '0' + seconds : seconds.toString()
  };

  return displayedTime;
};

export const timeToSeconds = (hours: number, minutes: number, seconds: number): number => {
  return hours * 3600 + minutes * 60 + seconds;
};