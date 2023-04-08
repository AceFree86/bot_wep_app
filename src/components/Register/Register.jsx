import React, { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { Form } from "react-bootstrap";

const Register = () => {
  const [input_text, setText] = useState("");
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      input_text,
      user_id: tg.initData?.user?.id,
      username: tg.initData?.user?.username,
    };
    tg.sendData(JSON.stringify(data));
  }, [input_text, tg.initData]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    console.log(tg.initData?.user?.id);
    console.log(tg.initData?.user?.username);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.expand();
    tg.MainButton.setParams({ text: "Записати" });
    tg.MainButton.show();
  }, []);

  useEffect(() => {
    if (!input_text) {
      tg.MainButton.disable();
    } else {
      tg.MainButton.enable();
    }
  }, [input_text, tg.initData]);


  const onTextChange = (e) => {
    const value = e.target.value;
    setText(value);
  };

  return (
    <div className={"form"}>
      <h5>Реєстрація для сповіщення</h5>
      <Form.Control
        size="lg"
        type="text"
        placeholder="Пропишіть ПІП або номер справи"
        value={input_text}
        onChange={onTextChange}
        className={"selectF"}
      />
      <Form.Text className="text-muted">
         наберіть⌨ прізвище та ім'я або номер
            справи і ✍🏻записати. <b>Попередження</b>❗ Прізвище та ім'я набирати
            можна з малої букви, а апостроф в тексті " "заміняється на пробіл.
            Щодо номера справи набираємо⌨ відповідно до зразків " "304/555/20
            або 555/20. Інформацію вказуйте правильно💯.
      </Form.Text>
    </div>
  );
};

export default Register;
