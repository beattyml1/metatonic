export const explain = (expectation: () => void, explanation: string) => {
    try {
        expectation();
    } catch(e) {
        console.log(explanation)
        throw e;
    }
}