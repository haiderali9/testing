import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import storage from 'redux-persist/lib/storage';
import {permissionSlice} from '@app/pages/roles/assignPermissions/AssignPermissions.reducer';
import {AssignRolesSlice} from '@app/pages/admin/assignRoles/AssignRoles.reducer';
import {RegisterApplicationSlice} from '@app/pages/relyingParties/rpApplicationRegistration/RpApplicationRegistration.reducer';
import {BlackListUserSlice} from '@app/pages/blackListUser/BlackListUser.reducer';
import {OpenRegistrationSlice} from '@app/pages/userVerification/openRegistrations/OpenRegistrations.reducer';
import {AssignedToMeRegistrationSlice} from '@app/pages/userVerification/assignedToMeRegistrations/AssignedToMeRegistrations.reducer';
import {RegistrationTabsSlice} from '@app/pages/userVerification/userRegistrationTabs/UserRegistrationTabs.reducer';
import {ManualEntrySlice} from '@app/pages/userVerification/registrationDetails/manualEntryPage/ManualEntry.reducer';
import {serverPhotoComparisonSlice} from '@app/pages/userVerification/registrationDetails/serverPhotoComparison/ServerPhotoComparison.reducer';
import {FinalUserDataSlice} from '@app/pages/userVerification/registrationDetails/finalUserData/finalUserData.reducer';
import {NadraVerisysSlice} from '@app/pages/userVerification/registrationDetails/nadraVerisys/NadraVerisys.reducer';
import {LivenessTestSlice} from '@app/pages/userVerification/registrationDetails/livenessTest/LivenessTest.reducer';
import {NadraVerisysOcrSlice} from '@app/pages/userVerification/registrationDetails/nadraVerisysOCR/NadraVerisysOCR.reducer';
import {AssignedRegistrationSlice} from '@app/pages/userVerification/assignedRegistrations/AssignedRegistrations.reducer';
import {NominateUserSlice} from '@app/pages/nominateUser/NominateUser.reducer';
import {roleSlice} from '@app/pages/roles/Roles.reducer';
import {authSlice} from './reducers/auth';
import {uiSlice} from './reducers/ui';
import {partiesSlice} from '../pages/relyingParties/RelyingParties.reducer';
import {adminSlice} from '../pages/admin/Admin.reducer';

const reducers = combineReducers({
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    relyingParties: partiesSlice.reducer,
    admin: adminSlice.reducer,
    role: roleSlice.reducer,
    permissions: permissionSlice.reducer,
    assignRole: AssignRolesSlice.reducer,
    nominateUser: NominateUserSlice.reducer,
    registerApplication: RegisterApplicationSlice.reducer,
    blackListUser: BlackListUserSlice.reducer,
    openRegistration: OpenRegistrationSlice.reducer,
    assignedToMeRegistration: AssignedToMeRegistrationSlice.reducer,
    registrationTabs: RegistrationTabsSlice.reducer,
    manualEntry: ManualEntrySlice.reducer,
    finalUserData: FinalUserDataSlice.reducer,
    nadraVerisys: NadraVerisysSlice.reducer,
    serverPhotoComparison: serverPhotoComparisonSlice.reducer,
    livenessTest: LivenessTestSlice.reducer,
    nadraVerisysOcr: NadraVerisysOcrSlice.reducer,
    assignedRegistration: AssignedRegistrationSlice.reducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'manualEntry', 'nadraVerisysOcr', 'nadraVerisys']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store);
