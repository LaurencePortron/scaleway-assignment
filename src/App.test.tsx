import '@testing-library/jest-dom';
import ServerDetails from './components/ServerDetails';
import { renderHook, act } from '@testing-library/react';
import ServersTable from '../src/components/ServersTable';
import Home, { IColumn, IServer } from './components/Home';
import { render, screen, fireEvent } from '@testing-library/react';
import { ISortDirection, useSortable } from '../src/hooks/useSortable';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

describe('Page Navigation', () => {
  it('should navigate to a home page', () => {
    render(
      <Router>
        <Routes>
          <Route path='/' element={<Link to='/'></Link>} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    );

    test('renders headline', () => {
      render(<Home />);
      const headline = screen.getByText(/All of your servers/i);
      expect(headline).toBeInTheDocument();
    });
  });
});

describe('Page Navigation on Button Click', () => {
  it('should navigate to a new page on button click', () => {
    const { getByText, queryByText } = render(
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Link to='/server/1'>Go to Server 1</Link>
              </>
            }
          />
          <Route path='/server/:id' element={<ServerDetails />} />
        </Routes>
      </Router>
    );
    expect(queryByText('All of your servers')).toBeNull();

    fireEvent.click(getByText('Go to Server 1'));

    expect(queryByText('Back')).toBeInTheDocument();
  });
});

describe('useSortable', () => {
  it('should initialize the table with the provided initial sort config', () => {
    const initialConfig = {
      key: 'name' as keyof IServer,
      direction: 'asc' as ISortDirection,
    };

    const { result } = renderHook(() => useSortable({ initialConfig }));

    expect(result.current.sortConfig).toEqual(initialConfig);
  });

  it('should update sortConfig when handleSort is called', () => {
    const { result } = renderHook(() =>
      useSortable({ initialConfig: { key: null, direction: null } })
    );

    expect(result.current.sortConfig).toEqual({ key: null, direction: null });

    act(() => {
      result.current.handleSort('name');
    });

    expect(result.current.sortConfig).toEqual({
      key: 'name',
      direction: 'asc',
    });

    act(() => {
      result.current.handleSort('name');
    });

    expect(result.current.sortConfig).toEqual({
      key: 'name',
      direction: 'desc',
    });
  });
});

test('ServersTable', () => {
  const tableData: IServer[] = [
    { id: '1', name: 'Server 1', type: 'large', status: 'running' },
    { id: '2', name: 'Server 2', type: 'medium', status: 'stopped' },
    { id: '3', name: 'Server 3', type: 'small', status: 'running' },
  ];

  const columns: IColumn[] = [
    { label: 'Name', accessor: 'name', sortable: true },
    { label: 'Type', accessor: 'type', sortable: true },
    { label: 'Status', accessor: 'status', sortable: true },
  ];

  it('should render the sortable table', () => {
    render(
      <Router>
        <ServersTable data={tableData} columns={columns} />
      </Router>
    );

    // Verify initial order
    const tableRows = screen.getAllByRole('row');
    expect(tableRows[1]).toHaveTextContent('Server 1');
    expect(tableRows[2]).toHaveTextContent('Server 2');
    expect(tableRows[3]).toHaveTextContent('Server 3');

    const headerName = screen.getByRole('columnheader', { name: 'name' });
    fireEvent.click(headerName);

    // Verify sorted order
    expect(tableRows[1]).toHaveTextContent('Server 1');
    expect(tableRows[2]).toHaveTextContent('Server 3');
    expect(tableRows[3]).toHaveTextContent('Server 2');
  });
});
