import { vi } from 'vitest';
import request from 'supertest';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const express = require('express');
const app = express();

beforeEach(() => {
  vi.resetAllMocks();
});

afterEach(cleanup);

test('GET /api/servers', () => {
  it('should fetch all servers', async () => {
    const mockResults = [
      { id: '1', name: 'Server 1', type: 'large', status: 'running' },
      { id: '2', name: 'Server 2', type: 'medium', status: 'stopped' },
    ];
    vi.fn().mockResolvedValue(mockResults);

    const response = await request(app).get('/api/servers');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResults);
  });
});

test('POST /api/server', () => {
  it('should create a new server', async () => {
    const serverData = {
      name: 'New Server',
      type: 'small',
      status: 'running',
    };

    const response = await request(app).post('/api/server').send(serverData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(serverData);
  });
});

test('GET /api/server/:id', () => {
  it('should fetch a server by id', async () => {
    const serverId = '1';
    const expectedServer = {
      id: serverId,
      name: 'Server 1',
      type: 'large',
      status: 'running',
    };

    const response = await request(app).get(`/api/server/${serverId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedServer);
  });

  it('should return 404 for non-existent server', async () => {
    const serverId = 'non-existent-id';

    const response = await request(app).get(`/api/server/${serverId}`);

    expect(response.status).toBe(404);
  });
});

afterEach(() => {
  cleanup();
});
