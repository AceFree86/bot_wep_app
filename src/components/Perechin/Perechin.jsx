import React, {useCallback, useEffect, useState} from 'react';
import './Perechin.css';
import moment from 'moment';
import { useTelegram } from "../../hooks/useTelegram";
import { Form } from "react-bootstrap";

const Perechin = () => {

    const [date, setDob] = useState(moment().format('YYYY-MM-DD'));
    const [formset, setFormset] = useState('');
    const [court, setCourt] = useState('');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = { date, formset, court }
        tg.sendData(JSON.stringify(data));
    }, [date, formset, court])


    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {tg.offEvent('mainButtonClicked', onSendData)}
    }, [onSendData])


    useEffect(() => {
        tg.MainButton.setParams({text: 'Пошук'})
        tg.MainButton.show();
    }, [])


    const onChangeDate = (e) => {
        const newDate = moment(e.target.value.timeStamp).format('YYYY-MM-DD');
        setDob(newDate)
    }


    const onChangeFormset = (e) => {
        setFormset(e.target.value)
    }


    const onChangeCourt = (e) => {
        setCourt(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Фільтри пошуку</h3>
                <Form.Control size="lg" as="select" value={court} onChange={onChangeCourt} className={'selectF'}>
                    <option value="Склад суду">Склад суду</option>
                    <option value="Ганько І.І.">Ганько І.І.</option>
                    <option value="Гевці В.М.">Гевці В.М.</option>
                    <option value="Чепурнов В.О.">Чепурнов В.О.</option>
                </Form.Control>
                <br />
                <Form.Control size="lg" as="select" value={formset} onChange={onChangeFormset} className={'selectF'}>
                    <option value="Форма судочинства">Форма судочинства</option>
                    <option value="Адміністративні правопорушення">Адміністративні правопорушення</option>
                    <option value="Кримінальне судочинство">Кримінальне судочинство</option>
                    <option value="Цивільне судочинство">Цивільне судочинство</option>
                </Form.Control>
                <br />
                <Form.Control size="lg" type="date" value={date} name="dob" onChange={onChangeDate} className={'selectF'} />
        </div>
    );
};

export default Perechin;