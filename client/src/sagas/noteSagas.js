import { call, put } from 'redux-saga/effects';
import { Api } from '../api/api';
import TYPES from '../actions/actionTypes';


export function* fetchNotesSaga(action) {
    try {
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: true } })
        const res = yield call(Api.getNotesByProjectID, action.payload) // projectID
        let payload = []
        if (res.data) {
            payload = res.data
        } else if (res.status === 401) {
            yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Ошибка авторизации', type: 'danger' } })
        }
        yield put({ type: TYPES.FETCH_NOTES, payload })
        yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: false } })
    } catch (error) {
        console.log(error)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Не удалось загрузить задачи', type: 'danger' } })
    }

}

export function* addNoteSaga(action) {
    try {
        const res = yield call(Api.addNote, action.payload.note, action.payload.projectID)
        yield put({
            type: TYPES.ADD_NOTE,
            payload: {
                ...action.payload.note,
                ...res.data
            }
        })
    } catch (e) {
        console.log(e)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Не удалось добавить новое задачу', type: 'danger' } })
    }
}
export function* removeNoteSaga(action) {
    try {
        const res = yield call(Api.removeNote, action.payload) // noteID
        if (res.status === 200) {
            yield put({
                type: TYPES.REMOVE_NOTE,
                payload: action.payload
            })
        }
    } catch (e) {
        console.log(e)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Не удалось удалить задачу', type: 'danger' } })
    }
}
export function* changeCompleteSaga(action) {
    try {
        const res = yield call(Api.updateNote, action.payload) // note
        if (res.status === 200) {
            yield put({
                type: TYPES.COMPLETE_NOTE,
                note: action.payload
            })
        }
    } catch (e) {
        console.log(e)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Не удалось изменить задачу', type: 'danger' } })
    }
}