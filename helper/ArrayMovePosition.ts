function ArrayMovePosition<T>(
    array: T[],
    from_index: number,
    new_index: number
): T[] {
    if (
        from_index < 0 ||
        from_index >= array.length ||
        new_index < 0 ||
        new_index >= array.length
    ) {
        // Invalid indices, return original array
        return array;
    }

    const newArray = [...array];
    const [element] = newArray.splice(from_index, 1);
    newArray.splice(new_index, 0, element);

    return newArray;
}
export default ArrayMovePosition;
