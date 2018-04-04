export interface AppDispatcher {
    dispatch(event: {
        type: string;
        payload?: any;
        error?: any;
    })
}