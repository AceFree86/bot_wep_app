import React, {useCallback, useEffect, useState} from 'react';
import './Uzhhorod.css';
import { useTelegram } from "../../hooks/useTelegram";
import { Form } from "react-bootstrap";

const Uzhhorod = () => {
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
        { value: 'Адміністративне судочинство', label: 'Адміністративне судочинство' },
        { value: 'Адміністративні правопорушення', label: 'Адміністративні правопорушення' },
        { value: 'Кримінальне судочинство', label: 'Кримінальне судочинство' },
        { value: 'Цивільне судочинство', label: 'Цивільне судочинство' },
      ];

    const judges = [
        { value: 'Склад суду', label: 'Склад суду' },
        { value: 'Іванов А.П.', label: 'Іванов А.П.' },
        { value: 'Бедьо В.І.', label: 'Бедьо В.І.' },
        { value: 'Бенца К.К.', label: 'Бенца К.К.' },
        { value: 'Голяна О.В.', label: 'Голяна О.В.' },
        { value: 'Данко В.Й.', label: 'Данко В.Й.' },
        { value: 'Дегтяренко К.С.', label: 'Дегтяренко К.С.' },
        { value: 'Деметрадзе Т.Р.', label: 'Деметрадзе Т.Р.' },
        { value: 'Дергачова Н.В.', label: 'Дергачова Н.В.' },
        { value: 'Зарева Н.І.', label: 'Зарева Н.І.' },
        { value: 'Крегул М.М.', label: 'Крегул М.М.' },
        { value: 'Лемак О.В.', label: 'Лемак О.В.' },
        { value: 'Логойда І.В.', label: 'Логойда І.В.' },
        { value: 'Малюк В.М.', label: 'Малюк В.М.' },
        { value: 'Придачук О.А.', label: 'Придачук О.А.' },
        { value: 'Сарай А.І.', label: 'Сарай А.І.' },
        { value: 'Фазикош О.В.', label: 'Фазикош О.В.' },
        { value: 'Хамник М.М.', label: 'Хамник М.М.' },
        { value: 'Шепетко І.О.', label: 'Шепетко І.О.' },
        { value: 'Шумило Н.Б.', label: 'Шумило Н.Б.' },
      ];  

    return (
        <div className={"form"}>
            <h6>Ужгородський міськрайонний суд</h6>
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

export default Uzhhorod;