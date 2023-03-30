import React, {useCallback, useEffect, useState} from 'react';
import './Perechin.css';
import { useTelegram } from "../../hooks/useTelegram";
import { Form } from "react-bootstrap";

const Perechin = () => {
    const [dob, setDob] = useState(new Date().toISOString().slice(0, 10));
    const [formset, setFormset] = useState('');
    const [court, setCourt] = useState('');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = { dob, formset, court }
        tg.sendData(JSON.stringify(data));
    }, [dob, formset, court])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {tg.offEvent('mainButtonClicked', onSendData)}
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({text: 'Пошук'})
        tg.MainButton.show();
    }, [])

    const onChangeFormset = (e) => {
        setFormset(e.target.value)
    }

    const onChangeCourt = (e) => {
        setCourt(e.target.value)
    }

    const options = [
        { value: 'Форма судочинства', label: 'Форма судочинства' },
        { value: 'Адміністративні правопорушення', label: 'Адміністративні правопорушення' },
        { value: 'Кримінальне судочинство', label: 'Кримінальне судочинство' },
        { value: 'Цивільне судочинство', label: 'Цивільне судочинство' },
      ];

    const judges = [
        { value: 'Склад суду', label: 'Склад суду' },
        { value: 'Ганько І.І.', label: 'Ганько І.І.' },
        { value: 'Гевці В.М.', label: 'Гевці В.М.' },
        { value: 'Чепурнов В.О.', label: 'Чепурнов В.О.' },
      ];  

    return (
        <div className={"form"}>
            <h6>Перечинський районний суд</h6>
                <Form.Control size="lg" as="select" value={court} onChange={onChangeCourt} className={'selectF'}>
                    {judges.map((judge) => (
                    <option key={judge.value} value={judge.value}>
                        {judge.label}
                        </option>
                        ))}
                </Form.Control>
                <br />
                <Form.Control size="lg" as="select" value={formset} onChange={onChangeFormset} className={'selectF'}>
                    {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                        ))}
                </Form.Control>
                <br />
                <Form.Control size="lg" type="date" name="dob" placeholder="Due date" value={dob}
                 onChange={(e) => setDob(e.target.value)} className={'selectF'} />
        </div>
    );
};

export default Perechin;