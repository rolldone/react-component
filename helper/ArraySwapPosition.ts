function ArraySwapPosition<T>(
    array: T[],
    from_index: number,
    new_index: number
  ): T[] {
    if (
      from_index < 0 ||
      new_index < 0 ||
      from_index >= array.length ||
      new_index >= array.length
    ) {
      // Invalid indices, return original array
      return array;
    }
  
    const newArray = [...array];
    const temp = newArray[from_index];
    newArray[from_index] = newArray[new_index];
    newArray[new_index] = temp;
  
    return newArray;
  }

  export default ArraySwapPosition;
