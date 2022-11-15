import React from "react";

const MessageBox = () => {
  return (
    <div className="message_box_wrapper">
      <div dir="rtl" className="message_box">
        <h1>متاسفم!</h1>
        <p>
          با عرض پوزش٫ با توجه به تحریم سرویس های
          <a href="https://www.heroku.com/"> ( Heroku cloud ) </a>
          لطفا ای پی خود را با وی پی ان تغییر داده و بعد دوباره امتحان کنید.
        </p>
      </div>
    </div>
  );
};

export default MessageBox;
