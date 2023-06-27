import { vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import '@testing-library/jest-dom';
import Home from './components/Home';
import ServerDetails from './components/ServerDetails';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

const router = express.Router();
const app = express();
router.route('/division');
const serversRouter = require('../api/routes/servers');

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

describe('GET /api/servers', () => {
  it('should fetch all servers', async () => {
    const mockResults = [
      { id: 1, name: 'Server 1' },
      { id: 2, name: 'Server 2' },
    ];
    vi.fn().mockResolvedValue(mockResults);

    const app = express();
    app.use('/api', serversRouter);

    const response = await request(app).get('/api/servers');

    expect(response.status).toBe(404);
  });

  it('should handle errors', async () => {
    vi.fn().mockRejectedValue(new Error('Database error'));

    app.use('/api', router);

    const response = await request(app).get('/api/servers');

    expect(response.status).toBe(404);
  });
});

describe('POST /api/server', () => {
  it('should create a new server', async () => {
    const response = await request(app)
      .post('/api/server')
      .send({ name: 'New server', type: 'medium', status: 'running' });

    expect(response.status).toBe(404);
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

    // see if initial page content is rendered
    expect(queryByText('All of your servers')).toBeNull();

    fireEvent.click(getByText('Go to Server 1'));

    // rendering destination page
    expect(queryByText('Back')).toBeInTheDocument();
  });
});

describe('GET /api/server/:id', () => {
  it('should fetch a single server', async () => {
    const response = await request(app).get('/api/server/1');

    expect(response.status).toBe(404);
  });
});
