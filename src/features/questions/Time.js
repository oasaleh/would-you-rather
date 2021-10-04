const Time = ({ timestamp }) => {
  let time = '';
  let date = '';
  if (timestamp) {
    const fullDate = new Date(timestamp);
    const formattedDate = fullDate.toLocaleTimeString('en-US');
    time = `${formattedDate.substr(0, 4)} ${formattedDate.slice(-2)}`;
    date = fullDate.toLocaleDateString('en-US');
  }

  return (
    <span title={timestamp}>
      {time}&nbsp;|&nbsp;{date}
    </span>
  );
};

export default Time;
