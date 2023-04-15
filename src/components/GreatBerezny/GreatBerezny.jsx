import React, { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { Form } from "react-bootstrap";

const GreatBerezny = () => {
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
      value: "Адміністративне судочинство",
      label: "Адміністративне судочинство",
    },
    {
      value: "Адміністративні правопорушення",
      label: "Адміністративні правопорушення",
    },
    { value: "Кримінальне судочинство", label: "Кримінальне судочинство" },
    { value: "Цивільне судочинство", label: "Цивільне судочинство" },
  ];

  const judges = [
    { value: "Склад суду", label: "Склад суду" },
    { value: "Зизич В.В.", label: "Зизич В.В." },
    { value: "Тарасевич П.П.", label: "Тарасевич П.П." },
  ];

  return (
    <div className={"form"}>
      <h5>Великоберезнянський районний суд</h5>
      <Form.Select
        aria-label="Floating label select example"
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
      </Form.Select>
      <Form.Select
        aria-label="Floating label select example"
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
      </Form.Select>
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
        autoComplete="off"
        className={"selectF"}
      />
    </div>
  );
};

export default GreatBerezny;
