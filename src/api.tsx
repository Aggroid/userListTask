import axios, { AxiosResponse } from 'axios';

export type User = {
    id?: number; 
    name: string;
    email: string;
    phone: string;
};

type UsersResponse = AxiosResponse<User[]>;

type UserResponse = AxiosResponse<User>;

export const getUsers = async (): Promise<User[]> => {
    try {
        const response: UsersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addUser = async (user: User): Promise<User> => {
    try {
        const response: UserResponse = await axios.post('https://jsonplaceholder.typicode.com/users', user, {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteUserById = async (userId: string | number): Promise<void> => {
    try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
    } catch (error) {
        throw error;
    }
}
