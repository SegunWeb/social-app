import React, {Suspense} from 'react';


export const withSuspense = (Component) => {
    return (props) => {
        return <Suspense fallback={<p>loading...</p>}><Component {...props} /></Suspense>
    }
};
