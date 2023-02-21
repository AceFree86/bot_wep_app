import React, {useCallback, useEffect, useState} from 'react';
import './Perechin.css';
import moment from 'moment';
import { useTelegram } from "../../hooks/useTelegram";
import { Form } from "react-bootstrap";

const Perechin = () => {
    const today = new Date().toISOString().substr(0, 10);

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


    const onChangeDate = (e) => {
        const newDate = moment(e.target.value.timeStamp).format('YYYY-MM-DD');
        setob(date)
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
            <h6>Перечинський районний суд</h6>
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
                <Form.Control type="date" name="dob" placeholder="Due date" value={dob} onChange={(e) => setDob(e.target.value)}
                defaultValue={today} />
        </div>
    );
};

export default Perechin;