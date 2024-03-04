// import React from 'react'
// import { createContext } from 'react'

// export const GlobalContext = createContext(null);

// export default function GlobalState({ children }) {
//   return <GlobalContext.Provider>{children}</GlobalContext.Provider>;
// }

import React, { createContext, useState } from 'react';

export const GlobalContext = createContext(/* initial global state */);

export default function GlobalState({ children }) {

    // You can define your initial global state here if needed
    // const initialState = {
    //     // Define your initial global state properties here
    // };
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const [blogList, setBlogList] = useState([]);
    const [pending, setPending] = useState(false);

    return (
        <GlobalContext.Provider value={{
            blogList, setBlogList,
            pending, setPending,
            formData, setFormData
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

