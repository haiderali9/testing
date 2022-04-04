import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import store from '../../../store/store';
import CreateUser from '../createUser/CreateUser.index';
import {getAdmins} from '../Admin.thunk';
import AdminReducer from '../Admin.reducer';

const MockComponent = ({children}) => {
    return <Provider store={store}>{children}</Provider>;
};

describe('Create Admin', () => {
    const initialState = {
        loading: false,
        error: null,
        successMessage: null,
        admins: null
    };

    it('Should render create admin component', () => {
        render(<CreateUser />, {wrapper: MockComponent});
    });
    it('should populate fields and click submit button', async () => {
        const {getByTestId, findByTestId, getByPlaceholderText} = render(
            <CreateUser />,
            {
                wrapper: MockComponent
            }
        );
        const userName = getByPlaceholderText('Admin User Name');
        const password = getByPlaceholderText('Password');
        const role = getByTestId('Role');
        const fullName = getByPlaceholderText('Full Name');
        const cnic = getByPlaceholderText('CNIC');
        const phoneNumber = getByPlaceholderText('Phone Number');
        const status = getByTestId('Status');
        const userType = getByTestId('UserType');

        fireEvent.change(userName, {target: {value: 'Behram'}});
        fireEvent.change(password, {target: {value: 'qwertyuiop'}});
        fireEvent.change(role, {target: {value: 'Admin'}});
        fireEvent.change(fullName, {target: {value: 'BehramKhan'}});
        fireEvent.change(cnic, {target: {value: '1730198765432'}});
        fireEvent.change(phoneNumber, {target: {value: '17301987'}});
        fireEvent.change(status, {target: {value: 'blocked'}});
        fireEvent.change(userType, {target: {value: 'Internal'}});

        const formObj = {
            userName: userName.value,
            password: password.value,
            role: role.value,
            fullName: fullName.value,
            cnic: cnic.value,
            phoneNumber: phoneNumber.value,
            status: status.value,
            userType: userType.value
        };

        const button = getByTestId('submitButton');
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        waitFor(async () =>
            expect(await findByTestId('submitButton')).not.toBeVisible()
        );

        const spinner = findByTestId('spinner');

        waitFor(() => expect(spinner).toBeInTheDocument());
    });
    it('Should throw falsy values for invalid values', () => {
        const {getByTestId, getByPlaceholderText} = render(<CreateUser />, {
            wrapper: MockComponent
        });
        const userName = getByPlaceholderText('Admin User Name');
        const role = getByTestId('Role');
        const status = getByTestId('Status');
        const userType = getByTestId('UserType');

        fireEvent.change(userName, {target: {value: '123'}});
        fireEvent.change(role, {target: {value: 'example'}});
        fireEvent.change(status, {target: {value: 'abc'}});
        fireEvent.change(userType, {target: {value: 'xyz'}});

        expect(userName.value).toBeFalsy();
        expect(role.value).toBeFalsy();
        expect(status.value).toBeFalsy;
        expect(userType.value).toBeFalsy();
    });
    it('should handle initial state', () => {
        expect(AdminReducer(undefined, {type: 'unknown'})).toEqual({
            loading: false,
            error: null,
            successMessage: null,
            admins: null
        });
    });

    it('should handle getAdmins in pending stage', () => {
        const action = {type: getAdmins.pending.type};
        const state = AdminReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: true
        });
    });
    it('should handle get admins in fullfIlled stage', async () => {
        const action = {type: getAdmins.fulfilled.type, payload: {}};
        const state = AdminReducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            loading: false
        });
    });
    it('should handle get admins in rejected stage', async () => {
        const action = {type: getAdmins.rejected.type};
        const state = AdminReducer(initialState, action);
        console.log(state);
        expect(state).toEqual({
            ...initialState,
            loading: false
        });
    });
});
