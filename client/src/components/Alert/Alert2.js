import * as React from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { hide } from "../../actions/actionCreator";

const Alert = ({ visible, type = "", text, hide }) => {
    const options = {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };
    if (visible) {
        switch (type) {
            case 'error':
                toast.error(text, options);
                break;
            case 'success':
                toast.success(text, options);
                break;

            default:
                toast(text, options);
                break;
        }
    }

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

const mapStateToProps = (state) => ({
    visible: state.alert.visible,
    text: state.alert.text,
    type: state.alert.type,
});
export default connect(mapStateToProps, { hide })(Alert);
