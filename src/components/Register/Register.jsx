import React, { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { Form } from "react-bootstrap";


const Register = () => {
    const [input_text, setText] = useState("");
    const { tg } = useTelegram();

    useEffect(() => {
    tg.expand();
    tg.MainButton.setParams({ text: "Записати" });
    tg.MainButton.show();
  }, []);


    const onTextChange = (e) => {
        const value = e.target.value;
        setText(value);
    }


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
          наберіть⌨ прізвище та ім'я або номер справи і відправте📥.
          <b>Попередження</b>❗ Прізвище та ім'я набирати можна з малої букви,
          а апостроф в тексті " "заміняється на пробіл. Щодо номера справи
          набираємо⌨ відповідно до зразків " "304/555/20 або 555/20. Інформацію
          вказуйте правильно💯.
        </Form.Text>
      </div>
    );
};

export default Register;