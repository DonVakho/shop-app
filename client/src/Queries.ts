export const GET_FILTER: string = `query={
    filter{
        categories,
            thematics,
            thematics_narrow{
            key,
                values
        },
        high_price
    }
}`
