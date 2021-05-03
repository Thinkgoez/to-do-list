import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserAction } from '../../actions/actionCreator';
import { Loader } from '../Loader/Loader';


const PrivateHoc = (Component, props) => {

    const mapStateToProps = (state) => {
        return state.auth;
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            getUser: (data) => dispatch(getUserAction(data))
        }
    };

    const Hoc = (properties) => {
        useEffect(() => {
            // if (!properties.data)
            properties.getUser(() => {
                properties.history.replace('/login')
            });
        }, [properties.error]);
        console.log('PrivateHoc:', Component.displayName)
        // console.log('PrivateHoc:', properties)
        return (<>
            {properties.isFetching ? <Loader /> :
                <Component history={properties.history} match={properties.match} {...props} />}
        </>)
    }


    // class Hoc extends React.Component {
    //     componentDidMount() {

    //         this.props.getUser(() => {
    //             this.props.history.replace('/login')
    //         });

    //     }

    //     render() {
    //         console.log('PrivateHoc:', Component.displayName)
    //         return (<>
    //             {this.props.isFetching ? <Loader /> :
    //                 <Component history={this.props.history} match={this.props.match} {...props} />}
    //         </>)
    //     }
    // }

    return connect(mapStateToProps, mapDispatchToProps)(Hoc);
};


export default PrivateHoc;
