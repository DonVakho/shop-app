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

export const GET_ITEMS: string = `query={
    items(limit: 12){
        count,
        data{
          id,
          name,
          description,
          price,
          img,
          category
        }
    }
}`

export const GET_ITEM = (id: string): string => `query={
    item_with_id(id: "${id}"){
        stock{
          option,
          left
        }
      }
}`
