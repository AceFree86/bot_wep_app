import React, {useCallback, useEffect, useState} from 'react';
import './Perechin.css';
import { useTelegram } from "../../hooks/useTelegram";
import { Form } from "react-bootstrap";

const Perechin = () => {
    const [country, setCountry] = useState('');
    const [formset, setFormset] = useState('physical');
    const [court, setCourt] = useState('physical');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = { country, formset, court }
        tg.sendData(JSON.stringify(data));
    }, [country, formset, court])


    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {tg.offEvent('mainButtonClicked', onSendData)}
    }, [onSendData])


    useEffect(() => {
        tg.MainButton.setParams({text: 'Отправить данные'})
        tg.MainButton.show();
    }, [])


    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }


    const onChangeFormset = (e) => {
        setFormset(e.target.value)
    }


    const onChangeCourt = (e) => {
        setCourt(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>

           <input className={'input'} type="text" placeholder={'Страна'} value={country} onChange={onChangeCountry}/>

            <Form.Group controlId="formBasicSelect">
            <Form.Label></Form.Label>
            <Form.Label></Form.Label>
                <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                <Form.Label></Form.Label>
                <Form.Control as="select" value={court} onChange={onChangeCourt} className={'select'}>
                    <option value="Склад суду">Склад суду</option>
                    <option value="Ганько І.І.">Ганько І.І.</option>
                    <option value="Гевці В.М.">Гевці В.М.</option>
                    <option value="Чепурнов В.О.">Чепурнов В.О.</option>
                </Form.Control>
                <Form.Label></Form.Label>
                <Form.Control as="select" value={formset} onChange={onChangeFormset} className={'select'}>
                    <option value="Форма судочинства">Форма судочинства</option>
                    <option value="Адміністративні правопорушення">Адміністративні правопорушення</option>
                    <option value="Кримінальне судочинство">Кримінальне судочинство</option>
                    <option value="Цивільне судочинство">Цивільне судочинство</option>
                </Form.Control>
            </Form.Group>
        </div>
    );
};

export default Perechin;