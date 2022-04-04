import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {useFormik} from 'formik';
import Spinner from '@app/spinner/Spinner';
import {Button, Input} from '@components';
import {faSignature, faLock} from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';
import {login, meraidLogin} from '../../store/reducers/auth.thunk';
import {resetMessage} from '../../store/reducers/auth';
import TextInputField from '../../components/input/TextInputField';

const Login = () => {
    const {error, isLoggedIn, isLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();
    const loginUser = async (formData) => {
        dispatch(login(formData));
    };
    useEffect(() => {
        if (isLoggedIn) {
            history.replace('/');
        }
    }, [isLoggedIn]);
    const formik = useFormik({
        initialValues: {
            userName: '',
            password: ''
        },
        validationSchema: Yup.object({
            userName: Yup.string().required('Required'),
            password: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .max(30, 'Must be 30 characters or less')
                .required('Required')
        }),
        onSubmit: (values) => {
            loginUser(values);
            dispatch(resetMessage());
        }
    });

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        getValues,
        reset
    } = useForm({
        mode: 'all'
    });
    const loginWithMeraid = (data) => {
        dispatch(meraidLogin(data));
    };

    return (
        <div className="main content h-100">
            <div className="row h-100">
                <div className="col-6 col-md-6 col-sm-4 d-xs-none bg-primary d-flex justify-content-center align-items-center hidden-xs">
                    <div className="logo">
                        <img src="/logo.png" alt="logo" />
                    </div>
                </div>
                <div className="col-6 col-md-6 col-sm-8  d-flex justify-content-center align-items-center">
                    <div className="form-width">
                        <div className="text-center pb-4">
                            <Link
                                to="/"
                                className="h1 text-decoration-none text-primary"
                            >
                                <b>meraID</b>
                            </Link>
                        </div>
                        <Tabs
                            defaultActiveKey="loginWithMeraid"
                            className="mb-3"
                        >
                            <Tab eventKey="userId" title="User ID">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <Input
                                            icon={faSignature}
                                            placeholder="User Name"
                                            type="text"
                                            formik={formik}
                                            formikFieldProps={formik.getFieldProps(
                                                'userName'
                                            )}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <Input
                                            icon={faLock}
                                            placeholder="Password"
                                            type="password"
                                            formik={formik}
                                            formikFieldProps={formik.getFieldProps(
                                                'password'
                                            )}
                                        />
                                    </div>
                                    {error && (
                                        <p className="error-msg">{error}</p>
                                    )}
                                    <div className="row">
                                        <div className="col-4">
                                            {isLoading ? (
                                                <Spinner />
                                            ) : (
                                                <Button block type="submit">
                                                    Sign In
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </Tab>
                            <Tab eventKey="loginWithMeraid" title="MeraID">
                                <form>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="m-0">
                                                <TextInputField
                                                    name="userId"
                                                    placeholder="e.g  17301-2811334-1"
                                                    className="form-control"
                                                    register={register}
                                                    error={errors.userId}
                                                    maxLength="13"
                                                    onChange={(e) => {
                                                        reset({
                                                            ...getValues(),
                                                            userId: e.target.value.replace(
                                                                /[^0-9.]/g,
                                                                ''
                                                            )
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {error && (
                                        <p className="error-msg">{error} !</p>
                                    )}
                                    <div className="row">
                                        <div className="col-4">
                                            {isLoading ? (
                                                <Spinner />
                                            ) : (
                                                <Button
                                                    disabled={!isValid}
                                                    block
                                                    type="submit"
                                                    onClick={handleSubmit(
                                                        loginWithMeraid
                                                    )}
                                                >
                                                    Log In
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
