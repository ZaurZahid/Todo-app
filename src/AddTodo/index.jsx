import React from 'react'
import style from './addTodo.module.css'
import { useForm } from "react-hook-form";
import { maxAfterAMonth, minToday } from './../../components/utils/index';
import { useDispatch, useSelector } from 'react-redux';
import { createNewTodo } from '../redux/actions/items';
import { I18n } from 'react-redux-i18n';

function index({ setAlert, editingRow, setSearch }) {
    const dispatch = useDispatch();
    const todoState = useSelector((state) => state.todoState);

    const { handleSubmit, register, reset } = useForm({
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            deadline: minToday(),
        }
    });

    const onSubmit = handleSubmit(async (values) => {
        if (values.name.trim()) {
            dispatch(createNewTodo(values))

            reset()
            setSearch('')
            setAlert({
                bgC: '#04ff00',
                open: true,
                message: I18n.t('New todo added')
            })
        }
    })

    return (
        <>
            <h2 className={style.CreateTitle}>{I18n.t('Create new todo')}</h2>
            <form onSubmit={onSubmit} className={style.FormContainer}>
                <textarea
                    cols="30"
                    rows="4"
                    name="name"
                    placeholder={I18n.t('Enter task name')}
                    required
                    {...register('name')}
                    className={[style.Input, style.Textarea].join(' ')}
                />
                <input
                    type="date"
                    name="deadline"
                    required
                    {...register('deadline')}
                    max={maxAfterAMonth()}
                    min={minToday()}
                    onKeyDown={(e) => e.preventDefault()}
                    className={[style.Input, style.Date].join(' ')}
                />

                <button type="submit" disabled={todoState.field_loading || editingRow} className={style.Button}>{I18n.t('Add')}</button>
            </form>
        </>
    )
}

export default index
