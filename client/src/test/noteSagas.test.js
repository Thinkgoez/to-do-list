import { call, put } from "redux-saga/effects"
import { Api } from "../api/api"
import TYPES from '../redux/types'
import assert from 'assert'
// export function* noteWatcherSaga(){
//     while(true){

//     }
// }



function* fetchNotesSaga(action) {
    // yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: true } })
    const res = yield call(Api.getNotesByProjectID, action.projectID)
    let payload = []
    if (res.data) {
        payload = Object.keys(res.data).map(key => ({ ...res.data[key], id: key }))
    }
    yield put({ type: TYPES.FETCH_NOTES, payload })
    yield put({ type: TYPES.CHANGE_LOADER, payload: { loading: false } })
}
it('e', () => {
    const action = { projectID: 1 }
    const gen = fetchNotesSaga(action);
    console.log(gen.next().value)
    
    assert.deepEqual(
        gen.next().value,
        call(Api.getNotesByProjectID, action.projectID),
        'it should wait for a data from API'
    );
    // console.log(gen.value)
});



// export function* addNoteSaga(action) {
//     try {
//         const res = yield call(Api.addNote, action.note, action.projectID);
//         yield put({
//             type: TYPES.ADD_NOTE,
//             payload: {
//                 ...action.note,
//                 id: res.data.name
//             }
//         })
//     } catch (e) {
//         console.log(e)
//         yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
//     }
// }
// export function* removeNoteSaga(action) {
//     try {
//         const res = yield call(Api.removeNote, action.projectID, action.noteID);
//         if (res.status === 200) {
//             yield put({
//                 type: TYPES.REMOVE_NOTE,
//                 payload: action.noteID
//             })
//         }
//     } catch (e) {
//         console.log(e)
//         yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
//     }
// }
// export function* changeCompleteSaga(action) {
//     try {
//         const res = yield call(Api.updateNote, action.note, action.projectID)
//         if (res.status === 200) {
//             yield put({
//                 type: TYPES.COMPLETE_NOTE,
//                 payload: action.note.id
//             })
//         }
//     } catch (e) {
//         console.log(e)
//         yield put({ type: TYPES.SHOW_ALERT, payload: { text: 'Что-то пошло не так', type: 'danger' } })
//     }
// }