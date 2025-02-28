// housingService.test.ts
import {getHousingCompletionRatios, getHousingTotalStartsCompletions} from './housingService';
import fetchMock from 'jest-fetch-mock';

beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

//it('successfully fetches housing data', async () => {
//  const mockData = [{ id: 1, name: 'Test Data' }];
//  fetchMock.mockResponseOnce(JSON.stringify(mockData));

//  const data = await getAllHousingStartsCompletions();
//  expect(data).toEqual(mockData);
//  expect(fetchMock.mock.calls.length).toEqual(1);
//  expect(fetchMock.mock.calls[0][0]).toEqual('/api/housing/starts-completions/all');
//});

it("successfully fetches housing completion ratio data", async () => {
  const mockData = [{id: 1, name: 'Test Data'}];
  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  const data = await getHousingCompletionRatios();
  expect(data).toEqual(mockData);
  expect(fetchMock.mock.calls.length).toEqual(1);
  expect(fetchMock.mock.calls[0][0]).toEqual('/api/housing/starts-completions/ratio');
});

it('handles fetch failure', async () => {
  fetchMock.mockReject(new Error('API failure'));

  const data = await getHousingCompletionRatios();
  expect(data).toEqual([]);  // Check that it returns an empty array instead of throwing
});


it("Successfully fetches total housing starts and completions data", async () => {
  const mockData = [{id: 1, name: 'Test Data'}];
  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  const data = await getHousingTotalStartsCompletions();
  expect(data).toEqual(mockData);
  expect(fetchMock.mock.calls.length).toEqual(1);
  expect(fetchMock.mock.calls[0][0]).toEqual('/api/housing/starts-completions/total');
});

it('handles fetch failure', async () => {
  fetchMock.mockReject(new Error('API failure'));

  const data = await getHousingTotalStartsCompletions();
  expect(data).toEqual([]);  // Check that it returns an empty array instead of throwing
});
