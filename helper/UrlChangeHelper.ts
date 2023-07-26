// Function to update URL query parameters without page refresh
function updateQueryParam(newQueryParam: string): void {
    const url = window.location.pathname + "?" + newQueryParam;
    // Update the URL without refreshing the page
    history.pushState(null, "", url);
    // Handle the updated query parameters (you can perform other tasks here)
    handleQueryChange(new URLSearchParams(window.location.search));
  }
  
  // Function to handle the updated query parameters
  function handleQueryChange(queryParams: URLSearchParams): void {
    const params: { [key: string]: string } = {};
    queryParams.forEach((value, key) => {
      params[key] = value;
    });
    console.log("URL query parameters:", params);
  }
  
  // Export the functions to use in other parts of your application
  export { updateQueryParam, handleQueryChange };
  
