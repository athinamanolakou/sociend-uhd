//import {
//    getAllNotes,
//    getNote,
//    addNote,
//    updateNote,
//    getTotalNotesCount,
//    getCompletedNotesCount,
//} from './noteService'; // Importing the functions to test
//import {Note} from '../types/Note'; // Importing the Note type

//global.fetch = jest.fn(); // Mock the global fetch function for all tests

//// Run before all tests - mock console logs to keep test output clean
//beforeAll(() => {
//    jest.spyOn(console, 'log').mockImplementation(() => undefined);
//    jest.spyOn(console, 'error').mockImplementation(() => undefined);
//});

//// Restore original console methods after all tests
//afterAll(() => {
//    (console.log as jest.Mock).mockRestore();
//    (console.error as jest.Mock).mockRestore();
//});

//describe('noteService', () => {
//    afterEach(() => {
//        jest.clearAllMocks(); // Clear mocks after each test to reset fetch behavior
//    });

//    // Tests for getAllNotes function
//    describe('getAllNotes', () => {
//        it('should fetch all notes successfully', async () => {
//            // Mock data for notes
//            const mockNotes: Note[] = [
//                {id: 1, text: 'Test Note 1', status: 'NOT STARTED'},
//                {id: 2, text: 'Test Note 2', status: 'DONE'},
//            ];
//            // Mocking fetch to return the mock notes
//            (fetch as jest.Mock).mockResolvedValueOnce({
//                ok: true,
//                json: async () => mockNotes,
//            });

//            const notes = await getAllNotes(); // Call the function
//            expect(fetch).toHaveBeenCalledWith('/api/notes/all'); // Ensure correct API was called
//            expect(notes).toEqual(mockNotes); // Check if notes match the mock data
//        });

//        it('should return an empty array if fetch fails', async () => {
//            // Mock fetch to reject with an error
//            (fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch error'));

//            const notes = await getAllNotes(); // Call the function
//            expect(fetch).toHaveBeenCalledWith('/api/notes/all'); // Ensure correct API was called
//            expect(notes).toEqual([]); // Check if it returns an empty array
//        });
//    });

//    // Tests for getNote function
//    describe('getNote', () => {
//        it('should fetch a single note by ID', async () => {
//            // Mock data for a single note
//            const mockNote: Note = {
//                id: 1,
//                text: 'Test Note',
//                status: 'NOT STARTED',
//            };
//            // Mock fetch to return the mock note
//            (fetch as jest.Mock).mockResolvedValueOnce({
//                ok: true,
//                json: async () => mockNote,
//            });

//            const note = await getNote(1); // Call the function with ID 1
//            expect(fetch).toHaveBeenCalledWith('/api/notes/get/1'); // Ensure correct API was called
//            expect(note).toEqual(mockNote); // Check if note matches the mock data
//        });

//        it('should throw an error if fetch fails', async () => {
//            // Mock fetch to simulate a 404 error
//            (fetch as jest.Mock).mockResolvedValueOnce({
//                ok: false,
//                status: 404,
//            });

//            // Ensure the function throws an error
//            await expect(getNote(1)).rejects.toThrow('HTTP error! Status: 404');
//        });
//    });

//    // Tests for addNote function
//    describe('addNote', () => {
//        it('should add a new note successfully', async () => {
//            // Mock new note (no id yet)
//            const mockNewNote: Omit<Note, 'id'> = {
//                text: 'New Note',
//                status: 'NOT STARTED',
//            };

//            // Mock the server's response (including the id)
//            const addedNote: Note = {
//                id: 1,
//                ...mockNewNote
//            };

//            // Mock fetch to return the added note
//            (fetch as jest.Mock).mockResolvedValueOnce({
//                ok: true,
//                json: async () => addedNote,
//                headers: {get: jest.fn(() => 'application/json')},
//            });

//            // Call the addNote function
//            const result = await addNote(mockNewNote);

