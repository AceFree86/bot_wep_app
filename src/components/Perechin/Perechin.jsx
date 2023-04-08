import React, { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { Form } from "react-bootstrap";

const Perechin = () => {
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
        { value: "Ганько І.І.", label: "Ганько І.І." },
        { value: "Гевці В.М.", label: "Гевці В.М." },
        { value: "Чепурнов В.О.", label: "Чепурнов В.О." },
    ];

    return (
      <div className={"form"}>
        <h5>Перечинський районний суд</h5>
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

export default Perechin;
