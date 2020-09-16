const getDate = () => {
  let event = new Date(Date.now());
  var options = { weekday: "long", month: "long", day: "numeric" };
  return event.toLocaleDateString("en-US", options);
};

export default getDate;
