export const getRandomColor = () => {
    return '#'+(Math.random().toString(16)+'00000').slice(2,8)
}