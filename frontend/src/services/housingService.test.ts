// housingService.test.ts
import { getAllHousingStartsCompletions } from './housingService';
import fetchMock from 'jest-fetch-mock';

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

it('successfully fetches housing data', async () => {
  const mockData = [{ id: 1, name: 'Test Data' }];
  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  const data = await getAllHousingStartsCompletions();
  expect(data).toEqual(mockData);
  expect(fetchMock.mock.calls.length).toEqual(1);
  expect(fetchMock.mock.calls[0][0]).toEqual('/api/housing/starts-completions/all');
});

it('handles fetch failure', async () => {
  fetchMock.mockReject(new Error('API failure'));

  const data = await getAllHousingStartsCompletions();
  expect(data).toEqual([]);  // Check that it returns an empty array instead of throwing
});
