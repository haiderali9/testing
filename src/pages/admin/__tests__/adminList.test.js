import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import store from '../../../store/store';
import Admin from '../adminList/Admin.index';

const MockComponent = ({children}) => {
    return <Provider store={store}>{children}</Provider>;
};

describe('Admin List', () => {
    it('should render  data tabel', () => {
        const {getByTestId} = render(<Admin />, {
            wrapper: MockComponent
        });

        const table = getByTestId('dataTable');
        expect(table).toBeInTheDocument();
    });

    it('Should make block admin action', async () => {
        const {findByTestId, getByTestId, getAllByTestId} = render(<Admin />, {
            wrapper: MockComponent
        });
        const blockBtn = getAllByTestId('blockButton');
        const blockAlert = findByTestId('blockAlert');
        fireEvent.click(blockBtn[0]);
        waitFor(() => expect(blockAlert).toBeInTheDocument());
    });
    it('Should make unblock admin action', async () => {
        const {findByTestId, getAllByTestId} = render(<Admin />, {
            wrapper: MockComponent
        });
        const unblockBtn = getAllByTestId('unblockButton');
        const unBlockAlert = findByTestId('unBlockAlert');

        fireEvent.click(unblockBtn[0]);
        waitFor(() => expect(unBlockAlert).toBeInTheDocument());
    });
});
