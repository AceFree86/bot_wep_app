import React, { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { Form } from "react-bootstrap";

const Appellate = () => {
  const [dob, setDob] = useState(new Date().toISOString().slice(0, 10));
  const [input_text, setText] = useState("");
  const [formset, setFormset] = useState("");
  const [court, setCourt] = useState("");
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = { dob, formset, court };
    tg.sendData(JSON.stringify(data));
  }, [dob, formset, court]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.expand();
    tg.MainButton.setParams({ text: "Пошук" });
    tg.MainButton.show();
  }, []);

  const onChangeFormset = (e) => {
    setFormset(e.target.value);
  };

  const onChangeCourt = (e) => {
    setCourt(e.target.value);
  };

  const onDateCourt = (e) => {
    setDob(e.target.value);
  };

  const onTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    if (value.trim()) {
      setDob(value);
    } else {
      setDob(new Date().toISOString().slice(0, 10));
    }
  };

  const options = [
    { value: "Форма судочинства", label: "Форма судочинства" },
    {
      value: "Адміністративні правопорушення",
      label: "Адміністративні правопорушення",
    },
    { value: "Кримінальне судочинство", label: "Кримінальне судочинство" },
    { value: "Цивільне судочинство", label: "Цивільне судочинство" },
  ];

  const judges = [
    { value: "Склад суду", label: "Склад суду" },
    { value: "Бисага Т.Ю.", label: "Бисага Т.Ю." },
    { value: "Вотьканич Ф.А.", label: "Вотьканич Ф.А." },
    { value: "Готра Т.Ю.", label: "Готра Т.Ю." },
    { value: "Гошовський Г.М.", label: "Гошовський Г.М." },
    { value: "Джуга С.Д.", label: "Джуга С.Д." },
    { value: "Животов Є.Г.", label: "Животов Є.Г." },
    { value: "Кожух О.А.", label: "Кожух О.А." },
    { value: "Кондор Р.Ю.", label: "Кондор Р.Ю." },
    { value: "Куштан Б.П.", label: "Куштан Б.П." },
    { value: "Мацунич М.В.", label: "Мацунич М.В." },
    { value: "Собослой Г.Г.", label: "Собослой Г.Г." },
    { value: "Стан І.В.", label: "Стан І.В." },
    { value: "Фазикош Г.В.", label: "Фазикош Г.В." },
    { value: "Феєр І.С.", label: "Феєр І.С." },
  ];

  return (
    <div className={"form"}>
      <h5>Закарпатський апеляційний суд</h5>
      <Form.Control
        size="lg"
        as="select"
        value={court}
        onChange={onChangeCourt}
        className={"selectF"}
      >
        {judges.map((judge) => (
          <option key={judge.value} value={judge.value}>
            {" "}
            {judge.label}{" "}
          </option>
        ))}
      </Form.Control>
      <Form.Control
        size="lg"
        as="select"
        value={formset}
        onChange={onChangeFormset}
        className={"selectF"}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Control>
      <Form.Control
        size="lg"
        type="date"
        name="dob"
        placeholder="Due date"
        value={dob}
        onChange={onDateCourt}
        disabled={input_text.trim()}
        className={"selectF"}
      />
      <Form.Control
        size="lg"
        type="text"
        placeholder="Пошук за ПІП або номер справи"
        value={input_text}
        onChange={onTextChange}
        className={"selectF"}
      />
    </div>
  );
};

export default Appellate;
