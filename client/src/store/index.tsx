import { useState, useEffect, useContext, createContext} from 'react';
import { useQuery } from '@apollo/client';

import { GET_USER } from '../graphql/queries';


// An interface's only purpose is to describe an object 
interface StoreProviderProps {
    children: React.ReactNode;
}

interface StateValue {
    loading: boolean;
    user: any;
}

interface ContextValue {
    state: StateValue;
    // setState will be a react setter function 
    setState: React.Dispatch<React.SetStateAction<StateValue>>;
}

const initialState = {
    loading: true,
    user: null
}

const StoreContext = createContext<ContextValue | undefined>(undefined);


export function StoreProvider(props: StoreProviderProps) {
    const [state, setState] = useState(initialState);
    const {data, loading} = useQuery(GET_USER);

    useEffect(() => {
        if (!loading) {
            setState({
                ...state,
                loading: false,
                // Add data . [name of resolver]
                user: data.getUser.user
            })
        }

    }, [data])

    return (
        <StoreContext.Provider value={{
            state: state,
            setState: setState
        }}>
            {props.children}
        </StoreContext.Provider>
    )
}

// making our own hook 
export const useStore = () => useContext(StoreContext);