//            // Check that the correct endpoint and payload were used
//            expect(fetch).toHaveBeenCalledWith('/api/notes/add', {
//                method: 'POST',
//                headers: {'Content-Type': 'application/json'},
//                body: JSON.stringify(mockNewNote),
//            });

//            // Check that the result matches the mock response
//            expect(result).toEqual(addedNote);
//        });


//        it('should throw an error if adding a note fails', async () => {
//            // Mock data for the note to add
//            const mockNewNote: Omit<Note, 'id'> = {
//                text: 'New Note',
//                status: 'NOT STARTED',
//            };

//            // Mock fetch to reject with an error
//            (fetch as jest.Mock).mockRejectedValueOnce(new Error('Add note error'));

//            // Ensure the function throws an error
//            await expect(addNote(mockNewNote)).rejects.toThrow('Add note error');
//        });
//    });

//    // Tests for updateNote function
//    describe('updateNote', () => {
//        it('should update a note successfully and return JSON', async () => {
//            // Mock data for the note to update
//            const mockNote: Note = {
//                id: 1,
//                text: 'Updated Note',
//                status: 'DONE',
//            };
//            // Mock fetch to return the updated note
//            (fetch as jest.Mock).mockResolvedValueOnce({
//                ok: true,
//                json: async () => mockNote,
//                headers: {get: jest.fn(() => 'application/json')},
//            });

//            const result = await updateNote(mockNote); // Call the function
//            expect(fetch).toHaveBeenCalledWith('/api/notes/update', {
//                method: 'PUT',
//                headers: {'Content-Type': 'application/json'},
//                body: JSON.stringify(mockNote),
//            }); // Ensure correct API and payload were sent
//            expect(result).toEqual(mockNote); // Check if response matches mock data
//        });

//        it('should throw an error if updating a note fails', async () => {
//            const mockNote: Note = {
//                id: 1,
//                text: 'Updated Note',
//                status: 'DONE',
//            };
//            // Mock fetch to reject with an error
//            (fetch as jest.Mock).mockRejectedValueOnce(new Error('Update note error'));

//            // Ensure the function throws an error
//            await expect(updateNote(mockNote)).rejects.toThrow('Update note error');
//        });
//    });

//    // Tests for getTotalNotesCount function
//    describe('getTotalNotesCount', () => {
//        it('should fetch total notes count successfully', async () => {
//            const mockCount = 10; // Mock data for total notes count
//            (fetch as jest.Mock).mockResolvedValueOnce({
//                ok: true,
//                json: async () => mockCount,
//            });

//            const count = await getTotalNotesCount(); // Call the function
//            expect(fetch).toHaveBeenCalledWith('/api/notes/count'); // Ensure correct API was called
//            expect(count).toBe(mockCount); // Check if count matches mock data
//        });

//        it('should throw an error if fetching total count fails', async () => {
//            // Mock fetch to simulate a 500 error
//            (fetch as jest.Mock).mockResolvedValueOnce({
//                ok: false,
//                status: 500,
//            });

//            // Ensure the function throws an error
//            await expect(getTotalNotesCount()).rejects.toThrow('HTTP error! Status: 500');
//        });
//    });

//    // Tests for getCompletedNotesCount function
//    describe('getCompletedNotesCount', () => {
//        it('should fetch completed (DONE) notes count successfully', async () => {
//            const mockCount = 5; // Mock data for completed notes count
//            (fetch as jest.Mock).mockResolvedValueOnce({
//                ok: true,
//                json: async () => mockCount,
//            });

//            const count = await getCompletedNotesCount(); // Call the function
//            expect(fetch).toHaveBeenCalledWith('/api/notes/completed/count'); // Ensure correct API was called
//            expect(count).toBe(mockCount); // Check if count matches mock data
//        });

//        it('should throw an error if fetching completed count fails', async () => {
//            // Mock fetch to simulate a 404 error
//            (fetch as jest.Mock).mockResolvedValueOnce({
//                ok: false,
//                status: 404,
//            });

//            // Ensure the function throws an error
//            await expect(getCompletedNotesCount()).rejects.toThrow('HTTP error! Status: 404');
//        });
//    });
//});
