import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { firebaseApi } from "../../api/api"
import TYPES from './notesTypes'

export function* noteWatcherSaga(){
    while(true){
        yield takeLatest(TYPES.REQUEST_NOTES, fetchNotesSaga)
        yield takeEvery(TYPES.REQUEST_ADD_NOTE, addNoteSaga)
        yield takeEvery(TYPES.REQUEST_REMOVE_NOTE, removeNoteSaga)
        yield takeEvery(TYPES.REQUEST_COMPLETE_NOTE, changeCompleteSaga)
    }
}


function* fetchNotesSaga(action) {
    yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: true } })
    const res = yield call(firebaseApi.getNotes, action.projectID)
    let payload = []
    if (res.data) {payload = Object.keys(res.data).map(key => ({ ...res.data[key], id: key }))
    }
    yield put({ type: TYPES.FETCH_NOTES, payload })
    yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: false } })

}
function* addNoteSaga(action) {
    try {
        const res = yield call(firebaseApi.addNotes, action.note, action.projectID);
        yield put({
            type: TYPES.ADD_NOTE,
            payload: {
                ...action.note,
                id: res.data.name
            }
        })
    } catch (e) {
        console.log(e)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}
function* removeNoteSaga(action) {
    try {
        const res = yield call(firebaseApi.removeNote, action.projectID, action.noteID);
        if (res.status === 200) {
            yield put({
                type: TYPES.REMOVE_NOTE,
                payload: action.noteID
            })
        }
    } catch (e) {
        console.log(e)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}
function* changeCompleteSaga(action) {
    try {
        const res = yield call(firebaseApi.changeComplete, action.note, action.projectID)
        if (res.status === 200) {
            yield put({
                type: TYPES.COMPLETE_NOTE,
                payload: action.note.id
            })
        }
    } catch (e) {
        console.log(e)
        yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
    }
}